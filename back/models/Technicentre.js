class Technicentre {
    constructor()
    {
        this.repare = false;
    }
    
    evenementRepare(){
        this.repare = true;
    }

    reset() {
        this.repare = true;
    }
}
module.exports = Technicentre;