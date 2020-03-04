import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from "react-router-dom";
const { Sider } = Layout

import routeLinks from '../routes';

function SideLinks({ collapsed }) {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {
          routeLinks.map(link =>
            <Menu.Item key={link.path}>
              <Link to={`/manage${link.path}`}>
                <Icon type={link.icon} />
                <span>{link.label}</span>
              </Link>
            </Menu.Item>
          )
        }
      </Menu>
    </Sider>
  )
}

export default SideLinks
