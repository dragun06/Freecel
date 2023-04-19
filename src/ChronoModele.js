class ChronoModele {

    constructor() {
        this.temps = -1;

        this.ecouteurs = [];
    }


    ajouterEcouteur(ecouteur) {
        this.ecouteurs.push(ecouteur);
    }

    prevenirLesEcouteurs() {
        let i = 0;
        for(i = 0; i < this.ecouteurs.length; i++) {
            this.ecouteurs[i].update(this.getHeures(), this.getMinutes(), this.getSecondes(), this.getDixiemes());
        }
    }
    

    chrono() {
        this.temps += 1;
        localStorage.setItem("temps", this.temps);
        this.prevenirLesEcouteurs();
    }

    getHeures() {
        let nbSecondes = Math.floor(this.temps  / 10);
        let nbH = Math.floor(nbSecondes / 3600);

        return nbH;
    }

    getMinutes() {
        let nbSecondes = Math.floor(this.temps  / 10);
        nbSecondes = nbSecondes - this.getHeures()*3600;
        let nbM = Math.floor( nbSecondes  / 60);

        return nbM;
    }

    getSecondes() {
        let nbSecondes = Math.floor(this.temps  / 10);
        nbSecondes = nbSecondes - this.getHeures()*3600 - this.getMinutes() * 60;
        return nbSecondes;
    }

    getDixiemes() {
        let nbDixièmes = this.temps  % 10;
        return nbDixièmes
    }

}