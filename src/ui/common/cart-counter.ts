import { getCart } from "../../pages/cart/utils";

export const cartCounter = () => {
  const counterVisor = document.getElementById(
    "cart-counter",
  ) as HTMLSpanElement;
  counterVisor.textContent = String(getCart().length);
};
