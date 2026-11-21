var S={A:'Admin',C:'CuaHang',G:'GiaiThuong',K:'KhachQuay',H:'CauHinh',Q:'AnhQua'};
var CC=CacheService.getScriptCache();
function sh(n){var s=SpreadsheetApp.getActive().getSheetByName(n);if(!s&&n===S.Q){s=SpreadsheetApp.getActive().insertSheet(n);s.appendRow(['Ten','Anh'])}return s}
function rowsR(n){var v=sh(n).getDataRange().getValues(),h=v.shift(),out=[];v.forEach(function(r,i){if(r.join('')==='')return;var o={_r:i+2};h.forEach(function(k,j){o[k]=r[j]});out.push(o)});return out}
function nz(x){return String(x==null?'':x).replace(/[^0-9]/g,'').replace(/^0+/,'')}
function on(x){return x===true||String(x).toUpperCase()==='TRUE'}
function nk(x){return String(x==null?'':x).normalize('NFC').replace(/\s+/g,' ').trim().toLowerCase()}
function canon(n){var k=nk(n),a=stores();for(var i=0;i<a.length;i++)if(nk(a[i])===k)return a[i];return ''}
function cg(k,f,t){var v=CC.get(k);if(v!==null)return JSON.parse(v);var r=f();try{CC.put(k,JSON.stringify(r),t||120)}catch(e){}return r}
function ver(){return CC.get('v')||'0'}
function bumpPub(){CC.put('v',String(Date.now()),21600)}
function bump(){bumpPub();CC.removeAll(['cfg','img','st','adm','qimg'])}
function cfg(){return cg('cfg',function(){var o={};rowsR(S.H).forEach(function(r){if(r.Khoa==='TieuDe'||r.Khoa==='MinTien')o[r.Khoa]=r.GiaTri});return o})}
function imgs(){return cg('img',function(){var o={};rowsR(S.H).forEach(function(r){if(r.Khoa==='Logo'||r.Khoa==='Nen')o[r.Khoa]=r.GiaTri});return o},300)}
function qimg(){return cg('qimg',function(){var o={};rowsR(S.Q).forEach(function(r){if(r.Ten&&r.Anh)o[r.Ten]=r.Anh});return o},300)}
function allSt(){return cg('st',function(){return rowsR(S.C).map(function(r){return{ten:r.Ten,bat:on(r.Bat)}})})}
function stores(){return allSt().filter(function(s){return s.bat}).map(function(s){return s.ten})}
function L(f){var l=LockService.getScriptLock();l.waitLock(25000);try{return f()}finally{l.releaseLock()}}
function setup(){
 var T={Admin:['SDT','Ten','Quyen','CuaHang'],CuaHang:['Ten','Bat'],GiaiThuong:['ID','CuaHang','Ten','TyLe','SoLuong','Bat'],KhachQuay:['ThoiGian','CuaHang','Ten','SDT','SoHoaDon','SoTien','Qua','TrangThai','NguoiXacNhan','ThoiGianXacNhan','Token'],CauHinh:['Khoa','GiaTri'],AnhQua:['Ten','Anh']};
 var ss=SpreadsheetApp.getActive();
 Object.keys(T).forEach(function(n){var s=ss.getSheetByName(n)||ss.insertSheet(n);if(s.getLastRow()==0){s.getRange(1,1,1,T[n].length).setValues([T[n]]).setFontWeight('bold').setBackground('#c8102e').setFontColor('#ffffff');s.setFrozenRows(1)}});
 sh('Admin').getRange('A:A').setNumberFormat('@');sh('KhachQuay').getRange('D:E').setNumberFormat('@');
 if(sh('Admin').getLastRow()<2)sh('Admin').appendRow(['0900000000','Quản lý mẫu','quản lý','']);
 if(sh('CuaHang').getLastRow()<2){['Cửa hàng 1','Cửa hàng 2'].forEach(function(c){sh('CuaHang').appendRow([c,true]);[['Bánh sầu riêng mini',30,50],['Voucher giảm 20K',30,100],['Hộp bánh sầu riêng',5,10],['Nón ông già Noel',25,60]].forEach(function(p){sh('GiaiThuong').appendRow([Utilities.getUuid().slice(0,8),c,p[0],p[1],p[2],true])})})}
 if(sh('CauHinh').getLastRow()<2){[['TieuDe','VÒNG QUAY MAY MẮN'],['MinTien',199000],['Logo',''],['Nen','']].forEach(function(r){sh('CauHinh').appendRow(r)})}
}
function auth(d){var a=d.au||{};if(!String(a.sdt||'').trim()&&!String(a.ten||'').trim())return{ten:'Nhân viên cửa hàng',mgr:false,stores:allSt().map(function(x){return x.ten})};var t=String(a.ten||'').trim().toLowerCase(),s=nz(a.sdt);var A=cg('adm',function(){return rowsR(S.A).map(function(r){return{s:nz(r.SDT),t:String(r.Ten).trim().toLowerCase(),n:r.Ten,q:String(r.Quyen).toLowerCase(),c:String(r.CuaHang||'')}})});var u=A.filter(function(x){return x.s===s&&x.t===t})[0];if(!u)throw new Error('Sai số điện thoại hoặc tên');var m=u.q.indexOf('quản')>=0;return{ten:u.n,mgr:m,stores:m?allSt().map(function(x){return x.ten}):u.c.split(',').map(function(x){return x.trim()}).filter(String)}}
function mgr(d){var u=auth(d);if(!u.mgr)throw new Error('Chỉ quản lý mới được thực hiện thao tác này');return u}
function reservedMap(){var K=sh(S.K),n=K.getLastRow(),m={};if(n<2)return m;K.getRange(2,1,n-1,8).getValues().forEach(function(r){if(r[7]==='Chưa trao'||r[7]==='Chờ nhập thông tin'){var k=nk(r[1])+'|'+nk(r[6]);m[k]=(m[k]||0)+1}});return m}
function availOf(p,rs){return Number(p.SoLuong)-(rs[nk(p.CuaHang)+'|'+nk(p.Ten)]||0)}
/* Quay trúng quà. KHÔNG trừ kho ở đây: kho chỉ trừ khi bấm TRAO QUÀ (confirm). Quà đã trúng mà chưa trao được giữ chỗ để không phát lố. */
function draw(d,ten,sdt,tt,tok){
 var hd=String(d.hd||'').trim().toUpperCase(),st=canon(d.store||'');
 if(!hd)throw new Error('Vui lòng nhập số hóa đơn');
 if(!st)throw new Error('Cửa hàng không hợp lệ');
 return L(function(){
  var K=sh(S.K),n=K.getLastRow();
  if(K.getRange(1,11).getValue()==='')K.getRange(1,11).setValue('Token');
  if(n>1&&K.getRange(2,5,n-1,1).getValues().some(function(r){return String(r[0]).trim().toUpperCase()===hd}))throw new Error('Hóa đơn này đã tham gia đua, không thể đua lại');
  var rs=reservedMap(),ps=rowsR(S.G).filter(function(r){return nk(r.CuaHang)===nk(st)&&on(r.Bat)&&Number(r.TyLe)>0&&availOf(r,rs)>0});
  if(!ps.length)throw new Error('Cửa hàng đã hết quà tặng, xin lỗi bạn');
  var tot=ps.reduce(function(a,r){return a+Number(r.TyLe)},0),x=Math.random()*tot,p=ps[ps.length-1];
  for(var i=0;i<ps.length;i++){x-=Number(ps[i].TyLe);if(x<0){p=ps[i];break}}
  K.getRange(n+1,4,1,2).setNumberFormat('@');
  K.appendRow([new Date(),st,ten,sdt,hd,'',p.Ten,tt,'','',tok]);
  bumpPub();
  return{id:String(p.ID),ten:p.Ten,tok:tok}
 })
}
var API={
pub:function(d){var st=stores(),c=cfg(),im=imgs(),p=cg('pa_'+ver(),function(){var by={},rs=reservedMap();rowsR(S.G).forEach(function(r){var cn=canon(r.CuaHang);if(!cn||!on(r.Bat)||Number(r.TyLe)<=0||availOf(r,rs)<=0)return;(by[cn]=by[cn]||[]).push({id:String(r.ID),ten:r.Ten})});return by},20);return{cfg:{TieuDe:c.TieuDe,MinTien:Number(c.MinTien||0),Logo:im.Logo,Nen:im.Nen},stores:st,prizes:p,imgs:qimg()}},
/* Cách cũ (vòng quay): gửi đủ tên + SĐT + hóa đơn ngay lúc quay */
spin:function(d){
 var ten=String(d.ten||'').trim(),sdt=String(d.sdt||'').replace(/[^0-9]/g,'');
 if(!ten)throw new Error('Vui lòng nhập họ tên');
 if(!/^0[0-9]{9}$/.test(sdt))throw new Error('Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)');
 return draw(d,ten,sdt,'Chưa trao','')
},
/* Đua Cọp: chọn cửa hàng + số hóa đơn -> đua -> trúng quà -> khách nhập tên/SĐT (claim) */
race:function(d){return draw(d,'','','Chờ nhập thông tin',Utilities.getUuid())},
claim:function(d){
 var ten=String(d.ten||'').trim(),sdt=String(d.sdt||'').replace(/[^0-9]/g,''),hd=String(d.hd||'').trim().toUpperCase(),tok=String(d.tok||'');
 if(!ten)throw new Error('Vui lòng nhập họ tên');
 if(!/^0[0-9]{9}$/.test(sdt))throw new Error('Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)');
 if(!tok||!hd)throw new Error('Thiếu thông tin lượt đua');
 return L(function(){
  var K=sh(S.K),n=K.getLastRow();if(n<2)throw new Error('Không tìm thấy lượt đua');
  var v=K.getRange(2,1,n-1,11).getValues(),i=-1;
  for(var j=v.length-1;j>=0;j--)if(String(v[j][4]).trim().toUpperCase()===hd&&String(v[j][10])===tok){i=j;break}
  if(i<0)throw new Error('Không tìm thấy lượt đua của hóa đơn này');
  if(v[i][7]!=='Chờ nhập thông tin')throw new Error('Lượt đua này đã nhập thông tin rồi');
  K.getRange(i+2,3,1,2).setNumberFormat('@').setValues([[ten,sdt]]);K.getRange(i+2,8).setValue('Chưa trao');
  bumpPub();return{qua:v[i][6],ch:v[i][1]}
 })
},
/* Thông báo cho admin: số quà đang chờ trao + vài dòng mới nhất */
pending:function(d){var u=auth(d),K=sh(S.K),n=K.getLastRow();if(n<2)return{n:0,latest:[]};var v=K.getRange(2,1,n-1,8).getValues(),c=0,l=[];v.forEach(function(r){if(r[7]==='Chưa trao'&&u.stores.indexOf(r[1])>=0){c++;l.push({ch:r[1],ten:String(r[2]),qua:r[6]})}});return{n:c,latest:l.slice(-3).reverse()}},
login:function(d){var u=auth(d),c=cfg();return{ten:u.ten,mgr:u.mgr,stores:u.stores,cfg:c}},
adminAll:function(d){mgr(d);var c=cfg();return{cfg:{TieuDe:c.TieuDe,MinTien:Number(c.MinTien||0)},stores:allSt(),prizes:rowsR(S.G).map(function(r){return{id:String(r.ID),store:r.CuaHang,ten:r.Ten,tyle:Number(r.TyLe),sl:Number(r.SoLuong),bat:on(r.Bat)}}),imgs:qimg()}},
savePrize:function(d){mgr(d);var ten=String(d.ten||'').trim();if(!ten)throw new Error('Vui lòng nhập tên quà');return L(function(){var f=d.id?rowsR(S.G).filter(function(r){return String(r.ID)===String(d.id)&&r.CuaHang===d.store})[0]:null,id=f?String(f.ID):Utilities.getUuid().slice(0,8),v=[id,d.store,ten,Number(d.tyle)||0,Number(d.sl)||0,!!d.bat];if(f)sh(S.G).getRange(f._r,1,1,6).setValues([v]);else sh(S.G).appendRow(v);bumpPub();return{id:id,store:d.store,ten:ten,tyle:v[3],sl:v[4],bat:v[5]}})},
delPrize:function(d){mgr(d);return L(function(){var f=rowsR(S.G).filter(function(r){return String(r.ID)===String(d.id)&&r.CuaHang===d.store})[0];if(f)sh(S.G).deleteRow(f._r);bumpPub();return 1})},
saveImg:function(d){mgr(d);var t=String(d.ten||'').trim(),v=String(d.v||'');if(!t)throw new Error('Thiếu tên quà');if(v.length>45000)throw new Error('Ảnh quá lớn');return L(function(){var f=rowsR(S.Q).filter(function(r){return r.Ten===t})[0];if(f)sh(S.Q).getRange(f._r,2).setValue(v);else sh(S.Q).appendRow([t,v]);CC.remove('qimg');return 1})},
saveStore:function(d){mgr(d);var t=String(d.ten||'').trim();if(!t)throw new Error('Vui lòng nhập tên cửa hàng');return L(function(){var f=rowsR(S.C).filter(function(r){return r.Ten===t})[0];if(f)sh(S.C).getRange(f._r,2).setValue(d.toggle?!on(f.Bat):!!d.bat);else sh(S.C).appendRow([t,true]);bump();return 1})},
saveCfg:function(d){mgr(d);if(['TieuDe','MinTien','Logo','Nen'].indexOf(d.k)<0)throw new Error('Khóa không hợp lệ');return L(function(){var f=rowsR(S.H).filter(function(r){return r.Khoa===d.k})[0];if(f)sh(S.H).getRange(f._r,2).setValue(d.v);else sh(S.H).appendRow([d.k,d.v]);bump();return 1})},
hist:function(d){var u=auth(d),K=sh(S.K),n=K.getLastRow();if(n<2)return[];var a=Math.max(2,n-1499),v=K.getRange(a,1,n-a+1,10).getValues(),out=[];v.forEach(function(r,i){if(u.stores.indexOf(r[1])<0)return;out.push({r:a+i,t:Utilities.formatDate(new Date(r[0]),'Asia/Ho_Chi_Minh','dd/MM/yyyy HH:mm'),ch:r[1],ten:r[2],sdt:String(r[3]),hd:String(r[4]),qua:r[6],tt:r[7],ng:r[8]})});return out.reverse().slice(0,500)},
confirm:function(d){var u=auth(d);return L(function(){var K=sh(S.K),r=Number(d.r);if(!(r>1&&r<=K.getLastRow()))throw new Error('Không tìm thấy dòng đua');var v=K.getRange(r,1,1,10).getValues()[0];if(String(v[4])!==String(d.hd))throw new Error('Không tìm thấy dòng đua');if(u.stores.indexOf(v[1])<0)throw new Error('Bạn không có quyền với cửa hàng này');if(v[7]==='Đã trao')throw new Error('Quà này đã được trao rồi');if(v[7]!=='Chưa trao')throw new Error('Khách chưa nhập thông tin nhận quà, chưa thể trao');
 var g=rowsR(S.G).filter(function(x){return nk(x.CuaHang)===nk(v[1])&&nk(x.Ten)===nk(v[6])})[0];
 if(!g||Number(g.SoLuong)<1)throw new Error('Kho quà này đã hết, hãy bổ sung số lượng trước khi trao');
 sh(S.G).getRange(g._r,5).setValue(Number(g.SoLuong)-1);
 K.getRange(r,8,1,3).setValues([['Đã trao',String(d.nv||'').trim()||u.ten,new Date()]]);bump();return 1})}
};
function doPost(e){var o;try{var d=JSON.parse(e.postData.contents),f=API[d.a];if(!f)throw new Error('Yêu cầu không hợp lệ');o={ok:true,d:f(d)}}catch(x){o={ok:false,m:String(x.message||x)}}return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function doGet(){return ContentService.createTextOutput('Vong quay 9 Sach: OK')}
