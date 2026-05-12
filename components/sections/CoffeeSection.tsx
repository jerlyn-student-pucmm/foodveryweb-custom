import Image from "next/image";
import { useTranslations } from "next-intl";

export function CoffeeSection() {
  const t = useTranslations()

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto" id="coffee">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="relative">
            <Image
              alt={t('images.coffeeBaristaAlt')}
              className="rounded-3xl shadow-2xl relative z-10"
              height={600}
              src="/MENU/Cafe_Leche.jpg"
              width={500}
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-3xl -z-0"></div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 dark:text-white leading-tight">
            {t('coffee.tagline')}
          </h2>
        </div>
      </div>
    </section>
  );
}
