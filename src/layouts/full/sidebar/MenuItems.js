import {
  IconLayoutDashboard, IconMessageChatbot, IconPackages, IconHierarchy3, IconBrandPrisma, IconSettings
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Principal',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/app/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilidades',
  },
  {
    id: uniqueId(),
    title: 'Entrenamiento',
    icon: IconPackages,
    href: '/app/ui/filestorage',
  },
  {
    id: uniqueId(),
    title: 'ChatBots',
    icon: IconHierarchy3,
    href: '/app/chatbots',
  },
  {
    id: uniqueId(),
    title: 'ChatBot',
    icon: IconMessageChatbot,
    href: '/app/chatbot',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Gestionar recursos',
    icon: IconBrandPrisma,
    href: '/app/sources',
  },
  {
    id: uniqueId(),
    title: 'Configuración',
    icon: IconSettings,
    href: '/app/sample-page',
  },
];

export default Menuitems;
