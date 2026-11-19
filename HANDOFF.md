# HANDOFF – Web Vòng Quay Giáng Sinh 9 Sạch (v6)

(Bản đầy đủ nhất là file HANDOFF_vongquay_v6.md gửi cho người dùng; nội dung dưới đây giống bản đó.)

## QUY TẮC LÀM VIỆC (chép nguyên văn vào mọi handoff)
- nói tiếng Việt, không rành kỹ thuật: trả lời ngắn gọn, dễ hiểu; làm TỪNG PHIÊN
- khi sửa code: đưa đoạn "tìm" đầy đủ (không viết tắt) rồi code thay thế đầy đủ; cần đoạn code nào thì hỏi người dùng gửi
- after EVERY reply, attach an updated handoff .md so a fresh session with no memory can continue exactly and in detail; if there isn't room to finish everything, send the handoff first; copy this rule verbatim into every handoff
- Luôn điều tra trước khi sửa: đọc repo GitHub + Google Sheet để lấy bằng chứng, không đoán; không bịa kết quả test; nói rõ cái gì đã kiểm chứng, cái gì chưa

## BỐI CẢNH
- Repo: https://github.com/tp9sach-ops/vongquay (nhánh main, GitHub Pages). Khách mở qua khung www.baocaonoibo.io.vn/vongquay.
- Backend: Google Apps Script (Code.gs) gắn Google Sheet "Vòng quay may mắn" (ID 1t3FMhGuPOhnNK3ywyauBG4c6BVsKr9cDPlbuWfVUwh4). 10 cửa hàng CHCN; tab: Admin, CuaHang, GiaiThuong, KhachQuay, CauHinh (AnhQua tự tạo khi cần).
- Chương trình: hóa đơn từ 199.000đ được quay 1 lần (không nhập số tiền; MinTien chỉ để hiển thị).
- Link API (/exec) nằm trong app.js (CFG.API) – KHÔNG ghi đè; không sửa app.js nếu không cần (có logo base64 dài).

## FILE (sau v6)
- index.html (v6, VIẾT LẠI): trang khách quay, giao diện theo ảnh mẫu số 3 (Merry XMAS xanh lá). Chữ Merry XMAS là SVG (Great Vibes + Playfair Display 900, gradient vàng, viền nâu, đổ bóng; font tải bằng Google Fonts &text=MerryXAS, có font dự phòng). Bỏ emoji trang trí, tuyết là chấm CSS. Vòng quay: viền cam + 24 bóng sáng, ô xanh lam nhạt/kem xen kẽ, nơ đỏ, kim cam, nút QUAY giữa. Form gọn, nút vàng QUAY NGAY. Popup trúng thưởng: dải đỏ CHÚC MỪNG.
- game.css (MỚI): CSS riêng cho index.html. style.css giữ nguyên cho admin.html.
- admin.html, Code.gs, app.js: KHÔNG đổi ở v6. Code.gs không cần triển khai lại.
- nhac-nen.mp3, tieng-quay.mp3: người dùng upload thủ công vào thư mục gốc repo (tool không đẩy được file nhị phân).

## ĐÃ LÀM Ở v6
1. TẢI CHẬM: gọi API `pub` ngay trong <head> (window.PUBP) song song với tải trang; preconnect script.google.com / script.googleusercontent.com; dữ liệu lần trước lưu localStorage; nhạc chỉ tải sau khi dữ liệu xong; bỏ font Baloo 2; tự thử tải lại tối đa 4 lần. Độ trễ còn lại chủ yếu do Google Apps Script (1–4 giây, lần đầu "nguội" lâu hơn) – chưa đo thực tế.
2. LỖI "HẾT QUÀ": đối chiếu Google Sheet (10 cửa hàng Bat=TRUE; 17 dòng quà Bat=TRUE, TyLe>0, SoLuong>0) và logic Code.gs → dữ liệu và code server không sai. Nguyên nhân khả dĩ nhất (CHƯA xác nhận trên máy người dùng): khách bấm QUAY khi dữ liệu quà chưa tải xong hoặc dữ liệu cũ trong localStorage → client báo "Cửa hàng này tạm hết quà". Đã sửa: nút khóa và ghi "Đang tải dữ liệu…" tới khi có dữ liệu; nếu cửa hàng đang chọn không có quà thì tự tải lại dữ liệu mới trước khi kết luận; nếu server báo hết quà thì tự làm mới vòng quay. Nếu vẫn lỗi: xin ảnh chụp lỗi + tên cửa hàng + giờ, đối chiếu tab GiaiThuong/KhachQuay (tên cửa hàng ở GiaiThuong phải trùng CuaHang; sửa Sheet trực tiếp có thể trễ tới 2 phút do cache).
3. GIAO DIỆN ĐIỆN THOẠI: gọn, chuyên nghiệp, ít rườm rà.
4. CHỮ MERRY XMAS: làm lại bằng SVG.

## VIỆC NGƯỜI DÙNG PHẢI LÀM
1. Mở trang bằng tab ẩn danh (tránh cache cũ), thử trên điện thoại thật: 49 Hàng Bài (nhiều quà) và 1 cửa hàng chỉ có 1 quà; báo lại nếu còn lỗi.
2. Upload nhac-nen.mp3 và tieng-quay.mp3 vào thư mục gốc repo nếu chưa làm.

## CHƯA LÀM / Ý TƯỞNG TIẾP
- Chưa test trên trình duyệt/điện thoại thật (mới kiểm tra cú pháp JS bằng node).
- Muốn nhanh hơn nữa phải sửa Code.gs (cần triển khai lại: Triển khai → Quản lý triển khai → sửa → Phiên bản mới, đừng tạo triển khai mới): gộp dữ liệu `pub` vào 1 khóa cache; hỗ trợ GET trong doGet để bớt 1 lượt chuyển hướng.
- GiaiThuong có ID trùng 1383b5ec giữa 2 cửa hàng (đã xử lý bằng khớp ID + cửa hàng).
- Chưa có ảnh quà nào (chưa có tab AnhQua).

## PROMPT CHO PHIÊN SAU (dán nguyên văn)
Mình làm web Vòng Quay Giáng Sinh 9 Sạch, repo https://github.com/tp9sach-ops/vongquay (đọc HANDOFF.md; Google Sheet ID 1t3FMhGuPOhnNK3ywyauBG4c6BVsKr9cDPlbuWfVUwh4). Mình không rành kỹ thuật: nói tiếng Việt ngắn gọn, làm từng bước, sửa code dạng tìm-và-thay đầy đủ hoặc đẩy thẳng lên repo. Hãy kiểm tra lỗi mình báo (điều tra bằng bằng chứng, không đoán) và tiếp tục cải thiện; cuối mỗi câu trả lời gửi handoff .md cập nhật.
