import { useNavigate, useLocation } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useGlobalContext } from "../context/Context";
import useLoader from "../hooks/useLoader";
import { getRow } from "../services/rows";
import { messageModal } from "../Utils";
import Form from "../components/Forms";
import { FormProps } from "../interfaces";

export default function AddRow() {
    const [data, setData] = useState<object>({});
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, setLoading, loadingDiv } = useLoader();

    const { currentID } = useGlobalContext();

    let id_enterprise: string =
        currentID || JSON.parse(localStorage.getItem("companyData") || "{}").id;

    const module = JSON.parse(localStorage.getItem("module") || "{}");
    const data_state = location.state;

    const formProps: FormProps = {
        is_update: data_state.isEdit,
        update_values: data,
        row: data_state.id,
    };

    useEffect(() => {
        const query = `${module.query}/${data_state.id}`;
        const loadTheRow = async () => {
            try {
                const res = await getRow(query);
                setData(res.data.data);
            } catch (error) {
                messageModal({
                    iconType: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error en el servidor, por favor, intente más tarde",
                    next: () => {
                        navigate("../../error", { replace: true });
                    },
                });
                throw new Error();
            }
        };

        if (data_state.isEdit) {
            loadTheRow();
        } else {
            setData({ ...data, empresa_id: id_enterprise });
        }
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addDiv = (): ReactElement => {
        const props = {
            form_name: module.name,
            state: data_state,
            formProps,
            data,
        };

        return (
            <div className="addView-page">
                <h2 className="titleShow">Creación en {module.name}</h2>
                <Form {...props} />
                <div className="buttons">
                    <Button
                        colorScheme="blackAlpha"
                        onClick={() => navigate(-1)}
                    >
                        Ir atras
                    </Button>
                    <Button
                        colorScheme="whatsapp"
                        type="submit"
                        form="moduleForm"
                    >
                        {data_state.isEdit
                            ? "Editar Registro"
                            : "Crear Registro"}
                    </Button>
                </div>
            </div>
        );
    };

    return <div>{loading ? loadingDiv() : addDiv()}</div>;
}
