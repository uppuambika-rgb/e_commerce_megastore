export const CURRENCY_SYMBOL = '₹';

export function formatPrice(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0.00';
  }
  return `₹${amount.toFixed(2)}`;
}
