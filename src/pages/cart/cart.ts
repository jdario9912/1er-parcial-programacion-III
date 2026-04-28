import { getProducts } from "../../data/data";
import { cartProductCard } from "../../templates/cart-product-card";
import type { Product } from "../../types/product";
import { cartCounter } from "../../ui/common/cart-counter";
import { header } from "../../ui/common/header";
import { getCart, removeProductFromCart } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  header();
  cartCounter();
});

let productsInCart: (Product | undefined)[] = [];
const products = getProducts();

const updateCart = () => {
  const idsProductsInCart = getCart();
  return idsProductsInCart.map((id) =>
    products.find((product) => product.id === id),
  );
};

const cartList = document.getElementById("cart-list");
const list = document.createElement("ul");
list.classList.add("cart-list");
productsInCart = updateCart();
productsInCart.forEach((product) => {
  const li = document.createElement("li");
  li.innerHTML = cartProductCard(product!);

  list.appendChild(li);
});

cartList?.appendChild(list);

const removeButtons = document.querySelectorAll(
  "#remove-button",
) as NodeListOf<HTMLButtonElement>;

removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    if (productId) {
      removeProductFromCart(Number(productId));
    }
  });
});
// productsInCart = updateCart();
// productsInCart.forEach((product) => {
//   const li = document.createElement("li");
//   li.innerHTML = cartProductCard(product!);
//   list.appendChild(li);
// });
