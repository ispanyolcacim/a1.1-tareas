// In-lesson A1.1 clickable lexicon: Turkish, English, lemma, morphological description.
const raw=String.raw`
viuda|eşi vefat etmiş kadın; dul|widow|viudo|isim/sıfat dişil
luis|Luis (özel ad)|Luis|Luis|özel isim

antonio|Antonio|Antonio|Antonio|özel isim
casas|evler|houses|casa|isim çoğul
chico|erkek çocuk|boy|chico|isim
presentación|tanıtım|introduction|presentación|isim
descripción|tasvir|description|descripción|isim
origen|köken|origin|origen|isim
nacionalidad|milliyet|nationality|nacionalidad|isim
ideología|ideoloji|ideology|ideología|isim
religión|din|religion|religión|isim
material|malzeme|material|material|isim
posesión|sahiplik|possession|posesión|isim
relación|ilişki|relationship|relación|isim
estado|durum|state|estado|isim
ánimo|ruh hâli|mood|ánimo|isim
resultado|sonuç|result|resultado|isim
proceso|süreç|process|proceso|isim
anterior|önceki|previous|anterior|sıfat
civil|medeni|civil|civil|sıfat
gerundio|ulaç|gerund|gerundio|dilbilgisi
temporal|geçici|temporary|temporal|sıfat
situación|durum|situation|situación|isim
localización|konum|location|localización|isim
compañía|birlikte bulunma|company|compañía|isim
fecha|tarih|date|fecha|isim
estación|mevsim|season|estación|isim
año|yıl|year|año|isim
precio|fiyat|price|precio|isim
preposición|edat|preposition|preposición|isim
infinitivo|mastar|infinitive|infinitivo|dilbilgisi
soy|ben ...im|I am|ser|presente yo
eres|sen ...sin|you are|ser|presente tú
es|...dır / ...dir|is|ser|presente 3. tekil
somos|biz ...iz|we are|ser|presente nosotros
sois|siz ...siniz|you are|ser|presente vosotros
son|...dırlar|are|ser|presente ellos
estoy|... durumdayım|I am|estar|presente yo
estás|... durumdasın|you are|estar|presente tú
está|... durumda, ...de|is|estar|presente 3. tekil
estamos|... durumdayız|we are|estar|presente nosotros
estáis|... durumdasınız|you are|estar|presente vosotros
están|... durumdalar|are|estar|presente ellos
tengo|benim var|I have|tener|presente yo
tienes|senin var|you have|tener|presente tú
tiene|onun var|has|tener|presente 3. tekil
tenemos|bizim var|we have|tener|presente nosotros
tenéis|sizin var|you have|tener|presente vosotros
tienen|onların var|they have|tener|presente ellos
ser|olmak, kimlik/özellik|to be|ser|mastar
estar|olmak, durum/konum|to be|estar|mastar
tener|sahip olmak|to have|tener|mastar
yo|ben|I|yo|zamir
tú|sen|you|tú|zamir
él|o erkek|he|él|zamir
ella|o kadın|she|ella|zamir
usted|siz resmî|you formal|usted|zamir
nosotros|biz|we|nosotros|zamir
nosotras|biz kadınlar|we|nosotras|zamir
vosotros|sizler|you all|vosotros|zamir
vosotras|sizler kadınlar|you all|vosotras|zamir
ellos|onlar|they|ellos|zamir
ellas|onlar kadınlar|they|ellas|zamir
ustedes|sizler|you all|ustedes|zamir
el|belirli artikel|the|el|artikel
la|belirli artikel|the|la|artikel
los|belirli artikel çoğul|the|el|artikel
las|belirli artikel çoğul|the|la|artikel
un|bir|a|un|artikel
una|bir|a|una|artikel
de|–den / –in|of / from|de|edat
en|–de / –da|in / at|en|edat
a|–e / –a; fiyatla|to / at|a|edat
con|ile|with|con|edat
por|boyunca|through / along|por|edat
para|için|for|para|edat
y|ve|and|y|bağlaç
pero|ama|but|pero|bağlaç
que|ki / gerektiği|that|que|bağlaç
no|hayır / değil|no / not|no|olumsuzluk
mi|benim|my|mi|iyelik
mis|benim çoğul|my|mi|iyelik
tu|senin|your|tu|iyelik
su|onun|his / her|su|iyelik
mío|benimki|mine|mío|iyelik
mía|benimki dişil|mine|mío|iyelik
míos|benimkiler|mine|mío|iyelik
mías|benimkiler|mine|mío|iyelik
este|bu|this|este|işaret sıfatı
esta|bu|this|este|işaret sıfatı
estos|bunlar|these|este|işaret sıfatı
estas|bunlar|these|este|işaret sıfatı
muy|çok|very|muy|zarf
más|daha fazla|more|más|zarf
ahora|şimdi|now|ahora|zarf
hoy|bugün|today|hoy|zarf
qué|ne|what|qué|soru sözcüğü
cuál|hangisi|which|cuál|soru sözcüğü
cuánto|ne kadar|how much|cuánto|soru sözcüğü
cuántos|kaç|how many|cuánto|soru sözcüğü
dónde|nerede|where|dónde|soru sözcüğü
trece|on üç|thirteen|trece|sayı
quince|on beş|fifteen|quince|sayı
sesenta|altmış|sixty|sesenta|sayı
uno|bir|one|uno|sayı
dos|iki|two|dos|sayı
tres|üç|three|tres|sayı
diez|on|ten|diez|sayı
seis|altı|six|seis|sayı
abril|nisan|April|abril|ay
agosto|ağustos|August|agosto|ay
noviembre|kasım|November|noviembre|ay
lunes|pazartesi|Monday|lunes|gün
domingo|pazar|Sunday|domingo|gün
día|gün|day|día|isim
madres|anneler|mothers|madre|isim
media|yarım|half|medio|sıfat
cuarto|çeyrek|quarter|cuarto|isim
menos|eksik / kala|minus|menos|zarf
punto|tam|exactly|punto|isim
hora|saat|hour / time|hora|isim
cumpleaños|doğum günü|birthday|cumpleaños|isim
profesión|meslek|profession|profesión|isim
profesora|kadın öğretmen|teacher|profesor|isim
abogado|erkek avukat|lawyer|abogado|isim
abogada|kadın avukat|lawyer|abogado|isim
padre|baba|father|padre|isim
madre|anne|mother|madre|isim
padres|anne ve baba|parents|padre|isim
hermana|kız kardeş|sister|hermana|isim
hermanos|kardeşler|siblings|hermano|isim
amigos|arkadaşlar|friends|amigo|isim
hijo|oğul / çocuk|son|hijo|isim
hija|kız evlat|daughter|hija|isim
español|İspanyolca|Spanish|español|isim/sıfat
españa|İspanya|Spain|España|özel isim
salamanca|Salamanca şehri|Salamanca|Salamanca|özel isim
esmirna|İzmir|Izmir|Esmirna|özel isim
turquía|Türkiye|Türkiye|Turquía|özel isim
turco|Türk|Turkish|turco|sıfat
turcas|Türk kadınlar|Turkish|turco|sıfat çoğul
ihsan|İhsan|İhsan|İhsan|özel isim
cansu|Cansu|Cansu|Cansu|özel isim
merve|Merve|Merve|Merve|özel isim
david|David|David|David|özel isim
alejandra|Alejandra|Alejandra|Alejandra|özel isim
madrid|Madrid|Madrid|Madrid|özel isim
maría|María|María|María|özel isim
sonia|Sonia|Sonia|Sonia|özel isim
carlos|Carlos|Carlos|Carlos|özel isim
laura|Laura|Laura|Laura|özel isim
primos|kuzenler|cousins|primo|isim
musulmanes|Müslümanlar|Muslims|musulmán|sıfat
anarquistas|anarşistler|anarchists|anarquista|isim/sıfat
mesa|masa|table|mesa|isim
madera|ahşap|wood|madera|isim
anillo|yüzük|ring|anillo|isim
oro|altın|gold|oro|isim
libro|kitap|book|libro|isim
casa|ev|house|casa|isim
coche|araba|car|coche|isim
coches|arabalar|cars|coche|isim
negro|siyah|black|negro|sıfat
playa|plaj|beach|playa|isim
pelo|saç|hair|pelo|isim
familia|aile|family|familia|isim
grande|büyük|big|grande|sıfat
bebé|bebek|baby|bebé|isim
meses|ay|months|mes|isim
años|yıl / yaş|years|año|isim
estudiar|ders çalışmak|to study|estudiar|mastar
escribir|yazmak|to write|escribir|mastar
practicar|pratik yapmak|to practice|practicar|mastar
clase|ders / sınıf|class|clase|isim
habitación|oda|room|habitación|isim
centro|merkez|center|centro|isim
café|kafe|cafe|café|isim
teléfono|telefon|phone|teléfono|isim
niña|kız çocuğu|girl|niña|isim
niño|erkek çocuk|boy|niño|isim
alumno|öğrenci|student|alumno|isim
profesor|öğretmen|teacher|profesor|isim
trabajo|iş|work|trabajo|isim
pastel|pasta|cake|pastel|isim
móvil|cep telefonu|mobile phone|móvil|isim
abuelo|dede|grandfather|abuelo|isim
manzana|elma|apple|manzana|isim
manzanas|elmalar|apples|manzana|isim çoğul
pared|duvar|wall|pared|isim
jarrón|vazo|vase|jarrón|isim
puerta|kapı|door|puerta|isim
restaurante|restoran|restaurant|restaurante|isim
supermercado|süpermarket|supermarket|supermercado|isim
taxista|taksici|taxi driver|taxista|isim
cajera|kadın kasiyer|cashier|cajero|isim
camarero|garson|waiter|camarero|isim
ingeniero|mühendis|engineer|ingeniero|isim
primavera|ilkbahar|spring|primavera|isim
euros|avro|euros|euro|isim
kilo|kilo|kilo|kilo|isim
triste|üzgün|sad|triste|sıfat
cansado|yorgun / yorucu|tired / tiring|cansado|sıfat
enfermas|hasta kadınlar|ill|enfermo|sıfat çoğul
contentos|mutlu|happy|contento|sıfat çoğul
cerrada|kapalı|closed|cerrado|sıfat
roto|kırık|broken|roto|sıfat
soltera|bekâr|single|soltero|sıfat
divorciado|boşanmış|divorced|divorciado|sıfat
casados|evli|married|casado|sıfat
prometido|sözlü|engaged|prometido|sıfat
viudo|dul|widower|viudo|sıfat
guapa|güzel|beautiful|guapo|sıfat
simpática|cana yakın|friendly|simpático|sıfat
escribiendo|yazıyor|writing|escribir|gerundio
comiendo|yiyor|eating|comer|gerundio
hablando|konuşuyor|speaking|hablar|gerundio
pizza|pizza|pizza|pizza|isim
chicas|kızlar|girls|chica|isim
aburrido|sıkılmış / sıkıcı|bored / boring|aburrido|sıfat
aburrida|sıkıcı|boring|aburrido|sıfat
alegre|neşeli|cheerful|alegre|sıfat
alto|uzun|tall|alto|sıfat
blanco|beyaz|white|blanco|sıfat
blanca|beyaz / solgun|white / pale|blanco|sıfat
bueno|iyi|good|bueno|sıfat
rico|zengin / lezzetli|rich / tasty|rico|sıfat
rojo|kırmızı|red|rojo|sıfat
roja|kızarmış|flushed|rojo|sıfat
verde|yeşil / ham|green / unripe|verde|sıfat
viejo|yaşlı / eskimiş|old / worn|viejo|sıfat
orgulloso|kibirli / gururlu|proud|orgulloso|sıfat
perezoso|tembel|lazy|perezoso|sıfat
listo|zeki / hazır|clever / ready|listo|sıfat
lista|zeki / hazır|clever / ready|listo|sıfat
guapo|yakışıklı|handsome|guapo|sıfat
despierto|uyanık / açıkgöz|awake / clever|despierto|sıfat
divertido|eğlenceli|amusing|divertido|sıfat
divertida|eğlenmiş|amused|divertido|sıfat
ciego|kör / göremeyen|blind|ciego|sıfat
fiebre|ateş|fever|fiebre|isim
dolor|ağrı|pain|dolor|isim
estómago|mide|stomach|estómago|isim
tos|öksürük|cough|tos|isim
sed|susuzluk|thirst|sed|isim
hambre|açlık|hunger|hambre|isim
calor|sıcaklık|heat|calor|isim
frío|soğuk|cold|frío|isim
sueño|uyku / uykululuk|sleepiness|sueño|isim
hoy|bugün|today|hoy|zarf
edad|yaş|age|edad|isim
luz|ışık|light|luz|isim
es|...dır|is|ser|presente
diferencia|fark|difference|diferencia|isim
entre|arasında|between|entre|edat
verbo|fiil|verb|verbo|isim
adjetivo|sıfat|adjective|adjetivo|isim
presente|şimdiki / geniş zaman|present tense|presente|dilbilgisi
`;
export const glossary=Object.create(null);
for(const line of raw.split('\n')){
  const parts=line.trim().split('|');
  if(parts.length===5)glossary[parts[0].toLocaleLowerCase('es')]=parts.slice(1);
}
