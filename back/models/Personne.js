class Personne {
    constructor()
    {
        this.destination = "";
        this.depart = "";
        this.envoye = 0;
        this.apparue = false;
        this.chrono = 0;
    }
    
    setDestination(destination)
    {
        this.destination = destination;
    }

    setDepart(depart)
    {
        this.depart = depart;
    }

    count(tempsMax)
    {
        if(this.apparue == true && this.envoye == 0)
        {
            this.chrono += 1;
            if(this.chrono == tempsMax)
            {
                return(1);
            }
            else
            {
                return(0);
            }
        }
        else
        {
            return(0);
        }
    }

    reset() {
        this.destination = "";
        this.depart = "";
        this.envoye = 0;
        this.apparue = false;
        this.chrono = 0;
    }
}

module.exports = Personne;