import React, { useState, useEffect } from 'react';
import styles from '../../styles/CloseOperations.module.css';

import CloseOperationsController from '../../controller/CloseOperationsController';

export default function CloseOperations() {
    const [balance, setBalance] = useState([]);
    const [filteredBalance, setFilteredBalance] = useState([]);
    const [expiredItems, setExpiredItems] = useState([]);
    const [period, setPeriod] = useState('daily');
    const [status, setStatus] = useState('');
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const [itensBalance, setItensBalance] = useState(0);

    const [closedOperations, setClosedOperations] = useState(false);

    const handleCloseOperations = async () => {
        if (expiredItems.length > 0) {
            if (!window.confirm("Existem itens expirados! Deseja continuar?")) {
                return;
            }
        }
        const response = await CloseOperationsController.closeOperations(filteredBalance, period, selectedWarehouse);
        if (response.error) {
            alert(response.error);
        } else {
            setClosedOperations(true);
            setStatus("Operações fechadas com sucesso!");
        }
    };

    // Carregar os dados iniciais do saldo.
    const fetchBalance = async () => {
        const response = await CloseOperationsController.getBalance();

        if(response.error) {
            alert(response.error);
        } else {
            setBalance(response);
            setFilteredBalance(response);
            setExpiredItems(response.filter(item => new Date(item.expirationDate) < new Date()));
            setItensBalance(response.reduce((sum, item) => sum + parseInt(item.quantity), 0));
        }
    };
    useEffect(() => {
        fetchBalance();
    }, []);

    // Carregar depósitos ao iniciar.
    const loadWarehouses = async () => {
        const response = await CloseOperationsController.getWarehouses();

        if(response.error) {
            alert(response.error);
        } else {
            setWarehouses(response);
        }
    };
    useEffect(() => {
        loadWarehouses();
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
            <h3>Total de Itens: {itensBalance} (Expirados: {expiredItems.length})</h3>
            {expiredItems.length > 0 && <p className={styles.alert}>⚠️ Há itens expirados!</p>}
            
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
                <h2>{closedOperations ? "Saldo Anterior" : "Saldo Atual"}: {itensBalance}</h2>
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
                            <tr key={item.id} className={new Date(item.expirationDate) < new Date() ? styles.expired : ""}>
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
            
            <button className={styles.button} onClick={handleCloseOperations}>Fechar Operações</button>
            {status && <p className={styles.status}>{status}</p>}
        </div>
    );
};