import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../../styles/ReceberMercadoria.module.css';

// Componente principal para gerenciar o recebimento de mercadorias
export default function RecebeMercadoria() {
    // Estados para armazenar os valores dos campos do formulário e a lista de itens
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");
    const [items, setItems] = useState([]);

    // Função para adicionar um item
    const handleAddItem = async (e) => {
        e.preventDefault();
        // Verifica se todos os campos estão preenchidos corretamente
        if (!name || !description || quantity <= 0 || !location) {
            alert("Erro: Todos os campos devem ser preenchidos corretamente.");
            return;
        }

        // Cria um novo item e atualiza a lista de itens
        const newItem = { id: items.length + 1, name, description, quantity, location };
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        // Armazena a lista de itens no AsyncStorage
        await AsyncStorage.setItem('receivedItems', JSON.stringify(updatedItems));
        // Reseta os campos do formulário
        setName(""); setDescription(""); setQuantity(0); setLocation("");
        alert("Item cadastrado com sucesso!");
    };

    // Função para remover um item
    const handleRemoveItem = async (id) => {
        // Filtra a lista de itens para remover o item com o ID especificado
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        // Armazena a lista de itens atualizada no AsyncStorage
        await AsyncStorage.setItem('receivedItems', JSON.stringify(updatedItems));
        alert("Item removido com sucesso!");
    };

    // useEffect para carregar os itens do AsyncStorage ao iniciar o componente
    useEffect(() => {
        const loadData = async () => {
            try {
                // Tenta carregar os itens armazenados no AsyncStorage
                const storedItems = await AsyncStorage.getItem('receivedItems');
                // Atualiza o estado com os itens carregados ou uma lista vazia
                setItems(storedItems ? JSON.parse(storedItems) : []);
            } catch (error) {
                console.error("Erro ao carregar dados do AsyncStorage: ", error);
            }
        };

        // Chama a função para carregar os dados
        loadData();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.formContainer}>
                {/* Título do formulário */}
                <h1 className={styles.titulo2} style={{ color: "#ffffff" }}>Preencha as Informações</h1>
                <hr color="#f1f1b1" size="5"/>
                {/* Formulário para adicionar um item */}
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
                {/* Título da lista de itens recebidos */}
                <h1 className={styles.titulo2} style={{ color: "#ffffff" }}>Mercadorias Recebidas</h1>
                <hr color="#f1f1b1" size="5"/>
                <ul>
                    {/* Mapeia a lista de itens recebidos e exibe cada um como um item de lista */}
                    {items.length !== 0 ? (
                        items.map((item, index) => (
                            <li key={index} className={styles.itemBox}>
                                <span>{item.id} - Nome: {item.name}</span>
                                <p>Descrição: {item.description}</p>
                                <p>Quantidade: {item.quantity}</p>
                                <p>Localização: {item.location}</p>
                                {/* Botão para remover o item */}
                                <button 
                                    className={styles.removeButton} 
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Remover
                                </button>
                            </li>
                        ))
                    ) : (
                        // Mensagem exibida quando não há itens cadastrados
                        <p>Não há itens cadastrados!</p>
                    )}
                </ul>
            </div>
        </div>
    );
}