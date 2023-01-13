import { useState } from "react";
import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

export default function SearchBar({
    handleEnter,
}: {
    handleEnter: (search: string) => void;
}) {
    const [search, setSearch] = useState<string>("");

    const handleInputChange = (event: any) => {
        setSearch(event.target.value);
        handleEnter(event.target.value);
    };

    return (
        <div className="search-bar">
            <Tooltip label="Busca por el nombre del registro">
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
