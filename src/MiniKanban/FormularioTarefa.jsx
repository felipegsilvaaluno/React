import { useState } from "react";
import ColunaKanban from "./ColunaKanban";
import Header from "../Componentes/Header/Header";

const COLUNAS = [
  { id: "afazer", titulo: "A Fazer" },
  { id: "andamento", titulo: "Andamento" },
  { id: "concluido", titulo: "Concluído" },
];

function FormularioTarefa({ tarefas, setTarefas, moverTarefa, removerTarefa }) {
  const [texto, setTexto] = useState("");
   const [prioridade, setPrioridade] = useState("media");

  function Enviar(e) {
    e.preventDefault();
    if (!texto.trim()) return;

    const novaTarefa = {
      id: Date.now(),
      texto: texto.trim(),
      concluida: false,
      coluna: "afazer",
      prioridade: prioridade,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto("");
    setPrioridade("media");
  }

  return (
    <div>
      <Header titulo="TaskFlow - Mini Kanban" />

      <form onSubmit={Enviar} className="form-tarefa">
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Adicionar</button>

        <select
          id="prioridade"
          name="prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>
        
      </form>

      <div className="kanban-board">
        {COLUNAS.map((col) => (
          <ColunaKanban
            key={col.id}
            titulo={col.titulo}
            chaveColuna={col.id}
            tarefas={tarefas}
            onMover={moverTarefa}
            onRemover={removerTarefa}
          />
        ))}
      </div>
    </div>
  );
}

export default FormularioTarefa;
