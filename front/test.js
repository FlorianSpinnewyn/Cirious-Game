/*                          * * * * * * * * * * * * * * * * * * * * * * * * * * *
                            *                                                   *
                            *       Fichier Main JS lié à la page Test          *
                            *                                                   *
                            * * * * * * * * * * * * * * * * * * * * * * * * * * *                  */

let intervalPerson;

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

/*** Mini-jeu Atelier ***/
document.getElementById("metroRepare").addEventListener("click", event =>
{
    //faire apparaitre le mini-jeu
    document.getElementById("miniJeuAtelier").style.display = "block";

    const canvas = document.querySelector('#canvas');
    const contexte = canvas.getContext('2d');

    //changer la taille
    canvas.height = 725;
    canvas.width = 810;

    //variables
    let couleurBleu = "#4A4EFC";
    let couleurVert = "#659b41";
    let couleurJaune = "#ffcf33";
    let couleurRouge = "#FE0000";
    let epaisseur = 15;
    let painting = false;
    let debutX, debutY, finX, finY;
    let cable;
    let cableRouge = false;
    let cableBleu = false;
    let cableJaune = false;
    let cableVert = false;

    function startPosition(e){
        painting = true;
        debutX = e.clientX;
        debutY = e.clientY;
    }
    function finishedPosition(e){
        painting = false;
        finX = e.clientX;
        finY = e.clientY;

        if (finX > 810 && finX < 900) {
            if(cable == 'rouge' && finY > 680 && finY < 730) {
                cableRouge = true;
            }
            else if(cable == 'bleu' && finY > 465 && finY < 515){
                cableBleu = true;
            }
            else if(cable == 'jaune' && finY > 45 && finY < 95){
                cableJaune = true;
            }
            else if(cable == 'vert' && finY > 255 && finY < 305){
                cableVert = true;
            }
        }
        
        //clear
        contexte.clearRect(0,0,canvas.width, canvas.height);

        if(cableRouge) {
            contexte.beginPath();
            contexte.strokeStyle = couleurRouge;
            contexte.moveTo(30,50);
            contexte.lineTo(790,685);
            contexte.stroke();
        }
        if(cableBleu) {
            contexte.beginPath();
            contexte.strokeStyle = couleurBleu;
            contexte.moveTo(30,265);
            contexte.lineTo(790,470);
            contexte.stroke();
        }
        if(cableJaune) {
            contexte.beginPath();
            contexte.strokeStyle = couleurJaune;
            contexte.moveTo(30,470);
            contexte.lineTo(790,55);
            contexte.stroke();
        }
        if(cableVert) {
            contexte.beginPath();
            contexte.strokeStyle = couleurVert;
            contexte.moveTo(30,685);
            contexte.lineTo(790,280);
            contexte.stroke();
        }

        if(cableRouge && cableVert && cableBleu && cableJaune)
        {
            document.getElementById("miniJeuAtelier").style.display = "none";
            document.getElementById("probMetro").hidden = true;
            document.getElementById("jeuAtelierReussi").hidden = false;
        }

        contexte.beginPath();
    }

    function debutDraw(e){
        if(!painting) return;
        contexte.lineWidth = epaisseur;
        contexte.lineCap = 'round';

        if (debutX > 95 && debutX < 155) {
            if( !cableRouge && debutY > 45 && debutY < 95) {
                contexte.strokeStyle = couleurRouge;
                suiteDraw(e, 'rouge');
            }
            else if( !cableBleu && debutY > 255 && debutY < 305){
                contexte.strokeStyle = couleurBleu;
                suiteDraw(e, 'bleu');
            }
            else if( !cableJaune && debutY > 465 && debutY < 515){
                contexte.strokeStyle = couleurJaune;
                suiteDraw(e, 'jaune');
            }
            else if( !cableVert && debutY > 680 && debutY < 730){
                contexte.strokeStyle = couleurVert;
                suiteDraw(e, 'vert');
            }
        }   
    }

    function suiteDraw(e, fil) {
        cable = fil;
        contexte.lineTo(e.clientX -95, e.clientY-15);
        contexte.stroke();
        contexte.beginPath();
        contexte.moveTo(e.clientX -95, e.clientY-15);
    }

    //EventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', debutDraw);
});
 
document.getElementById('partir').addEventListener("click", event => 
{ 
    document.getElementById('reparationMetro').style.display='none';
    console.log("Nous avons quitté l'atelier.");
});

/*** Gare ***/

socket.on("HoraireTrain", (temps, panne) =>
{
    document.getElementById('tempsTrain').innerHTML = temps;
    if(panne)
    {
        document.getElementById("prochainTrain").hidden = true;
        document.getElementById("attenteTrain").hidden = false;
    }
    else
    {
        document.getElementById("prochainTrain").hidden = false;
        document.getElementById("attenteTrain").hidden = true;
    }
});

