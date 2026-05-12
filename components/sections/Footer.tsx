import Image from "next/image";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/socialLinks";

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
          <Image
          alt="Logo"
          className="h-20 w-20 mx-auto mb-8 opacity-80"
          height={80}
          src="/Logos_Redes_Sociales/foodverylogo2.png"
          width={80}
        />
        <p className="max-w-md mx-auto text-white/70 mb-8">
          {t('footer.description')}
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <a
            aria-label={socialLinks.whatsapp.label}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-transform hover:scale-105"
            href={socialLinks.whatsapp.href}
            rel="noreferrer"
            target="_blank"
          >
            <Image
              alt={socialLinks.whatsapp.label}
              className="h-7 w-7 object-contain"
              height={28}
              src={socialLinks.whatsapp.icon}
              width={28}
            />
          </a>
          <a
            aria-label={socialLinks.instagram.label}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-transform hover:scale-105"
            href={socialLinks.instagram.href}
            rel="noreferrer"
            target="_blank"
          >
            <Image
              alt={socialLinks.instagram.label}
              className="h-7 w-7 object-contain"
              height={28}
              src={socialLinks.instagram.icon}
              width={28}
            />
          </a>
        </div>
        <div className="flex justify-center gap-8 mb-12">
          <a className="hover:text-secondary transition-colors" href="/MENU/MENu_FOODVERY_CAFe.pdf">
            {t('footer.links.menu')}
          </a>
          <a className="hover:text-secondary transition-colors" href="#about">
            {t('footer.links.about')}
          </a>
          <a className="hover:text-secondary transition-colors" href="#">
            {t('footer.links.jobs')}
          </a>
          <a className="hover:text-secondary transition-colors" href="/privacy">
            {t('footer.links.privacy')}
          </a>
        </div>
        <p className="text-sm text-white/40">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}
