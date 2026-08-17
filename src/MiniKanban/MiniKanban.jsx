import { useState, useEffect } from "react";
import FormularioTarefa from "./FormularioTarefa";
import Footer from "../Componentes/Footer/Footer";
import "./Minikanban.css";
import Sidebar from "../Componentes/Sidebar/Sidebar";

function MiniKanban() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("taskflow_kanban");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskflow_kanban", JSON.stringify(tarefas));
  }, [tarefas]);

  function moverTarefa(id, novaColuna) {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, coluna: novaColuna } : t)),
    );
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  return (
    <div className="container">
      <Sidebar />
      <FormularioTarefa
        tarefas={tarefas}
        setTarefas={setTarefas}
        moverTarefa={moverTarefa}
        removerTarefa={removerTarefa}
      />
      <Footer />
    </div>
  );
}

export default MiniKanban;
