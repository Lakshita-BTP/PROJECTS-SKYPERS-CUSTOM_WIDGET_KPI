(function () {
  class KPIWidget extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.shadowRoot.innerHTML = `
        <style>

        .card{
            height:100%;
            box-sizing:border-box;

            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;

            font-family:Arial,sans-serif;

            background:white;
            border-radius:12px;

            box-shadow:
                0 2px 8px rgba(0,0,0,.10);

            padding:20px;
        }

        .title{
            font-size:14px;
            font-weight:bold;
            color:#6b7d99;
            text-transform:uppercase;
            margin-bottom:15px;
        }

        .value{
            font-size:42px;
            font-weight:700;
            color:#1b2a41;
            line-height:1;
        }

        .unit{
            font-size:18px;
            color:#6b7d99;
            margin-top:5px;
        }

        .subtitle{
            margin-top:15px;
            font-size:13px;
            color:#888;
        }

        </style>

        <div class="card">
            <div class="title">
                TOTAL SALES (WITH TAX)
            </div>

            <div id="value">
                Loading...
            </div>
        </div>
        `;
    }

    connectedCallback() {
      this.render();
    }

    set myDataBinding(dataBinding) {
      this._myDataBinding = dataBinding;
      this.render();
    }

    render() {
      console.log("Data Binding:", this._myDataBinding);

      const valueDiv = this.shadowRoot.getElementById("value");

      valueDiv.innerHTML =
        "<pre>" + JSON.stringify(this._myDataBinding, null, 2) + "</pre>";
    }
  }

  customElements.define("com-max-kpi", KPIWidget);
})();
