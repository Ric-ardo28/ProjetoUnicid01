import { GoogleGenerativeAI } from '@google/generative-ai';

// Instancia a API com a chave (certifique-se de configurá-la corretamente)
const genAI = new GoogleGenerativeAI(process.env.API_GOOGLE);

// Função para enviar a pergunta e obter a resposta
async function enviarPergunta(pergunta) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: 'Você é um chatbot "Edu" de um site educacional seu objetivo é auxiliar alunos em suas dúvidas sobre diversos assuntos.'
  });

  try {
    const result = await model.generateContent({ prompt: pergunta });
    return result.candidates[0].content; // Resposta do modelo
  } catch (error) {
    console.error('Erro ao gerar resposta:', error);
    return 'Erro ao gerar resposta. Tente novamente.';
  }
}

// Função para atualizar a interface com a resposta
function atualizarResposta(texto) {
  const respostaDiv = document.getElementById('resposta');
  respostaDiv.innerHTML = `<p>${texto}</p>`;
}

// Função para enviar pergunta ao clicar no botão
document.getElementById('enviar').addEventListener('click', async () => {
  const perguntaInput = document.getElementById('input');
  const pergunta = perguntaInput.value;

  if (pergunta.trim() !== '') {
    // Exibe mensagem de carregamento enquanto aguarda a resposta
    atualizarResposta('Aguarde, estou pensando...');

    // Envia a pergunta para a API e obtém a resposta
    const resposta = await enviarPergunta(pergunta);

    // Atualiza o campo de resposta com o retorno da API
    atualizarResposta(resposta);

    // Limpa o campo de input após o envio
    perguntaInput.value = '';
  } else {
    atualizarResposta('Por favor, digite uma pergunta.');
  }
});

// Permitir que a tecla "Enter" também envie a pergunta
document.getElementById('input').addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    document.getElementById('enviar').click();
  }
});

// Função para limpar a resposta
function limparResposta() {
  const respostaDiv = document.getElementById('resposta');
  respostaDiv.innerHTML = ''; // Limpa o conteúdo da div de resposta
}
