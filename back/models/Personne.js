class Personne {
    constructor()
    {
        /*a voir*/
        this.destination = "";
        this.depart="";
    }
    
    setDestination(destination)
    {
        this.destination = destination;
    }

    setDepart(depart)
    {
        this.depart = depart;
    }
}
module.exports = Personne;