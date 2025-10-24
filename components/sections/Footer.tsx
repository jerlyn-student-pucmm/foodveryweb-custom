import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-white">
      <div className="h-1 bg-green-600"></div>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-bold text-green-600">Food Very Coffee</h3>
            <p className="text-gray-600 text-lg">{t('description')}</p>
            <div className="flex justify-center gap-8 pt-4">
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors text-lg">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors text-lg">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors text-lg">
                {t('links.contact')}
              </a>
              <Link href="/privacy" className="text-gray-600 hover:text-green-600 transition-colors text-lg">
                {t('links.privacy')}
              </Link>
            </div>
            <p className="text-gray-600 pt-8">{t('copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
