const expenseWraper = document.querySelector(".expense-bar-wraper");

const createTooltipComponent = (amount) => {
  const tooltipElement = document.createElement("span");
  tooltipElement.textContent = `$${amount}`;
  tooltipElement.classList.add(`bar-tooltip`);
  return tooltipElement;
};

const createBottomCartTextComponent = (day) => {
  const textElement = document.createElement("p");
  textElement.textContent = day;
  textElement.classList.add("bar-bottom-text");
  return textElement;
};

const createCartWraperComponent = () => {
  const cartWraperElement = document.createElement("div");
  cartWraperElement.classList.add("bar-wraper");

  return cartWraperElement;
};

const createCartComponent = (data) => {
  const cartElement = document.createElement("div");
  cartElement.style = `--height: calc(${data.amount}px * 2.5)`;
  cartElement.classList.add("progress-bar");
  if (data.isHighest) {
    cartElement.classList.add("higest-bar-color");
  }
  return cartElement;
};

fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const maxValue = Math.max(...data.map((datum) => datum.amount));
    data.forEach((datum) => {
      if (datum.amount === maxValue) {
        datum = { ...datum, isHighest: true };
      }
      const cartWraper = createCartWraperComponent();
      const cartElement = createCartComponent(datum);
      const bottomTextElement = createBottomCartTextComponent(datum.day);
      const tooltip = createTooltipComponent(datum.amount);

      cartWraper.appendChild(cartElement);
      cartWraper.appendChild(bottomTextElement);
      cartWraper.appendChild(tooltip);

      expenseWraper.append(cartWraper);
    });
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
