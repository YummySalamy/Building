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

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const chatbotName = values.chatbotName;

      // Realizar acciones según el elemento seleccionado
      if (selectedItem === 'upload') {
        if (!selectedFile) {
          message.error('Por favor, selecciona un archivo.');
          return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        const token = localStorage.getItem('token');
        axios.post(
          'https://upload-test-xcdhbgn6qa-uc.a.run.app/chatbot/new_chatbot/',
          {
            name: chatbotName,
          },
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        );

        await axios.post(
          `https://upload-test-xcdhbgn6qa-uc.a.run.app/chatbot/create_chatbot/`,
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          formData,
        );

        message.success('Chatbot creado y archivo cargado correctamente.');
      } else if (selectedItem === 'text') {
        if (!selectedText) {
          message.error('Por favor, ingresa el texto.');
          return;
        }
        const token = localStorage.getItem('token');
        await axios.post(
          'https://upload-test-xcdhbgn6qa-uc.a.run.app/chatbot/new_chatbot/',
          {
            name: chatbotName,
          },
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        );
        message.success('Chatbot creado y texto procesado correctamente.');
      } else if (selectedItem === 'website') {
        if (!selectedURL) {
          message.error('Por favor, ingresa la URL.');
          return;
        }


        message.success('Chatbot creado y URL procesada correctamente.');
      } else if (selectedItem === 'qa') {

        message.success('Chatbot creado y Q&A procesado correctamente.');
      }

      onCreate(chatbotName);
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
              value={selectedText}
              onChange={(e) => setSelectedText(e.target.value)}
              rows={4}
            />
          </div>
        )}
        {selectedItem === 'website' && (
          <div>
            <Input
              placeholder="Ingresa la URL"
              value={selectedURL}
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
