import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    const newTheme = !isDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="min-h-screen transition-colors duration-200 bg-white dark:bg-zinc-950">
      {/* Theme Toggle */}
      <div className="fixed top-8 right-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-zinc-400" />
          ) : (
            <Moon className="h-5 w-5 text-zinc-600" />
          )}
        </Button>
      </div>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
}
