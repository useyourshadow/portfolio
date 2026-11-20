import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import banhMi from "../assets/banh-mi.png";
import "./surprise.css";

const particles = Array.from({ length: 60 }, (_, i) => ({
  left: `${(i * 37.13) % 100}%`,
  top: `${(i * 61.71) % 100}%`,
  "--delay": `${(i % 13) * 0.17}s`,
  "--duration": `${1.5 + (i % 7) * 0.26}s`,
  "--size": `${2 + (i % 4)}px`,
  "--spin": `${(i % 2 ? -1 : 1) * (180 + (i % 7) * 65)}deg`,
  "--drift": `${(i % 9 - 4) * 12}px`,
}) as CSSProperties);

export default function Surprise() {
  const [expired, setExpired] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [readTerms, setReadTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const termsHeading = useRef<HTMLHeadingElement>(null);
  const retry = useRef<HTMLButtonElement>(null);
  const [accepted, setAccepted] = useState(false);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [dropping, setDropping] = useState(false);
  const [returning, setReturning] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const audio = useRef<AudioContext | null>(null);
  const yes = useRef<HTMLButtonElement>(null);
  const celebration = useRef<HTMLHeadingElement>(null);
  const urgent = deadline !== null;
  const showBomb = urgent || dropping;
  const displayedSeconds = expired ? 0 : seconds;

  useEffect(() => {
    if (accepted) celebration.current?.focus();
  }, [accepted]);

  useEffect(() => {
    if (deadline === null) return;
    const end = deadline;
    yes.current?.focus();
    const context = audio.current;
    const alarm = context?.createGain();
    if (context && alarm) alarm.connect(context.destination);
    let nextBeep = 0;

    function tick() {
      const remaining = Math.max(0, Math.ceil((end - performance.now()) / 1000));
      if (remaining === 0) {
        setDeadline(null);
        setTimedOut(true);
        setExpired(true);
        return;
      }
      setSeconds(remaining);

      const clock = performance.now();
      if (context?.state !== "running" || !alarm || clock < nextBeep) return;
      const timeLeft = Math.max(0, end - clock) / 5000;
      nextBeep = clock + 95 + 685 * timeLeft ** 1.7;
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      const now = context.currentTime;
      oscillator.type = "square";
      oscillator.frequency.value = 1620;
      envelope.gain.setValueAtTime(0.0001, now);
      envelope.gain.exponentialRampToValueAtTime(0.055, now + 0.004);
      envelope.gain.setValueAtTime(0.055, now + 0.048);
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
      oscillator.connect(envelope).connect(alarm);
      oscillator.start(now);
      oscillator.stop(now + 0.075);
    }

    tick();
    const timer = window.setInterval(tick, 40);
    return () => {
      window.clearInterval(timer);
      alarm?.disconnect();
    };
  }, [deadline]);

  useEffect(() => () => {
    if (audio.current) void audio.current.close().catch(() => {});
    audio.current = null;
  }, []);

  function restart() {
    setExpired(false);
    requestAnimationFrame(() => yes.current?.focus());
  }

  useEffect(() => {
    if (!expired) return;
    retry.current?.focus();
    const timer = window.setTimeout(restart, 4200);
    return () => window.clearTimeout(timer);
  }, [expired]);

  useEffect(() => {
    if (showTerms) termsHeading.current?.focus();
  }, [showTerms]);

  useEffect(() => {
    if (!returning || dropping) return;
    const timer = window.setTimeout(() => {
      setReturning(false);
      setShowTerms(true);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [returning, dropping]);

  function startCountdown() {
    try {
      audio.current ??= new AudioContext();
      void audio.current.resume().catch(() => {});
    } catch {
      // The countdown can run in browsers without Web Audio.
    }
    setSeconds(5);
    setDeadline(performance.now() + 5000);
  }

  function celebrate() {
    if (dropping || returning) return;
    if (urgent) {
      setDeadline(null);
      setDropping(true);
      setReturning(true);
      return;
    }
    setShowTerms(true);
  }

  return (
    <main className={`surprise${accepted ? " surprise--accepted" : expired ? " surprise--expired" : urgent ? " surprise--urgent" : returning ? " surprise--returning" : ""}`}>
      <div className="surprise-sky" aria-hidden="true">
        {particles.map((style, i) => (
          <span key={i} className={accepted ? "surprise-heart" : "surprise-star"} style={style}>
            {accepted ? "♥" : null}
          </span>
        ))}
      </div>
      {accepted && (
        <div className="surprise-sky" aria-hidden="true">
          {particles.slice(0, 40).map((style, i) => (
            <img key={i} src={banhMi} alt="" className="surprise-sandwich"
              style={{ ...style, top: undefined, width: `${36 + (i * 11) % 47}px` }} />
          ))}
        </div>
      )}
      {expired ? (
        <section className="surprise-content surprise-retry">
          <h1>Why are you so slow?</h1>
          <p>Let’s try this again, but I’ll make it easier for you.</p>
          <button ref={retry} onClick={restart}>Try again</button>
        </section>
      ) : showTerms ? (
        <section className="surprise-terms" aria-labelledby="surprise-terms-title">
          <h1 id="surprise-terms-title" ref={termsHeading} tabIndex={-1}>Terms of Agreement</h1>
          <p id="surprise-terms-instructions">Scroll to the end, then check the box to enable Accept.</p>
          <div
            className="surprise-terms-document"
            tabIndex={0}
            role="region"
            aria-label="Agreement text"
            onScroll={(event) => {
              const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
              if (scrollTop + clientHeight >= scrollHeight - 2) setReadTerms(true);
            }}
          >
            <p>This Girlfriend Agreement takes effect when the undersigned selects Accept. For purposes of this agreement, “Oliver” means Oliver, and “the parties” means Oliver and his girlfriend.</p>
            <h2>1. Date Night</h2>
            <p>The undersigned agrees to take Oliver out on one date per calendar week. Dinner, a picnic, or an outing of mutual interest shall qualify. Both parties may propose the venue.</p>
            <h2>2. Back Massage Schedule</h2>
            <p>Back massages shall be offered on Mondays, Wednesdays, and Fridays. Duration and pressure shall be determined by mutual agreement at the time of service.</p>
            <h2>3. Foot Massage Schedule</h2>
            <p>Foot massages shall be offered on Tuesdays and Thursdays. The parties may reschedule any session by mutual agreement.</p>
            <h2>4. Fruit Supply</h2>
            <p>The undersigned shall supply fruit twice per calendar week. Fruit selection is at the discretion of the supplying party, subject to seasonal availability and snack preferences.</p>
            <h2>5. Amendments and Scheduling</h2>
            <p>Plans may be amended by mutual agreement, including by text message. Weather, travel, naps, and competing dessert plans constitute reasonable grounds for rescheduling.</p>
            <h2>6. Mutual Consent and Termination</h2>
            <p>These playful terms apply only while both parties are happy to participate. Either person may decline any activity or end this agreement at any time (subject to Oliver's approval). No late fees, penalties, or retroactive massage claims shall accrue.</p>
            <h2>7. Entire Agreement</h2>
            <p>This document constitutes the entire agreement on dates, massages, and fruit. By selecting Accept, the undersigned confirms that they have reached the end of this very official document.</p>
          </div>
          <label className="surprise-terms-confirm">
            <input
              type="checkbox"
              checked={agreed}
              disabled={!readTerms}
              onChange={(event) => setAgreed(event.currentTarget.checked)}
            />
            I have read and agree to all of the terms.
          </label>
          <button
            disabled={!agreed}
            aria-describedby="surprise-terms-instructions"
            onClick={() => {
              setShowTerms(false);
              setAccepted(true);
            }}
          >Accept</button>
        </section>
      ) : <section className="surprise-content">
        {accepted ? (
          <h1 tabIndex={-1} ref={celebration}>yay ^.^</h1>
        ) : (
          <>
            <div className="surprise-mark" aria-hidden="true">✦</div>
            <h1><span lang="ko">화이팅,</span><br /> will you be<br /> my <em>girlfriend?</em></h1>
            <div className="surprise-actions">
              <button
                ref={yes}
                className={showBomb ? "surprise-yes--foreground" : undefined}
                aria-disabled={dropping || returning}
                onClick={celebrate}
              >Yes</button>
              {!timedOut && (
                <button
                  className="surprise-no"
                  disabled={showBomb || returning}
                  onClick={startCountdown}
                >No</button>
              )}
            </div>
          </>
        )}
      </section>}
      {(showBomb || expired) && (
        <section
          className={`surprise-content surprise-bomb-panel${expired ? " surprise-bomb-panel--exploding" : dropping ? " surprise-bomb-panel--dropping" : ""}`}
          inert={dropping || expired}
          onAnimationEnd={(event) => {
            if (dropping && event.target === event.currentTarget) {
              setDropping(false);
            }
          }}
        >
          <h1 className="surprise-alert">Defuse it!</h1>
          <div className="surprise-bomb" role="timer" aria-label={`${displayedSeconds} seconds remaining`}>
            <span>{displayedSeconds}</span>
          </div>
        </section>
      )}
    </main>
  );
}
