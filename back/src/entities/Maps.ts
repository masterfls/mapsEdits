import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
@Entity({               
    name: "maps"       
}) 
export class Maps{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'jsonb', nullable: true})
    coordenadas: {lat: number, lng: number}[]; //array de objetos con lat y lng 

    @Column({type: 'jsonb', nullable: true})
    estilos: {color: string, grosor: number}[]
    
    @ManyToOne (() => User, (user) => user.maps)
    user: User;
}
