import { Card } from "@/components/ui/card"
import { Coffee, MapPin, Clock } from "lucide-react"
import { useTranslations } from 'next-intl'

export function LocationHoursSection() {
  const t = useTranslations('location')

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-gray-900">{t('title')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow bg-primary rounded-lg shadow-sm">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{t('contact.title')}</h3>
              <p className="text-white/90 leading-relaxed">
                {t('address')}
              </p>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow bg-primary rounded-lg shadow-sm">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{t('hours.title')}</h3>
              <p className="text-white/90 leading-relaxed">
                {t('hours.monday')}
                <br />
                {t('hours.weekend')}
              </p>
            </Card>

            <Card className="p-8 text-center space-y-6 hover:shadow-lg transition-shadow bg-primary rounded-lg shadow-sm">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Coffee className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{t('contact.title')}</h3>
              <p className="text-white/90 leading-relaxed">
                {t('contact.phone')} & {t('contact.email')}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
