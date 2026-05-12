export function JsonLdSchema() {
  const baseUrl = "https://foodvery.com.do";
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${baseUrl}#organization`,
    "name": "FoodVery Café",
    "alternateName": "FoodVery",
    "url": baseUrl,
    "logo": "https://lh3.googleusercontent.com/aida-public/AB6AXuBAqaa3i-5PH7uQIxE4ElbnVO1LTDEHTqNgp4dbpig5OMV5Gwwf7aqrIdkqQIK6ROL5XmrGN6UlSyKGvnatfOAOPwIujGBubX_UkzJeJY414U0hv377DQLz8QIbQ5gF3q90e8BbdhP94bkJjCAE-J579tJErdq_M8ENrWkZT7JFTJhzEx7AMf8oca467600AO8kPS4sUEd0WEUZo9mMtOfocAiUfuPzWdT8FWe-BgEL9s-2_kqcF3jSx4xCcdfKMkxs4hdNTw2E5F4",
    "description": "Desayunos y café elaborados con cuidado en Las Terrenas, República Dominicana",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Principal",
      "addressLocality": "Las Terrenas",
      "addressRegion": "Samaná",
      "addressCountry": "DO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.3167",
      "longitude": "-69.5333"
    },
    "telephone": "+1 (809) 555-0123",
    "email": "info@foodvery.com.do",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "07:00",
        "closes": "22:00"
      }
    ],
    "servesCuisine": "Dominican, Breakfast, Coffee",
    "priceRange": "$$",
    "image": [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAqaa3i-5PH7uQIxE4ElbnVO1LTDEHTqNgp4dbpig5OMV5Gwwf7aqrIdkqQIK6ROL5XmrGN6UlSyKGvnatfOAOPwIujGBubX_UkzJeJY414U0hv377DQLz8QIbQ5gF3q90e8BbdhP94bkJjCAE-J579tJErdq_M8ENrWkZT7JFTJhzEx7AMf8oca467600AO8kPS4sUEd0WEUZo9mMtOfocAiUfuPzWdT8FWe-BgEL9s-2_kqcF3jSx4xCcdfKMkxs4hdNTw2E5F4"
    ],
    "sameAs": [
      "https://www.facebook.com/foodvery",
      "https://www.instagram.com/foodvery"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    "url": baseUrl,
    "name": "FoodVery Café",
    "description": "Breakfast and coffee crafted with care in Las Terrenas, Dominican Republic",
    "publisher": {
      "@id": `${baseUrl}#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Café",
        "item": `${baseUrl}#coffee`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Bocados Tropicales",
        "item": `${baseUrl}#bites`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Visítanos",
        "item": `${baseUrl}#visit`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Política de Privacidad",
        "item": `${baseUrl}/privacy`
      }
    ]
  };

  // Schema para sitelinks (ItemList con las secciones principales)
  const sitelinksSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Café",
        "description": "Café artesanal de nuestras montañas - 100% granos Arábica orgánicos",
        "url": `${baseUrl}#coffee`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Bocados Tropicales",
        "description": "Sabores de temporada - Menú de desayunos y bocados tropicales",
        "url": `${baseUrl}#bites`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Visítanos",
        "description": "Visita nuestro paraíso - Ubicación, horarios y contacto",
        "url": `${baseUrl}#visit`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Menú",
        "description": "Consulta nuestro menú completo con opciones de desayuno y café",
        "url": `${baseUrl}#bites`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Pedir Ahora",
        "description": "Obtén la app de FoodVery Café para pedidos fáciles, ofertas exclusivas y recogida sin complicaciones",
        "url": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Política de Privacidad",
        "description": "Política de privacidad y términos de FoodVery Café",
        "url": `${baseUrl}/privacy`
      }
    ]
  };

  // Schema para cada sección individual (para mejor indexación)
  const coffeeSectionSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}#coffee`,
    "url": `${baseUrl}#coffee`,
    "name": "Café artesanal de nuestras montañas",
    "description": "Seleccionamos granos de altura de la región; cada taza es un tributo al terroir dominicano, tostada en pequeños lotes para preservar sus notas naturales.",
    "isPartOf": {
      "@id": `${baseUrl}#website`
    },
    "about": {
      "@type": "Product",
      "name": "Café artesanal",
      "description": "100% granos Arábica orgánicos de la República Dominicana",
      "brand": {
        "@id": `${baseUrl}#organization`
      }
    }
  };

  const bitesSectionSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}#bites`,
    "url": `${baseUrl}#bites`,
    "name": "Bocados Tropicales - Sabores de temporada",
    "description": "Menú de desayunos y bocados tropicales con sabores de temporada de Las Terrenas",
    "isPartOf": {
      "@id": `${baseUrl}#website`
    },
    "about": {
      "@type": "Menu",
      "name": "Menú de Bocados Tropicales",
      "hasMenuSection": {
        "@type": "MenuSection",
        "name": "Desayunos & Bocados Tropicales"
      }
    }
  };

  const visitSectionSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}#visit`,
    "url": `${baseUrl}#visit`,
    "name": "Visítanos",
    "description": "Visita FoodVery Café en Las Terrenas, Samaná. Horarios, ubicación e información de contacto.",
    "isPartOf": {
      "@id": `${baseUrl}#website`
    }
  };

  // Schema de navegación del sitio (SiteNavigationElement)
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${baseUrl}#navigation`,
    "name": "Navegación Principal",
    "url": baseUrl,
    "hasPart": [
      {
        "@type": "SiteNavigationElement",
        "name": "Café",
        "url": `${baseUrl}#coffee`,
        "description": "Café artesanal de nuestras montañas"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Bocados Tropicales",
        "url": `${baseUrl}#bites`,
        "description": "Menú de sabores de temporada"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Visítanos",
        "url": `${baseUrl}#visit`,
        "description": "Ubicación, horarios y contacto"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coffeeSectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bitesSectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(visitSectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />
    </>
  );
}
