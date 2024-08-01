import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Maps } from "./Maps"

@Entity({               //decorador que convierte la clase en una entidad de TypeORM
    name: "users"       //nombre de mi tabla
})               
export class User {
    @PrimaryGeneratedColumn()   //decorador que indica que es un primary key auto incrementable               
    id: number

    @Column({           //decorador que convierte propiedades en columnas de mi base de datos.
        length: 100      //longitud maxima de mi string
    })    name: string

    @Column()
    email: string

    @Column()
    birthdate: Date

    @Column()
    nDni: string

    @Column({ type: 'text', nullable: true }) //config para permitir null en postgresql
    confirmationToken: string | null; // Token para confirmar el correo electrónico

    @Column({               //estado del usuario, disabled o active
        type: "enum",
        enum: ["disabled", "active"],
        default: "disabled"
    })
    status: string

    @OneToOne(() => Credential)                //indica que es una relacion de 1 a 1 con la tabla de esa entidad
    @JoinColumn({name: "credentialId"})        //JoinColumn define que lado de la relacion contiene la columna de union con una clave externa
                                               //esta columna almacenara la clave foranea
    credential: Credential                     // columna credential

    @OneToMany(() => Maps, (maps) => maps.user)
    maps: Maps[]

}

