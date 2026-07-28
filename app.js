import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import './utils/db.js';
import {aduan} from './models/aduan.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import validator from 'express-validator';
import pkg from 'method-override';
import aduanRouter from './aduan.js';
import riwayatRouter from './riwayat.js';

const methodOverride = pkg;
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'))


app.get('/', (req, res)=>{
    const local = {
        title: 'Halaman Utama',
        layout: 'layouts/main-layouts'
    };
    res.render('index', local);
});

app.use('/aduan', aduanRouter);

app.use('/riwayat', riwayatRouter);

app.get('/detail/:id', async (req, res)=>{
    const detailAduan = await aduan.findOne({_id: req.params.id});
    res.render('detail', {
        title: 'Detail Aduan',
        layout: 'layouts/main-layouts',
        detailAduan,
    })
})

app.listen(port, ()=>{
    console.log('Listening On Port ', port);
});