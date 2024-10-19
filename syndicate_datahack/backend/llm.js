const axios = require('axios');

const generateSQL = async (prompt) => {
    const response = await axios.post('AIzaSyD9HiJ3ntkhWbPIXl_vNz7f3hOTBI-ZFOE', {
        prompt: `Generate an SQL query for: ${prompt}`,
        // Add any other necessary parameters
    }, {
        headers: {
            'Authorization': `Bearer AIzaSyD9HiJ3ntkhWbPIXl_vNz7f3hOTBI-ZFOE`
        }
    });
    return response.data;
};

module.exports = { generateSQL };
