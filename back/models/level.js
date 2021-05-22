const City = require("./city");

class Level {
    constructor() {
        this.numLevel = 0;
        this.city = new City();
        this.personnes = [];
        this.nbPersonnes = 0;
        this.nbVoituresMax = 0;
        this.nbSecondsPersonne = 0;
        this.nbBadges = 0;
        this.nbEvenements = 0;
        this.pasContentMax = 0;
        this.pollutionMax = 0;
        this.personnesEnvoye = 0;
        this.personnesApparu = 0;
        this.tabEvenement = [];
        this.personneVoiture = 0;
    }

    /**
    * Initialise les variables d'un niveaux lorsque le joueur le commence
    * @param { int } numerosLevel = numéro du niveau
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
        this.nbVoituresMax = nbVoituresMax_;
        this.nbSecondsPersonne = nbSecondsPersonne_;
        this.nbBadges = nbBadges_;
        this.nbEvenements = nbEvenements_;
        this.pasContentMax = pasContentMax_;
        this.pollutionMax = pollutionMax_;
        let inter = (this.nbPersonnes/this.nbEvenements)-2;
        for(let i = 0;i<this.nbEvenements;i++){
            this.tabEvenement.push((i+1)*inter);
        }
        console.log(this.tabEvenement);
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
        this.personnesEnvoye = 0;
        this.personnesApparu = 0;
        this.city.gares[0].temps = 15;
        this.city.gares[1].temps = 30;
        this.city.gares[2].temps = 45;
        this.city.gares[3].temps = 60;
        this.city.gares[0].attente = 7;
        this.city.gares[1].attente = 7;
        this.city.gares[2].attente = 7;
        this.city.gares[3].attente = 7;
        this.city.stationsMetro[0].temps = 2;
        this.city.stationsMetro[9].temps = 7;
        this.city.stationsVelo[0].velosLibre = 24;
        this.city.stationsVelo[2].velosLibre = 17;
    }
}

module.exports = Level;