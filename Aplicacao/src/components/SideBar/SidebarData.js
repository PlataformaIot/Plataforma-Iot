import React from 'react';
import * as BiDevices from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiAddFill from 'react-icons/ri';
import * as BiMapPin from 'react-icons/bi';
import * as FiLogOut from 'react-icons/fi';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    
  },
  {
    title: 'Cadastrar Dispositivo',
    path: '/cadastro',
    icon: <RiAddFill.RiAddFill/>,
    cName: 'nav-text'
  },
  {
    title: 'Informações',
    path: '/indicator',
    icon: <BiDevices.BiDevices />,
    cName: 'nav-text'
  },
  {
      title:'Sair',
      path:'/sair',
      icon:<FiLogOut.FiLogOut/>,
      cName:'nav-text'
  }
    
];