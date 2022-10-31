console.log("client side js file")

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

if (weatherFrom) {
    weatherFrom.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value;
        msgOne.textContent = 'Loading.....'
        msgTwo.textContent = ''

        try {
            fetch('/weather?address=' + location).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        msgOne.textContent = data.error
                    } else {
                        msgOne.textContent = `Your Location is ${data.location}`
                        msgTwo.textContent = `your temperature like ${data.forecast.temperature}, you feelslike ${data.forecast.feelslike} and your weather like ${data.forecast.weather_descriptions}`
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    })
}
