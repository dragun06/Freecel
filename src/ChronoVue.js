class ChronoVue  {
    constructor() {

         // structure html
         this.spanChrono = document.getElementById("chrono");
         // mise en forme en js
        this.spanChrono.style.fontFamily = "Courier New, monospace";
        this.spanChrono.innerHTML = "00h00m00s0'";
        // ou this.spanChrono = "font-familly : Courier New, monospace"; // écrase d'autre modification de .style. précédocument
        // ou this.spanChrono.setAttribute("style", "font-family : Courier New, monospace");
        // aside.setAttribute("style", "position : absolute; right: 0; top: "+top+"; background: rgba(232,232,232,0.75);padding-right: 0.5rem;");

    }

    format(nombre,unité) {
        if (nombre < 10) return "0"+nombre+unité;
        else return ""+nombre+unité;
    }


    // déplacé dans la vue après chaque modification du modèle 
    // dans la méthode update.
    update(heures, minutes, secondes, dixiemes) {
        this.spanChrono.innerHTML = this.format(heures, "h")+this.format(minutes, "m")+this.format(secondes, "s")+dixiemes+ "'";
    }



}