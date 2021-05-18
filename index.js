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
const StationMetro = require('./back/models/StationMetro.js');
const StationVelo = require('./back/models/StationVelo.js');
const Gare = require('./back/models/gare.js');
const Transport = require('./back/models/Transport.js');
const Train = require('./back/models/Train.js');
const Velo = require('./back/models/Velo.js');
const Metro = require('./back/models/Metro.js');
const Pied = require('./back/models/Pied.js');
const Game = require('./back/models/Game.js');
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

let myLevel = new Level();
let myGame = new Game();


io.on('connection', (socket) =>
{
    /**------------Initialisation du home---------------**/
    socket.on("initialisationPlay", () => {
        socket.emit("initialisationViewPlay", myGame.tabLevel);
    })
    /**------------Initialisation des niveaux-----------**/
    socket.on("initialisationLevel", (numeroLevel) => {
        if(socket.handshake.session.levelEnCours)
        {
            myLevel.reset();
        }
        socket.handshake.session.levelEnCours = true;

    //requête dans la base de données pour aller chercher le nombre de personnes dont on a besoin
        
        function findLevel(result4) {
            myLevel.initalisationLevel(numeroLevel,result4[0].nbPersonnes, result4[0].nbVoituresMax,result4[0].nbSecondsPersonne,result4[0].nbBadges,result4[0].nbEvenements,result4[0].pasContentMax,result4[0].pollutionMax);

            let personne = new Personne();
            for(let i = 0; i<myLevel.nbPersonnes;i++) {
                personne.reset();

                let rand1 = Math.floor(Math.random() * 7 + 2);
                switch (rand1)
                {
                    case 2 : personne.setDestination("Ecole");
                    break;
                    case 3 : personne.setDestination("Campagne");
                    break;
                    case 4 : personne.setDestination("Magasins");
                    break;
                    case 5 : personne.setDestination("Musee");
                    break;
                    case 6 : personne.setDestination("Parc");
                    break;
                    case 7 : personne.setDestination("Restaurant");
                    break;
                    case 8: personne.setDestination("Stade");
                    break;
                }
                let rand2 =Math.floor(Math.random() * 2);
                let rand3=0;
                if(rand2 == 0)
                {
                    rand3 =Math.floor(Math.random() * 2);
                    switch(rand3)
                    {
                        case 0 : rand3 = 7;
                        break;
                        case 1 : rand3 = 11;
                        break;
                    }
                }
                else
                {
                    rand3 = Math.floor(Math.random() * 3);
                    switch(rand3)
                    {
                        case 0 : rand3 = 7;
                        break;
                        case 1 : rand3 = 9;
                        break;
                        case 2 : rand3 = 11;
                        break;
                    }
                }
        
                let rand4 = Math.floor(Math.random() * 4);
                switch(rand4)
                {
                    case 0 : rand4 = "N";
                    break;
                    case 1 : rand4 = "E";
                    break;
                    case 2 : rand4 = "O";
                    break;
                    case 3 : rand4 = "S";
                }
                personne.setDepart(rand2 + "." + rand3 + "." + rand4);
                myLevel.personnes.push(personne);
            }

            console.log(myLevel);
    
            //myLevel.initialisationTabPersonne(personnes);
    
            /** Affichage plusieurs boutons de personnes **/
            socket.emit("boutonsPersonnes", myLevel.personnes);
            socket.emit("initialisationViewLevel", myLevel.numLevel);
        }
        baseDeDonnees.select("SELECT * FROM levels WHERE idlevels='" + numeroLevel + "' ", findLevel);

    });
    
    /**------------Requete des pannes-----------**/
    function myFunction(){
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

        setTimeout(myFunction,5000); /* rappel après 5 secondes = 2000 millisecondes */
    }
         
    myFunction();

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
        if(myLevel.city.kiosque.score != 0)
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
    socket.on("gare", (nbgare) => {
        let tempsTrain = myLevel.city.gares[nbgare - 1].temps;
        socket.emit("prochainTrain", tempsTrain);  
    });
    
    socket.on("metro", (nbstation) => {
        let tempsMetro =  myLevel.city.stationsMetro[nbstation - 1].temps;
        socket.emit("prochainMetro", tempsMetro);
    });

    socket.on("velo", (nbstation) => {
        let nombreV = myLevel.city.stationsVelo[nbstation - 1].velosLibre;
        socket.emit("nombreVelo", nombreV);
    });

    /*** Personne ****/
    socket.on("ChronoPersonnes", () =>
    {
        for(let i = 0; i < myLevel.personnes.length; ++i)
        {
            let temps = myLevel.personnes[i].count(15); //La personne disparaît au bout de 15 secondes
            if(temps == 1) //la personne disparaît et prend la voiture
            {
                myLevel.personnes[i].envoye = 1;
                socket.emit("PersonneDisparait", i);
            }
        }
    });

    socket.on("NouvellePersonne", () =>
    {
        for(let i = 0; i < myLevel.personnes.length; ++i) 
        //pour chaque personne on teste si elle doit apparaître ou pas
        {
            if(myLevel.personnes[i].apparue == false)
            {
                let isAppeared = Math.floor(Math.random() * 100);
                if(isAppeared < 90) //20% de chances d'apparaître toutes les 15 minutes
                {
                    myLevel.personnes[i].apparue = true;
                    socket.emit("PersonneApparue", i);
                }
            }
        }
    });

    socket.on("CliquePersonne", (idPersonne) => 
    {
        if(myLevel.personnes[idPersonne].envoye != 1)
        {
            socket.emit("AfficheDestination", myLevel.personnes[idPersonne].destination);
        }
    });

    socket.on("GetMove", (numberPersonne, typeTransport) =>
    {
        typeTransport = typeTransport.substring(9).toLowerCase();
        function idTransport(result1)
        {
            let idtransport = result1[0].idtransport;
            function idBatiment(result2)
            {
                let idbatiment = result2[0].idcity;
                function trajet(result3)
                {
                    console.log(result3);
                }
                baseDeDonnees.select("SELECT * FROM move WHERE idcity='" + idbatiment + "' AND idtransport='" + idtransport + "' AND depart='" + myLevel.personnes[numberPersonne].depart + "'", trajet);
            }
            baseDeDonnees.select("SELECT * FROM city WHERE batiment='" + myLevel.personnes[numberPersonne].destination + "'", idBatiment);
        }
        baseDeDonnees.select("SELECT * FROM transport WHERE type='" + typeTransport + "'", idTransport);
    });

    socket.on("SupprimePersonne", numberPersonne =>
    {
        myLevel.personnes[numberPersonne].envoye = 1;
        console.log(myLevel.personnes);
    });

    socket.on("DiminueVelo", () => 
    {
        myLevel.city.stationsVelo[2].velosLibre -= 1;
        if(myLevel.city.stationsVelo[2].velosLibre == 0)
        {
            myLevel.city.mairie.evenementVelo();
        }
    });

    /*** Quitter le niveau en cours : Reset ***/
    socket.on("Retry", () =>
    {
        let level = myLevel.numLevel;
        myLevel.reset();
        socket.emit("ReinitialisationLevel", level);
    });

    socket.on("QuitterJeu", () =>
    {
        myLevel.reset();
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