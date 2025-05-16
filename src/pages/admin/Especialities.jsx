import { useState, useEffect } from 'react'; // Corrigido: useEffect adicionado
import { Button, Table, Drawer, Form, Input, message } from 'antd';
import { EditFilled, DeleteOutlined } from '@ant-design/icons';
import { API } from '../../services';

const Especialities = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentEspecialidade, setCurrentEspecialidade] = useState(null);
  const [form] = Form.useForm();

  // Buscar especialidades
  const fetchEspecialidades = async () => {
    setLoading(true);
    try {
      const response = await API.get('/especialidades');
      setEspecialidades(response.data);
    } catch (error) {
      message.error('Erro ao carregar especialidades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const showDrawer = (record) => {
    setCurrentEspecialidade(record);
    form.setFieldsValue({
      especialidade_nome: record.especialidade_nome
    });
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const response = await API.put(
        `/especialidades/${currentEspecialidade.especialidade_id}`,
        { especialidade_nome: values.especialidade_nome }
      );

      setEspecialidades(prev => 
        prev.map(item => 
          item.especialidade_id === currentEspecialidade.especialidade_id 
            ? response.data 
            : item
        )
      );

      message.success('Especialidade atualizada com sucesso!');
      onClose();
    } catch (error) {
      message.error(error.response?.data?.error || 'Erro ao atualizar');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'especialidade_id',
      key: 'id',
    },
    {
      title: 'NOME',
      dataIndex: 'especialidade_nome',
      key: 'nome',
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
            onClick={() => console.log('Deletar', record.especialidade_id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Especialidades</h1>
      
      <Table
        columns={columns}
        dataSource={especialidades}
        rowKey="especialidade_id"
        loading={loading}
      />

      <Drawer
        title={`Editando ${currentEspecialidade?.especialidade_nome || ''}`}
        width={400}
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
            name="especialidade_nome"
            label="Nome da Especialidade"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Especialities;