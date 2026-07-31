import "./App.css";
import Filtros from "./Componentes/Filtros/Filtros";
import Footer from "./Componentes/Footer/Footer";
import Contador from "./Componentes/Formulario/Contador";
import { useState } from "react";
import ListaTarefas from "./Componentes/Formulario/ListaTarefas";
import Header from "./Componentes/Header/Header";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [proximoId, setProximoId] = useState(1);
  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  function adicionarTarefa() {
    if (texto.trim() === "") return;

    const nova = {
      id: proximoId,
      titulo: texto.trim(),
      concluida: false,
      prioridade: prioridade,
    };

    setTarefas([...tarefas, nova]); // adiciona ao array
    setProximoId(proximoId + 1); // incrementa o id
    setTexto(""); // limpa o campo
    setPrioridade("media"); // reseta a prioridade para o padrão
  }

  // Função de deletar tarefa
  function deletarTarefa(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  // Função de concluir/desconcluir tarefa adicionada
  function concluirTarefa(id) {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    );
  }

  return (
    <div id="app">
      <Contador />
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" />
      <main>
        <Filtros />
        <section className="container">
          <form className="formulario-tarefa">
            <label htmlFor="titulo">Adicione a Tarefa</label>

            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
              placeholder="Nova tarefa..."
            />

            <label htmlFor="prioridade">Prioridade:</label>

            <select
              id="prioridade"
              name="prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>

            <button
              className="btn-adicionar"
              type="button"
              onClick={adicionarTarefa}
            >
              Adicionar tarefa
            </button>
          </form>
        </section>
        <section id="bloco-tarefas">
          <ListaTarefas
            tarefas={tarefas}
            onDeletar={deletarTarefa}
            onConcluir={concluirTarefa}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
