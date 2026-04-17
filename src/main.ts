import { headerUI } from "./ui/header";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app") as HTMLDivElement;
  app.appendChild(headerUI);
});
