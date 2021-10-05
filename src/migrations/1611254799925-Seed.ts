import { MigrationInterface, QueryRunner } from 'typeorm';
import { DbEnums as db } from '@shared/enums/database.enums';
import { CultureEnums as culture } from '@shared/enums/culture.enums';

export class Seed1611254799925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(db.USER_TABLE)
      .values([
        {
          [db.USER_COLUMN_USERNAME]: 'kizo13',
          [db.USER_COLUMN_EMAIL]: 'kizo13@gmail.com',
          [db.USER_COLUMN_PASSWORD]:
            '$argon2i$v=19$m=16,t=2,p=1$SWJHdUFyV2RDNDV3bGFWMQ$yuyQ2/08XXVmfxi3vE8NCg',
          [db.USER_COLUMN_ISACTIVE]: true,
          [db.USER_COLUMN_AVATAR_ID]: null,
        },
        {
          [db.USER_COLUMN_USERNAME]: 'Duci',
          [db.USER_COLUMN_EMAIL]: 'regisztrator1980@gmail.com',
          [db.USER_COLUMN_PASSWORD]:
            '$argon2i$v=19$m=16,t=2,p=1$dnBuWW5NQVBmVm5sYU5QYg$8zaeYN0npnUARm6OwHMNoQ',
          [db.USER_COLUMN_ISACTIVE]: true,
          [db.USER_COLUMN_AVATAR_ID]: null,
        },
        {
          [db.USER_COLUMN_USERNAME]: 'Stu',
          [db.USER_COLUMN_EMAIL]: 'stupeti0918@gmail.com',
          [db.USER_COLUMN_PASSWORD]:
            '$argon2i$v=19$m=16,t=2,p=1$MmNIYmtmSWc1VzQ2ZWNWTw$vRXO9Ts9dIz9W//y/k/l9g',
          [db.USER_COLUMN_ISACTIVE]: true,
          [db.USER_COLUMN_AVATAR_ID]: null,
        },
      ])
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(db.NAME_TABLE)
      .values([
        {
          [db.NAME_COLUMN_CULTURE]: culture.aszisz,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Abram,Adalon,Adún,Aldar,Aldor,Andan,Andan,Andar,Andar,Angar,Arabal,Arbalon,Arbunne,Ardas,Ardo,Arfel,Astar,Bantos,Bargald,Bazald,Beren,Berin,Berin,Berin,Beris,Beris,Beris,Berland,Biggaros,Bohmer,Bragga,Brandir,Cadal,Calder,Calyd,Canal,Candal,Conal,Cralyou,Dagkul,Dakul,Dalmer,Damorra,Dawud,Dinas,Dirin,Dogarra,Doleman,Domorra,Dorc,Drungah,Durgath,Eman,Enat,Ennat,Eogan,Erdon,Errhas,Feirgus,Felip,Gahonar,Garbon,Gorodak,Gortham,Grengor,Gudar,Gundar,Gundor,Hakar,Hastar,Hastor,Hator,Hawud,Hiere,Hubar,Huvad,Ibad,Jorhim,Karrad,Kaspar,Katan,Katen,Kirthed,Korrano,Krolleres,Laggar,Lai,Larad,Lathan,Lathar,Lauran,Laurel,Leh,Lonthor,Lothar,Luther,Maberon,Madon,Mairus,Maladon,Malfeo,Mandon,Marun,Mavin,Menden,Merban,Mikar,Morel,Naizzur,Namolin,Narad,Nerad,Nerred,Nume,Numen,Obed,Odoned,Odren,Omak,Oren,Orun,Osatur,Oxel,Palyd,Panthal,Pelin,Radu,Ragor,Randal,Randal,Rastes,Ravud,Relengar,Relnand,Renthel,Rieger,Riger,Rilken,Rodenac,Rungonn,Rungor,Rupert,Ruplert,Ruppal,Ruvad,Ruwad,Sankhó,Seu,Siften,Sirman,Tagor,Tarron,Thrier,Tifud,Tileo,Timmran,Timon,Trevir,Ugnarr,Ulad,Ulad,Ulas,Uleb,Uled,Ulhas,Ulkad,Ulkas,Ulves,Urham,Urhan,Ustar,Valarian,Varud,Veniza,Veriz,Verrano,Verzzon,Voldasz,Volodasz,Vors,Yassed,Dalon,Russal,Adalam,Talmor,Karred,Erdal,Gander,Rubb,Tesador,Ares,Ulkar,Osthur,Endil,Modur,Arcor,Detter,Semyon,Nangor,Marlon,Desmord,Wincern,Merer,Myrnon,Talant,Lamar,Narard,Lexor,Alwir,Lonmer,Cran,Uron,Peytor,Dawyn,Jorge,Rynar,Etton,Kyron,Tamarn,Dorn,Galogar',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Aarian,Arnalla,Arzelna,Dina,Kerserta,Krestilla,Neliah,Rebeth,Seyena,Silia,Tirniella,Tiruna,Alegria,Eniessa,Medheb,Telinn,Rellia,Mirenn,Morrylla,Nierann,Salina,Telyah,Veniza,Miriol,Daina,Arana,Alleana,Silina,Tiala,Ermiell,Dinnala,Yrrilla,Reilla,Nileith,Arien,Rielle,Estillea,Arnalle,Zilla,Talina,Ascelle,Estelle,Kirella,Ellagra,Lyranna,Rialna,Arnalla,Tirana,Lissa,Kerseta,Mirana,Kristella,Rillana,Dina,Ofila,Kersera,Estella,Isellya,Ameril,Arienne,Elissa,Tessalia,Rosellane,Terinne,Casseyl,Serane,Riole,Miriam,Helera,Renha,Yarea,Dalmar,Merissa,Lanirla,Azzura',
          [db.NAME_COLUMN_SURNAMES]:
            "Alhalleo,Amalli,Arkhodron,Arknumoy,Cernalian,Cetiehir,Cralion,Delor,Dolan,Duenid,Duris,Ervil,Franigam,Franigan,Franigon,Girlda,Halkidhel,Hossad,Jandarvi,Karnelian,Kerilan,Korrak,Kosztasz,Loandar,Lombarad,Lorny,Maldon,Malkhasz,Marafos,Merval,Mordak,Nafrael,Noremman,Nuro,Oderan,Olterak,Otlokir,Raiybur,Raszisz,Rulpert,Terliang,Terragal,Tolcador,Tugoda,Urris,Ventobshi,Vernomaz,Yavar,Zaddar,Lorany,Boggar,Erveil,Durgins,Oveira,Aegenon,Franigan,Lyavelln,Otekar,Terkinior,Thaller,U'chak,Garonas,Gerkas,Dennor,Derios,Nostror,Moern,dy Loran",
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.crantai,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            "Arrushar,Aruwiar,Derru,Gredon,Grekathül,Hork,Mrodlar,N'tomal,Radhon,Rys,Saalar-Charem,Utul-Roweq,Werchas,Zeruk,Zhan,Baál-Kain,Assar,Puri,Zibár,Ebálchain,Shurru,Abhamon,Ubarru,Adúz,Haket,Baalzakár,Bak,Zibárt,Tésh,Nósé,Nékán,Hamalálél,Jerád,Hóchén,Setumelach,Máchel,Éno,Sém,Sadarpách,Hásel,Béer,Gepel,Ure,Gúsér,Ránoch,Ráchet,Idasu,Baragh-sur,Kishmarragis,Nadur-saa,Habrisu,Bar-elushu,Ubarra-Nár,Jár-Gada,Habru-Gar,Rabussu,Harim-shur,Kasu,Suru-Gár,Mishtamu,Nar-Usti,Naram-szín,Girasú,Tannusu,Eriszu,Nun-Dimmu-Saár,Purebi,Lam-Kubar,Sochúth,Benoth,Addra,Melech,Adad-Rímmon,Súr-Echran,Tammun,Amt-Nar,Hurrakín,Hak-Núm,Madúr-Ta,Hakhíshurr,Quarii,Teoqzatal,Petatzal,Harík-Anut,Atatzu,Narra-Szurbanóp-Bar,Gar Tam'ah-Dak,Abatas,Ham'as,Hanna-Tamurri-Apal,Szudu",
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Tanit,Aquiza,Shiquara,DiNi,Arrinni,Lehané,Sudari,Nua,Amra-Héa',
          [db.NAME_COLUMN_SURNAMES]:
            'Hröol,Thura,Moloch,Asshúr,Bakán,UpHak,Nárhan,Hrul,Thusa,Molosa,Ashur,Hrufes,Thempel',
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.dwoon,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Bert,Enwril,Gertand,Karek,Lauren,Orthan,Agissa,Dirrede,Drigga,Immher,Gard,Rundt,Ernwill,Ghaddir,Gehhdar,Giurtiss,Greit-irr,Raderr-hirr,Anguss-err,Terral-udd,Irmen-kar,Runden-hurr,Haggan,Hegar,Hagg-urra,Hidakir,Hrungan,Horgarn,Hur,Imrym,Kierry,Kurhenir,Makreder,Essath,Otrena,Orthenn,Mergunn,Sakrak,Sernak,Radrig,Ral,Rauhe,Silkann,Erdman,Zarnumm,Krimdul,Arkull,Syan,Sakrass,Umlar',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Dorynn,Agrennia,Riganna,Yerrena,Ryannia,Ryhal,Serdhah,Ernal-irre,Sir-enna,Essethe,Erinnda,Lidyrren,Nisnann,Erissya',
          [db.NAME_COLUMN_SURNAMES]:
            'Borthas,Haviehhse,Hrundlad,Hernal,Harnalden,Gernold,Ranndhal,Hratakssir,Keressir,Etten,Entharr,Kresse,Kirtesse,Dall,Naith,Melethh,Ranga,Doirnir,Deronhar,Renihhe,Vagrass,Trassenir',
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.dzsad,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            "Abbaj,Abbasz,Abdul,Abdzsan,Abira,Abu,Abul,Adasz,Ahmed,Ali,Ammen,Dabih,Danni,Dirzsah,Dzsabib,Fhaium,Galra,Grelhadzs,Harim,Hassab,Hassan,Hassilim,Hissal,Huddi,Hulab,Hussin,Husszab,Husszein,Igraim,Jaszef,Juszib,Kalif,Kara,Karan,Karned,Khaszil,Mihnad,Musza,Musztadzsin,Mu'wallat,Naim,Naszir,Rahim,Raszib,Reffeth,Rufat,Sulaf,Tibbal,Tunasz,Zerfail,Zubair,Zuftar,Abdin,Zafed,Haisszar,Anhul,Bábi,Deribe,Dilah,Dimak,Dzsalib,Dzselál,Fahyad,Fujjad,Hassab,Hussil,Huszejn,Ibhara,Ibn,Ibrahim,Jaszerf,Jaszif,Bahlit,Juszuf,Juszif,Juszaf,Jászibb,Khab,Khadal,Khálid,Kusta,Miszab,Miszad,Monhed,Muszrajiim,Náim,Nanin,Nászir,Fatih,Nejat,Szidi,Tilam,Yakum,Gázi,Raszim,Yakur,Yar,Hászír,Rászil,Rajíd,Kanír,Nadzsa,Ekbír,Habib,Dsemsyd,Somal,Garaba",
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Ardanna,Dzsana,Erzanda,Fatima,Ferenna,Hurrina,Illana,Kaiella,Karithha,Kiara,Krahhda,Lirdzsah,Mirzal,Reszlan,Tirzel,Zaida,Zsalra,Zsradda,Shahún,Fettia,Dierdzsan,Maia,Aila,Zuli,Laylath,Ezmela,Zulejka',
          [db.NAME_COLUMN_SURNAMES]:
            "Aganda,Akra,Arakal,Asszad,Avdal,Burzah,Chuto,Delag,Drezsdahag,Drezsderah,Dzsahankar,Dzsana,Dzsenne,Faggardi,Firdzsah,Gahhad,Gardas,Hada,Hagi,Hagmerk,Haib,Haszra,Hasszabi,Hasszar,Hirab,Hrigarda,Isza,Izim,Kaffar,Kalabi,Kalbha,Kaltha,Kerbe,Khad,Khadda,Khain,Kindi,Kitah,Kitah,Malik,Masztre,Missa,Niadal,Ratta,Round,Rumirá,Sadara,Shared,Tessin,Mirzá,Sahred,Bamashar,Mutah,Ebemir,Szifár,Birduni,Hirda,Herad,Ruszdzsara,Azzab,Hasszar,Muavija,Dzsiabna,Haszibi,Karabe,Dzsemblatt,Behr,Khadde,Ghadban,Kater,Thasse,Beithar,Duragg,Haszabi,Razi,Hirundi,Marem,Ifrisz,Hagi,Jazid,Beda,Harszada,Hirgand,Drezsdehag,Hiddam,Benni,Birgal,Nezafi,Hágig,Bahadur,Benib,Kebzsind,Yilmaz,Alape,Dhaffar,Dzseraga,Szilidár,Bezeth,Ul'Hafiz,Igrahil,al Garasan",
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.elf,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            "Adnyr,Akiyr,Alnar,Alrich,Annirrie,Arcor,Aurri,Aurri,Craian,En'Otun,Er'laas,Etlumas,Ettis,Falenn,Fandellon,Firon,Fliadais,Gorwell,Graion,Hariír,Hiarranin,Horianar,Horri,Ilather,Inathar,Karell,Kelliell,Khayess,Leyarr,Lielltas,Lirrial,Lordaen,Lussel,Ly'essal,Magon,Naidden,Neralon,Nylar,Odan,Omyrul,Oryenn,Radhon,Rannien,Rodtarr,Sendiel,Seniess,Sestain,Sestina,Shen,Siaen,Silhenar,Singar,Tarden,Teliadan,Thyeris,Urvinaul,Velias,Verlaen,Walen,Wechys,Wyddan,Yandra,Allrin,Lirrion,Asshiel,Berail,Círdan,Claennar,Eidhil,Enderil,Lerrien,Fraien,Feina,Haien,Illenayas,Hariniann,Hassianir,Hinnia,Allerys,Inmattiel,Leirren,Lyliss,Moliar,Morranna,Natos,Narmirenn,Nemathial,Nemmiel,Nierrol,Ulavell,Thulivell,Ly'viethnal,Eril'evel,Tirela'vol,Ol'ydille,Retharradas,Samildánach,Shim,Shioan,Shiole,Silhenar,Tagernie,Tallerien,Thulliel,Tellharel,Veela,Oberyn,Helidor,Telunn,Liaren,Seyran,Nayren,Haldarol,Ilreír,Nohural,Erragal,Velias,Nuroin,Hammar,Raellyn,Lúrien,Lyell,Larwen,Merval,Mírluen,Merenith,Shamyllas,Úmarienn,Meldan,Ashrian,Enua,Hillio,Eldarion,Mirleun,Ceirast,Neyra,Raellyn,Meldan,Innathar,Giramar,Arowend,Ildurath,Samyllon,Hardarion,Taihys,Alnaron,Irlideth,Leynaros,Ragmar,Alvunos,Meldanon,Elamerd,Giamar,Awales,Fylladniss",
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Alinnel,Aschona,Ellesal,Feina,Gersyell,Hinnia,Jannara,Kahiyah,Khaniya,Leirren,Lendessil,Lerren,Linthas,Lirroen,Lyell,Lyssel,Moranna,Rhienna,Seeassilly,Sellynnsa,Serrin,Shanell,Siena,Syra,Zyel,Enua,Finna,Hernianne,Illarnia,Naileth,Saluna,Lummina,Synna,Tyssa,Verrion,Mirven,Shínea',
          [db.NAME_COLUMN_SURNAMES]:
            "An'ortha,Turiynn,Dennirwen,Astumial,Shen'arion,Selinor,K'meakhan,Hillio,D'Anatel,Tylla,Siey,A'Cahisse,Lillevar,Lyellyss,Narnyel,Narnol,Merlyess,Ariavenn,Ariessal,Malvaureen,Melionar,Lu'illen,Zeidarel,Zina'Yll,Denetaar,Danniel,Luminell,Borallys,Beliossar,Tret,Limmenel,M'Aldvin",
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.enoszukei,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Jaramaku,Henso,Akeshi,Shoshi,Hidaro,Kibei,Togai,Sanetari,Kusoechi,Taroda,Kisinagu,Sasumi,Yiguro,Kogasashu,Keshue',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Yumi,Shami,Arika,Umiko,Ichuri,Harumi,Cunagi,Onimi,Jumi,Sami,Umikó,Icuri',
          [db.NAME_COLUMN_SURNAMES]:
            'Szatori,Matsumato,Ógei,Rogura,Vareda,Higayu,Damatsu,Agoroda,Jaeda,Atogore,Udasite,Setama,Gokkan,Uriga',
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.erv,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            "Acimon,Akrim,Altemor,Batal,Bran,Darun,Derat,Deraton,Diertan,Dorwoln,Drennan,Drenter,Edar,Elam,Elhatrar,Eligor,Enika,Eraman,Erat,Erreston,Estios,Ewernal,Fergahd,Gangwel,Impiuy,Kalmon,Kanavv'yas,Kildar,Krachul,Larol,Malor,Narim,Nichen,Nirkin,Noodel,Norlan,Pilie,Quirin,Radaconte,Radogin,Relvur,Rever,Rhennel,Ribal,Sahzar,Salogar,Saun,Senimoro,Shanil,Shirin,Tagrid,Trellak,Twyllin,Vilminus,Wellkhon,Wik,Wisgar,Wolkum,Ybon,Abbelas,Akroll,Andus,Arkat,Arnel,Ashtigon,Beramor,Brair,Carolath,Darkif,Deludus,Dereg,Doval,Enrich,Erian,Erimaron,Hermiun,Hinemus,Holoranis,Honorius,Iriogo,Isaggin,Ladorian,Lionar,Merac,Niles,Rachab,Rin,Roln,Ruridh,Saria,Semarna,Seunnar,Uon,Temmo,Kaar,Shiszein,Athedan,Sollin,Aldor,Takerede,Timul,Theulen,Trud,Twein,Willem,Iglat",
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Adranne,Brexatta,Dreynte,Estellin,Helenia,Hernala,Illintana,Issiltan,Janisse,Jefressa,Karina,Kerressa,Kersa,Kira,Kita,Kristella,Liranna,Lirian,Lirion,Loreana,Nilin,Reitha,Relfara,Rosanna,Tarillna,Tillarna,Yverta,Zelatha,Alimare,Amaltheassa,Erielle,Lyssa,Hella,Raetha,Sinil,Valyen,Vien',
          [db.NAME_COLUMN_SURNAMES]:
            "Ahran,Alver,Argus,Azadyr,Calendil,Corgassor,Cortina,Dain,Daitar,Darla,De'Fithar,DeMount,Deviar,DiKherrad,DiMalto,DiNeal,D'Retta,D'Vire,Er'atter,Erdedran,Gar,Garm,Garragin,Geor,Goril,Gwon,Helmar,Horha,Jahir,K'Arauf,Kirs,Kriles,Lamar,Lan,Laur,Lessur,Mac-Lier,Mook,Nakloss,Nazired,N'Dour,Niddor,O'Vorn,Rantell,R'enhellan,Sineas,Tanaer,Thinos,Umro,Urestal,Verittla,Vittadora,Vitterda,Yadah,Thymnal,Sazaddin,Viniel,Oiophastus,Celebhyrt,Ceird,Thilamar,Marra,Torlo,Monus,Hannemar,Tauwathar,Aliud,Doumnomen,Athor,Wermer,Gasadris,Cottera,Darren,Caldinbras,Orel,Argess,Ranaiss,Algeion,Darvan,Daray,Dervayl,Gandhul,Rawia,Tafear,Cossagor,Garidan,Fiarad,Dein,Dylar,Trawa,Dialaid,Gavarro,Nahuwa,Anrem,Acriss,Hannemar,Ka,Aralea,Darra,Werul,Berval",
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.goblin,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Graum,Rok,Gere,Grokk,Dhorr,Hrakk,Sanda,Pikás,Ugráncs,Batyus,Görbe,Kezes,Fogas,Kisfejű,Kancsal,Bokrász,Tépett,Vágott,Púplis',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Snege,Igre,Ulig,Briga,Amigvi,Tvigge,Medil,Saska,Trixini,Lilimisil,Lizzeli,Lizniz,Nekopi,Slininki,Izijne,Pilopé,Blizbel,Linti,Pigat',
          [db.NAME_COLUMN_SURNAMES]:
            'Hedrok,Ushuk,Ragnon,Agorg,Vodok,Amogra,Nmur,Orpen,Gae,Mulu,Targa,Tulok,Vakse,Voduk,Muke,Tulu',
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.gorviki,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Alasto,Amdus,Capollana,Capullo,Carry,Corar,Darnol,Farro,Fierrno,Gandare,Garrada,Joffer,Karana,Lagmar,Morico,Lerquio,Querik,Amarik,Naravik,Dermovik,Ordowick,Ramando,Ramelo,Raquo,Requallo,Siggat,Serrano,Terdatto,Tirqenno,Ornerta,Torni,Traques,Traquollo,Amlono,Cerrenolo,Ardotto,Eminor,Riternar,Quvirtan,Trentor,Alderni,Albera,Ancwrem,Arfielo,Chamarro,Chancana,Christobal,Cortorian,Dequator,Edmundo,Fernando,Gribbi,Guyro,Herran,Ilar,Labreo,Lancha,Lerois,Ligarr,Loalter,Lomaro,Maximo,Ombra,Pacharro,Perro,Potto,Quisso,Radovik,Ramando,Ramando,Ramando,Raquo,Ricardo,Rocha,Serpera,Teradin,Terda Radovik,Thaitar,Warnho,Warra,Warra Brasconne,Wierno,Amadeus,Faddis,Ante,Amalgarro,Gecha,Grandezzini,Lorenico,Coelo,Larta,Lerois,Malbarro,Rubastro,Barardo,Raddim,Fualgar,Raminno,Ran,Raquom,Roallan,Sciatello,Sicrrassi,Difensaro,Ercole,Triomfo,Tolomone,Werra,Brasconne,Vincenso,Girolamo,Gastone,Lozzerto,Contessina,Tessina,Salvestro,Damian,Mateo,Treconto,Romola',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Errala,Lyssa,Ophalla,Proterra,Vierre,Kalkira,Terkina,Allinza,Reqana,Qerina,Irriella,Treznoa,Aranna,Errilessa,Erresa,Rankarry,Illissa,Yverya,Verranna,Weronalla,Quertilla,Ophikell,Brontella,Ibrianna,Xortonia,Alraene,Alene,Elain,Riaranza,Darana',
          [db.NAME_COLUMN_SURNAMES]:
            'Barde,Bertalli,Briknolla,Gorcha,Gorra,Virrenka,Salanovik,Ichetti,Torra,Karront,Vermini,Vertelonni,Xammar,Haggara,Luma,Marick,Negri,Ferratto,Padana,Kyerri,Rabora,Rabuchini,Rubanichi,Raddim,Radovik,Brasconne,Cossorik,Gamarra,Grottasmond,LaCorb,Magecchi,Marre,Marses,Mercorti,Ramraquo,Terranti,Terreschi,Warvik,Werri,Abrozo,Abrardo,Acrado,Amanovik,Wickerrano,Arta,Codorra,Delavarel,Feroza,Rizonnel,Fualgar,Contorte,Girini,Fulminiore,Adora,Dardavik,Fracastello,Conte-corcoran,Baradello,Baradovik,Razavik,Galasavik,Lerond,Rithini,Rencheeti,Darasvagan,Sadymro,Wielor,Mezcarra,Ambiriento,Hulijantina,Ernallett,Barandor,Dernatto,Rintarro,Ernillo,Tronti,Jovadar,Gueridocchi,Laraqua,Ardovik',
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.ilanori,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Ahadis,Tier,Timul,Trin,Terman,Amadis,Anvar,Asitarr,Cadul,Bahabb,Chei,Cieran,Edvin,Erian,Etis,Geor,Giddas,Grengor,Guinnar,Khar,Laver,Naail,Nagor,Ran,Rik,Samil,Deir,Ancwrem,Cetah,Gerum,Siennan,Geron,Gronum,Tillnor,Tier,Tristana',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Narna,Ryell,Tristana,Erinnal,Rilla,Syllin,Kehiin,Tirey,Arniella,Lirell,Cilla,Rellonne,Velina',
          [db.NAME_COLUMN_SURNAMES]:
            "Anrem,Arul,Dalath,Duriff,Gorduin,Kryss,Lesquor,Syllin,O'Shillen,O'Shennon,O'Rien,E'Lieban,Pagat,Rusenor,Ru'rriant,Zahran,L'iellan,Akerran,Anril,Armetil,Certal,Gordelt,Grefad,LaTrien,Medir,Olofra,Trinn",
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.korg,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Nertumo,Mukka,Gungh,Wragk,Huzgd,Ramkerr,Ruhan,Runik,Gardinn,Sandarr,Erdell,Revnar,Kruon,Dalor,Gurnk,Ronkun,Tarrnit,Ubluk,Urghannu',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Himiltrud,Rothrud,Eadna,Gunnlid,Delperga,Filiruda,Uldigun',
          [db.NAME_COLUMN_SURNAMES]: null,
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.krani,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Ardaw,Bezak,Frittan,Lorquen,Luerren,Quentor,Quort,Rolden,Rolen,Sellav,Thuzdag,Traquor,Troques,Vyergas,Arius,Quator,Tera,Terrian,Thusor,Quartor,Thuzdag,Tressyr,Vyergas,Torquess,Raquior,Ereqal,Gorquor,Eraqirn,Riquen,Arqun,Cairus,Ianoss,Qeriass,Raddequor,Ardbogh,Burzab,Huqvar,Kathar,Quinther,Merthaq,Qardent,Atqurr,Raddaq,Saqerd,Sarduq,Turgah,Arquadt,Vuldaq,Uqummt,Khratas,Organ,Doqual,Rayevenn,Riquur,Sathor,Squvirra,Sionar,Syros',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Alyrria,Jadis,Lorena,Requa,Riquora,Vrena,Ela,Udunn,Kriqua,Rentha,Arquei,Errenta,Drobba,Tressya,Jadorr,Quersa,Tria,Terella,Rialla,Esserqua,Riquerina,Gria,Ernaqua,Growya,Khretta,Erquanna',
          [db.NAME_COLUMN_SURNAMES]:
            "Anebiss,Berequis,Ettor,Goudert,Le'Hiembriq,Lierto,Madaggr,Quethar,Rakdar,Ry'equas,Tiern,Troquen,Vequr,Wieggar,Ihalon,Gallanay,Thaug,Zaraquer,Liaqar,Shoclartar,Refrettar,Querattal,Oreqan,Traquen,Arebar,Lertaquer,Querdantal,Rollenques,Qesetrahh,Garthakka,Bincaida,Rion,Coquan,Equarr,Gerqual,Iamarath",
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.kyr_toroni,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            "Adhass,Alzerys,Amrad,Ashen,Atlar,Auzus,Awder,Aylen,Belaen,Cathyrass,Chadan,Chír,Cjenharno,Cjirneshar,Cyrjak-yd,Cyrranthyl,Cyrta,Daelor,Dakhir,Dartyr,Dian-Iv,Drayh,Eloriol,Errem,Ers,Erunnys,Eylorn,Farryn,Feirhag,Ferhuss,Fharids,Fhyllas,Ghedertir,Góhatar,Gorban,Gorban,Graendel,Harn,Hirrisis,Hunairrisz,Hyencih,Hyssalir,Iklasser,Ismeyr,Isshae,Issir,Jak,Jakirte,Jarkh,Kelonn,Khappra,Khiradd,Khymmer,Kilkh-En,Kwithriat,Lanakh,Lassyr,Lian,Lór,Maltha-Ri,Merremyth,Mirt,Morior,Mortullus,Myerrai,Nauryl-Re,Nold'erris,Nydaen,Oaklenn,Ochlammer,Odassyn,Othremmar,Presthyr,Qaed,Quassom,Quassor,Quelnomir,Quinnahir,Radal-Re,Raim,Raud,Rourys,Seur,Shallis,Shappor,Shaular,Shed,Shirido,Shirra,Shri,Siladyr,Sylladnis,Syrn,Tendarel,Thír,Thwil-An,Thylan-Re,Tremess,Trodar,Tror,Tyrin-Sha,Uthar,Uthessar,Vaechassir,Veichassur,Vinidius,Yarom,Ylor,Zaphyrir,Akragil,Amnet,Anghar,Cynthar,Cyrrian,Cyrjan,Drayen,Drayh,Erressir,Gaonal,Garun,Jakirte,Khirrad,Leuv,Morik,Nobun,Organ,Parhan,Pelin,Ran,Rashan,Rounn,Ryanass,Saggaras,Sarl,Reylar,Sittas,Treb,Vyrn,Yperth,Zabar,Yncharr,Yrn'hart,Arnac'hyrt,Yrdass,Toryenn,Tras'hall,Ryn'chur,Alrey,Alzerys,Amet,Aran,Armador,Dogan,Arsadhyr,Arsus,Aruth,Astrittio,Ava,Baldre,Arleth,Atlar,Awder,Dian,Farrya,Gathlak,Giach,Harn,Hial,Hiran,Jaering,Jahrh,khorossh,Kilkh,Klad,Mechil,Raginal,Raigh,Raim,Ryen,Shri,Sigur,Suetho,Tarrhin,Tiannian,Tyrin,Vidiorta,Bragg,Cham,Cornawin,Daryth,Dathra,Ein,Enraien,Errachil,Fried,Zinn,Góhatar,Thaddeo,Hamryss,Harratrigthann,Harriann,Harrumsass,Harsim,Harsyr,Hasyness,Dhalam,Heiken,Hirn,Iakran,Ipsus,Jadl,Jahrn,Achybar,Kastor,Kylwog,Lakran,Lan-Ro,Mirhaniss,Melchyss,Neakha,Neirith,Ceriak,Omron,Orfemun,Hokmet,Dhuvir,Raonna,Riel,Rourys,Ryordan,Shirjan,Shirr,Tachrys,Trabbyír,Trommelys,Ussius,Yle,Hiylas,Cyrjan,Hyschyr,Ubalbaar,Raud,Tyrzoc,Baraun,Cerran,Yeral,Cyuss,Cjanheran,Ceimhass,Mathaljys,Ieltharr,Cra-Anq,Nabur,Ayres,Atler,Farryn,Oklynn,Troddar,Arlat,Harn,Torak,Dyalen,Higurr,Ralloq,Ishere,Chaddan,Ers,Myriar,Hissis,Jiljak,Aiul,Assahur,Oberas,Cjahs,Khardassul,Melker,Vhyoken,Ukhyorr,Lochus,Kijen,Fharrahs,Cyssur,Impernis,Tagrat",
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            "Alena,Dass,Iriol,Iwien,Kaissa,Kha,Myshia,Reena,Sinit,Syddal,Theiria,Allina,Hania,Lionna,Lyssara,Velina,Illyr,Zauka,Zy'rtha,Cyerrana,Rinc'hyel,Ciry'ana,Alrynne,Ry'heill,Khayssila,Iwien,Jadzia,Jarnyn,Leirra,Planitia,Rialee,Talissa,Dairy,Vilar,Gaota,Gwein,Herrenne,Hyressa,Queressa,Hawane,Karylia,Illyr,Moreni,Penerria,Pirnagna,Liathan,Syris,Tekidia,Udhya,Yaris,Illyen,Leirna,Lyonna,Amella,Arialla,Mía,Achelin,Ajmír,Hvyenn,Chassia",
          [db.NAME_COLUMN_SURNAMES]:
            "Alariach,Artemora,Awad,Calendil,Ceriak,Chyassan,Chyrran,Cornass,Cthhassyr,Cyr,Dailad,Darlath,Ecyhín,Entar,Errachil,Hanor,Hion,Huiass,Hyassur,Hyathar,Ianarak,Igron,Imhallas,Jywathor,Klad,Lur,Lyalmur,Mechil,Myorath,Myrrys,Naeden,Nuedwar,Oberian,Roddel,Rua'Twy,Shrigar,Sienel,Synawin,Terrn,Tylen,Wennarion,Zarassyr,Agron,Aldara,Ayres,Cerrelys,Doar,Gangwel,Griener,Igran,Jak,Keilor,Leeth,Lyechard,Ley'llentar,Mallndor,Mantlin,Tillharr,Mesh,Muarad,Odlan,Oveira,Rador,Rion,Rukh,Shirrihiun,Thyen,Zevir,Reh'nall,Karryss,Kerdalyard,Amrad,Ardel,Armador,Azmiar,Cyrjak,Dael,Ceriak,Cjendago,Dhuvir,Dogan,Ers,Fychonnen,Zerdal,Hokmet,Huiass,Igron,Jhazirt,Kryel,Lan,Luyr,Lylmer,Marseyss,Trang,Nalden,Sab'dagharn,Shirgar,Sibassin,Sienel,Tiomus,Heisraal,Shakkas,Drychass,Dayaell,Dranach,Cassyan,Meikhar,Hryssus,Khaig,Salavin,Bhalar,Ehhar,Endorel,Tagren,Haular,Khylar,Quessira,Brei,Mantor,Ydvaril,Hessar,Deligha,Manare,Ordahír,Garun,Trabbyír,Doncass,Shankar,Lasquar,Liennar,Tardassol,Talera,Ranathaka,Trang,Kryllerd,Twaalreth,Achybar,Achar,Cyrras,Cthassyr,Chrastyn,Cyrgaan,Weador,Zephyl,Hyrercrys,Míchiel,Cjenhuran,Emars,Ashion,Demydiss,Asghatar,Q'uaan",
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.nomad,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Bar-has,Chirag,Detan,Draq,Khasnagül,Kerakün,Düngahl,Iboj,Lojren,Kartas,Teljyss,Kirgis,Kitajku,Kerjadarn,Küjhandar,Kitan-ken,Mergu,Mujihhe,Kerdal,Kürtünn,Mergyan,Ajhangar,Krünthel,Züthal,Normün,Nan-Shu,Ner-vha,Shun-kay,Kür-len,Nima,Nirmül,Ondel-y,Shikan,Serakan,Bulon,Küjnel,Rayan,Tünryd,Ryagan,Shin-ku,Talibeg,Tuvas,Uar,Csogaj,Ongaj,Ülügröj,Sergudaj,Nisihaj,Ilmun,Mogaraj,Baldu,Ahalcsi,Cseme,Jahangir',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Altin,Arik,Hélün,Börti,Tári,Ene,Nisan,Nári,Musmi,Akcsér,Keje,Amalin',
          [db.NAME_COLUMN_SURNAMES]:
            'Asathi,Pradha,Katahag,Tegin,Kajlan,Erihu,Fijangu,Vundar,Ogroj,Hondora,Dekdönge,Nakcsu,Iremle',
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.ork,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            "Adúgr,Agthar,Badr,Ujgarr,Damer,Draugroth,Gars,Harkh,Nardhuur,Ojorbathaj,Urgh,Urgahan,Uruwartha,Wram,Harmun,Armak,Ramk,Grawen,Bjuwadr,Bogar,Bowdr,Brakhturd,Brukh,Draal,Gadrarg,Garrokhar,Gaur,Gjoradr,Grodr,Grok,Hagrar,Khawir,Othrahil,Rabaj,Robw,Ughj,Wagra,Wougror,Ykhdan,Algwal,Terrt,Aglúg,Anganhar,Angmar,Badrid,Baghur,Jakhúl,Birak,Brogh,Berragh,Gorath,Grotk,Darg,Damghur,Drran,Barrn,Gar,Bokkar,Bolgha,Dhagg,Ghazga,Roggr,Ghardd,Borrem,Ghord,Ujorbathaj,Ujharhand,Urganhaj,Gnau,Gragash,Grauk,Uruwotha,Hralmer,Hram,Grrak,Hurag,Dhaur,Mothang,Vordak,Naggaer,Draughat,Ogak,Buraj,Ontharr,Logtor,Grudd,Ubrog,Ukkan,Gasad,Ghord,Grauk,Kurash,Mothg,Ngaur,Sadasg,Ukkar,Ukkon,Zurhagg,Raggar,Rukka,Harkh,Urgh,Ulúkk,Uro,Draga,Ush'chuk,Rangnon,Azgrog,Vordokk,Gaagran",
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Amougra,Nmur,Oro,Gae,Gregurira,Senkuma,Folus,Kirija,Umauja,Sudes,Zenadru,Kurikagra,Argara,Gról,Skáta,Haugurhi,Gua,Vegga,Bagruja,Bronga',
          [db.NAME_COLUMN_SURNAMES]: null,
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.pyarroni,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Aalit,Brager,Dervon,Immanas,Loat,Luer,Serradin,Taare,Vorhyn,Airun,Akroll,Alyr,Ambar,Arman,Aruvior,Assero,Astum,Azed,Cadvatello,Cyon,Daien,Damaso,Damol,Deludus,Dorham,Doval,Elorand,Eloriol,Erik,Eris,Ferous,Gerum,Geyrr,Hadrag,Hangar,Igrain,Itiss,Kylowog,Lakhon,Laktano,Marten,Molluh,Moran,Moress,Mthano,Nogren,Olaf,Peregrum,Rafiel,Randlan,Rielon,Ryaren,Rys,Selmo,Selquin,Shenarion,Sirak,Sonor,Talman,Tich,Tret,Ubar,Vinidius,Vyan,Wanton,Yerlak,Fertagan,Kelor,Rittaser,Herdeng,Yvellas,Argert,Dertong,Doreth,Alderan,Alex,Alonssi,Anthiora,Arcus,Ardae,Artemius,Horna,Arwell,Astareia,Cadata,Aggia,Darres,Dorcas,Darwin,Eloric,Enas,Enirch,Enue,Gerdewin,Gortheming,Gvendhor,Haygar,Haliodor,Hequalat,Hieryas,Hifram,Idelli,Imer,Ishanna,Jarin,Keyreen,Kharrin,Krontos,Ellimer,Elimar,Melionta,Mirabis,Megalon,Ellimar,Meironta,Mirhaniss,Narc,Boad,Nevyll,Norgil,Ordaric,Orim,Quirin,Regnore,Rlyehen,Roxund,Sellionoy,Sevur,Shylak,Silidar,Simoneus,Sirthan,Skrih,Sorquas,Tamrad,Thorel,Tiglat,Ulmar,Erova,Kaleb,Savrian,Ralf,Mozber,Elek,Kerrigan,Alarak,Tassadar,Ubeg,Agrukal,Oleg,Bruno,Otto,Moren,Eddy,Agert,Jochaim,Herbert',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Chiara,Lyssa,Nida,Alimare,Almeir,Anhia,Aralea,Ariann,Acyra,Ascyra,Athria,Darla,Erika,Lamia,Lianella,Lilieth,Loren,Nimara,Niorah,Salina,Sinil,Sinit,Stella,Sybell,Syerrana,Tekidia,Tiane,Vreelah,Vylliris,Lora,Aarie,Gaude,Inaiz,Lisira,Sithlana,Mildred,Nadyn,Doren',
          [db.NAME_COLUMN_SURNAMES]:
            "Hanthern,Hersos,Maras,Messa,This,Wermer,Angus,Arkhon,Arsenor,Artemor,Arvioni,C'Demorante,Caddigan,Casra,Chegor,Cormana,D'Aquilor,Darlath,Dialaid,Flabront,Gaiden,Gennarin,Haldax,Heliodor,Hudon,Jeir,Kitrichi,Kirkean,Lauren,Lefydd,Letab,Lyavelln,Maganor,Maldon,Marem,Meikhar,Mons,Nobren,Orca,Orel,Pherkad,Praedarmon,Quann,Quar,Quirin,Reval,Riquill,Sazaddin,Seltabar,Shankar,Simnum,Tafner,Tamar,Tauwathar,Torrane,Unamono,Viniel,Wolgar,D'mertiel,Cariac,Magnus,Akka,Athranis,Mideas,Berentyr,Hargard,Torrane,Pherennian,Adex,Sphactor,Calendil,Alastor,Saholem,Entionnar,Ahgven,Ermeni,Nery'da,Rognum,Ulyess,Brish,Haraunak,Wyln-Taris,Amerrinn,Merres,Ilochar,Essandra,Dormin,Eldon,Eberini,Aryos,Racen,Dharr,Fielars,Licargon,Hamanneri,Sadhlim,Awatell,Rugerano,Ramurro,Harabullas,Davastor,Viodo,Monparasan,Smiskun,Archeos,Uthryas,Enral,Gebit,Raynor,Gant,Annar,dya'Nerva,Valantis,Malor,Garvis,Guzman,Ohjbert,Denosa,Lunnam,Maloy,Guttaki,Morron,Monro,Maloris,Mogg",
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.shadoni,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Celos,Bracelosz,Cadrass,Cannaro,Chaterri,Decadrio,Ectebrachios,Ectebreratos,Estarion,Hirtor,Kharmmó,Rafiel,Acapella,Aldus,Almor,Clash,Eromo,Geddon,Harass,Iakran,Kronus,Nathan,Peral,Rudrig,Saddad,Theun,Albanus,Aleggheri,Arheggil,Arester,Amfortas,Anghiari,Armangold,Artemil,Avrano,Balthus,Barlo,Braban,Carma,Celestius,Dedephoson,Delcardo,Evendil,Folcred,Gaido,Garsus,Jonat,Arfom,Selnitus,Crusadio,Veldarios,Adunarden,Beralduin,Gallaphain,Lukanios,Sanacio,Mahaiz,Catulla,Bethumabel,Odone,Daraul,Monor,Beralduin,Beatus,Asturion,Bene,Lanzelotto,Calicus,Orosius,Kalokyrios,Sebazios,Thylatestar,Marzio,Deodatus,Alasandril,Serdanil,Alierrdal,Lykarriol,Vitorio,Veliante,Calaiz,Dario,Derrano,Menor,Sil,Tannagel,Niessios,Girolamus,Rianaldo,Ruber,Senecio,Seratori,Serrato,Deradal,Ulprus,Raimón,Fornaus,Belletor,Branquin,Vestesius,Kimor,Kaynar,Aiszhur,Cedoric,Perriten,Blatanír,Dantik,Agaphin,Traichass,Venius,Viesuvo,Vitris,Damyol,Arkad',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Brenna,Issaella,Arielle,Ariana,Eriel,Lorraine,Noel,Serena,Sigil,Yarria,Luana,Linora,Semalla,Madia,Ilnora,Hilva,Rascilla,Esterción,Kaynara,Ulwina,Tirabell,Seredina,Kalemila,Artice',
          [db.NAME_COLUMN_SURNAMES]:
            'Amessi,Blachias,Larme,Antara,Arco,Celestius,Cormana,Deligha,Draqain,Erhan,Garmacor,Mabrem,Magra,Montargis,Beatus,Satronis,Monacero,Vio,Corma,Gioconvichini,Mosso,Meressa,Gerazzo,Cassadril,Cathraz,Darco,Erascill,Galladran,Cressi,Gardario,Sicario,Pentangelin,Cerra,Baldusario,Balthus,Bossias,Borromeo,Río,Rellan,Caldurel,Gado,Ceracon,Scaddano,Nubilio,Moelwis,Omeros,Raelto,Dashan,Surdor,Kasturis',
        },
        {
          [db.NAME_COLUMN_CULTURE]: culture.torpe,
          [db.NAME_COLUMN_MALE_FIRSTNAMES]:
            'Anda,Gain,Gáginn,Geinos,Grádi,Graim,Hronin,Kóba,Berr,Kahir,Loopa,Toomer,Miigan,Magran,Mimn,Morri,Merran,Oggi,Therost,Yew,Tard,Rudg,Borf,Tarf,Fard,Adnak,Akhar,Darf,Gánin,Gluegg,Tyronn,Sai,Kobba,Ramogg,Rothón,Dún,Farnass,Fars,Gáin,Geinos,Grábi,Gráid,Sakki,Adgal,Arda,Dári,Dabbir,Dún,Dabbib,Dagga,Dert,Durn,Durin,Fars,Gór,Gerd,Dorth,Dorf,Traain,Morri,Sugro,Migan,Nelhac,Falgorn,Azgad',
          [db.NAME_COLUMN_FEMALE_FIRSTNAMES]:
            'Zuer,Zian,Melf,Rian,Arroc,Sure,Sear,Borak,Ardta,Haren,Luend,Saddar,Orsan,Radda,Eraffa,Sarrag,Surring',
          [db.NAME_COLUMN_SURNAMES]:
            'Dorf,Fród,Harsi,Lok,Nal,Nelhac,Sóg,Sarrad,Tardd,Traain,Terrin,Darras,Ymed,Azul,Adgal,Torrof,Gor,For,Thardi,Ranad,Krond,Ballid',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.connection.query(`TRUNCATE ${db.USER_TABLE}`);
    queryRunner.connection.query(`TRUNCATE ${db.NAME_TABLE}`);
  }
}
