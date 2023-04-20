Drop database if exists NEGOCIO3;
create database NEGOCIO3;
use NEGOCIO3;

create table Paquete(
idpaq int primary key not null,
tipo_paq varchar(15),
indate varchar(10),
outdate varchar(10),
dest_pac varchar(40),
direc_paq varchar(100),
desc_paq varchar(100)
);

create table Personal(
idper int primary key not null auto_increment ,
nom_per varchar(40),
tipo_per varchar(50),
sueldo_per int,
tel_per varchar(15)
)
auto_increment=100000;

create table Paq_per(
idpaq int,
idper int,
foreign key(idpaq) references Paquete (idpaq) on update cascade on delete cascade,
foreign key(idper) references Personal (idper) on update cascade on delete cascade
);

create table Cliente(
usuario varchar(30) primary key not null,
nom_user varchar(40)
);

create table Paq_cli(
idpaq int,
usuario varchar(30),
foreign key(idpaq) references Paquete(idpaq) on update cascade on delete cascade,
foreign key(usuario) references Cliente(usuario) on update cascade on delete cascade
);

create table Presupuesto(
idpres int primary key not null,
dia_pres varchar(10),
gan_pres int,
inv_pres int,
consu_pres int
);

create table Abastecedor(
idabast int primary key not null,
nom_abast varchar(40),
tel_abast varchar(15)
);

create table Producto(
idprodu int primary key not null,
nom_produ varchar(15),
unidades_disp int,
padq_produ int,
pvent_produ int
);

create table Prod_abast(
idprodu int,
idabast int,
foreign key(idprodu) references Producto (idprodu) on update cascade on delete cascade,
foreign key(idabast) references Abastecedor (idabast) on update cascade on delete cascade
);

create table Computadora(
idcomp int primary key not null,
medhr_compu int
);

create table Renta(
id_rent int primary key not null,
hr_ingr varchar(9),
hr_sal varchar(9),
cost_tot int,
dia_rent varchar(10)
);

create table Renta_comp(
id_rent int,
idcomp int,
foreign key(id_rent) references Renta (id_rent) on update cascade on delete cascade,
foreign key(idcomp) references Computadora (idcomp) on update cascade on delete cascade
);

create table Registrar(
idregis int primary key not null,
idper int,
idpaq int,
foreign key(idper) references Personal (idper) on update cascade on delete cascade,
foreign key(idpaq) references Paquete (idpaq) on update cascade on delete cascade
);

create table Administrar(
idadmin int primary key not null,
idper int,
idpres int,
foreign key(idper) references Personal (idper) on update cascade on delete cascade,
foreign key(idpres) references Presupuesto (idpres) on update cascade on delete cascade
);


create table Vender(
idvent int primary key not null,
idper int,
idprodu int,
nopiezas_vent int,
dia_vent varchar(10),
foreign key(idper) references Personal (idper) on update cascade on delete cascade,
foreign key(idprodu) references Producto (idprodu) on update cascade on delete cascade
);

insert into Personal values (123456, 'Joshua','administrador',1,'5555555555');

insert into Personal values (121212, 'Angel','Ingeniero de mantenimiento',1,'5555555555');

insert into Personal values (123356, 'Omar','administrador',2,'5555555555');

insert into Personal values (123556, 'Aaron','administrador',3,'5555555555');


select tipo_per from Personal where idper = 123456;

select * from Personal;

ALTER USER 'root'@'localhost' identified WITH mysql_native_password BY 'n0m3l0';