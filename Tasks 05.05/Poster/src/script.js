const container = document.createElement("div");
container.classList.add("container");

const h1 = document.createElement("h1");
h1.innerText = "Nobody's Perfect.";

const txt = document.createElement("p");
txt.classList.add("border");
txt.innerText = "1983 LeMans result";

const topContainer = document.createElement("pre");
topContainer.classList.add("top");

container.append(h1, txt, topContainer);
document.body.append(container);

for (let i = 0; i < 10; i++) {
    topContainer.innerHTML += `${i + 1}<sup>${i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"}</sup> ${i === 8 ? "Sauber/BMW" : "Porche"}\n`;
}

const parContainer = document.createElement("div");
parContainer.style.width = "60%";

const par = document.createElement("p");
par.innerText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe nemo error asperiores labore, corporis nisi necessitatibus";

parContainer.append(par);
container.append(parContainer);
