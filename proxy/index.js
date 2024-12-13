import express from "express";
import axios from "axios"; // Usando axios no lugar de request
import { URL } from "url"; // Para validação de URL
const app = express();

app.use(express.json());

// Configuração de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "post");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Proxy rodando!");
});

// Proxy para fazer o encaminhamento
app.post("/proxy", async (req, res) => {
  console.log("Requisição recebida no proxy");
  console.log(req.body);

  try {
    const reqURL = req.body.url;

    // Verifica se a URL foi enviada
    if (!reqURL) {
      return res.status(400).send("A URL é obrigatória no corpo da requisição.");
    }

    const url = decodeURIComponent(reqURL);

    console.log("URL recebida para proxy:", url);

    // Valida a URL
    new URL(url);

    // Faz a requisição com Axios
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Requisição para a URL bem-sucedida.");

    // Envia a resposta do servidor de destino para o cliente
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Erro no proxy:", error.message);
    res.status(500).send(`Erro no proxy: ${error.message}`);
  }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => console.log("Proxy rodando na porta 3000"));
