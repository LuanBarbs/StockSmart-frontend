import React, { useState } from "react";
import styles from "../styles/initEmployee.module.css";

// Importação de componentes.
import ManageItems from "../components/employee/ManageItems";

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
                    <li onClick={() => handleMenuClick("GCI")}>Gerenciar Cadastro de Itens</li>
                    <li onClick={() => handleMenuClick("RM")}>Receber de Mercadorias</li>
                    <li onClick={() => handleMenuClick("SCD")}>Simular Cross-Docking</li>
                    <li onClick={() => handleMenuClick("MI")}>Movimentar Itens</li>
                    <li onClick={() => handleMenuClick("SI")}>Separar Itens</li>
                    <li onClick={() => handleMenuClick("RA")}>Registrar Avarias</li>
                    <li onClick={() => handleMenuClick("GCM")}>Gerenciar Caminho de Mercadorias</li>
                    <li onClick={() => handleMenuClick("CH")}>Consultar Histórico</li>
                </ul>
            </aside>

            {/* Área de Conteúdo */}
            <main className={styles.content}>
                {renderFeature()}
            </main>
        </div>
    );
};