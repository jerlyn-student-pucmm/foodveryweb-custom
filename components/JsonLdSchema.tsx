export function JsonLdSchema() {
  const baseUrl = "https://foodvery.com.do";
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${baseUrl}#organization`,
    "name": "FoodVery Coffee",
    "alternateName": "FoodVery",
    "url": baseUrl,
    "logo": "https://lh3.googleusercontent.com/aida-public/AB6AXuBAqaa3i-5PH7uQIxE4ElbnVO1LTDEHTqNgp4dbpig5OMV5Gwwf7aqrIdkqQIK6ROL5XmrGN6UlSyKGvnatfOAOPwIujGBubX_UkzJeJY414U0hv377DQLz8QIbQ5gF3q90e8BbdhP94bkJjCAE-J579tJErdq_M8ENrWkZT7JFTJhzEx7AMf8oca467600AO8kPS4sUEd0WEUZo9mMtOfocAiUfuPzWdT8FWe-BgEL9s-2_kqcF3jSx4xCcdfKMkxs4hdNTw2E5F4",
    "description": "Breakfast and coffee crafted with care in Las Terrenas, Dominican Republic",
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
    "email": "hello@foodverycoffee.com",
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
    "name": "FoodVery Coffee",
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
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Coffee",
        "item": `${baseUrl}#coffee`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Tropical Bites",
        "item": `${baseUrl}#bites`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Visit Us",
        "item": `${baseUrl}#visit`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Privacy Policy",
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
        "name": "Coffee",
        "description": "Artisanal Coffee From Our Mountains - 100% Organic Arabica Beans",
        "url": `${baseUrl}#coffee`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tropical Bites",
        "description": "Seasonal Flavors - Fresh breakfast and tropical bites menu",
        "url": `${baseUrl}#bites`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Visit Us",
        "description": "Visit Our Paradise - Location, hours and contact information",
        "url": `${baseUrl}#visit`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Menu",
        "description": "Browse our complete menu with breakfast and coffee options",
        "url": `${baseUrl}#bites`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Order Now",
        "description": "Get the FoodVery Coffee app for easy ordering, exclusive deals, and seamless pickup",
        "url": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Privacy Policy",
        "description": "FoodVery Coffee Privacy Policy and Terms of Service",
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
    "name": "Artisanal Coffee From Our Mountains",
    "description": "We source our beans from the high-altitude plantations of the Cibao region. Each cup is a tribute to the rich Dominican terroir, roasted in small batches to preserve its natural chocolate and citrus notes.",
    "isPartOf": {
      "@id": `${baseUrl}#website`
    },
    "about": {
      "@type": "Product",
      "name": "Artisanal Coffee",
      "description": "100% Organic Arabica Beans from Dominican Republic",
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
    "name": "Tropical Bites - Seasonal Flavors",
    "description": "Fresh breakfast and tropical bites menu featuring seasonal flavors from Las Terrenas",
    "isPartOf": {
      "@id": `${baseUrl}#website`
    },
    "about": {
      "@type": "Menu",
      "name": "Tropical Bites Menu",
      "hasMenuSection": {
        "@type": "MenuSection",
        "name": "Breakfast & Tropical Bites"
      }
    }
  };

  const visitSectionSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}#visit`,
    "url": `${baseUrl}#visit`,
    "name": "Visit Our Paradise",
    "description": "Visit FoodVery Coffee in Las Terrenas, Samaná. Opening hours, location and contact information.",
    "isPartOf": {
      "@id": `${baseUrl}#website`
    }
  };

  // Schema de navegación del sitio (SiteNavigationElement)
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${baseUrl}#navigation`,
    "name": "Main Navigation",
    "url": baseUrl,
    "hasPart": [
      {
        "@type": "SiteNavigationElement",
        "name": "Coffee",
        "url": `${baseUrl}#coffee`,
        "description": "Artisanal Coffee From Our Mountains"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Tropical Bites",
        "url": `${baseUrl}#bites`,
        "description": "Seasonal Flavors Menu"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Visit Us",
        "url": `${baseUrl}#visit`,
        "description": "Location, Hours & Contact"
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
