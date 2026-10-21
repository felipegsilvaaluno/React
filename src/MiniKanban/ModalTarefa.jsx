import { useState, useEffect } from "react";
import styles from "./ModalTarefa.module.css";
import { mensagensDeErro } from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function paraNumero(valor) {
  return valor ? Number(valor) : null;
}

function ModalTarefa({
  aberto,
  onFechar,
  onSalvar,
  tarefa = null,
  coluna = "afazer",
  prioridades = [],
  usuarios = [],
  projetos = [],
}) {
  const { usuario } = useAuth();

  const [texto, setTexto] = useState("");
  const [idPrioridade, setIdPrioridade] = useState(2);
  const [idUsuario, setIdUsuario] = useState("");
  const [idProjeto, setIdProjeto] = useState("");
  const [erros, setErros] = useState([]);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && aberto) {
        onFechar();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aberto, onFechar]);

  useEffect(() => {
    setErros([]);
    if (tarefa) {
      setTexto(tarefa.texto || "");
      setIdPrioridade(tarefa.id_prioridade || tarefa.idprioridade || 2);
      setIdUsuario(tarefa.usuario_id || "");
      setIdProjeto(tarefa.projeto_id || "");
    } else {
      setTexto("");
      setIdPrioridade(2);
      setIdUsuario(usuario?.id || usuarios[0]?.id || "");
      setIdProjeto(projetos[0]?.id || "");
    }
  }, [tarefa, aberto, usuario, usuarios, projetos]);

  async function handleSalvar(e) {
    if (e) e.preventDefault();
    setErros([]);
    setSalvando(true);
    try {
      await onSalvar({
        ...tarefa,
        id: tarefa?.id,
        texto,
        coluna: tarefa?.coluna || coluna,
        id_prioridade: paraNumero(idPrioridade),
        idprioridade: paraNumero(idPrioridade),
        usuario_id: paraNumero(idUsuario),
        projeto_id: paraNumero(idProjeto),
      });
      onFechar();
    } catch (e) {
      setErros(mensagensDeErro ? mensagensDeErro(e) : []);
    } finally {
      setSalvando(false);
    }
  }

  if (!aberto) return null;

  return (
    <div className={styles.overlay} onClick={onFechar}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <h2>{tarefa ? "Editar tarefa" : "Nova tarefa"}</h2>

        <form onSubmit={handleSalvar} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className={styles.campo}>
            <label htmlFor="tarefa-texto">Tarefa</label>
            <input
              id="tarefa-texto"
              type="text"
              placeholder="Descreva a tarefa"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="tarefa-responsavel">Responsável</label>
            <select
              id="tarefa-responsavel"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
            >
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.campo}>
            <label htmlFor="tarefa-projeto">Projeto</label>
            <select
              id="tarefa-projeto"
              value={idProjeto}
              onChange={(e) => setIdProjeto(e.target.value)}
            >
              {projetos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.campo}>
            <label htmlFor="tarefa-prioridade">Prioridade</label>
            <select
              id="tarefa-prioridade"
              value={idPrioridade}
              onChange={(e) => setIdPrioridade(e.target.value)}
            >
              {prioridades.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.descricao}
                </option>
              ))}
            </select>
          </div>

          {/* Passo 11: Lista de erros antes da div de botões */}
          {erros.length > 0 && (
            <ul className={styles.erros}>
              {erros.map((mensagem, i) => (
                <li key={i}>{mensagem}</li>
              ))}
            </ul>
          )}

          <div className={styles.botoes}>
            <button type="button" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalTarefa;