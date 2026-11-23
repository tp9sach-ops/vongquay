# HANDOFF – Web Vòng Quay Giáng Sinh 9 Sạch (v7)

(Bản này cũng nằm trong repo dưới tên HANDOFF.md. Phiên mới dù không có memory vẫn làm tiếp đúng được.)

## QUY TẮC LÀM VIỆC (chép nguyên văn vào mọi handoff)
- nói tiếng Việt, không rành kỹ thuật: trả lời ngắn gọn, dễ hiểu; làm TỪNG PHIÊN
- khi sửa code: đưa đoạn "tìm" đầy đủ (không viết tắt) rồi code thay thế đầy đủ; cần đoạn code nào thì hỏi người dùng gửi
- after EVERY reply, attach an updated handoff .md so a fresh session with no memory can continue exactly and in detail; if there isn't room to finish everything, send the handoff first; copy this rule verbatim into every handoff
- Luôn điều tra trước khi sửa: đọc repo GitHub + Google Sheet để lấy bằng chứng, không đoán; không bịa kết quả test; nói rõ cái gì đã kiểm chứng, cái gì chưa
- Người dùng chỉ nói điều mình MUỐN, không cần biết file/nhánh/tên kỹ thuật: tự tìm ngữ cảnh (Notion + GitHub), tự tìm file cần sửa, chỉ hỏi lại khi thật sự mơ hồ hoặc cần quyết định kinh doanh
- Sau MỖI phiên làm việc luôn gửi prompt bàn giao chi tiết (file .md)

## BỐI CẢNH
- Repo: https://github.com/tp9sach-ops/vongquay (nhánh main, GitHub Pages). Khách mở qua khung www.baocaonoibo.io.vn/vongquay. Trang quản lý là admin.html (đường dẫn /admin).
- Backend: Google Apps Script (Code.gs) gắn Google Sheet "Vòng quay may mắn" (ID 1t3FMhGuPOhnNK3ywyauBG4c6BVsKr9cDPlbuWfVUwh4). 10 cửa hàng; tab: Admin, CuaHang, GiaiThuong, KhachQuay, CauHinh (AnhQua tự tạo khi cần).
- Chương trình: hóa đơn từ 199.000đ được quay 1 lần (không nhập số tiền; MinTien chỉ để hiển thị).
- Link API (/exec) nằm trong app.js (CFG.API) – KHÔNG ghi đè; không sửa app.js nếu không cần (có logo base64 dài).

## FILE
- index.html + game.css: trang khách quay (giao diện Merry XMAS, làm ở v6). style.css dùng chung cho admin.html.
- admin.html (v7, VIẾT LẠI): trang quản lý, xem mục "ĐÃ LÀM Ở v7".
- Code.gs (v7: sửa 1 chỗ trong hàm auth), app.js (không đổi), nhac-nen.mp3, tieng-quay.mp3 (người dùng tự upload).

## ĐÃ LÀM Ở v7 (trang admin)
1. Đổi tên trong trang thành "Quản lý game giáng sinh" (tiêu đề tab trình duyệt + tiêu đề trong trang).
2. Vào đúng link là vào thẳng chỉnh sửa, KHÔNG đăng nhập: bỏ form đăng nhập, nút "Quản lý", nút "Thoát". Trang tự gọi API `login` với SĐT/tên rỗng. Để có quyền chỉnh sửa, Code.gs hàm `auth` đổi: khi SĐT và tên đều rỗng thì trả về {ten:'Quản lý', mgr:true, stores:tất cả cửa hàng} (trước đây là 'Nhân viên cửa hàng', mgr:false). Cách đăng nhập bằng SĐT+tên trong tab Admin của Sheet vẫn còn trong Code.gs nhưng trang admin không dùng nữa.
3. Chọn cửa hàng: ô "🏬 Cửa hàng" luôn hiện ở đầu trang, dùng chung cho mọi mục (Trao thưởng + Quà tặng); có mục "Tất cả cửa hàng"; nhớ lựa chọn lần sau (localStorage khóa vq_store). Mục Quà tặng cần chọn 1 cửa hàng: nếu đang để "Tất cả" thì hiện danh sách nút để bấm chọn.
4. Dễ thao tác: 5 mục có biểu tượng + mục đang mở được tô sáng (🎁 Trao thưởng, 🎄 Quà tặng, 🖼️ Ảnh quà, 🏬 Cửa hàng, ⚙️ Cài đặt & QR). Trao thưởng hiển thị dạng thẻ (hợp điện thoại) với nút to TRAO QUÀ; lọc ⏳ Chờ trao / ✅ Đã trao / 📋 Tất cả; tìm theo hóa đơn/SĐT/tên; lọc ngày. Mặc định mở mục Trao thưởng, lọc "Chờ trao".
5. Thông báo (khung vàng nhấp nháy "🔔 Có n lượt trúng quà đang chờ trao"): bấm vào là sang mục Trao thưởng, lọc "Chờ trao", xem TẤT CẢ cửa hàng, xóa bộ lọc tìm/ngày, tải lại dữ liệu mới, cuộn lên đầu. (Lỗi cũ: nhân viên chưa chọn cửa hàng bị đưa sang màn "Chọn cửa hàng" thay vì tới trao thưởng.)
6. Nếu máy chủ CHƯA cập nhật Code.gs mới thì trang hiện khung đỏ cảnh báo, chỉ xem + trao quà được, ẩn các mục chỉnh sửa.

