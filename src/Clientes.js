import React, { useState } from "react";
import { Table, Button, Input, Form } from "antd";
import Modal from "antd/lib/modal/Modal";

export default function Clientes() {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
  ];
  const [form] = Form.useForm();
  const [visible, setvisible] = useState(false);
  const [count, setcount] = useState(2);
  const [dataSource, setdataSource] = useState([
    {
      key: "1",
      nombre: "Juan",
      apellido: "Perez",
      telefono: "5555-5555",
    },
    {
      key: "2",
      nombre: "Mario",
      apellido: "Ramirez",
      telefono: "5555-5555",
    },
  ]);

  const showModal = () => setvisible(true);
  const handleOk = () => form.submit();

  const onFinish = (values) => {
    console.log("Success:", values);
    const newData = {
      key: count,
      nombre: values.nombre,
      apellido: values.apellido,
      telefono: values.telefono,
    };
    setcount(count + 1);
    setdataSource([...dataSource, newData]);
    setvisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setvisible(false);
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>
        Nuevo cliente
      </Button>
      <Modal
        title="Nuevo cliente"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
      >
        <Form {...layout} name="form_cliente" form={form} onFinish={onFinish}>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true, message: "Por favor ingresa nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apellido"
            label="Apellido"
            rules={[{ required: true, message: "Por favor ingresa apellido" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Teléfono"
            rules={[{ required: true, message: "Por favor ingresa teléfono" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}
