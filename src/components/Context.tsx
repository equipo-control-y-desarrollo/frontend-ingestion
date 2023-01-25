import { createContext, useContext } from "react";
export type  GlobalContext = {
    currentID: string,
    currentName: string,
    setID: (id: string) => void,
    setName: (name: string) => void,
}

export const myGlobalContext = createContext<GlobalContext>({
    currentID: "",
    currentName: "",
    setID: (id: string) => {},
    setName: (name: string) => {},
})

export const useGlobalContext = () => useContext(myGlobalContext); 