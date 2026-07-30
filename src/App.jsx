import "./App.css";
import Filtros from "./Componentes/Filtros/Filtros";
import Footer from "./Componentes/Footer/Footer";
import Contador from "./Componentes/Formulario/Contador";
import { useState } from "react";
import ListaTarefas from "./Componentes/Formulario/ListaTarefas";
import Header from "./Componentes/Header/Header";

function App() {

  // Estado — substitui o array fixo do Dia 3
  const [tarefas, setTarefas] = useState([]);
  const [proximoId, setProximoId] = useState(1);
  const [texto, setTexto] = useState("");

  // Funcao que adiciona nova tarefa ao estado
  function adicionarTarefa() {
    if (texto.trim() === "") return; // validacao
    const nova = {
      id: proximoId,
      titulo: texto.trim(),
      concluida: false,
      prioridade: "media",
    };
    setTarefas([...tarefas, nova]); // adiciona ao array
    setProximoId(proximoId + 1); // incrementa o id
    setTexto(""); // limpa o campo
  }

  {/*const TarefasDaLista = [
    { id: "1", titulo: "ti", concluida: false, prioridade: "media" },
    { id: "2", titulo: "ta", concluida: false, prioridade: "media" },
    { id: "3", titulo: "tu", concluida: false, prioridade: "alta" },
    { id: "4", titulo: "te", concluida: true, prioridade: "alta" },
  ];*/}

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

            <select id="prioridade" name="prioridade">
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
          <ListaTarefas tarefas={tarefas} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
