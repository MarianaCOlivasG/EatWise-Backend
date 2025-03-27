import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true })
    username: string;

    @Column({ type: 'varchar', unique: true })
    email: string;
  
    @Column({ type: 'varchar', unique: true, nullable: true })
    phone: string;

    @Column({ type: 'varchar' })
    password?: string;

    @Column({ type: 'varchar', nullable: true })
    picture: string;

    @Column({ type: 'bool', default: true })
    is_active: boolean;

    @Column({ type: 'bool', default: false })
    is_online: boolean;

    @Column({ type: 'bool', default: false })
    is_disabled: boolean;

    @Column({ type: 'bool', default: false })
    is_google: boolean;

    @Column({ type: 'bool', default: false })
    has_profile: boolean;

    @Column({ type: 'varchar' }) // seller or customer
    entity: string;

    @Column({ type: 'bool', default: false })
    is_verified: boolean;

    @Column({ type: 'varchar', nullable: true })
    verification_code: string | null; 

    @CreateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)" 
    })
    created_at: Date;

    @UpdateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updated_at: Date;

}