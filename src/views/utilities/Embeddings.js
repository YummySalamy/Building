import React, { useState, useEffect } from 'react';
import { Table, message, Modal, Button, Form, Input, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import CreateChatbotModal from './CreateChatbotModal';
import handleTokenValidation from 'src/views/authentication/auth/handleTokenValidation.js';

const { confirm } = Modal;
const { Option } = Select;

const columns = [
  {
    title: 'Nombre de ChatBot',
    dataIndex: 'chatbot_name',
    key: 'chatbot_name',
    render: (text, record) => {
      if (record.state_deployed === 'INIT' || record.state_deployed === 'error' || record.state_deployed === 'LOAD_DATA' ) {
        return <Link to={`/app/chatbots`}>{text}</Link>;
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
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  var refreshTokenAttempts = 0;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("https://upload-test-xcdhbgn6qa-uc.a.run.app/document/list/0", {
        params: {
          name_collection: 'Chatbots',
          page: 0,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log(`Success: ${response.data}`);
        setData(response.data);
      } else if (response.status === 401) {
        console.log('Error111:', response.data);
      }
    } catch (error) {
      console.log('Error222:', error.message);
      // Verificar si el error se debe a un problema de token
        refreshTokenAttempts++;
        handleTokenValidation(error, () => fetchData(), refreshTokenAttempts);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (record) => {
    if (record.state_deployed === 'INIT' || record.state_deployed === 'LOAD_DATA') {
      setSelectedChatbot(record);
      localStorage.setItem('chatbot_id_infodisplay', record.chatbot_id);
      localStorage.setItem('chatbot_name_infodisplay', record.chatbot_name);
      navigate(`/app/chatbot`);
    } else {
      message.warning('No se puede actualizar el chatbot en este estado.');
    }
  };

  const handleCreateChatbot = async (values) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('https://aichain-upload-test-dw2j52225q-uc.a.run.app/chatbot/new_chatbot', {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      {
        chatbot_name: values.chatbotName,
      });

      if (response.status === 200) {
        message.success('Chatbot creado exitosamente');
        setShowModal(false);
        form.resetFields();
        fetchData();
    
        // Actualizar el chatbot seleccionado con el nombre ingresado
        setSelectedChatbot({
          ...selectedChatbot,
          chatbot_name: values.chatbotName,
        });
        
      } else {
        message.error('Ocurrió un error al crear el chatbot');
        console.log('Error:', response.data);
      }
    } catch (error) {
      message.error('Ocurrió un error al crear el chatbot');
      console.log(values.chatbotName);
      console.log('Error:', error.message);
    }
  };

  const handleDeleteChatbot = (record) => {
    // Lógica para borrar un chatbot
    message.success(`Se ha borrado el chatbot "${record.chatbot_name}".`);
  
    // Si el chatbot borrado es el chatbot seleccionado, limpiar el estado
    if (selectedChatbot && selectedChatbot.chatbot_id === record.chatbot_id) {
      setSelectedChatbot(null);
    }
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
