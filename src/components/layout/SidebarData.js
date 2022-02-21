import React from 'react';
import {GiCarWheel,GiCartwheel,GiMechanicGarage} from 'react-icons/gi';
// import {AiFillHome} from 'react-icons/ai';
// import {IoIosPaper, IoIosPricetags} from 'react-icons/io';
// import {ImUserPlus,ImUsers} from 'react-icons/im';
import {MdCreateNewFolder,MdOutlineRequestQuote} from 'react-icons/md';
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
    title: 'Debt  Mngt',
    path: '#',
    icon: <MdCreateNewFolder />,
    cName: 'nav-text',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Add Debt Collectors',
        path: '/collectors',
        icon: <GiCarWheel />
      },
      {
        title: 'Assign Invoices',
        path: '/invoice_assign',
        icon: <GiCartwheel />
      },
      {
        title: 'Assign Customers',
        path: '/customer_assign',
        icon: <GiCartwheel />
      },
      {
        title: 'Invoice Status',
        path: '/invoice_status',
        icon: <GiCartwheel />
      }
    ]
  },
  {
    title: 'User Mngt',
    path: '#',
    icon: <GiMechanicGarage />,
    cName: 'nav-text',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Add Users',
        path: '/users',
        icon: <GiCarWheel />
      },
      {
        title: 'Approve Pending Users',
        path: '/approve',
        icon: <GiCartwheel />
      }
    ]
  }
];


