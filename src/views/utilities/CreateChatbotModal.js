import React, { useState } from 'react';
import handleTokenValidation from '../authentication/auth/handleTokenValidation';
import { Modal, Form, Input, Button, Menu, Upload, message } from 'antd';
import { InboxOutlined, EditOutlined, GlobalOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UploadFile } from '@mui/icons-material';

const { Item } = Menu;
const { Dragger } = Upload;

const CreateChatbotModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [selectedURL, setSelectedURL] = useState('');
  var refreshTokenAttempts = 0;

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const chatbotName = values.chatbotName;

      const createdChatbot = await createChatbot(chatbotName);
      if (createdChatbot && createdChatbot.success) {
        localStorage.setItem('chatbotIdForUrl',createdChatbot.data.chatbot_id);
        message.success('Chatbot creado correctamente.');
        await uploadData();
        onCancel();
      } else {
        message.error('Ocurrió un error al crear el chatbot.');
      }
    } catch (error) {
      console.error(error);
      message.error('Ocurrió un error al crear el chatbot.');
      refreshTokenAttempts++;
      handleTokenValidation(error, handleCreate(), refreshTokenAttempts);
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
      refreshTokenAttempts++;
      handleTokenValidation(error, createChatbot(), refreshTokenAttempts);
    }
  };

  const uploadData = async () => {
    try {
      const chatbotIdForUrl = localStorage.getItem('chatbotIdForUrl');
      const token = localStorage.getItem('token');
      const url = `https://upload-test-xcdhbgn6qa-uc.a.run.app/chatbot/create_chatbot/?chatbot_id=${chatbotIdForUrl}`;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (selectedItem === 'upload' && selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        await axios.post(url, formData, { headers });
        message.success('Archivo cargado correctamente.');
      } else if (selectedItem === 'text' && selectedText) {
        const payload = { data_chat: selectedText };
        await axios.post(url, payload, { headers });
        message.success('Texto procesado correctamente.');
      } else if (selectedItem === 'website' && selectedURL) {
        const payload = { url: selectedURL };
        await axios.post(url, payload, { headers });
        message.success('URL procesada correctamente.');
      } else if (selectedItem === 'qa') {
        const values = await form.validateFields(['question', 'answer']);
        const payload = {
          question: values.question,
          answer: values.answer,
        };
        await axios.post(url, payload, { headers });
        message.success('Q&A procesado correctamente.');
      } else {
        message.error('Por favor, completa los campos requeridos.');
      }
    } catch (error) {
      console.error(error);
      refreshTokenAttempts++;
      handleTokenValidation(error, uploadData(), refreshTokenAttempts);
      message.error('Ocurrió un error al procesar los datos.');
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
              <p className="ant-upload-hint">Soporte para una sola carga.</p>
            </Dragger>
          </div>
        )}
        {selectedItem === 'text' && (
          <div>
            <Input.TextArea
              placeholder="Ingresa el texto"
              rows={4}
              onChange={(e) => setSelectedText(e.target.value)}
            />
          </div>
        )}
        {selectedItem === 'website' && (
          <div>
            <Input
              placeholder="Ingresa la URL"
              onChange={(e) => setSelectedURL(e.target.value)}
            />
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
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default CreateChatbotModal;

