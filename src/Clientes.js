import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Input, Form, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ClientesContext } from "./context";

export default function Clientes() {
  //Se usa context para poder pasar estados entre componentes
  const { setClienteSeleccionado, setListaVehiculos } = useContext(
    ClientesContext
  );
  const [form] = Form.useForm();
  const [visible, setvisible] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [searchedColumn, setsearchedColumn] = useState("");
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setsearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setsearchText("");
  };
  let searchInput;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpiar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //Columnas a mostrar en la tabla
  const columns = [
    {
      title: "DPI",
      dataIndex: "dpi",
      key: "dpi",
      ...getColumnSearchProps("dpi"),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      ...getColumnSearchProps("nombre"),
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      ...getColumnSearchProps("apellido"),
    },
  ];
  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    fetch("http://taller-app-semi.herokuapp.com/clients")
      .then((res) => res.json())
      .then(
        (result) => {
          setdataSource(result);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const showModal = () => setvisible(true);
  const handleOk = () => form.submit();

  const onFinish = (values) => {
    console.log("Success:", values);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("dpi", values.dpi);
    urlencoded.append("nombre", values.nombre);
    urlencoded.append("apellido", values.apellido);
    urlencoded.append("propietario", "N");

    const newData = {
      dpi: values.dpi,
      nombre: values.nombre,
      apellido: values.apellido,
      propietario: "N",
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://taller-app-semi.herokuapp.com/clients", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

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

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setClienteSeleccionado(selectedRows[0]);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows[0]
      );
      fetch("http://taller-app-semi.herokuapp.com/clients/" + selectedRowKeys)
        .then((res) => res.json())
        .then(
          (result) => {
            setListaVehiculos(result.vehiculos);
          },
          (error) => {
            console.log(error);
          }
        );
    },
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
            name="dpi"
            label="DPI"
            rules={[
              { required: true, message: "Por favor ingresa DPI" },
              { len: 13, message: "El DPI debe ser de 13 digitos" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        rowKey={(dataSource) => dataSource.dpi}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}
