import React from "react";
import { Form, Modal, message } from "antd";
import { getAntdFieldRequiredRule } from "@/helpers/validations";
import axios from "axios";

function CategoryForm({
  showCategoryForm,
  setShowCategoryForm,
  reloadData,
  selectedCategory,
  setSelectedCategory,
}: CategoryFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if (selectedCategory) {
        await axios.put(`/api/categories/${selectedCategory._id}`, values);
        message.success("Categoria atualizada com sucesso");
      } else {
        await axios.post("/api/categories", values);
        message.success("Categoria adicionada com sucesso");
      }
      setShowCategoryForm(false);
      setSelectedCategory(null);
      reloadData();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showCategoryForm}
      onCancel={() => {
        setShowCategoryForm(false);
        setSelectedCategory(null);
      }}
      centered
      title={
        <h1 className="text-2xl font-bold text-gray-800">
          {selectedCategory ? "Edit Category" : "Add Category"}
        </h1>
      }
      closable={false}
      okText="Salvar"
      onOk={() => {
        form.submit();
      }}
      okButtonProps={{
        loading,
      }}
    >
      <hr />
      <Form
        layout="vertical"
        className="flex flex-col gap-5 mt-5"
        form={form}
        onFinish={onFinish}
        initialValues={selectedCategory}
      >
        <Form.Item
          label="Nome da Categoria"
          name="name"
          rules={getAntdFieldRequiredRule("Nome da categoria é obrigatório")}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item label="Descrição da Categoria" name="description">
          <textarea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CategoryForm;

interface CategoryFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: (show: boolean) => void;
  reloadData: () => void;
  selectedCategory: any;
  setSelectedCategory: (category: any) => void;
}