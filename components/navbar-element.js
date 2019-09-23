const style = context => `
  <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

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
    }

    ul {
      display: flex;
      height: 100%;
      flex-direction: row;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      height: 100%;
      margin-right: 0.5rem;
      list-style: none;
    }

    li a {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 100%;
      color: white;
      text-decoration: none;
      padding: 0 0.5rem;
    }

    li a:hover {
      background: #097CBC;
      text-decoration: underline;
    }

    a {
      color: white;
      text-decoration: none;
    }

    input {
      border-radius: 1rem;
      border: 1px solid #097CBC;
      padding: 0.8rem;
      height: 0.15rem;
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


 */

class Navbar extends HTMLElement {
  constructor() {
    super()

    this._root = this.attachShadow({ mode: "open" })
    this._logo = this.getAttribute("logo") || "My App"
    this._links = this.getAttribute("links") || []

    this._backgroundColor = this.getAttribute("background-color") || "#0B9CEC"
  }

  get logo() {
    return this._logo;
  }
  get links() {
    return this._links;
  }

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

  mapLinks = () => {
    const navLinks = JSON.parse(this.links)

    return navLinks.map(link => `
      <li><a href="${link.href}">${link.name}</a></li>
    `).join('')
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
      </navbar>
    `
  }
}

customElements.define("navbar-element", Navbar)
