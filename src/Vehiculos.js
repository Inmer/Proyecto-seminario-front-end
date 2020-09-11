import React, { useState, useContext } from "react";
import { Table, Button, Input, Form, Space, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ClientesContext } from "./context";

export default function Vehiculos() {
  //Se usa context para poder pasar estados entre componentes
  const { clienteSeleccionado, listaVehiculos, setListaVehiculos } = useContext(
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
  const columns = [
    {
      title: "Tipo placa",
      dataIndex: "tipo_placa",
      key: "tipo_placa",
    },
    {
      title: "Número de placa",
      dataIndex: "numero_placa",
      key: "numero_placa",
      ...getColumnSearchProps("marca"),
    },
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca",
      ...getColumnSearchProps("marca"),
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
      ...getColumnSearchProps("modelo"),
    },
    {
      title: "Año",
      dataIndex: "año",
      key: "año",
    },
    {
      title: "Recorrido",
      dataIndex: "recorrido",
      key: "recorrido",
    },
  ];

  const showModal = () => {
    if (!clienteSeleccionado.hasOwnProperty("dpi")) {
      message.error("Debe seleccionar un cliente para asignar vehiculo");
    } else {
      setvisible(true);
    }
  };
  const handleOk = () => form.submit();

  const onFinish = (values) => {
    console.log("Success:", values);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("dpi", clienteSeleccionado.dpi);
    urlencoded.append("placa", values.numero_placa);
    urlencoded.append("tipo_placa", values.tipo_placa);
    urlencoded.append("año", values.año);
    urlencoded.append("marca", values.marca);
    urlencoded.append("modelo", values.modelo);
    urlencoded.append("recorrido", values.recorrido);

    const newData = {
      dpi: clienteSeleccionado.dpi,
      numero_placa: values.numero_placa,
      tipo_placa: values.tipo_placa,
      año: values.año,
      marca: values.marca,
      modelo: values.modelo,
      recorrido: values.recorrido,
    };

    console.log("urlencoded:", urlencoded);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://taller-app-semi.herokuapp.com/vehicules", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setListaVehiculos([...listaVehiculos, newData]);
    setvisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setvisible(false);
    console.log("clienteSeleccionado: " + JSON.stringify(clienteSeleccionado));
    console.log("listaVehiculos: " + JSON.stringify(listaVehiculos));
  };

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>
        Nuevo vehiculo
      </Button>
      <Modal
        title="Nuevo vehiculo"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
      >
        <Form {...layout} name="form_cliente" form={form} onFinish={onFinish}>
          {columns.map(function (e) {
            return (
              <Form.Item
                name={e.dataIndex}
                label={e.title}
                rules={[
                  { required: true, message: "Por favor ingresa " + e.title },
                ]}
              >
                <Input />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
      <Table
        dataSource={listaVehiculos}
        columns={columns}
        rowKey={(listaVehiculos) => listaVehiculos.numero_placa}
      />
    </div>
  );
}
