import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const name = "oliver jen";

  // Animation variants for the container and each letter
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // delay between letters
      },
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

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-3">
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

        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          incoming Intern at{" "}
          <span className="font-serif font-black">JPMorganChase</span>
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
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
            <Link to="https://www.ribit.tech/">recent project</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-x-2 pt-2">
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
