class Level {

    constructor(city, personnes) {
        this.numLevel=0;
        this.city = city;
        this.personnes = personnes;
        //this.transport = new Transport(/*A voir*/)


        /*A voir*/

    }

    InitalisationLevel(numerosLevel)
    {
        this.numLevel = numerosLevel;
    }

    reset()
    {
        this.numLevel=0;
        this.city.reset();
    }

}

module.exports = Level;