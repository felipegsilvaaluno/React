import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {
  const { token, logout } = useAuth();
  const [recolhida, setRecolhida] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? styles.link + " " + styles.ativo : styles.link;

  return (
    <aside
      className={`${styles.sidebar} ${recolhida ? styles.recolhida : ""}`}
    >
      {/* Botão de alternância (Toggle) */}
      <button
        className={styles.btnToggle}
        onClick={() => setRecolhida(!recolhida)}
        title={recolhida ? "Expandir menu" : "Recolher menu"}
        aria-label="Alternar navegação"
      >
        {recolhida ? "❯" : "❮"}
      </button>

      <div className={styles.logo}>
        <h1>{recolhida ? "TF" : "TaskFlow"}</h1>
      </div>

      <nav className={styles.nav}>
        {token && (
          <NavLink to="/" className={linkClass} title="MiniKanban">
            <span className={styles.icone}>📋</span>
            {!recolhida && <span>MiniKanban</span>}
          </NavLink>
        )}
        {token && (
          <NavLink to="/Sobre" className={linkClass} title="Sobre">
            <span className={styles.icone}>ℹ️</span>
            {!recolhida && <span>Sobre</span>}
          </NavLink>
        )}
      </nav>

      {token && (
        <button
          className={styles.btnLogout}
          onClick={logout}
          title="Sair"
        >
          <span className={styles.icone}>🚪</span>
          {!recolhida && <span>Sair</span>}
        </button>
      )}
    </aside>
  );
}

export default Sidebar;