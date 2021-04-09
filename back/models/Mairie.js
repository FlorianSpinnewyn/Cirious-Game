class Mairie {
    constructor()
    {
        this.panneMetro = false;
        this.panneTrain = false;
        this.manqueVelo = false;
        this.embouteillage = false;
    }

    evenementTrain() 
    {
        let isPanneTrain = Math.random() * 3;
        if(isPanneTrain == 1)
        {
            this.panneTrain = true;
        }
    }

    evenementMetro() 
    {
        let isPanneMetro = Math.random() * 2;
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
}

module.exports = Mairie;