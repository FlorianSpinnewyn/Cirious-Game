const City = require("./city");

class Level {

    constructor() {
        this.numLevel = 0;
        this.city = new City();
        this.personnes = [];
        this.nbPersonnes=0;
        this.nbVoituresMax=0;
        this.nbSecondsPersonne=0;
        this.nbBadges=0;
        this.nbEvenements=0;
        this.pasContentMax=0;
        this.pollutionMax=0;
        /*A voir*/
    }

    /**
    * Initialise les variables d'un niveaux lorsque le joueur le commence
    * @param { int } numerosLevel = numéro du niveau
    * @param { personnes } personnes = tableaux des personnes a deplace durant le niveaux initialisé préalablement
    * @param { int } nbPersonnes_ = nombre de personnes a deplacé
    * @param { int } nbVoituresMax_ = nombre de voitures max avant de perdre
    * @param { int } nbSecondsPersonne_ = nombre de secondes avant que le joueur prend ca voiture
    * @param { int } nbBadges_ = nombre de badge a trouver
    * @param { int } nbEvenements_ = nombre d'évenements durant la partie
    * @param { int } pasContentMax_ = nombre de point max pour la jauge de mecontentement
    * @param { int } pollutionMax_ = nombre de point max pour la jauge de pollution
    */
    initalisationLevel(numerosLevel, nbPersonnes_, nbVoituresMax_,nbSecondsPersonne_,nbBadges_,nbEvenements_,pasContentMax_,pollutionMax_)
    {
        this.numLevel = numerosLevel;
        this.nbPersonnes = nbPersonnes_;
        this.nbVoituresMax=nbVoituresMax_;
        this.nbSecondsPersonne=nbSecondsPersonne_;
        this.nbBadges=nbBadges_;
        this.nbEvenements=nbEvenements_;
        this.pasContentMax=pasContentMax_;
        this.pollutionMax=pollutionMax_;
    }



    reset()
    {
        this.numLevel = 0;
        this.personnes = [];
        this.city.atelier.reset();
        this.city.garage.reset();
        this.city.technicentre.reset();
        this.city.parking.reset();
        this.city.mairie.reset();
    }
}

module.exports = Level;