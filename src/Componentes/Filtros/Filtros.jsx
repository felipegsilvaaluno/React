function Filtros(){
    return (
      <section id="painel-filtros">
        <div className="filtros">
          <span className="filtro" id="contador ativo" data-filtro="todas">
            Todas (<span id="qtd-todas">0</span>)
          </span>
          <span id="contador" data-filtro="pendentes">
            Pendentes (<span id="qtd-pendentes">0</span>)
          </span>
          <span id="contador" data-filtro="concluidas">
            Concluídas (<span id="qtd-concluidas">0</span>)
          </span>
        </div>
      </section>
    );
}
export default Filtros;