import React, { useState } from "react";
import styles from "../styles/initEmployee.module.css";

// Importação de componentes.
import ManageItems from "../components/employee/ManageItems";
import MoveItems from "../components/employee/MoveItems";

export default function initEmployee() {
    const [activeFeature, setActiveFeature] = useState("default");

    const handleMenuClick = (featureName) => {
        setActiveFeature(featureName);
    };

    const renderFeature = () => {
        switch(activeFeature) {
            case "GCI":
                return <ManageItems />;
            case "RM":
                return <h2>Ainda não está pronto</h2>;
            case "MI":
                return <MoveItems />;
            default:
                return <h1>Selecione uma funcionalidade no menu!</h1>;
        }
    };

    return (
        <div className={styles.container}>
            {/* Menu Lateral */}
            <aside className={styles.drawer}>
                <h2>Menu</h2>
                <ul>
                    <li 
                        className={activeFeature === "GCI" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("GCI")}>Gerenciar Cadastro de Itens</li>
                    <li 
                        className={activeFeature === "RM" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("RM")}>Receber de Mercadorias</li>
                    <li 
                        className={activeFeature === "SCD" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("SCD")}>Simular Cross-Docking</li>
                    <li 
                        className={activeFeature === "MI" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("MI")}>Movimentar Itens</li>
                    <li 
                        className={activeFeature === "SI" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("SI")}>Separar Itens</li>
                    <li 
                        className={activeFeature === "RA" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("RA")}>Registrar Avarias</li>
                    <li 
                        className={activeFeature === "GCM" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("GCM")}>Gerenciar Caminho de Mercadorias</li>
                    <li 
                        className={activeFeature === "CH" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("CH")}>Consultar Histórico</li>
                </ul>
            </aside>

            {/* Área de Conteúdo */}
            <main className={styles.content}>
                {renderFeature()}
            </main>
        </div>
    );
};