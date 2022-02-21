import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const SidebarLink = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 1.25em;
  list-style: none;
  height: 3.75em;
  text-decoration: none;
  font-size: 1.2rem;
  &:hover {
    color: #fff;
    background: #6FBD3A;
    border-left: 0.5rem solid #fff;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 1em;
`;

const DropdownLink = styled(Link)`
  background: #6FBD3A;
  height: 3.75em;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  &:hover {
    color: #fff;
    background: #6FBD3A;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;