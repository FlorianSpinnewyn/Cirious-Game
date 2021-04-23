class Garage {
    constructor()
    {
        this.repare = false;
        this.x = -17;
        this.z = 10;
    }
    
    evenementRepare(){
        this.repare = true;
    }

    reset() {
        this.repare = true;
    }
}
module.exports = Garage;