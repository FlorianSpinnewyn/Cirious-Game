/*                          * * * * * * * * * * * * * * * * * * * * * * * * * * *
                            *                                                   *
                            *       Fichier Main JS lié à la page Test          *
                            *                                                   *
                            * * * * * * * * * * * * * * * * * * * * * * * * * * *                  */

//variables qui seront dans la base de données et qu'on devra récupérer :
let heurePanneTrain = 20; //evenement Train tous les 20 min
let heurePanneMetro = 10;
let modulo = 5;

chrono = new Chrono();

setInterval(function() {
    chrono.count();
    if( chrono.pause==false){
        console.log("cc",chrono.pause)
        socket.emit("c", chrono.pause);
        socket.emit("ChronoHoraire", chrono.pause);
    }

    let heure = "";
    let minute = "";
    if(chrono.heure < 10)
    {
        heure = '0' + chrono.heure;
    }
    else
    {
        heure = chrono.heure;
    }
    if(chrono.minute < 10)
    {
        minute = '0' + chrono.minute;
    }
    else
    {
        minute = chrono.minute;
    }
    document.getElementById("time").innerHTML = heure + "h " + minute + "m ";   
    if((chrono.heure * 60 + chrono.minute) % modulo == 0) {
        
        if(chrono.pause==false) {
            socket.emit("NouvellePersonne");
        }
        
    }

    if(chrono.heure != 16 || chrono.minute != 0)
    {
        if((chrono.heure * 60 + chrono.minute) % heurePanneTrain == 0)
        {
            socket.emit("HeurePanneTrain");
        }
        if((chrono.heure * 60 + chrono.minute) % heurePanneMetro == 0)
        {
            socket.emit("HeurePanneMetro");
        }
    }
}, 2000);

/*** Menu ***/
document.getElementById('play').addEventListener("click", event =>
{
    socket.emit("initialisationPlay");
});

socket.on("initialisationViewPlay", (tabLevel) => {

    document.getElementById("home").style.display = "none";
    document.getElementById("level").style.display = "block";
    for(let i = 0; i<6;i++) {
        if(tabLevel[i]==false) {
            document.getElementById("level" + i).disabled = true;
        }
    }
});

/*** Parametre ***/
document.getElementById('myonoffswitch').addEventListener('change', function() {
    if (this.checked) {
        activeOmbre();
    } else {
        desactiveOmbre();
    }
  });

/*** Demarrer un niveau ***/
document.getElementById('level1').addEventListener("click", event =>
{
    chrono.restart();
    chrono.continuer();
    socket.emit("initialisationLevel", "1");
});
document.getElementById('level2').addEventListener("click", event =>
{
    chrono.restart();
    chrono.continuer();
    socket.emit("initialisationLevel", "2");
});
document.getElementById('level3').addEventListener("click", event =>
{
    chrono.restart();
    chrono.continuer();
    socket.emit("initialisationLevel", "3");
});
document.getElementById('level4').addEventListener("click", event =>
{
    chrono.restart();
    chrono.continuer();
    socket.emit("initialisationLevel", "4");
});
document.getElementById('level5').addEventListener("click", event =>
{
    chrono.restart();
    chrono.continuer();
    socket.emit("initialisationLevel", "5");
});

socket.on("initialisationViewLevel", numeroLevel => {
    document.getElementById("level").style.display = "none";
    document.getElementById("pause").hidden = false;
    document.getElementById("HUD").hidden = false;
});

document.getElementById("pause").addEventListener("click", event =>
{
    document.getElementById("menuPause").style.display = 'block';
    document.getElementById("pause").hidden = true;
    chrono.mettrePause();
});

document.getElementById("cog").addEventListener("click", event => 
{
    document.getElementById("menuPause").style.display = 'none';
    document.getElementById("level").style.display = 'none';
    document.getElementById("menuParametre").style.display = 'block';
});

document.getElementById("retour").addEventListener("click", event =>
{
    document.getElementById("menuPause").style.display = 'block';
    document.getElementById("menuParametre").style.display = 'none';
});

document.getElementById("continuer").addEventListener("click", event =>
{
    document.getElementById("menuPause").style.display = 'none';
    document.getElementById("pause").hidden = false;
    chrono.continuer();
});

document.getElementById("quitterJeu").addEventListener("click", event =>
{
    document.getElementById("menuPause").style.display = 'none';
    document.getElementById("alerteQuit").style.display = 'block';
});

document.getElementById("recommencer").addEventListener("click", event =>
{
    document.getElementById("menuPause").style.display = 'none';
    document.getElementById("alerteRetry").style.display = 'block';
});

document.getElementById("retry").addEventListener("click", event =>
{
    document.getElementById("alerteRetry").style.display = 'none';
    document.getElementById("pause").hidden = false;
    chrono.restart();
    chrono.continuer();
    socket.emit("Retry");
});

