/* POSTER A5 (v37) – poster in dán quầy cho từng cửa hàng.
   Nền poster = ảnh poster-scene.jpg (ảnh bánh thật, logo thật, cọp 3D trong game, phong cách Giáng sinh) dựng sẵn khổ A5 (1500x2125).
   Phần thay đổi theo cửa hàng (tên cửa hàng, mã QR, dòng mức hóa đơn) được vẽ đè lên bằng SVG.
   Dùng trong admin.html: drawPoster(tênCửaHàng, linkKhách, mứcHóaĐơn) → chèn xem trước vào #v; printPoster() → in khổ A5 / lưu PDF. */
(function(){
var BASE=(function(){var s=document.currentScript;return s&&s.src?s.src.replace(/[^\/]*$/,''):''})();
var SCENE=BASE+'poster-scene.jpg?v=2',FONT=BASE+'FiraSans-Black.ttf?v=1',F="FiraBlack,'Fira Sans','Be Vietnam Pro',Arial,sans-serif";
function e2(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fit(str,size,maxW,k){var w=str.length*size*k;return w>maxW?' textLength="'+maxW+'" lengthAdjust="spacingAndGlyphs"':''}
function posterSVG(store,qr,min){
 var nm=e2(store),n=String(store).length,sz=62;
 if(n*sz*.62>820)sz=Math.max(34,820/(n*.62));
 var m=Number(min)||0,mt=m>=1000?Math.round(m/1000)+'k':String(m||''),line=mt?'Hóa đơn từ '+mt+' được đua 1 lần':'Mỗi hóa đơn được đua 1 lần',s='';
 s+='<svg id="pvsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1500 2125" role="img" aria-label="Poster đua cọp '+nm+'">';
 s+='<image href="'+SCENE+'" xlink:href="'+SCENE+'" x="0" y="0" width="1500" height="2125"/>';
 s+='<text x="750" y="'+Math.round(843+sz*.35)+'" text-anchor="middle" font-size="'+Math.round(sz)+'" font-family="'+F+'" fill="#1c8a2c"'+fit(String(store),sz,840,.62)+'>'+nm+'</text>';
 s+=qr?'<image x="530" y="1290" width="440" height="440" href="'+qr+'" xlink:href="'+qr+'" style="image-rendering:pixelated"/>':'<rect x="530" y="1290" width="440" height="440" fill="#eee"/><text x="750" y="1520" text-anchor="middle" font-size="60" font-family="'+F+'" fill="#999">QR</text>';
 s+='<text x="750" y="1775" text-anchor="middle" font-size="34" font-family="'+F+'" fill="#7a3410" textLength="'+Math.min(470,Math.round(line.length*18.5))+'" lengthAdjust="spacingAndGlyphs">'+e2(line)+'</text>';
 return s+'</svg>'}
function qrURL(t){var d=document.createElement('div'),u='';d.style.cssText='position:fixed;left:-9999px;top:0';document.body.appendChild(d);
 try{new QRCode(d,{text:t,width:600,height:600,correctLevel:QRCode.CorrectLevel.M});var c=d.querySelector('canvas');u=c?c.toDataURL('image/png'):'';if(!u){var im=d.querySelector('img');u=im?im.src:''}}catch(e){}
 document.body.removeChild(d);return u}
var st=document.createElement('style');
st.textContent='@font-face{font-family:FiraBlack;src:url("'+FONT+'") format("truetype");font-weight:900;font-display:block}#pvbox svg{display:block;width:100%;max-width:440px;height:auto;margin:10px auto;border-radius:10px;box-shadow:0 6px 22px rgba(0,0,0,.28)}#pw{display:none}@media print{@page{size:A5 portrait;margin:0}html,body{background:#fff!important;margin:0!important;padding:0!important}body.pp>*:not(#pw){display:none!important}body.pp #pw{display:block!important;width:148mm;height:210mm;overflow:hidden;page-break-after:avoid;break-after:avoid}body.pp #pw svg{display:block;width:148mm;height:210mm;-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
document.head.appendChild(st);
window.posterSVG=posterSVG;
window.drawPoster=function(store,url,min){var box=document.getElementById('v');if(!box)return;
 box.insertAdjacentHTML('beforeend','<h3>🖼️ Poster A5 để in dán quầy</h3><p class=hint>Poster có sẵn tên cửa hàng + QR khách của cửa hàng này. Bấm nút bên dưới → chọn khổ giấy A5 (hoặc "Lưu dưới dạng PDF") để in.</p><div id="pvbox">'+posterSVG(store,qrURL(url),min)+'</div><button class=btn data-a="printPoster">🖨️ IN / LƯU PDF POSTER A5</button>')};
window.printPoster=function(){var s=document.getElementById('pvsvg');if(!s)return;
 var old=document.getElementById('pw');if(old)old.parentNode.removeChild(old);
 var d=document.createElement('div');d.id='pw';d.innerHTML=s.outerHTML.replace('id="pvsvg"','id="pvsvg2"');document.body.appendChild(d);document.body.classList.add('pp');
 var done=function(){document.body.classList.remove('pp');window.removeEventListener('afterprint',done)};window.addEventListener('afterprint',done);
 var img=d.querySelector('image'),go=function(){setTimeout(function(){window.print()},250)};
 try{(document.fonts&&document.fonts.load?document.fonts.load('900 40px FiraBlack'):Promise.resolve()).then(go,go)}catch(e){go()}
 setTimeout(done,120000)};
})();