document.getElementById('bye').addEventListener("click", event => 
{ 
    document.getElementById('horaireTrain').style.display='none';
    console.log("Nous avons quitté la gare.");
});

/*** Métro ***/

socket.on("HoraireMetro1", (temps, panne) =>
{
    document.getElementById('tempsMetro1').innerHTML = temps;
    if(panne)
    {
        document.getElementById("prochainMetro1").hidden = true;
        document.getElementById("attenteMetro1").hidden = false;
    }
    else
    {
        document.getElementById("prochainMetro1").hidden = false;
        document.getElementById("attenteMetro1").hidden = true;
    }
});

socket.on("HoraireMetro2", (temps, panne) =>
{
    document.getElementById('tempsMetro2').innerHTML = temps;
    if(panne)
    {
        document.getElementById("prochainMetro2").hidden = true;
        document.getElementById("attenteMetro2").hidden = false;
    }
    else
    {
        document.getElementById("prochainMetro2").hidden = false;
        document.getElementById("attenteMetro2").hidden = true;
    }
});

document.getElementById('ciao1').addEventListener("click", event => 
{ 
    document.getElementById('horaireMetro1').style.display='none';
    console.log("Nous avons quitté la station de métro.");
});

document.getElementById('ciao2').addEventListener("click", event => 
{ 
    document.getElementById('horaireMetro2').style.display='none';
    console.log("Nous avons quitté la station de métro.");
});

/*** Vélo ***/

socket.on("nombreVelo", (nombreV, nbstation) => {
    if(nbstation == 1)
    {
        document.getElementById("nombreVelo1").hidden = false;
        document.getElementById('resteVelo1').innerHTML = nombreV;
    }
    if(nbstation == 3)
    {
        document.getElementById("nombreVelo2").hidden = false;
        document.getElementById('resteVelo2').innerHTML = nombreV;
    }
});

document.getElementById('aurevoir1').addEventListener("click", event => 
{ 
    document.getElementById('veloRestants1').style.display='none';
    console.log("Nous avons quitté la station de vélo.");
});

document.getElementById('aurevoir2').addEventListener("click", event => 
{ 
    document.getElementById('veloRestants2').style.display='none';
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


socket.on("AfficheDestination", (destination, idPerso, panneTrain, panneMetro, manqueVelo) => 
{
    removeFlecheDest();
    scene.getObjectByName(destination).visible=true;
    socket.emit("secondePersonne", idPerso);
    if(panneTrain)
    {
        document.getElementById("transportTrain").disabled = true;
    }
    else
    {
        document.getElementById("transportTrain").disabled = false;
    }
    if(panneMetro)
    {
        document.getElementById("transportMetro").disabled = true;
    }
    else
    {
        document.getElementById("transportMetro").disabled = false;
    }
    if(manqueVelo)
    {
        document.getElementById("transportVelo").disabled = true;
    }
    else
    {
        document.getElementById("transportVelo").disabled = false;
    }

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
    intervalPerson = setInterval(function() {
        socket.emit("secondePersonne", idPerso);
    }, 1000);
    document.getElementById('DestinationPersonne').style.display='block';
    
});

socket.on("secondePersonne2", (i) => {
    document.getElementById("sec").innerHTML = 10-i;
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
        clearInterval(intervalPerson);
    }
});

document.getElementById("transport").addEventListener("click", event =>
{
    let typeTransport = event.target.id;
    if(typeTransport == "transportVelo")
    {
        socket.emit("DiminueVelo", document.getElementsByClassName("personne content").id);
    }
    document.getElementById('DestinationPersonne').style.display='none';
    clearInterval(intervalPerson);
    socket.emit("GetMove", document.getElementsByClassName("personne content").id, typeTransport);
    socket.emit("SupprimePersonne", document.getElementsByClassName("personne content").id);
});

document.getElementById('aplus').addEventListener("click", event => 
{ 
    document.getElementById('DestinationPersonne').style.display='none';
    clearInterval(intervalPerson);
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
    //scene.add(light);
    

}

function ajoutPersonne(personne) {
    console.log(personne.depart)
    scene.getObjectByName(personne.depart).visible=true;
}

function suppPersonne(personne) {

    scene.getObjectByName(personne.depart).visible=false;
}

function  removeFlecheDest(){
    scene.getObjectByName("Ecole").visible=false;
    scene.getObjectByName("Campagne").visible=false;
    scene.getObjectByName("Magasins").visible=false;
    scene.getObjectByName("Musee").visible=false;
    scene.getObjectByName("Parc").visible=false;
    scene.getObjectByName("Restaurant").visible=false;
    scene.getObjectByName("Stade").visible=false;
}