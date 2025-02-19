import React from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}><span>Smart</span>Stock</div>
          <div className={styles.navLinks}>
            <button className={styles.loginButton} onClick={() => window.location.href = '/login'}>
              Entrar
            </button>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h1>Bem-vindo ao <span>Smart</span>Stock</h1>
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
            <h2>Relatórios Personalizados</h2>
            <p>Gere relatórios detalhados para tomada de decisões estratégicas.</p>
          </div>
          <div className={styles.card}>
            <h2>Integração Fácil</h2>
            <p>Conecte seu WMS com outros sistemas e plataformas de forma rápida e simples.</p>
          </div>
          <div className={styles.card}>
            <h2>Gestão de Pedidos</h2>
            <p>Acompanhe e gerencie pedidos com eficiência, garantindo entregas rápidas e precisas.</p>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 SmartStock. Todos os direitos reservados.</p>
      </footer>
    </>
  );
};
