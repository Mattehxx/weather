$(document).ready(()=> {
    const search=$(".search-box button");

    /* ON ENTER CLICK*/
    $(document).on('keypress', function(e) {
        if(e.which == 13) {
            getData();
        }
    });

    /* ON MOUSE CLICK */
    search.click(function () { 
        getData();
    });
});



function getData() {
    const container=$(".container");
    const weather_box=$(".weather-box");
    const weather_details=$(".weather-details");
    const error=$(".not-found");

    const API_key='732e892517d8ca13b90819e175f9af34';
    const city=$(".search-box input").val();

    if(city===''){
        return;
    }

    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+API_key,
        data: "data",
        dataType: "json",
        success: (response)=> {
        /** DEBUG */ 
            console.log(response)
        
            error.css('display', 'none');
            error.removeClass('fadeIn');

            const image=$(".weather-box img");
            const temperature=$(".weather-box .temperature");
            const description=$(".weather-box .description");
            const min_temperature=$(".weather-details .min-temperature span");
            const max_temperature=$(".weather-details .max-temperature span");
            const humidity=$(".weather-details .humidity span");
            const wind=$(".weather-details .wind span");

            switch(response.weather[0].main){
                case 'Clear':
                    image.attr('src', 'images/clear.png');
                    break;
                
                case 'Cloud':
                    image.attr('src', 'images/cloud.png');
                    break;

                case 'Clouds':
                    image.attr('src', 'images/clouds.png');
                    break;
                        
                case 'Haze':
                    image.attr('src', 'images/haze.png');
                    break;

                case 'Rain':
                    image.attr('src', 'images/rain.png');
                    break;
                    
                case 'Snow':
                    image.attr('src', 'images/snow.png');
                    break;

                case 'Mist':
                    image.attr('src', 'images/mist.png');
                    break;

                default:
                    image.attr('src', '');
            }

            temperature.html(Math.round(parseInt(response.main.temp)-273.15)+"<span>°C</span>");
            description.html(response.weather[0].description);
            min_temperature.html(Math.round(parseInt(response.main.temp_min)-273.15));
            max_temperature.html(Math.round(parseInt(response.main.temp_max)-273.15));
            humidity.html(response.main.humidity+"%");
            wind.html(parseInt(response.wind.speed)+"Km/h")

            weather_box.css('display', '');
            weather_details.css('display', '');
            weather_box.addClass('fadeIn');
            weather_details.addClass('fadeIn');
            container.css('height', '640px');

        },
        error: (response)=> {
            container.css('height', '400px');
            weather_box.css('display', 'none');
            weather_details.css('display', 'none');
            error.css('display', 'block');
            error.addClass('fadeIn');
        }
    });
}