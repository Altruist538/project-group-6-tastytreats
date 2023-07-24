fetch("https://tasty-treats-backend.p.goit.global/api/categories").then((t=>t.json())).then((t=>{const e=document.querySelector(".categories-list");t.forEach((t=>{const o=document.createElement("button");o.textContent=t.name,o.classList.add("categories-list-element"),e.appendChild(o)}))})).catch((t=>{console.error(t)}));
//# sourceMappingURL=index.8b74ef70.js.map
