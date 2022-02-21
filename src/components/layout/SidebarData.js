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
];


