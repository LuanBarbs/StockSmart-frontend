import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/InitAdmin.module.css';
import { FaEye, FaBars } from "react-icons/fa";

import User from "../models/User";

export default function initAdmin() {
    const [showForm, setShowForm] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [password, setPassword] = useState("");

    const [users, setUsers] = useState([]);

    const handleToggleForm = () => setShowForm(!showForm);
    const handleToggleUsers = () => setShowUsers(!showUsers);

    useEffect(() => {
        // Carregar gerentes e usuários do AsyncStorage ao iniciar
        const loadData = async () => {
          try {
            const storedUsers = await AsyncStorage.getItem('users');
            setUsers(storedUsers ? JSON.parse(storedUsers) : []);
          } catch (error) {
            console.error("Erro ao carregar dados do AsyncStorage:", error);
          }
        };
        loadData();
    }, []);

    const handleAddUser = async () => {
        const newUser = new User(
            users.length + 1, name, cpf, address, phone, email, position, password);
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        setName(""); setCpf(""); setEmail(""); setAddress(""); setPhone(""); setPosition(""); setPassword("");
    };

    return (
        <main className={styles.container}>
            <section className={styles.tabs}>
                <button onClick={handleToggleForm} className={styles.tabButton}>Cadastrar Usuário</button>
                <button onClick={handleToggleUsers} className={styles.tabButton}>
                    Visualizar Usuários <FaBars />
                </button>
            </section>
            <section className={styles.content}>
                {showForm && (
                    <section className={`${showUsers ? styles.formContainer : styles.fullFormContainer}`}>
                        <h1>Preencha as informações</h1>
                        <hr color="#f1f1b1" size="5"/>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddUser();
                            }}
                            className={styles.form}
                        >
                            <label htmlFor="name">Nome:</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label htmlFor="cpf">CPF:</label>
                            <input 
                                type="text" 
                                id="cpf" 
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Email:</label>    
                            <input 
                                type="email" 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Endereço:</label>
                            <input 
                                type="text" 
                                id="address" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}    
                                required
                            />
                            <label>Telefone:</label>
                            <input 
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} 
                                required
                            />
                            <label>Cargo:</label>
                            <select id="position" onChange={(e) => setPosition(e.target.value)} required>
                                <option value="employee">Funcionário</option>
                                <option value="manager">Gerente</option>
                            </select>
                            <label>Senha:</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <button type="submit">Cadastrar</button>
                        </form>
                    </section>
                )}
                
                {showUsers && (
                    <section className={`${showForm ? styles.usersContainer : styles.fullUsersContainer}`}>
                        <h1>Usuários Cadastrados</h1>
                        <hr color="#f1f1b1" size="5"/>
                        <ul>
                            {users.length != 0 && (
                                users.map((user) => (
                                    <li>
                                        <span>{user.id} - Nome: {user.name}</span>
                                        <button className={styles.eyeButton}><FaEye /></button>
                                    </li>
                                ))
                            )}
                            {users.length == 0 && (
                                <p>Não há usuários cadastrados!</p>
                            )}
                        </ul>      
                    </section>
                )}
            </section>
        </main>
    );
};