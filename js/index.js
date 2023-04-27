document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters()
    newMonsterForm()
    navigateMonsters()
});

const monsterContainer = document.getElementById("monster-container");
let pageNum = 1;
const createMonsterContainer = document.getElementById("create-monster");

function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then((res) => res.json())
    .then((monsterData) => renderMonsters(monsterData))
}

function renderMonsters(monsterData) {
    monsterData.forEach(monster => {
        const monsterName = document.createElement("h2");
        monsterName.textContent = monster.name;
        monsterContainer.appendChild(monsterName);

        const monsterAge = document.createElement("h4");
        monsterAge.textContent = monster.age;
        monsterContainer.appendChild(monsterAge);

        const monsterBio = document.createElement("p");
        monsterBio.textContent = monster.description;
        monsterContainer.appendChild(monsterBio);
    });
}

function newMonsterForm() {
    const monsterForm = document.createElement("form");
    createMonsterContainer.appendChild(monsterForm);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("placeholder", "Name");
    monsterForm.appendChild(nameInput);

    const ageInput = document.createElement("input");
    ageInput.setAttribute("placeholder", "Age");
    monsterForm.appendChild(ageInput);

    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("placeholder", "Description");
    monsterForm.appendChild(descriptionInput);

    const createMonsterBtn = document.createElement("button");
    createMonsterBtn.textContent = "Create Monster Button";
    monsterForm.appendChild(createMonsterBtn);

    monsterForm.addEventListener("submit", (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                age: ageInput.value,
                description: descriptionInput.value
            })
        })
        .then((res) => res.json())
        .then(() => fetchMonsters())
    })
}

function pageClear() {
    monsterContainer.innerHTML = ""
}

function navigateMonsters() {
    const backArrow = document.getElementById("back");
    const forwardArrow = document.getElementById("forward");

    backArrow.addEventListener("click", () => {
        if (pageNum > 1) {
            pageNum--;
            pageClear()
            fetchMonsters();
        }
    })

    forwardArrow.addEventListener("click", () => {
        if (pageNum < 22) {
            pageNum++;
            pageClear()
            fetchMonsters();
        }
    })
}