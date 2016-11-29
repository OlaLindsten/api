
function initMap() {
    if (Modernizr.geolocation) {
        console.log("vi har stöd för geolocation");
        navigator.geolocation.getCurrentPosition(loadMap);
    }

}
var apiUtanAvgift;
var apiautomat;
var apiMedAvgift;
var apiMc;
var apiHandikapp;
var init = function () {
    console.log("onload fungerar..");
    //Returnerar kommunala gatumarksparkeringar utan avgift
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/PublicTimeParkings/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data) {
        apiUtanAvgift = data;
        
        for (var i = 0; i < apiUtanAvgift.length; i++) {
            asd(i);

        }
    });
    //Returnerar kommunala parkeringsautomater
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/PublicPayMachines/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data) {
        apiautomat = data;

        for (var i = 0; i < apiautomat.length; i++) {
            asd(i);

        }
    });
    //Returnerar kommunala gatumarksparkeringar med avgift
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/PublicTollParkings/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data) {
        apiMedAvgift = data;

        for (var i = 0; i < apiMedAvgift.length; i++) {
            asd(i);

        }
    });
    //Returnerar kommunala handikappsparkeringar
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/HandicapParkings/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data) {
        apiHandikapp = data;

        for (var i = 0; i < apiHandikapp.length; i++) {
            asd(i);

        }
    });
    //Returnerar MC-parkeringar
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/MCParkings/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data){
        apiMc = data;

        for (var i = 0; i < apiMc.length; i++) {
            asd(i);

        }
    });
};

