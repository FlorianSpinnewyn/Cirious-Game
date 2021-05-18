class Technicentre {
    constructor()
    {
        this.repare = false;
        this.x = 19;
        this.z = 9;
    }
    
    evenementRepare() {
        this.repare = true;
    }

    reset() {
        this.repare = true;
    }
}

module.exports = Technicentre;