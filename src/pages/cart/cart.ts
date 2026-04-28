import { getProducts } from "../../data/data";
import { cartProductCard } from "../../templates/cart-product-card";
import { cartCounter } from "../../ui/common/cart-counter";
import { header } from "../../ui/common/header";
import { getCart, removeProductFromCart } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  header();
  cartCounter();
});

const updateCart = () => {
  const products = getProducts();
  const idsProductsInCart = getCart();
  return idsProductsInCart.map((id) =>
    products.find((product) => product.id === id),
  );
};

function renderCart() {
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;

  cartList.innerHTML = "";

  const list = document.createElement("ul");
  list.classList.add("cart-list");

  const productsInCart = updateCart();

  productsInCart.forEach((product) => {
    if (!product) return;

    const li = document.createElement("li");
    li.innerHTML = cartProductCard(product);

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
