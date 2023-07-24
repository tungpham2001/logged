const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
}));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/foods/search', async (req, res) => {
    try {
      const query = req.query.query;
      const response = await axios.get('http://platform.fatsecret.com/rest/server.api', {
        params: {
          method: 'foods.search',
          format: 'json',
          //oauth_consumer_key: process.env.FATSECRET_API_KEY,
          oauth_consumer_key: "d3e2774938b747aebe25af9cda290010",
          oauth_signature_method: 'HMAC-SHA1',
          oauth_timestamp: Math.floor(Date.now() / 1000),
          oauth_nonce: Math.random().toString(36).substring(2),
          oauth_version: '1.0',
          search_expression: query
        }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});