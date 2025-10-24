import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                Welcome to Food Very Coffee
              </h2>
              <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                <p>
                  Located in the heart of Las Terrenas, we're passionate about serving exceptional breakfast and
                  coffee to our community.
                </p>
                <p>
                  Every dish is prepared with care using fresh, local ingredients. Our coffee is sourced from the
                  finest Dominican beans and brewed to perfection.
                </p>
                <p>
                  Whether you're starting your day or taking a break, we're here to make your experience memorable.
                </p>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="/cozy-coffee-shop.jpg" 
                alt="Food Very Coffee interior" 
                fill
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
