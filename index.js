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
    });

    /**------------Initialisation des niveaux-----------**/
    socket.on("initialisationLevel", (numeroLevel) => 
    {
        if(socket.handshake.session.levelEnCours)
        {
            myLevel.reset();
        }
        socket.handshake.session.levelEnCours = true;
        
        //requête dans la base de données pour aller chercher le nombre de personnes dont on a besoin
        function findLevel(result4) {
            myLevel.initalisationLevel(numeroLevel,result4[0].nbPersonnes, result4[0].nbVoituresMax, result4[0].nbSecondsPersonne, result4[0].nbBadges, result4[0].nbEvenements, result4[0].pasContentMax, result4[0].pollutionMax);

            let tab = [
                "0.7.N",
                "0.7.S",
                "0.7.O",
                "0.7.E",
                "0.7.NE",
                "0.7.SE",
                "0.7.NO",
                "0.7.SO",
                "1.7.N",
                "1.7.S",
                "1.7.O",
                "1.7.E",
                "1.7.NE",
                "1.7.SE",
                "1.7.NO",
                "1.7.SO",
                "1.9.N",
                "1.9.S",
                "1.9.O",
                "1.9.E",
                "1.9.NE",
                "1.9.SE",
                "1.9.NO",
                "1.9.SO",
                "1.11.N",
                "1.11.S",
                "1.11.O",
                "1.11.E",
                "1.11.NE",
                "1.11.SE",
                "1.11.NO",
                "1.11.SO",
                "0.11.N",
                "0.11.S",
                "0.11.O",
                "0.11.E",
                "0.11.NE",
                "0.11.SE",
                "0.11.NO",
                "0.11.SO"
            ]

            for(let i = 0; i < myLevel.nbPersonnes; ++i) {
                let personne = new Personne();
                personne.initialisation(tab)
                myLevel.personnes.push(personne);
                delete(personne);
            }
            socket.emit("initialisationViewLevel", myLevel.numLevel, myLevel.nbSecondsPersonne, myLevel.nbVoituresMax, myLevel.pollutionMax, myLevel.pasContentMax);
        }
        baseDeDonnees.select("SELECT * FROM levels WHERE idlevels='" + numeroLevel + "' ", findLevel);
    });
    
    /**------------- Tuto -------------------- **/
    socket.on("DebutTuto", () =>
    {
        myLevel.reset();
    });
    
    /**------------Requete des pannes-----------**/
    socket.on("HeurePanneTrain", () =>
    {
        myLevel.city.mairie.evenementTrain();
    });

    socket.on("HeurePanneMetro", () =>
    {
        myLevel.city.mairie.evenementMetro();
    });
    
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
        if(myLevel.city.mairie.panneTrain == true)
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
        if(myLevel.city.mairie.embouteillage)
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
        if(myLevel.city.mairie.manqueVelo == true)
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
        myLevel.city.stationsVelo[2].velosLibre = 17;
        myLevel.city.stationsVelo[0].velosLibre = 24;
    });

    /*** Atelier ***/

    socket.on("atelier", () => {
        if(myLevel.city.mairie.panneMetro == true)
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
    
    /*** Gare et Stations ***/

    socket.on("ChronoHoraire", (pause) =>
    {
        if(pause == false)
        {
            if(myLevel.city.mairie.panneTrain == false)
            {
                myLevel.city.gares[0].count();
            }
            socket.emit("HoraireTrain", myLevel.city.gares[0].temps, myLevel.city.gares[0].attente, myLevel.city.mairie.panneTrain);
            
            if(myLevel.city.mairie.panneMetro == false)
            {
                myLevel.city.stationsMetro[0].count();
            }
            socket.emit("HoraireMetro1", myLevel.city.stationsMetro[0].temps, myLevel.city.mairie.panneMetro);

            if(myLevel.city.mairie.panneMetro == false)
            {
                myLevel.city.stationsMetro[9].count();
            }
            socket.emit("HoraireMetro2", myLevel.city.stationsMetro[9].temps, myLevel.city.mairie.panneMetro);
        }
    });

    socket.on("velo", (nbstation) => {
        let nombreV = myLevel.city.stationsVelo[nbstation - 1].velosLibre;
        socket.emit("nombreVelo", nombreV, nbstation);
    });

    /*** Personne ****/

    socket.on("c", (pause) =>
    {
        if(pause == false)
        {
            for(let i = 0; i < myLevel.personnes.length; ++i)
            {
                let temps = myLevel.personnes[i].count(10); //La personne disparaît au bout de 10 secondes
                if(temps == 1) //la personne disparaît et prend la voiture
                {
                    myLevel.personnes[i].envoye = 1;
                    socket.emit("PersonneDisparait", i, myLevel.personnes[i],true);
                    myLevel.personnesEnvoye++;
                    myLevel.personneVoiture++;
                    //console.log(myLevel.personneVoiture)
                    if(myLevel.city.mairie.evenementEmbouteillage(myLevel.personneVoiture)){
                        socket.emit("afficheFlechePanne", "flecheParking");
                        myLevel.personneVoiture = 0;
                    }
                }
            }
            if(myLevel.personnesEnvoye == myLevel.nbPersonnes) {
                socket.emit("Finito");
            }
        }
    });

    socket.on("NouvellePersonne", () =>
    {
        if(myLevel.personnesApparu < myLevel.nbPersonnes) {
            if(myLevel.personnes.length > 0) {
                let i = 0
                while(myLevel.personnes[i].apparue == true) {
                    i++; 
                }
                
                myLevel.personnes[i].apparue = true;
                socket.emit("PersonneApparue", i, myLevel.personnes[i]);
                myLevel.personnesApparu++;
                //console.log(myLevel.personnesApparu);
                for(let k = 0; k < myLevel.tabEvenement.length; ++k) {
                    if(myLevel.tabEvenement[k] == myLevel.personnesApparu) {
                        if(myLevel.city.mairie.panneMetro == false) {
                            myLevel.city.mairie.evenementMetro();
                            if(myLevel.city.mairie.panneMetro == true) {
                                socket.emit("afficheFlechePanne", "flecheAtelier");
                            }
                        }
                        if(myLevel.city.mairie.panneTrain == false) {
                            myLevel.city.mairie.evenementTrain();
                            if(myLevel.city.mairie.panneTrain == true) {
                                socket.emit("afficheFlechePanne", "flecheTechnicentre");
                                socket.emit("pauseAnimationTrain");
                            }
                        }
                        
                    }
                }
            }
        }
    });

    socket.on("secondePersonne", (i) => {
        socket.emit("secondePersonne2",myLevel.personnes[i].chrono);
    });

    socket.on("CliquePersonne", (str) => 
    {
        let idPersonne = findPersonne(str)
        if(myLevel.personnes[idPersonne].envoye != 1)
        {
            socket.emit("AfficheDestination",myLevel.personnes[idPersonne].depart, myLevel.personnes[idPersonne].destination, idPersonne, myLevel.city.mairie.panneTrain, myLevel.city.mairie.panneMetro, myLevel.city.mairie.manqueVelo);
            myLevel.personnes[idPersonne].fenetre = true;
        }
    });

    socket.on("GetMove", (numberPersonne, typeTransport) =>
    {
        let departWord;
        let departtab = myLevel.personnes[numberPersonne].depart.split(".");
        if(departtab[2].length == 2) {
            departWord = myLevel.personnes[numberPersonne].depart.substring(0, myLevel.personnes[numberPersonne].depart.length - 1);
        }
        else {
            departWord = myLevel.personnes[numberPersonne].depart;
        }
        typeTransport = typeTransport.substring(9).toLowerCase();
        function idTransport(result1)
        {
            let idtransport = result1[0].idtransport;
            function idBatiment(result2)
            {
                let idbatiment = result2[0].idcity;
                function trajet(result3)
                {
                    socket.emit("Choix", result3[0].class);
                }
                baseDeDonnees.select("SELECT * FROM move WHERE idcity='" + idbatiment + "' AND idtransport='" + idtransport + "' AND depart='" + departWord + "'", trajet);
            }
            baseDeDonnees.select("SELECT * FROM city WHERE batiment='" + myLevel.personnes[numberPersonne].destination + "'", idBatiment);
        }
        baseDeDonnees.select("SELECT * FROM transport WHERE type='" + typeTransport + "'", idTransport);
    });

    socket.on("SupprimePersonne", numberPersonne =>
    {
        myLevel.personnes[numberPersonne].envoye = 1;
        myLevel.personnesEnvoye++;
        socket.emit("PersonneDisparait", numberPersonne, myLevel.personnes[numberPersonne], false);
    });

    socket.on("DiminueVelo", (idPersonne) => 
    {
        let departPersonne = myLevel.personnes[idPersonne].depart.split(".");
        if((departPersonne[0] == "0") && (departPersonne[1] == "7")) {
            myLevel.city.stationsVelo[0].velosLibre -= 1;
            if(myLevel.city.stationsVelo[0].velosLibre == 0)
            {
                myLevel.city.mairie.evenementVelo();
            }
        }
        else  {
            myLevel.city.stationsVelo[2].velosLibre -= 1;
            if(myLevel.city.stationsVelo[2].velosLibre == 0)
            {
                myLevel.city.mairie.evenementVelo();
            } 
        }
    });

    /*** Quitter le niveau en cours : Reset ***/

    socket.on("Retry", () =>
    {
        for(let i = 0; i < myLevel.personnes.length; ++i)
        {
            if(myLevel.personnes[i].apparue == true && myLevel.personnes[i].envoye == 0)
            {
                socket.emit("PersonneDisparait", i, myLevel.personnes[i], false);
            }
        }
        let level = myLevel.numLevel;
        myLevel.reset();
        socket.emit("ReinitialisationLevel", level);
    });

    socket.on("QuitterJeu", () =>
    {
        for(let i = 0; i < myLevel.personnes.length; ++i)
        {
            if(myLevel.personnes[i].apparue == true && myLevel.personnes[i].envoye == 0)
            {
                socket.emit("PersonneDisparait", i, myLevel.personnes[i], false);
            }
        }
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
             = result[i].depart.split('.');
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

function findPersonne(str){
    for(let i = 0;i<myLevel.personnes.length;i++){
        if(myLevel.personnes[i].depart==str) {return i;}
    }
}