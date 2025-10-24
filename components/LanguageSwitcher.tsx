'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const router = useRouter()

  const switchLanguage = (locale: string) => {
    // Store locale in localStorage
    localStorage.setItem('locale', locale)
    // Reload the page to apply the new locale
    window.location.reload()
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => switchLanguage('es')}
        className="px-3 py-1 text-sm"
      >
        ES
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => switchLanguage('en')}
        className="px-3 py-1 text-sm"
      >
        EN
      </Button>
    </div>
  )
}
