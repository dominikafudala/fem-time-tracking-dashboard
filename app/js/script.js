const allTimeFrames = document.querySelectorAll(".time a");
const activityCards = document.querySelector(".activity-cards__list");

const createElement = (type, className) => {
    let newElement = document.createElement(type);
    newElement.classList.add(className);
    return newElement;
}

const addElement = (e, time) => {

    let newCard = createElement("li", "activity-cards__list__elem");
    let newCardSection = createElement("div", "activity-cards__list__elem__section");

    let newCardHeader = createElement("h2", "activity-cards__list__elem__header");
    let newCardEllipsis = createElement("img", "activity-cards__list_elem__ellipsis")
    let newCardCurrent = createElement("p", "activity-cards__list__elem__current");
    let newCardPrevious = createElement("p", "activity-cards__list__elem__previous");

    newCard.classList.add(e.title.toLowerCase().replace(/\s/g, ""));


    newCardHeader.textContent = e.title;
    newCardEllipsis.src = "/images/icon-ellipsis.svg";

    switch (time) {
        case "daily": {
            newCardCurrent.textContent = e.timeframes.daily.current + 'hrs';
            newCardPrevious.textContent = 'Last week - ' + e.timeframes.daily.previous + 'hrs';
            break;
        }
        case "weekly": {
            newCardCurrent.textContent = e.timeframes.weekly.current + 'hrs';
            newCardPrevious.textContent = 'Last week - ' + e.timeframes.weekly.previous + 'hrs';
            break;
        }
        case "monthly": {
            newCardCurrent.textContent = e.timeframes.monthly.current + 'hrs';
            newCardPrevious.textContent = 'Last week - ' + e.timeframes.monthly.previous + 'hrs';
            break;
        }
    }

    newCardSection.appendChild(newCardHeader);
    newCardSection.appendChild(newCardEllipsis);
    newCardSection.appendChild(newCardCurrent);
    newCardSection.appendChild(newCardPrevious);

    newCard.appendChild(newCardSection);

    activityCards.appendChild(newCard);
}


const fetchData = (className = "daily") => {
    const allListElem = document.querySelectorAll(".activity-cards__list li");
    allListElem.forEach(elem => {
        activityCards.removeChild(elem);
    })
    fetch("../../data.json").then(response => response.json()).then(data => data.forEach(element => {
        addElement(element, className); // for each JSON element create card and append it to DOM
    }));
}

const changeTime = (e) => {
    e.preventDefault();
    const className = e.target.classList[0];
    allTimeFrames.forEach(timeFrame => {
        timeFrame.classList.remove("time--active");
    })

    e.target.classList.add("time--active")
    fetchData(className);
}

fetchData();

allTimeFrames.forEach(a => a.addEventListener("click", changeTime));