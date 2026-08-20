import { useState, useEffect } from "react";
import axios from "axios";
import FormularioTarefa from "./FormularioTarefa";
import Footer from "../Componentes/Footer/Footer";
import "./Minikanban.css";
import Sidebar from "../Componentes/Sidebar/Sidebar";

// Coloque aqui a URL da sua API do MockAPI
const URL_API = "https://6a85b2a29c451dc67a63fe42.mockapi.io/api/tarefas";

function MiniKanban() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // GET - carregar tarefas da API
  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregando(true);

        setErro("");

        const resposta = await axios.get(URL_API);

        // resposta.data ja e o array de tarefas

        setTarefas(resposta.data);
      } catch (e) {
        setErro("Erro ao carregar tarefas. Verifique a conexao.");

        console.error(e);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  // POST - criar tarefa
  async function salvarTarefa(dados) {
    try {
      if (dados.id !== undefined) {
        // EDITAR — PUT com o id na URL

        const { data: tarefaEditada } = await axios.put(
          URL_API + "/" + dados.id,

          {
            texto: dados.texto,

            prioridade: dados.prioridade,

            cidade: dados.cidade,

            coluna: dados.coluna,
          },
        );

        // Atualizar a tarefa no estado local

        setTarefas((tarefasAtuais) =>
          tarefasAtuais.map((t) => (t.id === dados.id ? tarefaEditada : t)),
        );
      } else {
        // CRIAR — POST (slide anterior)

        const { data: novaTarefa } = await axios.post(URL_API, dados);

        setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
      }
    } catch (e) {
      setErro("Erro ao salvar tarefa.");

      console.error(e);
    }
  }

  // PATCH - mover tarefa
  async function moverTarefa(id, novaColuna) {
    try {
      // PATCH — envia apenas o campo coluna

      const { data: tarefaMovida } = await axios.patch(
        URL_API + "/" + id,

        { coluna: novaColuna },
      );

      // Atualizar o estado local com a tarefa retornada

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((t) => (t.id === id ? tarefaMovida : t)),
      );
    } catch (e) {
      setErro("Erro ao mover tarefa. Tente novamente.");

      console.error(e);
    }
  }

  // DELETE - remover tarefa
  async function deletarTarefa(id) {
    // Confirmação antes de deletar — UX defensiva

    const confirmado = window.confirm(
      "Tem certeza que deseja deletar esta tarefa?",
    );

    if (!confirmado) return;

    try {
      // DELETE na API — id na URL

      await axios.delete(URL_API + "/" + id);

      // Remover do estado local apenas apos confirmar na API

      setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
    } catch (e) {
      setErro("Erro ao deletar tarefa. Tente novamente.");

      console.error(e);
    }
  }


  return (
    <div className="container">
      <Sidebar />

      {/* Feedback de carregamento */}

      {carregando && (
        <p style={{ textAlign: "center", color: "#94A3B8" }}>
          Carregando tarefas...
        </p>
      )}

      {/* Feedback de erro */}

      {erro && <p style={{ textAlign: "center", color: "#EF4444" }}>{erro}</p>}

      {/* Quadro Kanban — so aparece quando nao esta carregando */}

      {!carregando && !erro && (
        <div className="kanban-quadro">{/* ... colunas */}</div>
      )}

      {!carregando && (
        <FormularioTarefa
          tarefas={tarefas}
          setTarefas={setTarefas}
          salvarTarefa={salvarTarefa}
          moverTarefa={moverTarefa}
          removerTarefa={deletarTarefa}
        />
      )}

      <Footer />
    </div>
  );
}

export default MiniKanban;
