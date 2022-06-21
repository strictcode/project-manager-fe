import { TeamOutlined, DashboardOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { notification, Layout, Menu, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

export const AdminLayout = () => {
  const [user, setUser] = useState();
  const navigation = useNavigate();
  useEffect(() => {
    fetch('/api/User/UserInfo')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  async function logout(){
    await fetch('/api/User/Logout', { method: 'POST' });
    notification["success"]({
      message: "Odhlášení proběhlo úspěšně!",
      description: "Přesměrovávám na login.",
    });
    navigation('/auth/login');
  }
  
  return (
    <Layout>
      <Header className="px-3 bg-primary-900 header">
        <h1 className="inline-block float-left pt-3 text-white text-3xl"  style={{marginRight: "calc(75vw - 248px)"}}>Project Manager</h1>
        <Menu theme="dark" mode="horizontal" className="bg-primary-900 header-menu">
            <Menu.Item key={1}>
                <Avatar className="float-left inline-block mt-4 mr-5" size="large" icon={<UserOutlined />} />
                <section className="float-left flex py-2 flex-col justify-evenly h-full text-white text user-info">
                    <span className="text-lg">{ user && user.userName} </span>
                    <span className="text-slate-400">{ user && user.userName} </span>
                </section>
            </Menu.Item>
            <Menu.Item key={2} onClick={logout}>
                <LogoutOutlined />
                <span>Odhlásit se</span>
            </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
          >
             <Menu.Item key={1}>
                <DashboardOutlined />
                <Link to="/admin/projects">
                    <span className="pl-2.5">Projekty</span>
                </Link>
              </Menu.Item>
              <Menu.Item key={2}>
                <TeamOutlined />
                <Link to="/admin/users">
                    <span className="pl-2.5">Uživatelé</span>
                </Link>
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            className="site-layout-background page-min-content"
            style={{
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
