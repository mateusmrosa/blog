const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const connection = require("./database/database");

//importa os controllers
const categoriesController = require("./categories/categoriesController");
const articlesController =  require("./articles/ArticlesController");

//importa os models
const Article = require("./articles/Article");
const Category = require("./categories/Category");

//view engine
app.set('view engine', 'ejs');

//arquivos estaticos estão na pasta public
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com banco de dados realizada com sucesso!")
    }).catch((error) => {
        console.log(error)
    })

app.get('/', (req, res) => {
    res.render("index")
})

//rotas
app.use("/",  categoriesController);
app.use("/", articlesController);

//

app.listen(3000, () => {
    console.log(`O servidor esta rodando em http://localhost:3000`)
})