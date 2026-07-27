import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import './utils/db.js';
import {aduan} from './models/aduan.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import validator from 'express-validator';
import pkg from 'method-override';
const methodOverride = pkg;

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    const local = {
        title: 'Halaman Utama',
        layout: 'layouts/main-layouts'
    };
    res.render('index', local);
});

app.get('/aduan', (req, res)=>{
    const local = {
        title: 'Form Aduan',
        layout: 'layouts/main-layouts'
    };
    res.render('aduan', local);
});

app.get('/selesai', (req, res)=>{
    const local = {
        title: 'Aduan Terkirim',
        layout: 'selesai',
    }
    res.render('selesai', local);
})

// Tambah Data Aduan
app.post('/aduan', async (req, res)=>{
    const dataBaru = new aduan({
        email: req.body.email,
        nama: req.body.nama,
        nim: req.body.nim,
        nohp: req.body.nohp,
        kelas: req.body.kelas,
        aduan: [
            {isi: req.body.isi}
        ]
    });
    await dataBaru.save();
    res.redirect('/selesai');
});

app.listen(port, ()=>{
    console.log('Listening On Port ', port);
});