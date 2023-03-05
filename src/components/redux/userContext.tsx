import { createContext, useContext } from "react";

const defaultValue = "light"
const userAuthContext = createContext(defaultValue);

export function useUserAuth() {
    return useContext(userAuthContext);
  }