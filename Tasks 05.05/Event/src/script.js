const txtAr = ['Broken cryons still color', `I'm not weird. I'm limited edition`,
    `An apple a day keeps the doctor away, if you throw it hard enough`,
    `If money doesn't grow on trees why banks have branches?`,
    `Of course I talk to myself. Sometimes I need expert advice.`,
    `A diamond is just a lump of coal that did well under pressure.`,
    `Somebody said today that I'm lazy. I nearly answered him.`,
    `I used to think I was indecisive. But now I'm not so sure.`,
    `Alcohol doesn’t solve any problems. But neither does milk.`];

let counter = 0;

document.addEventListener("mouseover", (e) => {
    if (e.target.nodeName === "DIV") {
        // Mode 1:
        e.target.innerText = txtAr[Math.floor(Math.random() * txtAr.length)];
        // Mode 2:
        // e.target.innerText = txtAr[counter++ % txtAr.length];
    }
});

