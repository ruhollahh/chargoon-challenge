import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import UserAutoComplete from "./user-autocomplete";
import { useAppContext } from "../../appContext";
import { Table } from "./table";
import { mockUsers } from "./mockUsers";

interface Props {
  initialValue?: any;
}

function BasicInformation({}: Props) {
  const [form] = Form.useForm();
  const { treeData, finishAddNode } = useAppContext();
  const { mode, selectedNode } = treeData.form;
  const [users, setUsers] = useState(mockUsers);

  const handleDeleteUser = (userTitle: string) => {
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => user.title !== userTitle);
    });
  };

  const handleToggleDefault = (userTitle: string) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return user.title === userTitle
          ? { ...user, isDefault: !user.isDefault }
          : { ...user, isDefault: false };
      });
    });
  };

  const handleAddUser = (userTitle: string) => {
    if (userTitle !== "") {
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          title: userTitle,
          isDefault: false,
        },
      ]);
    }
  };

  const onFinish = (values: any) => {
    finishAddNode({ ...values, users });
  };

  useEffect(() => {
    if (mode === "edit" && selectedNode) {
      form.setFieldsValue(selectedNode);
      setUsers(selectedNode.users);
    } else {
      setUsers(mockUsers);
      form.resetFields();
    }
  }, [form, mode, selectedNode]);

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="key" label="کد" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <UserAutoComplete handleAddUser={handleAddUser} />
      </Form.Item>
      <Table
        users={users}
        handleDeleteUser={handleDeleteUser}
        handleToggleDefault={handleToggleDefault}
      />
      {mode === "add" && (
        <Button type="primary" htmlType="submit">
          ذخیره
        </Button>
      )}
    </Form>
  );
}
export default BasicInformation;
