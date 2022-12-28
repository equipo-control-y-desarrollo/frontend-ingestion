import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default interface propsModules {
    name: string;
    value: string;
    submodules: unknown[];
    icon: IconDefinition;
}
