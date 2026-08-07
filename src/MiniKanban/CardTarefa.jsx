function CardTarefa({ tarefa, onMover, onRemover }) {
  const { id, texto, coluna, prioridade, endereco } = tarefa;

  return (
    <div className={`card prioridade-${prioridade}`}>
      <div className="card-conteudo">
        <span className="tag-prioridade">{prioridade}</span>
        <p>{texto}</p>
        {endereco && <small className="card-endereco">📍 {endereco}</small>}
      </div>

      <div className="acoes">
        {coluna === "andamento" && (
          <button onClick={() => onMover(id, "afazer")}>←</button>
        )}
        {coluna === "concluido" && (
          <button onClick={() => onMover(id, "andamento")}>←</button>
        )}

        <button onClick={() => onRemover(id)} className="btn-excluir">
          ✕
        </button>

        {coluna === "afazer" && (
          <button onClick={() => onMover(id, "andamento")}>→</button>
        )}
        {coluna === "andamento" && (
          <button onClick={() => onMover(id, "concluido")}>→</button>
        )}
      </div>
    </div>
  );
}

export default CardTarefa;
