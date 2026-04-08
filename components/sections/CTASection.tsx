import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

export function CTASection() {
  const t = useTranslations('cta')

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold">{t('title')}</h2>
          <p className="text-xl leading-relaxed opacity-90 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <Button
            size="lg"
            className="text-lg px-12 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-lg"
          >
            {t('button')}
          </Button>
        </div>
      </div>
    </section>
  )
}
