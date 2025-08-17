(function() {
  // == Create Add Trade Button ==
  const btn = document.createElement("button");
  btn.innerText = "+ Add Trade";
  Object.assign(btn.style, {
    position: "fixed",
    top: "80px",
    right: "30px",
    zIndex: 99999,
    padding: "10px 15px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px"
  });
  document.body.appendChild(btn);

  // == Create Popup Form (black text) ==
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
                background:#f5f5f5;color:#000;padding:20px;border-radius:10px;
                z-index:100000;width:300px;display:none;box-shadow:0 4px 20px rgba(0,0,0,0.4)">
      <h3 style="margin-top:0;color:#000">Add Trade</h3>
      <label>Pair:<br><input id="tradePair" value="USD/ARS (OTC)" style="width:100%;margin-bottom:6px"></label>
      <label>Amount ($):<br><input id="tradeAmount" value="1000" style="width:100%;margin-bottom:6px"></label>
      <label>Direction:<br>
        <select id="tradeDir" style="width:100%;margin-bottom:6px">
          <option value="up">UP</option>
          <option value="down">DOWN</option>
        </select>
      </label>
      <label>Result:<br><input id="tradeResult" value="+1,890.00 $" style="width:100%;margin-bottom:6px"></label>
      <label>Time:<br><input id="tradeTime" value="00:01:00" style="width:100%;margin-bottom:6px"></label>
      <div style="text-align:right;margin-top:10px">
        <button id="addTradeBtn" style="padding:6px 12px;background:#2196f3;color:#fff;border:none;border-radius:5px;cursor:pointer">Add</button>
        <button id="closeTradeBtn" style="padding:6px 12px;background:#f44336;color:#fff;border:none;border-radius:5px;cursor:pointer">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  const popupDiv = popup.querySelector("div");

  // Show/Hide popup
  btn.onclick = () => popupDiv.style.display = "block";
  popup.querySelector("#closeTradeBtn").onclick = () => popupDiv.style.display = "none";

  // == Add Trade Function ==
  popup.querySelector("#addTradeBtn").onclick = () => {
    const pair = document.getElementById("tradePair").value;
    const amount = document.getElementById("tradeAmount").value;
    const dir = document.getElementById("tradeDir").value;
    const result = document.getElementById("tradeResult").value;
    const time = document.getElementById("tradeTime").value;

    const dirClass = dir === "up" ? "trades-list-item__delta--up" : "trades-list-item__delta--down";
    const icon = dir === "up" ? "icon-arrow-up-circle" : "icon-arrow-down-circle";

    const tradeHTML = `
      <div class="trades-list__item trades-list-item trades-list-item__close">
        <div class="trades-list-item__title">
          <svg class="icon-caret trades-list-item__caret"><use xlink:href="/profile/images/spritemap.svg#icon-caret"></use></svg>
          <div class="flags trades-list-item__flags flags">
            <svg class="flag-usd"><use xlink:href="/profile/images/flags.svg#flag-usd"></use></svg>
            <svg class="flag-ars"><use xlink:href="/profile/images/flags.svg#flag-ars"></use></svg>
          </div>
          <div class="trades-list-item__name" dir="ltr">${pair}</div>
          <div class="trades-list-item__countdown">${time}</div>
          <div class="trades-list-item__delta ${dirClass}">
            <svg class="${icon}"><use xlink:href="/profile/images/spritemap.svg#${icon}"></use></svg>${amount} $
            <div class="trades-list-item__delta-right ${dirClass}">${result}</div>
          </div>
        </div>
      </div>
    `;

    const container = document.querySelector(".deal-list__items.active");
    if (container) {
      const dateBlock = container.querySelector(".trades-list__date");
      if (dateBlock) {
        // ✅ trade always after date row
        dateBlock.insertAdjacentHTML("afterend", tradeHTML);
      } else {
        // agar date block hi na ho
        container.insertAdjacentHTML("afterbegin", tradeHTML);
      }
    } else {
      alert("⚠️ Trades container not found!");
    }
    popupDiv.style.display = "none";
  };
})();
