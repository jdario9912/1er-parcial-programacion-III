import type { Product } from "../types/product";

export const cartProductCard = (product: Product) => {
  return `
    <div class="cart-card">
        <div class="cart-card-image">
            <img src="${product?.imagen}" alt="${product?.nombre}" />
        </div>
        <div class="cart-card-info">
            <div class="cart-card-details">
                <div>
                    <h3 class="cart-card-name">${product?.nombre}</h3>
                    <p class="cart-card-category">
                        ${product?.categorias[0].nombre}
                    </p>
                </div>
                <p class="cart-card-price">
                    Subtotal: $${product?.precio}
                </p>
            </div>
            <div class="cart-card-actions">
                <div class="cart-card-quantity">
                    <button>-</button><span>1</span
                    ><button>+</button>
                </div>
                <button class="remove-button" data-product-id="${product?.id}" id="remove-button">
                    Eliminar
                </button>
            </div>
        </div>
    </div>
    `;
};