//Returnerar kommunala gatumarksparkeringar utan avgift
function asd(i) {

    var medAvgiftIcon = 'img/röd.png';
    var medAvgiftMaker = new google.maps.Marker({
        position: {lat: apiMedAvgift[i].Lat, lng: apiMedAvgift[i].Long},
        map: map,
        icon: medAvgiftIcon
    });

    var utanAvgiftIcon = 'img/grön.png';
    var utanAvgiftMarker = new google.maps.Marker({
        position: {lat: apiUtanAvgift[i].Lat, lng: apiUtanAvgift[i].Long},
        map: map,
        icon: utanAvgiftIcon,
        title:"test"

    });
    var automaticon = "img/brun.png";
    var automat = new google.maps.Marker({
        position: {lat: apiautomat[i].Lat, lng: apiautomat[i].Long},
        map: map,
        icon: automaticon
    });

    var handikappIcon = "img/gul.png";
    var handikappMarker = new google.maps.Marker({
        position: {lat: apiHandikapp[i].Lat, lng: apiHandikapp[i].Long},
        map: map,
        icon: handikappIcon
    });
    
    var McIcon = "img/blå.png";
    var McMarker = new google.maps.Marker({
        position: {lat: apiMc[i].Lat, lng: apiMc[i].Long},
        map: map,
        icon: McIcon
    });
    //iformations fönster om automater 
    var infoauto = '<div class="titelbakgrund"><p class="titel">Parkering automat</p></div>' +
            '<div class="subTitel">Plats: </div>' +
            apiautomat[i].Name +
            '<div class="subTitel">Max parkeringstid: </div>' +
            apiautomat[i].MaxParkingTime +
            '<div class="subTitel">Kostnad: </div>' +
            apiautomat[i].ParkingCost;
    var autowindow = new google.maps.InfoWindow({
        content: infoauto
    });
    automat.addListener('click', function () {
        autowindow.open(map, automat);
        
    });
    //ifall parkeringsplatser eller extra info inte finns på parkeringar utan avgift
    var parkeringsPlatserUtanAvgift;
    if (apiUtanAvgift[i].ParkingSpaces === undefined) {
        parkeringsPlatserUtanAvgift = '';
    } else {
        parkeringsPlatserUtanAvgift = '<p class="subTitel">Parkerings platser: </p>' + apiUtanAvgift[i].ParkingSpaces;
    }

    var extraInfoUtanAvgift;
    if (apiUtanAvgift[i].ExtraInfo === undefined) {
    var parkeringsPlatserMedAvgift;
    if (apiMedAvgift[i].ParkingSpaces === undefined) {
        parkeringsPlatserMedAvgift = '';
    } else {
        parkeringsPlatserMedAvgift = '<p class="subTitel">Parkerings platser: </p>' + apiMedAvgift[i].ParkingSpaces;
    }

    var extraInfoMedAvgift;
    if (apiMedAvgift[i].ExtraInfo === undefined) {
        extraInfoMedAvgift = '';
    } else {
        extraInfoMedAvgift = '<p class="subTitel">Extra info: </p>' + apiMedAvgift[i].ExtraInfo;
    }    extraInfoUtanAvgift = '';
    } else {
        extraInfoUtanAvgift = '<p class="subTitel">Extra info: </p>' + apiUtanAvgift[i].ExtraInfo;
    }

    if (apiMedAvgift[i].ParkingSpaces === undefined) {
        parkeringsPlatserMedAvgift = '';
    } else {
        parkeringsPlatserMedAvgift = '<p class="subTitel">Parkerings platser: </p>' + apiMedAvgift[i].ParkingSpaces;
    }

    var extraInfoMedAvgift;
    if (apiMedAvgift[i].ExtraInfo === undefined) {
        extraInfoMedAvgift = '';
    } else {
        extraInfoMedAvgift = '<p class="subTitel">Extra info: </p>' + apiMedAvgift[i].ExtraInfo;
    }

    var parkeringsPlatserHandi;
    if (apiHandikapp[i].ParkingSpaces === undefined) {
        parkeringsPlatserHandi = '';
    } else {
        parkeringsPlatserHandi = '<p class="subTitel">Parkerings platser: </p>' + apiHandikapp[i].ParkingSpaces;
    }


    //iformations fönster om parkeringar utan avgift
    var infoUtan = '<div class="infoFonster"><p class="titel">Parkering utan avgift</p></div>' +
            '<p class="subTitel">Plats: </p>' +
            apiUtanAvgift[i].Name +
            '<p class="subTitel">Max parkeringstid: </p>' +
            apiUtanAvgift[i].MaxParkingTime +
            '<p>'+parkeringsPlatserUtanAvgift+'</p>' +
            '<p>'+extraInfoUtanAvgift+'</p>';

    var windowUtan = new google.maps.InfoWindow({
        content: infoUtan
    });
    utanAvgiftMarker.addListener('click', function () {
        windowUtan.open(map, utanAvgiftMarker);
    });
    var parkeringsPlatserMedAvgift;
    

    // informations fönster om parkeringar med avgift
    var infoMed = '<div class="infoFonster"><p class="titel">Parkering med avgift</p></div>' +
            '<p class="subTitel">Plats: </p>' +
            apiMedAvgift[i].Name +
            '<p class="subTitel">Max parkeringstid: </p>' +
            apiMedAvgift[i].MaxParkingTime +
            '<p>'+parkeringsPlatserMedAvgift+'</p>' +
            '<p>' + extraInfoMedAvgift+'</p>';
    var windowMed = new google.maps.InfoWindow({
        content: infoMed
        
    });
    medAvgiftMaker.addListener('click', function (){
        windowMed.open(map, medAvgiftMaker);
    });
    
    //informations fönster om parkering för handikappade
    var infoHandi = '<div class="infoFonster"><p class="titel">Handikapparkering</p></div>' +
            '<p class="subTitel">Plats: </p>' +
            apiHandikapp[i].Name +
            '<p class="subTitel">Max parkeringstid: </p>' +
            apiHandikapp[i].MaxParkingTime +
            '<p>'+parkeringsPlatserHandi+'</p>';
    var windowHandi = new google.maps.InfoWindow({
        content: infoHandi 
    });
    handikappMarker.addListener('click', function(){
        windowHandi.open(map, handikappMarker);
    });
    
    var infoMc = '<div class="infoFonster"><p class="titel">Mc parkeringar</p></div>' +
            '<p class="subTitel">Plats: </p>' +
            apiMc[i].Name +
            '<p class="subTitel">Max parkeringstid: </p>' +
            apiMc[i].MaxParkingTime;
    var windowMc = new google.maps.InfoWindow({
        content: infoMc
    });
    McMarker.addListener('click', function(){
        windowMc.open(map, McMarker);
    });
    
    
    //klicka på kartan så försviner markörer
    google.maps.event.addListener(map, 'click', function () {
        windowUtan.close();
        autowindow.close();
        windowMed.close();
        windowHandi.close();
        windowMc.close();
  });
}

  


function loadMap(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude + ";" + longitude);
    //AIzaSyD87KDtA4OkpIs5IEVT4d_gEdAwlE-aYTw
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude, lng: longitude},
        zoom: 10
    });
    var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map

    });
}




