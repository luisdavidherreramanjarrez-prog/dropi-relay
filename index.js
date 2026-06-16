const express = require('express');
const app = express();
app.use(express.json());

const DROPI_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBwLmRyb3BpLmNvOjgwIiwiaWF0IjoxNzgxNTUwNDM1LCJleHAiOjQ5MzcyMjQwMzUsIm5iZiI6MTc4MTU1MDQzNSwianRpIjoidXFuMVFwbnRhOXlMU01vNiIsInN1YiI6IjkyMzk4OSIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJhdWQiOiJEcm9wUGFnZSIsInRva2VuX3R5cGUiOiJJTlRFR1JBVElPTlMiLCJ3Yl9pZCI6MSwiaW50ZWdyYXRpb25fdHlwZSI6IkRyb3BQYWdlIiwiaW50ZWdyYXRpb25fdHlwZV9pZCI6MTA0NywiaXBfdXJsIjpbeyJ1cmwiOiJlc3RyYXRlZ2FzaWEuY29tIiwiaXAiOm51bGx9LHsidXJsIjpudWxsLCJpcCI6IjIwOC43Ny4yNDQuMTUifSx7InVybCI6Imh0dHBzOi8vc2hvcGllc3RyYXRlZ2FzLXByb2R1Y3Rpb24udXAucmFpbHdheS5hcHAiLCJpcCI6bnVsbH1dLCJpbnRlZ3JhdGlvbl91cmwiOiIifQ.yNoy-wNADXRDrtyzAIlCIGXZabhckS7TMgCfojN_dVo';

app.post('/order', async (req, res) => {
  try {
    const response = await fetch('https://api.dropi.co/integrations/orders/myorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'dropi-integration-key': DROPI_TOKEN,
        'Referer': 'https://shopiestrategas-production.up.railway.app',
        'Origin': 'https://shopiestrategas-production.up.railway.app'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const WOO_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBwLmRyb3BpLmNvOjgwIiwiaWF0IjoxNzgxNjIwODQ5LCJleHAiOjQ5MzcyOTQ0NDksIm5iZiI6MTc4MTYyMDg0OSwianRpIjoibVQyWlg5OFdvWERwaDVkbyIsInN1YiI6IjkyMzk4OSIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJhdWQiOiJXT09DT01FUkNFIiwidG9rZW5fdHlwZSI6IklOVEVHUkFUSU9OUyIsIndiX2lkIjoxLCJpbnRlZ3JhdGlvbl90eXBlIjoiV09PQ09NRVJDRSIsImludGVncmF0aW9uX3R5cGVfaWQiOjEsImlwX3VybCI6W10sImludGVncmF0aW9uX3VybCI6Imx1aXNkYXZpZDEuYXBwLm44bi5jbG91ZCJ9.XyZGtBojm00yHe-_qYVcNRbvyNqkU4TffQpdFVQ5LRc';

// Endpoint de prueba con token WooCommerce
app.post('/order-woo', async (req, res) => {
  try {
    const response = await fetch('https://api.dropi.co/integrations/orders/myorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'dropi-integration-key': WOO_TOKEN,
        'Referer': 'https://luisdavid1.app.n8n.cloud',
        'Origin': 'https://luisdavid1.app.n8n.cloud'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Proxy para explorar la API de Dropi: GET /dropi/any/path
app.get('/dropi/*', async (req, res) => {
  const path = req.params[0];
  const qs = new URLSearchParams(req.query).toString();
  const url = `https://api.dropi.co/${path}${qs ? '?' + qs : ''}`;
  try {
    const response = await fetch(url, {
      headers: {
        'dropi-integration-key': DROPI_TOKEN,
        'Referer': 'https://shopiestrategas-production.up.railway.app',
        'Origin': 'https://shopiestrategas-production.up.railway.app'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Dropi relay running'));
