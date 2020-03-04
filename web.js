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
    html {
        --bg-color: #09393f;
      }
      html.dark-mode {
        --bg-color: #ffffff;
      }

      body, .web, .dark {
        -webkit-transition: 2s ease;
        transition: 2s ease;
      }

      .toggle {
        transform: rotate(90deg);
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
                align-items: center;
        justify-content: space-around;
        max-width: 140px;
        z-index: 9999;
        bottom: 75px;
        right: -40px;
        position: absolute;
      }
      .toggle span {
        margin: 0 0.5rem;
      }
      .toggle input[type="checkbox"] {
        height: 0;
        width: 0;
        visibility: hidden;
      }
      .toggle input[type="checkbox"]:checked + label {
        background: teal;
      }
      .toggle input[type="checkbox"]:checked + label:after {
        left: calc(100% - 2px);
        -webkit-transform: translateX(-100%);
                transform: translateX(-100%);
      }
      .toggle label {
        cursor: pointer;
        width: 65px;
        height: 24px;
        background: rgba(0, 0, 0, 0.27);
        display: block;
        border-radius: 40px;
        position: relative;
      }
      .toggle label:after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 40px;
        -webkit-transition: 0.3s;
        transition: 0.3s;
      }

      .screen-reader-text {
        border: 0;
        clip: rect(1px, 1px, 1px, 1px);
        -webkit-clip-path: inset(50%);
                clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute !important;
        width: 1px;
        word-wrap: normal !important;
      }

      html {
        height: 100%;
      }

      body {
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
                align-items: center;
        -webkit-box-pack: center;
                justify-content: center;
        height: 100%;
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

// Check if loader is still in the DOM before inserting
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

console.log("I'm here!!!")