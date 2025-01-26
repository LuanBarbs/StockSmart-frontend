import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../../styles/CloseOperations.module.css';

export default function CloseOperations() {
    const [balance, setBalance] = useState([]);
    const [filteredBalance, setFilteredBalance] = useState([]);
    const [period, setPeriod] = useState('daily');
    const [status, setStatus] = useState('');
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const handleCloseOperations = async () => {
        try {
            const response = await fetch('/api/closeOperations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ period, warehouseId: selectedWarehouse }),
            })

            if(response.ok) {
                setStatus('Operação de fechamento realizada com sucesso!');
            } else {
                setStatus('Erro ao realizar operação de fechamento.');
            }
        } catch (error) {
            setStatus('Erro ao realizar operação de fechamento.');
        }
    };

    // Carregar os dados iniciais do saldo.
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/getBalance');
            const data = await response.json();
            setBalance(data.items);
            setFilteredBalance(data.items);
        }

        fetchData();
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

    useEffect(() => {
        const filterItems = () => {
            let filtered = balance;

            if(searchTerm) {
                filtered = filtered.filter((item) => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if(filterCategory) {
                filtered = filtered.filter((item) => 
                    item.category.toLowerCase().includes(filterCategory.toLowerCase())
                );
            }

            if(filterStatus) {
                filtered = filtered.filter((item) =>
                    item.status.toLowerCase().includes(filterStatus.toLowerCase())
                );
            }

            setFilteredBalance(filtered);
        };

        filterItems();
    }, [searchTerm, filterCategory, filterStatus, balance]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Fechar Operações</h1>
            <h3>Definir período e armazém:</h3>
            <div>
                <label className={styles.label}>
                    Período:
                    <select
                        className={styles.select}
                        value={period} 
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        <option value="daily">Diário</option>
                        <option value="weekly">Semanal</option>
                    </select>
                </label>
            </div>

            <div>
                <label className={styles.label}>
                    Armazém:
                    <select
                        className={styles.select}
                        value={selectedWarehouse}
                        onChange={(e) => setSelectedWarehouse(e.target.value)}
                    >
                        <option value="all">Todos</option>
                        {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                                {warehouse.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            
            <div className={styles.label}>
                <h2>Filtros</h2>
                <input 
                    type="text"
                    placeholder="Buscar por nome"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.input}
                />
                <input 
                    type="text"
                    placeholder="Filtrar por categoria"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className={styles.input}
                />
                <input 
                    type="text"
                    placeholder="Filtrar por status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={styles.input}
                />
            </div>

            <div className={styles.balance}>
                <h2>Saldo Atual</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Categoria</th>
                            <th>Volume</th>
                            <th>Data de Validade</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBalance.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.category}</td>
                                <td>{item.volume}</td>
                                <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <button className={styles.button} onClick={handleCloseOperations}>Fechar Operações</button>
            {status && <p className={styles.status}>{status}</p>}
        </div>
    );
};