import { getProducts } from "../../data/data";
import { cartEmpty } from "../../templates/cart-empty";
import { cartProductCard } from "../../templates/cart-product-card";
import { cartCounter } from "../../ui/common/cart-counter";

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

export const updateCart = () => {
  const products = getProducts();
  const itemsProductsInCart = getCart();
  return itemsProductsInCart.map((item) => {
    return {
      product: products.find((product) => product.id === item.id),
      quantity: item.quantity,
    };
  });
};

export const renderCart = () => {
  const itemsInCart = updateCart();
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;

  cartList.innerHTML = "";

  if (itemsInCart.length === 0) {
    cartList.style.width = "60%";
    cartList.innerHTML = cartEmpty();
    return;
  }

  const list = document.createElement("ul");
  list.classList.add("cart-list");

  itemsInCart.forEach((product) => {
    if (!product.product) return;

    const li = document.createElement("li");
    li.innerHTML = cartProductCard(product.product, product.quantity);

    list.appendChild(li);
  });

  cartList.appendChild(list);
};

export const removeItem = () => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.matches("#remove-button")) {
      const button = target as HTMLButtonElement;
      const productId = button.dataset.productId;

      if (productId) {
        removeProductFromCart(Number(productId));
        renderCart();
        cartCounter();
        updateTotal();
      }
    }
  });
};

export const updateItemQuantity = () => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.matches("#increment-quantity")) {
      const button = target as HTMLButtonElement;
      const productId = button.dataset.productId;

      if (!productId) return;
      const productIdParsed = Number(productId);

      const product = getProducts().find((p) => p.id === productIdParsed);
      if (!product) return;

      const item = getCart().find((item) => item.id === productIdParsed);
      if (!item) return;

      const quantityUpdated =
        item.quantity++ <= product.stock ? item.quantity : product.stock;

      updateCartQuantity(productIdParsed, quantityUpdated);
      renderCart();
      cartCounter();
      updateTotal();
    }

    if (target.matches("#decrement-quantity")) {
      const button = target as HTMLButtonElement;
      const productId = button.dataset.productId;

      if (!productId) return;
      const productIdParsed = Number(productId);

      const product = getProducts().find((p) => p.id === productIdParsed);
      if (!product) return;

      const item = getCart().find((item) => item.id === productIdParsed);
      if (!item) return;

      const quantityUpdated = item.quantity-- > 1 ? item.quantity : 1;

      updateCartQuantity(productIdParsed, quantityUpdated);
      renderCart();
      cartCounter();
      updateTotal();
    }
  });
};

export const cleanCart = () => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.matches("#clear-cart")) {
      clearCart();
      renderCart();
      cartCounter();
      updateTotal();
    }
  });
};

export const updateSubtotal = () => {
  const subtotalElement = document.getElementById("subtotal");
  if (!subtotalElement) return;
  subtotalElement as HTMLDivElement;
  const products = getProducts();

  const subtotal = getCart()
    .map((cartItem) => {
      const product = products.filter(
        (product) => product.id === cartItem.id,
      )[0];
      return { product, quantity: cartItem.quantity };
    })
    .reduce(
      (acc, product) => acc + product.product.precio * product.quantity,
      0,
    )
    .toFixed(2);

  subtotalElement.textContent = `Subtotal: $${subtotal}`;
  return subtotal;
};

export const updateTotal = () => {
  const subtotal = updateSubtotal();
  if (!subtotal) return;
  const totalElement = document.getElementById("total");
  if (!totalElement) return;
  totalElement as HTMLDivElement;

  const total = Number(subtotal).toFixed(2);

  totalElement.textContent = `Total: $${total}`;
};
