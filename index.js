const path = require('path');
const express = require('express');
const apiRoutes = require('./routers/app.routers');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/api', apiRoutes);

app.use('*', (req, res) =>{
    res.status(404).send(`error: ruta ${req.url} metodo ${req.method} no autorizado`);
});
const connectedServer = app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});
  
connectedServer.on('error', (error) => {
    console.error('Error: ', error);
});