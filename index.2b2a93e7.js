var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var i=t[e];delete t[e];var a={id:e,exports:{}};return n[e]=a,i.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},e.parcelRequired7c6=i);var a=i("2shzp");const o=document.querySelector(".gallery"),l=document.documentElement.clientWidth;let r=0;l<768?r=6:l>768&&l<1280?r=8:l>1280&&(r=9);async function s(){try{!function(e){let n=e.map((e=>`<div class="gallery__link">\n      <img src="${e.preview}" alt="${e.title}" loading="lazy" />\n      <div class="info">\n        <p class="info-item">\n          <b>Title: ${e.title}</b>\n        </p>\n        <p class="info-item">\n          <b>Category: ${e.category}</b>\n        </p>\n        <p class="info-item">\n          <b>Comments: ${e.description}</b>\n        </p>\n                <p class="info-item">\n          <b>Area: ${e.area}</b>\n        </p>\n      </div>\n    </div>`));o.insertAdjacentHTML("beforeend",n.join(""))}((await a.default.get("https://tasty-treats-backend.p.goit.global/api/recipes",{params:{q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:r}})).data.results)}catch(e){console.log(`Failed to fetch images: ${e}`)}}document.addEventListener("DOMContentLoaded",(()=>{s()}));
//# sourceMappingURL=index.2b2a93e7.js.map
