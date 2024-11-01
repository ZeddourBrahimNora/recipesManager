// Création serveur Express + inclusion des routes
const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes')

const app = express(); // crée l'app avec l'obj express
const PORT = 5000

app.use(bodyParser.json()); // specifier qu'on va utiliser des données en json
app.use('/api', recipeRoutes);

app.use(express.static('public')); // charger tout les fichiers dans public

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));