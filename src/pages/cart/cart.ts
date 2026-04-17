import { headerUI } from "../../ui/header";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("header") as HTMLDivElement;
  app.appendChild(headerUI);
});
