
jQuery(document).ready(function () {
    jQuery("button#gobtn").click(function () {
        jQuery("#titlepage").css("transform", "translate(0,-2em)");
        jQuery("#gobtn").hide("slow");
        jQuery("#new").show("slow");
        if(!localStorage.getItem("savedGame") === undefined) // On ajoute la vérification qu'une game soit bien sauvegardée
            jQuery("#resume").show("slow");
        jQuery("#stats").show("slow");
        jQuery("#settings").show("slow");
    });

    jQuery("a#gotostats").click(function () {               //GO TO STATISTICS FROM MAIN MENU
        jQuery("#titlepage").hide("slow");
        jQuery("#new").hide("slow");
        jQuery("#resume").hide("slow");
        jQuery("#settings").hide("slow");
        jQuery("#imgstats").hide("slow");
        jQuery("#statssdiv").show("slow");
        jQuery("#statsfields").show("slow");
        jQuery('#stats').css({
            "transform": "translate(-425px,0)",
            "margin-left":"45%",
            "margin-top":"100px"
        });
        jQuery('#titlestats').css({
            "margin-left":"80%",
            "margin-top":"20px",
            "font-size":"60px"
        });
        
        jQuery("#roundedstats").removeClass("centerdiv");
        jQuery("#roundedstats").css({
            "left":"180px",
            "position":"relative",
            "border-radius": "1em",
            "width": "500px",
            "height": "500px"
        });

        
        
    });
    jQuery("a.gotomainmenu").click(function () {            //GO TO MAIN MENU FROM STATISTICS
        jQuery("#titlepage").show("slow");
        jQuery("#new").show("slow");
        jQuery("#resume").show("slow");
        jQuery("#settings").show("slow");
        jQuery("#imgstats").show("slow");
        jQuery("#statssdiv").hide("slow");
        jQuery("#statsfields").hide("slow");
        jQuery('#titlestats').css({
            "margin-top":"20px",
            "font-size":"35px",
            "margin-left":"0px",
        });
        jQuery('#stats').css({
            "transform":"",
            "margin-left":"",
            "margin-top":"",
        });
        
        jQuery("#roundedstats").addClass("centerdiv");
        jQuery("#roundedstats").css({
            "left":"0px",
            "position":"relative",
            "border-radius": "50%",
            "width": "150px",
            "height": "150px",
            
        });
    });

    jQuery("a#gotosettings").click(function () {            //GO TO SETTINGS FROM MAIN MENU
        jQuery("#titlepage").hide("slow");
        jQuery("#new").hide("slow");
        jQuery("#resume").hide("slow");
        jQuery("#stats").hide("slow");
        jQuery("#imgsettings").hide("slow");
        jQuery("#settingsdiv").show("slow");
        jQuery("#settingsfields").show("slow");
        jQuery('#settings').css({
            "transform": "translate(-425px,0)",
            "margin-left":"45%",
            "margin-top":"100px"
        });
        jQuery('#titlesettings').css({
            "margin-left":"80%",
            "margin-top":"20px",
            "font-size":"60px"
        });
        
        jQuery("#roundedsettings").removeClass("centerdiv");
        jQuery("#roundedsettings").css({
            "left":"180px",
            "position":"relative",
            "border-radius": "1em",
            "width": "500px",
            "height": "560px"
        });
    });

    jQuery("a.gotomainmenu").click(function () {            //GO TO MAIN MENU FROM SETTINGS
        jQuery("#titlepage").show("slow");
        jQuery("#new").show("slow");
        jQuery("#resume").show("slow");
        jQuery("#stats").show("slow");
        jQuery("#settings").show("slow");
        jQuery("#imgsettings").show("slow");
        jQuery("#statssdiv").hide("slow");
        jQuery("#statsfields").hide("slow");
        jQuery('#titlesettings').css({
            "margin-top":"20px",
            "font-size":"35px",
            "margin-left":"0px",
        });
        jQuery('#settings').css({
            "transform":"",
            "margin-left":"",
            "margin-top":"",
        });
        jQuery("#settingsfields").css({
            "display":"none",
        });
        jQuery("#roundedsettings").addClass("centerdiv");
        jQuery("#roundedsettings").css({
            "left":"0px",
            "position":"relative",
            "border-radius": "50%",
            "width": "150px",
            "height": "150px",
            
        });
    });
    var today = new Date();
    if(localStorage.getItem("nbParties"))
        document.getElementById("nbParties").innerHTML = localStorage.getItem("nbParties");
    else
        document.getElementById("nbParties").innerHTML = "0";
    
    if(localStorage.getItem("nbPartiesWon"))
        document.getElementById("nbPartiesWon").innerHTML = localStorage.getItem("nbParties");
    else
        document.getElementById("nbPartiesWon").innerHTML = "0";
        
    if(localStorage.getItem("tpsTot"))
        document.getElementById("tpsTot").innerHTML = localStorage.getItem("nbParties");
    else
        document.getElementById("tpsTot").innerHTML = "0";
    
    if(localStorage.getItem("tpsBest"))
        document.getElementById("tpsBest").innerHTML = localStorage.getItem("nbParties");
    else
        document.getElementById("tpsBest").innerHTML = "0";
        
    if(localStorage.getItem("moyNbCoups"))
        document.getElementById("moyNbCoups").innerHTML = localStorage.getItem("nbParties");
    else
        document.getElementById("moyNbCoups").innerHTML = "0";
    
    if(localStorage.getItem("bestNbCoups"))
        document.getElementById("bestNbCoups").innerHTML = localStorage.getItem("nbParties");
    else
        document.getElementById("bestNbCoups").innerHTML = "0";
    
    if(localStorage.getItem("date"))
        document.getElementById("date").innerHTML = localStorage.getItem("nbParties");
    else
        document.getElementById("date").innerHTML = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();        ;
});