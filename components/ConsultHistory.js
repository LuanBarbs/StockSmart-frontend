import React, { useState, useEffect } from 'react';
import styles from '../styles/ConsultHistory.module.css';

import HistoryController from '../controller/HistoryController';

export default function ConsultHistory() {
    const [history, setHistory] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [filteredHistory, setFilteredHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await HistoryController.listHistory();
            setHistory(response);
        };

        fetchHistory();
    }, []);

    useEffect(() => {
        const filtered = history.filter(item => {
            const itemDate = new Date(item.dateTime);
            const start = startDate ? new Date(startDate) : new Date('1900-01-01');
            const end = endDate ? new Date(endDate) : new Date();
            const isDateInRange = itemDate >= start && itemDate <= end;
            const isLocationMatch = location ? item.location.includes(location): true;
            return isDateInRange && isLocationMatch;
        });

        setFilteredHistory(filtered);
    }, [startDate, endDate, location, history]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Consultar Histórico</h1>
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
                    <p>Localização:</p>
                    <input
                        className={styles.input}
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Digite a localização"
                    />
                </label>
            </div>

            <div className={styles.history}>
                <h2>Histórico</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ação</th>
                            <th>Data</th>
                            <th>Localização</th>
                            <th>Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistory.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.action}</td>
                                <td>{new Date(item.dateTime).toLocaleDateString()}</td>
                                <td>{item.location}</td>
                                <td>{item.userName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
