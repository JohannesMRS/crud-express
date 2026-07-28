import express from 'express';
import './utils/db.js';
import {aduan} from './models/aduan.js';
const router = express.Router();

router.get('/', (req, res)=>{
    const local = {
        title: 'Form Aduan',
        layout: 'layouts/main-layouts'
    };
    res.render('aduan', local);
});

router.get('/selesai', (req, res)=>{
    const local = {
        title: 'Aduan Terkirim',
        layout: 'selesai',
    }
    res.render('selesai', local);
});

// Tambah Data Aduan
router.post('/', async (req, res)=>{
    const dataBaru = new aduan({
        email: req.body.email,
        nama: req.body.nama,
        nim: req.body.nim,
        nohp: req.body.nohp,
        kelas: req.body.kelas,
        aduan: [
            {
                isi: req.body.isi,
                date: new Date(),
            }
        ]
    });
    await dataBaru.save();
    res.redirect('/aduan/selesai');
});


export default router;

// app.get('/aduan', );