(function () {
  class KPIWidget extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this._title = "TOTAL SALES (WITH TAX)";
      this._description = "Sales Value With Tax";
      this._valueColor = "#0F172A";
      this._titleColor = "#667085";
      this._circleColor = "rgba(249,115,22,0.07)";
      this._bottomLineColor = "#F97316";

      this._titleX = 0;
      this._titleY = 0;
      this._valueX = 0;
      this._valueY = 0;
      this._footerX = 0;
      this._footerY = 0;

      this._titleFontSize = 14;
      this._valueFontSize = 42;
      this._footerFontSize = 18;

      this._showCurrency = true;
      this._decimalPlaces = 0;

      this.shadowRoot.innerHTML = `
        <style>

        .footer{
            display:flex;
            align-items:center;
            justify-content:center;
            gap:12px;

            margin-top:15px;
        }

        .outer{
            width:100%;
            height:100%;
            padding:5px;
            box-sizing:border-box;
        }

        .card{
            height:100%;
            box-sizing:border-box;

            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;

            font-family:Arial,sans-serif;

            background:#ffffff;
            border-radius:12px;

            box-shadow: 0 0 11px rgba(0,0,0,0.10);

            padding:20px;
            position:relative;
            overflow:hidden;
        }

        .card::before{
            content:"";
            position:absolute;

            width:35%;
            aspect-ratio:1;

            top:-30%;
            right:-15%;

            border-radius:50%;
            background:var(--circle-color);
            pointer-events:none;
        }
        .card::after{
            content:"";
            position:absolute;
            left:0;
            bottom:0;
            width:100%;
            height:4px;
            background:var(--bottom-line-color); /* orange line */
        }

        .title{
            font-size:14px;
            font-weight:bold;
            color:#6b7d99;
            text-transform:uppercase;
            margin-bottom:15px;
        }

        .value{
            display:flex;
            align-items:flex-start;
            justify-content:center;
            gap:8px;
            line-height:1;
        }
        .currency{
            font-size:28px;
            font-weight:700;
            margin-top:6px;
        }
        .amount{
            font-size:42px;
            font-weight:700;
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

        <div class="outer">
          <div class="card">
              <div id="title" class="title">
              </div>

              <div id="value">
                  Loading...
              </div>
          </div>
        </div>
        `;

      const card = this.shadowRoot.querySelector(".card");

      card.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("onCardClick", {
            detail: {
              title: this._title,
            },
          }),
        );
      });
    }

    connectedCallback() {
      console.log("title =", this.title);
      console.log("description =", this.description);
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

    set circleColor(value) {
      this._circleColor = value;
      this.render();
    }

    get circleColor() {
      return this._circleColor;
    }

    set bottomLineColor(value) {
      this._bottomLineColor = value;
      this.render();
    }

    get bottomLineColor() {
      return this._bottomLineColor;
    }

    set showCurrency(value) {
      this._showCurrency = value;
      this.render();
    }

    get showCurrency() {
      return this._showCurrency;
    }

    set decimalPlaces(value) {
      this._decimalPlaces = value;
      this.render();
    }

    get decimalPlaces() {
      return this._decimalPlaces;
    }

    // ===== ADD HERE =====

    setTitle(title) {
      this._title = title;
      this.render();
    }

    getTitle() {
      return this._title;
    }

    setDescription(description) {
      this._description = description;
      this.render();
    }

    getDescription() {
      return this._description;
    }

    setValueColor(valueColor) {
      this._valueColor = valueColor;
      this.render();
    }

    getValueColor() {
      return this._valueColor;
    }

    setTitleColor(titleColor) {
      this._titleColor = titleColor;
      this.render();
    }

    getTitleColor() {
      return this._titleColor;
    }

    setCircleColor(color) {
      this._circleColor = color;
      this.render();
    }

    getCircleColor() {
      return this._circleColor;
    }

    setBottomLineColor(color) {
      this._bottomLineColor = color;
      this.render();
    }

    getBottomLineColor() {
      return this._bottomLineColor;
    }

    setTitlePosition(x, y) {
      this._titleX = x;
      this._titleY = y;
      this.render();
    }

    setValuePosition(x, y) {
      this._valueX = x;
      this._valueY = y;
      this.render();
    }

    setFooterPosition(x, y) {
      this._footerX = x;
      this._footerY = y;
      this.render();
    }

    getTitlePosition() {
      return `${this._titleX},${this._titleY}`;
    }

    getValuePosition() {
      return `${this._valueX},${this._valueY}`;
    }

    getFooterPosition() {
      return `${this._footerX},${this._footerY}`;
    }

    setTitleFontSize(size) {
      this._titleFontSize = size;
      this.render();
    }

    getTitleFontSize() {
      return this._titleFontSize;
    }

    setValueFontSize(size) {
      this._valueFontSize = size;
      this.render();
    }

    getValueFontSize() {
      return this._valueFontSize;
    }

    setFooterFontSize(size) {
      this._footerFontSize = size;
      this.render();
    }

    getFooterFontSize() {
      return this._footerFontSize;
    }

    setShowCurrency(value) {
      this._showCurrency = value;
      this.render();
    }

    getShowCurrency() {
      return this._showCurrency;
    }

    setDecimalPlaces(value) {
      this._decimalPlaces = value;
      this.render();
    }

    getDecimalPlaces() {
      return this._decimalPlaces;
    }

    // ===== END =====

    render() {
      const valueDiv = this.shadowRoot.getElementById("value");
      const titleDiv = this.shadowRoot.getElementById("title");
      const card = this.shadowRoot.querySelector(".card");

      card.style.setProperty(
        "--circle-color",
        this.circleColor || "rgba(249,115,22,0.07)",
      );

      card.style.setProperty(
        "--bottom-line-color",
        this.bottomLineColor || "#F97316",
      );

      if (!valueDiv || !titleDiv) {
        return;
      }

      titleDiv.innerHTML = this.title || "TOTAL SALES (WITH TAX)";
      titleDiv.style.color = this.titleColor || "#667085";
      titleDiv.style.fontSize = `${this._titleFontSize}px`;
      titleDiv.style.width = "100%";
      titleDiv.style.transform = `translate(${this._titleX}px, ${this._titleY}px)`;

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
                ${this.showCurrency ? '<span class="currency">₹</span>' : ""}
                <span class="amount"
                      style="font-size:${this._valueFontSize}px">
                      ${Number(total).toLocaleString(undefined, {
                        minimumFractionDigits: this._decimalPlaces,
                        maximumFractionDigits: this._decimalPlaces
                      })}
                </span>
            </div>

            <div class="footer">

                <span class="unit"
                      style="font-size:${this._footerFontSize}px">
                    Crore
                </span>

                <span class="subtitle"
                      style="font-size:${this._footerFontSize}px">
                    ${this.description || "Sales Value With Tax"}
                </span>
            </div>
        `;
        const value = valueDiv.querySelector(".value");
        const footer = valueDiv.querySelector(".footer");

        if (value) {
          value.style.transform = `translate(${this._valueX}px, ${this._valueY}px)`;
        }

        if (footer) {
          footer.style.transform = `translate(${this._footerX}px, ${this._footerY}px)`;
        }
      } catch (e) {
        console.error(e);

        valueDiv.innerHTML = "<pre>" + e.message + "</pre>";
      }
    }
  }

  customElements.define("com-max-kpi", KPIWidget);
})();
