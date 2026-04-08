export function VisitSection() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="visit">
      <div className="grid lg:grid-cols-2 gap-12 bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden shadow-2xl border border-primary/10">
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <h2 className="font-display text-4xl mb-8 text-gray-900 dark:text-white">
            Visit Our Paradise
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-icons text-primary">location_on</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Calle Principal, Las Terrenas<br />
                  Samaná, Dominican Republic
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-icons text-primary">schedule</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">Opening Hours</h4>
                <p className="text-gray-600 dark:text-gray-400">Mon - Sun: 7:00 AM - 10:00 PM</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-icons text-primary">phone</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">Contact</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  +1 (809) 555-0123<br />
                  hello@foodverycoffee.com
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex gap-4">
            <a className="text-primary hover:scale-110 transition-transform" href="#">
              <span className="material-icons text-3xl">facebook</span>
            </a>
            <a className="text-primary hover:scale-110 transition-transform" href="#">
              <span className="material-icons text-3xl">camera_alt</span>
            </a>
          </div>
        </div>
        <div className="relative min-h-[400px]">
          <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
            <div className="text-center p-8">
              <span className="material-icons text-5xl text-primary mb-4">map</span>
              <p className="font-medium text-gray-500">Interactive Map of Las Terrenas</p>
              <p className="text-sm text-gray-400">Find us just a few steps from the beach.</p>
              <div className="mt-6 border-2 border-dashed border-primary/20 rounded-xl p-12 bg-white/50 dark:bg-black/20">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  Map Integration Area
                </span>
              </div>
            </div>
          </div>
          <img
            alt="Map View"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2VA893QSz8_2X7BB9Aj6mOjK1I-0p978F-y69INl6axdoaMp6hozVFPxO1oGK53b8ieIgUYTFq_qUXDpJvE-juyqz0rcJyxS21cq_0LEf5GS4AkRpZ6p7-1Jj6-p-dmXIfDNn04BgbN4VTgUc-GgzEserDfEUKvD0p672kvkXQPGHgp6UI-fLEQdXOM-ozaZR_hiRwtsN9gBcyj50EvBUDGbgAqocYIne1wFT3OcfZr0ZReZlffGSkCjfDIA1toSycN058QeSybY"
          />
        </div>
      </div>
    </section>
  );
}