document.getElementById("quit").addEventListener("click", event =>
{
    document.getElementById("level").style.display = 'block';
    document.getElementById("alerteQuit").style.display = 'none';
    socket.emit("QuitterJeu");
});

document.getElementById("annulerRetry").addEventListener("click", event =>
{
    document.getElementById("menuPause").style.display = 'block';
    document.getElementById("alerteRetry").style.display = 'none';
});

document.getElementById("annulerQuit").addEventListener("click", event =>
{
    document.getElementById("menuPause").style.display = 'block';
    document.getElementById("alerteQuit").style.display = 'none';
});

socket.on("ReinitialisationLevel", (idlevel) =>
{
    socket.emit("initialisationLevel", idlevel);
});

/*** Alertes ***/

/*** Mairie ***/

socket.on("afficheEvenement", (metro, train, velo, voiture) => 
{
    console.log("Nous sommes à la Mairie :)");
    if(!metro && !train && !velo && !voiture)
    {
        document.getElementById("bonheur").hidden = false;
    }
    if(metro)
    {
        document.getElementById("bonheur").hidden = true;
        document.getElementById("panneMetro").hidden = false;
    }
    else
    {
        document.getElementById("panneMetro").hidden = true;
    }
    if(train)
    {
        document.getElementById("bonheur").hidden = true;
        document.getElementById("panneTrain").hidden = false;
    }
    else
    {
        document.getElementById("panneTrain").hidden = true;
    }
    if(velo)
    {
        document.getElementById("bonheur").hidden = true;
        document.getElementById("manqueVelo").hidden = false;
    }
    else
    {
        document.getElementById("manqueVelo").hidden = true;
    }
    if(voiture)
    {
        document.getElementById("bonheur").hidden = true;
        document.getElementById("embouteillage").hidden = false;
    }
    else
    {
        document.getElementById("embouteillage").hidden = true;
    }
    document.getElementById('information').style.display='block';
});

document.getElementById('cancel').addEventListener("click", event => 
{
    document.getElementById('information').style.display='none';
    console.log("Nous avons quitté la Mairie");
});

/*** Kiosque ***/

socket.on("afficheActualite", (score, prochainObjectif, badgeDebloque) => 
{
    console.log("Nous sommes au Kiosque :)");
    if(score != 0)
    {
        document.getElementById("score").innerHTML = "Tu as " + score + " points !";
    }
    if(badgeDebloque!=[])
    {
        document.getElementById("badgeDebloque").innerHTML = "Voici tes badges débloqués : " ;
    }
    if(prochainObjectif != '')
    {
        document.getElementById("prochainObjectif").innerHTML = "Maintenant, tente de résoudre cet objectif : <br>" + prochainObjectif;
    }
    document.getElementById('actualite').style.display='block';
});

document.getElementById('close').addEventListener("click", event => 
{
    document.getElementById('actualite').style.display='none';
    console.log("Nous avons quitté le Kiosque");
});

/*** Technicentre ***/

socket.on("pasRepTrain", () => {
    document.getElementById("parfait").hidden = false;
    document.getElementById("probTrain").hidden = true;
});

socket.on("RepTrain", () => { 
    document.getElementById("parfait").hidden = true;
    document.getElementById("probTrain").hidden = false;
});

document.getElementById("trainRepare").addEventListener("click", () =>
{
    console.log("Nous réparons le train.");
    document.getElementById('reparationTrain').style.display='none';
    socket.emit("trainRepare");
});

document.getElementById('croix').addEventListener("click", event => 
{
    document.getElementById('reparationTrain').style.display='none';
    console.log("Nous avons quitté le Technicentre");
});

/*** Parking ***/

socket.on("Embouteillage", () => {
    document.getElementById("joie").hidden = true;
    document.getElementById("probVoiture").hidden = false;
});

socket.on("noEmbouteillage", () =>{
    document.getElementById("joie").hidden = false;
    document.getElementById("probVoiture").hidden = true;
});

document.getElementById('traficOk').addEventListener("click", event => {
    console.log("Nous avons fludifié le trafic.");
    document.getElementById('reparationVoiture').style.display='none';
    socket.emit("traficFluide");
});
 
document.getElementById('fermer').addEventListener("click", event => 
{ 
    document.getElementById('reparationVoiture').style.display='none';
    console.log("Nous avons quitté le Parking.");
});

/*** Garage ***/

socket.on("probVelo", () => {
    document.getElementById("noStress").hidden = true;
    document.getElementById("probVelo").hidden = false;
});

socket.on("noProbVelo", () =>{
    document.getElementById("noStress").hidden = false;
    document.getElementById("probVelo").hidden = true;
});

document.getElementById('veloRempli').addEventListener("click", event => {
    console.log("Nous avons remis des vélos.");
    document.getElementById('stockVelo').style.display='none';
    socket.emit("stockRempli");
});
 
