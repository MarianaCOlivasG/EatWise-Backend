
export class VerifyAccountDto {

    private constructor(
        public uid: string,
        public verification_code: string,
    ){}

    static create( object: {[key: string]: any } ): [string?, VerifyAccountDto? ]{
        const { uid, verification_code } = object;
        if ( !uid ) return [`Missing 'uid'`]
        if ( !verification_code ) return [`Missing 'verification_code'`]
        if ( verification_code.length != 6 ) return [`'verification_code' should be length 6`]
        return [ undefined, new VerifyAccountDto(uid, verification_code) ];
    }

}