import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
@Entity({               
    name: "maps"       
}) 
export class Maps{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    lat: number

    @Column()
    lng: number

    @Column()
    color: string

    @Column()
    grosor: number

    @ManyToOne (() => User, (user) => user.maps)
    user: User;
}