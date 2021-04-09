class Kiosque {
    constructor()
    {
        this.score;
        this.badgeDebloque;
        this.prochainObjectif;
    }

    recupScore()
    {
        this.score = 400;
        return this.score;
    }

    recupBadgeDebloque()
    {
        for(let i = 0; i++; i<3) {
            this.badgeDebloque[i] = 'Badge numéro ' + i;
        }
        return this.badgeDebloque;
    }

    recupProchainObjectif()
    {
        this.prochainObjectif = 'Faire un bouquet de fleurs';
        return this.prochainObjectif;
    }
}

module.exports = Kiosque;