## ĐÃ KIỂM CHỨNG Ở v7 / CHƯA
- Đã kiểm chứng: chạy thử trang bằng jsdom với máy chủ giả (mock) – đổi tên, vào thẳng không đăng nhập, ô chọn cửa hàng + lọc + nhớ lựa chọn, mục Quà tặng theo cửa hàng và lưu quà gửi đúng cửa hàng, bấm thông báo sang Trao thưởng (xem tất cả cửa hàng), bấm TRAO QUÀ gọi confirm, chế độ máy chủ cũ hiện cảnh báo. Cú pháp Code.gs kiểm bằng node.
- CHƯA kiểm chứng: chạy trên trình duyệt/điện thoại thật; chạy với Google Apps Script thật (không có quyền truy cập); chưa kiểm tra giao diện bằng mắt.

## VIỆC NGƯỜI DÙNG PHẢI LÀM
1. Mở Apps Script → mở Code.gs → tìm: `return{ten:'Nhân viên cửa hàng',mgr:false,stores:allSt()` → thay bằng: `return{ten:'Quản lý',mgr:true,stores:allSt()` (hoặc dán nguyên Code.gs trong repo). Rồi Triển khai → Quản lý triển khai → biểu tượng bút chì → Phiên bản: Phiên bản mới → Triển khai (ĐỪNG tạo triển khai mới để link /exec không đổi).
2. Mở trang /admin bằng tab ẩn danh, thử trên điện thoại: có vào thẳng không, chọn cửa hàng, bấm thông báo, trao thử 1 quà. Báo lại ảnh chụp nếu lỗi.

## RỦI RO BẢO MẬT (đã báo người dùng, họ yêu cầu vào thẳng không đăng nhập)
- Link API nằm công khai trong app.js; từ nay ai gọi API với SĐT/tên rỗng đều có quyền quản lý (sửa quà, tỷ lệ, số lượng, cửa hàng, xác nhận trao quà). Trước đây quyền "nhân viên rỗng" chỉ xem lịch sử và trao quà.
- Cách tăng an toàn mà vẫn tiện (CHƯA làm, chỉ làm nếu người dùng đồng ý): thêm mã bí mật vào đường dẫn admin (ví dụ /admin.html#mã), Code.gs chỉ cấp quyền quản lý khi mã đúng (lưu trong tab CauHinh).

## ĐÃ LÀM Ở v6 (tóm tắt)
- index.html viết lại giao diện Merry XMAS (chữ SVG), game.css riêng; tải nhanh hơn (gọi API pub sớm, cache localStorage, thử lại tối đa 4 lần); sửa lỗi "hết quà" phía khách (khóa nút tới khi tải xong dữ liệu, tự làm mới khi báo hết quà). Chưa xác nhận trên máy người dùng.
- GiaiThuong có ID trùng 1383b5ec giữa 2 cửa hàng (đã xử lý bằng khớp ID + cửa hàng). Chưa có ảnh quà nào (chưa có tab AnhQua).

## CHƯA LÀM / Ý TƯỞNG TIẾP
- Nhanh hơn nữa: gộp dữ liệu `pub` vào 1 khóa cache; hỗ trợ GET trong doGet (cần triển khai lại Code.gs như mục trên).
- Nếu người dùng muốn: mã bí mật cho trang admin (mục bảo mật), sao chép bộ quà từ cửa hàng này sang cửa hàng khác, kiểm tra giao diện admin trên điện thoại thật.

## PROMPT CHO PHIÊN SAU (dán nguyên văn)
Mình làm web Vòng Quay Giáng Sinh 9 Sạch, repo https://github.com/tp9sach-ops/vongquay (đọc HANDOFF.md; Google Sheet ID 1t3FMhGuPOhnNK3ywyauBG4c6BVsKr9cDPlbuWfVUwh4). Mình không rành kỹ thuật: nói tiếng Việt ngắn gọn, làm từng bước, sửa code dạng tìm-và-thay đầy đủ hoặc đẩy thẳng lên repo. Trang quản lý là admin.html (tên "Quản lý game giáng sinh", vào thẳng không đăng nhập, chọn cửa hàng, thông báo bấm vào tới Trao thưởng). Hãy kiểm tra lỗi mình báo (điều tra bằng bằng chứng, không đoán) và tiếp tục cải thiện; cuối mỗi câu trả lời gửi handoff .md cập nhật.
