// import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
// import { Credential } from "./Credential"

// @Entity({               //decorador que convierte la clase en una entidad de TypeORM
//     name: "users"       //nombre de mi tabla
// })               
// export class User {
//     @PrimaryGeneratedColumn()   //decorador que indica que es un primary key auto incrementable               
//     id: number

//     @Column({           //decorador que convierte propiedades en columnas de mi base de datos.
//         length: 100      //longitud maxima de mi string
//     })    name: string

//     @Column()
//     email: string

//     @Column()
//     birthdate: Date

//     @Column()
//     nDni: string

//     @OneToOne(() => Credential)
//     @JoinColumn()
//     credential: Credential

//     @ManyToMany(() => Appointment, (appointment) => appointment.user)
//     appointments: Appointment[]
// }

