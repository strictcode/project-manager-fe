import { Button, Form, Input, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("/api/User/Register", requestOptions)
      .then((response) => {
        if(response.ok){
            notification["success"]({
                message: "Registrace proběhla úspěšně!",
                description: "Vaše registrace proběhla v pořádku, nyní budete přesměrování na hlavní stránku.",
              });
              navigate("/auth/login");
        } else {
            notification["error"]({
                message: "Registrace se nepovedla!",
                description:
                  "Zkuste zadat údaje správně",
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
        <Input size="large" placeholder="Uživatelské jméno" />
      </Form.Item>

      <Form.Item
        name="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Heslo"/>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="uppercase font-semibold py-3 h-auto rounded-md w-full"
        >
       Registrovat se
        </Button>
      </Form.Item>
    </Form>
  );
};
