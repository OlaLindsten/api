
function initMap() {
    if (Modernizr.geolocation) {
        console.log("vi har stöd för geolocation");
        navigator.geolocation.getCurrentPosition(loadMap);
    }

}
var apiUtanAvgift;
var apiautomat;
var apiMedAvgift;
var init = function () {
    console.log("onload fungerar..");
    //Returnerar kommunala gatumarksparkeringar utan avgift
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/PublicTimeParkings/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data) {
        console.log("--DATA--");
        console.log(data);
        apiUtanAvgift = data;
        

        for (var i = 0; i < apiUtanAvgift.length; i++) {
            asd(i);
            
        }
    });
    //Returnerar kommunala parkeringsautomater
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/PublicPayMachines/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data) {
        apiautomat = data;
         console.log("--DATA2--");
        console.log(data);

        for (var i = 0; i < apiautomat.length; i++) {
            asd(i);
           
        }
    });
    //Returnerar kommunala gatumarksparkeringar med avgift
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/PublicTollParkings/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data){
        apiMedAvgift = data;
         console.log("--DATA3--");
        console.log(data);
        
        for (var i = 0; i < apiMedAvgift.length; i++) {
            asd(i);
           
        }
    });
    //Returnerar kommunala handikappsparkeringar
    $.getJSON('http://cors.io/?http://data.goteborg.se/ParkingService/v1.0/HandicapParkings/8e4034b9-189e-463d-8643-0c19807bb7e8?&format=json', function (data){
        apiHandikapp = data;
         console.log("--DATA4--");
        console.log(data);
        
        for (var i = 0; i < apiHandikapp.length; i++) {
            asd(i);
           
        }
    });
    

};

//Returnerar kommunala gatumarksparkeringar utan avgift
function asd(i) {
    
    var medAvgiftIcon = 'img/medavgift.png';
    var medAvgiftMaker = new google.maps.Marker({
        position: {lat: apiMedAvgift[i].Lat, lng: apiMedAvgift[i].Long},
        map: map,
        icon: medAvgiftIcon
    });
    
    var utanAvgiftIcon = 'img/parking.png';
    var utanAvgiftMarker = new google.maps.Marker({
        position: {lat: apiUtanAvgift[i].Lat, lng: apiUtanAvgift[i].Long},
        map: map,
        icon: utanAvgiftIcon

    });
    var automaticon = "img/parkeringmeter2.png";
    var automat = new google.maps.Marker({
        position: {lat: apiautomat[i].Lat, lng: apiautomat[i].Long},
        map: map,
        icon: automaticon
    });
    
    var handikappIcon = "img/handikapp.png";
    var handikappMarker = new google.maps.Marker({
        position: {lat: apiHandikapp[i].Lat, lng: apiHandikapp[i].Long},
        map: map,
        icon: handikappIcon
    });
    //iformations fönster om automater 
    var infoauto = '<div class="titelbakgrund"><p class="titel">Parkering automat</p></div>'+
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
    //ifall parkeringsplatser eller extra info inte finns
    var parkeringsplatser;
    if(apiUtanAvgift[i].ParkingSpaces === undefined){
        parkeringsplatser = '';
    }else{
        parkeringsplatser = '<div class="subTitel">Parkerings platser: </div>'+apiUtanAvgift[i].ParkingSpaces;
    }
    
    var extrainfo;
    if(apiUtanAvgift[i].ExtraInfo === undefined){
        extrainfo = '';
    }else{
        extrainfo = '<div class="subTitel">Extra info: </div>'+apiUtanAvgift[i].ExtraInfo ;
    }
 
     //iformations fönster om parkeringar utan avgift
    var infoUtan ='<p class="titel">Parkering utan avgift</p>'+
                  '<div class="subTitel">Plats: </div>' +
                      apiUtanAvgift[i].Name +
                      '<div class="subTitel">Max parkeringstid: </div>' +
                      apiUtanAvgift[i].MaxParkingTime+
                      parkeringsplatser+
                      extrainfo+
                    '</div>';
           
    var windowUtan = new google.maps.InfoWindow({
        content: infoUtan
    });
    utanAvgiftMarker.addListener('click', function () {
        windowUtan.open(map, utanAvgiftMarker);
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


      

