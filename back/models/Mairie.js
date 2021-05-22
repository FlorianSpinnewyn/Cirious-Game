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
        let isPanneTrain = Math.floor(Math.random() * 100);
        if(isPanneTrain < 50)
        {
            this.panneTrain = true;
        }
    }

    evenementMetro() 
    {
        let isPanneMetro = Math.floor(Math.random() * 100);
        if(isPanneMetro < 50)
        {
            this.panneMetro = true;
        }
    }

    evenementEmbouteillage(personnesVoitures)
    {
       if(personnesVoitures>=8){
           this.embouteillage=true;
           return true;
       }
       else {
           return false;
       }
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
        this.embouteillage = true;
    }
}

module.exports = Mairie;