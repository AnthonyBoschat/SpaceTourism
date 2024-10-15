import {planets} from "./--data-planets.js"

const planetList = document.querySelector(".destination-planet-list")
const planetImageDOM = document.querySelector(".planet-image")
const planetNameDOM = document.querySelector(".destination-planet-name")
const planetDescriptionDOM = document.querySelector(".destination-planet-description")
const distanceDOM = document.querySelector(".distance")
const travelTimeDOM = document.querySelector(".travelTime")

let dataPlanets = [...planets]


const detectSelectedPlanet = () => {
    const selectedPlanet = dataPlanets.find(planet => planet.selected === true)
    return selectedPlanet
}
const constructTemplate = () => {
    const selectedPlanet = detectSelectedPlanet()
    planetNameDOM.innerHTML = selectedPlanet.name
    planetDescriptionDOM.innerHTML = selectedPlanet.description
    distanceDOM.innerHTML = selectedPlanet.distance
    travelTimeDOM.innerHTML = selectedPlanet.travelTime
    planetImageDOM.src = selectedPlanet.image
}

const constructPlanetList = () => {
    let listOfPlanets = ""
    dataPlanets.forEach(planet => {
        const newPlanet = `<a class="onePlanet ${planet.selected ? "selected" : ""}">${planet.name}</a>`
        listOfPlanets += newPlanet
    })
    planetList.innerHTML = listOfPlanets
}

const changeSelectedPlanet = (e) => {
    const planetNameClicked = e.target.innerHTML
    const newDataPlanets = dataPlanets.map(planet => {
        planet.selected = planet.name === planetNameClicked ? true : false
        return planet
    })
    dataPlanets = newDataPlanets
    main()
}

const attachListenerPlanetButton = () => {
    const planetsButtons = document.querySelectorAll(".onePlanet")
    console.log(planetsButtons)
    planetsButtons.forEach(button => {
        button.addEventListener("click", (e) => changeSelectedPlanet(e))
    })
}

const main = () => {
    constructTemplate()
    constructPlanetList()
    attachListenerPlanetButton()
}

main()



