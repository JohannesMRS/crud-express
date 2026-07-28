import express from 'express';
import './utils/db.js';
import {aduan} from './models/aduan.js';
const router = express.Router();

router.get('/', async (req, res)=>{
    const riwayatAduan = await aduan.find();
    res.render('riwayat', {
        title: 'Riwayat Aduan',
        layout: 'layouts/main-layouts',
        riwayatAduan
    });
});

// Delete Data
router.delete('/', async (req, res)=>{
    try{
        await aduan.deleteOne({_id: req.body._id});
        res.redirect('riwayat');
    }catch(err){
        console.error(err);
    };
});

// Edit Data
router.get('/edit/:id', async (req, res)=>{
    try{
        const data = await aduan.findOne({_id: req.params.id});
        res.render('edit', {
            title: 'Halaman Edit',
            layout: 'layouts/main-layouts',
            data,
        })
    } catch(err){
        console.error(err);
    }
});

router.put('/edit/:id', async(req, res)=>{
    try{
        // const {email} = req.body;
        await aduan.findByIdAndUpdate({_id:req.params.id}, {
            nama: req.body.nama,
            email: req.body.email,
            nim: req.body.nim,
            nohp: req.body.nohp,
            kelas: req.body.kelas,
            aduan: {
                isi: req.body.isi
            }
        });
        res.redirect(`/detail/${req.params.id}`);
    }catch(err){
        console.error(err);
    }
});

export default router;