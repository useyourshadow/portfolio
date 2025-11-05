import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import catImg from "../assets/cat.jpg";
import dogImg from "../assets/dog.jpg";

import nautilusImg from "../assets/nautilus.png";
import aotImg from "../assets/aot.png";
import clubImg from "../assets/club.png";
import pickleImg from "../assets/pickle.png";

const pets = [
  { name: "Cat", img: catImg },
  { name: "Dog", img: dogImg },
];

const builds = [nautilusImg, aotImg, clubImg, pickleImg];

export default function About() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? builds.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % builds.length);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl text-center space-y-4"
      >
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          about me
        </h1>

        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          I’m <span className="font-medium">Oliver</span>, a computer science junior at the University of Florida.
        </p>

        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          In my free time, I love to stay active by going to the gym or playing sports like pickleball or tennis. 
          Some of my favorite games to play are Teamfight Tactics and Minecraft build battle. 
          Here are some of my favorite builds!
        </p>

        <div className="pt-4">


          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePrev}
              className="px-3 py-2 bg-zinc-300 dark:bg-zinc-700 rounded hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors"
            >
              ◀
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full h-60 sm:h-72 max-w-md rounded-xl shadow-lg overflow-hidden bg-zinc-200 dark:bg-zinc-700"
            >
              <img
                src={builds[index]}
                alt={`Build ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <button
              onClick={handleNext}
              className="px-3 py-2 bg-zinc-300 dark:bg-zinc-700 rounded hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors"
            >
              ▶
            </button>
          </div>
  
        </div>

        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed pt-4">
          and here's some pictures of my pets : )
        </p>

        {/* 🐾 Pet image cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6"
        >
          {pets.map((pet, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-zinc-100 dark:bg-zinc-800"
            >
              <img
                src={pet.img}
                alt={pet.name}
                className="w-full h-52 object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-3">
          <Link
            to="/"
            className="underline text-zinc-700 dark:text-zinc-300 hover:text-primary transition-colors text-base"
          >
            ← back home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
