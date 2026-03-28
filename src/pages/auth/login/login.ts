import type { IUserSession } from "../../../types/IUserSession";
import { getUsers, saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const alert = document.getElementById("alert") as HTMLSpanElement;

const usersStoraged = await getUsers();

form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const userFounded = usersStoraged.filter(
    (u) => u.email == valueEmail && u.password == valuePassword,
  )[0];

  if (!userFounded) {
    alert.style.display = "block";
    return;
  }

  const role = userFounded.role;

  const user: IUserSession = {
    email: valueEmail,
    role: role,
    loggedIn: true,
  };

  saveUser(user);

  if (role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else if (role === "client") {
    navigate("/src/pages/client/home/home.html");
  }
});
