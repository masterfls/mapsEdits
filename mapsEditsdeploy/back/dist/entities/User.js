"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Credential_1 = require("./Credential");
const Maps_1 = require("./Maps");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)() //decorador que indica que es un primary key auto incrementable               
    ,
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100 //longitud maxima de mi string
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nDni", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["user", "admin", "disabled"],
        default: "disabled"
    }),
    __metadata("design:type", String)
], User.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }) //config para permitir null en postgresql
    ,
    __metadata("design:type", Object)
], User.prototype, "confirmationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["disabled", "active"],
        default: "disabled"
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Credential_1.Credential) //indica que es una relacion de 1 a 1 con la tabla de esa entidad
    ,
    (0, typeorm_1.JoinColumn)({ name: "credentialId" }) //JoinColumn define que lado de la relacion contiene la columna de union con una clave externa
    //esta columna almacenara la clave foranea
    ,
    __metadata("design:type", Credential_1.Credential // columna credential
    )
], User.prototype, "credential", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Maps_1.Maps, (maps) => maps.user),
    __metadata("design:type", Array)
], User.prototype, "maps", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({
        name: "users" //nombre de mi tabla
    })
], User);
