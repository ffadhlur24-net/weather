const myApiKey = 'f7a1631fe42fce907b9b7e839e9db941';

const maxCard = 4;
function getWeather() {
    const city = document.getElementById('city').value;
    const container = document.getElementById('container');
    const card = document.createElement('div');
    
    if (container.children.length >= maxCard){
        alert('Udah cok kebanyakan, hapus dulu satu.');
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}&units=metric`;
    fetch(url)
        .then(respone => respone.json())
        .then(data => {
            if (data.cod === 404){
                alert('Kota tidak ada');
                return;
            }

            const temp = data.main.temp;
            const desc = data.weather[0].description.toLowerCase();
            const hum = data.main.humidity;
            const wind = data.wind.speed;
            // isi data
            card.classList.add('card-weather');

            card.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <h3 class="city-name"><i class="fa-solid fa-location-dot"></i> ${city}</h3>
                <p class="temp">${temp.toFixed(0)}°</p>
                <p class="desc">${desc}</p>
                <div class="windhum">
                    <div class="wind">
                        <p><i class="fa-solid fa-wind"></i> Wind</p>
                        <p>${wind.toFixed(0)} km/h</p>
                    </div>
                    <div class="hum">
                       <p><i class="fa-solid fa-tint"></i> Humidity</p> 
                       <p>${hum} %</p>
                    </div>
                </div>
                `;
            
            // Icon Waether

            if(desc.includes("thunderstorm")){
                card.style.backgroundImage = 'url(backgroundPetir.jpg)';
            } else if(desc.includes("drizzle")){
                card.style.backgroundImage = 'url(backgroundgrimis.jpg)';
            } else if(desc.includes("rain")){
                card.style.backgroundImage = 'url(backgroundHujan.jpg)';
            } else if(desc.includes("snow")){
                card.style.backgroundImage = 'url(backgroundSalju.jpg)';
            }else if (
                desc.includes("mist") ||
                desc.includes("fog") ||
                desc.includes("haze") ||
                desc.includes("dust") ||
                desc.includes("smoke")
            ){
                card.style.backgroundImage = 'url(backgroundFog.jpg)';
            }else if (desc.includes("clouds")) {
                card.style.backgroundImage = 'url(backgroundBerawan.jpg)';
            } else{
                card.style.backgroundImage = 'url(backgroundSun.jpg)';
            } 
            const closeBtn = card.querySelector('.fa-xmark');
            closeBtn.addEventListener('click', () => {
                card.remove()
            })

            container.appendChild(card);
        })
    
        .catch(error => {
            console.log('Error:', error)
        });
}
