import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useTranslations } from 'next-intl'

export function FeaturedItemsSection() {
  const t = useTranslations('featuredItems')

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">{t('title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
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
              <h3 className="text-2xl font-semibold text-gray-900">{t('breakfast.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('breakfast.description')}
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
              <h3 className="text-2xl font-semibold text-gray-900">{t('coffee.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('coffee.description')}</p>
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
              <h3 className="text-2xl font-semibold text-gray-900">{t('pastries.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pastries.description')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
