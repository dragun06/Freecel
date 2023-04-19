class Plateau {
    constructor(eltHtml) {
        this.plateauHtml = eltHtml
}
}



class Carte {
    static nbCoups = 0;
    static ESPACEMENT = 20; //px


    constructor(eltHtml, valeur, couleur) {
       this.carteHtml = eltHtml;
       this.valeur = valeur;
       this.couleur = couleur;

       this.carteHtml.ctrl = this;


       this.carteHtml.addEventListener("dragstart", (e) => this.drag(e));
       this.carteHtml.addEventListener("dragover", ( event ) => {
           // prevent default to allow drop
           event.preventDefault();
           event.stopPropagation();
           // console.log("drag over sur "+this.carteHtml.id);
           console.log("drag over sur "+this.valeur);
       });
       this.carteHtml.addEventListener("drop", (e) => this.dropUneAutreCarte(e));

        if (this.valeur > 0) {
            // creation de la minature
            let span = document.createElement("span");
            span.innerHTML = ""+valeur;
            span.className = couleur;
            this.carteHtml.appendChild(span);
        }      
    }


    /**
     * ébauche pour permettre une (et une seule) annulation de déplacement
     * cela va avec restaurer()
     */
    memoriserAnciennePosition() {
        let monStyle = getComputedStyle(this.carteHtml);
        let gauche = parseInt(monStyle["left"]);
        let haut = parseInt(monStyle["top"]);
        Carte.nbCoups++;
        localStorage.setItem("nbCoups", Carte.nbCoups)
        document.getElementById("coups").innerHTML = Carte.nbCoups + " coups";


        this.ancienGauche = gauche;
        this.ancientHaut = haut;
        this.ancienParent = this.carteHtml.parentNode;
    }

    restaurer() {
        this.carteHtml.style.left=""+this.ancienGauche+"px";
        this.carteHtml.style.top=""+this.ancientHaut+"px";
        this.ancienParent.appendChild(this.carteHtml);
    }

    drag(e) {
        e.stopPropagation(); // pour ne pas que le plateau traite aussi l'événement

        e.dataTransfer.setData("text/id", this.carteHtml.id);
        
        // position de la souris sur la carte
        // calcul car rien de standard
        let positionDeLaCarte = this.carteHtml.getBoundingClientRect();
        let x = e.clientX - positionDeLaCarte.x; // layerX n'est pas standard, on calcul
        let y = e.clientY - positionDeLaCarte.y;
        e.dataTransfer.setData("text/posX", x);
        e.dataTransfer.setData("text/posY", y);

    }

    dropUneAutreCarte(e) {
        e.stopPropagation();  // pour ne pas que le plateau traite aussi l'événement

        console.log("drop sur "+this.carteHtml.id+" de "+e.dataTransfer.getData("text/id"));
        let carteDéplacée = document.getElementById(e.dataTransfer.getData("text/id"));
        // console.log("drop possible ? "+this.peutRecevoir(carteDéplacée.ctrl));
        
        if (this.peutRecevoir(carteDéplacée.ctrl) || this.peutRecevoirResultat(carteDéplacée.ctrl)) {
            carteDéplacée.ctrl.memoriserAnciennePosition();
            console.log("déplacement possible");
            let monStyle = getComputedStyle(this.carteHtml);
            if(this.couleur === "resultat"){
                carteDéplacée.classList.remove("carteBas");
                carteDéplacée.draggable = false;
            }else if(this.peutRecevoirResultat(carteDéplacée.ctrl))
            {
                carteDéplacée.classList.remove("carteBas");
                carteDéplacée.draggable = false;
            }
            carteDéplacée.classList.remove("carteBas");

            /*
            changement du calcul : ce n'est plus par rapport au document / à l'onglet, car la carte va être déplacée dans l'autre carte
            let gauche = parseInt(monStyle["left"]);
            carteDéplacée.style.left=""+gauche+"px";
            let haut = parseInt(monStyle["top"]);
            carteDéplacée.style.top=""+(haut+Carte.ESPACEMENT)+"px";
            */

            let nbCartesRest = $(".carteBas").length;
            if(nbCartesRest === 0)
                {
                    window.confirm("Vous avez remporté la partie en : " + Carte.nbCoups + " et : " + chrono.temps + ". Vous pouvez relancer une partie ou quitter cette page");
                    if(localStorage.getItem("nbPartiesWon")){
                        localStorage.setItem("nbPartiesWon", parseInt(localStorage.getItem("nbPartiesWon") +1))
                    }else{
                        localStorage.setItem("nbPartiesWon", 1);
                    }
                    if(localStorage.getItem("tpsTot")){
                        localStorage.setItem("tpsTot", parseInt(localStorage.getItem("tpsTot") + parseInt(localStorage.getItem("temps"))))
                    }else{
                        localStorage.setItem("tpsTot", parseInt(localStorage.getItem("temps")));
                    }
                    if(localStorage.getItem("tpsBest") < parseInt(localStorage.getItem("temps")) ){
                            localStorage.setItem("tpsBest",  parseInt(localStorage.getItem("temps")) )
                    }
                    if(localStorage.getItem("moyNbCoups")){
                        localStorage.setItem("moyNbCoups", (parseInt(localStorage.getItem("nbCoupsTot")) / parseInt(localStorage.getItem("nbParties"))) )
                    }else{
                        document.getElementById("moyNbCoups").innerHTML = "0";
                    }
                    if(localStorage.getItem("bestNbCoups") < Carte.nbCoups){
                        localStorage.setItem("bestNbCoups", Carte.nbCoups)
                    }else{
                        localStorage.setItem("bestNbCoups", Carte.nbCoups)
                    }
                }

            let bord = parseInt(monStyle["border-left-width"])+1 ; // +1 pour l'ombre. on pourrait le calculer en analysant monStyle["box-shadow"]...
            carteDéplacée.style.left="-"+bord+"px";
            carteDéplacée.style.top=""+Carte.ESPACEMENT+"px";
            
            let zindex = parseInt(monStyle["z-index"]);
            carteDéplacée.style.zIndex = zindex+1;

            this.carteHtml.appendChild(carteDéplacée);
            

        } else {
            console.log("déplacement impossible");      //TODO Changer le console log en son "erreur"
        }
    
    }


    peutRecevoir(carte) {
        return ((this.couleur !== carte.couleur) && (this.valeur === carte.valeur+1))
    }
    peutRecevoirResultat(carte) {
        return ( (this.valeur === carte.valeur-1) && (this.couleur === carte.couleur) )
    }
}




class CarteVide extends Carte {
    constructor(eltHtml){
        super(eltHtml, -1, "aucune");
    }

    peutRecevoir(carte) {
        return true;
    }
}

class CarteResultat extends Carte {
    constructor(eltHtml){
        super(eltHtml, -1, "resultat");
    }

    peutRecevoir(carte) {
        console.log(this.valeur);
        return ( (carte.valeur === 1) );
    }
}
