class Personne {
    constructor()
    {
        this.destination = "";
        this.depart = "";
        this.envoye = 0;
        this.apparue = false;
        this.chrono = 0;
        this.fenetre = false;
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

    initialisation(tab) {
        let rand1 = Math.floor(Math.random() * 7 + 2);
        switch (rand1)
        {
            case 2 : this.setDestination("Ecole");
            break;
            case 3 : this.setDestination("Campagne");
            break;
            case 4 : this.setDestination("Magasins");
            break;
            case 5 : this.setDestination("Musee");
            break;
            case 6 : this.setDestination("Parc");
            break;
            case 7 : this.setDestination("Restaurant");
            break;
            case 8: this.setDestination("Stade");
            break;
        }

        let rand2 = Math.floor(Math.random() * tab.length);

        this.setDepart(tab[rand2]);

        tab = tab.splice(rand2, 1);

    }
}

module.exports = Personne;