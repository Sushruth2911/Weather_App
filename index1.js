const weatherform = document.querySelector(".Weather_form");
const country = document.querySelector(".country");
const card = document.querySelector(".card");
const apikey = "def656b43a54ef1b73d986de090de5ee";

weatherform.addEventListener("submit" , retrive);


async function retrive(event)
{
    event.preventDefault();
    const country01 = country.value;

    if(country01)
    {
        try
        {
            const DATA = await getweatherdata(country01);
            displayweather(DATA);

        }
        catch(error)
        {
            console.error(error);
            displayerror(error);

        }


    }

    else
    {
        displayerror("Please enter a valid country")
    }

}


async function getweatherdata(country)
{
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apikey}`

    const response = await fetch(apiurl);

    console.log(response);

    if(!response.ok)
    {
        throw new Error("Invalid Country");
    }

    return await response.json();

}

function displayweather(data)
{
    const {name : city , 
        main:{temp , temp_max , temp_min , humidity} , 
        weather: [{description , id}]} = data;

    
    card.textContent = "";
    card.style.display = "flex"
    card.style.flexDirection = "column"; 

    const citydisplay = document.createElement("h2");
    const tempdisplay = document.createElement("p");
    const temp_maxdisplay = document.createElement("p");
    const temp_mindisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descriptiondisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    citydisplay.classList.add("card") ;


    tempdisplay.textContent = `Temperature : ${(temp - 273.15).toFixed(1)} °C`;
    tempdisplay.classList.add("card") ;

    

    // temp_maxdisplay.textContent = `Max : ${(temp_max - 273.15).toFixed(1)}°C `;
    // temp_maxdisplay.classList.add("card") ;


    // temp_mindisplay.textContent = ` Min : ${(temp_min - 273.15).toFixed(1)}°C `;
    // temp_mindisplay.classList.add("card") ;

    

    humiditydisplay.textContent = `Humidity : ${humidity}`;
    humiditydisplay.classList.add("card") ;


    descriptiondisplay.textContent = description;
    descriptiondisplay.classList.add("card") ;


    weatheremoji.textContent = getweatheremoji(id);
    weatheremoji.classList.add("card") ;
    console.log(weatheremoji);



    


    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    // card.appendChild(temp_maxdisplay);
    // card.appendChild(temp_mindisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descriptiondisplay);
    card.appendChild(weatheremoji);

}

function getweatheremoji(weatherid)
{

    switch(true)
    {

        case (weatherid >= 200 && weatherid < 300):
        {
            return  "⛈️" 
        }


        case (weatherid >= 300 && weatherid < 400):
        {
            return  "🌦️" 

        }


        case (weatherid >= 400 && weatherid < 500):
        {
            return  "🌧️" 

        }


        case (weatherid >= 500 && weatherid < 600):
        {
            return  "☔" 
        }

        case (weatherid >= 600 && weatherid < 700):
        {
            return  "❄️" 
  
        }

        case (weatherid >= 700 && weatherid < 800):
        {
            return  "🌫️" 
        }

        case (weatherid === 800):
        {
            return  "🌞" 
        }

        case (weatherid > 800):
            {
                return  "☁️" 
            }

        default:
        {
            return "???";
        }

    }

}

function displayerror(message)
{
    // const errordisplay = document.createElement("p");
    // errordisplay.textContent = message;
    // errordisplay.classList.add("errorDisplay");


    // card.textContent ="";
    // card.style.display ="flex";
    // card.appendChild(errordisplay);

    window.alert("Please enter a valid city");



}