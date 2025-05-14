import { Button, Table } from "antd";
import { useGetEspecialities } from "../../hooks/especialitiesHook";
import { useContext, useEffect } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";

const Especialities = () => {

    const { api } = useContext(NotificationContext);
    const { data: especialidades, isError } = useGetEspecialities();

    useEffect(() => {
        if (isError) {
            api.error({
                message: "Aviso:",
                description: "Erro ao buscar registros",
            });
        }
    }, [isError])

    return (
        <div className="">
            <h1>Especialidades</h1>
            <Table
                dataSource={especialidades}
                rowKey={"especialidade_id"}
                className="w-full border"
            >
                <Table.Column
                    key={"especialidade_id"}
                    dataIndex={"especialidade_id"}
                    title="ID"
                />
                <Table.Column
                    key={"especialidade_nome"}
                    dataIndex={"especialidade_nome"}
                    title="Nome"
                />
                <Table.Column
                    title="Ações"
                    className="w-[100px] flex justify-center"
                    render={(_, render) => (
                        <div className="flex gap-3">
                            <Button
                                type="primary"
                                icon={<EditFilled />}
                                shape="circle"
                                onClick={() => console.log(render.especialidade_id)}
                            />
                            <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                shape="circle"
                                onClick={() => console.log(render.especialidade_id)}
                            />
                        </div>
                    )}
                />
            </Table>
        </div>
    );
}

export default Especialities;