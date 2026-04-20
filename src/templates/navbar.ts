export const navBarTemplate = () => {
  const navBar = document.createElement("nav") as HTMLElement;

  navBar.innerHTML = `
    <ul>
      <li><a href="/src/pages/catalog/catalog.html">Catalog</a></li>
      <li><a href="/src/pages/cart/cart.html">Cart<span id="cart-counter"></span></a></li>
    </ul>
  `;

  return navBar;
};
