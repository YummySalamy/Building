import React, { useState, useEffect } from 'react';
import { QuestionCircleOutlined, WechatOutlined, SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Menu, Input, Slider, List, Skeleton, Button, message, Modal, Form } from 'antd';
import axios from 'axios';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const items = [
  {
    label: 'Chat',
    key: 'chat',
    icon: <WechatOutlined />,
  },
  {
    label: 'Configuración',
    key: 'settings',
    icon: <SettingOutlined />,
  },
  {
    label: 'Q&A',
    key: 'qa',
    icon: <QuestionCircleOutlined />,
  },
  {
    label: 'Ver texto',
    key: 'viewText',
  },
];

const ChatBot = () => {
  const [current, setCurrent] = useState('chat');
  const [selectedOption, setSelectedOption] = useState('');
  const [chatName, setChatName] = useState('');
  const [chatTemperature, setChatTemperature] = useState(50);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedChatbotId, setSelectedChatbotId] = useState('');
  const [selectedQaId, setSelectedQaId] = useState('');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateQuestion, setUpdateQuestion] = useState('');
  const [updateAnswer, setUpdateAnswer] = useState('');

  const onClick = (e) => {
    setCurrent(e.key);
    setSelectedOption(e.key);
  };

  const handleChatNameChange = (e) => {
    setChatName(e.target.value);
  };

  const handleTemperatureChange = (value) => {
    setChatTemperature(value);
  };

  const loadData = () => {
    setLoading(true);

    axios
      .get('https://crud-qa-tests-xcdhbgn6qa-uc.a.run.app/quest_ans/list/0', {
        params: {
          page: 0,
          chatbot_id: '58BR6hwUhWaUqEY4L2Oh',
        },
      })
      .then((response) => {
        const newData = response.data;
        setData(newData);
        console.log('Success...');
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // Simulating initial data loading
    loadData();
  }, []);

  const handleDelete = (chatbotId, qaId) => {
    setConfirmModalVisible(true);
    setSelectedChatbotId(chatbotId);
    setSelectedQaId(qaId);
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem('token');

    const url = 'https://crud-qa-tests-xcdhbgn6qa-uc.a.run.app/quest_ans/delete';

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = {
      chatbot_id: selectedChatbotId,
      qa_id: selectedQaId,
    };

    axios
      .delete(url, {
        headers,
        data,
      })
      .then((response) => {
        message.success('Q&A eliminado exitosamente');
        setConfirmModalVisible(false);
        loadData();
      })
      .catch((error) => {
        console.error('Error:', error);
        message.error('Ocurrió un error al eliminar el Q&A');
      });
  };

  const handleCancelDelete = () => {
    setConfirmModalVisible(false);
  };

  const handleUpdate = (chatbotId, qaId, question, answer) => {
    setSelectedChatbotId(chatbotId);
    setSelectedQaId(qaId);
    setUpdateQuestion(question);
    setUpdateAnswer(answer);
    setUpdateModalVisible(true);
  };

  const handleCancelUpdate = () => {
    setUpdateModalVisible(false);
  };

  const handleUpdateSubmit = () => {
    const token = localStorage.getItem('token');
    const url = `https://crud-qa-tests-xcdhbgn6qa-uc.a.run.app/quest_ans/update/${selectedQaId}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      question: updateQuestion,
      answer: updateAnswer,
    };

    axios
      .put(url, data, {
        headers,
        params: {
          chatbot_id: selectedChatbotId,
        },
      })
      .then((response) => {
        message.success('Q&A actualizado exitosamente');
        setUpdateModalVisible(false);
        loadData();
      })
      .catch((error) => {
        console.error('Error:', error);
        message.error('Ocurrió un error al actualizar el Q&A');
      });
  };

  const renderContent = () => {
    if (selectedOption === 'chat') {
      return (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/0I78hQ3XRvG3uJhMLFD9z"
          title="ChatBot"
          frameBorder={0}
          width="100%"
          height="650"
        ></iframe>
      );
    } else if (selectedOption === 'settings') {
      return (
        <div>
          <h4>ID de ChatBot: 0I78hQ3XRvG3uJhMLFD9z</h4>
          <h4>Número de caracteres: 5,124</h4>
          <Input placeholder="Ingrese el nombre de ChatBot" value={chatName} onChange={handleChatNameChange} />
          <div style={{ marginTop: '20px' }}>
            <h4>Temperatura del chat:</h4>
            <Slider
              min={0}
              max={100}
              value={chatTemperature}
              onChange={handleTemperatureChange}
              style={{ width: '200px' }}
            />
          </div>
        </div>
      );
    } else if (selectedOption === 'viewText') {
      return (
        <div>
          <Input placeholder="Ingrese el texto" />
          <Input placeholder="Ingrese el texto" />
        </div>
      );
    } else if (selectedOption === 'qa') {
      return (
        <div>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.qa_id}
                actions={[
                  <Button icon={<EditOutlined />} onClick={() => handleUpdate(item.chatbot_id, item.qa_id, item.question, item.answer)} />,
                  <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item.chatbot_id, item.qa_id)} />,
                ]}
              >
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item.Meta
                    title={<a href="#">{item.question}</a>}
                    description={item.answer}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
          <Modal
            title="¿Eliminar Q&A?"
            visible={confirmModalVisible}
            onOk={handleConfirmDelete}
            onCancel={handleCancelDelete}
          >
            <p>¿Estás seguro de que deseas eliminar este Q&A? Esta acción no se puede revertir.</p>
          </Modal>
          <Modal
            title="Actualizar Q&A"
            visible={updateModalVisible}
            onOk={handleUpdateSubmit}
            onCancel={handleCancelUpdate}
          >
            <Form layout="vertical">
              <Form.Item label="Pregunta">
                <Input value={updateQuestion} onChange={(e) => setUpdateQuestion(e.target.value)} />
              </Form.Item>
              <Form.Item label="Respuesta">
                <Input value={updateAnswer} onChange={(e) => setUpdateAnswer(e.target.value)} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      );
    } else {
      return (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/0I78hQ3XRvG3uJhMLFD9z"
          title="ChatBot"
          frameBorder={0}
          width="100%"
          height="650"
        ></iframe>
      );
    }
  };

  return (
    <PageContainer title="AskITbot" description="This is the ChatBot tab">
      <DashboardCard title={`Nombre de chatbot: ${chatName}`}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        {renderContent()}
      </DashboardCard>
    </PageContainer>
  );
};

export default ChatBot;