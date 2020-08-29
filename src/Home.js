import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import Clientes from "./Clientes";
import Vehiculos from "./Vehiculos";

const { Header, Content, Footer, Sider } = Layout;

export default function SiderDemo() {
  const [collapsed, setcollapsed] = useState(false);
  const [content, setcontent] = useState(1);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setcollapsed(collapsed);
  };

  const setKeyContent = (key) => {
    console.log(key);
    setcontent(key.key);
    console.log(content);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={setKeyContent}
          >
            Clientes
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />} onClick={setKeyContent}>
            Vehiculos
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {content == 1 && <Clientes />}
            {content == 2 && <Vehiculos />}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
