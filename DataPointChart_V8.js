(function () {
  class KPIWidget extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this._title = "TOTAL SALES (WITH TAX)";
      this._description = "Sales Value With Tax";
      this._valueColor = "#0F172A";
      this._titleColor = "#667085";

      this.shadowRoot.innerHTML = `
        <style>

        .footer{
            display:flex;
            align-items:center;
            justify-content:center;
            gap:12px;

            margin-top:15px;
        }


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
            font-size:20px;
            font-weight:700;
            color:#000000;
        }

        .subtitle{
            font-size:18px;
            color:#667085;
        }

        </style>

        <div class="card">
            <div id="title" class="title">
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

    set title(value) {
      this._title = value;
      this.render();
    }

    get title() {
      return this._title;
    }

    set description(value) {
      this._description = value;
      this.render();
    }

    get description() {
      return this._description;
    }

    set valueColor(value) {
      this._valueColor = value;
      this.render();
    }

    get valueColor() {
      return this._valueColor;
    }

    set titleColor(value) {
      this._titleColor = value;
      this.render();
    }

    get titleColor() {
      return this._titleColor;
    }

    render() {
      const valueDiv = this.shadowRoot.getElementById("value");
      const titleDiv = this.shadowRoot.getElementById("title");

      if (!valueDiv || !titleDiv) {
        return;
      }

      // const valueDiv = this.shadowRoot.getElementById("value");
      // const titleDiv = this.shadowRoot.getElementById("title");

      titleDiv.innerHTML = this.title || "TOTAL SALES (WITH TAX)";

      titleDiv.style.color = this.titleColor || "#667085";

      if (!this._myDataBinding || this._myDataBinding.state !== "success") {
        valueDiv.innerHTML = "Loading...";
        return;
      }

      try {
        const measure = this._myDataBinding.metadata.feeds.measures.values[0];

        let total = 0;

        this._myDataBinding.data.forEach((row) => {
          total += Number(row[measure].raw || 0);
        });

        valueDiv.innerHTML = `
            <div class="value"
                style="color:${this.valueColor || "#0F172A"}">
                ₹ ${Math.round(total).toLocaleString()}
            </div>

            <div class="footer">

                <span class="unit">
                    Crore
                </span>

                <span class="subtitle">
                    ${this.description || "Sales Value With Tax"}
                </span>
            </div>
        `;
      } catch (e) {
        console.error(e);

        valueDiv.innerHTML = "<pre>" + e.message + "</pre>";
      }
    }
  }

  customElements.define("com-max-kpi", KPIWidget);
})();
