var S={A:'Admin',C:'CuaHang',G:'GiaiThuong',K:'KhachQuay',H:'CauHinh'};
var CC=CacheService.getScriptCache();
function sh(n){return SpreadsheetApp.getActive().getSheetByName(n)}
function rowsR(n){var v=sh(n).getDataRange().getValues(),h=v.shift(),out=[];v.forEach(function(r,i){if(r.join('')==='')return;var o={_r:i+2};h.forEach(function(k,j){o[k]=r[j]});out.push(o)});return out}
function nz(x){return String(x==null?'':x).replace(/[^0-9]/g,'').replace(/^0+/,'')}
function on(x){return x===true||String(x).toUpperCase()==='TRUE'}
function cg(k,f,t){var v=CC.get(k);if(v!==null)return JSON.parse(v);var r=f();try{CC.put(k,JSON.stringify(r),t||120)}catch(e){}return r}
function ver(){return CC.get('v')||'0'}
function bumpPub(){CC.put('v',String(Date.now()),21600)}
function bump(){bumpPub();CC.removeAll(['cfg','img','st','adm'])}
function cfg(){return cg('cfg',function(){var o={};rowsR(S.H).forEach(function(r){if(r.Khoa==='TieuDe'||r.Khoa==='MinTien')o[r.Khoa]=r.GiaTri});return o})}
function imgs(){return cg('img',function(){var o={};rowsR(S.H).forEach(function(r){if(r.Khoa==='Logo'||r.Khoa==='Nen')o[r.Khoa]=r.GiaTri});return o})}
function allSt(){return cg('st',function(){return rowsR(S.C).map(function(r){return{ten:r.Ten,bat:on(r.Bat)}})})}
function stores(){return allSt().filter(function(s){return s.bat}).map(function(s){return s.ten})}
function L(f){var l=LockService.getScriptLock();l.waitLock(25000);try{return f()}finally{l.releaseLock()}}
function setup(){
 var T={Admin:['SDT','Ten','Quyen','CuaHang'],CuaHang:['Ten','Bat'],GiaiThuong:['ID','CuaHang','Ten','TyLe','SoLuong','Bat'],KhachQuay:['ThoiGian','CuaHang','Ten','SDT','SoHoaDon','SoTien','Qua','TrangThai','NguoiXacNhan','ThoiGianXacNhan'],CauHinh:['Khoa','GiaTri']};
 var ss=SpreadsheetApp.getActive();
 Object.keys(T).forEach(function(n){var s=ss.getSheetByName(n)||ss.insertSheet(n);if(s.getLastRow()==0){s.getRange(1,1,1,T[n].length).setValues([T[n]]).setFontWeight('bold').setBackground('#c8102e').setFontColor('#ffffff');s.setFrozenRows(1)}});
 sh('Admin').getRange('A:A').setNumberFormat('@');sh('KhachQuay').getRange('D:E').setNumberFormat('@');
 if(sh('Admin').getLastRow()<2)sh('Admin').appendRow(['0900000000','Quản lý mẫu','quản lý','']);
 if(sh('CuaHang').getLastRow()<2){['Cửa hàng 1','Cửa hàng 2'].forEach(function(c){sh('CuaHang').appendRow([c,true]);[['Bánh sầu riêng mini',30,50],['Voucher giảm 20K',30,100],['Hộp bánh sầu riêng',5,10],['Nón ông già Noel',25,60]].forEach(function(p){sh('GiaiThuong').appendRow([Utilities.getUuid().slice(0,8),c,p[0],p[1],p[2],true])})})}
 if(sh('CauHinh').getLastRow()<2){[['TieuDe','🎄 Vòng Quay Giáng Sinh 🎅'],['MinTien',199000],['Logo',''],['Nen','']].forEach(function(r){sh('CauHinh').appendRow(r)})}
}
function auth(d){var a=d.au||{},t=String(a.ten||'').trim().toLowerCase(),s=nz(a.sdt);var A=cg('adm',function(){return rowsR(S.A).map(function(r){return{s:nz(r.SDT),t:String(r.Ten).trim().toLowerCase(),n:r.Ten,q:String(r.Quyen).toLowerCase(),c:String(r.CuaHang||'')}})});var u=A.filter(function(x){return x.s===s&&x.t===t})[0];if(!u)throw new Error('Sai số điện thoại hoặc tên');var m=u.q.indexOf('quản')>=0;return{ten:u.n,mgr:m,stores:m?allSt().map(function(x){return x.ten}):u.c.split(',').map(function(x){return x.trim()}).filter(String)}}
function mgr(d){var u=auth(d);if(!u.mgr)throw new Error('Chỉ quản lý mới được thực hiện thao tác này');return u}
var API={
pub:function(d){var st=stores(),s=d.store||st[0],c=cfg(),im=d.store?{}:imgs();var p=cg('pub_'+ver()+'_'+encodeURIComponent(s).slice(0,150),function(){return rowsR(S.G).filter(function(r){return r.CuaHang===s&&on(r.Bat)&&Number(r.SoLuong)>0&&Number(r.TyLe)>0}).map(function(r){return{id:String(r.ID),ten:r.Ten}})},20);return{cfg:{TieuDe:c.TieuDe,MinTien:Number(c.MinTien||0),Logo:im.Logo,Nen:im.Nen},stores:st,store:s,prizes:p}},
spin:function(d){
 var ten=String(d.ten||'').trim(),sdt=String(d.sdt||'').replace(/[^0-9]/g,''),hd=String(d.hd||'').trim().toUpperCase(),tien=Number(String(d.tien||'').replace(/[^0-9]/g,'')),st=String(d.store||'');
 if(!ten)throw new Error('Vui lòng nhập họ tên');
 if(!/^0[0-9]{9}$/.test(sdt))throw new Error('Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)');
 if(!hd)throw new Error('Vui lòng nhập số hóa đơn');
 var min=Number(cfg().MinTien||0);if(!(tien>=min))throw new Error('Hóa đơn phải từ '+min.toLocaleString('vi-VN')+'đ trở lên mới được quay');
 if(stores().indexOf(st)<0)throw new Error('Cửa hàng không hợp lệ');
 return L(function(){
  var K=sh(S.K),n=K.getLastRow();
  if(n>1&&K.getRange(2,5,n-1,1).getValues().some(function(r){return String(r[0]).trim().toUpperCase()===hd}))throw new Error('Hóa đơn này đã tham gia quay');
  var ps=rowsR(S.G).filter(function(r){return r.CuaHang===st&&on(r.Bat)&&Number(r.SoLuong)>0&&Number(r.TyLe)>0});
  if(!ps.length)throw new Error('Cửa hàng đã hết quà tặng, xin lỗi bạn');
  var tot=ps.reduce(function(a,r){return a+Number(r.TyLe)},0),x=Math.random()*tot,p=ps[ps.length-1];
  for(var i=0;i<ps.length;i++){x-=Number(ps[i].TyLe);if(x<0){p=ps[i];break}}
  sh(S.G).getRange(p._r,5).setValue(Number(p.SoLuong)-1);
  K.appendRow([new Date(),st,ten,sdt,hd,tien,p.Ten,'Chưa trao','','']);
  bumpPub();
  return{id:String(p.ID),ten:p.Ten}
 })
},
login:function(d){var u=auth(d),c=cfg();return{ten:u.ten,mgr:u.mgr,stores:u.stores,cfg:c}},
prizes:function(d){mgr(d);return rowsR(S.G).filter(function(r){return r.CuaHang===d.store}).map(function(r){return{id:String(r.ID),ten:r.Ten,tyle:Number(r.TyLe),sl:Number(r.SoLuong),bat:on(r.Bat)}})},
savePrize:function(d){mgr(d);var ten=String(d.ten||'').trim();if(!ten)throw new Error('Vui lòng nhập tên quà');return L(function(){var f=d.id?rowsR(S.G).filter(function(r){return String(r.ID)===String(d.id)&&r.CuaHang===d.store})[0]:null,v=[f?f.ID:Utilities.getUuid().slice(0,8),d.store,ten,Number(d.tyle)||0,Number(d.sl)||0,!!d.bat];if(f)sh(S.G).getRange(f._r,1,1,6).setValues([v]);else sh(S.G).appendRow(v);bumpPub();return 1})},
delPrize:function(d){mgr(d);return L(function(){var f=rowsR(S.G).filter(function(r){return String(r.ID)===String(d.id)&&r.CuaHang===d.store})[0];if(f)sh(S.G).deleteRow(f._r);bumpPub();return 1})},
stores:function(d){mgr(d);return allSt()},
saveStore:function(d){mgr(d);var t=String(d.ten||'').trim();if(!t)throw new Error('Vui lòng nhập tên cửa hàng');return L(function(){var f=rowsR(S.C).filter(function(r){return r.Ten===t})[0];if(f)sh(S.C).getRange(f._r,2).setValue(d.toggle?!on(f.Bat):!!d.bat);else sh(S.C).appendRow([t,true]);bump();return 1})},
saveCfg:function(d){mgr(d);if(['TieuDe','MinTien','Logo','Nen'].indexOf(d.k)<0)throw new Error('Khóa không hợp lệ');return L(function(){var f=rowsR(S.H).filter(function(r){return r.Khoa===d.k})[0];if(f)sh(S.H).getRange(f._r,2).setValue(d.v);else sh(S.H).appendRow([d.k,d.v]);bump();return 1})},
hist:function(d){var u=auth(d),K=sh(S.K),n=K.getLastRow();if(n<2)return[];var a=Math.max(2,n-1499),v=K.getRange(a,1,n-a+1,10).getValues(),out=[];v.forEach(function(r,i){if(u.stores.indexOf(r[1])<0)return;out.push({r:a+i,t:Utilities.formatDate(new Date(r[0]),'Asia/Ho_Chi_Minh','dd/MM/yyyy HH:mm'),ch:r[1],ten:r[2],sdt:String(r[3]),hd:String(r[4]),tien:r[5],qua:r[6],tt:r[7],ng:r[8]})});return out.reverse().slice(0,500)},
confirm:function(d){var u=auth(d);return L(function(){var K=sh(S.K),r=Number(d.r);if(!(r>1&&r<=K.getLastRow()))throw new Error('Không tìm thấy dòng quay');var v=K.getRange(r,1,1,10).getValues()[0];if(String(v[4])!==String(d.hd))throw new Error('Không tìm thấy dòng quay');if(u.stores.indexOf(v[1])<0)throw new Error('Bạn không có quyền với cửa hàng này');if(v[7]==='Đã trao')throw new Error('Quà này đã được trao rồi');K.getRange(r,8,1,3).setValues([['Đã trao',u.ten,new Date()]]);return 1})}
};
function doPost(e){var o;try{var d=JSON.parse(e.postData.contents),f=API[d.a];if(!f)throw new Error('Yêu cầu không hợp lệ');o={ok:true,d:f(d)}}catch(x){o={ok:false,m:String(x.message||x)}}return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function doGet(){return ContentService.createTextOutput('Vong quay 9 Sach: OK')}
