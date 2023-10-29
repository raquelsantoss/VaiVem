import React from "react";
import axios from "axios";
import { Table, message } from "antd";

function UsersList() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "É Admin?",
      dataIndex: "isAdmin",
      render: (isAdmin: boolean) => (isAdmin ? "Yes" : "No"),
    },
    {
      title: "Ativo?",
      dataIndex: "isActive",
      render: (isActive: boolean) => (isActive ? "Yes" : "No"),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
}

export default UsersList;