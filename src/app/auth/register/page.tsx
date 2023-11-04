"use client";
import Link from "next/link";
import React from "react";
import { getAntdFieldRequiredRule } from "@/helpers/validations";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Form, message } from "antd";

interface userType {
  name: string;
  email: string;
  password: string;
}

function Register() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const onRegister = async (values: userType) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/register", values);
      message.success("Registro feito com sucesso , faça o login para continuar");
      router.push("/auth/login");
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="h-full bg-principal_logo hidden md:flex items-center justify-center">
        <img src="/Vector.png" alt="Logo" />
      </div>

      <div className="flex items-center justify-center h-full">
        <Form
          className="w-[400px] flex flex-col gap-5"
          layout="vertical"
          onFinish={onRegister}
        >
          <h1 className="text-2xl font-bold">Registrar</h1>

          <hr />

          <Form.Item
            name="name"
            label="Nome"
            rules={getAntdFieldRequiredRule("Por favor, digite seu nome!")}
          >
            <input type="text" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={getAntdFieldRequiredRule("Por favor, digite se email!")}
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
            Registrar
          </Button>

          <Link href="/auth/login" className="text-primary">
            Já possui uma conta?
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
