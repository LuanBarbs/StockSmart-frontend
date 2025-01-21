import React, { useState, useEffect } from "react";
import { FaEye, FaBars, FaPlusSquare, FaTrash, FaEdit, FaBox } from "react-icons/fa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/InitManager.module.css";
import Item from "../../models/Item";

export default function ManageItems() {
    const [showForm, setShowForm] = useState(true);
    const [showItems, setShowItems] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [warehouseId, setWarehouseId] = useState(null);
    const [category, setCategory] = useState(null);
    const [volume, setVolume] = useState(0);
    const [expirationDate, setExpirationDate] = useState(null);

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

    // Função para adicionar um item.
    const handleAddItem = async () => {
        if (quantity <= 0 || !name || !warehouseId || !category || !volume || !expirationDate) {
            alert("Erro: Todos os campos devem ser preenchidos corretamente.");
            return;
        }

        const newItem = new Item(
            items.length + 1, name, quantity, warehouseId, category, volume, expirationDate, new Date(), "active",
        );
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setName(""); setQuantity(0); setWarehouseId(null); setCategory(null); setVolume(null); setExpirationDate(null);
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
        if (editItem.quantity <= 0 || !editItem.name || !editItem.warehouseId || !editItem.category || !editItem.volume || !editItem.expirationDate) {
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

    // Carregar itens do AsyncStorage ao iniciar.
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedItems = await AsyncStorage.getItem('itens');
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
            <section className={styles.tabs}>
                <button onClick={handleToggleForm} className={styles.tabButton}>Cadastrar Item</button>
                <button onClick={handleToggleItems} className={styles.tabButton}>
                    Gerenciar Itens <FaBars />
                </button>
            </section>
            <section className={styles.content}>
                {showForm && (
                    <section className={`${showItems ? styles.formContainer : styles.fullFormContainer}`}>
                        <h1>Preencha as Informações</h1>
                        <hr color="#f1f1b1" size="5"/>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddItem();
                            }}
                            className={styles.form}
                        >
                            <label htmlFor="name">Nome:</label>
                            <input 
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label htmlFor="quantity">Quantidade:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                            <label htmlFor="warehouseId">Id do armazém:</label>
                            <select
                                id="warehouseId"
                                value={warehouseId}
                                onChange={(e) => setWarehouseId(e.target.value)}
                            >
                                <option value="">Selecione um armazém</option>
                                {warehouses.map((warehouse, index) => (
                                    <option key={index} value={warehouse.id}>{warehouse.id} - {warehouse.name}</option>
                                ))}
                            </select>
                            <label htmlFor="category">Categoria:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Selecione uma categoria</option>
                                <option value="Perecíveis Refrigerados">Perecíveis Refrigerados</option>
                                <option value="Produtos Secos e Não Perecíveis">Produtos Secos e Não Perecíveis</option>
                                <option value="Químicos e Perigosos">Químicos e Perigosos</option>
                                <option value="Frágeis e Delicados">Frágeis e Delicados</option>
                                <option value="Itens Pesados e Industriais">Itens Pesados e Industriais</option>
                                <option value="Produtos de Alto Valor">Produtos de Alto Valor</option>
                                <option value="Avarias e Devoluções">Avarias e Devoluções</option>
                                <option value="Em Processamento">Em Processamento</option>
                                <option value="Itens em Expedição">Itens em Expedição</option>
                                <option value="Itens Específicos por Condição">Itens Específicos por Condição</option>
                            </select>
                            <label htmlFor="volume">Volume (unitário):</label>
                            <input
                                type="number"
                                id="volume"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                required
                            />
                            <label htmlFor="expirationDate">Data de validade:</label>
                            <input 
                                type="date"
                                id="expirationDate"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                required
                            />
                            <button className={styles.submitButton} type="submit">Cadastrar</button>
                        </form>
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
                            <button onClick={() => handleDeleteItem()}><FaTrash />Excluir</button>
                        </div>
                    </div>
                </section>
            )}

            {editModalOpen && (
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
                            <label>Quantidade:</label>
                            <input 
                                type="number"
                                value={editItem.quantity}
                                onChange={(e) => setEditItem({...editItem, quantity: e.target.value})}
                            />
                            <label>Id do armazém:</label>
                            <select
                                value={editItem.warehouseId}
                                onChange={(e) => setEditItem({...editItem, warehouseId: e.target.value})} 
                            >
                                <option>Selecione um armazém</option>
                                {warehouses.map((warehouse, index) => (
                                    <option key={index} value={warehouse.id}>{warehouse.id} - {warehouse.name}</option>
                                ))}
                            </select>
                            <label>Categoria:</label>
                            <select
                                value={editItem.category}
                                onChange={(e) => setEditItem({...editItem, category: e.target.value})}
                            >
                                <option value="">Selecione uma categoria</option>
                                <option value="Perecíveis Refrigerados">Perecíveis Refrigerados</option>
                                <option value="Produtos Secos e Não Perecíveis">Produtos Secos e Não Perecíveis</option>
                                <option value="Químicos e Perigosos">Químicos e Perigosos</option>
                                <option value="Frágeis e Delicados">Frágeis e Delicados</option>
                                <option value="Itens Pesados e Industriais">Itens Pesados e Industriais</option>
                                <option value="Produtos de Alto Valor">Produtos de Alto Valor</option>
                                <option value="Avarias e Devoluções">Avarias e Devoluções</option>
                                <option value="Em Processamento">Em Processamento</option>
                                <option value="Itens em Expedição">Itens em Expedição</option>
                                <option value="Itens Específicos por Condição">Itens Específicos por Condição</option>
                            </select>
                            <label>Volume (unitário):</label>
                            <input 
                                type="number"
                                value={editItem.volume}
                                onChange={(e) => setEditItem({...editItem, volume: e.target.value})}
                            />
                            <label>Data de validade:</label>
                            <input 
                                type="date"
                                value={editItem.expirationDate}
                                onChange={(e) => setEditItem({...editItem, expirationDate: e.target.value})}
                            />
                            <div className={styles.modalActions}>
                                <button type="submit">Salvar</button>
                                <button onClick={() => setEditModalOpen(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </main>
    );
};