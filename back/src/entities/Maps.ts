import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "maps" })
export class Maps {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'json', nullable: true })
    coordenadas: { lat: number; lng: number }[];

    @Column({ type: 'json', nullable: true })
    estilos: { color: string; grosor: number }[];

    @ManyToOne(() => User, (user) => user.maps, { nullable: false })
    user: User;
}
