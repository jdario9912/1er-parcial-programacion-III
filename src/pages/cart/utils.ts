const CART_KEY = "cart";

type CartItem = {
  id: number;
  quantity: number;
};

const cartString = (cart: CartItem[]) => JSON.stringify(cart);

const saveCartInLocalStorage = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, cartString(cart));
};

export const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

export const addProductToCart = (productId: number): void => {
  const cart = getCart();
  if (cart.some((item) => item.id === productId)) return;
  cart.push({ id: productId, quantity: 1 });
  saveCartInLocalStorage(cart);
};

export const removeProductFromCart = (productId: number): void => {
  let idsInCart: CartItem[] = [];
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    console.log("Removing product from cart:", productId);
    idsInCart = cart.filter((item) => item.id !== productId);
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
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart[index].quantity = quantity;
    saveCartInLocalStorage(cart);
  }
};
