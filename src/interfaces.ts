import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Company {
    id: string;
    nombre: string;
}

export type GlobalContext = {
    currentID: string;
    currentName: string;
    setID: (id: string) => void;
    setName: (name: string) => void;
};

export interface Module {
    name: string;
    value: string;
    submodules: Module[];
    icon: IconDefinition;
}
