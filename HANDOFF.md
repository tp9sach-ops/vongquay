# HANDOFF – Web Vòng Quay Giáng Sinh 9 Sạch (v4)

## QUY TẮC LÀM VIỆC (chép nguyên văn vào mọi handoff)
- nói tiếng Việt, không rành kỹ thuật: trả lời ngắn gọn, dễ hiểu; làm TỪNG PHIÊN
- khi sửa code: đưa đoạn "tìm" đầy đủ (không viết tắt) rồi code thay thế đầy đủ; cần đoạn code nào thì hỏi người dùng gửi
- after EVERY reply, attach an updated handoff .md so a fresh session with no memory can continue exactly and in detail; if there isn't room to finish everything, send the handoff first; copy this rule verbatim into every handoff

## BỐI CẢNH
Repo https://github.com/tp9sach-ops/vongquay (GitHub Pages). Khách mở qua khung www.baocaonoibo.io.vn/vongquay. Backend Google Apps Script gắn Google Sheet (10 cửa hàng CHCN). Chương trình Giáng Sinh: hóa đơn từ 199.000đ được quay 1 lần (KHÔNG còn nhập số tiền; MinTien chỉ để hiển thị, nhân viên tự đối chiếu hóa đơn).

## FILE
- app.js: CFG.API (link /exec của người dùng, KHÔNG ghi đè), CFG.LOGO, api(), esc(), money(), snow().
- style.css: giao diện xanh lá Giáng Sinh (tham chiếu điện thoại thứ 3: Merry XMAS, vòng quay viền cam, nơ đỏ, ông già Noel, người tuyết).
- index.html: 1 màn hình: vòng quay + form (cửa hàng, tên, SĐT, số hóa đơn). Bấm QUAY là vòng quay chạy NGAY (rAF), khi server trả kết quả thì giảm tốc dừng đúng ô. Dữ liệu pub cache localStorage nên mở là hiện ngay; đổi cửa hàng xử lý tại máy (pub trả quà của mọi cửa hàng một lần).
- admin.html: đăng nhập SĐT+tên; tải sẵn lịch sử + dữ liệu admin (adminAll) nên chuyển tab tức thì; tab Lịch sử / Quà tặng (có nút 📷 up ảnh sản phẩm, gắn theo TÊN quà, lưu sheet AnhQua) / Cửa hàng / Cài đặt & QR (QR = https://www.baocaonoibo.io.vn/vongquay).
- Code.gs: API doPost: pub, spin, login, adminAll, savePrize, delPrize, saveImg, saveStore, saveCfg, hist, confirm. Có CacheService (ver/bumpPub). Sheet mới tự tạo: AnhQua(Ten,Anh).
- Âm thanh: index.html phát nhạc nền vincemcgill-santa-claus-614837.mp3 (vol .35) và tiếng quay freesound_community-spinning-reel-27903.mp3 (lặp khi quay). 2 file mp3 PHẢI do người dùng upload thủ công vào thư mục gốc repo (tool không đẩy được file nhị phân). Tiếng chúc mừng là tổng hợp bằng WebAudio. Có nút bật/tắt tiếng.

## VIỆC NGƯỜI DÙNG PHẢI LÀM SAU MỖI LẦN SỬA Code.gs
Dán Code.gs vào Apps Script -> Triển khai -> Quản lý triển khai -> sửa -> Phiên bản mới (đừng tạo triển khai mới, sẽ đổi link /exec).

## TRẠNG THÁI
- Đã xong: giao diện mới, up ảnh quà, tăng tốc, nhạc (chờ upload mp3), QR.
- Chưa làm/để ý: test thật trên điện thoại; mp3 nền 3.7MB nên nén nhỏ hơn; GiaiThuong có ID trùng 1383b5ec giữa 2 cửa hàng (đã xử lý bằng khớp ID+cửa hàng); sửa tab Admin/CuaHang trực tiếp trong Sheet có thể trễ tới 2 phút do cache.

## PROMPT CHO PHIÊN SAU (dán nguyên văn)
Mình làm web Vòng Quay Giáng Sinh 9 Sạch, repo https://github.com/tp9sach-ops/vongquay (đọc HANDOFF.md). Mình không rành kỹ thuật: nói tiếng Việt ngắn gọn, làm từng bước, sửa code dạng tìm-và-thay đầy đủ hoặc đẩy thẳng lên repo. Hãy kiểm tra lỗi mình báo và tiếp tục cải thiện; cuối mỗi câu trả lời gửi handoff .md cập nhật.
