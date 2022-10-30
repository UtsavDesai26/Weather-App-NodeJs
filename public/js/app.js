console.log("client side js file")

const weatherFrom = document.querySelector('from')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

if (weatherFrom) {
    weatherFrom.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log("-----------")

        const location = search.value;
        console.log(location)
        msgOne.textContent = 'Loading.....'
        msgTwo.textContent = ''

        try {
            fetch('http://localhost:3000/weather?address=' + location).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        msgOne.textContent = data.error
                    } else {
                        msgOne.textContent = data.location
                        msgTwo.textContent = data.forecast.temperature
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    })
}
