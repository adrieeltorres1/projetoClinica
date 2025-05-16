import { useState, useEffect } from 'react';
import { Button, Drawer, Form, Input, message, Table, Modal } from 'antd';
import { API } from '../../services';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';

const Users = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const response = await API.get('/usuarios');
            setUsuarios(response.data || []);
        } catch (error) {
            message.error('Erro ao buscar usuários');
        } finally {
            setLoading(false);
        }
    };

    const showDrawer = (record) => {
        setSelectedUser(record);
        form.setFieldsValue({
            usuario_nome: record.usuario_nome,
            usuario_email: record.usuario_email
        });
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            
            await API.put(`/usuarios/${selectedUser.usuario_id}`, {
                nome: values.usuario_nome,
                email: values.usuario_email
            });
            
            message.success('Usuário atualizado com sucesso!');
            onClose();
            fetchUsuarios();
        } catch (error) {
            message.error('Erro ao atualizar usuário');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir este usuário?',
            okText: 'Sim',
            cancelText: 'Cancelar',
            onOk: async () => {
                try {
                    await API.delete(`/usuarios/${id}`);
                    message.success('Usuário excluído com sucesso!');
                    fetchUsuarios();
                } catch (error) {
                    message.error('Erro ao excluir usuário');
                }
            }
        });
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'usuario_id',
            key: 'id',
        },
        {
            title: 'NOME',
            dataIndex: 'usuario_nome',
            key: 'nome',
        },
        {
            title: 'EMAIL',
            dataIndex: 'usuario_email',
            key: 'email',
        },
        {
            title: 'AÇÕES',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        icon={<EditFilled />}
                        onClick={() => showDrawer(record)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.usuario_id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Usuários</h1>
            <Table
                columns={columns}
                dataSource={usuarios}
                rowKey="usuario_id"
                loading={loading}
            />
            
            <Drawer
                title={`Editando ${selectedUser?.usuario_nome || 'usuário'}`}
                width={500}
                open={open}
                onClose={onClose}
                footer={
                    <div className="flex justify-end gap-2">
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            Salvar
                        </Button>
                    </div>
                }
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="usuario_nome"
                        label="Nome completo"
                        rules={[
                            { required: true, message: 'Por favor insira o nome' },
                            { min: 3, message: 'Mínimo 3 caracteres' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="usuario_email"
                        label="E-mail"
                        rules={[
                            { required: true, message: 'Por favor insira o e-mail' },
                            { type: 'email', message: 'E-mail inválido' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default Users;