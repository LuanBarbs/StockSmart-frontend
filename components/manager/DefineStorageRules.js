import React, { useState } from "react";
import styles from "../../styles/DefineStorageRules.module.css";

const DefineStorageRules = () => {
    const [category, setCategory] = useState("");
    const [conditions, setConditions] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !conditions || !location) {
            setMessage("Todos os campos são obrigatórios.");
            return;
        }

        setMessage("Regras de armazenagem cadastradas com sucesso!");
    };

    return (
        <div className={styles.container}>
            <h2>Definir Regras de Armazenagem</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="category">Categoria:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="conditions">Condições:</label>
                    <input
                        type="text"
                        id="conditions"
                        value={conditions}
                        onChange={(e) => setConditions(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="location">Local de Armazenagem:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.button}>Cadastrar Regras</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default DefineStorageRules;