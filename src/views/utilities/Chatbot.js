import React, { useState } from 'react';
import { QuestionCircleOutlined, WechatOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Input, Slider, List, Avatar, Skeleton, Button } from 'antd';
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
    // Simulating data loading
    setTimeout(() => {
      const newData = Array.from({ length: 5 }, (_, index) => ({
        id: index,
        name: `Pregunta ${index+1}`,
        description: `Respuesta #${index+1}`,
      }));
      setData(newData);
      setLoading(false);
    }, 1500);
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
          <Button onClick={loadData} loading={loading}>
            Recargar pares de Q&A
          </Button>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item.Meta
                    title={<a href="#">{item.name}</a>}
                    description={item.description}
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
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

