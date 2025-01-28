import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../../styles/SimularCrossDocking.module.css';

// Componente principal para simular o processo de cross-docking
export default function SimularCrossDocking() {
    // Estados para armazenar itens recebidos e expedidos (OBS: ainda nao tem Banco de dados então isso e so uma simulação)
    const [receivedItems, setReceivedItems] = useState([]);
    const [expeditedItems, setExpeditedItems] = useState([]);

    // Função para receber um item
    const handleReceiveItem = (item) => {
        // Adiciona o item à lista de itens recebidos
        setReceivedItems([...receivedItems, item]);
        // Expede o item imediatamente após recebê-lo
        handleExpediteItem(item);
    };

    // Função para expedir um item
    const handleExpediteItem = (item) => {
        // Adiciona o item à lista de itens expedidos
        setExpeditedItems([...expeditedItems, item]);
        
        // Loga no console que o item foi recebido e expedido
        console.log(`Item ${item} received and expedited.`);
    };

    return (
        <div>
            {/* Título principal da página */}
            <h1>Simular Cross-Docking</h1>
            
            {/* Seção para receber itens */}
            <div>
                <h2>Receber Item</h2>
                {/* Botões para simular o recebimento de itens */}
                <button onClick={() => handleReceiveItem('Item1')}>Receber Item1</button>
                <button onClick={() => handleReceiveItem('Item2')}>Receber Item2</button>
            </div>
            
            {/* Seção para exibir itens recebidos */}
            <div>
                <h2>Itens Recebidos</h2>
                <ul>
                    {/* Mapeia a lista de itens recebidos e exibe cada um como um item de lista */}
                    {receivedItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            
            {/* Seção para exibir itens expedidos */}
            <div>
                <h2>Itens Expedidos</h2>
                <ul>
                    {/* Mapeia a lista de itens expedidos e exibe cada um como um item de lista */}
                    {expeditedItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};