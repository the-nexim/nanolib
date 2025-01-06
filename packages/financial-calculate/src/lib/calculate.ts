export const calcPriceFromDiscount = (price: number, discount: number, decimal = 2) => {
  decimal = Math.pow(10, decimal);
  return Math.round(price * (1 - discount / 100) * decimal) / decimal;
};

export function calcDiscountPrice(price: number, discount: number, decimal = 2) {
  decimal = Math.pow(10, decimal);
  return Math.round(((price * discount) / 100) * decimal) / decimal;
}
