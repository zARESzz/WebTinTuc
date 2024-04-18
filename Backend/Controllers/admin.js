// Import các module cần thiết
const express = require('express');
const router = express.Router();
const News = require('./newsModel');

// Middleware xác thực admin
function authenticateAdmin(req, res, next) {
    // Thực hiện xác thực ở đây, ví dụ: kiểm tra session, token, hoặc bất kỳ phương pháp nào khác
    // Nếu xác thực thành công, gọi next()
    // Nếu không, trả về lỗi hoặc chuyển hướng đến trang đăng nhập
    next();
}

// Danh sách tin tức (có thể là dữ liệu ảo hoặc được lấy từ cơ sở dữ liệu)
let newsData = [
    { id: 1, title: 'Tin tức 1', content: 'Nội dung tin tức 1' },
    { id: 2, title: 'Tin tức 2', content: 'Nội dung tin tức 2' },
    { id: 3, title: 'Tin tức 3', content: 'Nội dung tin tức 3' }
];

// Route hiển thị danh sách tin tức
router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const newsList = await News.find();
        res.json(newsList);
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server');
    }
});

// Route hiển thị form tạo tin tức mới
router.get('/create', authenticateAdmin, (req, res) => {
    res.send('Form tạo tin tức mới');
});

// Route xử lý việc tạo tin tức mới
router.post('/create', authenticateAdmin, (req, res) => {
    // Xử lý logic để tạo tin tức mới, có thể lưu vào cơ sở dữ liệu hoặc nơi lưu trữ khác
    const newNews = {
        id: newsData.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    newsData.push(newNews);
    res.redirect('/admin/news');
});

// Route hiển thị form chỉnh sửa tin tức
router.get('/edit/:id', authenticateAdmin, (req, res) => {
    const newsId = req.params.id;
    const news = newsData.find(news => news.id === parseInt(newsId));
    if (!news) {
        res.status(404).send('Tin tức không tồn tại');
    } else {
        res.send(`Form chỉnh sửa tin tức có ID ${newsId}`);
    }
});

// Route xử lý việc chỉnh sửa tin tức
router.post('/edit/:id', authenticateAdmin, (req, res) => {
    const newsId = req.params.id;
    const newsIndex = newsData.findIndex(news => news.id === parseInt(newsId));
    if (newsIndex === -1) {
        res.status(404).send('Tin tức không tồn tại');
    } else {
        // Cập nhật tin tức trong danh sách
        newsData[newsIndex].title = req.body.title;
        newsData[newsIndex].content = req.body.content;
        res.redirect('/admin/news');
    }
});

// Route xử lý việc xóa tin tức
router.post('/delete/:id', authenticateAdmin, async (req, res) => {
    try {
        const newsId = req.params.id;
        await News.findByIdAndDelete(newsId);
        res.redirect('/admin/news');
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server');
    }
});

// Export router để có thể sử dụng ở nơi khác trong ứng dụng
module.exports = router;
