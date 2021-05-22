class Gare {
    constructor()
    {
        this.temps = 0;
        this.attente = 8;
        this.x = -1;
        this.z = -19;
    }
    
    count()
    {
        if(this.temps != 0)
        {
            this.temps -= 1;
        }
        else
        {
            if(this.attente != 1)
            {
                this.attente -= 1;
            }
            else
            {
                this.temps = 15;
                this.attente = 8;
            }
        }
    }
}

module.exports = Gare;