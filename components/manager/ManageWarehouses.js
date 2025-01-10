import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaBars, FaPlusSquare, FaTrash, FaEdit, FaWarehouse } from "react-icons/fa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/InitManager.module.css";
import Warehouse from "../../models/Warehouse";

export default function ManageWarehouses() {
    const [showForm, setShowForm] = useState(true);
    const [showWarehouses, setShowWarehouses] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editWarehouse, setEditWarehouse] = useState(null);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [width, setWidth] = useState(0);
    const [depth, setDepth] = useState(0);
    const [height, setHeight] = useState(0);
    const [totalCapacity, setTotalCapacity] = useState(0);

    const [warehouses, setWarehouses] = useState([]);

    const handleToggleForm = () => setShowForm(!showForm);
    const handleToggleWarehouses = () => setShowWarehouses(!showWarehouses);

    const handleOpenWarehouseModal = (warehouse) => {
        setSelectedWarehouse(warehouse);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEditWarehouse = (warehouse) => {
        setEditWarehouse(warehouse);
        setEditModalOpen(true);
    };


    // Função para adicionar um armazém.
    const handleAddWarehouse = async () => {
        if (width <= 0 || depth <= 0 || height <= 0 || totalCapacity <= 0) {
            alert("Erro: Todos os valores numéricos devem ser maiores que zero.");
            return;
        }

        if(await Warehouse.isAddressDuplicate(address)) {
            alert("Erro: Endereço já registrado no sistema!");
            return;
        }
        
        if(await Warehouse.verifyCapacity(width, depth, height, totalCapacity)) {
            alert("Erro: Capacidade máxima impossível!");
            return;
        }

        const newWarehouse = new Warehouse(
            warehouses.length + 1, name, address, width, depth, height, totalCapacity
        );


        const updatedWarehouses = [...warehouses, newWarehouse];
        setWarehouses(updatedWarehouses);
        await Warehouse.saveWarehouse(newWarehouse);
        setName(""); setAddress(""); setWidth(0); setDepth(0); setHeight(0); setTotalCapacity(0);
        alert("Cadastro realizado com sucesso!");
    };

    const handleDeleteWarehouse = async () => {
        const updatedWarehouses = warehouses.filter((warehouse) => warehouse.id !== selectedWarehouse.id);
        setWarehouses(updatedWarehouses);
        await AsyncStorage.setItem('warehouses', JSON.stringify(updatedWarehouses));
        handleCloseModal();
        alert("Exclusão Realizada com sucesso");
    };

    const handleUpdateWarehouse = async () => {
        if(editWarehouse.width <= 0 || editWarehouse.depth <= 0 || editWarehouse.height <= 0 || editWarehouse.totalCapacity <= 0) {
            alert("Erro: Todos os valores numéricos devem ser maiores que zero.");
            return;
        }

        if(selectedWarehouse.address !== editWarehouse.address) {
            if(await Warehouse.isAddressDuplicate(editWarehouse.address)) {
                alert("Erro: Endereço já registrado no sistema!");
                return;
            }
        }

        const updatedWarehouses = warehouses.map(warehouse => 
            warehouse.id === editWarehouse.id ? editWarehouse : warehouse
        );
        setWarehouses(updatedWarehouses);
        await AsyncStorage.setItem('warehouses', JSON.stringify(updatedWarehouses));
        setEditModalOpen(false);
        handleCloseModal();
        alert("Alteração realizada com sucesso!");
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
            <section className={styles.tabs}>
                <button onClick={handleToggleForm} className={styles.tabButton}>Cadastrar Armazém</button>
                <button onClick={handleToggleWarehouses} className={styles.tabButton}>
                    Gerenciar Armazéns <FaBars />
                </button>
            </section>
            <section className={styles.content}>
                {showForm && (
                    <section className={`${showWarehouses ? styles.formContainer : styles.fullFormContainer}`}>
                        <h1>Preencha as Informações</h1>
                        <hr color="#f1f1b1" size="5"/>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddWarehouse();
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
                            <label htmlFor="address">Endereço:</label>
                            <input 
                                type="text" 
                                id="address" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <label htmlFor="width">Largura (m):</label>
                            <input 
                                type="number" 
                                id="width" 
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                required
                            />
                            <label htmlFor="depth">Profundidade (m):</label>
                            <input 
                                type="number" 
                                id="depth" 
                                value={depth}
                                onChange={(e) => setDepth(e.target.value)}
                                required
                            />
                            <label htmlFor="height">Altura (m):</label>
                            <input 
                                type="number"
                                id="height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                required
                            />
                            <label htmlFor="totalCapacity">Capacidade Total (m^3):</label>
                            <input 
                                type="number" 
                                id="totalCapacity" 
                                value={totalCapacity}
                                onChange={(e) => setTotalCapacity(e.target.value)}
                                required
                            />
                            <button type="submit">Cadastrar</button>
                        </form>
                    </section>
                )}

                {showWarehouses &&
                    <section className={`${showForm ? styles.warehousesContainer : styles.fullWarehousesContainer}`}>
                        <h1>Armazéns Cadastrados</h1>
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
                }
            </section>

                
            {showModal && selectedWarehouse && (
                <section className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
                        <FaWarehouse size={100}/>
                        <h2>{selectedWarehouse?.name}</h2>
                        <p>Endereço: {selectedWarehouse?.address}</p>
                        <p>Largura (em metro): {selectedWarehouse?.width}</p>
                        <p>Profundidade (em metro): {selectedWarehouse?.depth}</p>
                        <p>Altura (em metro): {selectedWarehouse?.height}</p>
                        <p>Capacidade Total (em m^3): {selectedWarehouse?.totalCapacity}</p>
                        <div className={styles.modalActions}>
                            <button onClick={() => handleEditWarehouse(selectedWarehouse)}><FaEdit /> Alterar</button>
                            <button onClick={handleDeleteWarehouse}><FaTrash /> Excluir</button>
                        </div>
                    </div>
                </section>
            )}

            {editModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Alterar Armazém</h2>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateWarehouse();
                            }}
                        >
                            <label>Nome:</label>
                            <input 
                                type="text"
                                value={editWarehouse.name}
                                onChange={(e) => setEditWarehouse({ ...editWarehouse, name: e.target.value })}
                            />
                            <label>Endereço:</label>
                            <input 
                                type="text"
                                value={editWarehouse.address}
                                onChange={(e) => setEditWarehouse({ ...editWarehouse, address: e.target.value })}
                            />
                            <label>Largura:</label>
                            <input 
                                type="number"
                                value={editWarehouse.width}
                                onChange={(e) => setEditWarehouse({ ...editWarehouse, width: e.target.value })}
                            />
                            <label>Profundidade:</label>
                            <input 
                                type="number"
                                value={editWarehouse.depth}
                                onChange={(e) => setEditWarehouse({ ...editWarehouse, depth: e.target.value })}
                            />
                            <label>Altura:</label>
                            <input 
                                type="number"
                                value={editWarehouse.height}
                                onChange={(e) => setEditWarehouse({ ...editWarehouse, height: e.target.value })}
                            />
                            <label>Capacidade Total:</label>
                            <input 
                                type="number"
                                value={editWarehouse.totalCapacity}
                                onChange={(e) => setEditWarehouse({ ...editWarehouse, totalCapacity: e.target.value })}
                            />
                            <div className={styles.modalActions}>
                                <button type="submit">Salvar</button>
                                <button onClick={() => setEditModalOpen(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};