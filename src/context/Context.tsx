import { createContext, useContext } from "react";
import { GlobalContext } from "../interfaces";

export const myGlobalContext = createContext<GlobalContext>({
  currentID: "",
  currentName: "",
  setID: (id: string) => {
    /**/
  },
  setName: (name: string) => {
    /**/
  },
});

export const useGlobalContext = () => useContext(myGlobalContext);
