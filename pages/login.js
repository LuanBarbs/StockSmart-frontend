import { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if(email === "admin@gmail.com" && password === "admin") {
            router.push("/initAdmin");
        } else if(email === "gerente@gmail.com" && password === "gerente") {
            router.push("/initManager");
        } else if(email === "func@gmail.com" && password === "funcionario") {
            router.push("/initEmployee");
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
                    <label htmlFor="email">Seu email*</label>
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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