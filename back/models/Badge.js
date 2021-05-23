class Badge {
    constructor()
    {
        this.id;
        this.description = "";
        this.fait = false;
        this.liste = [
            [1,'Retrouve le chien perdu.',false],
            [2,'Trouve le plot de circulation caché.',false],
            [3,"Trouve l'aiguille dans le ballot de paille.",false],
            [4,'Caresse le bébé mouton des prés.',false],
            [5,'Attrape le nuage mystère.',false],
            [6,'Fais un bouquet de fleurs.',false],
            [7,'Ne laisse aucun salarié prendre la voiture pendant 1h.',false],
            [8,'Indique à 4 salariés de prendre le vélo.',false],
            [9,'Indique à 3 salariés de prendre le métro.',false],
            [10,'Indique à 2 salariés de marcher.',false],
            [11,'Indique à 1 salarié de prendre le train.',false],
            [12,'Résous 8 demandes de salariés.',false],
            [13,'Enlève les ombres de la map.',false]
        ];
    }
    
    setDestination(newId)
    {
        this.id = newId;
    }
    setDepart(newDescription)
    {
        this.description = newDescription;
    }
    setDepart(newFait)
    {
        this.fait = newFait;
    }

    
    reset() {
        this.id;
        this.description = "";
        this.fait = false;
        this.liste = [
            [1,'Retrouve le chien perdu.',false],
            [2,'Trouve le plot de circulation caché.',false],
            [3,"Trouve l'aiguille dans le ballot de paille.",false],
            [4,'Caresse le mouton des prés.',false],
            [5,'Attrape le nuage mystère.',false],
            [6,'Fais un bouquet de fleurs.',false],
            [7,'Ne laisse aucun salarié prendre la voiture pendant 1h.',false],
            [8,'Indique à 4 salariés de prendre le vélo.',false],
            [9,'Indique à 3 salariés de prendre le métro.',false],
            [10,'Indique à 2 salariés de marcher.',false],
            [11,'Indique à 1 salarié de prendre le train.',false],
            [12,'Résous 8 demandes de salariés.',false],
            [13,'Enlève les ombres de la map.',false]
        ];
    }
}

module.exports = Badge;