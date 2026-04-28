import { getProducts } from "../../data/data";
import { cartProductCard } from "../../templates/cart-product-card";
import { cartCounter } from "../../ui/common/cart-counter";
import { header } from "../../ui/common/header";
import { getCart, removeProductFromCart, updateCartQuantity } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  header();
  cartCounter();
});

const updateCart = () => {
  const products = getProducts();
  const itemsProductsInCart = getCart();
  return itemsProductsInCart.map((item) => {
    return {
      product: products.find((product) => product.id === item.id),
      quantity: item.quantity,
    };
  });
};

function renderCart() {
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;

  cartList.innerHTML = "";

  const list = document.createElement("ul");
  list.classList.add("cart-list");

  updateCart().forEach((product) => {
    if (!product.product) return;

    const li = document.createElement("li");
    li.innerHTML = cartProductCard(product.product, product.quantity);

    list.appendChild(li);
  });

  cartList.appendChild(list);
}

renderCart();

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.matches("#remove-button")) {
    const button = target as HTMLButtonElement;
    const productId = button.dataset.productId;

    if (productId) {
      removeProductFromCart(Number(productId));
      renderCart();
      cartCounter();
    }
  }
});

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
  }
});
