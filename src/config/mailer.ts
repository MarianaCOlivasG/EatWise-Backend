

import nodemailer from 'nodemailer';
import hbs from "nodemailer-express-handlebars";
import path from "path";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        layoutsDir: path.join( __dirname, `../templates/`),
        defaultLayout: false,
        partialsDir: path.join( __dirname, `../templates/`),
    },
    viewPath: path.join( __dirname, `../templates/`),
    extName: '.hbs'
}));

transporter.verify().then(() => {
    'Servidor de correo electrónico OK'
});