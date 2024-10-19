const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Define endpoint for frontend to request SQL generation
app.post('/generate-query', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Make a POST request to the LLaMA API to generate an SQL query
        const response = await fetch('https://api.llama.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY', // Replace with your actual API key
            },
            body: JSON.stringify({
                model: 'sql',
                prompt: `Generate an SQL query for: ${prompt}`,
                max_tokens: 150, // Adjust as needed
                temperature: 0.7, // Adjust for randomness
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const sqlQuery = data.choices[0].text.trim(); // Adjust based on the response structure

        if (!sqlQuery) {
            throw new Error("The generated query is not valid.");
        }

        console.log('Successfully generated SQL query:', sqlQuery);
        res.json({ query: sqlQuery });
    } catch (error) {
        console.error('Error in /generate-query:', error);
        res.status(500).json({ error: `Error generating SQL query: ${error.message}` });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});