
interface Attachment {
    filename: string; // 'example.pdf'
    path: string; //  path.join( __dirname, `../static/docs/example.pdf)`
    contentType: string; // 'application/pdf'
}


export class SendEmailDto {

    constructor(
        public to: string,
        public subject: string,
        public template: string,
        public context?:{ [key: string]: any },
        public attachments?: Attachment[],
    ) {}


    static create( object: {[key: string]: any } ): [string?, SendEmailDto? ]{
        const { 
            to,
            subject,
            template,
            context,
            attachments
        } = object;
        if ( !to ) return [`Missing 'to'`]
        if ( !subject ) return [`Missing 'subject'`]
        if ( !template ) return [`Missing 'template'`]
        return [ undefined, new SendEmailDto(
            to,
            subject,
            template,
            context,
            attachments,
        ) ];
    }
}