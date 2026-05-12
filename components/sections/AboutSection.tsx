import Image from "next/image"
import { useTranslations } from 'next-intl'

export function AboutSection() {
  const t = useTranslations('about')

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                {t('title')}
              </h2>
              <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                <p>
                  {t('description')}
                </p>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="/cozy-coffee-shop.jpg" 
                alt="FoodVery Café interior" 
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
