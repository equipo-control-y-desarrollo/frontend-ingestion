import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
export interface Company {
    id: string;
    nombre: string;
}
export interface FormProps {
    is_update: boolean;
    update_values: any;
    row: any;
}

export type User = {
    token: string;
    usuario: {
        empresas: Company[];
        id: string;
        isAdmin: boolean;
        password: string;
        username: string;
    };
};

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
