const Atelier = require("./Atelier");
const Garage = require("./Garage");
const Kiosque = require("./Kiosque");
const Mairie = require("./Mairie");
const Parking = require("./Parking");
const Technicentre = require("./Technicentre");
const Stade = require("./Stade");
const Parc = require("./Parc");
const Magasins = require("./Magasins");
const Ecole = require("./Ecole");
const Musee = require("./Musee");
const Restaurant = require("./Restaurant");
const Campagne = require("./Campagne");
const Gare = require("./gare");
const StationMetro = require("./StationMetro");
const StationVelo = require("./StationVelo");

class City {
    constructor() {
        this.atelier = new Atelier();
        this.garage = new Garage();
        this.kiosque = new Kiosque();
        this.mairie = new Mairie();
        this.parking = new Parking();
        this.technicentre = new Technicentre();
        this.stade = new Stade();
        this.parc = new Parc();
        this.magasins = new Magasins();
        this.ecole = new Ecole();
        this.musee = new Musee();
        this.restaurant = new Restaurant();
        this.campagne = new Campagne();
        this.gares = []
        let gare;
        /*Initialisation des 4 gares*/
        for(let i = 0; i < 4; ++i) {
            gare = new Gare();
            this.gares.push(gare);
        }

        this.stationsMetro = [];
        let stationMetro;
        /*Initialisation des 10 stations de métro */
        for(let k = 0; k < 10; ++k) {
            stationMetro = new StationMetro();
            this.stationsMetro.push(stationMetro);
        }
        this.stationsMetro[0].temps = 2;
        this.stationsMetro[9].temps = 7

        /*Initialisation des 20 stations de vélo */
        this.stationsVelo = [];
        let stationVelo;
        for(let j = 0; j < 20; ++j) {
            stationVelo = new StationVelo();
            this.stationsVelo.push(stationVelo);
        }
        this.stationsVelo[0].velosLibre = 5;
        this.stationsVelo[2].velosLibre = 7;
    }
}

module.exports = City;