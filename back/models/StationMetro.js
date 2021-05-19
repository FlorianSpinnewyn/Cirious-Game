class StationMetro {
    constructor()
    {
        this.temps = 0;
        this.x;
        this.y;
    }

    count()
    {
        if(this.temps != 1)
        {
            this.temps -= 1;
        }
        else
        {
            this.temps = 7;
        }
    }
}

module.exports = StationMetro;