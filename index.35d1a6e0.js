fetch("https://tasty-treats-backend.p.goit.global/api/categories").then((function(t){return t.json()})).then((function(t){var e=document.querySelector(".categories-list");t.forEach((function(t){var n=document.createElement("button");n.textContent=t.name,n.classList.add("categories-list-element"),e.appendChild(n)}))})).catch((function(t){console.error(t)}));
//# sourceMappingURL=index.35d1a6e0.js.map
