import React from 'react';
import {RiDashboardLine} from 'react-icons/ri'
import {RiArrowDownSFill,RiArrowUpSFill} from 'react-icons/ri';



export const admin_side = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <RiDashboardLine/>,
    cName: 'nav-text',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <RiDashboardLine/>,
    cName: 'nav-text',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
];

export const client_side = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <RiDashboardLine/>,
    cName: 'nav-text',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },

  {
    title: 'Apply For A loan',
    path: '/loan',
    icon: <RiDashboardLine/>,
    cName: 'nav-text',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
];


