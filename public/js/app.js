const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paraOne = document.querySelector('#message-1')
const paraTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location
    paraOne.textContent = 'Loading forecast...'
    paraTwo.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                paraOne.textContent = data.error
                paraTwo.textContent = ''
            } else {
                paraOne.textContent = data.location
                paraTwo.textContent =  data.weatherInfo.weather_descriptions[0] + ': Its currently ' + data.weatherInfo.temperature + ' degrees out. But feels like ' + data.weatherInfo.feelslike + ' degrees out.'
            }
        })
    })
})


