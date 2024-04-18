// newsModel.js
const mongoose = require('mongoose');

// Định nghĩa schema cho tin tức
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

// Tạo model từ schema
const News = mongoose.model('News', newsSchema);

module.exports = News;
