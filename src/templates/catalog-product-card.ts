import type { Product } from "../types/product";

export const productCard = (product: Product) => {
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
          <button class="add-button" id="add-button" data-product-id="${product.id}">+ Agregar</button>
      </div>
  </div>
  `;
};
