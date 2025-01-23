import React, { useState } from "react";
import styles from "../styles/InitManager.module.css";

// Importação de componentes.
import ManageWarehouses from "../components/manager/ManageWarehouses";
import CloseOperations from "../components/manager/CloseOperations";
import ConsultHistory from "../components/ConsultHistory";

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
            case "CH":
                return <ConsultHistory />;
            case "COE":
                return <CloseOperations />;
            default:
                return <div className={styles.initialTitle}><h1>Selecione uma funcionalidade no menu!</h1></div>;
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
                        onClick={() => handleMenuClick("GCD")}>Gerenciar Cadastro de Armazém</li>
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
                        className={activeFeature === "COE" ? styles.liClicked : ""}
                        onClick={() => handleMenuClick("COE")}>Consolidar Operações de Estoque</li>
                </ul>
            </aside>

            {/* Área de Conteúdo */}
            <main className={styles.mainContent}>
                {renderFeature()}
            </main>
        </div>
    );
};