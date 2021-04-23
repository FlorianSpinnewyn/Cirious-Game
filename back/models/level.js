const City = require("./city");

class Level {

    constructor() {
        this.numLevel = 0;
        this.city = new City();
        this.personnes = [];
        /*A voir*/
    }

    initalisationLevel(numerosLevel, personnes)
    {
        this.numLevel = numerosLevel;
        this.personnes = personnes;
        //this.transport = new Transport(/*A voir*/)
    }

    reset()
    {
        this.numLevel = 0;
        this.personnes = [];
    }
}

module.exports = Level;