/*                          * * * * * * * * * * * * * * * * * * * * * * * * * * *
                            *                                                   *
                            *       Fichier Main JS lié à la page Test          *
                            *                                                   *
                            * * * * * * * * * * * * * * * * * * * * * * * * * * *                  */




/*** Alertes ***/

/*** Mairie ***/
document.getElementById('Mairie').addEventListener("click", event =>
{
    socket.emit("mairie");
});

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
document.getElementById('Kiosque').addEventListener("click", event =>
{
    socket.emit("kiosque");
});

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
document.getElementById('Technicentre').addEventListener("click", event =>
{
    console.log("Nous sommes au Technicentre :)");
    document.getElementById('reparationTrain').style.display='block';
    socket.emit("technicentre");
});

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
document.getElementById('Parking').addEventListener("click", event =>
{
    console.log("Nous sommes au parking :)");
    document.getElementById('reparationVoiture').style.display='block';
    socket.emit("parking");
});

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
document.getElementById('Garage').addEventListener("click", event =>
{
    console.log("Nous sommes au garage :)");
    document.getElementById('stockVelo').style.display='block';
    socket.emit("garage");
});

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
document.getElementById('Atelier').addEventListener("click", event =>
{
    console.log("Nous sommes à l'atelier :)");
    document.getElementById('reparationMetro').style.display='block';
    socket.emit("atelier");
});

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
document.getElementById('Gare').addEventListener("click", event =>
{
    console.log("Nous sommes à la gare :)");
    document.getElementById('horaireTrain').style.display='block';
    socket.emit("gare");
});

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
document.getElementById('Metro').addEventListener("click", event =>
{
    console.log("Nous sommes à une station de métro :)");
    document.getElementById('horaireMetro').style.display='block';
    socket.emit("metro");
});

socket.on("prochainMetro", (temps) => {
    document.getElementById("prochainMetro").hidden=false;
    document.getElementById('tempsMetro').innerHTML = temps;
});

document.getElementById('ciao').addEventListener("click", event => 
{ 
    document.getElementById('horaireMetro').style.display='none';
    console.log("Nous avons quitté la station de métro.");
});

/*** Vélo ***/
document.getElementById('Velo').addEventListener("click", event =>
{
    console.log("Nous sommes à la station de vélo :)");
    document.getElementById('veloRestants').style.display='block';
    socket.emit("velo");
});

socket.on("nombreVelo", (nombreV) => {
    document.getElementById("nombreVelo").hidden=false;
    document.getElementById('resteVelo').innerHTML = nombreV;
});

document.getElementById('aurevoir').addEventListener("click", event => 
{ 
    document.getElementById('veloRestants').style.display='none';
    console.log("Nous avons quitté la station de vélo.");
});