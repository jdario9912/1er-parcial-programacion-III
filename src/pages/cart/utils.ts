const CART_KEY = "cart";

const cartString = (cart: number[]) => JSON.stringify(cart);

const saveCartInLocalStorage = (cart: number[]): void => {
  localStorage.setItem(CART_KEY, cartString(cart));
};

export const getCart = (): number[] => {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

export const addProductToCart = (productId: number): void => {
  const cart = getCart();
  if (cart.includes(productId)) return;
  cart.push(productId);
  saveCartInLocalStorage(cart);
};

export const removeProductFromCart = (productId: number): void => {
  let idsInCart: number[] = [];
  const cart = getCart();
  const index = cart.indexOf(productId);
  if (index !== -1) {
    console.log("Removing product from cart:", productId);
    idsInCart = cart.filter((id) => id !== productId);
    saveCartInLocalStorage(idsInCart);
  }
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

export const updateCartQuantity = async (
  productId: number,
  quantity: number,
): Promise<void> => {
  const cart = getCart();
  const index = cart.indexOf(productId);
  if (index !== -1) {
    cart[index] = quantity;
    saveCartInLocalStorage(cart);
  }
};
