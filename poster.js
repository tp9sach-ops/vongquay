/* POSTER A5 (v36) – poster in dán quầy cho từng cửa hàng: chương trình + tên cửa hàng + đường đua cọp + bánh 9 Sạch + QR khách, phong cách Giáng sinh.
   Dùng trong admin.html: drawPoster(tênCửaHàng, linkKhách, mứcHóaĐơn) → chèn xem trước vào #v; printPoster() → in khổ A5 / lưu PDF. Toàn bộ là SVG, không cần ảnh ngoài. */
(function(){
var F="'Baloo 2','Be Vietnam Pro',Arial,sans-serif";
function rnd(s){return function(){s=(s*9301+49297)%233280;return s/233280}}
function e2(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function f1(n){return Math.round(n*100)/100}
/* chữ viền kiểu poster: bóng đậm + viền trắng + ruột màu */
function T(t,x,y,sz,fill,sh,o){o=o||{};
 var a='text-anchor="'+(o.a||'middle')+'" font-family="'+F+'" font-weight="800" font-size="'+sz+'"'+(o.tl?' textLength="'+o.tl+'" lengthAdjust="spacingAndGlyphs"':'')+(o.it?' font-style="italic"':''),sw=o.sw||sz*.16;
 return '<text x="'+x+'" y="'+f1(y+sz*.07)+'" '+a+' fill="'+sh+'" stroke="'+sh+'" stroke-width="'+f1(sw*1.3)+'" stroke-linejoin="round">'+t+'</text>'
 +'<text x="'+x+'" y="'+y+'" '+a+' fill="#fff" stroke="#fff" stroke-width="'+f1(sw)+'" stroke-linejoin="round">'+t+'</text>'
 +'<text x="'+x+'" y="'+y+'" '+a+' fill="'+fill+'">'+t+'</text>'}
function P(t,x,y,sz,fill,o){o=o||{};return '<text x="'+x+'" y="'+y+'" text-anchor="'+(o.a||'middle')+'" font-family="'+F+'" font-weight="'+(o.w||800)+'" font-size="'+sz+'" fill="'+fill+'"'+(o.tl?' textLength="'+o.tl+'" lengthAdjust="spacingAndGlyphs"':'')+'>'+t+'</text>'}
function spark(x,y,r){return '<path d="M'+x+' '+(y-r)+'Q'+x+' '+y+' '+(x+r)+' '+y+'Q'+x+' '+y+' '+x+' '+(y+r)+'Q'+x+' '+y+' '+(x-r)+' '+y+'Q'+x+' '+y+' '+x+' '+(y-r)+'Z" fill="#fff"/>'}

/* ---------- Cọp mascot vàng (mắt nâu to, tai hồng) ---------- */
function tiger(x,y,s,o){o=o||{};var B='#ffc21a',K='#7a3410',ph=o.ph||0,al=o.al==null?22:o.al,ar=o.ar==null?-22:o.ar,h='<g transform="translate('+x+' '+y+') scale('+s+')">';
 if(o.speed)h+='<path d="M-17 -26h-8M-18 -19h-11M-17 -12h-7" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>';
 h+='<path d="M9 -8C22 -6 26 -18 20 -24" fill="none" stroke="'+B+'" stroke-width="4.2" stroke-linecap="round"/><path d="M9 -8C22 -6 26 -18 20 -24" fill="none" stroke="'+K+'" stroke-width="4.2" stroke-dasharray="1.3 3.4"/>';
 h+='<g transform="translate(0 '+(ph?-3:0)+')"><rect x="-8" y="-7" width="6" height="7" rx="3" fill="'+B+'"/><ellipse cx="-5" cy="0" rx="4.4" ry="2.4" fill="#fff"/></g>';
 h+='<g transform="translate(0 '+(ph?0:-3)+')"><rect x="2" y="-7" width="6" height="7" rx="3" fill="'+B+'"/><ellipse cx="5" cy="0" rx="4.4" ry="2.4" fill="#fff"/></g>';
 h+='<ellipse cx="0" cy="-15" rx="10" ry="11.5" fill="'+B+'"/><ellipse cx="0" cy="-13" rx="6.2" ry="8.2" fill="#fff4d6"/>';
 h+='<path d="M-9.8 -20l3.2 .8M-10 -15l3.6 1M-9.2 -10l3.2 1.2M9.8 -20l-3.2 .8M10 -15l-3.6 1M9.2 -10l-3.2 1.2" stroke="'+K+'" stroke-width="1.5" stroke-linecap="round" fill="none"/>';
 if(o.hold)h+='<rect x="-6.5" y="-21" width="13" height="10" rx="1" fill="#d4112e"/><rect x="-1.2" y="-21" width="2.4" height="10" fill="#ffd54a"/><rect x="-6.5" y="-17" width="13" height="2.2" fill="#ffd54a"/>';
 h+='<g transform="rotate('+al+' -10 -22)"><ellipse cx="-11" cy="-16" rx="3" ry="6" fill="'+B+'"/><circle cx="-11" cy="-10.6" r="2.8" fill="#fff"/></g>';
 h+='<g transform="rotate('+ar+' 10 -22)"><ellipse cx="11" cy="-16" rx="3" ry="6" fill="'+B+'"/><circle cx="11" cy="-10.6" r="2.8" fill="#fff"/></g>';
 h+='<circle cx="-10" cy="-38.5" r="4.3" fill="'+B+'"/><circle cx="-10" cy="-38.5" r="2.5" fill="#f2a2ac"/><circle cx="10" cy="-38.5" r="4.3" fill="'+B+'"/><circle cx="10" cy="-38.5" r="2.5" fill="#f2a2ac"/>';
 h+='<circle cx="0" cy="-30" r="11.8" fill="'+B+'"/>';
 if(o.hat!=='santa')h+='<path d="M0 -41.3v3.6M-3.2 -40.6l.9 3M3.2 -40.6l-.9 3" stroke="'+K+'" stroke-width="1.1" stroke-linecap="round"/>';
 h+='<path d="M-11.6 -31.5l2.8 .6M-11.6 -28l2.8-.2M11.6 -31.5l-2.8 .6M11.6 -28l-2.8-.2" stroke="'+K+'" stroke-width="1" stroke-linecap="round"/>';
 h+='<ellipse cx="0" cy="-26" rx="6.6" ry="4.6" fill="#fff"/><circle cx="-8" cy="-26" r="2.2" fill="#f7a8a8" opacity=".8"/><circle cx="8" cy="-26" r="2.2" fill="#f7a8a8" opacity=".8"/>';
 h+='<ellipse cx="-4.6" cy="-30.6" rx="2.6" ry="3.2" fill="#4a2410"/><ellipse cx="4.6" cy="-30.6" rx="2.6" ry="3.2" fill="#4a2410"/><circle cx="-5.3" cy="-31.9" r=".95" fill="#fff"/><circle cx="3.9" cy="-31.9" r=".95" fill="#fff"/><circle cx="-3.8" cy="-29.6" r=".5" fill="#fff"/><circle cx="5.4" cy="-29.6" r=".5" fill="#fff"/>';
 h+='<path d="M-1.7 -28.1h3.4l-1.7 1.9z" fill="#e8607a"/><path d="M0 -26.2v1M0 -25.2q-1.6 1.5-3 .2M0 -25.2q1.6 1.5 3 .2" stroke="'+K+'" stroke-width=".5" fill="none" stroke-linecap="round"/>';
 if(o.hat==='santa')h+='<path d="M-11.5 -37.5C-10 -50 2 -56 13 -49C14.5 -46 13 -42 12 -37.5Z" fill="#d4112e"/><circle cx="13.6" cy="-48" r="3.2" fill="#fff"/><rect x="-12.8" y="-40.2" width="25.6" height="5.4" rx="2.7" fill="#fff"/>';
 if(o.hat==='gift')h+='<rect x="-7.5" y="-50" width="15" height="9.5" rx="1" fill="'+o.gc+'"/><rect x="-1.3" y="-50" width="2.6" height="9.5" fill="#ffd54a"/><rect x="-8.8" y="-53.4" width="17.6" height="4" rx="1" fill="'+o.gc2+'"/><rect x="-1.3" y="-53.4" width="2.6" height="4" fill="#ffd54a"/><path d="M0 -53.4C-6 -60.5 -10 -56 -6.5 -53.8ZM0 -53.4C6 -60.5 10 -56 6.5 -53.8Z" fill="#ffd54a" stroke="#e8a317" stroke-width=".4"/>';
 return h+'</g>'}

/* ---------- Bánh sầu riêng: tròn, chia múi, phủ dừa (xanh lá dứa / khoai môn / vàng / than tre / mix 3 vị) ---------- */
var CK={green:['#92d84c','#68b02c','#f6dd55'],purple:['#bba2e6','#8f70c6','#f6dd55'],yellow:['#ffe437','#e5bd00','#fff3b8'],black:['#3a3a41','#1c1c20','#f6dd55']};
function cake(cx,cy,r,kind,rot){var ry=r*.8,R=rnd(Math.round(r*13)+kind.length),c=CK[kind]||CK.green,t=r*.14,o='<g transform="translate('+cx+' '+cy+')'+(rot?' rotate('+rot+')':'')+'">';
 function pt(a,k){return f1(r*(k||1)*Math.cos(a))+' '+f1(ry*(k||1)*Math.sin(a))}
 o+='<ellipse cx="0" cy="'+f1(r*.32)+'" rx="'+f1(r*1.2)+'" ry="'+f1(ry*1.12)+'" fill="#000" opacity=".16"/>';
 o+='<ellipse cx="0" cy="'+f1(r*.1)+'" rx="'+f1(r*1.15)+'" ry="'+f1(ry*1.13)+'" fill="#fff"/><ellipse cx="0" cy="'+f1(r*.14)+'" rx="'+f1(r*1.02)+'" ry="'+f1(ry*1.03)+'" fill="#e6e9ee"/>';
 if(kind==='mix'){var cs=[['#ffe437','#d9b300'],['#92d84c','#68b02c'],['#bba2e6','#8f70c6']],i,a0=-Math.PI/2-Math.PI/3;
  for(i=0;i<3;i++){var a1=a0+i*2*Math.PI/3,a2=a1+2*Math.PI/3;o+='<path d="M0 '+f1(t)+'L'+pt(a1).split(' ')[0]+' '+f1(parseFloat(pt(a1).split(' ')[1])+t)+'A'+f1(r)+' '+f1(ry)+' 0 0 1 '+pt(a2).split(' ')[0]+' '+f1(parseFloat(pt(a2).split(' ')[1])+t)+'Z" fill="'+cs[i][1]+'"/>'}
  for(i=0;i<3;i++){var b1=a0+i*2*Math.PI/3,b2=b1+2*Math.PI/3;o+='<path d="M0 0L'+pt(b1)+'A'+f1(r)+' '+f1(ry)+' 0 0 1 '+pt(b2)+'Z" fill="'+cs[i][0]+'"/>'}
  for(i=0;i<3;i++){var d=a0+i*2*Math.PI/3;o+='<path d="M0 0L'+pt(d)+'" stroke="#fff6c4" stroke-width="'+f1(r*.05)+'" stroke-linecap="round"/>'}
 }else{
  o+='<ellipse cx="0" cy="'+f1(t)+'" rx="'+f1(r)+'" ry="'+f1(ry)+'" fill="'+c[1]+'"/><ellipse cx="0" cy="0" rx="'+f1(r)+'" ry="'+f1(ry)+'" fill="'+c[0]+'"/>';
  var k;for(k=0;k<6;k++){var a=k*Math.PI/3+.3;o+='<path d="M0 0L'+pt(a,.99)+'" stroke="'+c[2]+'" stroke-width="'+f1(r*.06)+'" stroke-linecap="round"/>'}
 }
 if(kind!=='black'){var n=Math.round(r*8),j;o+='<g stroke="#fff" stroke-width="'+f1(r*.032)+'" stroke-linecap="round" opacity=".9">';
  for(j=0;j<n;j++){var q=Math.sqrt(R())*.94,aa=R()*6.283,xx=r*q*Math.cos(aa),yy=ry*q*Math.sin(aa),l=r*.07,ab=R()*3.14;o+='<path d="M'+f1(xx)+' '+f1(yy)+'l'+f1(l*Math.cos(ab))+' '+f1(l*Math.sin(ab))+'"/>'}o+='</g>'}
 o+='<ellipse cx="'+f1(-r*.3)+'" cy="'+f1(-ry*.4)+'" rx="'+f1(r*.34)+'" ry="'+f1(ry*.14)+'" fill="#fff" opacity=".24" transform="rotate(-18 '+f1(-r*.3)+' '+f1(-ry*.4)+')"/>';
 return o+'</g>'}
function durian(x,y,s){var o='<g transform="translate('+x+' '+y+') scale('+s+')"><rect x="-1.2" y="-19.5" width="2.4" height="5" rx="1" fill="#6b4a1d"/>',i;
 o+='<ellipse cx="0" cy="0" rx="12" ry="14" fill="#a9bb3d"/>';
 for(i=0;i<20;i++){var a=i*Math.PI/10,bx=12*Math.cos(a),by=14*Math.sin(a);o+='<path d="M'+f1(bx*.86-Math.sin(a)*1.9)+' '+f1(by*.86+Math.cos(a)*1.9)+'L'+f1(bx*1.22)+' '+f1(by*1.22)+'L'+f1(bx*.86+Math.sin(a)*1.9)+' '+f1(by*.86-Math.cos(a)*1.9)+'Z" fill="#7d9230"/>'}
 o+='<ellipse cx="2" cy="1" rx="7.5" ry="10" fill="#ffc93c" transform="rotate(18 2 1)"/><ellipse cx="2.4" cy="-1" rx="4.3" ry="6.4" fill="#ffe27a" transform="rotate(18 2 1)"/><path d="M-2 -3q2-4 5-2" stroke="#fff6cf" stroke-width=".9" fill="none" stroke-linecap="round"/>';
 return o+'</g>'}
function gift(x,y,w,b,r){return '<g transform="translate('+x+' '+y+')"><rect x="0" y="'+f1(w*.28)+'" width="'+w+'" height="'+f1(w*.72)+'" rx="1" fill="'+b+'"/><rect x="-'+f1(w*.06)+'" y="0" width="'+f1(w*1.12)+'" height="'+f1(w*.3)+'" rx="1" fill="'+b+'" stroke="#00000022" stroke-width=".3"/><rect x="'+f1(w*.43)+'" y="0" width="'+f1(w*.14)+'" height="'+w+'" fill="'+r+'"/><path d="M'+f1(w*.5)+' 0C'+f1(w*.2)+' -'+f1(w*.45)+' '+f1(w*.02)+' -'+f1(w*.2)+' '+f1(w*.3)+' -'+f1(w*.02)+'ZM'+f1(w*.5)+' 0C'+f1(w*.8)+' -'+f1(w*.45)+' '+f1(w*.98)+' -'+f1(w*.2)+' '+f1(w*.7)+' -'+f1(w*.02)+'Z" fill="'+r+'"/></g>'}

/* ---------- Đường đua: 3 chú cọp đội hộp quà chạy về vạch đích ---------- */
function racebox(){var h='<rect x="7" y="88" width="134" height="19" rx="4" fill="#b8402a"/><rect x="7" y="88" width="134" height="2.6" rx="1.3" fill="#fff" opacity=".9"/><rect x="7" y="104.4" width="134" height="2.6" rx="1.3" fill="#fff" opacity=".9"/><path d="M12 97.5H120" stroke="#ffd9c8" stroke-width=".7" stroke-dasharray="4 3" opacity=".85"/>',i,j;
 for(i=0;i<6;i++)for(j=0;j<2;j++)h+='<rect x="'+f1(126+j*2.6)+'" y="'+f1(88+i*3.17)+'" width="2.6" height="3.17" fill="'+((i+j)%2?'#fff':'#222')+'"/>';
 h+='<rect x="125.4" y="75" width="1" height="13" fill="#fff"/><rect x="131.6" y="75" width="1" height="13" fill="#fff"/><path d="M125.4 75H132.6V80H125.4Z" fill="#d4112e"/>'+P('FINISH',129,79,2.7,'#fff',{w:800});
 h+=tiger(30,104,.5,{hat:'gift',gc:'#2f9e57',gc2:'#1f7a42',ph:0,speed:1,al:35,ar:-35});
 h+=tiger(64,105,.5,{hat:'gift',gc:'#8b5cf6',gc2:'#6d3fd6',ph:1,speed:1,al:-30,ar:30});
 h+=tiger(98,104,.54,{hat:'gift',gc:'#d4112e',gc2:'#a80d24',ph:0,speed:1,al:40,ar:-40});
 return h}

function candy(){return '<defs><pattern id="pcn" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="6" fill="#d4112e"/><rect x="3" width="3" height="6" fill="#fff"/></pattern></defs><path fill-rule="evenodd" d="M0 0H148V210H0Z M3.4 7Q3.4 3.4 7 3.4H141Q144.6 3.4 144.6 7V203Q144.6 206.6 141 206.6H7Q3.4 206.6 3.4 203Z" fill="url(#pcn)"/><rect x="1.5" y="1.5" width="145" height="207" rx="3" fill="none" stroke="#fff" stroke-width=".6"/>'}
function garland(){var h='<path d="M0 5Q25 22 49 6Q74 22 98 6Q123 22 148 5" fill="none" stroke="#14643a" stroke-width="3.2" stroke-linecap="round"/><path d="M0 5Q25 22 49 6Q74 22 98 6Q123 22 148 5" fill="none" stroke="#3fc27a" stroke-width="1.2" stroke-dasharray=".8 2" stroke-linecap="round"/>',cols=['#e0243f','#ffd54a','#3b82f6','#fff'],k=0,s,t;
 for(s=0;s<3;s++){var x0=s*49,x1=x0+49,y0=5,y1=s==2?5:6;[.2,.5,.8].forEach(function(t){var x=x0+(x1-x0)*t,yy=(1-t)*(1-t)*y0+2*t*(1-t)*(s%2?22:22)+t*t*y1+.2,c=cols[k++%4];h+='<circle cx="'+f1(x)+'" cy="'+f1(yy+1.6)+'" r="3" fill="'+c+'" opacity=".28"/><circle cx="'+f1(x)+'" cy="'+f1(yy+1.6)+'" r="1.5" fill="'+c+'"/>'})}
 return h+'<g transform="translate(49 6)"><path d="M0 0L-4 -2.4V2.4ZM0 0L4 -2.4V2.4Z" fill="#d4112e"/><circle r="1.1" fill="#a3102a"/></g><g transform="translate(98 6)"><path d="M0 0L-4 -2.4V2.4ZM0 0L4 -2.4V2.4Z" fill="#d4112e"/><circle r="1.1" fill="#a3102a"/></g>'}
function win(x,w){var h='<rect x="'+x+'" y="8" width="'+w+'" height="132" fill="#fff8e1" opacity=".38" stroke="#fff8e1" stroke-width="1.3"/>',i;
 for(i=1;i<2;i++)h+='<path d="M'+f1(x+w*i/2)+' 8V140" stroke="#fff8e1" stroke-width="1"/>';
 for(i=1;i<5;i++)h+='<path d="M'+x+' '+f1(8+132*i/5)+'H'+(x+w)+'" stroke="#fff8e1" stroke-width="1"/>';
 return h}
function logo(cx,cy,r){return '<g transform="translate('+cx+' '+cy+')"><circle r="'+r+'" fill="#fff4b0" stroke="#e8a317" stroke-width="1"/><circle r="'+f1(r*.86)+'" fill="none" stroke="#2c8a2f" stroke-width="1.5" stroke-dasharray=".9 .8"/><circle r="'+f1(r*.66)+'" fill="#ffcf2e"/><text y="1.3" text-anchor="middle" font-family="'+F+'" font-weight="800" font-size="3.6" fill="#c8102e" stroke="#fff" stroke-width=".55" paint-order="stroke">9 SẠCH</text></g>'}
function icon(k,cx,cy){var g='<g transform="translate('+cx+' '+cy+')"><circle r="3.4" fill="#1c8a2c"/><g stroke="#fff" stroke-width=".45" fill="none" stroke-linecap="round">';
 if(k==='p')g+='<rect x="-1" y="-2" width="2" height="4" rx=".8" fill="#fff" stroke="none" transform="rotate(35)"/>';
 else if(k==='w')g+='<circle r="2"/><ellipse rx=".85" ry="2"/><path d="M-2 0H2"/>';
 else g+='<rect x="-2.1" y="-1.5" width="4.2" height="3" rx=".4"/><path d="M-2.1 -1.3L0 .4L2.1 -1.3"/>';
 return g+'</g></g>'}

function posterSVG(store,qr,min){
 var nm=e2(store),len=String(store).length,sz=7.6,R=rnd(11),i,s='';
 if(len*sz*.52>108)sz=108/(len*.52);
 var m=Number(min)||0,mt=m>=1000?Math.round(m/1000)+'k':String(m||'');
 s+='<svg id="pvsvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 148 210" role="img" aria-label="Poster đua cọp '+nm+'">';
 s+='<defs><linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd84f"/><stop offset=".6" stop-color="#fbb934"/><stop offset="1" stop-color="#f29a20"/></linearGradient><linearGradient id="pfd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6a928" stop-opacity="1"/><stop offset="1" stop-color="#f6a928" stop-opacity="0"/></linearGradient><pattern id="pck" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#fff6e6"/><rect width="4.5" height="4.5" fill="#f0872b"/><rect x="4.5" y="4.5" width="4.5" height="4.5" fill="#f0872b"/></pattern></defs>';
 s+='<rect width="148" height="210" fill="url(#pbg)"/><path d="M28 0H66L36 130H-12Z" fill="#fff" opacity=".13"/><path d="M80 0H104L82 130H58Z" fill="#fff" opacity=".1"/>';
 s+=win(4.5,12)+win(131.5,12);
 s+='<rect x="0" y="128" width="148" height="64" fill="url(#pck)"/><rect x="0" y="128" width="148" height="14" fill="url(#pfd)"/>';
 for(i=0;i<34;i++)s+='<circle cx="'+f1(6+R()*136)+'" cy="'+f1(8+R()*120)+'" r="'+f1(.3+R()*.7)+'" fill="#fff" opacity=".8"/>';
 s+=spark(22,50,2.6)+spark(126,52,2.2)+spark(14,92,1.8)+spark(135,112,2.2)+spark(112,38,1.8);
 s+=garland();
 s+=T('Bánh Sầu Riêng',66,23,6,'#fff4cf','#1a7a1f',{tl:56,sw:1.5,it:1})+T('9 Sạch',66,34.6,12.5,'#ffc21a','#1a7a1f',{tl:46})+logo(127,25,10);
 s+=T('THÊM 1K - ĐUA NGAY',74,47,9.8,'#1c8a2c','#0d5d1e',{tl:122})+T('NHẬN QUÀ',74,61.4,13.5,'#ff8a00','#a84300',{tl:86});
 s+='<path d="M35 63.4H113L109.8 67.9L113 72.4H35L38.2 67.9Z" fill="#d4112e" stroke="#fff" stroke-width=".7"/>'+P('ĐUA CỌP · MAY MẮN GIÁNG SINH',74,69.4,3.8,'#fff',{tl:68});
 s+=racebox();
 s+='<rect x="15" y="109.5" width="118" height="12" rx="6" fill="#fff" stroke="#1c8a2c" stroke-width="1.2"/>'+P(nm,74,f1(115.5+sz*.36),f1(sz),'#1c8a2c');
 s+=durian(11,154,.55)+cake(30,152,13.5,'mix',-8)+cake(35,178,11,'green',6)+cake(15,183,9,'purple',-6);
 s+='<rect x="48" y="126.5" width="52" height="61" rx="5" fill="#fff" stroke="#d4112e" stroke-width="1.4"/><path d="M52.5 123H95.5L93 131H55Z" fill="#d4112e" rx="3"/>'+P('QUÉT MÃ ĐỂ ĐUA CỌP',74,128.8,3.9,'#fff',{tl:36});
 s+=qr?'<image x="54" y="133" width="40" height="40" href="'+qr+'" xlink:href="'+qr+'" style="image-rendering:pixelated"/>':'<rect x="54" y="133" width="40" height="40" fill="#eee"/>'+P('QR',74,155,6,'#999');
 s+=P(mt?'Hóa đơn từ '+mt+' được tham gia':'Mỗi hóa đơn được đua 1 lần',74,178.2,3.2,'#7a3410',{tl:42})+P('Quét mã · Nhập số hóa đơn · Đua cọp',74,183.2,2.9,'#1c8a2c',{tl:44});
 s+=cake(108,183,8,'black',5)+tiger(123,190,.98,{hat:'santa',hold:1,al:18,ar:-18})+gift(134,183,7,'#2f9e57','#ffd54a')+gift(137,177,4.5,'#d4112e','#ffd54a');
 s+='<rect y="191.2" width="148" height="18.8" fill="#d9871a"/><rect y="191.2" width="148" height="1.2" fill="#ffd27a"/>';
 s+=icon('p',10,200.3)+P('0939999132',15,201.7,3.9,'#fff',{a:'start',w:700})+icon('w',50,200.3)+P('9sach.com.vn',55,201.7,3.9,'#fff',{a:'start',w:700})+icon('m',88,200.3)+P('banh9sach@gmail.com',93,201.7,3.6,'#fff',{a:'start',w:700,tl:46});
 s+=candy();
 s+='</svg>';return s}

/* ---------- QR dạng ảnh PNG (tạo bằng qrcodejs đã nạp trong admin) ---------- */
function qrURL(t){var d=document.createElement('div'),u='';d.style.cssText='position:fixed;left:-9999px;top:0';document.body.appendChild(d);
 try{new QRCode(d,{text:t,width:600,height:600,correctLevel:QRCode.CorrectLevel.M});var c=d.querySelector('canvas');u=c?c.toDataURL('image/png'):'';if(!u){var im=d.querySelector('img');u=im?im.src:''}}catch(e){}
 document.body.removeChild(d);return u}

var st=document.createElement('style');
st.textContent='#pvbox svg{display:block;width:100%;max-width:440px;height:auto;margin:10px auto;border-radius:10px;box-shadow:0 6px 22px rgba(0,0,0,.28)}#pw{display:none}@media print{@page{size:A5 portrait;margin:0}html,body{background:#fff!important;margin:0!important;padding:0!important}body.pp>*:not(#pw){display:none!important}body.pp #pw{display:block!important;width:148mm;height:210mm;overflow:hidden;page-break-after:avoid;break-after:avoid}body.pp #pw svg{display:block;width:148mm;height:210mm;-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
document.head.appendChild(st);

window.posterSVG=posterSVG;
window.drawPoster=function(store,url,min){var box=document.getElementById('v');if(!box)return;
 box.insertAdjacentHTML('beforeend','<h3>🖼️ Poster A5 để in dán quầy</h3><p class=hint>Poster có sẵn tên cửa hàng + QR khách của cửa hàng này. Bấm nút bên dưới → chọn khổ giấy A5 (hoặc "Lưu dưới dạng PDF") để in.</p><div id="pvbox">'+posterSVG(store,qrURL(url),min)+'</div><button class=btn data-a="printPoster">🖨️ IN / LƯU PDF POSTER A5</button>')};
window.printPoster=function(){var s=document.getElementById('pvsvg');if(!s)return;
 var old=document.getElementById('pw');if(old)old.parentNode.removeChild(old);
 var d=document.createElement('div');d.id='pw';d.innerHTML=s.outerHTML.replace('id="pvsvg"','id="pvsvg2"');document.body.appendChild(d);document.body.classList.add('pp');
 var done=function(){document.body.classList.remove('pp');window.removeEventListener('afterprint',done)};window.addEventListener('afterprint',done);
 var go=function(){setTimeout(function(){window.print()},150)};
 try{(document.fonts&&document.fonts.load?document.fonts.load('800 20px "Baloo 2"'):Promise.resolve()).then(go,go)}catch(e){go()}
 setTimeout(done,120000)};
})();
