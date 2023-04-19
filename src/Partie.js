document.addEventListener("DOMContentLoaded", () => {

    /* On prépare le localstorage */
    if(localStorage.getItem("nbParties"))
        localStorage.setItem("nbParties", parseInt(localStorage.getItem("nbParties")) + 1);
    else
        localStorage.setItem("nbParties", 1)
    if(!localStorage.getItem("coupsTot"))
        localStorage.setItem("coupsTot", 0);
    var chrono = new ChronoModele();
    var chronoDisplay = new ChronoVue();
    var chronoAction = new ChronoControleur(chrono, chronoDisplay);
    chrono.ajouterEcouteur(chronoDisplay);
    chronoAction.démarrer();
    
    

    let plateau = new Plateau(document.getElementById("plateau"));
    // On prépare les cartes de manière aléatoire
    let listeCartesBase = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52
    ]
    const randomized = [...listeCartesBase].sort(() => Math.round(Math.random()) ? -1 : 1);
    let piles = [
        [], [], [], [], [], [], [], []
    ];
    for (let tPiles = 0 ; tPiles < piles.length; tPiles++)
    {
        if(tPiles < 4)
        {
            for(let nbCartesInPiles = 0 ; nbCartesInPiles < 7 ; nbCartesInPiles++) {
                piles[tPiles][nbCartesInPiles] = randomized.pop();
            }
        }
        else {
            for(let nbCartesInPiles = 0 ; nbCartesInPiles < 6 ; nbCartesInPiles++) {
                piles[tPiles][nbCartesInPiles] = randomized.pop();
            }
        }
    }
    let templateCarte = document.querySelector("#modeleCarte");
    let docFrag = document.importNode(templateCarte.content, true);
    let newCard = docFrag.querySelector("div.cartes");
    let tmpId = 0;
    piles.forEach((pilesC, index) => {
       pilesC.forEach((cartes, indexbis) => {
           let carteHTML = newCard.cloneNode(true);
           carteHTML.classList.toggle(cartes);
           carteHTML.id = cartes;
           if(indexbis === 0)
               carteHTML.classList += " tetePile";
           else {
               carteHTML.classList += " carteBas";
               carteHTML.style.top = "" + (420 + indexbis * Carte.ESPACEMENT) + "px";
           }
           if(cartes < 14) {
                        carteHTML.classList += " pique";
                        tmpId = cartes;
               let ctrl = new Carte(carteHTML, tmpId, "noir")
               switch(tmpId){
                            case 11:
                                carteHTML.innerHTML = "&nbsp; Valet &nbsp;&nbsp;&nbsp;&nbsp;&#9824;";
                                break;
                            case 12:
                                carteHTML.innerHTML = "&nbsp; Dame &nbsp;&nbsp; &#9824;";
                                break;
                            case 13:
                                carteHTML.innerHTML = "&nbsp; Roi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#9824;";
                                break;
                            default:
                                if(tmpId==10)
                                {
                                    carteHTML.innerHTML = "&nbsp;&nbsp;"+tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9824;";
                                }else if(tmpId==1)
                                {
                                    carteHTML.innerHTML = "&nbsp;&nbsp;"+tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9824;";
                                }else{
                                    carteHTML.innerHTML = "&nbsp;&nbsp;" + tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9824;";
                                }
                                break;
                        }
                    }
           else if(cartes > 13 && cartes <27) {
               carteHTML.classList += " trefle";
               tmpId = cartes - 13;
               let ctrl = new Carte(carteHTML, tmpId, "noir")

               switch (tmpId) {
                   case 11:
                       carteHTML.innerHTML = "&nbsp; Valet &nbsp;&nbsp;&nbsp;&nbsp;&#9827;";
                       break;
                   case 12:
                       carteHTML.innerHTML = "&nbsp; Dame &nbsp;&nbsp;&nbsp;&#9827;";
                       break;
                   case 13:
                       carteHTML.innerHTML = "&nbsp; Roi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9827;";
                       break;
                   default:
                       if (tmpId == 10) {
                           carteHTML.innerHTML = "&nbsp;&nbsp;" + tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9827;";
                       } else if (tmpId == 1) {
                           carteHTML.innerHTML = "&nbsp;&nbsp;" + tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9827";
                       } else {
                           carteHTML.innerHTML = "&nbsp;&nbsp;" + tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9827;";
                       }
                       break;
               }
           }else if(cartes > 26 && cartes < 40) {
                        carteHTML.classList += " coeur";
                        tmpId = cartes - 26;
               let ctrl = new Carte(carteHTML, tmpId, "rouge")
               switch(tmpId){
                            case 11:
                                carteHTML.innerHTML = "&nbsp; Valet &nbsp;&nbsp;&nbsp;&nbsp;&#9829;";
                                break;
                            case 12:
                                carteHTML.innerHTML = "&nbsp; Dame &nbsp;&nbsp;&nbsp;&#9829;";
                                break;
                            case 13:
                                carteHTML.innerHTML = "&nbsp; Roi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9829;";
                                break;
                            default:
                                if(tmpId==10)
                                {
                                    carteHTML.innerHTML = "&nbsp;&nbsp;"+tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9829;";
                                }else if(tmpId==1)
                                {
                                    carteHTML.innerHTML = "&nbsp;&nbsp;"+tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9829;";
                                }else{
                                    carteHTML.innerHTML = "&nbsp;&nbsp;"+tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9829;";
                                }
                                break;
                        }                    }
           else if(cartes > 39) {
                        carteHTML.classList += " carreau";
                        tmpId = cartes - 39;
               let ctrl = new Carte(carteHTML, tmpId, "rouge")
               switch(tmpId){
                            case 11:
                                carteHTML.innerHTML = "&nbsp; Valet &nbsp;&nbsp;&nbsp;&nbsp;&#9830;";
                                break;
                            case 12:
                                carteHTML.innerHTML = "&nbsp; Dame &nbsp;&nbsp;&nbsp;&#9830;";
                                break;
                            case 13:
                                carteHTML.innerHTML = "&nbsp; Roi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9830;";
                                break;
                            default:
                                if(tmpId==10)
                                {
                                    carteHTML.innerHTML = "&nbsp;&nbsp;"+tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9830;";
                                }else if(tmpId==1)
                                {
                                    carteHTML.innerHTML = "&nbsp;&nbsp;"+tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9830;";
                                }else{
                                    carteHTML.innerHTML = "&nbsp;&nbsp;"+tmpId + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#9830;";
                                }
                                break;
                        }
                    }
           document.getElementById("startPile" + (index+1)).appendChild(carteHTML);
       })
    });
    let cartesVides = document.querySelectorAll("div.vide");
    let cartesFondation = document.querySelectorAll("div.resultat");
    cartesFondation.forEach(c => {
        let ctfd = new CarteResultat(c);
    });
    cartesVides.forEach(c => {
        let ctrl = new CarteVide(c);
    });

    jQuery("#menuig").click(function()
    {
        jQuery("#menupanneau").show("slow");
        jQuery("#menuig").hide("slow");
    });
    jQuery("#closemenu").click(function()
    {
       jQuery("#menupanneau").hide("slow");
       jQuery("#menuig").show("slow");
    });

});