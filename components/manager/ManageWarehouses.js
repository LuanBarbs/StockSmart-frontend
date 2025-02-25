import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaBars, FaPlusSquare, FaTrash, FaEdit, FaWarehouse } from "react-icons/fa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/InitManager.module.css";

import { insertWarehouse } from "../../controller/WarehouseController";
import Warehouse from "../../models/Warehouse";

export default function ManageWarehouses() {
    const [showForm, setShowForm] = useState(true);
    const [showWarehouses, setShowWarehouses] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editWarehouse, setEditWarehouse] = useState(null);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);

    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState('');

    const [warehouses, setWarehouses] = useState([]);

    const handleToggleForm = () => setShowForm(!showForm);
    const handleToggleWarehouses = () => setShowWarehouses(!showWarehouses);

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
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEditWarehouse = (warehouse) => {
        setEditWarehouse(warehouse);
        setEditModalOpen(true);
        setZones(warehouse.zones);
    };

    // Função para verificar duplicidade de endereço.
    const isLocationDuplicate = (location) => {
        return warehouses.some((warehouse) => warehouse.location === location);
    };

    // Função para adicionar um armazém.
    const handleAddWarehouse = async () => {
        if (capacity <= 0) {
            alert("Erro: Todos os valores numéricos devem ser maiores que zero.");
            return;
        }

        if(isLocationDuplicate(location)) {
            alert("Erro: Endereço já registrado no sistema!");
            return;
        }

        const newWarehouse = new Warehouse(
            warehouses.length + 1, name, location, capacity, zones,
        );


        const updatedWarehouses = [...warehouses, newWarehouse];
        setWarehouses(updatedWarehouses);
        insertWarehouse(newWarehouse);
        setName(""); setLocation(""); setCapacity(0); setZones([]);
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
        if(editWarehouse.capacity <= 0) {
            alert("Erro: Todos os valores numéricos devem ser maiores que zero.");
            return;
        }

        if(selectedWarehouse.location !== editWarehouse.location) {
            if(isLocationDuplicate(editWarehouse.address)) {
                alert("Erro: Endereço já registrado no sistema!");
                return;
            }
        }

        editWarehouse.zones = zones;

        const updatedWarehouses = warehouses.map(warehouse =>
            warehouse.id === editWarehouse.id ? editWarehouse : warehouse
        );
        setWarehouses(updatedWarehouses);
        await AsyncStorage.setItem('warehouses', JSON.stringify(updatedWarehouses));
        setName(""); setLocation(""); setCapacity(0); setZones([]);
        setEditModalOpen(false);
        handleCloseModal();
        alert("Alteração realizada com sucesso!");
    };

    // Função para adicionar uma nova zona.
    const handleAddZone = () => {
        if(zoneName.trim()) {
            setZones([...zones, zoneName]);
            setZoneName('');
        }
    };

    // Remove uma zona existente.
    const handleRemoveZone = (index) => {
        setZones(zones.filter((_, i) =>  i !== index));
    };

    // Carregar depósitos do AsyncStorage ao iniciar.
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedWarehouses = await AsyncStorage.getItem('WAREHOUSES');
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
                            <label htmlFor="location">Endereço:</label>
                            <input 
                                type="text" 
                                id="location" 
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                            <label htmlFor="capacity">Capacidade Total (m^3):</label>
                            <input 
                                type="number" 
                                id="capacity" 
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                required
                            />
                            
                            {/* Gerenciamento de Zonas */}
                            <label htmlFor="zones">Zonas:</label>
                            <select
                                id="role"
                                value={zoneName}
                                onChange={(e) => setZoneName(e.target.value)}
                            >
                                <option value="">Selecione um tipo de zona</option>
                                <option value='Armazenagem Fria (Refrigerada)'>Armazenagem Fria (Refrigerada)</option>
                                <option value='Armazenagem Seco (Ambiental)'>Armazenagem Seco (Ambiental)</option>
                                <option value='Produtos Químicos'>Produtos Químicos</option>
                                <option value='Itens Frágeis'>Itens Frágeis</option>
                                <option value='Expedição'>Expedição</option>
                                <option value='Recebimento'>Recebimento</option>
                                <option value='Itens Pesados'>Itens Pesados</option>
                                <option value='Produtos Perigosos'>Produtos Perigosos</option>
                                <option value='Produtos de Alto Valor'>Produtos de Alto Valor</option>
                                <option value='Retorno e Avarias'></option>
                            </select>
                            <button className={styles.addZoneButton} type="button" onClick={handleAddZone}>
                                Adicionar Zona
                            </button>
                            <ul>
                                {zones.map((zone, index) => (
                                    <li key={index}>
                                        {zone}{' '}
                                        <button className={styles.removeZoneButton} type="button" onClick={() => handleRemoveZone(index)}>
                                            Remover
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button className={styles.submitButton} type="submit">Cadastrar</button>
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
                        <p>Endereço: {selectedWarehouse?.location}</p>
                        <p>Capacidade Total (em m^3): {selectedWarehouse?.capacity}</p>
                        <p>Capacidade Disponível (em m^3): {selectedWarehouse?.getAvailableCapacity()}</p>
                        <p>Quantidade de zonas: {selectedWarehouse?.zones.length}</p>
                        <p>Status: {selectedWarehouse?.status === "active" ? "Ativo" : "Inativo"}</p>
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
                                value={editWarehouse.location}
                                onChange={(e) => setEditWarehouse({ ...editWarehouse, location: e.target.value })}
                            />
                            <label>Capacidade Total:</label>
                            <input 
                                type="number"
                                value={editWarehouse.capacity}
                                onChange={(e) => setEditWarehouse({ ...editWarehouse, capacity: e.target.value })}
                            />

                            {/* Gerenciamento de Zonas */}
                            <label htmlFor="zones">Zonas:</label>
                            <select
                                id="role"
                                value={zoneName}
                                onChange={(e) => setZoneName(e.target.value)}
                            >
                                <option value="">Selecione um tipo de zona</option>
                                <option value='Armazenagem Fria (Refrigerada)'>Armazenagem Fria (Refrigerada)</option>
                                <option value='Armazenagem Seco (Ambiental)'>Armazenagem Seco (Ambiental)</option>
                                <option value='Produtos Químicos'>Produtos Químicos</option>
                                <option value='Itens Frágeis'>Itens Frágeis</option>
                                <option value='Expedição'>Expedição</option>
                                <option value='Recebimento'>Recebimento</option>
                                <option value='Itens Pesados'>Itens Pesados</option>
                                <option value='Produtos Perigosos'>Produtos Perigosos</option>
                                <option value='Produtos de Alto Valor'>Produtos de Alto Valor</option>
                                <option value='Retorno e Avarias'></option>
                            </select>
                            <button className={styles.addZoneButton} type="button" onClick={handleAddZone}>
                                Adicionar Zona
                            </button>
                            <ul>
                                {zones.map((zone, index) => (
                                    <li key={index}>
                                        {zone}{' '}
                                        <button className={styles.removeZoneButton} type="button" onClick={() => handleRemoveZone(index)}>
                                            Remover
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.modalActions}>
                                <button className={styles.submitButton} type="submit">Salvar</button>
                                <button className={styles.submitButton} onClick={() => setEditModalOpen(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};