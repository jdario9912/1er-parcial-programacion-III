import { headerUI } from "../header";

export const header = () => {
  const app = document.getElementById("header") as HTMLDivElement;
  app.appendChild(headerUI);
};
