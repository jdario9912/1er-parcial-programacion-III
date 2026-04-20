import { getCart } from "../pages/cart/utils";
import { headerUI } from "../ui/header";

export const header = () => {
  const app = document.getElementById("header") as HTMLDivElement;
  app.appendChild(headerUI);
};

export const cartCounter = () => {
  const counterVisor = document.getElementById(
    "cart-counter",
  ) as HTMLSpanElement;
  counterVisor.textContent = String(getCart().length);
};
