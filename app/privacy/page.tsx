import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function PrivacyPolicy() {
  const t = useTranslations('privacy')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">{t('title')}</h1>
            <p className="text-xl text-gray-600">{t('lastUpdated')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-12 shadow-lg rounded-lg border border-gray-100">
              <div className="space-y-12">
                {/* Introduction */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">{t('sections.information.title')}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('introduction')}
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">{t('sections.usage.title')}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">{t('sections.security.title')}</h3>
                        <p className="text-gray-600">
                          {t('sections.security.content')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">{t('sections.sharing.title')}</h3>
                        <p className="text-gray-600">
                          {t('sections.sharing.content')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">{t('sections.contact.title')}</h2>
                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="space-y-3">
                      <p className="text-lg text-gray-600">
                        {t('sections.contact.content')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back to Home */}
                <div className="pt-8 border-t border-gray-200">
                  <Link href="/">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
                      Volver al Inicio
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}