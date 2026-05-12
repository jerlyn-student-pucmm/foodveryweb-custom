import Image from "next/image";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/socialLinks";

export function ServicesSection() {
  const t = useTranslations()

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="services">
      <div className="bg-white dark:bg-zinc-900 rounded-[30px] shadow-lg p-8 lg:p-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6 text-gray-900 dark:text-white">{t('services.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{t('services.intro')}</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg text-left">
              <h3 className="font-semibold text-lg mb-2">{t('services.breakfast.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('services.breakfast.description')}</p>
            </div>

            <div className="p-6 border rounded-lg text-left">
              <h3 className="font-semibold text-lg mb-2">{t('services.apartments.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('services.apartments.description')}</p>
            </div>

            <div className="p-6 border rounded-lg text-left">
              <h3 className="font-semibold text-lg mb-2">{t('services.catering.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('services.catering.description')}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-5 py-3 text-sm font-medium text-gray-700 hover:scale-[1.02]"
              href={socialLinks.whatsapp.href}
              rel="noreferrer"
              target="_blank"
            >
              <Image alt={socialLinks.whatsapp.label} src={socialLinks.whatsapp.icon} width={20} height={20} />
              {t('services.reserve')}
            </a>

            <a
              className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-5 py-3 text-sm font-medium text-gray-700 hover:scale-[1.02]"
              href="/MENU/MENu_FOODVERY_CAFe.pdf"
              rel="noreferrer"
              target="_blank"
            >
              {t('services.viewMenu')}
            </a>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href="https://apps.apple.com/us/app/foodvery/id6755501977"
              target="_blank"
              rel="noreferrer"
              className="inline-block"
              aria-label="App Store - FoodVery"
            >
              <Image src="/Logos_Redes_Sociales/Download_on_the_App_Store_logo.png" alt={t('images.appStoreAlt')} width={140} height={40} />
            </a>
            <div className="inline-block opacity-60" title={t('images.googlePlayAlt')}>
              <Image src="/Logos_Redes_Sociales/Google_Play_Store_logo.png" alt={t('images.googlePlayAlt')} width={140} height={40} />
            </div>
          </div>
          <p className="mt-2 text-center text-sm text-gray-700">{t('images.downloadApps')}</p>
        </div>
      </div>
    </section>
  );
}
