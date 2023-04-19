class ChronoControleur {
    constructor(modele, vue) {
        this.modele = modele;
        this.vue = vue;
        this.interval = 0;

    }

    démarrer() {
        this.modele.chrono();
        this.interval = setInterval(() => this.modele.chrono(), 100);
        console.log("started");
    }

    stopperOuRelancer() {
        if (this.interval === 0) {
            this.démarrer();
            this.vue.modifierPanneauDeContrôle("stop");
            let anti_mouvement = document.getElementById("bloque");
            for(let i = 1; i < 10; i++) {
                let tempRougeCarte = document.getElementById("rouge" + i)
                let tempNoirCarte = document.getElementById("noir" + i)
                tempRougeCarte.setAttribute("draggable", true);
                tempNoirCarte.setAttribute("draggable", true);
            }
        }
        else {
            clearInterval(this.interval);
            this.interval = 0;
            // @todo commebt accéder au bouton ?
            this.vue.modifierPanneauDeContrôle("play");
            for(let i = 1; i < 10; i++) {
                let tempRougeCarte = document.getElementById("rouge" + i)
                let tempNoirCarte = document.getElementById("noir" + i)
                tempRougeCarte.setAttribute("draggable", false);
                tempNoirCarte.setAttribute("draggable", false);
            }

        }
    }

    stopper() {
        this.interval = 0;
        this.vue.modifierPanneauDeContrôle("play");
        localStorage.clear();
        console.log("cleared");
        var chro = document.getElementById;

    }

}


document.addEventListener("DOMContentLoaded", () => {
    let vue = new ChronoVue(1);
    let modele = new ChronoModele();
    modele.ajouterEcouteur(vue);
    let ctrl = new ChronoControleur(modele, vue);
    let Play = document.getElementById("Play");
    //Play.onclick = ctrl.démarrer();
    var resete = document.getElementById("stop");
    resete.addEventListener("click", () => ctrl.stopper());
});
