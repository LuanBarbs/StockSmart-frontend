import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../../styles/ReceberMercadoria.module.css';

export default function RecebeMercadoria() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");
    const [items, setItems] = useState([]);

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!name || !description || quantity <= 0 || !location) {
            alert("Erro: Todos os campos devem ser preenchidos corretamente.");
            return;
        }

        const newItem = { id: items.length + 1, name, description, quantity, location };
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        await AsyncStorage.setItem('receivedItems', JSON.stringify(updatedItems));
        setName(""); setDescription(""); setQuantity(0); setLocation("");
        alert("Item cadastrado com sucesso!");
    };

    const handleRemoveItem = async (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        await AsyncStorage.setItem('receivedItems', JSON.stringify(updatedItems));
        alert("Item removido com sucesso!");
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedItems = await AsyncStorage.getItem('receivedItems');
                setItems(storedItems ? JSON.parse(storedItems) : []);
            } catch (error) {
                console.error("Erro ao carregar dados do AsyncStorage: ", error);
            }
        };

        loadData();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.formContainer}>
            <h1 className={styles.titulo2} style={{ color: "#ffffff" }}>Preencha as Informações</h1>
                <hr color="#f1f1b1" size="5"/>
                <form onSubmit={handleAddItem} className={styles.form}>
                    <label htmlFor="nome">Nome:</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <label htmlFor="descricao">Descrição do item:</label>
                    <input 
                        type="text" 
                        id="descricao" 
                        name="descricao" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
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
                    <label htmlFor="localizacao">Localização:</label>
                    <input 
                        type="text" 
                        id="localizacao" 
                        name="localizacao" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                    <button className={styles.submitButton} type="submit">Cadastrar</button>
                </form>
            </div>
            <div className={styles.itemsContainer}>
                <h1 className={styles.titulo2} style={{ color: "#ffffff" }}>Mercadorias Recebidas</h1>
                <hr color="#f1f1b1" size="5"/>
                <ul>
                    {items.length !== 0 ? (
                        items.map((item, index) => (
                            <li key={index} className={styles.itemBox}>
                                <span>{item.id} - Nome: {item.name}</span>
                                <p>Descrição: {item.description}</p>
                                <p>Quantidade: {item.quantity}</p>
                                <p>Localização: {item.location}</p>
                                <button 
                                    className={styles.removeButton} 
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Remover
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>Não há itens cadastrados!</p>
                    )}
                </ul>
            </div>
        </div>
    );
}