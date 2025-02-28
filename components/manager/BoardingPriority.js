import React, { useState, useEffect } from "react";
import styles from "../../styles/BoardingPriority.module.css";
import ShipmentController from "../../controller/ShipmentController";

export default function BoardingPriority() {
  const [showForm, setShowForm] = useState(true);
  const [showItems, setShowItems] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [option, setOption] = useState("")

  const loadShipment = async () => {
    const storedShipment = await ShipmentController.listShipments();

    setShipments(storedShipment);
  };
  useEffect(() => {
    loadShipment();
  }, []);

  const listShipment = async () => {
    const shipment = await ShipmentController.listShipments();
    if (option === "prazo") {
      let sp = shipment.sort((a,b) => b.type - a.type)
      setShipments(sp);
    }
    else if (option === "maior_remessa") {
      let sp = shipment.sort((a, b) => b.quantity - a.quantity);   
      setShipments(sp);
    }
  };

  return (
    <main className={styles.wContainer}>
      <section className={styles.content}>
        <section
          className={`${styles.fullFormContainer}`}
        >
          {showForm && (
            <form className={styles.form} onSubmit={e => e.preventDefault()}>
              <label htmlFor="">Definir Prioridade</label>
              <select id="option" value={option} onChange={(e) => setOption(e.target.value)}>
                <option value="">Selecione uma ordem de prioridade</option>
                <option value="prazo">Prazo</option>
                <option value="maior_remessa">Maior Remessa</option>
              </select>
              <button className={styles.tabButton} onClick={listShipment} type="submit">
                Definir Prioridade
              </button>
              <div htmlFor="listaPrioridade"></div>
            </form>
          )}
        </section>
        <section className={styles.fullFormContainer}>
          <div className={styles.table}>
            {shipments.map((ship, index) =>
              <p key={index}>{ship.type} - {ship.items}</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
};
