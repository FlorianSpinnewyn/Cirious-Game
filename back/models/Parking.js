class Parking {
    constructor()
    {
        this.repare = false;
        this.x = -10;
        this.z = 3;
    }
    
    evenementRepare(){
        this.repare = true;
    }

    reset() {
        this.repare = true;
    }
}
module.exports = Parking;