export const logoTemplate = () => {
  const logo = document.createElement("h1") as HTMLElement;
  logo.innerHTML = `<a href="/">Food Store</a>`;
  return logo;
};
