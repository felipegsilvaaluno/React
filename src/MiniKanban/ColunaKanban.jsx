import CardTarefa from "./CardTarefa";

function ColunaKanban({
  titulo,
  chaveColuna,
  tarefas,
  onMover,
  onRemover,
}) {
  // Filtra as tarefas pertencentes a esta coluna
  const tarefasDaColuna = tarefas.filter((t) => t.coluna === chaveColuna);

  return (
    <div className="coluna">
      <h2>
        {titulo}
        <span className="contador">({tarefasDaColuna.length})</span>
      </h2>
      <div className="cards-list">
        {tarefasDaColuna.map((tarefa) => (
          <CardTarefa
            key={tarefa.id}
            prioridade={tarefa.prioridade}
            tarefa={tarefa}
            onMover={onMover}
            onRemover={onRemover}
          />
        ))}
      </div>
    </div>
  );
}

export default ColunaKanban;
