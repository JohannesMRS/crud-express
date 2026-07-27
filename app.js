import express from 'express';
import expressLayouts from 'express-ejs-layouts';


const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.get('/', (req, res)=>{
    const local = {
        title: 'Halaman Utama',
        layout: 'layouts/main-layouts'
    }
    res.render('index', local);
});

app.listen(port, ()=>{
    console.log('Listening On Port ', port);
})