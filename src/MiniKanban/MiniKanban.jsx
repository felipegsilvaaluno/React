import { useState, useEffect } from "react";
//import axios from "axios";
import FormularioTarefa from "./FormularioTarefa";
import Footer from "../Componentes/Footer/Footer";
import "./Minikanban.css";
import Sidebar from "../Componentes/Sidebar/Sidebar";
import api from "../api/api";

// const URL_API = "https://6a85b2a29c451dc67a63fe42.mockapi.io/api/tarefas";

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
        // api.get — token injetado automaticamente pelo interceptor
        const resposta = await api.get("/tarefas");
        setTarefas(resposta.data);
      } catch (e) {
        setErro("Erro ao carregar tarefas. Verifique a conexão.");
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, []);

  // POST - criar tarefa
  async function salvarTarefa(dados) {
    if (dados.id === undefined) {
      // CRIAR — POST /tarefas
      try {
        const resposta = await api.post('/tarefas', dados);
        // id real vem do servidor — não mais de um contador local
        setTarefas([...tarefas, resposta.data]);
      } catch (err) {
        setErro('Erro ao criar tarefa.');
      }
    } else {
      // EDITAR — PUT /tarefas/:id
      try {
        const resposta = await api.put(`/tarefas/${dados.id}`, dados);
        // usar resposta.data garante que o estado reflete o servidor
        setTarefas(tarefas.map(t =>
          t.id === dados.id ? resposta.data : t
        ));
      } catch (err) {
        setErro('Erro ao editar tarefa.');
      }
    }
  }

  async function deletarTarefa(id) {
    try {
      await api.delete(`/tarefas/${id}`);
      // só remove do estado após confirmar no servidor
      setTarefas(tarefas.filter(t => t.id !== id));
    } catch (err) {
      setErro('Erro ao deletar tarefa.');
    }
  }
  // MOVER — PUT /tarefas/:id com nova coluna
  async function moverTarefa(id, novaColuna) {
    const resposta = await api.put(
      `/tarefas/${id}`,
      { coluna: novaColuna }
    );
    setTarefas(tarefas.map(t => t.id === id ? resposta.data : t));
  }

  // PATCH/PUT - mover tarefa
  // async function moverTarefa(id, novaColuna) {
  //   try {

  //     const { data: tarefaMovida } = await axios.put(
  //       URL_API + "/" + id,

  //       { coluna: novaColuna },
  //     );

  //     setTarefas((tarefasAtuais) =>
  //       tarefasAtuais.map((t) => (t.id === id ? tarefaMovida : t)),
  //     );
  //   } catch (e) {
  //     setErro("Erro ao mover tarefa. Tente novamente.");

  //     console.error(e);
  //   }
  // }

  // // DELETE - remover tarefa
  // async function deletarTarefa(id) {

  //   const confirmado = window.confirm(
  //     "Tem certeza que deseja deletar esta tarefa?",
  //   );

  //   if (!confirmado) return;

  //   try {
  //     await axios.delete(URL_API + "/" + id);

  //     setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
  //   } catch (e) {
  //     setErro("Erro ao deletar tarefa. Tente novamente.");

  //     console.error(e);
  //   }
  // }


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
