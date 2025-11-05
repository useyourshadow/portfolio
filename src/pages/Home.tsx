import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const name = "oliver jen";

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 10, color: "transparent" },
    visible: {
      opacity: 1,
      y: 0,
      color: "rgb(var(--foreground-rgb))",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const fadeUpContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-4">
        {/* Animated name */}
        <motion.h1
          className="text-zinc-900 dark:text-zinc-100 text-3xl font-semibold flex justify-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {name.split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Fade-in items container */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          variants={fadeUpContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="text-zinc-600 dark:text-zinc-400 text-lg" variants={fadeUpItem}>
            incoming Intern at{" "}
            <span className="font-serif font-black">JPMorganChase</span>
          </motion.p>

          <motion.div className="flex gap-4 justify-center flex-wrap items-center" variants={fadeUpItem}>
            <Button
              variant="outline"
              asChild
              className="dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                resume
              </a>
            </Button>

            <Button
              variant="outline"
              asChild
              className="dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              <Link to="/projects">recent project</Link>
            </Button>
          </motion.div>

          <motion.div className="mt-1 mb-1" variants={fadeUpItem}>
            <Link
              to="/about"
              className="underline text-zinc-700 dark:text-zinc-300 hover:text-primary transition-colors text-base"
            >
              about
            </Link>
          </motion.div>

          <motion.div className="flex items-center justify-center gap-x-2 pt-3" variants={fadeUpItem}>
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
