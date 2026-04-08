export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) {
    return '$0.00';
  }
  return `$${numPrice.toFixed(2)}`;
}
