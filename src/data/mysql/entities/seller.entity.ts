import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('sellers')
export class Seller {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    picture: string;

    @Column({ type: 'bool', default: true })
    is_active: boolean;

    @Column({ type: 'bool', default: false })
    is_disabled: boolean;

    @Column({ type: 'bool', default: false })
    is_completed: boolean;

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

    @OneToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @Column('varchar')
    id_user: string;


}