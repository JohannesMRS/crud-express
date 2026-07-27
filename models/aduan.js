import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/aspirasi');
import { title } from "node:process";

const {Schema} = mongoose;

const aduanSchema = new Schema({
    nama: String,
    email: String,
    nim: String,
    nohp: String,
    kelas: String,
    aduan: [{isi: String,date: Date}]
});

export const aduan = mongoose.model('aduan', aduanSchema);