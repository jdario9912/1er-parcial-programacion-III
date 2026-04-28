import { getCategories, getProducts } from "../../data/data";
import { productCard } from "../../templates/catalog-product-card";
import { cartCounter } from "../../ui/common/cart-counter";
import { header } from "../../ui/common/header";
import { addProductToCart, getCart } from "../cart/utils";

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

const searchInput = document.getElementById("search") as HTMLInputElement;

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm),
  );
  productList.innerHTML = "";
  filteredProducts.forEach((product) => {
    const card = productCard(product);
    productList.innerHTML += card;
  });
});

products.forEach((product) => {
  const card = productCard(product);
  productList.innerHTML += card;
});

const addButtons = document.querySelectorAll(
  "#add-button",
) as NodeListOf<HTMLButtonElement>;

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const counterVisor = document.getElementById(
      "cart-counter",
    ) as HTMLSpanElement;

    const productId = button.dataset.productId;
    const product = products.find((p) => p.id === Number(productId));
    if (product) {
      addProductToCart(product.id);
      counterVisor.textContent = String(getCart().length);
    }
  });
});
