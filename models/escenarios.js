var Escenarios = new Object();


//
//
//
//
//

Escenarios[0] = new Object();
Escenarios[0].nombre = "Ring del Coliseo Kido";
Escenarios[0].descripcion = "Este escenario no produce ninguna bonificación ni penalización a ningun personaje";
Escenarios[1] = new Object();
Escenarios[1].nombre = "Terreno Nevado/Helado";
Escenarios[1].descripcion = "Los siguientes caballeros añaden +5 a sus Ataques Físico, +5 a sus Defensas Físicas y +50 de Cosmos por Nivel: Acuario, Cristal, Cisne, Hidra Hembra, Osa Mayor, Todos los Asgardianos, Kraken, Arpía, Cabezamartillo, Garrapata, Antlion, Piwichen, Yeti, Cisne Negro, Alexer, Unity.*Los siguientes caballeros restan -5 a todas sus bases:Leo, Centauro, Fenix, Fenix Negro, Hidra Macho, Llama, Bennu, Jango, todos los Ángeles Escarlata.*Los Ataques con Elemento Agua causan un 10% de Daño extra. Por el contrario, los Ataques con Elemento Fuego causan un 10% de Daño menos.";
Escenarios[2] = new Object();
Escenarios[2].nombre = "Desierto/Montañas Rocosas";
Escenarios[2].descripcion = "*Todos los Ángeles de Zeus , Daichi y Sho, añaden +5 a su Ataque Físico" + 
"*Todos los Traidores, Perro de Presa y Spartan añaden +5 a su Ataque y Defensa Físico y empiezan con +20 de Cosmos por Nivel. (Salvo Cisne Negro que solo añade las bases)"+
"*Los siguientes caballeros empiezan con +20 de Cosmos por Nivel y añaden +5 a la Defensa Física:"+
"Aries, Capricornio, Escorpio, Aguila, Ofiuco, Triángulo, Pavo Real, "+
"Loto,Perseo, Auriga, Cancerbero, Cuervo,Centauro, Mosca, Lobo, Retsu, "+
"Esfinge, Ciclope, Troll, Gollem, todos los Ángeles de Eris y de Lucifer,\
Ciempiés, Elfo, Gorgona, Garrapata, Gusarapa, Momia, Topo, Escarabajo Pelotero,"+
"Escarajo Mortal, Sílfide, Mei, Onírico y todos los Gigantes de Tifón incluído éste mismo.";
Escenarios[3] = new Object();
Escenarios[3].nombre = "Playas/Rios/Lagunas/Lugares con concretación de Agua";
Escenarios[3].descripcion = "*Los siguientes caballeros añaden +5 a sus Defensas y empiezan con +20 de cosmos por Nivel:<br>\
Cáncer, Dragón, Ohko, La Sirena Menor, Aqueronte, Lycaón, Dragón Negro, Escudo Ardiente, Los Caballeros de los Abismos menos Geiste<br>\
*Los siguientes caballeros añaden +5 a todas sus bases:<br>\
Lagarto, Ballena, Perro de Presa, Águila, Andrómeda, Cefeo, Camaleón, Flor de Lis, Calamar, Cabezamartillo, Dorada, Tifón<br>\
*Teseo añade +5 a su Defensa Física";
Escenarios[4] = new Object();
Escenarios[4].nombre = "Bosques/Bosques Encantados/Lugares donde abunde la Vegetación";
Escenarios[4].descripcion = "*Los siguientes caballeros añaden +5 a todas sus bases y +50 de cosmos por nivel:<br>\
Libra, Piscis, Mosca, Can Mayor, Hércules, Dragón, Ohko, Unicornio, León Menor, Retsu, Delta, Scylla, Papillon, Escarabajo Mortal, Gusano, Profundidades, todos los Ángeles de Lucifer, Derahan, Elfo, Pies Grandes, Cait Sith, Fantasio<br>\
*Los Ataques Cósmicos con efecto Quemar, añaden +30% en lugar de los +20% habituales.<br>\
*Ofiuco añade +5 al Ataque y a la Defensa Física.<br>\
*Lira y Eta añaden +5 a la Defensa Psíquica";
Escenarios[5] = new Object();
Escenarios[5].nombre = "Praduras/Llanuras/Sabana";
Escenarios[5].descripcion = "*Lira Añade +5 a todas sus bases y +50 de cosmos por nivel<br>\
*Los siguientes caballero añaden +5 a su Ataque físico:<br>\
Unicornio, Tauro, Piscis, Águila, Lagarto, Ofiuco, Pavo Real, Can Venatici, Can Mayor, Auriga, Cancerbero, Pegaso, León Menor, Lobo, Retsu, Epsilon, Troll, Gollem, Deep, Sílfide, Cit Sith, Morfeo y todos los de Lucifer<br>\
*Gusano añade +10 a su Ataque Físico y +20 de cosmos por nivel";
Escenarios[6] = new Object();
Escenarios[6].nombre = "Terreno Urbano/Interior de Edificios";
Escenarios[6].descripcion = "*Los siguientes Caballeros añaden la Iniciativa (Si varios la tienen por aparecer aquí o por habilidades postean entre ellos en el orden normal):<br>\
Cáncer, Cuervo, Lira, Altar, Haruto, Mime, Rungnr, Ullr, Gusano,  Licaón, Druj Nasu, Geist, Moa<br>\
*Los siguientes caballeros añaden +5 a su Ataque Psíquico:<br>\
Lira, Mime, Druj Nasu, Geist, Moa, Enkelado, El Rey Minos<br>\
*Los siguientes Caballeros añaden +5 a su Ataque Físico:<br>\
Cuervo, Ptolemy de la Flecha, Gusano<br>\
*Teseo añade +5 a su Defensa Física";

//
//
//
//
//

