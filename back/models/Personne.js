class Personne {
    constructor()
    {
        /*a voir*/
        this.destination = "";
        this.depart="";
        this.envoye = 0;
    }
    
    setDestination(destination)
    {
        this.destination = destination;
    }

    setDepart(depart)
    {
        this.depart = depart;
    }

    initialisation(rand1,rand2,rand3){
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
            if(rand2 == 0)
            {
                switch(rand3)
                {
                    case 0 : rand3 = 7;
                    break;
                    case 1 : rand3 = 11;
                    break;
                }
            }
            else
            {
                rand3 = Math.floor(Math.random() * 3);
                switch(rand3)
                {
                    case 0 : rand3 = 7;
                    break;
                    case 1 : rand3 = 9;
                    break;
                    case 2 : rand3 = 11;
                    break;
                }
            }
    
            let rand4 = Math.floor(Math.random() * 4);
            switch(rand4)
            {
                case 0 : rand4 = "N";
                break;
                case 1 : rand4 = "E";
                break;
                case 2 : rand4 = "O";
                break;
                case 3 : rand4 = "S";
            }
            this.setDepart(rand2 + "." + rand3 + "." + rand4);
    }

    reset() {
        this.destination = "";
        this.depart="";
        this.envoye = 0;
    }
}
module.exports = Personne;