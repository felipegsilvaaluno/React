import { useState, useEffect } from "react";
import FormularioTarefa from "./FormularioTarefa";
import Footer from "../Componentes/Footer/Footer";
import "./Minikanban.css";
import Sidebar from "../Componentes/Sidebar/Sidebar";
import api, { mensagensDeErro } from "../api/api";

function MiniKanban() {
  const [tarefas, setTarefas] = useState([]);
  const [listaPrioridades, setListaPrioridades] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaProjetos, setListaProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [respPrioridades, respTarefas, respUsuarios, respProjetos] =
          await Promise.all([
            api.get("/prioridades"),
            api.get("/tarefas"),
            api.get("/usuarios"),
            api.get("/projetos"),
          ]);

        setListaPrioridades(respPrioridades.data);
        setTarefas(respTarefas.data);
        setListaUsuarios(respUsuarios.data);
        setListaProjetos(respProjetos.data);
      } catch (e) {
        setErro("Erro ao carregar dados do Kanban. Verifique a conexão.");
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  // Garante que o valor devolvido para a chave 'prioridade' é "alta", "media" ou "baixa"
  function normalizarPrioridadeStrict(dados) {
    const idPrio = Number(
      dados?.id_prioridade || dados?.idprioridade || dados?.prioridade_id
    );

    // Mapeamento direto por ID da API (3: baixa, 5: media, 6: alta / 1: baixa, 2: media, 3: alta)
    if (idPrio === 3 || idPrio === 1) return "baixa";
    if (idPrio === 6) return "alta";
    if (idPrio === 5 || idPrio === 2) return "media";

    // Fallback por verificação de texto caso venha da lista ou objeto
    let texto = "";
    const prioObj = listaPrioridades.find((p) => Number(p.id) === idPrio);
    if (prioObj?.descricao) {
      texto = prioObj.descricao;
    } else if (dados?.prioridade) {
      texto = dados.prioridade;
    }

    const limpo = texto
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

    if (limpo.includes("alta")) return "alta";
    if (limpo.includes("baix")) return "baixa";

    return "media";
  }

  // 1. Salvar ou Editar Tarefa
  async function salvarTarefa(dados) {
    const prioridadeValidada = normalizarPrioridadeStrict(dados);

    const idUsuarioNum = Number(
      dados.usuario_id || dados.usuarioId || listaUsuarios[0]?.id || 1
    );
    const idProjetoNum = Number(
      dados.projeto_id || dados.projetoId || listaProjetos[0]?.id || 1
    );

    const payload = {
      texto: dados.texto || "",
      coluna: dados.coluna || "afazer",
      prioridade: prioridadeValidada,
      usuarioId: idUsuarioNum,
      usuario_id: idUsuarioNum,
      projetoId: idProjetoNum,
      projeto_id: idProjetoNum,
      id_prioridade: Number(dados.id_prioridade || dados.idprioridade || 5),
      idprioridade: Number(dados.id_prioridade || dados.idprioridade || 5),
    };

    if (dados.id) {
      const resposta = await api.put(`/tarefas/${dados.id}`, payload);
      setTarefas(tarefas.map((t) => (t.id === dados.id ? resposta.data : t)));
    } else {
      const resposta = await api.post("/tarefas", payload);
      setTarefas([...tarefas, resposta.data]);
    }
  }

  // 2. Deletar Tarefa
  async function deletarTarefa(id) {
    try {
      await api.delete(`/tarefas/${id}`);
      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (e) {
      alert(mensagensDeErro ? mensagensDeErro(e).join("\n") : "Erro ao deletar tarefa.");
    }
  }

  // 3. Mover Tarefa entre Colunas
  async function moverTarefa(id, novaColuna) {
    const tarefa = tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    try {
      const prioridadeValidada = normalizarPrioridadeStrict(tarefa);

      const idUsuarioNum = Number(
        tarefa.usuario_id || tarefa.usuarioId || listaUsuarios[0]?.id || 1
      );
      const idProjetoNum = Number(
        tarefa.projeto_id || tarefa.projetoId || listaProjetos[0]?.id || 1
      );

      const payload = {
        texto: tarefa.texto || "",
        coluna: novaColuna,
        prioridade: prioridadeValidada,
        usuarioId: idUsuarioNum,
        usuario_id: idUsuarioNum,
        projetoId: idProjetoNum,
        projeto_id: idProjetoNum,
        id_prioridade: Number(tarefa.id_prioridade || tarefa.idprioridade || 5),
        idprioridade: Number(tarefa.id_prioridade || tarefa.idprioridade || 5),
      };

      const resposta = await api.put(`/tarefas/${id}`, payload);
      setTarefas(tarefas.map((t) => (t.id === id ? resposta.data : t)));
    } catch (e) {
      alert(mensagensDeErro ? mensagensDeErro(e).join("\n") : "Erro ao mover tarefa.");
    }
  }

  return (
    <div className="container">
      <Sidebar />
      {carregando && (
        <p style={{ textAlign: "center", color: "#94A3B8" }}>
          Carregando dados...
        </p>
      )}
      {erro && <p style={{ textAlign: "center", color: "#EF4444" }}>{erro}</p>}

      {!carregando && (
        <FormularioTarefa
          tarefas={tarefas}
          setTarefas={setTarefas}
          salvarTarefa={salvarTarefa}
          moverTarefa={moverTarefa}
          removerTarefa={deletarTarefa}
          listaPrioridades={listaPrioridades}
          listaUsuarios={listaUsuarios}
          listaProjetos={listaProjetos}
        />
      )}

      <Footer />
    </div>
  );
}

export default MiniKanban;