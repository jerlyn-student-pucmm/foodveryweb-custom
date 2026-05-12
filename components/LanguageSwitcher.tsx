'use client'

import { useState, useEffect } from 'react'

export function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<string | null>(null)

  useEffect(() => {
    // Read locale from cookie on mount
    const cookies = document.cookie.split(';')
    const localeCookie = cookies.find(c => c.trim().startsWith('locale='))
    const locale = localeCookie ? localeCookie.split('=')[1] : 'es'
    setCurrentLocale(locale)
  }, [])

  const switchLanguage = (locale: string) => {
    // Set cookie with 1 year expiration
    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    document.cookie = `locale=${locale}; path=/; expires=${expirationDate.toUTCString()}`
    
    // Update local state
    setCurrentLocale(locale)
    
    // Reload the page to apply the new locale
    window.location.reload()
  }

  if (!currentLocale) return null

  return (
    <div className="flex gap-1 bg-white dark:bg-zinc-800 rounded-full shadow-xl p-1 border-2 border-primary">
      <button
        onClick={() => switchLanguage('es')}
        className={`px-4 py-2.5 text-sm font-bold rounded-full transition-all ${
          currentLocale === 'es'
            ? 'bg-primary text-white shadow-lg scale-105'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2.5 text-sm font-bold rounded-full transition-all ${
          currentLocale === 'en'
            ? 'bg-primary text-white shadow-lg scale-105'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700'
        }`}
      >
        EN
      </button>
    </div>
  )
}
