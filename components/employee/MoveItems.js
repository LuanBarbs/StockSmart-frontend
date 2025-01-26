import React, { useState, useEffect } from "react";
import { FaEye, FaBars, FaPlusSquare, FaTrash, FaEdit, FaWarehouse } from "react-icons/fa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/InitManager.module.css";
import Item from "../../models/Item";
import Warehouse from "../../models/Warehouse";

/*
Ideia: 
1) selecionar uma warehouse
2) selecionar um item, depois quantidade
3) selecionar destino
4) realizar verificação de é valido
5) se não, perguntar se quer alterar quantidade ou selecionar outra warehouse
6) se sim, trocar os itens
*/

export default function MoveItems() {

    const [showItems, setShowItems] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const [warehouses, setWarehouses] = useState([]);
    const [showWarehousesOrigin, setShowWarehousesOrigin] = useState(true);
    const [showWarehousesDestiny, setShowWarehousesDestiny] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
   
    const [items, setItems] = useState([]);

    const handleToggleItems = () => setShowItems(!showItems);

    const handleToggleWarehousesOrigin = () => setShowWarehousesOrigin(!showWarehousesOrigin);
    const handleToggleWarehousesDestiny = () => setShowWarehousesDestiny(!showWarehousesDestiny);

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

    const handleSelectItem = (warehouse) => {
        setShowWarehousesOrigin(false);
        setItems(warehouse.items);
        setShowItems(true)
    };

    const handleOpenWarehouseModal = (warehouse) => {
        const newSelectedWarehouse = new Warehouse(
            warehouse.id,
            warehouse.name,
            warehouse.location,
            warehouse.capacity,
            warehouse.currentCapacity,
            warehouse.zones,
            warehouse.status,
            warehouse.createdAt,
        );

        setSelectedWarehouse(newSelectedWarehouse);
        setShowModal(true);
    };

    // Carregar depósitos do AsyncStorage ao iniciar.
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedWarehouses = await AsyncStorage.getItem('warehouses');
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
                {showWarehousesOrigin && (
                    <section className={`${showWarehousesOrigin ? styles.formContainer : styles.fullFormContainer}`}>
                        <h1>Armazém de origem</h1>
                        <hr color="#f1f1b1" size="5"/>
                        <ul>
                            {warehouses.length != 0 && (
                                warehouses.map((warehouse, index) => (
                                    <li key={index} className={styles.warehouseBox}>
                                        <span>{warehouse.id} - Nome: {warehouse.name}</span>
                                        <button
                                            className={styles.eyeButton}
                                            onClick={() => handleOpenWarehouseModal(warehouse)}
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            className={styles.selectButton}
                                            onClick={() => handleSelectItem(warehouse)}    >
                                            Selecionar
                                        </button>
                                    </li>
                                ))
                            )}
                            {warehouses.length == 0 && (
                                <p>Não há armazéns cadastrados!</p>
                            )}
                        </ul>
                    </section>
                )}

                {showWarehousesDestiny && (
                    <section className={`${showWarehousesDestiny ? styles.formContainer : styles.fullFormContainer}`}>
                        <h1>Armazém de destino</h1>
                        <hr color="#f1f1b1" size="5"/>
                        <ul>
                            {warehouses.length != 0 && (
                                warehouses.map((warehouse, index) => (
                                    <li key={index} className={styles.warehouseBox}>
                                        <span>{warehouse.id} - Nome: {warehouse.name}</span>
                                        <button
                                            className={styles.eyeButton}
                                            onClick={() => handleOpenWarehouseModal(warehouse)}
                                        >
                                            <FaEye />
                                        </button>
                                    </li>
                                ))
                            )}
                            {warehouses.length == 0 && (
                                <p>Não há armazéns cadastrados!</p>
                            )}
                        </ul>
                    </section>
                )}

                {showModal && selectedWarehouse && (
                <section className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
                        <FaWarehouse size={100}/>
                        <h2>{selectedWarehouse?.name}</h2>
                        <p>Endereço: {selectedWarehouse?.location}</p>
                        <p>Capacidade Total (em m^3): {selectedWarehouse?.capacity}</p>
                        <p>Capacidade Disponível (em m^3): {selectedWarehouse?.getAvailableCapacity()}</p>
                        <p>Quantidade de zonas: {selectedWarehouse?.zones.length}</p>
                        <p>Status: {selectedWarehouse?.status === "active" ? "Ativo" : "Inativo"}</p>                        
                    </div>
                </section>
            )}     
                
                {showItems && (         // não tá salvando os itens cadastrados
                    <section className={`${showItems ? styles.warehousesContainer : styles.fullWarehousesContainer}`}>
                        <h1>Itens Cadastrados</h1>
                        <hr color="#f1f1b1" size="5"/>
                        <ul>
                            {items.length != 0 && (
                                items.map((item, index) => (
                                    <li key={index} className={styles.warehouseBox}>
                                        <span>{item.id} - Nome: {item.name}</span>
                                        <button
                                            className={styles.eyeButton}
                                            onClick={() => handleOpenItemModal(item)}
                                        >
                                            <FaEye />
                                        </button>
                                    </li>
                                ))
                            )}
                            {items.length == 0 && (
                                <p>Não há itens cadastrados!</p>
                            )}
                        </ul>
                    </section>
                )}
            </section>

            {/* Modal de Visualização do Item */}
            {showModal && selectedItem && (
                <section className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
                        <FaBox size={100}/>
                        <h2>{selectedItem?.name}</h2>
                        <p>Quantidade: {selectedItem?.quantity}</p>
                        <p>Id do depósito: {selectedItem?.warehouseId}</p>
                        <p>Categoria: {selectedItem?.category}</p>
                        <p>Volume (unitário): {selectedItem?.volume}</p>
                        <p>Data de validade: {selectedItem?.expirationDate}</p>
                        <p>Status: {selectedItem?.status === "active" ? "Ativo" : "Inativo"}</p>
                        <div className={styles.modalActions}>
                            <button onClick={() => handleEditItem(selectedItem)}><FaEdit />Alterar</button>
                        </div>
                    </div>
                </section>
            )}

        </main>
    );
};