import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import "./home.css";

export default function Home() {
  const name = "oliver jen";

  return (
    <div className="home-root">
      <div className="home-center">
        {/* Name with character-by-character slam animation */}
        <h1 className="home-name" aria-label={name}>
          {name.split("").map((char, i) => (
            <span
              key={i}
              className="home-letter"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Role line */}
        <p
          className="home-role"
          style={{ animationDelay: `${name.length * 0.06 + 0.1}s` }}
        >
          <span className="home-role-copy">SDE intern at</span>
          <span className="home-amazon-brand" aria-label="Amazon">
            <img
              src={`${import.meta.env.BASE_URL}amazon-logo-light.svg`}
              alt=""
              aria-hidden="true"
              className="home-amazon-logo home-amazon-logo-light"
            />
            <img
              src={`${import.meta.env.BASE_URL}amazon-logo-dark.svg`}
              alt=""
              aria-hidden="true"
              className="home-amazon-logo home-amazon-logo-dark"
            />
          </span>
        </p>

        {/* Buttons */}
        <div
          className="home-buttons"
          style={{ animationDelay: `${name.length * 0.06 + 0.28}s` }}
        >
          <Button
            variant="outline"
            asChild
            className="home-btn dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            <a
              href="/oliver-jen-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
            </a>
          </Button>

          <Button
            variant="outline"
            asChild
            className="home-btn dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            <Link to="/projects">recent project</Link>
          </Button>
        </div>

        {/* About link */}
        <div
          className="home-about-wrap"
          style={{ animationDelay: `${name.length * 0.06 + 0.44}s` }}
        >
          <Link to="/about" className="home-about-link">
            about
          </Link>
        </div>

        {/* Social icons */}
        <div
          className="home-socials"
          style={{ animationDelay: `${name.length * 0.06 + 0.58}s` }}
        >
          <Button asChild variant="ghost" size="icon">
            <a
              href="https://github.com/useyourshadow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a
              href="https://linkedin.com/in/oliver-jen-ufl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
