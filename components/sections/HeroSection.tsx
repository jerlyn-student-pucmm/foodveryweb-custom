import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/852179-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-2">
            <h1 className="text-7xl md:text-8xl font-bold text-primary tracking-tight">{t('title')}</h1>
            <p className="text-5xl md:text-6xl font-light text-foreground text-balance">{t('subtitle')}</p>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button size="lg" className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
              {t('menuButton')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-12 py-6 border-2 border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10 bg-transparent rounded-lg"
            >
              {t('orderButton')}
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-10" />
    </section>
  )
}
