import {useState, useEffect, useRef, useContext} from "react";
import {Box, Text} from "@chakra-ui/react";
import { useGlobalContext } from "./Context";

export default function MenuTab({name, id} : {name: string, id: string}){
    const [selected, setSelected] = useState<boolean>(false);
    const [textColor, setTextColor] = useState<string>("white");
    const [backgroundColor, setBackgroundColor] = useState<string>("#00171F");
    const didMount = useRef(true)
    const {currentID, setID, currentName, setName} = useGlobalContext();

    useEffect(() => {
        if(name != currentName){
            setSelected(false);
            setTextColor("white");
            setBackgroundColor("#00171F");
        }
    }, [currentName])

    return(
        <Box 
        bg={backgroundColor}
        color={textColor}
        onClick={
            () => {
                const regex = /\/home\/modules/gm;
                if(!regex.test(window.location.pathname)) return;
                setSelected(!selected);
                if(!selected){
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
                }
            }
        } onMouseLeave={() => {
            if(!selected){
                console.log("mouse down", selected)
                setTextColor("white");
                setBackgroundColor("#00171F");
            }
        }} 
        onMouseOver={() => {
            if(!selected){
                setTextColor("white");
                setBackgroundColor("#00171F");
            }
        }}>
            <Text>{name}</Text>
        </Box>
    )
}