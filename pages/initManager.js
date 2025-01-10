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
                    <li onClick={() => handleMenuClick("GCD")}>Gerenciar Cadastro de Depósitos</li>
                    <li onClick={() => handleMenuClick("DRA")}>Definir Regras de Armazenagem</li>
                    <li onClick={() => handleMenuClick("DPE")}>Definir Prioridades de Embarque</li>
                    <li onClick={() => handleMenuClick("GRS")}>Gerar Relatório Simplificado</li>
                    <li onClick={() => handleMenuClick("CH")}>Consultar Histórico</li>
                    <li onClick={() => handleMenuClick("FO")}>Fechar Operações</li>
                </ul>
            </aside>

            {/* Área de Conteúdo */}
            <main className={styles.mainContent}>
                {renderFeature()}
            </main>
        </div>
    );
};