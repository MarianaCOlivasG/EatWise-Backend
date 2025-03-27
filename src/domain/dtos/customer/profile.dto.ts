
export class CompleteProfileDto {

    private constructor(
        public uid: string,
        public date_of_birth: string,
        public gender: string,
        public cooking_skill: string,
        public diet_type: string,
        public allergies: string[],
    ){}

    static create( object: {[key: string]: any } ): [string?, CompleteProfileDto? ]{
        const { 
            uid,
            date_of_birth,
            gender,
            cooking_skill,
            diet_type,
            allergies,
        } = object;
        if ( !uid ) return [`Missing 'uid'`]
        return [ undefined, new CompleteProfileDto(
            uid,
            date_of_birth,
            gender,
            cooking_skill,
            diet_type,
            allergies,
        ) ];
    }

}