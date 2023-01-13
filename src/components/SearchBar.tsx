import React, { useState } from "react";
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

export default function SearchBar({
    handleEnter,
}: {
    handleEnter: (search: string) => void;
}) {
    const [search, setSearch] = useState<string>("");
    const module: { name: string; query: string } = JSON.parse(
        localStorage.getItem("module") || "{}"
    );

    const getLabel = () => {
        switch (module.name) {
            case "Cuentas por pagar":
                return "Buscar por numero de factura";
            default:
                return "Buscar";
        }
    };

    const handleInputChange = (event: any) => {
        setSearch(event.target.value);
        handleEnter(event.target.value);
    };

    return (
        <div className="search-bar">
            <Tooltip label={getLabel()}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        type="text"
                        placeholder="Buscar"
                        value={search || ""}
                        onChange={handleInputChange}
                    />
                </InputGroup>
            </Tooltip>
        </div>
    );
}
