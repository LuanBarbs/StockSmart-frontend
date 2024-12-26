import React from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>SmartStock</div>
          <div className={styles.navLinks}>
            <button className={styles.loginButton} onClick={() => window.location.href = '/login'}>
              Entrar
            </button>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h1>Bem-vindos ao SmartStock</h1>
          <p>O sistema simplificado de WMS para gerenciar estoque de forma eficiente e prática.</p>
        </section>
        <section className={styles.cardsTitle}>
          <h1>Benefícios e Funcionalidades do Sistema</h1>
        </section>
        <section className={styles.cards}>
          <div className={styles.card}>
            <h2>Controle de Estoque</h2>
            <p>Gerencie seu inventário com total rastreabilidade e eficiência.</p>
          </div>
          <div className={styles.card}>
            <h2>Otimização de Espaço</h2>
            <p>Defina as melhores posições para armazenagem de produtos.</p>
          </div>
          <div className={styles.card}>
            <h2>Facilidade de Uso</h2>
            <p>Uma interface intuitiva para maximizar a produtividade.</p>
          </div>
        </section>
        <section className={styles.cards}>
          <div className={styles.card}>
            <h2>Controle de Estoque</h2>
            <p>Gerencie seu inventário com total rastreabilidade e eficiência.</p>
          </div>
          <div className={styles.card}>
            <h2>Otimização de Espaço</h2>
            <p>Defina as melhores posições para armazenagem de produtos.</p>
          </div>
          <div className={styles.card}>
            <h2>Facilidade de Uso</h2>
            <p>Uma interface intuitiva para maximizar a produtividade.</p>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 SmartStock. Todos os direitos reservados.</p>
      </footer>
    </>
  );
};
