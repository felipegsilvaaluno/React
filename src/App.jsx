import MiniKanban from "./MiniKanban/MiniKanban";

function App() {

  //ESSE DA ERRO
  const minhaPremise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const operacaoDeuCerto = true;

      if (operacaoDeuCerto) {
        resolve("Dados chegaram!");
      } else {
        reject("Algo deu errado!");
      }
    }, 4000);
  });

  //ESSE NÃO DA ERRO

  function execPromise() {
    const minhaPremise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const operacaoDeuCerto = true;

        if (operacaoDeuCerto) {
          resolve("Dados chegaram!");
        } else {
          reject("Algo deu errado!");
        }
      }, 4000);
    });
    minhaPremise
      .then((mensagem) => {
        console.log("Sucesso:", mensagem);
      })
      .catch((erro) => {
        console.error("erro: ", erro);
      });
    console.log("Promisso criado, aguardando resultado...");
  }

  return (
    <div>
      <button
        onClick={() => {
          minhaPremise
            .then((mensagem) => {
              console.log("Sucesso:", mensagem);
            })
            .catch((erro) => {
              console.error("erro: ", erro);
            });
          console.log("Promisso criado, aguardando resultado...");
        }}
      >
        Testa promise
      </button>

      <button onClick={execPromise}>segundo botão</button>

      <MiniKanban/>
    </div>
  );
}
export default App;
