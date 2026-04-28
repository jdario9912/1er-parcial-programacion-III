import { cartCounter } from "../../ui/common/cart-counter";
import { header } from "../../ui/common/header";
import { removeItem, renderCart, updateItemQuantity } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  header();
  cartCounter();
});

renderCart();
removeItem();
updateItemQuantity();
