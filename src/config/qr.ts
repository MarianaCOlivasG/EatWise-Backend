
import QRCode from 'qrcode';

export class QR {

    static async generate( id: string ) {
        const data = {
            id,
            message: 'I am a pony!'
        }
        return await QRCode.toDataURL(JSON.stringify(data));
    }

}