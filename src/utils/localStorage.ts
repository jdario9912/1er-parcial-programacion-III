import type { IUser, IUserStoraged } from "../types/IUserStorage";
import type { Rol } from "../types/Rol";

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

const usersKey = "users";

const getUsersFromLocaleStorage = (): IUserStoraged[] => {
  const raw = localStorage.getItem(usersKey);
  return raw ? JSON.parse(raw) : [];
};

const ROLES: Rol[] = ["client", "admin"];

const getRandomRol = (): Rol => ROLES[Math.floor(Math.random() * ROLES.length)];

export const saveUsers = async (user: IUser): Promise<void> => {
  const usersSaved: IUserStoraged[] = getUsersFromLocaleStorage();
  const role = getRandomRol();
  const usersParsedToSave = JSON.stringify([...usersSaved, { ...user, role }]);
  localStorage.setItem(usersKey, usersParsedToSave);
};
