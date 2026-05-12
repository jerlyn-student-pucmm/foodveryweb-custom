import Image from "next/image";
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations()

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        alt={t('images.heroAlt')}
        className="absolute inset-0 w-full h-full object-cover"
        height={1600}
        src="/Logos_Redes_Sociales/Local_Portada.png"
        width={2560}
      />
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
          {t('hero.title')} <br /> <span className="italic">{t('hero.subtitle')}</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {t('hero.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform"
            href="/MENU/MENu_FOODVERY_CAFe.pdf"
            rel="noreferrer"
            target="_blank"
          >
            {t('hero.menuButton')}
          </a>
          <a
            className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all"
            href="https://maps.app.goo.gl/3Zk7Qsq5TMXctirEA"
            rel="noreferrer"
            target="_blank"
          >
            {t('hero.orderButton')}
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
        <p className="mt-2 text-center text-sm text-gray-300">{t('images.downloadApps')}</p>
      </div>
    </header>
  );
}
