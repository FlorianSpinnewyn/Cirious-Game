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
const Personne = require('./back/models/Personne.js');
const Mairie = require('./back/models/Mairie.js');
const Kiosque = require('./back/models/Kiosque.js');
const Technicentre = require('./back/models/Technicentre.js');
const Parking = require('./back/models/Parking.js');
const Garage = require('./back/models/Garage.js');
const Atelier = require('./back/models/Atelier.js');
const City = require('./back/models/city.js');
const Level = require('./back/models/level.js');
const StationsMetro = require('./back/models/StationsMetro.js');
const StationsVelo = require('./back/models/StationsVelo.js');
const Gare = require('./back/models/gare.js');
const Transport = require('./back/models/Transport.js');
const Train = require('./back/models/Train.js');
const Velo = require('./back/models/Velo.js');
const Metro = require('./back/models/Metro.js');
const Pied = require('./back/models/Pied.js');
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
let kiosque = new Kiosque();
let technicentre = new Technicentre();
let parking = new Parking();
let garage = new Garage();
let atelier = new Atelier();
let gare = new Gare();
let stationsMetro = new StationsMetro();
let stationsVelo = new StationsVelo();

let city = new City(mairie,kiosque,technicentre, parking, garage, atelier, gare, stationsMetro, stationsVelo);

let personnes = [];
for(let i = 0; i < 3; ++i)
{
    let personne = new Personne();
    let rand = Math.floor(Math.random() * 7 + 2);
    function destination(result)
    {
        personne.setDestination(result[0].batiment);
        personnes.push(personne);
    }
    baseDeDonnees.select("SELECT * FROM city WHERE idcity='" + rand + "'", destination);
}

let myLevel = new Level(city, personnes);

io.on('connection', (socket) =>
{
    
    /**------------Initialisation des niveaux-----------**/
    socket.on("initialisationLevel", (numeroLevel) => {
        mylevel.reset();
        myLevel.InitalisationLevel(numeroLevel);

        socket.emit("initialisationViewLevel", myLevel.numLevel);
    });


    /** Affichage plusieurs boutons de personnes **/
    socket.emit("boutonsPersonnes", myLevel.personnes);

    
    /**------------Requete des pannes-----------**/
    socket.on("MiseAJour", () => {
        
        if(myLevel.city.mairie.panneMetro == false)
        {
            myLevel.city.mairie.evenementMetro();
        }
        if(myLevel.city.mairie.panneTrain == false)
        {
            myLevel.city.mairie.evenementTrain();
        }
        if(myLevel.city.mairie.manqueVelo == false)
        {
            myLevel.city.mairie.evenementVelo();
        }
        if(myLevel.city.mairie.embouteillage == false)
        {
            myLevel.city.mairie.evenementEmbouteillage();
        }

        if(!myLevel.city.kiosque.score)
        {
            myLevel.city.kiosque.recupScore();
        }
        if(!myLevel.city.kiosque.prochainObjectif)
        {
            myLevel.city.kiosque.recupProchainObjectif();
        }
        if(!myLevel.city.kiosque.badgeDebloque)
        {
            myLevel.city.kiosque.recupBadgeDebloque();
        }
    });

    socket.on("mairie", () => 
    {
        let metro = false;
        let train = false;
        let velo = false;
        let voiture = false;
        if(myLevel.city.mairie.panneMetro)
        {
            metro = true;
        }
        if(myLevel.city.mairie.panneTrain)
        {
            train = true;
        }
        if(myLevel.city.mairie.manqueVelo)
        {
            velo = true;
        }
        if(myLevel.city.mairie.embouteillage)
        {
            voiture = true;
        }
        socket.emit("afficheEvenement", metro, train, velo, voiture);
    });

    socket.on("kiosque", () => 
    {
        let score = 0;
        let prochainObjectif = '';
        let badgeDebloque = [];
        if(kiosque.score != 0)
        {
            score = myLevel.city.kiosque.recupScore();
        }
        if(myLevel.city.kiosque.prochainObjectif.length > 0)
        {
            prochainObjectif = myLevel.city.kiosque.recupProchainObjectif();
        }
        if(myLevel.city.kiosque.BadgeDebloque != [])
        {
            badgeDebloque = myLevel.city.kiosque.recupBadgeDebloque();
        }
        socket.emit("afficheActualite", score, prochainObjectif, badgeDebloque);
    });

    /*** Technicentre ***/
    socket.on("technicentre", () => 
    {
        if(myLevel.city.mairie.panneTrain == true && myLevel.city.technicentre.repare == false)
        {
            socket.emit("RepTrain");
        }
        else
        {
            socket.emit("pasRepTrain");
        }
    });

    socket.on("trainRepare", () => 
    {
        myLevel.city.technicentre.evenementRepare();
        myLevel.city.mairie.panneTrain = false;
    });

     /*** Parking ***/
    socket.on("parking", () => {
        if(myLevel.city.mairie.embouteillage == true && myLevel.city.parking.repare == false)
        {
            socket.emit("Embouteillage");
        }
        else
        {
            socket.emit("noEmbouteillage");
        }
    });

    socket.on("traficFluide", () => 
    {
        myLevel.city.parking.evenementRepare();
        myLevel.city.mairie.embouteillage = false;
    });

    /*** Garage ***/
    socket.on("garage", () => {
        if(myLevel.city.mairie.manqueVelo == true && myLevel.city.garage.repare == false)
        {
            socket.emit("probVelo");
        }
        else
        {
            socket.emit("noProbVelo");
        }
    });

    socket.on("stockRempli", () => {
        myLevel.city.garage.evenementRepare();
        myLevel.city.mairie.manqueVelo = false;
    });

    /*** Atelier ***/
    socket.on("atelier", () => {
        if(myLevel.city.mairie.panneMetro == true && myLevel.city.atelier.repare == false)
        {
            socket.emit("probMetro");
        }
        else
        {
            socket.emit("noProbMetro");
        }
    });

    socket.on("metroRepare", () => {
        myLevel.city.atelier.evenementRepare();
        myLevel.city.mairie.panneMetro = false;
    });
    
    /*** Gare ***/
    socket.on("gare", () => {
        //on devra récupérer dans combien de temps est le prochain train
        let temps = 10;
        socket.emit("prochainTrain", temps);  
    });
    
    
    socket.on("metro", () => {
        //on devra récupérer dans combien de temps est le prochain métro
        let temps = 20;
        socket.emit("prochainMetro", temps);
    });

    socket.on("velo", () => {
        //on devra récupérer le nombre de vélos
        let nombreV = 18;
        socket.emit("nombreVelo", nombreV);
    });  

    /*** Personne ****/
    socket.on("CliquePersonne", (idPersonne) => 
    {
        socket.emit("AfficheDestination", myLevel.personnes[idPersonne].destination);
    });

    socket.on("SupprimePersonne", numberPersonne =>
    {
        myLevel.personnes.splice(numberPersonne, 1, undefined);
        console.log(myLevel.personnes);
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

/*function test(result)
{
    let depart;
    let orientation;

/*function test(result)
{
    let depart;
    let orientation;

/*function test(result)
{
    let depart;
    let orientation;

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