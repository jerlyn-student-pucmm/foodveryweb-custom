"use client";

export function DarkModeToggle() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      className="fixed bottom-8 right-8 w-12 h-12 bg-white dark:bg-zinc-800 text-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      onClick={toggleDarkMode}
    >
      <span className="material-icons dark:hidden">dark_mode</span>
      <span className="material-icons hidden dark:block text-yellow-500">light_mode</span>
    </button>
  );
}
