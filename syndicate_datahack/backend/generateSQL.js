require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Import node-fetch

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Your generateSQL function
const generateSQL = async (prompt) => {
    try {
        console.log('Starting SQL generation for prompt:', prompt);

        if (!prompt || prompt.length < 10) {
            console.warn('Prompt validation failed:', prompt);
            throw new Error("Please provide a more detailed prompt.");
        }

        const response = await fetch('http://localhost:11434/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama',
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
        return sqlQuery;
    } catch (error) {
        console.error('Error generating SQL:', error);
        throw new Error(`Error generating SQL query: ${error.message}`);
    }
};

// Endpoint to handle SQL generation
app.post('/generate-query', async (req, res) => {
    const { prompt } = req.body;

    console.log('Received prompt:', prompt);

    try {
        const sqlQuery = await generateSQL(prompt);
        console.log('Generated SQL Query:', sqlQuery);
        res.json({ query: sqlQuery });
    } catch (error) {
        console.error('Error in /generate-query:', error);
        res.status(500).json({ error: `Error generating SQL query: ${error.message}` });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
