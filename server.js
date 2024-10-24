const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI(process.env.API_GOOGLE);

app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "vc é um chatbot de um site educacional seu objetivo é auxiliar alunos em suas duvidas sobre diversos assuntos"
    });

    const result = await model.generateContent(question);
    res.json({ response: result.response.text() });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
