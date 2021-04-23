class Mairie {
    constructor()
    {
        this.panneMetro = false;
        this.panneTrain = false;
        this.manqueVelo = false;
        this.embouteillage = false;
        this.x = -10;
        this.z = -13;
    }

    evenementTrain() 
    {
        let isPanneTrain = Math.floor(Math.random() * 3);
        if(isPanneTrain == 1)
        {
            this.panneTrain = true;
        }
    }

    evenementMetro() 
    {
        let isPanneMetro = Math.floor(Math.random() * 2);
        if(isPanneMetro == 1)
        {
            this.panneMetro = true;
        }
    }

    evenementEmbouteillage()
    {
        this.embouteillage = true;
    }

    evenementVelo()
    {
        this.manqueVelo = true;
    }

    reset()
    {
        this.panneMetro = false;
        this.panneTrain = false;
        this.manqueVelo = false;
        this.embouteillage = false;
    }
}

module.exports = Mairie;