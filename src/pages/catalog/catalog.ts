import { getCategories, getProducts } from "../../data/data";
import { productCard } from "../../templates/catalog-product-card";
import { cartCounter } from "../../ui/common/cart-counter";
import { header } from "../../ui/common/header";
import { addProductToCart } from "../cart/utils";

document.addEventListener("DOMContentLoaded", () => {
  header();
  cartCounter();
});

const products = getProducts();
const categories = getCategories();

const categoryContainer = document.getElementById(
  "category-container",
) as HTMLDivElement;

const ul = document.createElement("ul");
const li = document.createElement("li") as HTMLLIElement;
const resetFiltersButton = document.createElement(
  "button",
) as HTMLButtonElement;

resetFiltersButton.textContent = "Todas";
resetFiltersButton.addEventListener("click", () => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const card = productCard(product);
    productList.innerHTML += card;
  });
});

li.appendChild(resetFiltersButton);
ul.appendChild(li);

categories.forEach((category) => {
  const li = document.createElement("li") as HTMLLIElement;
  const button = document.createElement("button") as HTMLButtonElement;
  button.textContent = category.nombre;
  button.addEventListener("click", () => {
    const filteredProducts = products.filter((product) =>
      product.categorias.some((cat) => cat.id === category.id),
    );
    productList.innerHTML = "";
    filteredProducts.forEach((product) => {
      const card = productCard(product);
      productList.innerHTML += card;
    });
  });
  li.appendChild(button);
  ul.appendChild(li);
});

categoryContainer.appendChild(ul);

const productList = document.getElementById("product-list") as HTMLDivElement;

document.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  if (target.matches("#search")) {
    const searchTerm = target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.nombre.toLowerCase().includes(searchTerm),
    );
    productList.innerHTML = "";
    filteredProducts.forEach((product) => {
      const card = productCard(product);
      productList.innerHTML += card;
    });
  }
});

products.forEach((product) => {
  const card = productCard(product);
  productList.innerHTML += card;
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.matches("#add-button")) {
    const button = target as HTMLButtonElement;
    const productId = button.dataset.productId;
    if (productId) {
      addProductToCart(Number(productId));
      cartCounter();
    }
  }
});
