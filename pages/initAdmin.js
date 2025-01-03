import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/InitAdmin.module.css';
import { FaEye, FaBars, FaUserCircle, FaTrash, FaEdit } from "react-icons/fa";

import User from "../models/User";

export default function initAdmin() {
    const [showForm, setShowForm] = useState(true);
    const [showUsers, setShowUsers] = useState(false);
    const [modalVisibile, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);

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

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setSelectedUser(null);
        setModalVisible(false);
    };

    const handleEditUser = (user) => {
        setEditUser(user);
        setEditModalOpen(true);
    };

    const handleAddUser = async () => {
        const newUser = new User(
            users.length + 1, name, cpf, address, phone, email, position, password
        );

        if(isDuplicate(newUser.cpf, newUser.email)) {
            alert("Erro: CPF ou email já registrados no sistema!");
            return;
        }

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        setName(""); setCpf(""); setEmail(""); setAddress(""); setPhone(""); setPosition(""); setPassword("");
        alert("Cadastro realizado com sucesso!");
    };

    const handleDeleteUser = async () => {
        const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
        setUsers(updatedUsers);
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        handleCloseModal();
        alert("Exclusão realizada com sucesso!");
    };

    const handleUpdateUser = async () => {
        if(isDuplicate(editUser.cpf, editUser.email, editUser.id)) {
            alert("Erro: CPF ou email já registrados no sistema!");
            return;
        }

        const updatedUsers = users.map(user =>
            user.id === editUser.id ? editUser : user
        );
        setUsers(updatedUsers);
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        setEditModalOpen(false);
        handleCloseModal();
        alert("Alteração realizada com sucesso!");
    };

    const isDuplicate = (cpf, email, userId = null) => {
        return users.some(user =>
            (user.cpf === cpf || user.email === email) && user.id != userId
        );
    };

    // Carregar usuários do AsyncStorage ao iniciar.
    useEffect(() => {
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

    return (
        <main className={styles.container}>
            <section className={styles.tabs}>
                <button onClick={handleToggleForm} className={styles.tabButton}>Cadastrar Usuário</button>
                <button onClick={handleToggleUsers} className={styles.tabButton}>
                    Gerenciar Usuários <FaBars />
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
                            <select 
                                id="position" 
                                value={position}
                                onChange={(e) => setPosition(e.target.value)} 
                                required
                            >
                                <option value="">Selecione um cargo</option>
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
                                users.map((user, index) => (
                                    <li key={index} className={styles.userBox}>
                                        <span>{user.id} - Nome: {user.name}</span>
                                        <button 
                                            className={styles.eyeButton}
                                            onClick={() => handleOpenModal(user)}    
                                        >
                                            <FaEye />
                                        </button>
                                    </li>
                                ))
                            )}
                            {users.length == 0 && (
                                <p>Não há usuários cadastrados!</p>
                            )}
                        </ul>      
                    </section>
                )}

                {modalVisibile && selectedUser && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
                            <FaUserCircle size={100}/>
                            <h2>{selectedUser.name}</h2>
                            <p>Email: {selectedUser.email}</p>
                            <p>CPF: {selectedUser.cpf}</p>
                            <p>Endereço: {selectedUser.address}</p>
                            <p>Telefone: {selectedUser.phone}</p>
                            <p>Cargo: {selectedUser.position === "employee" ? "Funcionário" : "Gerente"}</p>
                            <div className={styles.modalActions}>
                                <button onClick={() => handleEditUser(selectedUser)}><FaEdit /> Alterar</button>
                                <button onClick={handleDeleteUser}><FaTrash /> Excluir</button>
                            </div>
                        </div>
                    </div>
                )}

                {editModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>Alterar Usuário</h2>
                            <form 
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleUpdateUser();
                                }}
                            >
                                <label>Nome:</label>
                                <input 
                                    type="text" 
                                    value={editUser.name}
                                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                />
                                <label>CPF:</label>
                                <input 
                                    type="text" 
                                    value={editUser.cpf}
                                    onChange={(e) => setEditUser({ ...editUser, cpf: e.target.value })}
                                />
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    value={editUser.email}
                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                />
                                <label>Endereço:</label>
                                <input 
                                    type="text" 
                                    value={editUser.address}
                                    onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
                                />
                                <label>Telefone:</label>
                                <input 
                                    type="text" 
                                    value={editUser.phone}
                                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                                />
                                <label>Cargo:</label>
                                <select
                                    value={editUser.position}
                                    onChange={(e) => setEditUser({ ...editUser, position: e.target.value })}
                                >
                                    <option value="employee">Funcionário</option>
                                    <option value="manager">Gerente</option>
                                </select>
                                <div className={styles.modalActions}>
                                    <button type="submit">Salvar</button>
                                    <button onClick={() => setEditModalOpen(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};