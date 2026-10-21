import CardTarefa from "./CardTarefa";

// Mapeamento de ID do banco -> classe de CSS
const CLASSE_PRIORIDADE = { 3: "baixa", 5: "media", 6: "alta" };

function ColunaKanban({
  titulo,
  chaveColuna,
  tarefas,
  prioridades = [],
  usuarios = [],
  projetos = [],
  onMover,
  onRemover,
  onEditar,
  onAbrirCriar,
  filtroPrioridade,
}) {
  const tarefasDaColuna = tarefas.filter((t) => {
    const pertenceAColuna = t.coluna === chaveColuna;
    if (!pertenceAColuna) return false;

    if (filtroPrioridade === "todas") return true;

    const idPrio = t.idprioridade || t.id_prioridade;

    if (!isNaN(filtroPrioridade)) {
      return Number(idPrio) === Number(filtroPrioridade);
    }

    const prioObj = prioridades.find((p) => Number(p.id) === Number(idPrio));
    const descPrioridade = (prioObj?.descricao || t.prioridade || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const filtroNormalizado = filtroPrioridade
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return descPrioridade === filtroNormalizado;
  });

  return (
    <div className="coluna">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>
          {titulo} <span className="contador">({tarefasDaColuna.length})</span>
        </h2>
        <button
          onClick={() => onAbrirCriar(chaveColuna)}
          style={{ cursor: "pointer", padding: "4px 8px", borderRadius: "4px" }}
        >
          +
        </button>
      </div>

      <div className="cards-list">
        {tarefasDaColuna.map((tarefa) => {
          const idPrio = tarefa.idprioridade || tarefa.id_prioridade;
          const prioridadeObj = prioridades.find(
            (p) => Number(p.id) === Number(idPrio)
          );

          // Procura o nome do responsável
          const idUser = tarefa.usuario_id || tarefa.usuarioId;
          const usuarioObj = usuarios.find((u) => Number(u.id) === Number(idUser));

          // Procura o nome do projeto
          const idProj = tarefa.projeto_id || tarefa.projetoId;
          const projetoObj = projetos.find((p) => Number(p.id) === Number(idProj));

          return (
            <CardTarefa
              key={tarefa.id}
              tarefa={tarefa}
              prioridade={CLASSE_PRIORIDADE[idPrio] || "media"}
              rotuloPrioridade={prioridadeObj?.descricao || "Média"}
              responsavel={usuarioObj?.nome || "Sem responsável"}
              projeto={projetoObj?.nome || "Sem projeto"}
              onMover={onMover}
              onRemover={onRemover}
              onEditar={onEditar}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ColunaKanban;