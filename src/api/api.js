import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(

  (resposta) => resposta,

  (erro) => {
    // O 401 do PRÓPRIO login é "senha errada":
    // deixa o login.jsx tratar
    const ehLogin =

      erro.config?.url?.includes('/auth/login');

    if (erro.response?.status === 401 && !ehLogin) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(erro);
  },
);

export function mensagensDeErro(erro) {

  const dados = erro.response?.data?.erro;

  // Sem resposta: API fora, URL errada, CORS, timeout

  if (!dados) {

    return ['Não foi possível conectar à API.'];

  }

  // 400 da validação: uma mensagem por campo

  if (dados.detalhes) return dados.detalhes;

  // Demais erros (404, 500...): a mensagem geral

  return [dados.mensagem];
}

export default api;
