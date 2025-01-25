import React, { useState, useEffect } from "react";
import styles from "../../styles/InitManager.module.css";
import Rule from "../../models/Rule";

export default function BoardingPriority() {
  const [showForm, setShowForm] = useState(true);
  const [showItems, setShowItems] = useState(false);
  const prioridade = []

  const handleToggleForm = () => setShowForm(!showForm);
  const handleToggleItems = () => setShowItems(!showItems);

  return (
    <main className={styles.wContainer}>
      <section className={styles.content}>
        <section
          className={`${
            showItems ? styles.formContainer : styles.fullFormContainer
          }`}
        >
          {showForm && (
            <form className={styles.form}>
              <label htmlFor="">Definir Prioridade</label>
              <select
                id=""
                onChange={(e) => (e.target.value)}
              >
                <option value="">Selecione uma ordem de prioridade</option>
              </select>

              <button className={styles.tabButton}>Definir Prioridade</button>
              <div htmlFor="listaPrioridade"></div>
            </form>
          )}
        </section>
      </section>
    </main>
  );
};
