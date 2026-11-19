# HANDOFF – Web Vòng Quay Giáng Sinh 9 Sạch (v3)

## QUY TẮC LÀM VIỆC (chép nguyên văn vào mọi handoff)
- nói tiếng Việt, không rành kỹ thuật: trả lời ngắn gọn, dễ hiểu; làm TỪNG PHIÊN
- khi sửa code: đưa đoạn "tìm" đầy đủ (không viết tắt) rồi code thay thế đầy đủ; cần đoạn code nào thì hỏi người dùng gửi
- after EVERY reply, attach an updated handoff .md so a fresh session with no memory can continue exactly and in detail; if there isn't room to finish everything, send the handoff first; copy this rule verbatim into every handoff

## CHƯƠNG TRÌNH
Giáng sinh 2026, thương hiệu bánh sầu riêng 9 Sạch (logo tròn vàng-xanh). Hóa đơn từ 199.000đ trở lên được quay 1 lần (đổi số trong tab Cài đặt hoặc sheet CauHinh/MinTien; muốn "trên" tuyệt đối thì đặt 199001). Repo: https://github.com/tp9sach-ops/vongquay

## TRẠNG THÁI
- Phiên 0-3: ĐÃ XONG, đã đẩy lên repo: Code.gs, app.js, style.css, index.html (khách), admin.html (quản lý).
- CHƯA LÀM / chưa kiểm thử: Phiên 4 (triển khai + test thật). Chưa ai dán Code.gs vào Google Sheet, chưa có link Apps Script.

## CẤU TRÚC
- Code.gs: dán vào Apps Script GẮN VỚI Google Sheet. Chạy hàm setup() 1 lần -> tạo tab Admin(SDT,Ten,Quyen,CuaHang), CuaHang(Ten,Bat), GiaiThuong(ID,CuaHang,Ten,TyLe,SoLuong,Bat), KhachQuay(ThoiGian,CuaHang,Ten,SDT,SoHoaDon,SoTien,Qua,TrangThai,NguoiXacNhan,ThoiGianXacNhan), CauHinh(Khoa,GiaTri: TieuDe,MinTien,Logo,Nen) + dữ liệu mẫu (2 cửa hàng, 4 quà, admin mẫu SĐT 0900000000 tên "Quản lý mẫu").
- API: 1 endpoint doPost (body JSON text/plain, trường a=tên hành động): pub, spin, login, prizes, savePrize, delPrize, stores, saveStore, saveCfg, hist, confirm. Đăng nhập không lưu phiên: mỗi lần gửi au={sdt,ten}.
- Server quyết định quà (trọng số TyLe, chỉ quà còn SoLuong>0), chặn trùng hóa đơn toàn hệ thống, kiểm tra số tiền >= MinTien, dùng LockService.
- Quyền: Quyen chứa chữ "quản" = quản lý (thấy hết, sửa quà/cửa hàng/cài đặt); khác = nhân viên (chỉ xem lịch sử + xác nhận trao quà các cửa hàng ghi ở cột CuaHang, cách nhau dấu phẩy).
- Tên cửa hàng dùng làm khóa: không đổi tên cửa hàng đã có quà/lượt quay.
- Logo/nền admin up: nén JPEG <45KB lưu vào CauHinh. Logo mặc định nhúng sẵn trong app.js (CFG.LOGO).
- app.js dòng đầu: CFG.API = 'DAN_LINK_APPS_SCRIPT_VAO_DAY' -> PHẢI thay bằng link Web app.

## CÁC BƯỚC TRIỂN KHAI (Phiên 4)
1. Tạo Google Sheet mới -> Tiện ích mở rộng -> Apps Script -> dán toàn bộ Code.gs -> chọn hàm setup -> Chạy -> cấp quyền.
2. Triển khai -> Triển khai mới -> Ứng dụng web -> Thực thi: Tôi; Quyền truy cập: Bất kỳ ai -> Triển khai -> chép link /exec.
3. Sửa app.js: thay DAN_LINK_APPS_SCRIPT_VAO_DAY bằng link /exec (commit trên GitHub).
4. Repo Settings -> Pages -> Deploy from branch main / root. Link khách: https://tp9sach-ops.github.io/vongquay/ ; admin: .../admin.html
5. Sửa tab Admin (SDT, tên thật, quyền), tab CuaHang (danh sách cửa hàng thật), quà từng cửa hàng; sau mỗi lần sửa code Apps Script phải Triển khai -> Quản lý triển khai -> Sửa -> Phiên bản mới.
6. Test: quay trùng hóa đơn, hóa đơn dưới 199.000, hết quà, 2 điện thoại quay cùng lúc, xác nhận trao quà, QR, âm thanh trên iPhone/Android.

## GHI CHÚ
- Chưa biết: danh sách cửa hàng thật, quà thật + số lượng từng cửa hàng, nhân viên đăng nhập riêng hay chung, hạn chương trình.
- Chưa có: chặn 1 SĐT quay nhiều lần (hiện chỉ chặn theo hóa đơn), giới hạn thời gian chương trình.

## PROMPT CHO PHIÊN SAU (dán nguyên văn)
Mình làm web Vòng Quay Giáng Sinh 9 Sạch, repo https://github.com/tp9sach-ops/vongquay (đọc HANDOFF.md). Mình không rành kỹ thuật: nói tiếng Việt ngắn gọn, làm từng bước, sửa code dạng tìm-và-thay đầy đủ. Hãy hướng dẫn Phiên 4 (triển khai + kiểm thử + sửa lỗi), cuối mỗi câu trả lời gửi handoff .md cập nhật.
