import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold">Start Your Day Right</h2>
          <p className="text-xl leading-relaxed opacity-90 max-w-2xl mx-auto">
            Join us for breakfast and coffee that will make your morning special
          </p>
          <Button
            size="lg"
            className="text-lg px-12 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-lg"
          >
            Visit Us Today
          </Button>
        </div>
      </div>
    </section>
  )
}
