class City {

    constructor(mairie, kiosque, technicentre, parking, garage, atelier, gare, stationsVelo, stationsMetro) {
        this.atelier = atelier;
        this.garage = garage;
        this.kiosque = kiosque;
        this.mairie = mairie;
        this.parking = parking;
        this.technicentre = technicentre;
        this.gares = [];
        this.stationsVelo = [];
        this.stationsMetro = [];

        /*Initialisation des 4 gares*/
        for(let i = 0; i<20;i++) {
            this.gares.push(gare);
        }

        /*Initialisation des 20 stations de vélo */
        for(let j = 0; j<20;j++) {
            this.stationsVelo.push(stationsVelo);
        }

        /*Initialisation des 10 stations de métro */
        for(let k = 0; k<4;k++) {
            this.stationsMetro.push(stationsMetro);
        }
    }

    reset() {
        this.atelier.reset();
        this.garage.reset();
        this.kiosque.reset();
        this.mairie.reset();
        this.parking.reset();
        this.technicentre.reset();
    }
    
}

module.exports = City;