import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaBars,
  FaPlusSquare,
  FaTrash,
  FaEdit,
  FaBox,
} from "react-icons/fa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/MerchandisePath.module.css";
import ShipmentController from "../../controller/ShipmentController";

export default function MerchandisePath() {
  const [showForm, setShowForm] = useState(true);
  const [showItems, setShowItems] = useState(false);
  
  const [option, setOption] = useState("")
  const [warehouseId, setWarehouseId] = useState(null);

  const [items, setItems] = useState([]);

  const [warehouses, setWarehouses] = useState([]);
  const [shipments, setShipments] = useState([]);


  const loadShipment = async () => {
    const storedShipment = await ShipmentController.listShipments();

    setShipments(storedShipment);
  };
  useEffect(() => {
    loadShipment();
  }, []);

  // Carregar itens do AsyncStorage ao iniciar.
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("itens");
        setItems(storedItems ? JSON.parse(storedItems) : []);
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage: ", error);
      }
    };

    loadData();
  }, []);

  // Carregar depósitos do AsyncStorage ao iniciar.
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedWarehouses = await AsyncStorage.getItem("warehouses");
        setWarehouses(storedWarehouses ? JSON.parse(storedWarehouses) : []);
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage: ", error);
      }
    };

    loadData();
  }, []);

  const changeStatus = async () => {
    const shipment = await ShipmentController.listShipments();
  };
    
    return (
      <main className={styles.wContainer}>
        <section className={styles.content}>
          <section
            className={`${
              showItems ? styles.formContainer : styles.fullFormContainer
            }`}
          >
            {showForm && (
              <form className={styles.form}>
                <label htmlFor="warehouseId">Id do armazém:</label>
                <select
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

                <label htmlFor="remessa">Remessa</label>
                <select id="remessa">
                  <option value="">Selecione uma remessa</option>
                  {shipments.map((shipment, index) => (
                    <option key={index} value={shipment.itemName}>
                      {shipment.itemName}
                    </option>
                  ))}
                </select>

                <label htmlFor="status_remessa">Status Remessa</label>
                <select id="status" value={option} onChange={(e) => setOption(e.target.value)}>
                  <option value="">Selecione o status</option>
                  <option value="pronta">Pronta</option>
                  <option value="andamento">Em andamento</option>
                  <option value="danificado">Danificado</option>
                  <option value="estoque">Em estoque</option>
                </select>

                <button
                  className={styles.tabButton}
                  onClick={changeStatus}
                  type="submit"
                >
                  Salvar
                </button>
                <div htmlFor="items"></div>
              </form>
            )}
          </section>
        </section>
      </main>
    );
}
