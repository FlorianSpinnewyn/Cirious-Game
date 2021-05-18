class Gare {
    constructor()
    {
        this.temps = 0;
        this.x = -1;
        this.z = -19;
    }
    
    count()
    {
        if(this.temps != 0)
        {
            this.temps -= 1;
        }
    }
}

module.exports = Gare;