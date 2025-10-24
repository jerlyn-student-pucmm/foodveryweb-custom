import { Card } from "@/components/ui/card"
import Image from "next/image"

export function FeaturedItemsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">Nuestras Especialidades</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desayuno fresco y café preparado por expertos para comenzar tu día de la mejor manera
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg shadow-sm">
            <div className="aspect-square bg-muted relative overflow-hidden">
              <Image
                src="/breakfast-eggs.jpg"
                alt="Breakfast plate"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-semibold text-gray-900">Platos de Desayuno</h3>
              <p className="text-gray-600 leading-relaxed">
                Combinaciones abundantes de desayuno con ingredientes locales frescos
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg shadow-sm">
            <div className="aspect-square bg-muted relative overflow-hidden">
              <Image
                src="/coffee-cup.jpg"
                alt="Coffee"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-semibold text-gray-900">Café Especial</h3>
              <p className="text-gray-600 leading-relaxed">Granos de café premium tostados a la perfección</p>
            </div>
          </Card>

          <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg shadow-sm">
            <div className="aspect-square bg-muted relative overflow-hidden">
              <Image
                src="/pastries-and-baked-good.jpg"
                alt="Pastries"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-semibold text-gray-900">Pasteles Frescos</h3>
              <p className="text-gray-600 leading-relaxed">
                Horneados diariamente con amor y los mejores ingredientes
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
