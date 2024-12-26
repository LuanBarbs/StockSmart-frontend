import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

export default function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if(id === "0" && password === "admin") {
            router.push("/initAdmin");
        } else if(id === "1" && password === "gerente") {
            router.push("/gerente");
        } else if(id === "2" && password === "funcionario") {
            router.push("/funcionario");
        } else {
            alert("ID ou senha incorretos!");
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Faça o seu login</h1>
                <hr color="#f1f1b1" size="5" />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    className={styles.form}
                >
                    <label htmlFor="id">Seu id*</label>
                    <input 
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className={styles.input}
                        required
                    />

                    <label>Sua senha*</label>
                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />

                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
};