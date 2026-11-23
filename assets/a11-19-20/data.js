export const persons=['Yo','Tú','Él / ella / usted','Nosotros / nosotras','Vosotros / vosotras','Ellos / ellas / ustedes'];
export const forms={ser:['soy','eres','es','somos','sois','son'],estar:['estoy','estás','está','estamos','estáis','están'],tener:['tengo','tienes','tiene','tenemos','tenéis','tienen']};
// Source: user-supplied A1.1 IDA (19+20) lesson PDF, pp. 2–11.
export const serCategories=[
{t:'01 · Presentación – Descripción',sub:'Tanıtım / tasvir',note:'Kimlik ve bir kişinin genel niteliğini anlatır.',pairs:[
['Yo soy David.','Ben David’im.'],['Eres muy guapa.','Çok güzelsin.'],['Ella es simpática.','O cana yakın biridir.']]},
{t:'02 · Origen – Nacionalidad',sub:'Köken / milliyet',pairs:[
['Nosotros somos de Salamanca.','Biz Salamancalıyız.'],['Soy de Esmirna.','Ben İzmirliyim.'],['Soy de Turquía.','Ben Türkiye’denim.'],['İhsan es turco.','İhsan Türktür.'],['Cansu y Merve son turcas.','Cansu ve Merve Türktür.']]},
{t:'03 · Profesión',sub:'Meslek',pairs:[['Mi padre es abogado.','Babam avukattır.'],['Mi madre es abogada.','Annem avukattır.'],['Yo soy profesora de español.','Ben İspanyolca öğretmeniyim.'],['¿Cuál es tu profesión?','Mesleğin nedir?']]},
{t:'04 · Ideología – Religión',sub:'İdeoloji / din',pairs:[['Mis primos son musulmanes.','Kuzenlerim Müslümandır.'],['Vosotros sois anarquistas.','Siz anarşistsiniz.']]},
{t:'05 · Material',sub:'Malzeme',pairs:[['La mesa es de madera.','Masa ahşaptır.'],['El anillo es de oro.','Yüzük altındır.']]},
{t:'06 · Posesión – Relación',sub:'Aidiyet / ilişki',pairs:[['El libro es de Alejandra.','Kitap Alejandra’nındır.'],['Ella es mi hermana.','O benim kız kardeşimdir.'],['Ellos son mis padres.','Onlar benim anne ve babamdır.'],['Este coche es mío.','Bu araba benimkidir.'],['Esta casa es mía.','Bu ev benimkidir.'],['Estos coches son míos.','Bu arabalar benimkilerdir.'],['Estas casas son mías.','Bu evler benimkilerdir.']]},
{t:'07 · La hora y la fecha',sub:'Saat ve tarih',pairs:[['¿Qué hora es?','Saat kaç?'],['Es la una.','Saat bir.'],['Es la una y media.','Saat bir buçuk.'],['Son las dos en punto.','Saat tam iki.'],['Son las tres y cuarto.','Saat üçü çeyrek geçiyor.'],['Son las tres menos cuarto.','Saat üçe çeyrek var.'],['Hoy es quince de agosto.','Bugün 15 Ağustos.'],['Hoy es lunes.','Bugün pazartesi.'],['Hoy es el Día de las Madres.','Bugün Anneler Günü.'],['Mi cumpleaños es el trece de noviembre.','Doğum günüm 13 Kasım.']]},
{t:'08 · El precio',sub:'Fiyat',pairs:[['¿Cuánto es el libro?','Kitap ne kadar?'],['El libro es diez euros.','Kitap on avro.']]}
];
export const estarCategories=[
{t:'01 · Estado de ánimo',sub:'Ruh hâli',pairs:[['Yo estoy triste.','Ben üzgünüm.'],['Tú estás cansado.','Sen yorgunsun.'],['Nosotras estamos enfermas.','Biz hastayız.'],['¿Vosotros estáis contentos?','Siz mutlu musunuz?']]},
{t:'02 · El resultado de un proceso anterior',sub:'Bir olayın veya sürecin sonucu',pairs:[['La puerta está cerrada.','Kapı kapalı.'],['El jarrón está roto.','Vazo kırık.']]},
{t:'03 · El estado civil',sub:'Medeni durum',note:'Ders notunda bekâr, boşanmış, evli ve sözlü ESTAR ile; dul örneği ise «soy viudo» olarak verilir.',pairs:[['Estoy soltera.','Bekârım (kadın).'],['Estás divorciado.','Boşanmışsın.'],['Estamos casados.','Biz evliyiz.'],['Estoy prometido.','Sözlüyüm (erkek).'],['Soy viudo.','Dulum (erkek).']]},
{t:'04 · Estar + gerundio',sub:'Şu anda süren eylem',note:'📌 Bu yapıyı daha sonra ayrıntılı öğreneceğiz.',pairs:[['Laura está escribiendo.','Laura yazı yazıyor.'],['Vosotros estáis comiendo pizza.','Siz pizza yiyorsunuz.'],['Estoy hablando con las chicas.','Kızlarla konuşuyorum.']]},
{t:'05 · La profesión temporal',sub:'Dönemsel / geçici meslek',note:'SER ile kalıcı mesleği, «estar de» ile o anda yapılan farklı işi karşılaştır.',pairs:[['Yo soy profesora, pero ahora estoy de taxista.','Öğretmenim fakat şu an taksicilik yapıyorum.'],['Sonia es abogada, pero ahora está de cajera en un supermercado.','Sonia avukat ama şu an süpermarkette kasiyerlik yapıyor.'],['Carlos es ingeniero, pero ahora está de camarero en un restaurante.','Carlos mühendis ama şu an restoranda garsonluk yapıyor.']]},
{t:'06 · Situación – Localización – Compañía',sub:'Durum / konum / birlikte bulunma',pairs:[['Estamos en clase de español.','İspanyolca dersindeyiz.'],['Madrid está en el centro de España.','Madrid İspanya’nın merkezindedir.'],['Estoy con mis hermanos.','Kardeşlerimle birlikteyim.'],['¿Dónde está mi teléfono?','Telefonum nerede?'],['Estás en la habitación.','Sen odadasın.'],['¿Estás con tu hijo?','Çocuğunla beraber misin?'],['Estoy con mis amigos en un café.','Arkadaşlarımla bir kafedeyim.']]},
{t:'07 · La fecha – La estación del año',sub:'Tarih ve mevsimler',note:'ESTAMOS A + gün/tarih ve ESTAMOS EN + mevsim. Saat söylemek için SER kullanılır.',pairs:[['Estamos a domingo.','Pazar günündeyiz.'],['Estamos a uno de abril.','1 Nisandayız.'],['Estamos en primavera.','İlkbahardayız.'],['¿A qué día estamos hoy?','Bugün hangi gündeyiz?']]},
{t:'08 · El precio con la preposición «a»',sub:'A edatı ile fiyat',pairs:[['¿A cuánto están las manzanas?','Elmalar kaça?'],['Están a dos euros el kilo.','Kilosu iki avro.']]}
];
export const tenerCategories=[
{t:'01 · Tener + isim',sub:'Sahiplik / ilişki',pairs:[['Tengo una casa en la playa.','Plajda bir evim var.'],['Antonio tiene el pelo negro.','Antonio’nun saçı siyah.'],['Tenemos una familia muy grande.','Çok büyük bir ailemiz var.']]},
{t:'02 · Tener + sayı + años',sub:'Yaş söylemek',pairs:[['Mi padre tiene sesenta años.','Babam altmış yaşında.'],['El bebé tiene seis meses.','Bebek altı aylık.'],['¿Cuántos años tienes?','Kaç yaşındasın?']]},
{t:'03 · Tener que + infinitivo',sub:'Kişisel zorunluluk',note:'TENER kişiye göre çekimlenir. HAY QUE ise genel zorunluluktur.',pairs:[['Tengo que estudiar.','Ders çalışmam gerekiyor.'],['Tienes que escribir.','Yazman gerekiyor.'],['Tenemos que practicar más.','Daha fazla pratik yapmamız gerekiyor.']]},
{t:'04 · Tener + fiziksel hisler',sub:'Ateş, ağrı, öksürük, susuzluk, açlık, sıcaklama, üşüme ve uyku hâli',note:'tener fiebre · tener dolor de · tener tos · tener sed · tener hambre · tener calor · tener frío · tener sueño',pairs:[['El bebé tiene fiebre.','Bebeğin ateşi var.'],['Tengo dolor de estómago.','Midem ağrıyor.'],['Mi hijo tiene tos.','Oğlum öksürüyor.'],['¿Tienes sed?','Susadın mı?'],['¡Tengo hambre!','Acıktım!'],['No tenemos calor.','Sıcaklamıyoruz.'],['¿Tienes frío?','Üşüyor musun?'],['No tengo sueño.','Uykum yok.']]}
];
export const adjectives=[
['aburrido','Sıkıcı olmak','Sıkılmak','La clase es aburrida.','El alumno está aburrido.'],
['alegre','Mutlu, neşeli biri olmak','Şu an mutlu olmak','María es alegre.','María está alegre hoy.'],
['alto','Uzun boylu olmak','Yaşına göre uzun olmak','El chico es alto.','El chico está alto para su edad.'],
['blanco','Beyaz tenli / beyaz olmak','Solgun görünmek','La pared es blanca.','Ella está blanca.'],
['bueno','İyi biri olmak','Çekici / iyi görünmek','Él es bueno.','Él está bueno.'],
['cansado','Yorucu olmak','Yorulmak','El trabajo es cansado.','Estoy cansado.'],
['ciego','Görme engelli olmak','Anlık olarak görememek / fark etmemek','Él es ciego.','Con esta luz, estoy ciego.'],
['despierto','Açıkgöz, kurnaz olmak','Uyanık olmak','El niño es despierto.','El niño está despierto.'],
['divertido','Eğlenceli olmak','Eğleniyor olmak','Él es divertido.','La niña está divertida.'],
['guapo','Yakışıklı / güzel olmak','O an güzel görünmek','Él es guapo.','Hoy está guapo.'],
['listo','Zeki olmak','Hazır olmak','La niña es lista.','La niña está lista.'],
['orgulloso','Kibirli olmak','Gurur duymak','Él es orgulloso.','Él está orgulloso de su hija.'],
['perezoso','Tembel olmak','Anlık olarak üşenmek','El chico es perezoso.','Hoy está perezoso.'],
['rico','Zengin olmak','Çok lezzetli olmak','Él es rico.','El pastel está rico.'],
['rojo','Kırmızı renkte olmak','Kızarmak, utanmak','El coche es rojo.','Ella está roja.'],
['verde','Yeşil renkte olmak','Ham, olgunlaşmamış olmak','El coche es verde.','La manzana está verde.'],
['viejo','Yaşlı olmak','Eskimiş olmak','Mi abuelo es viejo.','El móvil está viejo.']
];
