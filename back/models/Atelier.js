class Atelier {
    constructor()
    {
        this.repare = false;
        this.x = 1;
        this.z = 2;
    }
    
    evenementRepare(){
        this.repare = true;
    }

    reset() {
        this.repare = true;
    }
}

module.exports = Atelier;