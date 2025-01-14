import React, { useState } from "react";
import styles from "../styles/InitManager.module.css";

// Importação de componentes.
import ManageWarehouses from "../components/manager/ManageWarehouses";

export default function initManager() {
    const [activeFeature, setActiveFeature] = useState("default");

    const handleMenuClick = (featureName) => {
        setActiveFeature(featureName);
    };

    const renderFeature = () => {
        switch(activeFeature) {
            case "GCD":
                return <ManageWarehouses />;
            case "RM":
                return <h2>Ainda não está pronto</h2>;
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
                        className={activeFeature === "GCD" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("GCD")}>Gerenciar Cadastro de Depósitos</li>
                    <li 
                        className={activeFeature === "DRA" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("DRA")}>Definir Regras de Armazenagem</li>
                    <li 
                        className={activeFeature === "DPE" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("DPE")}>Definir Prioridades de Embarque</li>
                    <li 
                        className={activeFeature === "GRS" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("GRS")}>Gerar Relatório Simplificado</li>
                    <li 
                        className={activeFeature === "CH" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("CH")}>Consultar Histórico</li>
                    <li 
                        className={activeFeature === "FO" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("FO")}>Fechar Operações</li>
                </ul>
            </aside>

            {/* Área de Conteúdo */}
            <main className={styles.mainContent}>
                {renderFeature()}
            </main>
        </div>
    );
};