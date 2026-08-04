import { useState } from "react";
import Header from "./Header";
import ColunaKanban from "./ColunaKanban";

const COLUNAS = [
  { id: "afazer", titulo: "A Fazer" },
  { id: "andamento", titulo: "Andamento" },
  { id: "concluido", titulo: "Concluído" },
];

function FormularioTarefa({ tarefas, setTarefas, moverTarefa, removerTarefa }) {
  const [texto, setTexto] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!texto.trim()) return;

    const novaTarefa = {
      id: Date.now(),
      texto: texto.trim(),
      concluida: false,
      coluna: "afazer",
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto("");
  }

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit} className="form-tarefa">
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {/* A renderização das colunas agora fica aqui dentro */}
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
