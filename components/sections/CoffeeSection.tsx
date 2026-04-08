export function CoffeeSection() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="coffee">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="relative">
            <img
              alt="Barista pouring coffee"
              className="rounded-3xl shadow-2xl relative z-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiPrQamrZR0t0IwJaSyIHfSFpr_1-xwY3M76G73ZQgS4Vr71JWqoxa7iEw6TdJivtH7kEMGU_y9uo37Dbdd712CYF96LdVivFyok3wjLazt_X2rqmdNtK_bEyipurag5jIJUNBbE4V1A9hN8dyjE5We0LhyUPgFkx4vRahjkn2uRhhGLAt_CnQVHQHongMlAnkHxfpd1PDUUbLNBW23STNLu8ltn7GoKWvQDJ2IA8R4rqlxMFFXTIFqGdWchGVWhd_JabjefouFY0"
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-3xl -z-0"></div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            The Craft
          </span>
          <h2 className="font-display text-4xl md:text-5xl mb-6 text-gray-900 dark:text-white">
            Artisanal Coffee <br />
            From Our Mountains
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
            We source our beans from the high-altitude plantations of the Cibao region. Each cup is a tribute to the rich Dominican terroir, roasted in small batches to preserve its natural chocolate and citrus notes.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="material-icons text-primary">check_circle</span>
              <span className="font-medium">100% Organic Arabica Beans</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-icons text-primary">check_circle</span>
              <span className="font-medium">Direct Trade Partnerships</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-icons text-primary">check_circle</span>
              <span className="font-medium">Expert Cold Brew Infusions</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
