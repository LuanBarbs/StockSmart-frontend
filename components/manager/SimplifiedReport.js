import React, { useState, useEffect } from "react";
import styles from "../../styles/SimplifiedReport.module.css";
import ItemController from "../../controller/ItemController";

export default function SimplifiedReport() {
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [warehouseId, setWarehouseId] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const storedItems = await ItemController.listItems();
    setItems(storedItems);
  };
  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const itemDate = new Date(item.createdDate);
      const start = startDate ? new Date(startDate) : new Date("1900-01-01");
      const end = endDate ? new Date(endDate) : new Date();
      const isDateInRange = itemDate >= start && itemDate <= end;
      const isLocationMatch = location
        ? item.warehouseId.includes(location)
        : true;
      return isDateInRange && isLocationMatch;
    });

    setFilteredItems(filtered);
  }, [startDate, endDate, location, history]);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerar Relatório</h1>
      <div className={styles.filters}>
        <label className={styles.label}>
          <p>Data de Início:</p>
          <input
            className={styles.input}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          <p>Data de Fim:</p>
          <input
            className={styles.input}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          <p>Armazém:</p>
          <select
            className={styles.select}
            id="warehouseId"
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
          >
            <option value="">Selecione um armazém</option>
            {warehouses.map((warehouse, index) => (
              <option key={index} value={warehouse.id}>
                {warehouse.id} - {warehouse.name}
              </option>
            ))}
          </select>
        </label>

        <button className={styles.tabButton}>Gerar Relatório</button>
      </div>

      <div className={styles.history}>
        <h2>Relatório</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ação</th>
              <th>Data</th>
              <th>Localização</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.location}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
