import React, { useState, useEffect } from "react";
import styles from '../../styles/ConsultHistory.module.css';

export default function SimplifiedReport() {
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch("/api/getHistory");
      const data = await response.json();
      setHistory(data.history);
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    const filtered = history.filter((item) => {
      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : new Date("1900-01-01");
      const end = endDate ? new Date(endDate) : new Date();
      const isDateInRange = itemDate >= start && itemDate <= end;
      const isLocationMatch = location
        ? item.location.includes(location)
        : true;
      return isDateInRange && isLocationMatch;
    });

    setFilteredHistory(filtered);
  }, [startDate, endDate, location, history]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerar Relatório</h1>
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
        
              <button className={styles.tabButton}>Gerar Relatório</button>
      </div>

      <div className={styles.history}>
        <h2>Relatório</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ação</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
