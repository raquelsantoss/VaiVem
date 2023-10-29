import React, { useEffect } from "react";
import axios from "axios";
import { Modal, Table, message } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function UsersOrdersList() {
  const router = useRouter();
  const [loading = false, setLoading] = React.useState<boolean>(false);
  const [showCancelModal = false, setShowCancelModal] =
    React.useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
  const [statusUpdateLoading = false, setStatusUpdateLoading] =
    React.useState<boolean>(false);
  const [orders = [], setOrders] = React.useState([]);
  const { currentUser } = useSelector((state: any) => state.user);

  const getOrders = async () => {
    try {
      setLoading(true);
      const endPoint = `/api/orders?user=${currentUser._id}`;
      const response = await axios.get(endPoint);
      console.log(response.data);
      setOrders(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onStatusUpdate = async (orderId: string, status: string) => {
    try {
      setStatusUpdateLoading(true);
      const endPoint = `/api/orders/${orderId}`;
      await axios.put(endPoint, { orderStatus: status });
      message.success("Pedido cancelado com sucesso");
      setShowCancelModal(false);
      getOrders();
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    {
      title: "ID do Aluguel",
      dataIndex: "_id",
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      render: (date: string) => moment(date).format("DD MMM YYYY hh:mm a"),
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: "Ação",
      render: (record: any) => (
        <div className="flex gap-5">
          {record.orderStatus === "order placed" && (
            <span
              className="underline cursor-pointer"
              onClick={() => {
                setSelectedOrder(record);
                setShowCancelModal(true);
              }}
            >
              Cancelar
            </span>
          )}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              router.push(`/profile/orders/${record._id}`);
            }}
          >
            Ver
          </span>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />

      {selectedOrder && (
        <Modal
          open={showCancelModal}
          onCancel={() => {
            setShowCancelModal(false);
          }}
          title="Cancelar Pedido"
          centered
          closable={false}
          onOk={() => {
            onStatusUpdate(selectedOrder._id, "cancelled");
          }}
          okText="Sim, Cancelar Pedido"
          cancelText="Não, Manter Pedido"
          okButtonProps={{
            loading: statusUpdateLoading,
          }}
        >
          <p className="my-10 text-gray-600">
            Tem certeza que deseja cancelar o aluguel de #{selectedOrder._id} ? Essa
            ação não poderá ser desfeita.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default UsersOrdersList;