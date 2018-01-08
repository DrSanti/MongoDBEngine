
/**
 * run mongod
 * run node ex08-periodic-insert.js
 * run node server
 * browser http://localhost:9500/
 */

$( document ).ready(function() {
    
    
    $('#resuest').click(function(){
        $('#resuest').html('Loading...');
        $('#output').html('Loading...');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function ( ) {
            if (this.readyState == 4 && this.status == 200) {
                $("#output").html(this.responseText);
                $('#resuest').html('Request');

                plot(this.responseText);
            }
        };
        xhttp.open("GET", "getlast", true);
        xhttp.send();
    });

    function plot(jsonText) {
        var obj = JSON.parse(jsonText);

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: ["sensor1", "sensor2", "sensor3", "sensor4"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [obj.sensor1, obj.sensor2, obj.sensor3, obj.sensor4],
                }]
            },
        
            // Configuration options go here
            options: {}
        });
        
    }

    setInterval( () => {
        $('#resuest').html('Loading...');
        //$('#output').html('Loading...');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function ( ) {
            if (this.readyState == 4 && this.status == 200) {
                $("#output").html(this.responseText);
                $('#resuest').html('Loaded');
                plot(this.responseText);

            }
        };
        xhttp.open("GET", "getlast", true);
        xhttp.send();   
    }, 2000);
    
});