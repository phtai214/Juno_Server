import express from 'express';
import initRouter from './src/routers';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mysql from 'mysql2';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Thay đổi theo port frontend của bạn
    credentials: true,
}));

initRouter(app);
app.get('/', (req, res) => {
    res.send('server ready!')
})


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'juno'
});


connection.connect((err) => {
    if (err) {
        console.error('Có lỗi khi kết nối với cơ sở dữ liệu:', err);
        return;
    }
    console.log('Đã kết nối đến cơ sở dữ liệu!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
