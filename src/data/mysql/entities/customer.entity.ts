import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('customers')
export class Customer {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    date_of_birth: string

    @Column({ type: 'varchar', nullable: true })
    picture: string;

    @Column({ type: 'varchar', nullable: true })
    gender: string;

    @Column({ type: 'varchar', nullable: true })
    cooking_skill: string; // low, medium, high

    @Column({ type: 'varchar', nullable: true })
    diet_type: string;

    @Column({ type: 'json', nullable: true })
    allergies: string[]

    @Column({ type: 'bool', default: false })
    is_completed: boolean;

    @Column({ type: 'bool', default: true })
    is_active: boolean;

    @Column({ type: 'bool', default: false })
    is_disabled: boolean;

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

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @Column('varchar')
    id_user: string;

}