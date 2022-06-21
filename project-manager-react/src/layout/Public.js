import { Link, Outlet } from "react-router-dom";
import { Layout } from 'antd';

const { Content, Footer } = Layout;


export const PublicLayout = () => {
  return (
    <>
      <Layout>
        <Content className="flex items-center justify-center">
            <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
            © 2022 ProjectManager
        </Footer>
      </Layout>
    </>
  );
};
