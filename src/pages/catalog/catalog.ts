import { getCategories, getProducts } from "../../data/data";
import type { Product } from "../../types/product";
import { headerUI } from "../../ui/header";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("header") as HTMLDivElement;
  app.appendChild(headerUI);
});

const categoryContainer = document.getElementById(
  "category-container",
) as HTMLDivElement;

const ul = document.createElement("ul");

const categories = getCategories();

categories.forEach((category) => {
  const li = document.createElement("li");
  li.textContent = category.nombre;
  ul.appendChild(li);
});

categoryContainer.appendChild(ul);

const productList = document.getElementById("product-list") as HTMLDivElement;

const products = getProducts();

const productCard = (product: Product) => {
  return `
  <div id="product-card" class="product-card">
      <img
          src="${product.imagen}"
          alt="${product.nombre}"
          class="product-image"
      />
      <div class="product-details">
          <div class="producto-category-price-container">
              <p class="product-category">${product.categorias[0].nombre}</p>
              <span class="product-price">$${product.precio.toFixed(2)}</span>
          </div>
          <h4 class="product-name">
              ${product.nombre}
          </h4>
          <p class="product-description">
              ${product.descripcion}
          </p>
          <button class="add-button">+ Agregar</button>
      </div>
  </div>
  `;
};

products.forEach((product) => {
  const card = productCard(product);
  productList.innerHTML += card;
});
