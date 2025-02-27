import React, { useState, useEffect } from "react";
import styles from "../../styles/BoardingPriority.module.css";
import ShipmentController from "../../controller/ShipmentController";

export default function BoardingPriority() {
  const [showForm, setShowForm] = useState(true);
  const [showItems, setShowItems] = useState(false);
  const [shipment, setShipment] = useState([]);

  const loadShipment = async () => {
    const storedShipment = await ShipmentController.listShipments();
    setShipment(storedShipment);
  };
  useEffect(() => {
    loadShipment();
  }, []);

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
              <select id="" onChange={(e) => e.target.value}>
                <option value="">Selecione uma ordem de prioridade</option>
                <option value="prazo">Prazo</option>
                <option value="remessa">Maior Remessa</option>
              </select>

              <button className={styles.tabButton}>Definir Prioridade</button>
              <div htmlFor="listaPrioridade"></div>
            </form>
          )}
        </section>
        <section>{shipment.map((ship, index) => (ship.type))}</section>
      </section>
    </main>
  );
};
