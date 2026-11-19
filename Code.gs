var S={A:'Admin',C:'CuaHang',G:'GiaiThuong',K:'KhachQuay',H:'CauHinh'};
function sh(n){return SpreadsheetApp.getActive().getSheetByName(n)}
function rows(n){var v=sh(n).getDataRange().getValues(),h=v.shift();return v.filter(function(r){return r.join('')!==''}).map(function(r){var o={_r:0};h.forEach(function(k,j){o[k]=r[j]});return o}).map(function(o,i){return o})}
function rowsR(n){var v=sh(n).getDataRange().getValues(),h=v.shift(),out=[];v.forEach(function(r,i){if(r.join('')==='')return;var o={_r:i+2};h.forEach(function(k,j){o[k]=r[j]});out.push(o)});return out}
function nz(x){return String(x==null?'':x).replace(/[^0-9]/g,'').replace(/^0+/,'')}
function on(x){return x===true||String(x).toUpperCase()==='TRUE'}
function cfg(){var o={};rowsR(S.H).forEach(function(r){o[r.Khoa]=r.GiaTri});return o}
function stores(){return rowsR(S.C).filter(function(r){return on(r.Bat)}).map(function(r){return r.Ten})}
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
function auth(d){var a=d.au||{},u=rowsR(S.A).filter(function(r){return nz(r.SDT)===nz(a.sdt)&&String(r.Ten).trim().toLowerCase()===String(a.ten||'').trim().toLowerCase()})[0];if(!u)throw new Error('Sai số điện thoại hoặc tên');var m=String(u.Quyen).toLowerCase().indexOf('quản')>=0,all=rowsR(S.C).map(function(r){return r.Ten}),ch=String(u.CuaHang||'').split(',').map(function(x){return x.trim()}).filter(String);return{ten:u.Ten,mgr:m,stores:m?all:ch}}
function mgr(d){var u=auth(d);if(!u.mgr)throw new Error('Chỉ quản lý mới được thực hiện thao tác này');return u}
var API={
pub:function(d){var st=stores(),s=d.store||st[0],c=cfg();return{cfg:{TieuDe:c.TieuDe,Logo:c.Logo,Nen:c.Nen,MinTien:Number(c.MinTien||0)},stores:st,store:s,prizes:rowsR(S.G).filter(function(r){return r.CuaHang===s&&on(r.Bat)&&Number(r.SoLuong)>0&&Number(r.TyLe)>0}).map(function(r){return{id:String(r.ID),ten:r.Ten}})}},
spin:function(d){
 var ten=String(d.ten||'').trim(),sdt=String(d.sdt||'').replace(/[^0-9]/g,''),hd=String(d.hd||'').trim().toUpperCase(),tien=Number(String(d.tien||'').replace(/[^0-9]/g,'')),st=String(d.store||'');
 if(!ten)throw new Error('Vui lòng nhập họ tên');
 if(!/^0[0-9]{9}$/.test(sdt))throw new Error('Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)');
 if(!hd)throw new Error('Vui lòng nhập số hóa đơn');
 var min=Number(cfg().MinTien||0);if(!(tien>=min))throw new Error('Hóa đơn phải từ '+min.toLocaleString('vi-VN')+'đ trở lên mới được quay');
 if(stores().indexOf(st)<0)throw new Error('Cửa hàng không hợp lệ');
 return L(function(){
  if(rowsR(S.K).some(function(r){return String(r.SoHoaDon).trim().toUpperCase()===hd}))throw new Error('Hóa đơn này đã tham gia quay');
  var ps=rowsR(S.G).filter(function(r){return r.CuaHang===st&&on(r.Bat)&&Number(r.SoLuong)>0&&Number(r.TyLe)>0});
  if(!ps.length)throw new Error('Cửa hàng đã hết quà tặng, xin lỗi bạn');
  var tot=ps.reduce(function(a,r){return a+Number(r.TyLe)},0),x=Math.random()*tot,p=ps[ps.length-1];
  for(var i=0;i<ps.length;i++){x-=Number(ps[i].TyLe);if(x<0){p=ps[i];break}}
  sh(S.G).getRange(p._r,5).setValue(Number(p.SoLuong)-1);
  sh(S.K).appendRow([new Date(),st,ten,sdt,hd,tien,p.Ten,'Chưa trao','','']);
  SpreadsheetApp.flush();
  return{id:String(p.ID),ten:p.Ten}
 })
},
login:function(d){var u=auth(d);return{ten:u.ten,mgr:u.mgr,stores:u.stores,cfg:cfg()}},
prizes:function(d){mgr(d);return rowsR(S.G).filter(function(r){return r.CuaHang===d.store}).map(function(r){return{id:String(r.ID),ten:r.Ten,tyle:Number(r.TyLe),sl:Number(r.SoLuong),bat:on(r.Bat)}})},
savePrize:function(d){mgr(d);var ten=String(d.ten||'').trim();if(!ten)throw new Error('Vui lòng nhập tên quà');return L(function(){var f=d.id?rowsR(S.G).filter(function(r){return String(r.ID)===String(d.id)})[0]:null,v=[f?f.ID:Utilities.getUuid().slice(0,8),d.store,ten,Number(d.tyle)||0,Number(d.sl)||0,!!d.bat];if(f)sh(S.G).getRange(f._r,1,1,6).setValues([v]);else sh(S.G).appendRow(v);return 1})},
delPrize:function(d){mgr(d);return L(function(){var f=rowsR(S.G).filter(function(r){return String(r.ID)===String(d.id)})[0];if(f)sh(S.G).deleteRow(f._r);return 1})},
stores:function(d){mgr(d);return rowsR(S.C).map(function(r){return{ten:r.Ten,bat:on(r.Bat)}})},
saveStore:function(d){mgr(d);var t=String(d.ten||'').trim();if(!t)throw new Error('Vui lòng nhập tên cửa hàng');return L(function(){var f=rowsR(S.C).filter(function(r){return r.Ten===t})[0];if(f)sh(S.C).getRange(f._r,2).setValue(d.toggle?!on(f.Bat):!!d.bat);else sh(S.C).appendRow([t,true]);return 1})},
saveCfg:function(d){mgr(d);if(['TieuDe','MinTien','Logo','Nen'].indexOf(d.k)<0)throw new Error('Khóa không hợp lệ');return L(function(){var f=rowsR(S.H).filter(function(r){return r.Khoa===d.k})[0];if(f)sh(S.H).getRange(f._r,2).setValue(d.v);else sh(S.H).appendRow([d.k,d.v]);return 1})},
hist:function(d){var u=auth(d);return rowsR(S.K).filter(function(r){return u.stores.indexOf(r.CuaHang)>=0}).reverse().slice(0,500).map(function(r){return{r:r._r,t:Utilities.formatDate(new Date(r.ThoiGian),'Asia/Ho_Chi_Minh','dd/MM/yyyy HH:mm'),ch:r.CuaHang,ten:r.Ten,sdt:String(r.SDT),hd:String(r.SoHoaDon),tien:r.SoTien,qua:r.Qua,tt:r.TrangThai,ng:r.NguoiXacNhan}})},
confirm:function(d){var u=auth(d);return L(function(){var r=rowsR(S.K).filter(function(x){return x._r===Number(d.r)})[0];if(!r||String(r.SoHoaDon)!==String(d.hd))throw new Error('Không tìm thấy dòng quay');if(u.stores.indexOf(r.CuaHang)<0)throw new Error('Bạn không có quyền với cửa hàng này');if(r.TrangThai==='Đã trao')throw new Error('Quà này đã được trao rồi');sh(S.K).getRange(r._r,8,1,3).setValues([['Đã trao',u.ten,new Date()]]);return 1})}
};
function doPost(e){var o;try{var d=JSON.parse(e.postData.contents),f=API[d.a];if(!f)throw new Error('Yêu cầu không hợp lệ');o={ok:true,d:f(d)}}catch(x){o={ok:false,m:String(x.message||x)}}return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function doGet(){return ContentService.createTextOutput('Vong quay 9 Sach: OK')}
