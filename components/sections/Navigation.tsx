"use client";

import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <img
              alt="Food Very Coffee Logo"
              className="h-12 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAqaa3i-5PH7uQIxE4ElbnVO1LTDEHTqNgp4dbpig5OMV5Gwwf7aqrIdkqQIK6ROL5XmrGN6UlSyKGvnatfOAOPwIujGBubX_UkzJeJY414U0hv377DQLz8QIbQ5gF3q90e8BbdhP94bkJjCAE-J579tJErdq_M8ENrWkZT7JFTJhzEx7AMf8oca467600AO8kPS4sUEd0WEUZo9mMtOfocAiUfuPzWdT8FWe-BgEL9s-2_kqcF3jSx4xCcdfKMkxs4hdNTw2E5F4"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              className="hover:text-primary transition-colors font-medium"
              href="#coffee"
            >
              Our Coffee
            </a>
            <a
              className="hover:text-primary transition-colors font-medium"
              href="#bites"
            >
              Tropical Bites
            </a>
            <a
              className="hover:text-primary transition-colors font-medium"
              href="#visit"
            >
              Visit Us
            </a>
            <button className="bg-primary text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
              Book a Table
            </button>
          </div>
          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <a
              className="block hover:text-primary transition-colors font-medium"
              href="#coffee"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Coffee
            </a>
            <a
              className="block hover:text-primary transition-colors font-medium"
              href="#bites"
              onClick={() => setIsMenuOpen(false)}
            >
              Tropical Bites
            </a>
            <a
              className="block hover:text-primary transition-colors font-medium"
              href="#visit"
              onClick={() => setIsMenuOpen(false)}
            >
              Visit Us
            </a>
            <button className="bg-primary text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity w-full">
              Book a Table
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
