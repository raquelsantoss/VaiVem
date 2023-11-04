/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { Button, Table, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";

function ProductsList() {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null); // [1]
  const [products, setProducts] = React.useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      setProducts(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (productId: string) => {
    try {
      setDeleteLoading(true);
      await axios.delete(`/api/products/${productId}`);
      message.success("Produto deletado com sucesso");
      getProducts();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      title: "Produto",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <img
          src={record.images[0]}
          alt={text}
          className="w-20 h-20 object-cover rounded-full"
        />
      ),
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Criado Por:",
      dataIndex: "createdBy",
      render: (createdBy: any) => createdBy.name,
    },
    {
      title: "Criado em",
      dataIndex: "createdAt",
      render: (createdAt: any) =>
        moment(createdAt).format("DD MMM YYYY hh:mm A"),
    },
    {
      title: "Ação",
      dataIndex: "action",
      render: (action: any, params: any) => {
        return (
          <div className="flex gap-3 items-center">
            <Button
              type="default"
              className="btn-small"
              onClick={() => {
                setSelectedProduct(params);
                deleteProduct(params._id);
              }}
              loading={deleteLoading && selectedProduct?._id === params._id}
            >
              Deletar
            </Button>
            <Button style={{ backgroundColor: "#00B4FF",  color: "#fff"}}
              type="default"
              className="btn-small"
              onClick={() => {
                router.push(`/profile/edit_product/${params._id}`);
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
        <Button style={{ backgroundColor: "#00B4FF",  color: "#fff"}}
          type="default"
          onClick={() => router.push("/profile/add_product")}
        >
          Adicionar Produto
        </Button>
      </div>

      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default ProductsList;