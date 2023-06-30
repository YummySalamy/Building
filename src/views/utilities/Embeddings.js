import React, { useState, useEffect } from 'react';
import { Table, message, Modal, Button, Form, Input, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateChatbotModal from './CreateChatbotModal';

const { confirm } = Modal;
const { Option } = Select;

const columns = [
  {
    title: 'Nombre de ChatBot',
    dataIndex: 'chatbot_name',
    key: 'chatbot_name',
    render: (text, record) => {
      if (record.state_deployed === 'INIT' || record.state_deployed === 'error') {
        return <Link to={`/app/ui/shadow`}>{text}</Link>;
      } else {
        return text;
      }
    },
  },
  {
    title: 'Estado',
    dataIndex: 'state_deployed',
    key: 'state_deployed',
  },
  {
    title: 'Acción',
    dataIndex: '',
    key: 'x',
    render: (_, record) => (
      <a onClick={() => showConfirm(record)}>Borrar {<DeleteOutlined />}</a>
    ),
  },
];

const handleDelete = (record) => {
  // Lógica para borrar un chatbot
  message.success(`Se ha borrado el chatbot "${record.chatbot_name}".`);
};

const showConfirm = (record) => {
  confirm({
    title: '¿Estás seguro de borrar este chatbot?',
    content: `Se borrará el chatbot "${record.chatbot_name}".`,
    okText: 'Borrar',
    okType: 'danger',
    cancelText: 'Cancelar',
    onOk() {
      handleDelete(record);
    },
  });
};

const EmbeddingsPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://aichain-upload-test-dw2j52225q-uc.a.run.app/document/list/0', {
        params: {
          name_collection: 'Chatbots',
          page: 0,
        }
      });

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log('Error:', response.data);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (record) => {
    if (record.state_deployed === 'INIT' || record.state_deployed === 'error') {
      // setShowUpdateContainer(true);
    } else {
      message.warning('No se puede actualizar el chatbot en este estado.');
    }
  };

  const handleCreateChatbot = async (values) => {
    try {
      const response = await axios.post('https://aichain-upload-test-dw2j52225q-uc.a.run.app/chatbot/new_chatbot', {
        chatbot_name: values.chatbotName,
      });

      if (response.status === 200) {
        message.success('Chatbot creado exitosamente');
        setShowModal(false);
        form.resetFields();
        fetchData();
      } else {
        message.error('Ocurrió un error al crear el chatbot');
        console.log('Error:', response.data);
      }
    } catch (error) {
      message.error('Ocurrió un error al crear el chatbot');
      console.log('Error:', error.message);
    }
  };

  const handleDelete = (record) => {
    // Lógica para borrar un chatbot
    message.success(`Se ha borrado el chatbot "${record.chatbot_name}".`);
  };

  const handleFilterSubmit = (values) => {
    console.log('Filter Form:', values);

    // Almacenar los valores de filtrado
    setFilterValues(values);

    // Lógica para filtrar los elementos de la lista según los valores ingresados
    const filteredData = data.filter((item) => {
      const nameMatch = item.chatbot_name.toLowerCase().includes(values.chatbotName.toLowerCase());
      const stateMatch = values.chatbotState ? item.state_deployed === values.chatbotState : true;
      return nameMatch && stateMatch;
    });

    setData(filteredData);
  };

  const handleReloadTable = () => {
    // Limpiar los valores de filtrado y volver a cargar la tabla completa
    setFilterValues(null);
    fetchData();
  };
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };
  const isFiltering = filterValues && (filterValues.chatbotName || filterValues.chatbotState);

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setShowModal(true)}>
          +
        </Button>
        <CreateChatbotModal visible={showModal} onCancel={() => setShowModal(false)} onCreate={handleCreateChatbot} />
        <Button onClick={toggleFilter}>Filtrar</Button>
        {isFiltering && (
          <Button onClick={handleReloadTable}>
            Recargar Tabla
          </Button>
        )}
      </div>
      <Modal
        visible={filterVisible}
        title="Filtrar Chatbots"
        onCancel={toggleFilter}
        onOk={filterForm.submit}
      >
        <Form form={filterForm} onFinish={handleFilterSubmit} id="inputChatbotName">
          <Form.Item name="chatbotName" label="Nombre del Chatbot">
            <Input />
          </Form.Item>
          <Form.Item name="chatbotState" label="Estado del Chatbot">
            <Select>
              <Option value="INIT">INIT</Option>
              <Option value="LOAD_DATA">LOAD_DATA</Option>
              <Option value="ERROR">ERROR</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Filtrar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <p><strong>ID de ChatBot:</strong> {record.chatbot_id}</p>
              <p><strong>ID de Usuario:</strong> {record.user_id}</p>
              <p><strong>Estado Activo:</strong> {record.active_state ? 'Sí' : 'No'}</p>
            </div>
          ),
          rowExpandable: (record) => !!record.chatbot_id,
        }}
        locale={{
          emptyText: 'No hay datos disponibles',
        }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        footer={() => `Total de chatbots: ${data.length}`}
      />
    </>
  );
};

export default EmbeddingsPage;
