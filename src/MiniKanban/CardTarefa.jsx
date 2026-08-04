export default function CardTarefa({ tarefa, onMover, onRemover }) {
  const { id, texto, coluna } = tarefa;

  return (
    <div className="card">
      <p>{texto}</p>
      <div className="acoes">
        {/* Exibe botão de voltar apenas se NÃO estiver na primeira coluna */}
        {coluna === "andamento" && (
          <button onClick={() => onMover(id, "afazer")}>← Voltar</button>
        )}
        {coluna === "concluido" && (
          <button onClick={() => onMover(id, "andamento")}>← Voltar</button>
        )}

        {/* Botão de exclusão */}
        <button onClick={() => onRemover(id)} className="btn-excluir">
          ✕
        </button>

        {/* Exibe botão de avançar apenas se NÃO estiver na última coluna */}
        {coluna === "afazer" && (
          <button onClick={() => onMover(id, "andamento")}>Mover →</button>
        )}
        {coluna === "andamento" && (
          <button onClick={() => onMover(id, "concluido")}>Avançar →</button>
        )}
      </div>
    </div>
  );
}
