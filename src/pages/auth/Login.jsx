import { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import { Button, Form, Input } from "antd";
import { useLogin } from "../../hooks/userHooks";
import { useNavigate } from "react-router";

const Login = () => {

    const { api } = useContext(NotificationContext);
    const { mutateAsync: login } = useLogin();
    const navigate = useNavigate()

    async function onLogin(data){
        
        login(data,  {
            onSuccess: (response) => {
                if(!response.token){
                    api.warning({
                        message: "Aviso:",
                        description: response.message,
                    });
                    return;
                }
                sessionStorage.setItem("token", response.token);
                navigate("/admin");
            },
            onError: (response) => {
                api.error({
                    message: "Aviso:",
                    description: response.message,
                });
            }
        })
        
    }

    return (
        <div className="w-full md:w-[350px] bg-white p-4 rounded-md shadow-md">
            <h1 className="text-center text-5xl font-semibold text-blue-500 mb-8">Login</h1>
            <Form
                layout="vertical"
                onFinish={onLogin}
            >
                <Form.Item
                    label="Email"
                    name="usuario_email"
                    rules={[{ required: true, message: 'Digite seu email' }]}
                >
                    <Input placeholder="email@email.com" />
                </Form.Item>
                <Form.Item
                    label="Senha"
                    name="usuario_senha"
                    rules={[{ required: true, message: 'Digite sua senha' }]}
                >
                    <Input.Password placeholder="********" />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                >
                    Logar
                </Button>
            </Form>
        </div>
    );
}

export default Login;