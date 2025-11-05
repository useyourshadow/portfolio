import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import ribitImage from '../assets/ribit.png';
import minecraftImage from '../assets/swap.png';
import remindImage from '../assets/remind.jpg';

interface Project {
  name: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    name: "speedrun swap",
    description: "minecraft speedrun swapper mod",
    image: minecraftImage,
    link: "https://www.curseforge.com/minecraft/mc-mods/speedrun-swap",
  },
  {
    name: "ReMind",
    description:
      "nurse tool that allows ai agents to call patients to remind for medication",
    image: remindImage,
    link: "https://devpost.com/software/remind-clyw5p",
  },

];

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16 bg-background text-foreground">
      {/* --- Recent Work Section --- */}
      <section className="max-w-5xl w-full mb-20 text-center">
        <h1 className="text-4xl font-semibold mb-8 dark:text-zinc-100">recent work</h1>

        <a
          href="https://www.ribit.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all bg-white dark:bg-zinc-900"
        >
          <div className="overflow-hidden">
            <img
              src={ribitImage}
              alt="Ribit"
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="p-6 text-left">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary">
              Ribit
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-2">
              Community-based ridesharing platform for affordable medium-distance travel.
            </p>
          </div>
        </a>

      </section>

      {/* --- Other Projects Section --- */}
      <section className="max-w-5xl w-full text-center">
        <h2 className="text-3xl font-semibold mb-6 dark:text-zinc-100">other projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all bg-white dark:bg-zinc-900"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary">
                  {project.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Back Home Button */}
      <Button
        variant="outline"
        asChild
        className="mt-16 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
      >
        <Link to="/">back home</Link>
      </Button>
    </div>
  );
}
