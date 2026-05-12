import Image from "next/image";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/socialLinks";

const mapsLink = "https://maps.app.goo.gl/3Zk7Qsq5TMXctirEA";

export function VisitSection() {
  const t = useTranslations()

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="visit">
      <div className="grid lg:grid-cols-2 gap-12 bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden shadow-2xl border border-primary/10">
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <h2 className="font-display text-4xl mb-8 text-gray-900 dark:text-white">
            {t('visit.title')}
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-icons text-primary">location_on</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">{t('visit.location')}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('visit.address')}<br />
                  {t('visit.city')}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-icons text-primary">schedule</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">{t('visit.hours')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('visit.schedule')}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-icons text-primary">phone</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">{t('visit.contact')}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('visit.phone')}<br />
                  {t('visit.email')}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-5 py-3 text-sm font-medium text-gray-700 transition-transform hover:scale-[1.02] dark:text-gray-200"
              href={socialLinks.whatsapp.href}
              rel="noreferrer"
              target="_blank"
            >
              <Image
                alt={t('visit.whatsapp')}
                className="h-6 w-6 object-contain"
                height={24}
                src={socialLinks.whatsapp.icon}
                width={24}
              />
              {t('visit.whatsapp')} {socialLinks.whatsapp.phone}
            </a>
            <a
              className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-5 py-3 text-sm font-medium text-gray-700 transition-transform hover:scale-[1.02] dark:text-gray-200"
              href={socialLinks.instagram.href}
              rel="noreferrer"
              target="_blank"
            >
              <Image
                alt={t('visit.instagram')}
                className="h-6 w-6 object-contain"
                height={24}
                src={socialLinks.instagram.icon}
                width={24}
              />
              {t('visit.instagram')}
            </a>
          </div>
        </div>
        <div className="relative min-h-[400px] bg-gray-100 dark:bg-zinc-800">
          <iframe
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=FoodVery%20Caf%C3%A9%20Las%20Terrenas&z=16&output=embed"
            title="FoodVery Café map"
          />
          <a
            className="absolute right-4 top-4 z-10 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-lg backdrop-blur transition-transform hover:scale-105 dark:bg-zinc-900/95"
            href={mapsLink}
            rel="noreferrer"
            target="_blank"
          >
            {t('visit.openMaps')}
          </a>
        </div>
      </div>
    </section>
  );
}
