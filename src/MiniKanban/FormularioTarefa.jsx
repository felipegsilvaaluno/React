import { useState } from "react";
import ColunaKanban from "./ColunaKanban";
import Header from "../Componentes/Header/Header";
import axios from "axios";

const COLUNAS = [
  { id: "afazer", titulo: "A Fazer" },
  { id: "andamento", titulo: "Andamento" },
  { id: "concluido", titulo: "Concluído" },
];

function FormularioTarefa({ tarefas, setTarefas, moverTarefa, removerTarefa }) {
  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [cep, setCep] = useState("");

  async function Enviar(e) {
    e.preventDefault();
    if (!texto.trim() || !cep.trim()){
      alert("Por favor, preencha tanto a tarefa quanto o CEP.");
      return;
    }

    let enderecoEncontrado = "";

    // Tenta buscar o endereço pelo CEP
    if (cep.trim()) {
      try {
        const resposta = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`,
        );
        if (!resposta.data.erro) {
          enderecoEncontrado = `${resposta.data.localidade} - ${resposta.data.uf}`;
        } else {
          enderecoEncontrado = "CEP não encontrado";
        }
      } catch (erro) {
        console.error("Erro ao carregar o CEP:", erro);
        enderecoEncontrado = "Erro ao buscar endereço";
      }
    }

    const novaTarefa = {
      id: Date.now(),
      texto: texto.trim(),
      concluida: false,
      coluna: "afazer",
      prioridade: prioridade,
      endereco: enderecoEncontrado, 
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto("");
    setCep("");
    setPrioridade("media");
  }

  const apenasNumeros = (setter) => (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setter(valor);
  };

  return (
    <div>
      <Header titulo="TaskFlow - Mini Kanban" />

      <form onSubmit={Enviar} className="form-tarefa">
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <input
          type="text"
          maxLength={8}
          value={cep}
          onChange={apenasNumeros(setCep)}
          placeholder="Digite o CEP"
        />
        <button type="submit">Adicionar</button>

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
      </form>

      <div className="kanban-board">
        {COLUNAS.map((col) => (
          <ColunaKanban
            key={col.id}
            titulo={col.titulo}
            chaveColuna={col.id}
            tarefas={tarefas}
            onMover={moverTarefa}
            onRemover={removerTarefa}
          />
        ))}
      </div>
    </div>
  );
}

export default FormularioTarefa;
