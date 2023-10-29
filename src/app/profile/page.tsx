"use client";
import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import CategoriesList from "./components/CategoriesList";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsList from "./components/ProductsList";
import UsersOrdersList from "./components/UsersOrdersList";
import AdminOrdersList from "./components/AdminOrdersList";
import PersonalInfo from "./components/PersonalInfo";
import UsersList from "./components/UsersList";

function Profile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";
  const [selectedTab, setSelectedTab] = React.useState(id);
  const router = useRouter();

  return (
    <div>
      {currentUser.isAdmin && (
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => {
            router.push(`/profile?id=${key}`);
            setSelectedTab(key);
          }}
          activeKey={selectedTab}
        >
          <Tabs.TabPane tab="Produtos" key="1">
            <ProductsList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Categorias" key="2">
            <CategoriesList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Alugueis" key="3">
            <AdminOrdersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Usuários" key="4">
            <UsersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Informações Pessoais" key="5">
            <PersonalInfo />
          </Tabs.TabPane>
        </Tabs>
      )}
      {!currentUser.isAdmin && (
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Orders" key="1">
            <UsersOrdersList />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Personal Information" key="2">
            <PersonalInfo />
          </Tabs.TabPane>
        </Tabs>
      )}
    </div>
  );
}

export default Profile;