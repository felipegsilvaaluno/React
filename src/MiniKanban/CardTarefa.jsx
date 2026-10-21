function CardTarefa({
  tarefa,
  prioridade = "media",
  rotuloPrioridade = "",
  responsavel = "",
  projeto = "",
  onMover,
  onRemover,
  onEditar,
}) {
  const { id, texto, coluna } = tarefa;

  return (
    <div
      className={`card prioridade-${prioridade}`}
      onDoubleClick={() => onEditar(tarefa)}
    >
      <div className="card-conteudo">
        <span className={`tag-prioridade ${prioridade}`}>
          {rotuloPrioridade || prioridade}
        </span>
        <p>{texto}</p>

        {/* Informações do Responsável e Projeto */}
        <div style={{ fontSize: "12px", color: "#64748B", marginTop: "8px" }}>
          <p style={{ margin: "2px 0" }}>👤 {responsavel}</p>
          <p style={{ margin: "2px 0" }}>📁 {projeto}</p>
        </div>
      </div>

      <div className="acoes">
        {coluna === "andamento" && (
          <button onClick={() => onMover(tarefa.id, "afazer")}>←</button>
        )}
        {coluna === "concluido" && (
          <button onClick={() => onMover(tarefa.id, "andamento")}>←</button>
        )}

        <button onClick={() => onRemover(id)} className="btn-excluir">
          ✕
        </button>

        {coluna === "afazer" && (
          <button onClick={() => onMover(tarefa.id, "andamento")}>→</button>
        )}
        {coluna === "andamento" && (
          <button onClick={() => onMover(tarefa.id, "concluido")}>→</button>
        )}
      </div>
    </div>
  );
}

export default CardTarefa;