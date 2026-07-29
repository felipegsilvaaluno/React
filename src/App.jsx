import './App.css';
import Filtros from './Componentes/Filtros/Filtros';
import Footer from './Componentes/Footer/Footer';
import Formulario from './Componentes/Formulario/Formulario';
import ListaTarefas from './Componentes/Formulario/ListaTarefas';
import Header from './Componentes/Header/Header';

function App() {
const TarefasDaLista = [
  { id: "1", titulo: "ti", concluida: false, Prioridade: "media" },
  { id: "2", titulo: "ta", concluida: false, Prioridade: "media" },
  { id: "3", titulo: "tu", concluida: false, Prioridade: "alta" },
  { id: "4", titulo: "te", concluida: true, Prioridade: "alta" },
];

  return (
    <div id="app">
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" />
      <main>
        <Filtros />
        <Formulario />
        <section id="bloco-tarefas">
        <ListaTarefas tarefas={TarefasDaLista} />          
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
