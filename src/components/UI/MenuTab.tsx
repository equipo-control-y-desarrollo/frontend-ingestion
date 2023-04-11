import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useGlobalContext } from "../../context/Context";

export default function MenuTab({ name, id }: { name: string; id: string }) {
    const [selected, setSelected] = useState<boolean>(false);
    const [textColor, setTextColor] = useState<string>("white");
    const [backgroundColor, setBackgroundColor] = useState<string>("#00171F");
    const { setID, currentName, setName } = useGlobalContext();

    useEffect(() => {
        if (name !== currentName) {
            setSelected(false);
            setTextColor("white");
            setBackgroundColor("#00171F");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentName]);

    useEffect(() => {
        if (localStorage.getItem("companyData")) {
            const data = JSON.parse(
                localStorage.getItem("companyData") || "{}"
            );
            if (data.id === id) {
                setSelected(true);
                setTextColor("black");
                setBackgroundColor("white");
                setID(id);
                setName(name);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            bg={backgroundColor}
            color={textColor}
            onClick={() => {
                const regex = /\/home\/modules/gm;
                if (!regex.test(window.location.pathname)) return;
                setSelected(!selected);
                if (!selected) {
                    setTextColor("black");
                    setBackgroundColor("white");
                    setID(id);
                    setName(name);
                    localStorage.setItem(
                        "companyData",
                        JSON.stringify({
                            name: name,
                            id: id,
                        })
                    );
                } else {
                    setTextColor("white");
                    setBackgroundColor("#00171F");
                    setID("");
                    setName("");
                    localStorage.removeItem("companyData");
                }
            }}
            onMouseLeave={() => {
                if (!selected) {
                    setTextColor("white");
                    setBackgroundColor("#00171F");
                }
            }}
            onMouseOver={() => {
                if (!selected) {
                    setTextColor("white");
                    setBackgroundColor("#00171F");
                }
            }}
        >
            <Text>{name}</Text>
        </Box>
    );
}
