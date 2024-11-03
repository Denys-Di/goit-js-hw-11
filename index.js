/* empty css                      */import{S as f,i}from"./assets/vendor-BrddEoy-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const g="46871241-4d6b3672e38c39f9ae37ca0de",m="https://pixabay.com/api/";async function p(n,t=1){const o=new URLSearchParams({key:g,q:n,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:30});try{const s=await fetch(`${m}?${o.toString()}`);if(!s.ok)throw new Error("Failed to fetch images");return await s.json()}catch{throw new Error("Failed to fetch images")}}let c;function y(n){const t=document.querySelector(".gallery");t.innerHTML=n.map(({webformatURL:o,largeImageURL:s,tags:e,likes:r,views:a,comments:d,downloads:u})=>`<li>
          <a href="${s}">
           <div class="image-info">
          <img src="${o}" alt="${e}" width="300">
          
          <div class="p-style"
            <p><strong>Likes:</strong> ${r}</p>
            <p><strong>Views:</strong> ${a}</p>
            <p><strong>Comments:</strong> ${d}</p>
            <p><strong>Downloads:</strong> ${u}</p>
            </div>
          </div>
          
        </li>`).join(""),c?c.refresh():c=new f(".gallery a")}const h=document.querySelector(".search-form"),l=document.querySelector(".loader"),w=document.querySelector(".gallery");h.addEventListener("submit",async n=>{n.preventDefault();const t=n.currentTarget.elements.searchQuery.value.trim();if(!t){i.error({title:"Error",message:"Please enter a search query"});return}console.log("Show loader"),l.style.display="block",w.innerHTML="";try{const o=await p(t);console.log("Hide loader"),l.style.display="none",o.hits.length===0?i.info({message:"Sorry, there are no images matching your search query. Please try again!"}):y(o.hits)}catch(o){console.log("Hide loader on error"),l.style.display="none",i.error({title:"Error",message:o.message})}});
//# sourceMappingURL=index.js.map
