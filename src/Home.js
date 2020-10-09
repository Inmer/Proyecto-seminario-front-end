import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  CarOutlined,
  HistoryOutlined,
  RollbackOutlined,
  BuildOutlined,
  SubnodeOutlined,
  FullscreenExitOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import Clientes from "./Clientes";
import Vehiculos from "./Vehiculos";
import { ClientesContextProvider } from "./context";

const { Header, Content, Sider } = Layout;

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
          <Menu.Item key="1" icon={<CarOutlined />} onClick={setKeyContent}>
            Recepción Vehiculos
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={setKeyContent}>
            Clientes/Vehiculos
          </Menu.Item>

          <Menu.Item key="3" icon={<HistoryOutlined />} onClick={setKeyContent}>
            Histórico servicios
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<RollbackOutlined />}
            onClick={setKeyContent}
          >
            Próximos servicios
          </Menu.Item>
          <Menu.Item key="5" icon={<BuildOutlined />} onClick={setKeyContent}>
            Catalogo tipo servicios
          </Menu.Item>
          <Menu.Item key="6" icon={<SubnodeOutlined />} onClick={setKeyContent}>
            Cotizaciones
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<FullscreenExitOutlined />}
            onClick={setKeyContent}
          >
            Vehiculos en taller
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={<ContainerOutlined />}
            onClick={setKeyContent}
          >
            Contactos
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {/* original con elementos de react
            {content == 1 && (
              <ClientesContextProvider>
                <Clientes />
                <Vehiculos />
              </ClientesContextProvider>
            )} */}

            {content == 1 && (
              <iframe
                style={{
                  border: "none",
                  width: "100%",
                  height: 950,
                  overflow: "hidden",
                }}
                scrolling="no"
                src="https://taller.retool.com/embedded/public/dafdcf4e-227e-41c1-b2a7-a37166dc1798 "
              ></iframe>
            )}
            {content == 2 && (
              <iframe
                style={{
                  border: "none",
                  width: "100%",
                  height: 630,
                  overflow: "hidden",
                }}
                scrolling="no"
                src="https://seminario.retool.com/embedded/public/f47342af-5c18-4013-a54d-0e4b3f55837b"
              ></iframe>
            )}
            {content == 3 && (
              <iframe
                style={{
                  border: "none",
                  width: "100%",
                  height: 650,
                  overflow: "hidden",
                }}
                scrolling="no"
                src="https://test123451.retool.com/embedded/public/0b47464c-e155-44f0-9f26-2cf67d03e740"
              ></iframe>
            )}
            {content == 4 && (
              <iframe
                style={{
                  border: "none",
                  width: "100%",
                  height: 650,
                  overflow: "hidden",
                }}
                scrolling="no"
                src="https://seminario.retool.com/embedded/public/a754480e-bf69-4133-9998-a61f8623e728"
              ></iframe>
            )}
            {content == 5 && (
              <iframe
                style={{
                  border: "none",
                  width: "100%",
                  height: 450,
                  overflow: "hidden",
                }}
                scrolling="no"
                src="https://pruebaw.retool.com/embedded/public/cd6788c9-5bcf-4eb9-8f90-03df864b03dc"
              ></iframe>
            )}
            {content == 6 && (
              <iframe
                style={{
                  border: "none",
                  width: "100%",
                  height: 650,
                  overflow: "hidden",
                }}
                scrolling="no"
                src="https://test123451.retool.com/embedded/public/87f56198-02c7-4129-80bf-8549a06e0bfa"
              ></iframe>
            )}
            {content == 7 && (
              <iframe
                style={{
                  border: "none",
                  width: "100%",
                  height: 450,
                  overflow: "hidden",
                }}
                scrolling="no"
                src="https://test123451.retool.com/embedded/public/353dbb73-5835-485c-bd33-e1eaaa9186b3"
              ></iframe>
            )}
            {content == 8 && (
              <iframe
                style={{
                  border: "none",
                  width: "100%",
                  height: 800,
                  overflow: "hidden",
                }}
                scrolling="no"
                src="https://test123451.retool.com/embedded/public/a3bcdfbb-2054-4ec5-9fce-a8adcd18e042"
              ></iframe>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
