# HANDOFF – Web Vòng Quay Giáng Sinh 9 Sạch (v5)

## QUY TẮC LÀM VIỆC (chép nguyên văn vào mọi handoff)
- nói tiếng Việt, không rành kỹ thuật: trả lời ngắn gọn, dễ hiểu; làm TỪNG PHIÊN
- khi sửa code: đưa đoạn "tìm" đầy đủ (không viết tắt) rồi code thay thế đầy đủ; cần đoạn code nào thì hỏi người dùng gửi
- after EVERY reply, attach an updated handoff .md so a fresh session with no memory can continue exactly and in detail; if there isn't room to finish everything, send the handoff first; copy this rule verbatim into every handoff

## BỐI CẢNH
Repo https://github.com/tp9sach-ops/vongquay (GitHub Pages). Khách mở qua khung www.baocaonoibo.io.vn/vongquay. Backend Google Apps Script gắn Google Sheet (10 cửa hàng CHCN). Chương trình Giáng Sinh: hóa đơn từ 199.000đ được quay 1 lần (KHÔNG còn nhập số tiền; MinTien chỉ để hiển thị, nhân viên tự đối chiếu hóa đơn).

## FILE
- app.js: CFG.API (link /exec của người dùng, KHÔNG ghi đè), CFG.LOGO, api(), esc(), money(), snow().
- style.css: giao diện xanh lá Giáng Sinh (tham chiếu điện thoại thứ 3: Merry XMAS, vòng quay viền cam, nơ đỏ, Noel, người tuyết). v5: bỏ hiệu ứng nặng (backdrop-filter, filter động), tuyết ít hơn và tạm ẩn khi quay, thêm đồ trang trí, thư viện ảnh admin (.gal).
- index.html (v5): vòng quay 2 màu xanh/kem xen kẽ, ảnh quà trong vòng tròn trắng trên ô, bấm QUAY là quay NGAY (rAF), server trả kết quả thì giảm tốc 3,2s dừng đúng ô. Phím Enter chuyển ô nhập; SĐT chỉ nhận số; đóng popup KHÔNG reload trang (chỉ làm mới dữ liệu nền). Dữ liệu pub cache localStorage nên mở là hiện ngay. Font tải không chặn.
- admin.html (v5): tab Lịch sử / Quà tặng (có 📷 từng dòng) / 🖼️ Ảnh sản phẩm (MỚI: lưới tất cả quà, Tải/Đổi/Xóa ảnh, ảnh 180px tối đa ~16KB) / Cửa hàng / Cài đặt & QR.
- Code.gs: KHÔNG đổi ở v5 (không cần triển khai lại). API: pub, spin, login, adminAll, savePrize, delPrize, saveImg, saveStore, saveCfg, hist, confirm.
- Âm thanh (v5): index.html nạp LƯỜI sau lần chạm đầu tiên. File: nhac-nen.mp3 (nhạc nền, vol .35, ~0,9MB) và tieng-quay.mp3 (tiếng quay lặp, ~0,27MB) – bản nén từ 2 file gốc. 2 file này PHẢI do người dùng upload thủ công vào thư mục gốc repo (tool không đẩy được file nhị phân). Có tiếng "tích" WebAudio khi kim qua ô, tiếng chúc mừng WebAudio, nút bật/tắt (nhớ lựa chọn).

## VIỆC NGƯỜI DÙNG PHẢI LÀM
1. Upload nhac-nen.mp3 và tieng-quay.mp3 vào thư mục gốc repo (GitHub: Add file > Upload files > Commit). Chưa có 2 file này thì web vẫn chạy nhưng không có nhạc/tiếng quay.
2. (Chỉ khi sửa Code.gs) dán vào Apps Script -> Triển khai -> Quản lý triển khai -> sửa -> Phiên bản mới (đừng tạo triển khai mới, sẽ đổi link /exec).

## TRẠNG THÁI
- Đã xong: giao diện v5, tab ảnh sản phẩm, tăng tốc phía trình duyệt, âm thanh (chờ upload mp3), QR.
- Chưa làm/để ý: test thật trên điện thoại; độ trễ khi bấm QUAY phụ thuộc Google Apps Script (thường 1-4s, vòng quay vẫn quay ngay trong lúc chờ); nếu vẫn chậm có thể tối ưu Code.gs (đọc Sheet ít hơn); GiaiThuong có ID trùng 1383b5ec giữa 2 cửa hàng (đã xử lý bằng khớp ID+cửa hàng); sửa tab Admin/CuaHang trực tiếp trong Sheet có thể trễ tới 2 phút do cache.

## PROMPT CHO PHIÊN SAU (dán nguyên văn)
Mình làm web Vòng Quay Giáng Sinh 9 Sạch, repo https://github.com/tp9sach-ops/vongquay (đọc HANDOFF.md). Mình không rành kỹ thuật: nói tiếng Việt ngắn gọn, làm từng bước, sửa code dạng tìm-và-thay đầy đủ hoặc đẩy thẳng lên repo. Hãy kiểm tra lỗi mình báo và tiếp tục cải thiện; cuối mỗi câu trả lời gửi handoff .md cập nhật.
