"use client";
import React from "react";
import { Button, Table, message } from "antd";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import moment from "moment";

function CategoriesList() {
  const [loading, setLoading] = React.useState(false);
  const [loadingForDelete, setLoadingForDelete] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [showCategoryForm, setShowCategoryForm] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const onDelete = async (id: string) => {
    try {
      setLoadingForDelete(true);
      await axios.delete(`/api/categories/${id}`);
      message.success("Categoria deletada com sucesso");
      setSelectedCategory(null);
      getCategories();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoadingForDelete(false);
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
    },
    {
      title: "Criado Por",
      dataIndex: "createdBy",
      render: (createdBy: any) => createdBy.name,
    },
    {
      title: "Criado em",
      dataIndex: "createdAt",
      render: (createdAt: string) =>
        moment(createdAt).format("DD MMM YYYY hh:mm A"),
    },
    {
      title: "Ação",
      dataIndex: "action",
      render: (action: any, params: any) => {
        console.log(action);
        return (
          <div className="flex gap-3 items-center">
            <Button
              type="default"
              className="btn-small"
              onClick={() => [
                setSelectedCategory(params),
                onDelete(params._id),
              ]}
              loading={loadingForDelete && selectedCategory?._id === params._id}
            >
              Deletar
            </Button>
            <Button style={{ backgroundColor: "#00B4FF",  color: "#fff"}}
              type="primary"
              className="btn-small"
              onClick={() => {
                setSelectedCategory(params);
                setShowCategoryForm(true);
              }}
            >
              Editar
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button style={{ backgroundColor: "#00B4FF",  color: "#fff"}} type="primary" onClick={() => setShowCategoryForm(true)}>
          Add Categoria
        </Button>
      </div>

      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={categories}
          pagination={false}
          loading={loading}
        />
      </div>

      {showCategoryForm && (
        <CategoryForm
          showCategoryForm={showCategoryForm}
          setShowCategoryForm={setShowCategoryForm}
          selectedCategory={selectedCategory}
          reloadData={() => getCategories()}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
}

export default CategoriesList;