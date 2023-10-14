const express = require('express');
const fs = require('fs');
const readline = require('readline');

// initialize express
const app = express();

// define route handler for 'GET /lines/<line index>' endpoint
app.get('/lines/:index', (req, res) => {
  
});
