style = context => `
  <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    @keyframes fadeInFromLeft {
      0% {
        transform: translate(-50%);
        opacity: 0;
      }

      100% {
        transform: translate(0);
        opacity: 1;
      }
    }

    :host {
      color: white;
      font-family: 'Roboto', sans-serif;
    }

    navbar {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background-color: ${context._backgroundColor};
      height: 4rem;
      padding: 0.5rem;
    }

    h2 {
      animation: fadeInFromLeft ease 1s 1;
    }


    a {
      color: white;
      text-decoration: none;
    }

    ul {
      display: flex;
      flex-direction: row;
      padding: 0;
      margin: 0;
      animation: fadeInFromLeft ease 1s 1;
    }

    li {
      display: flex;
      margin: 0 0.5rem;
      list-style: none;
    }

    li a {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: white;
      text-decoration: none;
    }

    li a:hover {
      text-decoration: underline;
      transition: 0.3s ease all;
    }

    input {
      border-radius: 1rem;
      border: 1px solid transparent;
      padding: 0.8rem;
      height: 0.15rem;
      animation: fadeInFromLeft ease 1s 1;
    }

    .hamburguer {
      display: none;
    }

    @media all and (max-width: ${context._breakpoint}px) {
      ul {
        display: none;
      }

      input {
        display: none;
      }

      .hamburguer {
        display: flex;
        fill: white;
        width: 2rem;
        height: 100%;
        cursor: pointer;
      }

      .contextMenuWrapper {
        position: relative;
      }

      .contextMenu {
        position: absolute;
        width: 100%;
        min-height: 10rem;
        background: ${context._backgroundColor};
        color: white;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        border: 1px solid red;
      }

      .contextMenu ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 1rem 0;
      }

      .contextMenu li {
        justify-content: center;
        margin: 0.5rem 0;
      }
    }
  </style>
`

/**
 Attributes:
  @logo - {string}
    Describes the application name. Will be rendered as a clickable H2,
    redirecting the user to the homepage.
    Ex. <navbar-element logo='My Application'...></navbar-element>

  @links - {JSON - Array<{name: string, href: string}}
    An array of objects where each represents a link defined by two properties: name and href
    Ex. <navbar-element links='[
        {
          "name": "Getting Started",
          "href": "/getting-started"
        }
      ]'
    ...></navbar-element>

  @background-color - {string}
    The navbar background color
    Ex. <navbar-element background-color='red' ...

  @breakpoint - {string}
    The breakpoint (in pixels) that the navbar should adapt to mobile view
    Ex. <navbar-element breakpoint='480' ...

 */

class Navbar extends HTMLElement {
  constructor() {
    super()

    this._root = this.attachShadow({ mode: "open" })
    this._logo = this.getAttribute("logo") || "My App"
    this._links = this.getAttribute("links") || ""
    this._backgroundColor = this.getAttribute("background-color") || "#0B9CEC"
    this._breakpoint = this.getAttribute("breakpoint") || "480"
    this._isOpen = false
  }

  get logo() { return this._logo }
  get links() { return this._links }
  get isOpen() { return this._isOpen }

  set logo(value) {
    if (value != this._logo) {
      this._logo = value
    }
  }
  set links(value) {
    if (value != this._links) {
      this._links = value
    }
  }
  set isOpen(value) {
    if (value != this._isOpen) {
      this._isOpen = value
    }
  }

  mapLinks = () => {
    const navLinks = JSON.parse(this.links)

    if (!navLinks || !navLinks.length) {
      throw new Error("Could not JSON parse navlinks!")
    }

    return navLinks.map(link => `
      <li><a href="${link.href}">${link.name}</a></li>
    `).join('')
  }

  toggleOpen = () => {
    const value = !this._isOpen

    this.isOpen = value

    console.log(this.isOpen)
  }


  connectedCallback() {

    this._root.innerHTML = `
      ${style(this)}

      <navbar>
        <a href=""><h2>${this.logo}</h2></a>

        <ul>
          ${this.mapLinks()}
        </ul>

        <input type="text" name="search" placeholder="Search..." label="search"></input>

        <svg onclick="" class="hamburguer" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(51, 51, 51);"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
      </navbar>
      <div class="contextMenuWrapper">
        <div class="contextMenu">
          <ul>
            ${this.mapLinks()}
          </ul>
        </div>
      </div>
    `

    // Event Listeners Within Shadow Tree
    this._root.querySelector(".hamburguer").addEventListener("click", () => {
      this.toggleOpen()

      this._root.querySelector(".contextMenuWrapper").style.display = this.isOpen ? "flex" : "none"
    })


    // Default On Mount Behaviours
    this._root.querySelector(".contextMenuWrapper").style.display = "none";
  }
}

customElements.define("navbar-element", Navbar)
