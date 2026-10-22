import { useState, useEffect } from "react";
import ColunaKanban from "./ColunaKanban";
import Header from "../Componentes/Header/Header";
import ModalTarefa from "./ModalTarefa";

const COLUNAS = [
  { id: "afazer", titulo: "A Fazer" },
  { id: "andamento", titulo: "Andamento" },
  { id: "concluido", titulo: "Concluído" },
];

function FormularioTarefa({
  tarefas,
  setTarefas,
  salvarTarefa,
  moverTarefa,
  removerTarefa,
  listaPrioridades = [],
  listaUsuarios = [],
  listaProjetos = [],
}) {
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [colunaAtiva, setColunaAtiva] = useState("afazer");
  const [filtroPrioridade, setFiltroPrioridade] = useState("todas");

  useEffect(() => {
    const pendentes = tarefas.filter(
      (t) => t.coluna === "afazer" || t.coluna === "andamento",
    ).length;
    if (pendentes > 0) {
      document.title = `(${pendentes}) TaskFlow - Mini Kanban`;
    } else {
      document.title = "TaskFlow - Mini Kanban";
    }
  }, [tarefas]);

  function handleRemoverTarefa(id) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?",
    );
    if (confirmacao) {
      removerTarefa(id);
    }
  }

  function abrirModalCriar(coluna) {
    setTarefaEditando(null);
    setColunaAtiva(coluna);
    setModalAberto(true);
  }

  function abrirModalEditar(tarefa) {
    setTarefaEditando(tarefa);
    setModalAberto(true);
  }

  async function handleSalvarTarefa(dados) {
    await salvarTarefa(dados);
  }

  return (
    <div>
      <Header titulo="TaskFlow - Mini Kanban" />

      {/* Alinhamento limpo do filtro de prioridade */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 0 16px 0",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <label
          htmlFor="filtro-prioridade"
          style={{
            color: "#ffffff",
            fontSize: "0.9rem",
            fontWeight: "600",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          Prioridade:
        </label>
        <select
          id="filtro-prioridade"
          value={filtroPrioridade}
          onChange={(e) => setFiltroPrioridade(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            background: "rgba(13, 27, 42, 0.85)",
            color: "#f8fafc",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "0.875rem",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="todas">Todas</option>
          {listaPrioridades.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.descricao}
            </option>
          ))}
        </select>
      </div>

      <div className="kanban-board">
        {COLUNAS.map((col) => (
          <ColunaKanban
            key={col.id}
            titulo={col.titulo}
            chaveColuna={col.id}
            tarefas={tarefas}
            prioridades={listaPrioridades}
            usuarios={listaUsuarios}
            projetos={listaProjetos}
            onMover={moverTarefa}
            onRemover={handleRemoverTarefa}
            onEditar={abrirModalEditar}
            onAbrirCriar={abrirModalCriar}
            filtroPrioridade={filtroPrioridade}
          />
        ))}
      </div>

      <ModalTarefa
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onSalvar={handleSalvarTarefa}
        tarefa={tarefaEditando}
        coluna={colunaAtiva}
        prioridades={listaPrioridades}
        usuarios={listaUsuarios}
        projetos={listaProjetos}
      />
    </div>
  );
}

export default FormularioTarefa;