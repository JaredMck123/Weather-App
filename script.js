window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDesription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/db933f9703d80da2ba7fe0a0b207c89c/${lat}, ${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
 
                    const {temperature, summary, icon} = data.currently; 
                    temperatureDegree.textContent = temperature;
                    temperatureDesription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    setIcons(icon, document.querySelector('.icon'));
                });
        });
    }

    function setIcons(icon, iconID){
        const skycon = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycon.play();
        return skycon.set(iconID, Skycons[currentIcon]);
    }
});