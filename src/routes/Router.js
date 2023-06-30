import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Configuration = Loadable(lazy(() => import('../views/sample-page/ConfigurationPage')))
const ManageSources = Loadable(lazy(() => import('../views/icons/ManageSourcesPage')))
const EmbeddingsPage = Loadable(lazy(() => import('../views/utilities/Embeddings')))
const ChatBot = Loadable(lazy(() => import('../views/utilities/Chatbot')))
const FileStorage = Loadable(lazy(() => import('../views/utilities/Filestorage')))
const Login2 = Loadable(lazy(() => import('../views/authentication/Login')))
const ProfilePage = Loadable(lazy(() => import('../views/sample-page/ProfilePage')))
const Register2 = Loadable(lazy(() => import('../views/authentication/Register')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '/auth', exact: true, element: <Login2 /> },
      { path: '/auth/login', exact: true, element: <Login2 /> },
      { path: '/auth/register', exact: true, element: <Register2 /> },
      { path: '/auth/404', exact: true, element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/app',
    element: <FullLayout />,
    children: [
      { path: '/app/dashboard', exact: true, element: <Dashboard /> },
      { path: '/app/sample-page', exact: true, element: <Configuration /> },
      { path: '/app/icons', exact: true, element: <ManageSources /> },
      { path: '/app/ui/typography', exact: true, element: <EmbeddingsPage /> },
      { path: '/app/ui/shadow', exact: true, element: <ChatBot /> },
      { path: '/app/ui/filestorage', exact: true, element: <FileStorage /> },
      { path: '/app/profile', exact: true, element: <ProfilePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
