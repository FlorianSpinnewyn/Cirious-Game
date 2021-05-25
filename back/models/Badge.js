class Badge {
    constructor()
    {
        this.id=-1;
        this.description = ""
        this.termine = false;
    }
    

    reset() {
        this.id=-1;
        this.description = "";
        this.termine = false;
    }
}

module.exports = Badge;