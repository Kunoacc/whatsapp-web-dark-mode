let darkImg = chrome.runtime.getURL("bg.png")
let originalStyleContent = document.querySelector("style").textContent
let lightImg = "https://web.whatsapp.com/img/bg-chat-tile_9e8a2898faedb7db9bf5638405cf81ae.png"

const DARK_THEME = "dark"
const LIGHT_THEME = "light"

const setStyleContent = (img) => `
    ${originalStyleContent}

    [data-asset-chat-background] {
        background-image: url("${img}") !important
    }
      `

document.querySelector("body").className = localStorage.getItem("theme") || "dark"
document.querySelector("style").textContent = setStyleContent(darkImg)

const toggle = document.createElement("div")
toggle.setAttribute("class", "toggle")

const night = document.createElement("span")
night.appendChild(document.createTextNode("🌙"))

const input = document.createElement("input")
input.setAttribute("type", "checkbox")
input.setAttribute("id", "toggle-switch")
input.onchange = (event) => handleTheme(event)
input.checked = localStorage.getItem("theme") === LIGHT_THEME

const label = document.createElement("label")
label.setAttribute("for", "toggle-switch")

const screenReader = document.createElement("span")
screenReader.setAttribute("class", "screen-reader-text")
screenReader.appendChild(document.createTextNode("Toggle Color Scheme"))
label.appendChild(screenReader)

const day = document.createElement("span")
day.appendChild(document.createTextNode("🌞"))

toggle.appendChild(night)
toggle.appendChild(input)
toggle.appendChild(label)
toggle.appendChild(day)

const handleTheme = ({
    target
}) => {
    if (target.checked) {
        document.querySelector("style").textContent = setStyleContent(lightImg)
        document.querySelector("body").className = "web"
        localStorage.setItem("theme", LIGHT_THEME)
    } else {
        document.querySelector("style").textContent = setStyleContent(darkImg)
        document.querySelector("body").className = "dark"
        localStorage.setItem("theme", DARK_THEME)
    }
}

const addToggle = () => {
    const appContainer = document.querySelector("div#app");
    document.body.insertBefore(toggle, appContainer)
}

// Check if loader is still in the DOM before inserting toggle
let interval

const checkLoader = () => {
    console.log('logged!')
    const loader = [document.querySelector("#initial_startup"), document.querySelector("#startup")]
    if (loader[0] === null && loader[1] === null) {
        addToggle()
        clearInterval(interval)
    }
}

interval = setInterval(function () {
    checkLoader()
}, 500)