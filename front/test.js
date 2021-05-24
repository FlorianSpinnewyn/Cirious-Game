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
    if(chrono.pause == false){
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
        
        if(chrono.pause == false) {
            socket.emit("NouvellePersonne");
        }
        
    }

    // if(chrono.heure != 16 || chrono.minute != 0)
    // {
    //     if((chrono.heure * 60 + chrono.minute) % heurePanneTrain == 0)
    //     {
    //         socket.emit("HeurePanneTrain");
    //     }
    //     if((chrono.heure * 60 + chrono.minute) % heurePanneMetro == 0)
    //     {
    //         socket.emit("HeurePanneMetro");
    //     }
    // }

    if(scoreVoiture == 100 || scoreHumeur == 100)
    {
        chrono.mettrePause();
        let fenetres = document.getElementsByClassName("fenetre");
        for(let i = 0; i < fenetres.length; ++i)
        {
            fenetres[i].style.display = "none";
        }
        document.getElementById("gameOver").style.display = 'block';
        document.getElementById("result").innerHTML = 'perdu';
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
    for(let i = 0; i < 7; ++i) {
        if(tabLevel[i] == false) {
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

/*** Tuto ***/
document.getElementById('level0').addEventListener("click", event =>
{
    chrono.restart();
    socket.emit("DebutTuto");
    document.getElementById("tuto").style.display = 'block';
    document.getElementById("level").style.display = 'none';
    document.getElementById("titreTuto").innerHTML = "Bienvenue à CirCity!"
    document.getElementById("phraseTuto").innerHTML = "Ce tutoriel va vous apprendre tout ce qu'il faut savoir pour jouer à <b>Choose&Go</b>."
    document.getElementById("commencerTuto").hidden = false;
    document.getElementById("pagination").style.display = "none";
    document.getElementById("pagination").innerHTML = "<button id='precedent' hidden=true>&laquo;</button><button id='page1' class='active boutonTuto1'>1</button><button id='page2' class='boutonTuto2'>2</button><button id='page3' class='boutonTuto3'>3</button><button id='page4' class='boutonTuto4'>4</button><button id='page5' class='boutonTuto5'>5</button><button id='page6' class='boutonTuto6'>6</button><button id='suivant'>&raquo;</button>";
});

document.getElementById("commencerTuto").addEventListener("click", event =>
{
    document.getElementById("titreTuto").innerHTML = "But du jeu"
    document.getElementById("phraseTuto").innerHTML = "C'est l'heure de la sortie du travail à CirCity. Des salariés arrivent dans la rue, ils souhaitent se rendre à différents endroits de la vile (magasin, école, musée...). <br> Ta mission : leur indiquer le <b>meilleur moyen de transport</b> (en train, en métro, en vélo, à pied) pour leur déplacement. <br><br> Il faut que le choix soit rapide, n'ait pas trop d'attente tout en essayant de polluer le moins possible. <br>Si la demande n'est pas prise en compte assez rapidement, le salarié partira en voiture et donc polluera... <br> <br> Lorsque tous les salariés ont quitté le travail, tu as gagné ! Ton score apparaitra ainsi qu'un conseil écolo pour améliorer et optimiser tes déplacements dans la vraie vie ! <br>Mais attention 2 jauges peuvent te faire perdre la partie : <br> - La <b>jauge de pollution</b> dont le niveau augmente si un salarié part en voiture, si un train part presque vide et il diminue si un salarié se déplace à pied. <br> - La <b>jauge de mécontentement</b> se remplie si ton choix de transport n'est pas en adéquation avec la demande (trop d'attente, trop long, trop polluant), si les imprévus (tutoriel page 3) ne sont pas résolus assez vite et elle se vide si tu remportes des badges (tutoriel page 4). <br><br><br> A toi de jouer pour lutter contre la pollution des transports !"
    document.getElementById("commencerTuto").hidden = true;
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("finirTuto").hidden = true;
    document.getElementById("finirTuto").style.display = "inline";
    document.getElementById("suivant").classList.add("boutonTuto2");
});

setInterval(function()
{
    let boutons1 = document.getElementsByClassName("boutonTuto1");

    for(let i = 0; i < boutons1.length; ++i)
    {
        boutons1[i].addEventListener("click", event =>
        {
            document.getElementById("titreTuto").innerHTML = "But du jeu"
            document.getElementById("phraseTuto").innerHTML = "C'est l'heure de la sortie du travail à CirCity. Des salariés arrivent dans la rue, ils souhaitent se rendre à différents endroits de la vile (magasin, école, musée...). <br> Ta mission : leur indiquer le <b>meilleur moyen de transport</b> (en train, en métro, en vélo, à pied) pour leur déplacement. <br><br> Il faut que le choix soit rapide, n'ait pas trop d'attente tout en essayant de polluer le moins possible. <br>Si la demande n'est pas prise en compte assez rapidement, le salarié partira en voiture et donc polluera... <br> <br> Lorsque tous les salariés ont quitté le travail, tu as gagné ! Ton score apparaitra ainsi qu'un conseil écolo pour améliorer et optimiser tes déplacements dans la vraie vie ! <br>Mais attention 2 jauges peuvent te faire perdre la partie : <br> - La <b>jauge de pollution</b> dont le niveau augmente si un salarié part en voiture, si un train part presque vide et il diminue si un salarié se déplace à pied. <br> - La <b>jauge de mécontentement</b> se remplie si ton choix de transport n'est pas en adéquation avec la demande (trop d'attente, trop long, trop polluant), si les imprévus (tutoriel page 3) ne sont pas résolus assez vite et elle se vide si tu remportes des badges (tutoriel page 4). <br><br><br> A toi de jouer pour lutter contre la pollution des transports !"
            document.getElementById("precedent").hidden = true;
            document.getElementById("suivant").hidden = false;
            document.getElementById("suivant").removeAttribute("class");
            document.getElementById("suivant").classList.add("boutonTuto2");
            document.getElementById("page1").classList.add("active");
            document.getElementById("page2").classList.remove("active");
            document.getElementById("page3").classList.remove("active");
            document.getElementById("page4").classList.remove("active");
            document.getElementById("page5").classList.remove("active");
            document.getElementById("page6").classList.remove("active");
            document.getElementById("finTuto").hidden = true;
            document.getElementById("finirTuto").hidden = true;
        });
    }

    let boutons2 = document.getElementsByClassName("boutonTuto2");
    for(let i = 0; i < boutons2.length; ++i)
    {
        boutons2[i].addEventListener("click", event =>
        {
            document.getElementById("titreTuto").innerHTML = "Les déplacements dans la map";
            document.getElementById("phraseTuto").innerHTML = "CirCity est une grande ville ! N'hésite pas à te déplacer, c'est tout simple : <br><br> - le clic droit permet de bouger linéarement dans la ville (ta position précise); <br> - le clic gauche gère les rotations (ton angle de vue); <br> - tu peux également zoomer ou dézoomer jusqu'aux nuages (ta hauteur).";
            document.getElementById("precedent").hidden = false;
            document.getElementById("precedent").removeAttribute("class");
            document.getElementById("precedent").classList.add("boutonTuto1");
            document.getElementById("suivant").hidden = false;
            document.getElementById("suivant").removeAttribute("class");
            document.getElementById("suivant").classList.add("boutonTuto3");
            document.getElementById("page2").classList.add("active");
            document.getElementById("page1").classList.remove("active");
            document.getElementById("page3").classList.remove("active");
            document.getElementById("page4").classList.remove("active");
            document.getElementById("page5").classList.remove("active");
            document.getElementById("page6").classList.remove("active");
            document.getElementById("finTuto").hidden = true;
            document.getElementById("finirTuto").hidden = true;
        });
    }

    let boutons3 = document.getElementsByClassName("boutonTuto3");
    for(let i = 0; i < boutons3.length; ++i)
    { 
        boutons3[i].addEventListener("click", event =>
        {
            document.getElementById("titreTuto").innerHTML = "Les demandes des salariés";
            document.getElementById("phraseTuto").innerHTML = "Les salariés apparaissent dans la zone de travail autour de la Gare du Nord. Des <b>points d'exclamation rouges</b> marquent leurs emplacements. <br><br> En cliquant sur le salarié, tu découvres sa destination qui est marquée par une <b>flèche verte</b> dans la ville. <br>Pour t'aider, des <b>flèches jaunes</b> t'indiquent la station de métro, de vélo et la gare à proximité. <br>Il y a également un <b>chrono</b> qui te précise dans combien de temps le salarié partira en voiture. <br> Tu n'as plus qu'à évaluer par toi même quel est le meilleur moyen de transport pour satisfaire cette demande et cliquer sur le bouton correspondant.";
            document.getElementById("precedent").hidden = false;
            document.getElementById("precedent").removeAttribute("class");
            document.getElementById("precedent").classList.add("boutonTuto2");
            document.getElementById("suivant").hidden = false;
            document.getElementById("suivant").removeAttribute("class");
            document.getElementById("suivant").classList.add("boutonTuto4");
            document.getElementById("page3").classList.add("active");
            document.getElementById("page2").classList.remove("active");
            document.getElementById("page1").classList.remove("active");
            document.getElementById("page4").classList.remove("active");
            document.getElementById("page5").classList.remove("active");
            document.getElementById("page6").classList.remove("active");
            document.getElementById("finTuto").hidden = true;
            document.getElementById("finirTuto").hidden = true;
        });
    }

    let boutons4 = document.getElementsByClassName("boutonTuto4");
    for(let i = 0; i < boutons4.length; ++i)
    { 
        boutons4[i].addEventListener("click", event =>
        {
            document.getElementById("titreTuto").innerHTML = "Les notifications de la Mairie";
            document.getElementById("phraseTuto").innerHTML = "<b>Attention!</b> Si tu vois un <b>gros point d'exclamation bleu</b> au dessus de la Mairie, c'est qu'il y a un soucis ! <br>Il te suffit alors de te rendre à la Mairie et de cliquer dessus pour afficher le panneau d'informations. <br>Pour chaque problème, il existe un endroit pour le résoudre qui sera indiqué par une <b>flèche rouge</b> : <br><br> - s'il n'y a plus de vélos à une station, va au Garage à vélos ;<br> - si le métro est en panne, direction l'Atelier ;<br> - s'il y a une panne de train, il faut se rendre au Technicentre ;<br> - s'il y a un embouteillage, le parking est la solution. <br><br><br> <b>Petit conseil</b> : ne laisse pas un imprévu non résolu trop longtemps. <br>Les 3 premiers t'empêche d'utiliser le moyen de transport concerné et en plus les 4 augmentent ta jauge de mécontentement !";
            document.getElementById("precedent").hidden = false;
            document.getElementById("precedent").removeAttribute("class");
            document.getElementById("precedent").classList.add("boutonTuto3");
            document.getElementById("suivant").hidden = false;
            document.getElementById("suivant").removeAttribute("class");
            document.getElementById("suivant").classList.add("boutonTuto5");
            document.getElementById("page4").classList.add("active");
            document.getElementById("page2").classList.remove("active");
            document.getElementById("page1").classList.remove("active");
            document.getElementById("page3").classList.remove("active");
            document.getElementById("page5").classList.remove("active");
            document.getElementById("page6").classList.remove("active");
            document.getElementById("finTuto").hidden = true;
            document.getElementById("finirTuto").hidden = true;
        });
    }

    let boutons5 = document.getElementsByClassName("boutonTuto5");
    for(let i = 0; i < boutons5.length; ++i)
    { 
        boutons5[i].addEventListener("click", event =>
        {
            document.getElementById("titreTuto").innerHTML = "Les badges du Kiosque";
            document.getElementById("phraseTuto").innerHTML = "Au Kiosque, une liste de badge à débloquer t'attend ! <br>Ce sont des petites missions facilent à réaliser comme par exemple chercher un objet dans CirCity. <br><br>Ces badges sont utiles pour augmenter ton score de fin de jeu et également pour baisser le niveau de la jauge de mécontentement. <br> Si cette dernière est trop élevée, débloquer quelques badges peut éviter la défaite !";
            document.getElementById("precedent").hidden = false;
            document.getElementById("precedent").removeAttribute("class");
            document.getElementById("precedent").classList.add("boutonTuto4");
            document.getElementById("suivant").hidden = false;
            document.getElementById("suivant").removeAttribute("class");
            document.getElementById("suivant").classList.add("boutonTuto6");
            document.getElementById("page5").classList.add("active");
            document.getElementById("page2").classList.remove("active");
            document.getElementById("page1").classList.remove("active");
            document.getElementById("page3").classList.remove("active");
            document.getElementById("page4").classList.remove("active");
            document.getElementById("page6").classList.remove("active");
            document.getElementById("finTuto").hidden = true;
            document.getElementById("finirTuto").hidden = true;
        });
    }

    let boutons6 = document.getElementsByClassName("boutonTuto6");
    for(let i = 0; i < boutons6.length; ++i)
    { 
        boutons6[i].addEventListener("click", event =>
        {
            document.getElementById("titreTuto").innerHTML = "Vu d'ensemble de CirCity";
            document.getElementById("phraseTuto").innerHTML = "SUPER MAP DETAILLEE TROP BELLE AVEC DES FLECHES";
            document.getElementById("precedent").hidden = false;
            document.getElementById("precedent").removeAttribute("class");
            document.getElementById("precedent").classList.add("boutonTuto5");
            document.getElementById("suivant").hidden = true;
            document.getElementById("page6").classList.add("active");
            document.getElementById("page2").classList.remove("active");
            document.getElementById("page1").classList.remove("active");
            document.getElementById("page4").classList.remove("active");
            document.getElementById("page3").classList.remove("active");
            document.getElementById("page5").classList.remove("active");
            document.getElementById("finTuto").hidden = true;
            document.getElementById("finirTuto").hidden = false;
        });
    }

    document.getElementById("finirTuto").addEventListener("click", event =>
    {
        document.getElementById("titreTuto").innerHTML = "Tu as toutes les cartes en main !";
        document.getElementById("phraseTuto").innerHTML = "Le tutoriel est terminé... Maintenant c'est à toi de jouer ! Accède au jeu pour vérifier que tu as bien tout compris à Choose&Go. Tu peux relire ce tutoriel à tout moment en cliquant sur l'icone en haut à droite.";
        document.getElementById("pagination").style.display = "none";
        document.getElementById("finTuto").hidden = false;
        document.getElementById("finirTuto").style.display = "none";
    });
}, 100);

document.getElementById("finTuto").addEventListener("click", event =>
{
    document.getElementById("tuto").style.display = 'none';
    document.getElementById("relireTuto").hidden = false;
    chrono.restart();
    chrono.continuer();
    socket.emit("initialisationLevel", 1);
});

document.getElementById("relireTuto").addEventListener("click", event =>
{
    chrono.mettrePause();
    document.getElementById("tuto").style.display = "block";
    document.getElementById("titreTuto").innerHTML = "But du jeu";
    document.getElementById("phraseTuto").innerHTML = "C'est l'heure de la sortie du travail à CirCity. Des salariés arrivent dans la rue, ils souhaitent se rendre à différents endroits de la vile (magasin, école, musée...). <br> Ta mission : leur indiquer le <b>meilleur moyen de transport</b> (en train, en métro, en vélo, à pied) pour leur déplacement. <br><br> Il faut que le choix soit rapide, n'ait pas trop d'attente tout en essayant de polluer le moins possible. <br>Si la demande n'est pas prise en compte assez rapidement, le salarié partira en voiture et donc polluera... <br> <br> Lorsque tous les salariés ont quitté le travail, tu as gagné ! Ton score apparaitra ainsi qu'un conseil écolo pour améliorer et optimiser tes déplacements dans la vraie vie ! <br>Mais attention 2 jauges peuvent te faire perdre la partie : <br> - La <b>jauge de pollution</b> dont le niveau augmente si un salarié part en voiture, si un train part presque vide et il diminue si un salarié se déplace à pied. <br> - La <b>jauge de mécontentement</b> se remplie si ton choix de transport n'est pas en adéquation avec la demande (trop d'attente, trop long, trop polluant), si les imprévus (tutoriel page 3) ne sont pas résolus assez vite et elle se vide si tu remportes des badges (tutoriel page 4). <br><br><br> A toi de jouer pour lutter contre la pollution des transports !";
    document.getElementById("precedent").hidden = true;
    document.getElementById("suivant").hidden = false;
    document.getElementById("suivant").removeAttribute("class");
    document.getElementById("suivant").classList.add("boutonTuto2");
    document.getElementById("page1").classList.add("active");
    document.getElementById("page2").classList.remove("active");
    document.getElementById("page3").classList.remove("active");
    document.getElementById("page4").classList.remove("active");
    document.getElementById("page5").classList.remove("active");
    document.getElementById("page6").classList.remove("active");
    document.getElementById("finTuto").hidden = true;
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("relireTuto").hidden = true;
    document.getElementById("closeTuto").hidden = false;
});

document.getElementById("closeTuto").addEventListener("click", event =>
{
    document.getElementById("relireTuto").hidden = false;
    document.getElementById("closeTuto").hidden = true;
    document.getElementById("tuto").style.display = "none";
    chrono.continuer();
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

let nbSecondsPersonne = 0;
let nbVoituresMax = 0;
let pollutionMax = 0;
let pasContentMax = 0;

socket.on("initialisationViewLevel", (numeroLevel, secondsPersonne, voituresMax, polluMax, mecontentMax) => {
    nbSecondsPersonne = secondsPersonne;
    nbVoituresMax = voituresMax;
    pollutionMax = polluMax;
    pasContentMax = mecontentMax;
    personnesDansLeTrain = 0;
    scoreVoiture = 0;
    scoreHumeur = 0;
    barVoiture.style.width = 0;
    barHumeur.style.width = 0;
    mixer.timeScale = 0.95;
    document.getElementById("level").style.display = "none";
    document.getElementById("jauges").style.display = "block";
    document.getElementById("pause").hidden = false;
    document.getElementById("HUD").hidden = false;
});

document.getElementById("pause").addEventListener("click", event =>
{
    document.getElementById("menuPause").style.display = 'block';
    document.getElementById("pause").hidden = true;
    mixer.timeScale = 0.95;
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
    mixer.timeScale = 0.95;
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
    document.getElementById("jauges").style.display = 'none';
    document.getElementById("alerteQuit").style.display = 'none';
    socket.emit("QuitterJeu");
    mixer.setTime(0);
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
    if(idlevel == 0)
    {
        document.getElementById("relireTuto").hidden = false;
    }
    socket.emit("initialisationLevel", idlevel);
});

/*** Alertes ***/

/*** Mairie ***/

socket.on("afficheFlechePanne", (str) => {
    scene.getObjectByName(str).visible = true;
});

socket.on("pauseAnimationTrain", () => {
    mixer.timeScale = 0.95;
});

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
    document.getElementById('information').style.display = 'block';
});

document.getElementById('cancel').addEventListener("click", event => 
{
    document.getElementById('information').style.display = 'none';
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
    document.getElementById("jeuTechnicentreReussi").hidden = true;
    document.getElementById("probTrain").hidden = true;
});

socket.on("RepTrain", () => { 
    document.getElementById("parfait").hidden = true;
    document.getElementById("jeuTechnicentreReussi").hidden = true;
    document.getElementById("probTrain").hidden = false;
});

document.getElementById('croix').addEventListener("click", event => 
{
    document.getElementById('reparationTrain').style.display='none';
    console.log("Nous avons quitté le Technicentre");
});

/*** Mini-Jeu Technicentre ***/
const draggableElementsT = document.querySelectorAll(".draggableT");
const droppableElementsT = document.querySelectorAll(".droppableT");
let scoreT = 0;

draggableElementsT.forEach(elem => {
  elem.addEventListener("dragstart", dragStartT);
});

droppableElementsT.forEach(elem => {
  elem.addEventListener("dragenter", dragEnterT);
  elem.addEventListener("dragover", dragOverT);
  elem.addEventListener("dragleave", dragLeaveT);
  elem.addEventListener("drop", dropT); 
});

function dragStartT(event) {
    event.dataTransfer.setData("text", event.target.id); 
}

function dragEnterT(event) {
    event.target.classList.add("droppableT-hover");
}

function dragOverT(event) {
    event.preventDefault();
}

function dragLeaveT(event) {
    event.target.classList.remove("droppableT-hover");
}

function dropT(event) {
    event.preventDefault(); 
    event.target.classList.remove("droppableT-hover");
    let draggableElementDataT = event.dataTransfer.getData("text");
    let draggableElementT = document.getElementById(draggableElementDataT);
    draggableElementT.classList.add("draggedT"); 
    scoreT++;
  
    if(scoreT == 4) {
        console.log("Nous avons réparé le train.");
        technicentreReset();
        document.getElementById("miniJeuTechnicentre").style.display = "none";
        document.getElementById("reparationTrain").style.display = "block";
        document.getElementById("probTrain").hidden = true;
        document.getElementById("jeuTechnicentreReussi").hidden = false;
        mixer.timeScale = 0.95;
        scene.getObjectByName("flecheTechnicentre").visible = false;
        socket.emit("trainRepare");
    }
}

function technicentreReset()
{
    scoreT = 0;
    let elementsDraggableT = document.getElementsByClassName("draggableT");
    for(let i = 0; i < elementsDraggableT.length; ++i)
    {
        elementsDraggableT[i].classList.remove("draggedT");
    }
}

document.getElementById("trainRepare").addEventListener("click", event =>
{
    document.getElementById("miniJeuTechnicentre").style.display = "block";
    document.getElementById("reparationTrain").style.display = "none";
});

document.getElementById("technicentreClose").addEventListener("click", event =>
{
    technicentreReset();
    document.getElementById("miniJeuTechnicentre").style.display = "none";
});

/*** Parking ***/

socket.on("Embouteillage", () => {
    document.getElementById("joie").hidden = true;
    document.getElementById("jeuParkingReussi").hidden = true;
    document.getElementById("probVoiture").hidden = false;
});

socket.on("noEmbouteillage", () =>{
    document.getElementById("joie").hidden = false;
    document.getElementById("jeuParkingReussi").hidden = true;
    document.getElementById("probVoiture").hidden = true;
});
 
document.getElementById('fermer').addEventListener("click", event => 
{ 
    document.getElementById('reparationVoiture').style.display='none';
    console.log("Nous avons quitté le Parking.");
});

/*** Mini-jeu Parking ***/
let scoreP = 0;
const draggableElementsP = document.querySelectorAll(".draggableP");
const droppableElementsP = document.querySelectorAll(".droppableP");

draggableElementsP.forEach(elem => {
    elem.addEventListener("dragstart", dragStartP);
});

droppableElementsP.forEach(elem => {
    elem.addEventListener("dragenter", dragEnterP); 
    elem.addEventListener("dragover", dragOverP);
    elem.addEventListener("dragleave", dragLeaveP); 
    elem.addEventListener("drop", dropP);
});

function dragStartP(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragEnterP(event) {
    if(!event.target.classList.contains("droppedP")) {
        event.target.classList.add("droppableP-hover");
    }
}

function dragOverP(event) {
    if(!event.target.classList.contains("droppedP")) {
        event.preventDefault();
    }
}

function dragLeaveP(event) {
    if(!event.target.classList.contains("droppedP")) {
        event.target.classList.remove("droppableP-hover");
    }
}

function dropP(event) {

    event.preventDefault();
    event.target.classList.remove("droppableP-hover");
    let draggableElementDataP = event.dataTransfer.getData("text");
    let droppableElementDataP = event.target.getAttribute("data-draggable-id");
    let isCorrectMatchingP = draggableElementDataP === droppableElementDataP;

    if(isCorrectMatchingP) {
        let draggableElementP = document.getElementById(draggableElementDataP);
        event.target.classList.add("droppedP");
        draggableElementP.classList.add("draggedP");
        draggableElementP.setAttribute("draggable", "false");
        event.target.innerHTML= `<img class="${draggableElementDataP}" src="./pictures/${draggableElementDataP}.png" alt="jaune">`;
        scoreP++;
    }

    if(scoreP == 4) {
        console.log("Nous avons fludifié le trafic.");
        parkingReset();
        document.getElementById("miniJeuParking").style.display = "none";
        document.getElementById("reparationVoiture").style.display = "block";
        document.getElementById("probVoiture").hidden = true;
        document.getElementById("jeuParkingReussi").hidden = false;
        scene.getObjectByName("flecheParking").visible = false;
        socket.emit("traficFluide");
    }
}

document.getElementById("traficOk").addEventListener("click", event =>
{
    document.getElementById("miniJeuParking").style.display = "block";
    document.getElementById("reparationVoiture").style.display = "none";
    parkingReset();
});

function parkingReset()
{
    scoreP = 0;
    let elementsDroppableP = document.getElementsByClassName("droppableP");
    for(let i = 0; i < elementsDroppableP.length; ++i)
    {
        elementsDroppableP[i].classList.remove("droppedP");
        elementsDroppableP[i].innerHTML = "<span></span>";
    }
    let elementsDraggableP = document.getElementsByClassName("draggableP");
    for(let i = 0; i < elementsDraggableP.length; ++i)
    {
        elementsDraggableP[i].classList.remove("draggedP");
        elementsDraggableP[i].draggable = true;
    }
}

document.getElementById("parkingClose").addEventListener("click", event =>
{
    parkingReset();
    document.getElementById("miniJeuParking").style.display = "none";
});

/*** Garage ***/

socket.on("probVelo", () => {
    document.getElementById("noStress").hidden = true;
    document.getElementById("jeuGarageReussi").hidden = true;
    document.getElementById("probVelo").hidden = false;
});

socket.on("noProbVelo", () =>{
    document.getElementById("noStress").hidden = false;
    document.getElementById("jeuGarageReussi").hidden = true;
    document.getElementById("probVelo").hidden = true;
});
 
document.getElementById('quitter').addEventListener("click", event => 
{ 
    document.getElementById('stockVelo').style.display='none';
    console.log("Nous avons quitté le garage.");
});


/*** Mini-Jeu Garage ***/
const draggableElementsG = document.querySelectorAll(".draggableG");
const droppableElementsG = document.querySelectorAll(".droppableG");

let rouge = 0;
let bleu = 0;
let jaune = 0;
let vert = 0;

draggableElementsG.forEach(elem => {
    elem.addEventListener("dragstart", dragStartG);
});

droppableElementsG.forEach(elem => {
    elem.addEventListener("dragenter", dragEnterG); 
    elem.addEventListener("dragover", dragOverG); 
    elem.addEventListener("dragleave", dragLeaveG); 
    elem.addEventListener("drop", dropG);
});

function dragStartG(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragEnterG(event) {
    if(!event.target.classList.contains("droppedG")) {
        event.target.classList.add("droppableG-hover");
    }
}

function dragOverG(event) {
    if(!event.target.classList.contains("droppedG")) {
        event.preventDefault();
    }
}

function dragLeaveG(event) {
    if(!event.target.classList.contains("droppedG")) {
        event.target.classList.remove("droppableG-hover");
    }
}

function dropG(event) {
    event.preventDefault(); 
    event.target.classList.remove("droppableG-hover");
    const draggableElementDataG = event.dataTransfer.getData("text");
    const droppableElementDataG = event.target.getAttribute("data-draggable-id");
    const isCorrectMatchingG = draggableElementDataG === droppableElementDataG;
    if(isCorrectMatchingG) {
        const draggableElementG = document.getElementById(draggableElementDataG);
        switch (draggableElementDataG) {
            case 'roueRouge':
            rouge ++;
            if(rouge == 1){
                draggableElementG.classList.add("draggedG");
                draggableElementG.draggable = false;
            } else if (rouge == 2) {
            document.getElementsByClassName('aledRouge')[0].classList.add("draggedG");
        }
        break;
        case 'roueBleu':
            bleu ++;
            if(bleu == 1){
                draggableElementG.classList.add("draggedG");
                draggableElementG.draggable = false;
            } else if (bleu == 2) {
            document.getElementsByClassName('aledBleu')[0].classList.add("draggedG");
            }
        break;
        case 'roueJaune':
            jaune ++;
            if(jaune == 1){
                draggableElementG.classList.add("draggedG");
                draggableElementG.draggable = false;
            } else if (jaune == 2) {
                document.getElementsByClassName('aledJaune')[0].classList.add("draggedG");
            }
        break;
        case 'roueVert':
            vert ++;
            if(vert == 1){
                draggableElementG.classList.add("draggedG");
                draggableElementG.draggable = false;
            } else if (vert == 2) {
                document.getElementsByClassName('aledVert')[0].classList.add("draggedG");
            }
            break;
        }
        event.target.classList.add("droppedG");
        draggableElementG.setAttribute("draggableG", "false");
        event.target.insertAdjacentHTML("afterbegin", `<img class="${draggableElementDataG} draggableG" draggable="true" src="./pictures/${draggableElementDataG}.png" id="${draggableElementDataG}" width="90" height="90">`);
    
        if(rouge == 2 && bleu == 2 && vert == 2 && jaune == 2)
        {
            console.log("Nous avons remis des vélos.");
            garageReset();
            document.getElementById("miniJeuGarage").style.display = 'none';
            document.getElementById("stockVelo").style.display = 'block';
            document.getElementById("jeuGarageReussi").hidden = false;
            document.getElementById("probVelo").hidden = true;
            scene.getObjectByName("flecheGarage").visible = false;
            socket.emit("stockRempli");
        }
    }
}

function garageReset()
{
    rouge = 0; 
    bleu = 0;
    vert = 0;
    jaune = 0;
    let elementsDraggableG = document.getElementsByClassName("draggableG");
    for(let i = 0; i < elementsDraggableG.length; ++i)
    {
        elementsDraggableG[i].classList.remove("draggedG");
        elementsDraggableG[i].draggable = true;
    }
    let elementsDroppableG = document.getElementsByClassName("droppableG");
    for(let i = 0; i < elementsDroppableG.length; ++i)
    {
        elementsDroppableG[i].classList.remove("droppedG");
        elementsDroppableG[i].innerHTML = "";
    }
}

document.getElementById("veloRempli").addEventListener("click", event =>
{
    document.getElementById("miniJeuGarage").style.display = 'block';
    document.getElementById("stockVelo").style.display = "none";
});

document.getElementById("garageClose").addEventListener("click", event =>
{
    garageReset();
    document.getElementById("miniJeuGarage").style.display = 'none';
});

/*** Atelier ***/

socket.on("probMetro", () => {
    document.getElementById("relax").hidden = true;
    document.getElementById("jeuAtelierReussi").hidden = true;
    document.getElementById("probMetro").hidden = false;
});

socket.on("noProbMetro", () =>{
    document.getElementById("relax").hidden = false;
    document.getElementById("jeuAtelierReussi").hidden = true;
    document.getElementById("probMetro").hidden = true;
});

/*** Mini-jeu Atelier ***/

let couleurBleu = "#4A4EFC";
let couleurVert = "#659b41";
let couleurJaune = "#ffcf33";
let couleurRouge = "#FE0000";
let epaisseur = 15;
let painting = false;
let debutX, debutY, finX, finY;
let cable;
let cableRouge;
let cableBleu;
let cableJaune;
let cableVert;

document.getElementById("metroRepare").addEventListener("click", event =>
{
    document.getElementById("miniJeuAtelier").style.display = "block";
    document.getElementById("reparationMetro").style.display = "none";
    
    const canvas = document.querySelector('#canvas');
    const contexte = canvas.getContext('2d');

    cableRouge = false;
    cableBleu = false;
    cableJaune = false;
    cableVert = false;

    canvas.height = 725;
    canvas.width = 810;

    function startPosition(e) {
        painting = true;
        debutX = e.clientX;
        debutY = e.clientY;
    }

    function finishedPosition(e) {
        painting = false;
        finX = e.clientX;
        finY = e.clientY;

        if (finX > 1265 && finX < 1370) {
            if(cable == 'rouge' && finY > 765 && finY < 835) {
                cableRouge = true;
            }
            else if(cable == 'bleu' && finY > 550 && finY < 615) {
                cableBleu = true;
            }
            else if(cable == 'jaune' && finY > 130 && finY < 190) {
                cableJaune = true;
            }
            else if(cable == 'vert' && finY > 340 && finY < 400) {
                cableVert = true;
            }
        }
        
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
            console.log("Nous avons réparé le métro");
            cableRouge = false;
            cableVert = false;
            cableBleu = false;
            cableJaune = false;
            document.getElementById("miniJeuAtelier").style.display = "none";
            document.getElementById("reparationMetro").style.display = "block";
            document.getElementById("probMetro").hidden = true;
            document.getElementById("jeuAtelierReussi").hidden = false;
            socket.emit("metroRepare");
            scene.getObjectByName("flecheAtelier").visible = false;
        }
        contexte.beginPath();
    }

    function debutDraw(e) {
        if(!painting) return;
        contexte.lineWidth = epaisseur;
        contexte.lineCap = 'round';

        if (debutX > 555 && debutX < 630) {
            if( !cableRouge && debutY > 130 && debutY < 190) {
                contexte.strokeStyle = couleurRouge;
                suiteDraw(e, 'rouge');
            }
            else if(!cableBleu && debutY > 340 && debutY < 410) {
                contexte.strokeStyle = couleurBleu;
                suiteDraw(e, 'bleu');
            }
            else if(!cableJaune && debutY > 550 && debutY < 615) {
                contexte.strokeStyle = couleurJaune;
                suiteDraw(e, 'jaune');
            }
            else if(!cableVert && debutY > 765 && debutY < 835) {
                contexte.strokeStyle = couleurVert;
                suiteDraw(e, 'vert');
            }
        }   
    }

    function suiteDraw(e, fil) {
        cable = fil;
        contexte.lineTo(e.clientX -555, e.clientY-110);
        contexte.stroke();
        contexte.beginPath();
        contexte.moveTo(e.clientX -555, e.clientY-110);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', debutDraw);
});

document.getElementById("atelierClose").addEventListener("click", event =>
{
    cableRouge = false;
    cableVert = false;
    cableBleu = false;
    cableJaune = false;
    document.getElementById("miniJeuAtelier").style.display = "none";
});
 
document.getElementById('partir').addEventListener("click", event => 
{ 
    document.getElementById('reparationMetro').style.display='none';
    console.log("Nous avons quitté l'atelier.");
});

/*** Gare ***/

socket.on("HoraireTrain", (temps, attente, panne) =>
{
    if(panne)
    {
        document.getElementById("prochainTrain").hidden = true;
        document.getElementById("trainEnGare").hidden = true;
        document.getElementById("attenteTrain").hidden = false;
    }
    else
    {
        if(temps == 0)
        {
            document.getElementById("tempsTrainAttente").innerHTML = attente;
            document.getElementById("prochainTrain").hidden = true;
            document.getElementById("trainEnGare").hidden = false;
            document.getElementById("attenteTrain").hidden = true;
        }
        else
        {
            if(temps == 15 && (chrono.heure != 16 || chrono.minute != 0))
            {
                if(personnesDansLeTrain == 0)
                {
                    calcul = Math.round((100 / nbVoituresMax * 20) / 50);
                    document.getElementById("calculVoiture").innerHTML = '+' + calcul;
                    document.getElementById("calculVoiture").style.color = "red";
                    document.getElementById("calculVoiture").style.visibility = "visible";
                    document.getElementById("calculVoiture").classList.add("augmenteJauge");
                    setTimeout(function()
                    {
                        document.getElementById("calculVoiture").style.visibility = "hidden";
                        document.getElementById("calculVoiture").classList.remove("augmenteJauge");
                    }, 2000);
                    scoreVoiture += calcul;
                    if(scoreVoiture > 100)
                    {
                        scoreVoiture = 100;
                    }
                    console.log("scoreVoiture après train vide parti : ", scoreVoiture);
                    barVoiture.style.width = scoreVoiture + '%';
                }
                personnesDansLeTrain = 0;
            }
            document.getElementById("tempsTrainArrive").innerHTML = temps;
            document.getElementById("prochainTrain").hidden = false;
            document.getElementById("trainEnGare").hidden = true;
            document.getElementById("attenteTrain").hidden = true;
        }
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


socket.on("AfficheDestination", (depart,destination, idPerso, panneTrain, panneMetro, manqueVelo) => 
{
    clearInterval(intervalPerson);
    RemoveFlecheTransport()
    DisplayFlecheTransport(depart);
    removeFlecheDest();
    console.log(destination);
    scene.getObjectByName(destination).visible = true;
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

let scoreVoiture = 0;
let scoreHumeur = 0;
let barVoiture = document.getElementById("barVoiture");
let barHumeur = document.getElementById("barHumeur");
let calcul = 0;

socket.on("PersonneDisparait", (idPersonne, personne, louper) =>
{
    RemoveFlecheTransport();
    removeFlecheDest();
    suppPersonne(personne);
    if(louper)
    {
        console.log(nbVoituresMax);
        calcul = Math.round(100 / nbVoituresMax);
        document.getElementById("calculVoiture").innerHTML = '+' + calcul;
        document.getElementById("calculVoiture").style.color = "red";
        document.getElementById("calculVoiture").style.visibility = "visible";
        document.getElementById("calculVoiture").classList.add("augmenteJauge");
        setTimeout(function()
        {
            document.getElementById("calculVoiture").style.visibility = "hidden";
            document.getElementById("calculVoiture").classList.remove("augmenteJauge");
        }, 2000);
        scoreVoiture += calcul;
        if(scoreVoiture > 100)
        {
            scoreVoiture = 100;
        }
        barVoiture.style.width = scoreVoiture + '%';
        console.log("scoreVoiture après voiture envoyé : ", scoreVoiture);
        calcul = Math.round(30 / pasContentMax * 100);
        document.getElementById("calculHumeur").innerHTML = '+' + calcul;
        document.getElementById("calculHumeur").style.color = "red";
        document.getElementById("calculHumeur").style.visibility = "visible";
        document.getElementById("calculHumeur").classList.add("augmenteJauge");
        setTimeout(function()
        {
            document.getElementById("calculHumeur").style.visibility = "hidden";
            document.getElementById("calculHumeur").classList.remove("augmenteJauge");
        }, 2000);
        scoreHumeur += calcul;
        if(scoreHumeur > 100)
        {
            scoreHumeur = 100;
        }
        barHumeur.style.width = scoreHumeur + '%';
        console.log("scoreHumeur après voiture envoyé : ", scoreHumeur);
    }
    if(personne.fenetre == true &&  document.getElementsByClassName("personne content").id == idPersonne) {
        if(louper == true) {
            console.log(louper,"trop taaaar");
        }
        else {
            console.log(louper,"Envoyer");
        }
        
        document.getElementById('DestinationPersonne').style.display='none';
        clearInterval(intervalPerson);
    }
});

let personnesDansLeTrain = 0;

document.getElementById("transport").addEventListener("click", event =>
{
    let typeTransport = event.target.id;
    if(typeTransport == "transportVelo")
    {
        socket.emit("DiminueVelo", document.getElementsByClassName("personne content").id);
    }
    if(typeTransport == "transportPied")
    {
        if(scoreVoiture >= Math.round((100 / nbVoituresMax * 10) / 50))
        {
            calcul = Math.round((100 / nbVoituresMax * 10) / 50);
            document.getElementById("calculVoiture").innerHTML = '-' + calcul;
            document.getElementById("calculVoiture").style.color = "green";
            document.getElementById("calculVoiture").style.visibility = "visible";
            document.getElementById("calculVoiture").classList.add("augmenteJauge");
            setTimeout(function()
            {
                document.getElementById("calculVoiture").style.visibility = "hidden";
                document.getElementById("calculVoiture").classList.remove("augmenteJauge");
            }, 2000);
            scoreVoiture -= calcul;
            console.log("scoreVoiture après avoir choisi pied : ", scoreVoiture);
            barVoiture.style.width = scoreVoiture + '%';
        }
    }
    if(typeTransport == "transportTrain")
    {
        personnesDansLeTrain += 1;
    }
    document.getElementById('DestinationPersonne').style.display = 'none';
    clearInterval(intervalPerson);
    socket.emit("GetMove", document.getElementsByClassName("personne content").id, typeTransport);
    socket.emit("SupprimePersonne", document.getElementsByClassName("personne content").id);
});

socket.on("Choix", move =>
{
    if(move == 4)
    {
        calcul = Math.round(30 / pasContentMax * 100);
        document.getElementById("calculHumeur").innerHTML = '+' + calcul;
        document.getElementById("calculHumeur").style.color = "red";
        document.getElementById("calculHumeur").style.visibility = "visible";
        document.getElementById("calculHumeur").classList.add("augmenteJauge");
        setTimeout(function()
        {
            document.getElementById("calculHumeur").style.visibility = "hidden";
            document.getElementById("calculHumeur").classList.remove("augmenteJauge");
        }, 2000);
        scoreHumeur += calcul;
        if(scoreHumeur > 100)
        {
            scoreHumeur = 100;
        }
        console.log("scoreHumeur après 4e choix : ", scoreHumeur);
        barHumeur.style.width = scoreHumeur + '%';
    }
    if(move == 3)
    {
        calcul = Math.round(10 / pasContentMax * 100);
        document.getElementById("calculHumeur").innerHTML = '+' + calcul;
        document.getElementById("calculHumeur").style.color = "red";
        document.getElementById("calculHumeur").style.visibility = "visible";
        document.getElementById("calculHumeur").classList.add("augmenteJauge");
        setTimeout(function()
        {
            document.getElementById("calculHumeur").style.visibility = "hidden";
            document.getElementById("calculHumeur").classList.remove("augmenteJauge");
        }, 2000);
        scoreHumeur += calcul;
        if(scoreHumeur > 100)
        {
            scoreHumeur = 100;
        }
        console.log("scoreHumeur après 3e choix : ", scoreHumeur);
        barHumeur.style.width = scoreHumeur + '%';
    }
});

document.getElementById('aplus').addEventListener("click", event => 
{ 
    document.getElementById('DestinationPersonne').style.display = 'none';
    clearInterval(intervalPerson);
});

socket.on("Finito", () =>
{
    chrono.mettrePause();
    let fenetres = document.getElementsByClassName("fenetre");
    for(let i = 0; i < fenetres.length; ++i)
    {
        fenetres[i].style.display = "none";
    }
    document.getElementById("gameOver").style.display = "block";
    if(scoreVoiture < 100 && scoreHumeur < 100)
    {
        document.getElementById("result").innerHTML = "gagné";
    }
    else
    {
        document.getElementById("result").innerHTML = "perdu";
    }
});

/*** Menu volume ***/

var slider = document.getElementById("myRange");
var output = document.getElementById("value");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
} 

function activeOmbre() {
    light.castShadow = true;
    scene.add(light);
}

function desactiveOmbre() {
    light.castShadow = false;
}

function ajoutPersonne(personne) {
    console.log(personne.depart);
    scene.getObjectByName(personne.depart).visible = true;
}

function suppPersonne(personne) {
    scene.getObjectByName(personne.depart).visible = false;
}

function  removeFlecheDest() {
    scene.getObjectByName("Ecole").visible = false;
    scene.getObjectByName("Campagne").visible = false;
    scene.getObjectByName("Magasins").visible = false;
    scene.getObjectByName("Musee").visible = false;
    scene.getObjectByName("Parc").visible = false;
    scene.getObjectByName("Restaurant").visible = false;
    scene.getObjectByName("Stade").visible = false;
}

function DisplayFlecheTransport(depart) {
    scene.getObjectByName("flecheGare").visible = true;
    let tab = depart.split(".");
    console.log(tab);
    if((tab[0] == "0") && (tab[1] == "7")) {
        console.log("iciii1");
        scene.getObjectByName("flecheVelo2").visible = true;
        scene.getObjectByName("flecheMetro1").visible = true;
    }
    else if((tab[0] == "1") && (tab[1] == "7")) {
        console.log("iciii2");
        scene.getObjectByName("flecheVelo1").visible = true;
        scene.getObjectByName("flecheMetro1").visible = true;
    }
    else if((tab[0] == "1") && (tab[1] == "8")) {
        console.log("iciii3");
        scene.getObjectByName("flecheVelo1").visible = true;
        scene.getObjectByName("flecheMetro1").visible = true;
    }
    else if((tab[0] == "1") && (tab[1] == "9")) {
        console.log("iciii4");
        scene.getObjectByName("flecheVelo1").visible = true;
        scene.getObjectByName("flecheMetro1").visible = true;
    }
    else {
        console.log("iciii");
        scene.getObjectByName("flecheVelo1").visible = true;
        scene.getObjectByName("flecheMetro3").visible = true;
    }
}

function RemoveFlecheTransport() {
    scene.getObjectByName("flecheGare").visible = false;
    scene.getObjectByName("flecheMetro1").visible = false;
    scene.getObjectByName("flecheMetro3").visible = false;
    scene.getObjectByName("flecheVelo1").visible = false;
    scene.getObjectByName("flecheVelo2").visible = false;
}