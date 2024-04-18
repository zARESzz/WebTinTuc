const express = require("express");
const router = express.Router();
const { createNews, updateNews, deleteNews } = require("../Controllers/admin");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

// Middleware xác thực admin
function authenticateAdmin(req, res, next) {
    // Thực hiện xác thực ở đây, ví dụ: kiểm tra session, token, hoặc bất kỳ phương pháp nào khác
    // Nếu xác thực thành công, gọi next()
    // Nếu không, trả về lỗi hoặc chuyển hướng đến trang đăng nhập
    next();
}

// Import các controllers cho admin
const { createNews, updateNews, deleteNews } = require("../Controllers/admin");

// Route tạo tin tức mới
router.post("/news/create", authenticateAdmin, createNews);

// Route chỉnh sửa tin tức
router.put("/news/:id/edit", authenticateAdmin, updateNews);

// Route xóa tin tức
router.delete("/news/:id/delete", authenticateAdmin, deleteNews);

module.exports = router;
