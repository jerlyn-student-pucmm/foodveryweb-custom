"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/socialLinks";

export function Navigation() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <Image
                alt={t('navigation.logo')}
                className="h-12 w-auto"
                height={48}
                src="/Logos_Redes_Sociales/foodverylogo2.png"
                width={192}
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
              <Link
                className="hover:text-primary transition-colors font-medium"
                href="/"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {t('navigation.home')}
              </Link>
              <a className="hover:text-primary transition-colors font-medium" href="#about">
                {t('navigation.about')}
              </a>
              <a className="hover:text-primary transition-colors font-medium" href="#visit">
                {t('navigation.visit')}
              </a>
              <a className="hover:text-primary transition-colors font-medium" href="#services">
                {t('navigation.services')}
              </a>
              <a className="hover:text-primary transition-colors font-medium" href="/MENU/MENu_FOODVERY_CAFe.pdf" rel="noreferrer" target="_blank">
                {t('navigation.menu')}
              </a>
            <div className="flex items-center gap-3">
              <a
                aria-label={t('navigation.instagram')}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-white/80 shadow-sm transition-transform hover:scale-105"
                href={socialLinks.instagram.href}
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt={t('navigation.instagram')}
                  className="h-6 w-6 object-contain"
                  height={24}
                  src={socialLinks.instagram.icon}
                  width={24}
                />
              </a>
              <a
                className="bg-primary text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                href={socialLinks.whatsapp.href}
                rel="noreferrer"
                target="_blank"
              >
                {t('navigation.reserve')}
              </a>
            </div>
          </div>
          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link
              className="block hover:text-primary transition-colors font-medium"
              href="/"
              onClick={(e) => {
                setIsMenuOpen(false);
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {t('navigation.home')}
            </Link>
            <a
              className="block hover:text-primary transition-colors font-medium"
              href="#about"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.about')}
            </a>
            <a
              className="block hover:text-primary transition-colors font-medium"
              href="#visit"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.visit')}
            </a>
            <a
              className="block hover:text-primary transition-colors font-medium"
              href="#services"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.services')}
            </a>
            <div className="flex gap-3 pt-2">
              <a
                className="flex-1 bg-white/80 text-primary px-6 py-2.5 rounded-full border border-primary/15 text-center hover:bg-white transition-opacity"
                href="/MENU/MENu_FOODVERY_CAFe.pdf"
                onClick={() => setIsMenuOpen(false)}
                rel="noreferrer"
                target="_blank"
              >
                {t('navigation.menu')}
              </a>
              <a
                aria-label={t('navigation.instagram')}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-white/80 shadow-sm transition-transform hover:scale-105"
                href={socialLinks.instagram.href}
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt={t('navigation.instagram')}
                  className="h-6 w-6 object-contain"
                  height={24}
                  src={socialLinks.instagram.icon}
                  width={24}
                />
              </a>
              <a
                className="bg-primary text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity w-full text-center"
                href={socialLinks.whatsapp.href}
                rel="noreferrer"
                target="_blank"
              >
                {t('navigation.reserve')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
