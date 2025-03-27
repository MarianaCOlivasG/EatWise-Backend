
export class LoginDto {

    private constructor(
        public email: string,
        public password: string,
        public entity: string,
    ){}


    static create( object: {[key: string]: any } ): [string?, LoginDto? ]{
        const { email, password, entity } = object;
        if ( !email ) return [`Missing 'email'`]
        if ( !password ) return [`Missing 'password'`]
        if ( !entity ) return [`Missing 'entity'`]
        if ( password.length < 6 ) return [`'password' too short, min length 6`]
        if ( entity.toLowerCase() !== 'customer' && entity.toLowerCase() !== 'seller') return [`'entity' must be 'customer' or 'seller'`]
        return [ undefined, new LoginDto(email.toLowerCase(), password, entity.toLowerCase()) ];
    }

}