import './App.css';
import Filtros from './Componentes/Filtros/Filtros';
import Footer from './Componentes/Footer/Footer';
import Formulario from './Componentes/Formulario/Formulario';
import ListaTarefas from './Componentes/Formulario/ListaTarefas';
import Header from './Componentes/Header/Header';

function App() {
  return (
    <div id="app">
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" />
      <main>
        <Filtros />
        <Formulario />
        <section id="bloco-tarefas">
          <ul id="lista-tarefas">
            <ListaTarefas
              texto="Estudar css"
              concluida={true}
              prioridade="media"
            />
            <ListaTarefas
              texto="Fazer as atividades pendentes"
              concluida={false}
              prioridade="media"
            />
            <ListaTarefas
              texto="Estudar React"
              concluida={true}
              prioridade="media"
            />
          </ul>
          <p id="msg-vazia" className='msg-vazia hidden'>Nenhuma tarefa aqui ainda</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
