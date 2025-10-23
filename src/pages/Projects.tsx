import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import ribitImage from '../assets/ribitsquare.png';
import minecraftImage from '../assets/minecraft.png';
interface Project {
  name: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    name: "ribit",
    description:
      "community-based ridesharing for affordable medium-distance travel​",
    image: ribitImage,
    link: "https://www.ribit.tech/",
  },
  {
    name: "speedrun swap",
    description:
      "minecraft speedrun swapper mod",
    image: minecraftImage,
    link: "https://www.curseforge.com/minecraft/mc-mods/speedrun-swap",
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16 text-center bg-background text-foreground">
      <h1 className="text-4xl font-semibold mb-4 dark:text-zinc-100">recent projects</h1>


      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl w-full">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all bg-white dark:bg-zinc-900"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text */}
            <div className="p-4 text-left">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary">
                {project.name}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      <Button
        variant="outline"
        asChild
        className="mt-12 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
      >
        <Link to="/">back home</Link>
      </Button>
    </div>
  );
}
