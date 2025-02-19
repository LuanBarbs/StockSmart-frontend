import React, { useState, useEffect } from "react";
import styles from '../../styles/SimulateCrossDocking.module.css';
import Shipment from '../../models/Shipment';
import Item from "../../models/Item";

export default function SimulateCrossDocking() {
    const [receivedShipments, setReceivedShipments] = useState([]);
    const [crossDockShipments, setCrossDockShipments] = useState([]);
    const [shippedItems, setShippedItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [supplier, setSupplier] = useState('');
    const [destination, setDestination] = useState('');
    const [globalItemId, setGlobalItemId] = useState(1);

    const handleReceiveShipment = () => {
        if(itemName && quantity && supplier && destination) {
            const newItem = new Item(
                globalItemId,
                itemName,
                parseInt(quantity, 10),
                null,
                "Geral",
                "Desconhecido",
                null,
                new Date().toISOString(),
                "disponível"
            );

            const newShipment = new Shipment(
                receivedShipments.length + crossDockShipments.length + shippedItems.length + 1,
                "Recebimento",
                [newItem],
                "Em Andamento",
                supplier,
                destination,
                new Date().toISOString()
            );

            setReceivedShipments([...receivedShipments, newShipment]);
            setGlobalItemId(globalItemId + 1);
            setItemName('');
            setQuantity('');
            setSupplier('');
            setDestination('');
        }
    };

    const moveToCrossDock = (shipmentId) => {
        const shipment = receivedShipments.find(s => s.id === shipmentId);
        if(shipment) {
            setCrossDockShipments([...crossDockShipments, shipment]);
            setReceivedShipments(receivedShipments.filter(s => s.id != shipmentId));
        }
    };

    useEffect(() => {
        if(crossDockShipments.length > 0) {
            const timer = setTimeout(() => {
                setShippedItems([...shippedItems, ...crossDockShipments]);
                setCrossDockShipments([]);
            }, 3000); // Simula o tempo de processamento no cross-dock.
            return () => clearTimeout(timer);
        }
    }, [crossDockShipments]);

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Nome do item" className={styles.input} />
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantidade" className={styles.input} />
                <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Fornecedor" className={styles.input} />
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destino" className={styles.input} />
                <button onClick={handleReceiveShipment} className={styles.button}>Receber Remessa</button>
            </div>

            <div className={styles.sections}>
                <div className={styles.section}>
                    <h3>Recebimento</h3>
                    {receivedShipments.map(shipment => (
                        <div key={shipment.id} className={styles.shipment}>
                            <p><strong>ID:</strong> {shipment.id}</p>
                            <p><strong>Fornecedor:</strong> {shipment.supplier}</p>
                            <ul>
                                {shipment.items.map(item => (
                                    <li key={item.id}>{item.name} - {item.quantity} unidades</li>
                                ))}
                            </ul>
                            <button onClick={() => moveToCrossDock(shipment.id)} className={styles.button}>Mover para Cross-Dock</button>
                        </div>
                    ))}
                </div>
                <div className={styles.section}>
                    <h3>Cross-Dock</h3>
                    {crossDockShipments.length > 0 ? <p>Processando...</p> : <p>Vazio</p>}
                </div>
                <div className={styles.section}>
                    <h3>Expedição</h3>
                    {shippedItems.map(shipment => (
                        <div key={shipment.id} className={styles.shipment}>
                            <p><strong>ID:</strong> {shipment.id}</p>
                            <p><strong>Destino:</strong> {shipment.destination}</p>
                            <ul>
                                {shipment.items.map(item => (
                                    <li key={item.id}>{item.name} - {item.quantity} unidades</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};