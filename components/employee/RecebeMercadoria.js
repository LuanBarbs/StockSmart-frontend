import React, { useState, useEffect } from "react";
import styles from '../../styles/ReceberMercadoria.module.css';

import ShipmentController from "../../controller/ShipmentController";
import HistoryController from "../../controller/HistoryController";
import UserController from "../../controller/UserController";

// Componente principal para gerenciar o recebimento de mercadorias
export default function RecebeMercadoria() {
    const [type, setType] = useState("");
    const [supplier, setSupplier] = useState("");
    const [destination, setDestination] = useState(0);
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);

    const [users, setUsers] = useState([]);

    // Carregar usuários ao iniciar.
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await UserController.listUsers();
            setUsers(response);
        };

        fetchUsers();
    }, []);

    // Função para adicionar uma remessa.
    const handleAddShipment = async () => {
        const response = await ShipmentController.createShipments(
            type, itemName, "active", supplier, destination, new Date(), quantity,
        );

        if(response.error) {
            alert(response.error);
        } else {

            HistoryController.createHistory({
                action: `Criação de Remessa`,
                userName: users[0] ? users[0].name : null,
                userRole: "Funcionário",
                location: `Id do Armazém: ${destination}`,
                description: "",
            });

            setType(""); setSupplier(""); setDestination(0); setItemName(""); setQuantity(0);
            alert("Remessa registrada com sucesso!");
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.formContainer}>
                {/* Título do formulário */}
                <h1 className={styles.titulo2} style={{ color: "#ffffff" }}>Preencha as Informações:</h1>
                <hr color="#f1f1b1" size="5"/>
                {/* Formulário para adicionar um item */}
                <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddShipment();
                    }
                } className={styles.form}>
                    <label htmlFor="nome">Tipo</label>
                    <input 
                        type="text" 
                        id="type" 
                        name="type" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)} 
                        required 
                    />
                    <label htmlFor="fornecedor">Fornecedor:</label>
                    <input 
                        type="text" 
                        id="fornecedor" 
                        name="fornecedor" 
                        value={supplier} 
                        onChange={(e) => setSupplier(e.target.value)} 
                        required 
                    />
                    <label htmlFor="destino">Destino:</label>
                    <input 
                        type="number" 
                        id="destino" 
                        name="destino" 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)} 
                        required 
                    />
                    <label htmlFor="items">Nome do Item:</label>
                    <input 
                        type="text" 
                        id="items" 
                        name="items" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                        required 
                    />
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input 
                        type="number" 
                        id="quantidade" 
                        name="quantidade" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        required 
                    />
                    <button className={styles.submitButton} type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}