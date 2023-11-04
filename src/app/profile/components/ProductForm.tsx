/* eslint-disable @next/next/no-img-element */
import { getAntdFieldRequiredRule } from "@/helpers/validations";
import { Button, Form, message, Upload } from "antd";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

function ProductForm({
  setSelectedFiles,
  loading,
  initialValues,
  onSave,
  existingImages = [],
  setExistingImages,
}: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = React.useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <Form
        layout="vertical"
        className="mt-10 flex flex-col xl:grid grid-cols-3 gap-5"
        onFinish={onSave}
        initialValues={initialValues}
      >
        <div className="col-span-3">
          <Form.Item
            label="Nome"
            name="name"
            rules={getAntdFieldRequiredRule("Nome é obrigatório")}
          >
            <input />
          </Form.Item>
        </div>
        <div className="col-span-3">
          <Form.Item
            label="Descrição"
            name="description"
            rules={getAntdFieldRequiredRule("Descrição é obrigatória")}
          >
            <textarea />
          </Form.Item>
        </div>

        <Form.Item
          label="Preço"
          name="price"
          rules={getAntdFieldRequiredRule("Preço é obrigatório")}
        >
          <input type="number" />
        </Form.Item>

        <Form.Item
          label="Categoria"
          name="category"
          rules={getAntdFieldRequiredRule("Categoria é obrigatória")}
        >
          <select>
            <option value="">Selecionar Categoria</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item
          label="Qtd em Estoque"
          name="countInStock"
          rules={getAntdFieldRequiredRule("Estoque é obrigatório")}
        >
          <input type="number" />
        </Form.Item>

        <div className="col-span-3 flex gap-5">
          {existingImages.map((image: any) => (
            <div
              key={image}
              className="border border-solid p-3 border-gray-300"
            >
              <img src={image} alt="product" className="w-20 h-20" />
              <h1
                className=" cursor-pointer underline text-sm"
                onClick={() => {
                  setExistingImages((prev: any) =>
                    prev.filter((i: any) => i !== image)
                  );
                }}
              >
                Remover
              </h1>
            </div>
          ))}
        </div>

        <div className="col-span-3">
          <Upload
            listType="picture-card"
            multiple
            beforeUpload={(file) => {
              setSelectedFiles((prev: any) => [...prev, file]);
              return false;
            }}
          >
            Upload
          </Upload>
        </div>

        <div className="col-span-3 mt-10">
          <h1 className="text-lg font-semibold">Features</h1>
          <Form.List name="features">
            {(fields, { add, remove }) => (
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                  <div key={field.key} className="flex gap-5 items-end">
                    <Form.Item
                      label={`Feature ${index + 1}`}
                      name={[field.name]}
                      className="w-full"
                    >
                      <input />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)}>Remover</Button>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  className="mt-5"
                >
                  Adicionar Feature
                </Button>
              </div>
            )}
          </Form.List>
        </div>

        <div className="col-span-3 justify-end flex gap-5">
          <Button onClick={() => router.back()}>Voltar</Button>
          <Button style={{ backgroundColor: "#00B4FF",  color: "#fff"}} type="default" htmlType="submit" loading={loading}>
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductForm;

interface ProductFormProps {
  setSelectedFiles: any;
  loading: boolean;
  onSave: any;
  initialValues?: any;
  existingImages?: any;
  setExistingImages?: any;
}