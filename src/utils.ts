import Cookies from "js-cookie";

export const logOut = () => {
  return Cookies.remove("token");
};
