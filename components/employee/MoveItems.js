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
    const [showWarehouses, setShowWarehouses] = useState(true);
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");

    const [items, setItems] = useState([]);

    const handleToggleForm = () => setShowForm(!showForm);
    const handleToggleItems = () => setShowItems(!showItems);

    const handleToggleWarehouses = () => setShowWarehouses(!showWarehouses);

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

    // Função para adicionar um item.
    const handleAddItem = async () => {
        if (quantity <= 0 || !name || !description || !location) {
            alert("Erro: Todos os campos devem ser preenchidos corretamente.");
            return;
        }

        const newItem = new Item(items.length + 1, name, description, quantity, location);
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        await Item.saveItem(newItem);
        setName("");
        setDescription("");
        setQuantity(0);
        setLocation("");
        alert("Item cadastrado com sucesso!");
    };

    const handleDeleteItem = async () => {
        const updatedItems = items.filter((item) => item.id !== selectedItem.id);
        setItems(updatedItems);
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        handleCloseModal();
        alert("Exclusão Realizada com sucesso");
    };

    const handleUpdateItem = async () => {
        if (editItem.quantity <= 0 || !editItem.name || !editItem.description || !editItem.location) {
            alert("Erro: Todos os campos devem ser preenchidos corretamente.");
            return;
        }

        const updatedItems = items.map(item =>
            item.id === editItem.id ? editItem : item
        );
        setItems(updatedItems);
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setEditModalOpen(false);
        handleCloseModal();
        alert("Alteração realizada com sucesso!");
    };

    useEffect(() => {
        const loadData = async () => {
            const storedItems = await Item.getAllItems();
            setItems(storedItems);
        };
      
        loadData();
    }, []);

    return (
        <main className={styles.wContainer}>
            
            <section className={styles.content}>
                {showWarehouses && (
                    <section className={`${showWarehouses ? styles.formContainer : styles.fullFormContainer}`}>
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
                                    </li>
                                ))
                            )}
                            {warehouses.length == 0 && (
                                <p>Não há armazéns cadastrados!</p>
                            )}
                        </ul>
                    </section>
                )}

                {showWarehouses && (
                    <section className={`${showWarehouses ? styles.formContainer : styles.fullFormContainer}`}>
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

                {showItems && (
                    <section className={`${showForm ? styles.warehousesContainer : styles.fullWarehousesContainer}`}>
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

            {/* // Modal de Visualização do Item
            {showModal && selectedItem && (
                <section className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
                        <FaWarehouse size={100}/>
                        <h2>{selectedItem?.name}</h2>
                        <p>Descrição: {selectedItem?.description}</p>
                        <p>Quantidade: {selectedItem?.quantity}</p>
                        <p>Localização: {selectedItem?.location}</p>
                        <div className={styles.modalActions}>
                            <button onClick={() => handleEditItem(selectedItem)}><FaEdit />Alterar</button>
                            <button onClick={() => handleDeleteItem()}><FaTrash />Excluir</button>
                        </div>
                    </div>
                </section>
            )} */}

            {/* {editModalOpen && (
                <section className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Alterar Item</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateItem();
                            }}
                        >
                            <label>Nome:</label>
                            <input 
                                type="text"
                                value={editItem.name}
                                onChange={(e) => setEditItem({...editItem, name: e.target.value})}
                            />
                            <label>Descrição:</label>
                            <input 
                                type="text"
                                value={editItem.description}
                                onChange={(e) => setEditItem({...editItem, description: e.target.value})}
                            />
                            <label>Quantidade:</label>
                            <input 
                                type="number"
                                value={editItem.quantity}
                                onChange={(e) => setEditItem({...editItem, quantity: e.target.value})}
                            />
                            <label>Localização:</label>
                            <input 
                                type="text"
                                value={editItem.location}
                                onChange={(e) => setEditItem({...editItem, location: e.target.value})}
                            />
                            <div className={styles.modalActions}>
                                <button type="submit">Salvar</button>
                                <button onClick={() => setEditModalOpen(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </section>
            )} */}
        </main>
    );
};