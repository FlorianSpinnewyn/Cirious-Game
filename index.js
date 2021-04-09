// Import des librairies NPM
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require("express-session")(
{
  secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
  resave: true,
  saveUninitialized: true,
  cookie:
  {
    maxAge: 2 * 60 * 60 * 1000,
    secure: false
  }                           
});
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const { emit } = require('process');
const { Socket } = require('dgram');
const Mairie = require('./back/models/Mairie.js');
const Kiosque = require('./back/models/Kiosque.js');
const baseDeDonnees = require('./back/modules/baseDeDonnees.js');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Initialisation d'Express, pour pointer vers nos accès (lien)
app.use(express.static(__dirname + '/front/'));
app.use(session);
app.use(urlencodedParser);

io.use(sharedsession(session,
{
    // Session automatiquement sauvegardée en cas de modification
    autoSave: true
}));

if (app.get('env') === 'production')
{
  app.set('trust proxy', 1)
  session.cookie.secure = true
}

// Initialisation d'Express, pour pointer vers nos accès (lien)
app.use(express.static(__dirname + '/front/'));
app.use(session);

app.get('/', (req, res) =>
{
  let sessionData = req.session;

  // Si l'utilisateur n'est pas connecté
  if (!sessionData.username)
  {
    res.sendFile(__dirname + '/front/test.html');
  }
  else
  {
    res.sendFile(__dirname + '/front/test.html');
  }
});

let mairie = new Mairie();

io.on('connection', (socket) =>
{
    if(!mairie.panneMetro)
    {
        mairie.evenementMetro();
    }
    if(!mairie.panneTrain)
    {
        mairie.evenementTrain();
    }
    if(!mairie.manqueVelo)
    {
        mairie.evenementVelo();
    }
    if(!mairie.embouteillage)
    {
        mairie.evenementEmbouteillage();
    }

    socket.on("mairie", () => 
    {
        let metro = false;
        let train = false;
        let velo = false;
        let voiture = false;
        if(mairie.panneMetro)
        {
            metro = true;
        }
        if(mairie.panneTrain)
        {
            train = true;
        }
        if(mairie.manqueVelo)
        {
            velo = true;
        }
        if(mairie.embouteillage)
        {
            voiture = true;
        }
        socket.emit("afficheEvenement", metro, train, velo, voiture);
    });
    
});

let kiosque = new Kiosque;
io.on('connection', (socket) =>
{
    if(!kiosque.score)
    {
        kiosque.recupScore();
    }
    if(!kiosque.prochainObjectif)
    {
        kiosque.recupProchainObjectif();
    }
    if(!kiosque.badgeDebloque)
    {
        kiosque.recupBadgeDebloque();
    }

    socket.on("kiosque", () => 
    {
        let score = 0;
        let prochainObjectif = '';
        let badgeDebloque = [];
        if(kiosque.score != 0)
        {
            score = kiosque.recupScore();
        }
        if(kiosque.prochainObjectif.length > 0)
        {
            prochainObjectif = kiosque.recupProchainObjectif();
        }
        if(kiosque.BadgeDebloque != [])
        {
            badgeDebloque = kiosque.recupBadgeDebloque();
        }
        socket.emit("afficheActualite", score, prochainObjectif, badgeDebloque);
    });
    
});

http.listen(4235, () =>
{
  console.log('Serveur lancé sur le port 4235');
});

/*function test(result)
{
    let depart;
    let orientation;
    let batiment;
    let transport;
    let time;
    let classement;
    for(let i = 0; i < result.length; ++i)
    {
        depart = result[i].depart.split('.');
        switch(depart[2]) 
        {
            case 'N': orientation = "nord";
                break;
            case 'O': orientation = "ouest";
                break;
            case 'E': orientation = "est";
                break;
            case 'S': orientation = "sud";
                break;

        }
        time = result[i].time;

        function getBatiment(result2)
        {
            if(result2[0].batiment == "Ecole")
            {
                batiment = "à l'" + result2[0].batiment + ".";
            }
            else if(result2[0].batiment == "Campagne")
            {
                batiment = "à la " + result2[0].batiment + ".";
            }
            else
            {
                batiment = "au " + result2[0].batiment + ".";
            }
            function recupTransport(result3)
            {
                if(result3[0].type == "pied")
                {
                    transport = "y va à pied";
                }
                else
                {
                    transport = "prend le " + result3[0].type;
                }
                switch(result[i].class)
                {
                    case 1: classement="meilleure";
                        break;
                    case 2: classement="deuxième";
                        break;
                    case 3: classement="troisième";
                        break;
                    case 4: classement="pire";
                        break;
                } 
                time = result[i].time

                console.log("Une personne part du trottoir", orientation,"à la ligne", depart[0], "et colonne", depart[1], "et veut aller", batiment, "S'il", transport ,"c'est la", classement, "solution, car il mettra", time, "minutes.");
            }  
            baseDeDonnees.select("SELECT * FROM transport WHERE idtransport='"+ result[i].idtransport +"'", recupTransport);

        }  
        baseDeDonnees.select("SELECT * FROM city WHERE idcity='"+ result[i].idcity + "'", getBatiment);
    }
 
}
baseDeDonnees.select("SELECT * FROM move WHERE depart='0.7.N' AND idcity='8'", test);*/



