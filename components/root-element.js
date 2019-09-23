const style = `
  <style>
    p {
      color: red;
    }
  </style>
`

class Root extends HTMLElement {
  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
  }


  connectedCallback() {
    this.root.innerHTML = `
      ${style}

      <p>Root Element</p>
    `
  }
}

customElements.define("root-element", Root)