Escenarios[7] = new Object();
Escenarios[7].nombre = "El Santuario de Atenea";
Escenarios[7].descripcion = "*Pegaso, Unicornio y Sagitario añaden +5 a su Defensa Psíquica<br>\
*Todos los Caballeros del Santuario de Atenea (Salvo los Caballeros de Acero), el Antiguo Santuario de Atenea y el Santuario Omega añaden +5 a todas sus Bases Defensivas y +100 pts extras de Cosmos por Nivel<br>\
*Todos los miembros del Santuario de losTraidores y Renegados tienen -5 a su Base de Defensa Psíquica<br>\
*Todos los Ataques con Elemento Luz causan un 10% de Daño extra y los Ataques con Elemento Oscuridad causan un 10% de Daño menos.";
Escenarios[8] = new Object();
Escenarios[8].nombre = "Entrada del Santuario";
Escenarios[8].descripcion = "*Ptolemy de la Flecha tiene siempre la Iniciativa del Combate (Aunque la puede perder si sus rivales incluyen Habilidades de Iniciativa de la forma habitual) y su primer Ataque Aturde.<br>\
*Todos los Guardias del Santuario y los Caballeros de Bronce añaden +5 a su Base de Ataque Físico y a su Base de Defensa Psíquica<br>\
";
Escenarios[9] = new Object();
Escenarios[9].nombre = "El Coliseo del Sanuario";
Escenarios[9].descripcion = "*Cassios, Discípulo de Shaina añade +5 a sus Bases de Ataque y Defensa Fisicas<br>\
*Seiya de Pegaso añade +5 a su Base de Ataque Cósmico<br>\
*Shaina del Oficuo, Marin del Águila, Yato del Unicornio y Aioria de Leo añaden +5 a su Base de Defensa Psíquica<br>\
*Todos los Caballeros Sin Armadura añaden +5 a todas sus Bases de Ataque<br>\
*Todos los Caballeros Sin Elemento añaden +5 a sus Bases de Defensa Físicas y Cósmicas";
Escenarios[10] = new Object();
Escenarios[10].nombre = "Cementerio de Caballeros";
Escenarios[10].descripcion = "*Shaina del Oficuo, Jabu del Unicornio, Ichi de la Hidra, Nachi del Lobo y Verónica del Druj Nasú añaden +5 a su Base de Ataque Físico<br>\
*Teneo y Selinsa añaden 100 pts extras de Cosmos por nivel y +5 a su Base de Defensa Psíquica<br>\
*Todos los miembros del Inframundo de Hades, el Santuario de la Discordia de Eris, el Pandemonium de Lucifer y el Palacio Laberinto de Cronos añaden +5 a su Base de Ataque Psíquico";
Escenarios[11] = new Object();
Escenarios[11].nombre = "Cementerio de Estatuas";
Escenarios[11].descripcion = "*Byaku del Nigromante añade +100 pts extras de Cosmos por Nivel<br>\
*Todos los Gigantes del Clan de los Gigantes y todos los Gigantes de Tifón añaden +5 a sus Bases de Ataque y Defensa Físicas<br>\
*Todos los Atques con elemento Tierra causa un 10% de Daño extra";
Escenarios[12] = new Object();
Escenarios[12].nombre = "Cabo Sunion";
Escenarios[12].descripcion = "*Kanon de Géminis y Kanon del Dragón de los Mares reduce 100 pts de Cosmos por Nivel<br>\
*Saga de Géministiene -10 a su Base de Defensa Psíquica<br>\
*Tenma de Pegaso tiene -5  a sus Bases de Ataque y Defensa Psíquicas<br>\
*Ionia de Capricornio tiene -5 a sus Bases de Ataque Físico y Cósmico pero añade +5 a su Base de Ataque Psíquico<br>\
*Todos los Caballeros que no sean del Santuario de Atenea, el Antiguo Santuario de Atenea o el Santuario Omega de Atenea tienen -5 a sus Bases de Defensa Cósmicas y Psíquicas<br>\
*Todos los Espíritus añaden +30 pts de Energía por Nivel";
Escenarios[13] = new Object();
Escenarios[13].nombre = "Mazmorra de Urano";
Escenarios[13].descripcion = "*Todos los Caballeros reducen su Cosmos 100 pts por Nivel<br>\
*Galan tiene -5 a sus Bases de Defensa Cósmica y Psíquica<br>\
*Aioria de Leo tiene -5 a su Base de Defensa Psíquica<br>\
*Aiolos de Sagitario tiene +5 a su Base de Ataque Psíquico<br>\
*Todos los Caballeros del Santuario de los Traidores y Renegados tiene -5 a sus Bases de Ataque Físico y Cósmico";
Escenarios[14] = new Object();
Escenarios[14].nombre = "Monte de las Estrellas";
Escenarios[4].descripcion = "*El Patriarca, El Patriarca Seiji, Shion de Aries, Saga de Géminis, Aiolos de Sagitario, Ionia de Capricornio y Aspros de Géminis añaden 100 pts extras de Cosmos por Nivel y +5 a todas sus Bases de Defensa<br>\
*Yuna del Águila añade +5 a su Defensa Psíquica<br>\
*Altar y Sextante añaden +5 a sus Bases de Ataque y Defensa Cósmicas.<br>\
*Todos los Miembros del Olimpo de Zeus añaden +5 a sus Bases de Ataque y Defensa Cósmicas.";
Escenarios[15] = new Object();
Escenarios[15].nombre = "Templo del Carnero Blanco";
Escenarios[15].descripcion = "*Aries añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los Ataques con Elemento Fuego añaden un 10% de Daño extra";
Escenarios[16] = new Object();
Escenarios[16].nombre = "Templo del Toro Dorado";
Escenarios[16].descripcion = "*Tauro añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Tierra añaden un 10% de Daño extra";
Escenarios[17] = new Object();
Escenarios[17].nombre = "Templo de los Gemelos";
Escenarios[17].descripcion = "*Géminis añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Viento añaden un 10% de Daño extra";
Escenarios[18] = new Object();
Escenarios[18].nombre = "Templo del Gran Cangrejo";
Escenarios[18].descripcion = "*Cáncer añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Agua añaden un 10% de Daño extra";
Escenarios[19] = new Object();
Escenarios[19].nombre = "Templo del León";
Escenarios[19].descripcion = "*Leo añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Fuego añaden un 10% de Daño extra";
Escenarios[20] = new Object();
Escenarios[20].nombre = "Templo de La Virgen";
Escenarios[20].descripcion = "*Virgo añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Tierra añaden un 10% de Daño extra<br>\
";
Escenarios[21] = new Object();
Escenarios[21].nombre = "Jardín de los Sales Gemelos";
Escenarios[21].descripcion = "*Agora del Loto, Shiva del Pavo, Krishna de Chrysaor y Atavaka añaden +5 a todas sus Bases Defensivas y +100 pts extras de Cosmos por Nivel<br>\
*Virgo añade +5 a su Base de Defensa Cósmica<br>\
*Todos los miembros del Inframundo de Hades y del Pandemonium de Lucifer tienen -5 a todas sus Bases de Ataque<br>\
*Los Ataques con Elemento Luz causan un 10% de daño extra y los de Oscuridad un 10% de daño menos<br>\
";
Escenarios[22] = new Object();
Escenarios[22].nombre = "Templo de la Balanza";
Escenarios[22].descripcion = "*Libra añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Viento añaden un 10% de Daño extra";
Escenarios[23] = new Object();
Escenarios[23].nombre = "Templo del Escorpión Celestial";
Escenarios[23].descripcion = "*Escorpio añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Agua añaden un 10% de Daño extra";
Escenarios[24] = new Object();
Escenarios[24].nombre = "Templo Demoníaco de Ophiuco";
Escenarios[24].descripcion = "Ofiuco añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los miembros del Pandemonium de Lucifer tienen +5 a todas sus Base de Ataque<br>\
*Todos los ataques con Elemento Rayo añaden un 10% de Daño extra y los de Elemento Luz un 10% de Daño menos";
Escenarios[25] = new Object();
Escenarios[25].nombre = "Templo del Centauro";
Escenarios[25].descripcion = "*Sagitario añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los Caballeros de Bronce añaden +5 a su Base de Defensa Psíquica<br>\
*Todos los ataques con Elemento Fuego añaden un 10% de Daño extra";
Escenarios[26] = new Object();
Escenarios[26].nombre = "Templo de la Cabra Montesa";
Escenarios[26].descripcion = "*Capricornio añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Tierra añaden un 10% de Daño extra";
Escenarios[27] = new Object();
Escenarios[27].nombre = "Templo de la Urna Sagrada";
Escenarios[27].descripcion = "*Acuario añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Viento añaden un 10% de Daño extra";
Escenarios[28] = new Object();
Escenarios[28].nombre = "Templo de los Dos Peces";
Escenarios[28].descripcion = "*Piscis añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Viento añaden un 10% de Daño extra";
Escenarios[29] = new Object();
Escenarios[29].nombre = "Jardín de Rosas";
Escenarios[29].descripcion = "*Piscis, Deep y Basilisco añaden +5 a todas sus Bases Defensivas<br>\
*Todos los Ataques con Elemento Envenenar o Efecto Cortar causan un 20% de Daño extra<br>\
";
Escenarios[30] = new Object();
Escenarios[30].nombre = "Cámara del Patriarca";
Escenarios[30].descripcion = "*El Patriarca, El Patriarca Seiji, Shion de Aries, Saga de Géminis, Aiolos de Sagitario, Ionia de Capricornio y Aspros de Géminis añaden 100 pts extras de Cosmos por Nivel y +5 a todas sus Bases<br>\
*Altar añade +5 a todas sus Bases Defensivas<br>\
";
Escenarios[31] = new Object();
Escenarios[31].nombre = "Estatua de Atenea";
Escenarios[31].descripcion = "*Todos los Miembros del Santuario de Atenea, el Antiguo Santuario de Atenea y el Santuario Omega de Atenea pueden resucitar con 50 pv y el Cosmos que les quedara cuando mueren.<br>\
*El Elemento Luz causa un 20% de Daño extra y el Elemento Oscuridad un 20% de Daño menos";
Escenarios[32] = new Object();
Escenarios[32].nombre = "Gimnasio Kido";
Escenarios[32].descripcion = "*Seiya, Shiryû, Hyôga, Shun, Ikki, Jabu, Geki, Ban, Ichi, Nachi y Mei añaden +5 a todas sus Defensas<br>\
*Todos los Caballeros de Acero añaden +5 a todas sus Bases";
Escenarios[33] = new Object();
Escenarios[33].nombre = "Bosque de la Fundación Graad";
Escenarios[33].descripcion = "*Shun de Andrómeda tiene +5 a su Defensa Psíquica<br>\
*Todos los Caballeros de Acero y Docrates tienen +5 a todas sus Defensas<br>\
*Los Ataques con Elemento Fuego, Viento y Tierra causan un 10% de Daño extra";
Escenarios[34] = new Object();
Escenarios[34].nombre = "Laboratorio Secreto del Dr.Hasamori";
Escenarios[34].descripcion = "*Todos los Caballeros de Acero tienen +5 a todas sus Defensas y +50 pts de Energía por Nivel";
Escenarios[35] = new Object();
Escenarios[35].nombre = "Cámara de Entrenamiento de Palaestra";
Escenarios[35].descripcion = "*Todos los Caballeros de Bronce del Santuario Omega de Atenea (salvo Ichi de la Hidra Omega),, El Profesor George y El Maestro Geki añaden +5 a todas sus Bases y 100 pts extras de Cosmos por Nivel<br>\
*Todos los Elementos, salvo el Elemento Oscuridad, causan un 10% de Daño extra";
Escenarios[36] = new Object();
Escenarios[36].nombre = "La montaña Maldita del Campamento Alfa";
Escenarios[36].descripcion = "*Todos los Caballeros comienzan el Combate con 100 pts menos de Cosmos por Nivel<br>\
*Todos los Ataques Cósmicos tienen el Efecto Consumo de Vida";
Escenarios[37] = new Object();
Escenarios[37].nombre = "Ring del Torneo de Caballeros";
Escenarios[37].descripcion = "*Ionia de Capricornio tiene +5 a sus Bases de Defensa y Ataque Psíquicos<br>\
*Todos los Caballeros de Bronce Omega tienen +5 a todas sus Bases de Ataque";
Escenarios[40] = new Object();
Escenarios[40].nombre = "Reino de Asgard del Señor Odín";
Escenarios[40].descripcion = "*Todos los Guerreros Divinos con Estrella y Sin Estrella y todos los Guerreros de Asgard añaden +5 a todas sus Bases Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[41] = new Object();
Escenarios[41].nombre = "Bahía de Asgard";
Escenarios[41].descripcion = "*Todos las Técnicas con Elemento Agua causan un 10% de Daño extra. <br>\
*Thor de Phecta Gamma, Dolphin del delfín y Mills del Elfo añaden +5 a su Ataque Físico<br>\
*Los Caballeros con Elemento Tierra añaden +5 a su Defensa Física<br>\
*Sorrento de la Sirena añade +5 a su Ataque y Defensa Físicos<br>\
*Sigfried añade +5 a su Ataque Físico y a su Defensa Psíquica";
Escenarios[42] = new Object();
Escenarios[42].nombre = "Playa de Asgard";
Escenarios[42].descripcion = "*Thor de Phecta Gamma, Krag de la Medusa y Misty del Lagarto añaden +5 a su Ataque Físico<br>\
*Los Caballeros con Elemento Tierra, Babel del Centauro, Moisés de la Ballena, Misty del Lagarto y Asterión del Perro de Presa añaden +5 a su Defensa Física<br>\
*Daichi del Escudo Terrestre y Tetis de la Sirena Menor añaden +5 a su Ataque Físico";
Escenarios[43] = new Object();
Escenarios[43].nombre = "Altar de Odín";
Escenarios[43].descripcion = "*Todos los Asgardianos añaden 100 pts extras de Cosmos por nivel";
Escenarios[44] = new Object();
Escenarios[44].nombre = "Volcán de Asgard";
Escenarios[44].descripcion = "*Hagen de Merak Beta y Enkelados de la Voz Sellada añaden 100 pts extras de Cosmos por Nivel y +5 a todas sus bases Ofensivas<br>\
*Mei de la Cabellera añade 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Fuego añaden +10% de Daño extra<br>\
*Hagen de Merak Beta, Ikki del Fénix, Reda de la Serpiente, Cassiopea, June del Camaleón, Perseo, Defteros de Géminis y Niobe de Deep añaden +10 a su Defensa Cósmica";
Escenarios[45] = new Object();
Escenarios[45].nombre = "Lago de Asgard";
Escenarios[45].descripcion = "*Hagen de Merak Beta añade 100 pts extras de Cosmos por Nivel y +5 a todas sus bases Defensivas<br>\
*Todos los Caballeros con Elemento Agua añaden +5 a su Defensa Física<br>\
*Hagen de Merak Beta, Midgard de Jormungand, Ichi de la Hidra, Docrates de la Hidra, Serpiente de Mar y el Caballero de Cristal añaden +10 a su Ataque Cósmico.";
Escenarios[46] = new Object();
Escenarios[46].nombre = "Cementerio de Amatista";
Escenarios[46].descripcion = "*Todos los Caballeros salvo Alberich de Megrez Delta, el Caballero de Cristal y Cáncer restan 100 pts de Cosmos<br>\
*Alberich de Megrez Delta añade +5 a todas sus Bases de Ataque.<br>\
*Todas las Joyas de Garnet y Marchino del Esqueleto añaden +5 a todos sus Ataques<br>\
*El Caballero de Cristal añade +5 a su Defensa Física";
Escenarios[47] = new Object();
Escenarios[47].nombre = "Viejas Ruinas";
Escenarios[47].descripcion = "*Mime de Benetnasch Eta, Eligor de la Virtud y el Caballero Fantasma Orfeo de la Lira añade +5 a todas sus bases de Ataque y Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Asterión del Perro de Presa, Todos los Caballeros Fantasma, Astaroth del Querubín y Pegaso Negro añaden +5 a todas sus Defensas<br>\
*Yato del Unicornio, Tenma de Pegaso, Bleriot del León Menor, Yuna del Águila, Ull de Surtur, Flegias de Licaón, Raimi de Gusano, Fiodor de la Mandrágora, Verónica de Druj Nasu y Berenice de la Cabellera añaden +5 a su Ataque Físico y al Cósmico<br>\
*Folken añade +5 a su Defensa Psíquica";
Escenarios[48] = new Object();
Escenarios[48].nombre = "Bosque de Asgard";
Escenarios[48].descripcion = "*Thor de Phecda Gamma, Rungnr de Hrungnir, , Midgard de Jormungand, Ilias de Leo, Moa del Trono, Myû de Papillón y Luco de la Dríade añaden +5 a todas sus bases de Ataque y Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Alberich de Megrez Delta, Fenrril de Alioth Epsilon y Ohko discípulo de Ohko añaden 100 pts extras de Cosmos por Nivel<br>\
*Piscis añade +10 a todos sus Ataques y Defensas Físicos<br>\
*Ull de Surtur añade +10 a su Ataque Físico<br>\
*Bud Sombra de Alcor Zeta, Lobo, Mosca, Lince, Cuervo, Worm, Alraune, Mandrágora, Cheshire de Cait Sith, Cuervo Negro y Sonia de la Avispa añaden +5 a su Ataque Físico<br>\
*Cid de Mizhar Zeta y Folken añaden +5 a su Defensa Física<br>\
*Mandrágora y Derahan añaden +10 al Ataque Psíquico";
Escenarios[49] = new Object();
Escenarios[49].nombre = "Montañas de Asgard";
Escenarios[49].descripcion = "*Fenrril de Alioth Epsilon añade +5 a todas sus Bases de Defensa y +100 pts extras de Cosmos por Nivel<br>\
*Folken añade +10 a su Defensa Física<br>\
*Alberich de Megrez Delta, Cid de Mizhar Zeta, Loki de Fenrril, Ban del León Menor y Lobo añaden +5 a su Defensa Cósmica";
Escenarios[50] = new Object();
Escenarios[50].nombre = "Palacio de Valhalla";
Escenarios[50].descripcion = "*Todos los Asgardianos añaden 100 pts extras de Cosmos por Nivel<br>\
*Todos los Asgardianos salvo: Thor, Fenrrl, Mime, Bud, Midgard, y Folken añaden +5 a todas sus Defensas<br>\
*Bud de Alcor Zeta añade +10 a su Defensa Física<br>\
*Ull de Surtur, Rungnr de Hrungnir y Loki de Fenrril añaden +10 a su Ataque Físico<br>\
*Frey y Siegfried añaden +5 a su Ataque Físico y a su Defensa Psíquica";
Escenarios[51] = new Object();
Escenarios[51].nombre = "Estatua de Odín";
Escenarios[51].descripcion = "*Todos los Asgardianos y Seiya con la Armadura de Odín pueden resucitar con 50 pv y el Cosmos que les quedara cuando mueren.<br>\
*Frey tiene +10 a la Defensa Psíquica<br>\
*Sigfried añade +10 a su Ataque Cósmico";
Escenarios[52] = new Object();
Escenarios[52].nombre = "Santuario Submarino de Poseidón";
Escenarios[52].descripcion = "*Todos los Generales Marinos y Marinos de Poseidón <br>\
añaden +5 a todas sus Bases Defensivas y +100 pts extras de Cosmos por nivel<br>\
*Todos los Ataques con Elemento Agua causan un 10% de daño extra<br>\
*Todos los Caballeros de los Abismos añaden +5 a sus Bases Defensivas";
Escenarios[53] = new Object();
Escenarios[53].nombre = "Entrada del Santuario Subarino del Mediterráneo";
Escenarios[53].descripcion = "*Sirena Menor y todos los Marinos (No Generales Marinos) añaden +5 a su Base de Ataque Físico y a su Base de Defensa Psíquica";
Escenarios[54] = new Object();
Escenarios[54].nombre = "Pilar del Océano Pacífico Norte";
Escenarios[54].descripcion = "*Bian añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Tierra añaden un 10% de Daño extra";
Escenarios[55] = new Object();
Escenarios[55].nombre = "Pilar del Océano Pacífico Sur";
Escenarios[55].descripcion = "*Io añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los Caballeros sin Elemento reducen el Daño de Ataques con Elemento un 20%";
Escenarios[56] = new Object();
Escenarios[56].nombre = "Pilar del Océano Índico";
Escenarios[56].descripcion = "*Krishna añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Luz añaden un 10% de Daño extra<br>\
*Garuda, Hánnuman, Kageboushi y Atavaka añaden +5 a su Ataque y Defensa Cósmica<br>\
";
Escenarios[57] = new Object();
Escenarios[57].nombre = "Pilar del Océano Ártico";
Escenarios[57].descripcion = "*Isaac añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Agua añaden un 10% de Daño extra<br>\
*Camus y Cristal tienen -5 a su Defensa Psíquica<br>\
*Hyôga tiene -10 a su Defensa Psíquica y a su Ataque Cósmico<br>\
*Geki del Oso añade +10 a la Defensa Física";
Escenarios[58] = new Object();
Escenarios[58].nombre = "Pilar del Océano Antártico";
Escenarios[58].descripcion = "*Kaysa añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Rayo añaden un 10% de Daño extra<br>\
*Todos los Miembros del Santuario de Atenea, salvo Ikki del Fénix; el Antiguo Santuario de Atenea; el Santuario Omega de Atenea y Kagaho del Bénnu tienen -5 a la Defensa Psíquica.";
Escenarios[59] = new Object();
Escenarios[59].nombre = "Pilar del Océano Atlántico Sur";
Escenarios[59].descripcion = "*Sorrento añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmso por Nivel<br>\
*Todos los ataques con Elemento Viento añaden un 10% de Daño extra";
Escenarios[60] = new Object();
Escenarios[60].nombre = "Pilar del Océano Atlántico Norte";
Escenarios[60].descripcion = "*Dragón de los Mares añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los ataques con Elemento Oscuridad añaden un 10% de Daño extra";
Escenarios[61] = new Object();
Escenarios[61].nombre = "Templo de Poseidón";
Escenarios[61].descripcion = "*Todos los Miembros del Santuario  Submarino de Poseidón pueden resucitar con 50 pv y el Cosmos que les quedara cuando mueren.<br>\
*Todos los Guerreros Azules añaden +10 a su Defensa Psíquica";
Escenarios[62] = new Object();
Escenarios[62].nombre = "Pilar Central";
Escenarios[62].descripcion = "*Todos los Miembros del Santuario Submarino de Poseidón añaden 100 pts extras de Cosmos por Nivel y +5 a todas sus Bases<br>\
*Todos los Ataques con Elemento Agua añaden un 10% de Daño extra";
Escenarios[63] = new Object();
Escenarios[63].nombre = "Sala de las Escamas";
Escenarios[63].descripcion = "*Todos los Generales Marinos añaden 100 pts extras de Cosmos por Nivel";
Escenarios[64] = new Object();
Escenarios[64].nombre = "Mansión de la Familia Solo";
Escenarios[64].descripcion = "*Todos los Marinos (No Generales) tienen la Iniciativa<br>\
*Todos los Miembros del Santuario de Atenea (No del Viejo ni del Omega) tienen -5 a su Defensa Psíquica";
Escenarios[65] = new Object();
Escenarios[65].nombre = "Entrada del Templo de Atlantis";
Escenarios[65].descripcion = "*Unity añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los Guerreros Azules añaden +5 a su Defensa Física";
Escenarios[66] = new Object();
Escenarios[66].nombre = "Fortaleza de Atlantis";
Escenarios[66].descripcion = "*Todos los Miembros del Santuario Submarino añaden +10 a sus Bases de Defensa Física y Cósmica<br>\
*Mime de Benetnasch Eta y Flegias de Licaón añaden +10 a su Defensa Física";
Escenarios[67] = new Object();
Escenarios[67].nombre = "Templo de Atlantis";
Escenarios[67].descripcion = "*Todos los Miembros del Santuario Submarino de Poseidón añaden +10 a su Ataque Físico<br>\
*Todos los Caballeros sin Elemento añaden +10 a su Defensas Físicas y Cósmicas ";
Escenarios[68] = new Object();
Escenarios[68].nombre = "Cámara de Poseidón";
Escenarios[68].descripcion = "*Todos los Caballeros que no sean del Santuario Submarino de Poseidón tienen 100 pts de Cosmos menos por Nivel<br>\
";
Escenarios[69] = new Object();
Escenarios[69].nombre = "Estatua Gigante de Poseidón";
Escenarios[69].descripcion = "*Todos los Miembros del Santuario Submarino de Poseidón añaden +10 a su Ataque y Defensa Físicos<br>\
*Todos los Ataques con Elemento Tierra causa un 20% de Daño extra";
Escenarios[70] = new Object();
Escenarios[70].nombre = "Inframundo de Hades";
Escenarios[70].descripcion = "*Todos los Espíritus pertenecientes al Inframundo de Hades añaden +5 a todas sus Bases Defensivas y +50 pts extras de Energía por nivel<br>\
*Todos los Dioses Oníricos, Jueces del Inframundo, Espectros Celestes, Espectros Terrestres, Soldados Esqueletos y Caballeros Resucitados añaden +5 a todas sus Bases Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[71] = new Object();
Escenarios[71].nombre = "Castillo de Heinstein";
Escenarios[71].descripcion = "*Todos los miembros del Santuario de Atenea, del Antiguo Santuario de Atenea y del Santuario Omega de Atenea restan 100 pts de Cosmos por Nivel";
Escenarios[72] = new Object();
Escenarios[72].nombre = "Pozo del Yomotsu Hirasaka";
Escenarios[72].descripcion = "*Fiodor, Marchino, Verónica, Escarabajo Mortal, Cáncer añaden +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Cabeza Martillo, Garrapata, Pies Grandes, Calamar, Ciriato, Rubicante, Amphitere, Lindorm, Manticora, Cuervo Negro y Ballena Negra añaden +5 a su Defensa Física ";
Escenarios[73] = new Object();
Escenarios[73].nombre = "Puerta del Inframundo";
Escenarios[73].descripcion = "*Todos los Caballeros no pertenecientes al Inframundo de Hades tienen -10 a su defensa Psíquica<br>\
*Todos los Caballeros resucitados por Hades añaden +5 a todas sus bases ofensivas y 100 pts extras de Cosmos por Nivel.<br>\
";
Escenarios[74] = new Object();
Escenarios[74].nombre = "Rio Aqueronte";
Escenarios[74].descripcion = "*Caronte, Kageboushin y Atavaka añaden +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Flegias, Calamar, Morena y Cabeza Martillo añaden +5 a su Defensa Cósmica<br>\
*Dragón, Ohko, Genbu, La Sirena Menor, Dragón Negro, Escudo Ardiente, los Caballeros de los Abismos menos Geiste, Lagarto, Ballena, Perro de Presa, Águila, Andrómeda, Cefeo, Camaleón, Dorada, Ballena Negro y Teseo añaden +5 a su Defensa Física";
Escenarios[75] = new Object();
Escenarios[75].nombre = "Primera Prisión: El Tribunal Silencioso";
Escenarios[75].descripcion = "*Lune añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Grifo añade +5 a todas sus Bases de Defensa<br>\
*Shion de Aries resta -10 a su Defensa Psíquica<br>\
";
Escenarios[76] = new Object();
Escenarios[76].nombre = "El Valle del Huracán Oscuro";
Escenarios[76].descripcion = "*Calamar, Pies Grandes, Escarabajo Pelotero, Anfisbena, Sílfide, Sho y Astaroth añaden +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Kanon de Géminis tiene la Iniciativa<br>\
*Todos los Ataques con Elemento Viento causan un 20% de Daño extra<br>\
";
Escenarios[77] = new Object();
Escenarios[77].nombre = "Segunda Prisión: La Pirámide";
Escenarios[77].descripcion = "*Pharaón y Cerbero el perro del Inframundo añaden +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Orfeo, Momia, Cerbero  y Miguelanghelo del Centauro añaden +5 a su Defensa Física<br>\
*Todos los Ataques con Elemento Tierra añaden un 10% de Daño extra";
Escenarios[78] = new Object();
Escenarios[78].nombre = "Campo de Flores";
Escenarios[78].descripcion = "*Orfeo de la Lira añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Moa del Trono y Calisto añaden +5 a todas sus Bases de Defensa";
Escenarios[79] = new Object();
Escenarios[79].nombre = "Tercera Prisión";
Escenarios[79].descripcion = "*Rock de Gollem e Iwan de Troll añaden +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Ox de la Gorgona, Mills del Elfo, Gregor de Genbu, Topo y Escarabajo Pelotero añaden +5 a todas sus Defensas<br>\
*Todos los Ataques con Elemento Tierra añaden un 10% de daño extra.<br>\
*Avido del Altar Negro tiene -5 a todas sus bases";
Escenarios[80] = new Object();
Escenarios[80].nombre = "Cuarta Prisión: La Laguna Negra";
Escenarios[80].descripcion = "*Phlegias de Licaón añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Caronte de Aqueronte añade +5 a todas sus Bases de Defensa";
Escenarios[81] = new Object();
Escenarios[81].nombre = "Quinta Prisión: Las Tumbas Ardientes";
Escenarios[81].descripcion = "*Stand del Escarabajo Mortal y Byaku del Nigromante añaden +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Radamantis de Wivern, Aiacos de la Garuda y Minos del Grifo añaden +5 a su Ataque Cósmico";
Escenarios[82] = new Object();
Escenarios[82].nombre = "Sexta Prisión: El Laberinto";
Escenarios[82].descripcion = "*Gordon del Minotauro añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Babel del Centauro añade +5 a sus Defensas Físicas y Cósmicas<br>\
*Todos los Ataques con Efecto Cortar añaden un 10% de Daño extra<br>\
";
Escenarios[83] = new Object();
Escenarios[83].nombre = "Primer Valle de la Sexta Prisión: El Lago de Sangre";
Escenarios[83].descripcion = "*Queen de Alraune añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Wimber del Murciélago y Violet de Behemot añaden +50 pts de Cosmos por Nivel.<br>\
*Todos los Ataques con Base añaden efecto Consumo de Vida<br>\
";
Escenarios[84] = new Object();
Escenarios[84].nombre = "Segundo Valle de la Sexta Prisión: El Bosque";
Escenarios[84].descripcion = "*Valentín de la Arpía añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Verónica de Druj Nasu añade +5 a todas sus Bases Defensivas<br>\
*Todos los Ataques con Efecto Envenenar añaden un 10% de Daño extra";
Escenarios[85] = new Object();
Escenarios[85].nombre = "Tercer Valle de la Sexta Prisión: El Desierto";
Escenarios[85].descripcion = "*Shilpheed del Basilisco añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Momia y Esfinge añaden +10 a su Defensa Física<br>\
*Todos los Ataques con Elemento Viento añaden un 10% de Daño extra";
Escenarios[86] = new Object();
Escenarios[86].nombre = "Gran Cascada de Sangre";
Escenarios[86].descripcion = "*Asmita de Virgo añade +10 a su Defensa Cósmica<br>\
*Tenma de Pegaso añade 50 pts de Cosmos por Nivel<br>\
*Yato del Unicornio y Yuzuriha de la Grulla tienen -10 a su Defensa Física";
Escenarios[87] = new Object();
Escenarios[87].nombre = "Séptima Prisión: Las 10 Malebolgias";
Escenarios[87].descripcion = "*Atavaka añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los Miembros del Santuario de los Traidores y Renegados, Kanon del dragón de los Mares, Suikyô de la Copa, Todos los Caballeros Fantasmas de Eris, Todos los Caballeros Resucitados por Hades, Yôma de Mephistófeles, Ichi Caballero de Plata de la Hidra, Alberich de Megrez Delta y Cardinale de Piscis tienen 50 pts menos de Cosmos por Nivel y -5 a todas sus Defensas";
Escenarios[88] = new Object();
Escenarios[88].nombre = "Octava Prisión: El Cocito";
Escenarios[88].descripcion = "*Valentín de la Arpía, Acuario, El Caballero de Cristaal, Hyôga del Cisne e Isaac del Kraken añaden +5 a todas sus Base de Ataque<br>\
*Todos los Miembros del Santuario de Atenea, Antiguo Santuario de Atenea y Santuario Omega de Atenea tienen -10 a su Defensa Física y -100 pts de Cosmos por Nivel<br>\
*Orión, Pegaso, Heracles, Ícaro, Teseo y Odiseo tienen -5 a su Ataque Físico y Cósmico";
Escenarios[89] = new Object();
Escenarios[89].nombre = "Primera Esfera: Caina";
Escenarios[89].descripcion = "*Radamantis de Wivern añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Valentín de la Arpía y Shilpeed del Basilisco añaden +5 a su Defensa Psíquica";
Escenarios[90] = new Object();
Escenarios[90].nombre = "Segunda Esfera: Antenora";
Escenarios[90].descripcion = "*Aiacos de la Garuda añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Violate de Behemot añade +5 a su Defensa Psíquica";
Escenarios[91] = new Object();
Escenarios[91].nombre = "Tercera Esfera: Ptolomea";
Escenarios[91].descripcion = "*Minos del Grifo añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Byaku del Nigromante añade +5 a su Defensa Psíquica";
Escenarios[92] = new Object();
Escenarios[92].nombre = "Cuarta Esfera: La Judesca";
Escenarios[92].descripcion = "*Todos los Miembros del Inframundo de Hades pueden resucitar con 50 pv y el Cosmos que les quedara cuando mueren.<br>\
*Todos los Jueces del Inframundo añaden +5 a sus Bases Defensivas<br>\
*El Elemento Oscuridad causa un 20% de Daño extra y el Elemento Luz un 20% de Daño menos";
Escenarios[93] = new Object();
Escenarios[93].nombre = "Muro de las Lamentaciones";
Escenarios[93].descripcion = "*Silpheed del Basilisco, Queen de Alraune, Gordon del Minotauro, Minos del Grifo, Ortro, Dragón del Comodo, Gigante, Malacoda, Tijereta añaden +5 a todas sus Bases de Ataque<br>\
*El Elemento Luz no añade Daño extra<br>\
*Todos los Caballeros no pertenecientes al Inframundo de Hades tienen -10 a su Defensa Psíquica";
Escenarios[94] = new Object();
Escenarios[94].nombre = "Rio Lete";
Escenarios[94].descripcion = "*Shaka de Virgo, Caronte de Auqeronte y Phlegias de Licaón añaden +5 a su Ataque y Defensas Cósmicos";
Escenarios[95] = new Object();
Escenarios[95].nombre = "Campos Elíseos";
Escenarios[95].descripcion = "*Hipnos y Tánatos añaden +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Todos los Dioses Oníricos añaden +5 a sus Defensas Psíquicas";
Escenarios[96] = new Object();
Escenarios[96].nombre = "Mundo Onírico";
Escenarios[96].descripcion = "*Todos los Dioses Oníricos añaden 100 pts extras de Cosmos por Nivel";
Escenarios[97] = new Object();
Escenarios[97].nombre = "Fantasía";
Escenarios[97].descripcion = "*Fantaso de los Delirios añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Moa del Trono, Papillón, Bruja y Kasa de Limnades añaden +5 a su Ataque Psíquico";
Escenarios[98] = new Object();
Escenarios[98].nombre = "Fobia";
Escenarios[98].descripcion = "*Iquelo de los Espejismos y Phobetor Dios del Sueño añaden +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*El Efecto Cortar causa un 10% de Daño Extra<br>\
*Todos los Caballeros salvo Iquelo y Phobetor tienen -10 a su Defensa Psíquica<br>\
";
Escenarios[99] = new Object();
Escenarios[99].nombre = "Morfia";
Escenarios[99].descripcion = "*Morfeo de las Ilusiones añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Moa del Trono y Kasa de Limnades añaden +10 a su Ataque Psíquico<br>\
*Perseo, Orión, Cefeo, Odiseo, Ícaro, Teseo, Prometeo, Sísifo, Tenma, Yuzuriha, Yato y Hércules tienen 100 pts extras de Cosmos por Nivel<br>\
*Sísifo tienen -5 a sus Defensas Físicas y Cósmicas";
Escenarios[100] = new Object();
Escenarios[100].nombre = "Lienzo Perdido";
Escenarios[100].descripcion = "*Todos los Espectros Celestes añaden 100 pts Extras de Cosmos por Nivel";
Escenarios[101] = new Object();
Escenarios[101].nombre = "Entrada de los Templos Celestiales";
Escenarios[101].descripcion = "*Todos los Miembros del Antiguo Santuario de Atenea tienen -10 a sus Defensas Físicas y Psíquicas y 50 pts menos de Cosmos por Nivel<br>\
*Caronte de Aqueronte añade +5 a su Ataque y Defensa Físicos<br>\
*Faraón de la Esfinge añade +10 a su Ataque Psíquico";
Escenarios[102] = new Object();
Escenarios[102].nombre = "Primer Templo Celestial: Mercurio";
Escenarios[102].descripcion = "*Yôma de Mephistófeles añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Pertita del Búho añade +5 a todas sus Defensas";
Escenarios[103] = new Object();
Escenarios[103].nombre = "Segundo Templo Celestial: Venus";
Escenarios[103].descripcion = "*Lune de Balrog añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Shion de Aries tiene -10 a sus Defensas Psíquicas";
Escenarios[104] = new Object();
Escenarios[104].nombre = "Tercer Templo Celestial: Tierra";
Escenarios[104].descripcion = "*Kagaho de Bennu añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Los Ataques con elemento Fuego añaden un 10% de Daño extra";
Escenarios[105] = new Object();
Escenarios[105].nombre = "Cuarto Templo Celestial: Marte";
Escenarios[105].descripcion = "*Aspros de Géminis Resucitado por Hades añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Defteros de Géminis tiene -10 a su Defensa Psíquica<br>\
";
Escenarios[106] = new Object();
Escenarios[106].nombre = "Quinto Templo Celestial: Júpiter";
Escenarios[106].descripcion = "*Valentín de la Arpía añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel";
Escenarios[107] = new Object();
Escenarios[107].nombre = "Sexto Templo Celestial: Saturno";
Escenarios[107].descripcion = "*Radamantis de Wivern añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Valentín de la Arpía y Shilpheed del Basilisco añaden +5 a su Defensa Psíquica. El resto de espectros Terrestres y Celestes tienen -10 a su Defensa Psíquica.";
Escenarios[108] = new Object();
Escenarios[108].nombre = "Séptimo Templo Celestial: Urano";
Escenarios[108].descripcion = "*Partita del Búho añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Tenma de Pegaso añade +5 a su Ataque y Defensa Cósmicos y tiene -10 a su Defensa Psíquica";
Escenarios[109] = new Object();
Escenarios[109].nombre = "Octavo Templo Celestial: Neptuno";
Escenarios[109].descripcion = "*Tokusa de Hánnuman añade +5 a todas sus Bases de Ataque y de Defensa y 100 pts extras de Cosmos por Nivel<br>\
*Yuzuriha de la Grulla tiene -10 a sus Defensas Psíquicas<br>\
*Shion de Aries y Hakurei del Altar tienen -5 a sus Defensas Psíquicas<br>\
";
Escenarios[110] = new Object();
Escenarios[110].nombre = "Noveno Templo Celestial: Plutón";
Escenarios[110].descripcion = "*Yôma de Mephistófeles y Aspros de Géminis Resucitado por Hades pueden resucitar con 50 pv y el Cosmos que les quedaba<br>\
*Radamantis de Wivern añade +10 a su Ataque cósmico<br>\
*Todos los Espectros Celestes añaden +5 a todas sus Bases<br>\
*Todos los Espectros Terrestres, Jueces del Inframundo salvo Radamantis y Soldados Esqueletos tienen -5 a todas sus Bases";
Escenarios[111] = new Object();
Escenarios[111].nombre = "Isla de la Reina Muerte de los Traidores y Renegados";
Escenarios[111].descripcion = "*Todos los miembros del Santuario de los Traidores y Renegados e Ikki del Fénix añaden +5 a todas sus Bases Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[112] = new Object();
Escenarios[112].nombre = "Bosque de Aokigahara";
Escenarios[112].descripcion = "*Todos los Caballeros que no sean del Santuario de los Traidores y Renegados empiezan con 50 pts menos de Cosmos por Nivel";
Escenarios[113] = new Object();
Escenarios[113].nombre = "Roca de la Calavera";
Escenarios[113].descripcion = "*Todos los miembros del Santuario de Atenea tienen -10 a la Defensa Psíquica<br>\
*Docrates añade +10 a su Ataque Cósmico";
Escenarios[114] = new Object();
Escenarios[114].nombre = "Cueva de los 10 Vientos";
Escenarios[114].descripcion = "*Jukuryû del Dragón Negro, Pegaso Negro, Cisne Negro, Ryûga de Andrómeda Negro y Fénix Negro (No Ritahoa) añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel<br>\
";
Escenarios[115] = new Object();
Escenarios[115].nombre = "Laberinto de la Cueva de Inoshima";
Escenarios[115].descripcion = "*Ikki del Fénix añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel";
Escenarios[116] = new Object();
Escenarios[116].nombre = "Mansión de la Organización Nero";
Escenarios[116].descripcion = "*Avido del Altar Negro, Allegre de la Ballena Negro, Rusé del Cuervo Negro, Yudo del Perro de Presa Negro y Lemargos de Hércules Negro añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel<br>\
*Lumaca añade +10 a su Ataque y Defensa Físicos";
Escenarios[117] = new Object();
Escenarios[117].nombre = "Castillo de la Isla del Espectro";
Escenarios[117].descripcion = "*Todos los Caballeros de los Abismos y Geiste de Flor de Lis añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel";
Escenarios[118] = new Object();
Escenarios[118].nombre = "Sinigrado";
Escenarios[118].descripcion = "*Todos los Guerreros Azules añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel<br>\
*Degel de Acuario añade +5 a todas sus Defensas<br>\
";
Escenarios[119] = new Object();
Escenarios[119].nombre = "Biblioteca de Sinigrado";
Escenarios[119].descripcion = "*Unity, Degel y Alexer añaden 1 pto extra a cada Sentido (Sin obtener sentidos nuevos ni superar su máximo)";
Escenarios[120] = new Object();
Escenarios[120].nombre = "Pirámide de Tezcatlipoca";
Escenarios[120].descripcion = "*Todos los Guerreros Jaguar añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel";
Escenarios[121] = new Object();
Escenarios[121].nombre = "Mansión de Vouvre de Garnet";
Escenarios[121].descripcion = "*Todas las Joyas de Garnet, Kreist de Acuario y la propia Garnet añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel";
Escenarios[122] = new Object();
Escenarios[122].nombre = "Senkyou";
Escenarios[122].descripcion = "*Todos los Taonia, Dohko de Libra, Shiryû del Dragón y Ryûho del dragón añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel";
Escenarios[123] = new Object();
Escenarios[123].nombre = "Reino de Balor y Lugh";
Escenarios[123].descripcion = "*Todos los Fomorianos y los Tuatha añaden +5 a todas sus Bases y +100 pts extras de Cosmos por nivel<br>\
";
Escenarios[124] = new Object();
Escenarios[124].nombre = "Olimpo de Zeus";
Escenarios[124].descripcion = "*Todos los Ángeles del Olimpo y Satélites de la Luna añaden +5 a todas sus Bases Ofensivas y Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[125] = new Object();
Escenarios[125].nombre = "Entrada del Olimpo";
Escenarios[125].descripcion = "*Hécate, Calisto, todos los Dioses Oníricos, Seiya de Odín, Partita del Búho y Subaru añaden 100 pts extras de Cosmos por Nivel<br>\
*Todos los Gigantes de Tifón y del Clan de los Gigantes añaden 50 pts de Energía extras";
Escenarios[126] = new Object();
Escenarios[126].nombre = "Encrucijada de la Luna";
Escenarios[126].descripcion = "*Todos los Caballeros, salvo Hécate y cualqueir Satélite de la Luna, pierden 100 pts de Cosmos por Nivel propio. o 50 pts de Energía<br>\
*Hécate siempre tiene la Iniciativa<br>\
";
Escenarios[127] = new Object();
Escenarios[127].nombre = "Templo de la Luna";
Escenarios[127].descripcion = "*Todos los Satélites de la Luna añaden +5 a todas sus Bases<br>\
";
Escenarios[128] = new Object();
Escenarios[128].nombre = "Prisión de la Luna";
Escenarios[128].descripcion = "*Tôuma de Ícaro tiene -5 a su Ataque y Defensas Físicos pero añade +10 a su Defensa Psíquica";
Escenarios[129] = new Object();
Escenarios[129].nombre = "Entrada del Nuevo Santuario de la Luna";
Escenarios[129].descripcion = "*Los siguientes caballeros añaden +5 a sus bases de Ataque y +30 pts de Cosmos por nivel: Shaina, Jabu, Ichi y Nachi<br>\
*Seiya tiene -10 a todas sus bases y 100 pts menos de Cosmos por Nivel propio";
Escenarios[130] = new Object();
Escenarios[130].nombre = "Nuevo Santuario de la Luna";
Escenarios[130].descripcion = "*Todos los Ángeles del Olimpo añaden +5 a todas sus Bases Ofensivas y Defensivas.<br>\
*Tôma de Ícaro añade 100 pts extras de Cosmos por Nivel";
Escenarios[131] = new Object();
Escenarios[131].nombre = "Estatua de Piedra";
Escenarios[131].descripcion = "*Todos los Miembros del Santuario de Atenea, el Antiguo Santuario de Atenea y el Santuario Omega de Atenea tienen 100 pts menos de Cosmos pro Nivel y -10 a su Defensa Psíquica<br>\
*Teseo añade +10 a su Ataque Físico";
Escenarios[132] = new Object();
Escenarios[132].nombre = "Rio de la Luna";
Escenarios[132].descripcion = "*Odiseo añade +10 a su Defensa Cósmica";
Escenarios[133] = new Object();
Escenarios[133].nombre = "Desierto de la Luna";
Escenarios[133].descripcion = "*Tôma de Ícaro añade +10 a su Defensa Psíquica";
Escenarios[134] = new Object();
Escenarios[134].nombre = "Altar de la Luna";
Escenarios[134].descripcion = "*Tôma de Ícaro añade +10 a su Ataque Cósmico y 100 pts extras de Cosmos por Nivel<br>\
*Seiya de Pegaso tiene -5 a sus Defensas Físicas y Cósmicas pero añade +10 a sus Defensas Psíquicas";
Escenarios[135] = new Object();
Escenarios[135].nombre = "Montañas de la Luna";
Escenarios[135].descripcion = "*La Scoumoune siempre tiene la Iniciativa y añade +10 a su Ataque Físico";
Escenarios[136] = new Object();
Escenarios[136].nombre = "Nebulosa de Urano";
Escenarios[136].descripcion = "*Todos los Caballeros combaten con Nivel de Armadura y Entrenamiento Marcial 1.";
Escenarios[137] = new Object();
Escenarios[137].nombre = "Santuario de la Discordia de Eris";
Escenarios[137].descripcion = "*Todos los Caballeros Fantasmas y todas las Dríades añaden +5 a todas sus Bases Ofensivas y Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[138] = new Object();
Escenarios[138].nombre = "Edén de Oscuridad";
Escenarios[138].descripcion = "*Todas las Dríades añaden +5 a todas sus Bases Defensivas y 100 pts extras de Cosmos por Nivel<br>\
*Shoko y Kyoko tienen -10 a la Defensa Psíquica";
Escenarios[139] = new Object();
Escenarios[139].nombre = "Templo de Eris";
Escenarios[139].descripcion = "*Ate, Emoni y Phonos añaden <br>\
añaden +5 a todas sus Bases Ofensivas y Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[160] = new Object();
Escenarios[160].nombre = "Santuario de la Corona de Abel";
Escenarios[160].descripcion = "*Todos los Ángeles Escarlata añaden +5 a todas sus Bases Ofensivas y Defensivas y +100 pts extras de Cosmos por nivel<br>\
*El Elemento Fuego hace un 10% de Daño extra.";
Escenarios[161] = new Object();
Escenarios[161].nombre = "Bosque de Laureles";
Escenarios[161].descripcion = "*Atlas, Bellenger y Jaow añaden +5 a su Ataque Físico<br>\
*Ilias de Leo añade 100 pts extras de Cosmos por Nivel";
Escenarios[162] = new Object();
Escenarios[162].nombre = "Fuente de Castalia";
Escenarios[162].descripcion = "*Bellenger y Máscara de Muerte añaden +10 a su Ataque Físico<br>\
*Shiryû añade +5 a su Defensa Cósmica";
Escenarios[163] = new Object();
Escenarios[163].nombre = "Escalera del Monte Parnaso";
Escenarios[163].descripcion = "*Jaow añade +5 a su Ataque y Defensa Cósmicos<br>\
*Saga de Géminis añade +10 a su Defensa Cósmica";
Escenarios[164] = new Object();
Escenarios[164].nombre = "Monte Parnaso";
Escenarios[164].descripcion = "*Bellenger, Jaow, Camus de Acuario y Shura de Capricornio añaden +5 a su Defensa Física.";
Escenarios[165] = new Object();
Escenarios[165].nombre = "Oráculo de Delfos";
Escenarios[165].descripcion = "*Atlas añade +10 a su Ataque Cósmico<br>\
*Sísifo de Sagitario tiene -10 a su Defensa Psíquica<br>\
*Sísifo Espectro de Sagitario añade +5 a todas sus Bases y 100 pts extras de Cosmos por Nivel<br>\
*El Elemento Viento hace un 10% de Daño extra";
Escenarios[175] = new Object();
Escenarios[175].nombre = "Pandemonium de Lucifer";
Escenarios[175].descripcion = "*Todos los Ángeles Maléficos añaden +5 a todas sus Bases Ofensivas y Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[180] = new Object();
Escenarios[180].nombre = "Palacio Laberinto de Cronos";
Escenarios[180].descripcion = "*Todos los Espíritus pertenecientes al Palacio Laberinto de Cronos añaden +5 a todas sus Bases Ofensivas y Defensivas y +50 pts extras de Energía por nivel<br>\
*Todos los Gigantes del Clan de los Gigantes y todos los Gigantes de Tifón añaden +5 a todas sus Bases Ofensivas y Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[190] = new Object();
Escenarios[190].nombre = "Planeta Marte de Apsu";
Escenarios[190].descripcion = "*Todos los Marcianos añaden +5 a todas sus Bases Ofensivas y Defensivas y +100 pts extras de Cosmos por nivel";
Escenarios[200] = new Object();
Escenarios[200].nombre = "Escenario de Justicia";
Escenarios[200].descripcion = "*Todos los Caballeros compiten en N1 y NA1 tomándose las bases originales de la ficha, sin bonus. Sólo se posee los 5 Sentidos básicos con un valor de 5 cada uno (Los Caballeros sin Armadura tienen uno de ellos en valor 6 como indican sus reglas de personaje).<br>\
*Experiencia:<br>\
Victoria: 50 px<br>\
Empate: 20 px<br>\
Derrota: 10 px<br>\
*Dado que este Escenario sólo lo pueden disputar Caballeros de un alto honor, ningún Caballero puede parar ataques de Caballeros sin Armadura con su Armadura. En combates Múltiples huelga decir que aunque no apren ataques de Caballeros sin Armadura, si lo pueden hacer de otros rivales con Armadura.<br>\
*Para participar en este escenario es necesario no tener una sanción de injusticia por lo menos desde hace un año.";
Escenarios[201] = new Object();
Escenarios[201].nombre = "Coliseo del Olimpo";
Escenarios[201].descripcion = "*Todos los Combates en este Coliseo otorgan un gran prestigio y son seguidos por todos los seres del Universo. Los Combates Vencidos en este Torneo cuentan como dobles, las Eliminatorias triples y la final quintuple. Estos resultados se suman a los combates historicos ganados.";

module.exports.esc = Escenarios;