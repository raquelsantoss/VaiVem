"use client";
import Link from "next/link";
import React from "react";
import { getAntdFieldRequiredRule } from "@/helpers/validations";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Form, message } from "antd";

interface userType {
  email: string;
  password: string;
}

function Login() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onLogin = async (values: userType) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/login", values);
      message.success("Login feito com sucesso");
      router.push("/");
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="h-full bg-principal hidden md:flex items-center justify-center">
        <h1 className="text-7xl font-bold text-white">Vai</h1>
        <h1 className="text-7xl font-bold text-white">Vem</h1>
      </div>

      <div className="flex items-center justify-center h-full">
        <Form
          className="w-[400px] flex flex-col gap-5"
          layout="vertical"
          onFinish={onLogin}
        >
          <h1 className="text-2xl font-bold">Login</h1>

          <hr />

          <Form.Item
            name="email"
            label="Email"
            rules={getAntdFieldRequiredRule("Por favor, digite seu email!")}
          >
            <input type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={getAntdFieldRequiredRule("Por favor, digite sua senha!")}
          >
            <input type="password" />
          </Form.Item>

          <Button htmlType="submit" block style={{ backgroundColor: "#00B4FF",  color: "#fff"}} loading={loading}>
            Login
          </Button>

          <Link href="/auth/register" className="text-primary">
            Ainda não possui uma conta?
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
