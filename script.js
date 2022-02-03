"use strict";

let tooltip;

document.addEventListener("mouseover", showTooltip);
document.addEventListener("mouseout", removeTooltip);

function showTooltip(event) {
    if (!event.target.dataset.tooltip) return;

    if (document.querySelector(".tooltip")) return;

    let targetElem = event.target;
    let targetCoords = targetElem.getBoundingClientRect();

    tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.insertAdjacentHTML("afterbegin", targetElem.dataset.tooltip);
    document.body.append(tooltip);

    let tooltipCssTop = targetCoords.top - tooltip.offsetHeight - 5;
    let tooltipCssLeft = targetCoords.left + targetElem.offsetWidth / 2 - tooltip.offsetWidth / 2;

    if (tooltipCssLeft < 0) tooltipCssLeft = 0;
    if (tooltipCssLeft + tooltip.offsetWidth > document.documentElement.clientWidth) {
        let excess = Math.ceil(
            tooltipCssLeft + tooltip.offsetWidth - document.documentElement.clientWidth
        );

        tooltipCssLeft = tooltipCssLeft - excess;
    }

    if (tooltipCssTop < 0) {
        tooltipCssTop = targetCoords.bottom + 5;
    }

    tooltip.style.top = tooltipCssTop + "px";
    tooltip.style.left = tooltipCssLeft + "px";
}

function removeTooltip(event) {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
}
