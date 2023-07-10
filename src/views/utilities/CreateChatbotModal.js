import React, { useState } from 'react';
import { Modal, Form, Input, Button, Menu, Upload, message } from 'antd';
import { InboxOutlined, EditOutlined, GlobalOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Item } = Menu;
const { Dragger } = Upload;

const CreateChatbotModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [selectedURL, setSelectedURL] = useState('');
  const [chatbotId, setChatbotId] = useState('');

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const chatbotName = values.chatbotName;

      const createdChatbot = await createChatbot(chatbotName);
      if (createdChatbot && createdChatbot.success) {
        setChatbotId(createdChatbot.data.chatbot_id);
        message.success('Chatbot creado correctamente.');
      } else {
        message.error('Ocurrió un error al crear el chatbot.');
      }

      onCancel();
    } catch (error) {
      console.error(error);
      message.error('Ocurrió un error al crear el chatbot.');
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} cargado correctamente.`);
      setSelectedFile(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`Error al cargar ${info.file.name}.`);
    }
  };

  const createChatbot = async (chatbotName) => {
    try {
      const token = localStorage.getItem('token');
      const url = 'https://upload-test-xcdhbgn6qa-uc.a.run.app/chatbot/new_chatbot/';

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(url, { chatbot_name: chatbotName }, { headers });

      return response.data;
    } catch (error) {
      console.error(error);
      message.error('Ocurrió un error al crear el chatbot.');
      return null;
    }
  };

  const uploadFile = async () => {
    try {
      if (!selectedFile) {
        message.error('Por favor, selecciona un archivo.');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const url = `https://upload-test-xcdhbgn6qa-uc.a.run.app/chatbot/create_chatbot/?chatbot_id=${chatbotId}`;
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(url, formData, { headers });

      message.success('Archivo cargado correctamente.');
    } catch (error) {
      console.error(error);
      message.error('Ocurrió un error al cargar el archivo.');
    }
  };

  const uploadText = async () => {
    try {
      if (!selectedText) {
        message.error('Por favor, ingresa el texto.');
        return;
      }

      const payload = {
        data_chat: selectedText,
      };

      const url = `https://upload-test-xcdhbgn6qa-uc.a.run.app/chatbot/create_chatbot/?chatbot_id=${chatbotId}`;
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await axios.post(url, payload, { headers });

      message.success('Texto procesado correctamente.');
    } catch (error) {
      console.error(error);
      message.error('Ocurrió un error al procesar el texto.');
    }
  };

  const uploadWebsite = async () => {
    try {
      if (!selectedURL) {
        message.error('Por favor, ingresa la URL.');
        return;
      }

      const item = {
        url: selectedURL,
      };

      const url = `https://upload-test-xcdhbgn6qa-uc.a.run.app/chatbot/create_chatbot/?chatbot_id=${chatbotId}`;
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await axios.post(url, item, { headers });

      message.success('URL procesada correctamente.');
    } catch (error) {
      console.error(error);
      message.error('Ocurrió un error al procesar la URL.');
    }
  };

  const uploadQA = async () => {
    try {
      const url = 'https://crud-qa-tests-xcdhbgn6qa-uc.a.run.app/quest_ans/create';
      const token = localStorage.getItem('token');
  
      const values = await form.validateFields();
      const question = values.question;
      const answer = values.answer;
  
      const payload = {
        question: question,
        answer: answer,
        chatbot_id: chatbotId,
      };
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await axios.post(url, payload, { headers });
  
      message.success('Q&A procesado correctamente.');
    } catch (error) {
      console.error(error);
      message.error('Ocurrió un error al procesar el Q&A.');
    }
  };  

  return (
    <Modal
      visible={visible}
      title="Crear Chatbot"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="create" type="primary" onClick={handleCreate}>
          Crear
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="chatbotName"
          label="Nombre del Chatbot"
          rules={[{ required: true, message: 'Por favor ingresa el nombre del chatbot' }]}
        >
          <Input />
        </Form.Item>
        <Menu onClick={handleMenuClick} selectedKeys={[selectedItem]} mode="horizontal">
          <Item key="upload" icon={<InboxOutlined />}>
            Subir archivo
          </Item>
          <Item key="text" icon={<EditOutlined />}>
            Texto
          </Item>
          <Item key="website" icon={<GlobalOutlined />}>
            Sitio Web
          </Item>
          <Item key="qa" icon={<QuestionCircleOutlined />}>
            Q&A
          </Item>
        </Menu>
        {selectedItem === 'upload' && (
          <div>
            <Dragger
              name="file"
              multiple={false}
              onChange={handleUploadChange}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Haz clic o arrastra un archivo para cargarlo</p>
              <p className="ant-upload-hiento">Soporte para una sola carga.</p>
            </Dragger>
            <Button type="primary" onClick={uploadFile}>
              Subir archivo
            </Button>
          </div>
        )}
        {selectedItem === 'text' && (
          <div>
            <Input.TextArea
              placeholder="Ingresa el texto"
              rows={4}
              onChange={(e) => setSelectedText(e.target.value)}
            />
            <Button type="primary" onClick={uploadText}>
              Procesar texto
            </Button>
          </div>
        )}
        {selectedItem === 'website' && (
          <div>
            <Input
              placeholder="Ingresa la URL"
              onChange={(e) => setSelectedURL(e.target.value)}
            />
            <Button type="primary" onClick={uploadWebsite}>
              Procesar URL
            </Button>
          </div>
        )}
        {selectedItem === 'qa' && (
          <div>
            <Form.Item
              name="question"
              label="Pregunta"
              rules={[{ required: true, message: 'Por favor ingresa la pregunta' }]}
            >
              <Input placeholder="Ingresa la pregunta" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Respuesta"
              rules={[{ required: true, message: 'Por favor ingresa la respuesta' }]}
            >
              <Input.TextArea placeholder="Ingresa la respuesta" rows={4} />
            </Form.Item>
            <Button type="primary" onClick={uploadQA}>
              Procesar Q&A
            </Button>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default CreateChatbotModal;
