import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import SideLinks from '../components/SideLinks'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function MainLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ height: '100vh' }}>
      <SideLinks collapsed={collapsed} />
      <Layout>
        <Header style={{ background: '#fff', paddingLeft: '10px' }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            style={{ marginRight: '10px' }}
            onClick={() => setCollapsed(!collapsed)}
          />
          <span>{ collapsed ? 'Expand Menu': 'Shrink Menu'}</span>
        </Header>
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
