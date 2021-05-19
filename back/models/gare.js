class Gare {
    constructor()
    {
        this.temps = 0;
        this.x = -1;
        this.z = -19;
    }
    
    count()
    {
        if(this.temps != 1)
        {
            this.temps -= 1;
        }
        else
        {
            this.temps = 15;
        }
    }
}

module.exports = Gare;