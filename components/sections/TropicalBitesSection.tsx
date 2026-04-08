"use client";

import { useMenu } from "@/hooks/usePlates";
import { formatPrice } from "@/lib/utils/price";

export function TropicalBitesSection() {
  const { plates, loading, error } = useMenu();

  if (error) {
    return (
      <section className="py-24 bg-primary/5 dark:bg-primary/10" id="bites">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Error loading menu: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/10" id="bites">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
            Seasonal Flavors
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 dark:text-white">
            Tropical Bites
          </h2>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading menu...</p>
          </div>
        ) : plates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No items available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {plates.slice(0, 3).map((plate) => (
              <div
                key={plate.id}
                className="bg-background-light dark:bg-background-dark p-6 rounded-3xl shadow-sm border border-primary/5 hover:shadow-xl transition-shadow group"
              >
                <div className="overflow-hidden rounded-2xl mb-6 h-48">
                  <img
                    alt={plate.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={plate.image || "/cozy-coffee-shop.jpg"}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/cozy-coffee-shop.jpg";
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{plate.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{plate.description}</p>
                <span className="text-primary font-bold">
                  {formatPrice(plate.price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
