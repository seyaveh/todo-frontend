const itemInput = document.getElementById("itemInput");
const addItemButton = document.getElementById("addItem");
const itemList = document.getElementById("itemList");

const API_URL = "https://your-backend-url.onrender.com/items";

function renderItem(item) {
    const newItem = document.createElement("li");
    newItem.textContent = item.text;
    newItem.dataset.id = item.id;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.classList.add("deleteBtn");

    newItem.appendChild(deleteButton);
    itemList.appendChild(newItem);
}

function showEmptyMessage() {
    const li = document.createElement("li");
    li.textContent = "No items yet. Add one above!";
    li.style.color = "#888";
    itemList.appendChild(li);
}

async function loadItems() {
    const res = await fetch(API_URL);
    const items = await res.json();
    itemList.innerHTML = "";
    if (items.length === 0) {
        showEmptyMessage();
        return;
    }
    items.forEach(item => renderItem(item));
}

async function addItem() {
    const text = itemInput.value.trim();
    if (!text) return;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    itemInput.value = "";
    loadItems();
}

async function removeItem(event) {
    if (!event.target.classList.contains("deleteBtn")) return;
    const id = event.target.parentElement.dataset.id;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadItems();
}

addItemButton.addEventListener("click", addItem);
itemList.addEventListener("click", removeItem);
 