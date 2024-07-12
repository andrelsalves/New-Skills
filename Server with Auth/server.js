const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const passport = require("./src/config/passport");

const users = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Rota de registro
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('Por favor, forneça nome, email e senha');
        }

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).send('Email ja registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: hashedPassword,
        };
        users.push(newUser);
        console.log('Usuário registrado:', newUser);
        res.redirect("/");

    } catch (e) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para a página index
app.get("/", (req, res) => {
    res.render("index", { users });
});

// Outras rotas
app.get("/signIn", (req, res) => {
    res.render("signIn", { users });
});

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

