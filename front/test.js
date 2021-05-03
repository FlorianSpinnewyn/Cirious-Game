/*                          * * * * * * * * * * * * * * * * * * * * * * * * * * *
                            *                                                   *
                            *       Fichier Main JS lié à la page Test          *
                            *                                                   *
                            * * * * * * * * * * * * * * * * * * * * * * * * * * *                  */

/*** Demarer un niveau ***/
document.getElementById('level1').addEventListener("click", event =>
{
    socket.emit("initialisationLevel", parseInt(document.getElementById('level1').id.substr(5)));
});

socket.on("initialisationViewLevel", numeroLevel => {
    document.getElementById("level").style.display = "none";
    document.getElementById("HUD").hidden = false;
});

let heure = 16;
let minute = 0;



function startTime(){

    var countdownfunction = setInterval(function() {
    minute=minute+1;

    if(minute==60) {
        heure = heure + 1;
        minute = 0;
    }
    
    // Output the result in an element with id="demo"
    document.getElementById("time").innerHTML = heure + "h "
    + minute + "m ";
    
    }, 2000);

}


startTime();

/*** Alertes ***/

/*** Mairie ***/

socket.on("afficheEvenement", (metro, train, velo, voiture) => 
{
    console.log("Nous sommes à la Mairie :)");
    console.log(metro, train, velo, voiture);
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
    console.log(score, prochainObjectif, badgeDebloque);
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
socket.on("prochainTrain", (temps) => {
    document.getElementById("prochainTrain").hidden=false;
    document.getElementById('tempsTrain').innerHTML = temps;
});

document.getElementById('bye').addEventListener("click", event => 
{ 
    document.getElementById('horaireTrain').style.display='none';
    console.log("Nous avons quitté la gare.");
});

/*** Métro ***/
socket.on("prochainMetro", (temps) => {
    console.log(temps);
    document.getElementById("prochainMetro").hidden=false;
    document.getElementById('tempsMetro').innerHTML = temps;
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
socket.on("boutonsPersonnes", personnes => 
{
    let chaine = "";
    for(let i = 0; i < personnes.length; ++i)
    {
        chaine += "<button id='Personne" + i + "'>Personnne</button>";

    }
    document.getElementById("Personnes").innerHTML = chaine;
});

document.getElementById('Personnes').addEventListener("click", event =>
{
    console.log("On a cliqué sur une personne.");
    let id = event.target.id.charAt(8);
    document.getElementById("idPersonne").innerHTML = id;
    socket.emit("CliquePersonne", id);
});

socket.on("AfficheDestination", (destination) => 
{
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
    console.log("Cette personne souhaite aller ", destination);
    document.getElementById("dest").innerHTML = destination;
    document.getElementById('DestinationPersonne').style.display='block';
});

document.getElementById("transport").addEventListener("click", event =>
{
    let typeTransport = event.target.id;
    console.log(typeTransport);
    let numberPersonne = document.getElementById("idPersonne").innerHTML;
    console.log(numberPersonne);
    let pers = document.getElementById("Personne" + numberPersonne);
    document.getElementById("Personnes").removeChild(pers);
    document.getElementById('DestinationPersonne').style.display='none';
    socket.emit("GetMove", numberPersonne, typeTransport);
    socket.emit("SupprimePersonne", numberPersonne);
});

document.getElementById('aplus').addEventListener("click", event => 
{ 
    document.getElementById('DestinationPersonne').style.display='none';
});


