import {ReactElement, useState} from 'react';
import { Spinner } from "@chakra-ui/react";

const useLoader = ({}) => {
    const [loading, setLoading] = useState<boolean>(true);

    const loadingDiv = () : ReactElement => {
        if(!loading) return <></>;
        return (
            <div className="loading">
                <Spinner size="xl" color="blue.500" />
                <h2>Cargando...</h2>
            </div>
        );
    };

    return {loading, setLoading, loadingDiv};
}

export default useLoader;