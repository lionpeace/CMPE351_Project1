const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 351;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files (HTML form sayfası)
app.use(express.static(path.join(__dirname, 'public')));

const files = [
    { fileID: '1', fileName: 'John Doe', fileSize: 30 },
    { fileID: '2', fileName: 'Jane Smith', fileSize: 25 },
    { fileID: '3', fileName: 'Mike Johnson', fileSize: 40 }
];

// POST isteğini işleme
app.post('/post', (req, res) => { 
    const { name, age } = req.body; 
    // Veriyi işleme 
    console.log(`Received data: Name - ${name}, Age - ${age}`); 
    // Başarılı yanıt ve submit.html dosyasını döndürme 
    res.sendFile(path.join(__dirname, 'public', 'post.html')); 
});

app.use(express.json()); // Gelen JSON verileri işlemek için

// PUT isteğini işleme
app.put('/put', (req, res) => {
    const { name, age } = req.body;
    console.log(`Received data: Name - ${name}, Age - ${age}`);
    // Güncelleme işlemlerini burada gerçekleştirin
    res.sendFile(path.join(__dirname, 'public', 'put.html'));
});

// PATCH isteğini işleme
app.patch('/patch', (req, res) => {
    const { name, age } = req.body;
    // Veriyi işleme
    console.log(`Updated data: Name - ${name}, Age - ${age}`);
    // Başarılı yanıt ve submit.html dosyasını döndürme
    res.sendFile(path.join(__dirname, 'public', 'patch.html'));
});

const users = [
    { userID: '1', name: 'John Doe', age: 30 },
    { userID: '2', name: 'Jane Smith', age: 25 },
    { userID: '3', name: 'Mike Johnson', age: 40 }
];

// DELETE isteğini işleme
app.delete('/delete', (req, res) => {
    const userId = req.body.userId;
    
    // Kullanıcı ID'si gönderilmemişse 400 Bad Request döndür
    if (!userId || userId.trim() === '') {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    // Örneğin, silinecek kullanıcı veritabanında bulunmuyorsa 404 Not Found döndür
    const userExists = users.some(user => user.userID === userId);
    if (!userExists) {
        return res.status(404).json({ error: `User with ID ${userId} not found.` });
    }
    
    // Kullanıcı başarılı bir şekilde silindiyse 200 OK döndür
    console.log(`User with ID ${userId} deleted.`);
    res.status(200).sendFile(path.join(__dirname, 'public', 'delete.html'));

    // Diğer durumlar için 500 Internal Server Error örneği
    try {
        // Burada potansiyel hata üretebilecek işlemler
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
});


app.head('/head', (req, res) => {
    // HEAD isteğinde sadece başlık bilgilerini döndürür
    res.set({
        'Content-Type': 'text/html',
        'Custom-Header': 'This is a custom header'
    });
    res.status(200).end();
});

// Sunucu başlatma
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});