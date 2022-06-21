import { Button, Form, Input, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("/api/User/Login", requestOptions)
      .then((response) => {
        if(response.ok){
            notification["success"]({
                message: "Přihlášení proběhlo úspěšně!",
                description: "Přesměrovávám na dashboard s projekty.",
              });
              navigate("/admin/projects");
        } else {
            notification["error"]({
                message: "Přihlášení se nezdařilo!",
                description:
                  "Zadal jste špatné přihlašovací údaje, zkuste zkontrolovat vaše údaje a přihlásit se znovu.",
              });
        }
      })
  };

  return (
    <Form
      name="basic"
      wrapperCol={{ span: 24 }}
      initialValues={null}
      onFinish={onFinish}
      autoComplete="true"
    >
      <Form.Item
        name="Email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input size="large" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="uppercase font-semibold py-3 h-auto rounded-md w-full"
        >
          Přihlásit se
        </Button>
      </Form.Item>
    </Form>
  );
};
