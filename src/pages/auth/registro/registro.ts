import type { IUser } from "../../../types/IUserStorage";
import { saveUsers } from "../../../utils/localStorage";

const form = document.querySelector<HTMLFormElement>("#form");

form?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const formElement = e.currentTarget as HTMLFormElement;
  const formData = new FormData(formElement);
  const user: IUser = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  await saveUsers(user);

  formElement.reset();
});
