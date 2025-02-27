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

export default function MerchandisePath() {
  const [showForm, setShowForm] = useState(true);
  const [showItems, setShowItems] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  /*const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);*/
  const [warehouseId, setWarehouseId] = useState(null);
  const [category, setCategory] = useState(null);

  const [items, setItems] = useState([]);

  const [warehouses, setWarehouses] = useState([]);

  const handleToggleForm = () => setShowForm(!showForm);
  const handleToggleItems = () => setShowItems(!showItems);

  const handleOpenItemModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setEditModalOpen(true);
  };

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
    
    return (
        <main className={styles.wContainer}>
            <section className={styles.content}>
                <section className={`${showItems ? styles.formContainer : styles.fullFormContainer}`}>
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
                            </select>
                            
                            <button className={styles.tabButton}>Salvar</button>
                            <div htmlFor="items"></div>
                        </form>
          )}
          </section>
        </section>
      </main>
    );
}
