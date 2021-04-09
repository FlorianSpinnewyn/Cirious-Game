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
    if(metro)
    {
        document.getElementById("bonheur").hidden = true;
        document.getElementById("panneMetro").hidden = false;
    }
    if(train)
    {
        document.getElementById("bonheur").hidden = true;
        document.getElementById("panneTrain").hidden = false;
    }
    if(velo)
    {
        document.getElementById("bonheur").hidden = true;
        document.getElementById("manqueVelo").hidden = false;
    }
    if(voiture)
    {
        document.getElementById("bonheur").hidden = true;
        document.getElementById("embouteillage").hidden = false;
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
    if(prochainObjectif.length > 0)
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