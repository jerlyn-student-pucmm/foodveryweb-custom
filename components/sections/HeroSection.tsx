export function HeroSection() {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        alt="Beachside coffee bar in Las Terrenas"
        className="absolute inset-0 w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYOEKKUf9AolTIn1sF4Qjbm1WoTD_qHmS45vg910DW-w61QT6ImAgk2f2KGhzmWKHn1LL6sWqtKtvgwh5K9uno5tY18k-6A2nAzu5izn_aleI6MLA46PnMlpmVwKCpttdNaAPA9bUsP9K62BYc1Mg6VWnYRco5ieUGHGtHyjfKerI87O2QIm2VXFYyCiH3jtx9tmR2uCo0hxxu7aI0s_oqL8QYvZ1ifABcVICPjlF9HEWswtNySknpg0IE04tjDCsmVB3qrL1lOM8"
      />
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
          Tropical Soul, <br /> <span className="italic">Exceptional Brews.</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the finest Dominican coffee where the jungle meets the ocean. Located in the heart of Las Terrenas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform"
            href="#visit"
          >
            Find Us in Las Terrenas
          </a>
          <a
            className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all"
            href="#coffee"
          >
            Explore the Menu
          </a>
        </div>
      </div>
    </header>
  );
}