document.getElementById('quitter').addEventListener("click", event => 
{ 
    document.getElementById('stockVelo').style.display='none';
    console.log("Nous avons quitté le garage.");
});

/*** Atelier ***/

socket.on("probMetro", () => {
    document.getElementById("relax").hidden = true;
    document.getElementById("probMetro").hidden = false;
});

socket.on("noProbMetro", () =>{
    document.getElementById("relax").hidden = false;
    document.getElementById("probMetro").hidden = true;
});

document.getElementById('metroRepare').addEventListener("click", event => {
    console.log("Nous avons réparer le métro.");
    document.getElementById('reparationMetro').style.display='none';
    socket.emit("metroRepare");
});
 
document.getElementById('partir').addEventListener("click", event => 
{ 
    document.getElementById('reparationMetro').style.display='none';
    console.log("Nous avons quitté l'atelier.");
});

/*** Gare ***/

socket.on("prochainTrain", (temps, panne) => {
    if(panne)
    {
        document.getElementById("prochainTrain").hidden=true;
        document.getElementById("attenteTrain").hidden=false;
    }
    else
    {
        document.getElementById("attenteTrain").hidden=true;
        document.getElementById("prochainTrain").hidden=false;
        document.getElementById('tempsTrain').innerHTML = temps;
    }
});

document.getElementById('bye').addEventListener("click", event => 
{ 
    document.getElementById('horaireTrain').style.display='none';
    console.log("Nous avons quitté la gare.");
});

/*** Métro ***/

socket.on("prochainMetro", (temps, panne) => {
    if(panne)
    {
        document.getElementById("prochainMetro").hidden=true;
        document.getElementById('attenteMetro').hidden = false;
    }
    else
    {
        document.getElementById('attenteMetro').hidden = true;
        document.getElementById("prochainMetro").hidden=false;
        document.getElementById('tempsMetro').innerHTML = temps;
    }
});

document.getElementById('ciao').addEventListener("click", event => 
{ 
    document.getElementById('horaireMetro').style.display='none';
    console.log("Nous avons quitté la station de métro.");
});

/*** Vélo ***/

socket.on("nombreVelo", (nombreV) => {
    document.getElementById("nombreVelo").hidden=false;
    document.getElementById('resteVelo').innerHTML = nombreV;
});

document.getElementById('aurevoir').addEventListener("click", event => 
{ 
    document.getElementById('veloRestants').style.display='none';
    console.log("Nous avons quitté la station de vélo.");
});

/*** Personne ***/

function evenementClickPersonne(str)
{
    console.log("On a cliqué sur une personne.");
    console.log(str);
    socket.emit("CliquePersonne", str);
}

socket.on("PersonneApparue", (idPersonne,personne) =>
{
    ajoutPersonne(personne);
});


socket.on("AfficheDestination", (destination, idPerso) => 
{
    document.getElementsByClassName("personne content").id=""+idPerso;
    if(destination == "Campagne")
    {
        destination = "à la " + destination;
    }
    else if(destination == "Ecole")
    {
        destination = "à l'" + destination;
    }
    else if(destination == "Magasins")
    {
        destination = "aux " + destination;
    }
    else
    {
        destination = "au " + destination;
    }
    console.log("Cette personne qui a pour id = " + idPerso + " souhaite aller ", destination);
    document.getElementById("dest").innerHTML = destination;
    document.getElementById('DestinationPersonne').style.display='block';
});

socket.on("PersonneDisparait", (idPersonne,personne,louper) =>
{
    suppPersonne(personne);
    if(personne.fenetre==true &&  document.getElementsByClassName("personne content").id==idPersonne){
        if(louper==true){
            console.log(louper,"trop taaaar")
        }
        else {
            console.log(louper,"Envoyer")
        }
        
        document.getElementById('DestinationPersonne').style.display='none';
    }
});

document.getElementById("transport").addEventListener("click", event =>
{
    let typeTransport = event.target.id;
    if(typeTransport == "transportVelo")
    {
        socket.emit("DiminueVelo");
    }

    document.getElementById('DestinationPersonne').style.display='none';
    socket.emit("GetMove", document.getElementsByClassName("personne content").id, typeTransport);
    socket.emit("SupprimePersonne", document.getElementsByClassName("personne content").id);
});

document.getElementById('aplus').addEventListener("click", event => 
{ 
    document.getElementById('DestinationPersonne').style.display='none';
});

/*** Menu volume ***/

var slider = document.getElementById("myRange");
var output = document.getElementById("value");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
} 

function activeOmbre() {
    light.castShadow = true;
    scene.add(light);
}

function desactiveOmbre() {
    light.castShadow = false;
    scene.add(light);
}

function ajoutPersonne(personne) {
    console.log(personne.depart)
    scene.getObjectByName(personne.depart).visible=true;
}

function suppPersonne(personne) {

    scene.getObjectByName(personne.depart).visible=false;
}