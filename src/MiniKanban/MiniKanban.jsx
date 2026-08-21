import { useState, useEffect } from "react";
import axios from "axios";
import FormularioTarefa from "./FormularioTarefa";
import Footer from "../Componentes/Footer/Footer";
import "./Minikanban.css";
import Sidebar from "../Componentes/Sidebar/Sidebar";

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

        setTarefas((tarefasAtuais) =>
          tarefasAtuais.map((t) => (t.id === dados.id ? tarefaEditada : t)),
        );
      } else {

        const { data: novaTarefa } = await axios.post(URL_API, dados);

        setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
      }
    } catch (e) {
      setErro("Erro ao salvar tarefa.");

      console.error(e);
    }
  }

  // PATCH/PUT - mover tarefa
  async function moverTarefa(id, novaColuna) {
    try {

      const { data: tarefaMovida } = await axios.put(
        URL_API + "/" + id,

        { coluna: novaColuna },
      );

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
  
    const confirmado = window.confirm(
      "Tem certeza que deseja deletar esta tarefa?",
    );

    if (!confirmado) return;

    try {
      await axios.delete(URL_API + "/" + id);

      setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
    } catch (e) {
      setErro("Erro ao deletar tarefa. Tente novamente.");

      console.error(e);
    }
  }


  return (
    <div className="container">
      <Sidebar />
      {carregando && (
        <p style={{ textAlign: "center", color: "#94A3B8" }}>
          Carregando tarefas...
        </p>
      )}

      {erro && <p style={{ textAlign: "center", color: "#EF4444" }}>{erro}</p>}

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
