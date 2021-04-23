class Kiosque {
    constructor()
    {
        this.score = 0;
        this.badgeDebloque = [];
        this.prochainObjectif = "";
        this.x = 17;
        this.z = -17;
    }

    recupScore()
    {
        this.score = 400;
        return this.score;
    }

    recupBadgeDebloque()
    {
        for(let i = 0; i<3; ++i) {
            this.badgeDebloque[i] = 'Badge numéro ' + i;
        }
        return this.badgeDebloque;
    }

    recupProchainObjectif()
    {
        this.prochainObjectif = 'Faire un bouquet de fleurs';
        return this.prochainObjectif;
    }

    reset() {
        this.score = 0;
    }
}

module.exports = Kiosque;