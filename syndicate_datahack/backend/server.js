const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // Assuming you're using axios to communicate with your LLM

const app = express();
app.use(cors());
app.use(bodyParser.json());

const generateSQL = async (prompt) => {
    const response = await axios.post('https://api.googleapis.com/v1/gemini/generate', {
        prompt: `Generate an SQL query for: ${prompt}`,
    }, {
        headers: {
            'Authorization': `Bearer AIzaSyD9HiJ3ntkhWbPIXl_vNz7f3hOTBI-ZFOE`,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

app.post('/generate-query', async (req, res) => {
    try {
        const { prompt } = req.body;
        const sqlQuery = await generateSQL(prompt);
        res.json({ query: sqlQuery });
    } catch (error) {
        res.status(500).json({ error: 'Error generating SQL query' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
