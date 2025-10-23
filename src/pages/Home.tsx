import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-3">
        <h1 className="text-zinc-900 dark:text-zinc-100 text-3xl font-semibold">
          oliver jen
        </h1>
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
            <Link to="https://www.ribit.tech/">most recent project</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-x-2 pt-2">
          {/* GitHub Icon Link */}
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

          {/* LinkedIn Icon Link */}
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
        {/* --- END OF UPDATED PART --- */}

      </div>
    </div>
  );
}