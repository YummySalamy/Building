import React, { useState } from 'react';
import { Modal, Form, Input, Button, Menu, Upload } from 'antd';
import { InboxOutlined, EditOutlined, GlobalOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Item } = Menu;
const { Dragger } = Upload;

const CreateChatbotModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState('upload');

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const chatbotName = values.chatbotName;

      onCreate(chatbotName);
      onCancel();
    } catch (error) {
      console.error(error);
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
            />
          </div>
        )}
        {selectedItem === 'website' && (
          <div>
            <Input
              placeholder="Ingresa la URL"
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
