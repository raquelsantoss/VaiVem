import React from "react";
import { Form, Button, message } from "antd";
import { getAntdFieldRequiredRule } from "@/helpers/validations";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetCurrentUser } from "@/redux/userSlice";

function PersonalInfo() {
  const [loading, setLoading] = React.useState(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const onSave = async (values: any) => {
    try {
      setLoading(true);
      const endPoint = `/api/users/${currentUser._id}`;
      const response = await axios.put(endPoint, values);
      dispatch(SetCurrentUser(response.data));
      message.success("Usuário atualizado com sucesso");
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Form
        className="w-[400px] flex flex-col gap-5"
        layout="vertical"
        onFinish={onSave}
        initialValues={{
          name: currentUser.name,
          email: currentUser.email,
        }}
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={getAntdFieldRequiredRule("Por favor, insira seu nome!")}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={getAntdFieldRequiredRule("Por favor, insira seu email!")}
        >
          <input type="email" disabled />
        </Form.Item>

        <Form.Item
          name="password"
          label="Senha"
          rules={getAntdFieldRequiredRule("Por favor, insira sua antiga senha!")}
        >
          <input type="password" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Nova Senha"
          rules={getAntdFieldRequiredRule("Por favor, insira sua nova senha!")}
        >
          <input type="password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Salvar
        </Button>
      </Form>
    </div>
  );
}

export default PersonalInfo;