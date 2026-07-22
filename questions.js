(() => {
    "use strict";

    const banks = Object.create(null);
    const ensure = (name) => (banks[name] ||= []);
    const add = (category, id, title, text, answers, explanation, difficulty = 1) => {
        ensure(category).push({
            id: `v52-${category}-${id}`,
            category,
            difficulty,
            title,
            text,
            answers,
            correct: 0,
            explanation
        });
    };

    const rotateDistractors = (values, index, count = 3) => {
        const result = [];
        for (let step = 1; result.length < count && step < values.length + 2; step += 1) {
            const value = values[(index + step * 7) % values.length];
            if (value !== values[index] && !result.includes(value)) result.push(value);
        }
        return result;
    };

    const addDefinitionSet = (category, prefix, title, entries, difficulty = 1) => {
        const terms = entries.map((entry) => entry[0]);
        entries.forEach(([term, definition, explanation], index) => {
            add(
                category,
                `${prefix}-${index + 1}`,
                title,
                `“${definition}” açıklaması hangi kavrama aittir?`,
                [term, ...rotateDistractors(terms, index)],
                explanation || `${term}, ${definition.toLocaleLowerCase("tr-TR")}.`,
                typeof difficulty === "function" ? difficulty(index) : difficulty
            );
        });
    };

    const mediaScenarios = [
        ["Kaynağın kimliğini ve uzmanlığını kontrol etmek", "Bir uzmanın açıklamasını haberde kullanmadan önce yapılması gereken ilk işlem nedir?", "Kaynağın konu ile ilişkisi ve yetkinliği doğrulanmalıdır."],
        ["Görüntünün ilk yayımlandığı tarihi araştırmak", "Bir videonun eski bir olaya ait olabileceğinden şüpheleniliyorsa ne yapılmalıdır?", "İlk yayın tarihi ve özgün kaynak, görüntünün bağlamını anlamaya yardım eder."],
        ["İddianın doğrulanmadığını açıkça belirtmek", "Canlı yayında henüz teyit edilmemiş bir bilgi aktarılacaksa hangi yaklaşım doğrudur?", "İzleyiciye bilginin doğrulama durumunu açıkça söylemek gerekir."],
        ["Düzeltmeyi görünür ve anlaşılır biçimde yayımlamak", "Haberde önemli bir hata fark edildiğinde ne yapılmalıdır?", "Düzeltme, hatanın ulaştığı kitleye açık biçimde ulaştırılmalıdır."],
        ["Başlığı haber içeriğiyle uyumlu tutmak", "Tıklanma uğruna yanıltıcı başlık kullanılmasını önleyen temel kural nedir?", "Başlık, metinde doğrulanmış olan bilgiyi yansıtmalıdır."],
        ["Kişisel verileri gereksiz yere yayımlamamak", "Bir olay yerindeki kişilerin telefon ve adres bilgileri için doğru yaklaşım nedir?", "Habercilik amacı için gerekli olmayan kişisel bilgiler korunmalıdır."],
        ["Çocuğun kimliğini ve güvenliğini korumak", "Hassas bir haberde çocuklarla ilgili temel yayın ilkesi hangisidir?", "Çocuğun üstün yararı ve güvenliği önceliklidir."],
        ["Alıntıyı bağlamından koparmamak", "Bir konuşmadan kısa bir bölüm kullanılırken neye dikkat edilmelidir?", "Alıntının anlamı, konuşmanın genel bağlamıyla çelişmemelidir."],
        ["İki bağımsız ve güvenilir kaynaktan doğrulamak", "Tek bir anonim hesaptan gelen kritik iddia nasıl ele alınmalıdır?", "Kritik iddialar bağımsız kaynaklarla doğrulanmadan kesin bilgi olarak verilmemelidir."],
        ["Saat, yer ve kaynak bilgisini karşılaştırmak", "Bir fotoğrafın iddia edilen olayla ilişkisini kontrol etmek için en yararlı işlem hangisidir?", "Zaman, konum ve kaynak tutarlılığı bağlam doğrulamasının temelidir."],
        ["Haber ile yorumu birbirinden ayırmak", "Muhabirin kişisel görüşünün gerçek bilgi gibi algılanmasını önlemek için ne yapılmalıdır?", "Olgu, yorum ve analiz açık biçimde ayrılmalıdır."],
        ["Karşı tarafın yanıt hakkını gözetmek", "Bir kişi hakkında ciddi iddia içeren haber hazırlanırken hangi ilke uygulanmalıdır?", "Hakkında iddia bulunan kişiye makul yanıt olanağı tanınmalıdır."],
        ["Resmî belgenin özgünlüğünü doğrulamak", "İnternette dolaşan bir belge haber kaynağı olacaksa ilk olarak ne kontrol edilmelidir?", "Belgenin kaynağı, bütünlüğü ve yayımlayan kurum doğrulanmalıdır."],
        ["Acil ekiplerin çalışmasını engellememek", "Olay yerinde iyi görüntü almak ile güvenlik çatışırsa hangisi önceliklidir?", "Saha güvenliği ve acil müdahalenin kesintisiz sürmesi her zaman önceliklidir."],
        ["Mağdurun onurunu koruyan görüntü seçmek", "Hassas olaylarda görüntü kullanımı için doğru ölçüt hangisidir?", "Kamu yararı gözetilirken kişilerin onuru ve mahremiyeti korunmalıdır."],
        ["Verinin hangi dönemi kapsadığını belirtmek", "Bir istatistik haberde kullanılırken izleyicinin doğru anlaması için ne verilmelidir?", "Kaynak, dönem, örneklem ve ölçüm biçimi verinin anlamını belirler."],
        ["Kesilmiş videonun tam kaydını aramak", "Kısa bir video parçası tartışmalı bir iddiaya kanıt gösteriliyorsa ne yapılmalıdır?", "Tam kayıt, kesilen bölümün bağlamını ortaya çıkarabilir."],
        ["Benzer isimli kişileri ek bilgilerle ayırt etmek", "Aynı adı taşıyan iki kişinin karıştırılmasını önlemek için ne yapılmalıdır?", "Görev, kurum, yer ve diğer doğrulanmış ayırt edici bilgiler kontrol edilmelidir."],
        ["Kaynakla çıkar ilişkisini açıklamak", "Bir değerlendirme yapan kişinin konu ile maddi bağı varsa ne yapılmalıdır?", "Olası çıkar çatışması izleyiciden saklanmamalıdır."],
        ["Başka yayınların hatasını tekrar etmeden bağımsız doğrulama yapmak", "Bir bilgi birçok hesapta paylaşılmışsa otomatik olarak doğru sayılır mı?", "Çok sayıda paylaşım tek bir hatalı kaynaktan çoğalmış olabilir."],
        ["Arşiv görüntüsünü açıkça etiketlemek", "Eski görüntü güncel haberde arka plan amacıyla kullanılıyorsa ne yapılmalıdır?", "İzleyicinin görüntüyü güncel sanmaması için arşiv bilgisi belirtilmelidir."],
        ["Ses kaydının kesilip kesilmediğini kontrol etmek", "Kaynağı belirsiz bir ses kaydı için hangi doğrulama önemlidir?", "Kayıt bütünlüğü, konuşmacı ve tarih doğrulanmalıdır."],
        ["Haberde belirsizlik düzeyini doğru aktarmak", "Yetkililerin henüz kesinleştirmediği sayı nasıl verilmelidir?", "Tahmin, ön bilgi ve kesin sayı birbirinden ayrılmalıdır."],
        ["Kamu yararı ile mahremiyet arasında ölçülülük kurmak", "Özel hayata ilişkin bilgi hangi durumda kullanılabilir?", "Yalnızca açık kamu yararı varsa ve gerekli ölçüde kullanılmalıdır."],
        ["Kaynağın doğrudan gözlemi ile duyumunu ayırmak", "Görgü tanığının anlatımı alınırken hangi ayrım yapılmalıdır?", "Tanığın gördüğü şey ile başkasından duyduğu bilgi aynı güven düzeyinde değildir."],
        ["Harita ve konum görüntülerini güncel kaynakla eşleştirmek", "Olay yeri konumu belirlenirken eski bir ekran görüntüsüne güvenmek neden sakıncalıdır?", "Yol ve çevre koşulları zaman içinde değişebilir."],
        ["Haber metninde kullanılan yapay içeriği belirtmek", "Yapay olarak oluşturulmuş temsili görsel kullanıldığında ne yapılmalıdır?", "İzleyici, görüntünün gerçek olay kaydı olmadığını bilmelidir."],
        ["Sosyal medya kullanıcı adını tek başına kimlik kanıtı saymamak", "Doğrulanmamış bir hesabın açıklaması nasıl ele alınmalıdır?", "Hesabın gerçekten ilgili kişi veya kuruma ait olduğu doğrulanmalıdır."],
        ["Hızdan önce doğruluğu seçmek", "Rakip yayın haberi önce geçtiğinde muhabirin temel önceliği ne olmalıdır?", "Yanlış bir haberi hızlı vermek, doğrulanmış haberi biraz sonra vermekten daha zararlıdır."],
        ["Aynı olay için farklı güvenilir kaynakları karşılaştırmak", "Kaynaklar arasında ayrıntı farkı varsa ne yapılmalıdır?", "Farkın nedeni araştırılmalı ve teyit edilen ortak bilgiler aktarılmalıdır."],
        ["İstatistikte oran ile toplam sayıyı karıştırmamak", "Yüzde artış haberi hazırlanırken hangi bilgi birlikte verilmelidir?", "Başlangıç değeri ve mutlak sayı, yüzdelik değişimin doğru anlaşılmasını sağlar."],
        ["Soruyu yönlendirici olmayan biçimde sormak", "Röportajda güvenilir yanıt almayı kolaylaştıran yöntem hangisidir?", "Tarafsız ve açık uçlu sorular yanıtı önceden dayatmaz."],
        ["Saha görüntüsünde güvenlik şeridine uymak", "Muhabir olay yerine daha çok yaklaşmak için güvenlik sınırını aşmalı mı?", "Yetkililerin belirlediği güvenli alan dışına çıkılmamalıdır."],
        ["Kimliği doğrulanmamış kişiyi yetkili gibi tanıtmamak", "Kendini kurum sözcüsü olarak tanıtan biriyle karşılaşıldığında ne yapılmalıdır?", "Kurum bağlantısı ve görevi doğrulanmadan resmî kaynak sayılmamalıdır."],
        ["Yanlış anlaşılabilecek grafiğin ölçeğini düzeltmek", "Bir grafik küçük farkı çok büyük gösteriyorsa ne yapılmalıdır?", "Eksenler ve ölçek izleyiciyi yanıltmayacak biçimde düzenlenmelidir."],
        ["Haber metnindeki kesin ifadeleri kanıt düzeyine göre seçmek", "Bir olayın nedeni yalnızca ihtimal olarak değerlendiriliyorsa hangi dil uygundur?", "Kesinleşmemiş nedenler olasılık olarak ve kaynağı belirtilerek aktarılmalıdır."],
        ["Gizli kaynağın bilgisini ek kanıtla desteklemek", "Kimliği açıklanmayan bir kaynaktan gelen bilgi nasıl güçlendirilir?", "Belge, bağımsız kaynak veya doğrudan gözlemle destek aranmalıdır."],
        ["Röportaj yapılan kişiye kullanım amacını anlatmak", "Kayıt öncesi açık rıza için ne yapılmalıdır?", "Kişi kaydın nerede ve nasıl kullanılacağını bilmelidir."],
        ["Haberin yayımlanma ve güncellenme saatini göstermek", "Gelişen olay haberinde eski bilginin güncel sanılmasını ne önler?", "Zaman damgası ve güncelleme notları içeriğin güncelliğini açıklar."],
        ["Aynı soyadını akrabalık kanıtı saymamak", "İsim benzerliğine dayalı ilişki iddiası nasıl ele alınmalıdır?", "Akrabalık veya kurumsal bağ ayrıca doğrulanmalıdır."]
    ];

    mediaScenarios.forEach((item, index) => {
        const wrong = [
            "Bilgiyi en çok paylaşan hesabı doğru kabul etmek",
            "Doğrulama yapmadan dikkat çekici bir başlıkla yayımlamak",
            "Kaynak ve bağlam bilgisini izleyiciden gizlemek"
        ];
        add("media", `scenario-${index + 1}`, "Medya Okuryazarlığı", item[1], [item[0], ...wrong], item[2], 1 + (index % 3));
    });

    const safetyScenarios = [
        ["Emniyet kemerini yolculuk boyunca takmak", "Araç içindeki temel güvenlik davranışı hangisidir?", "Emniyet kemeri, kısa mesafede ve arka koltukta da kullanılmalıdır."],
        ["Yaya geçidinde yayaya geçiş hakkı vermek", "Sürücü işaretlenmiş yaya geçidine yaklaşırken ne yapmalıdır?", "Hız azaltılmalı ve geçiş yapan yayaya yol verilmelidir."],
        ["Acil geçiş koridorunu açık bırakmak", "Yoğun trafikte ambulans sireni duyulduğunda ne yapılmalıdır?", "Araçlar kontrollü biçimde yol vererek acil aracın geçişini kolaylaştırmalıdır."],
        ["Takip mesafesini artırmak", "Yağmurlu havada güvenli sürüş için hangi önlem alınmalıdır?", "Islak zeminde fren mesafesi uzayabileceği için takip aralığı artırılır."],
        ["Hızı görüş ve yol koşullarına göre azaltmak", "Sisli havada doğru sürüş yaklaşımı hangisidir?", "Görüş azaldığında hız düşürülmeli ve ani manevralardan kaçınılmalıdır."],
        ["Telefonu sürüş sırasında kullanmamak", "Mesaj okumak için en güvenli yöntem hangisidir?", "Araç güvenli yere park edilmeden telefonla ilgilenilmemelidir."],
        ["Kaza yerinde güvenli bir alanda durmak", "Muhabir trafik kazasını görüntülerken nerede bulunmalıdır?", "Aktif şerit ve acil ekiplerin çalışma alanı dışında kalınmalıdır."],
        ["Dörtlüleri yalnızca gerekli uyarı durumlarında kullanmak", "Dörtlü ikaz lambaları hangi amaçla kullanılmalıdır?", "Arıza veya beklenmedik tehlike gibi durumlarda diğer sürücüler uyarılır."],
        ["Motosiklette uygun kask ve koruyucu ekipman kullanmak", "İki tekerlekli araçta en temel koruma hangisidir?", "Standartlara uygun kask ve koruyucu ekipman yaralanma riskini azaltır."],
        ["Bisikletle gece görünürlük ekipmanı kullanmak", "Karanlıkta bisiklet sürerken hangi önlem alınmalıdır?", "Ön-arka aydınlatma ve yansıtıcılar görünürlüğü artırır."],
        ["Çocukları yaş ve boylarına uygun koltukta taşımak", "Araçta çocuk güvenliği için doğru yöntem hangisidir?", "Uygun çocuk koltuğu ve doğru sabitleme kullanılmalıdır."],
        ["Lastik basıncını üretici değerine göre kontrol etmek", "Güvenli sürüş için lastiklerle ilgili hangi kontrol yapılmalıdır?", "Yanlış basınç yol tutuşu, frenleme ve aşınmayı olumsuz etkileyebilir."],
        ["Kırmızı ışıkta durma çizgisini geçmemek", "Sinyalizasyonlu kavşakta kırmızı ışık yandığında ne yapılır?", "Araç durma çizgisinden önce durmalıdır."],
        ["Kavşağa görüşü kontrol ederek girmek", "Işıksız kavşakta güvenli yaklaşım hangisidir?", "Hız azaltılmalı, geçiş hakkı ve diğer yol kullanıcıları kontrol edilmelidir."],
        ["Yorgunken mola vermek", "Sürücüde dikkat azalması ve esneme başladıysa ne yapılmalıdır?", "Güvenli yerde durup dinlenmek gerekir; cam açmak kalıcı çözüm değildir."],
        ["Yolda çalışma işaretlerine uymak", "Yol bakım bölgesinde nasıl hareket edilmelidir?", "Geçici hız ve yönlendirme işaretleri dikkatle izlenmelidir."],
        ["Arızalı aracı mümkünse güvenli alana almak", "Araç yolda arızalandığında ilk amaç ne olmalıdır?", "Trafik akışından uzak güvenli konum ve görünür uyarı sağlanmalıdır."],
        ["Tünelde güvenli takip mesafesini korumak", "Tünel içinde dur-kalk trafik oluşursa hangi davranış doğrudur?", "Takip aralığı korunmalı, geri dönüş veya tehlikeli şerit değişimi yapılmamalıdır."],
        ["Okul geçidinde hızı azaltmak", "Çocukların bulunduğu okul çevresinde sürücü ne yapmalıdır?", "Düşük hız ve yüksek dikkat, ani yaya hareketlerine karşı güvenlik sağlar."],
        ["Yükü sağlam biçimde sabitlemek", "Araç üzerinde veya römorkta taşınan yük için temel kural nedir?", "Yük hareket etmeyecek ve görüşü kapatmayacak biçimde bağlanmalıdır."],
        ["Fren ve direksiyon hareketlerini yumuşatmak", "Kaygan zeminde araç kontrolünü korumak için ne yapılmalıdır?", "Ani hızlanma, fren ve sert direksiyon hareketlerinden kaçınılmalıdır."],
        ["Gece karşıdan araç gelirken uzun farı kapatmak", "Uzun far kullanımında doğru davranış hangisidir?", "Diğer sürücülerin görüşünü bozmayacak biçimde kısa fara geçilmelidir."],
        ["Demiryolu geçidinde sinyal ve bariyerlere uymak", "Bariyer kapanmaya başladığında ne yapılmalıdır?", "Geçişe girilmemeli ve bariyerin tamamen açılması beklenmelidir."],
        ["Otobüsten inen yayalara karşı dikkatli olmak", "Durakta duran toplu taşıma aracının yanından geçerken ne yapılmalıdır?", "Yolcu çıkabileceği için hız azaltılmalı ve güvenli mesafe bırakılmalıdır."],
        ["Kaza sonrası yaralıyı gereksiz yere hareket ettirmemek", "Acil tehlike yoksa yaralı için doğru yaklaşım hangisidir?", "Yetkili yardım gelene kadar bilinçsiz taşıma yapılmamalıdır."],
        ["112'yi doğru konum ve durum bilgisiyle aramak", "Acil çağrıda hangi bilgi önceliklidir?", "Olayın açık konumu, türü ve yaralı sayısı sakin biçimde bildirilmelidir."],
        ["Güvenlik üçgenini trafiği tehlikeye atmadan yerleştirmek", "Arıza sonrası diğer sürücüleri uyarmak için ne yapılmalıdır?", "Görünürlük sağlanırken kişi aktif şeritte gereksiz süre kalmamalıdır."],
        ["Şerit değiştirmeden önce ayna ve kör noktayı kontrol etmek", "Güvenli şerit değişiminin doğru sırası hangisidir?", "Sinyal, ayna ve kör nokta kontrolü tamamlandıktan sonra manevra yapılmalıdır."],
        ["Bisiklet yolunu araç parkı için kullanmamak", "Ayrılmış bisiklet yolunun amacı nedir?", "Bisikletlilerin güvenli ve kesintisiz ilerlemesi için ayrılmıştır."],
        ["Kornayı tehlikeyi önlemek amacıyla ölçülü kullanmak", "Korna için doğru kullanım hangisidir?", "Gereksiz ve sürekli korna çevreyi rahatsız eder ve uyarının etkisini azaltır."],
        ["Dönüşte yayaları ve bisikletlileri kontrol etmek", "Sağa veya sola dönerken hangi risk özellikle kontrol edilmelidir?", "Yaya ve bisikletliler aracın dönüş hattında kalabilir."],
        ["Su birikintisine düşük hızla yaklaşmak", "Yolda su birikintisi görüldüğünde ne yapılmalıdır?", "Derinlik bilinmediği için hız düşürülmeli ve mümkünse güvenli rota seçilmelidir."],
        ["Araçtan inerken arkadan gelen bisikleti kontrol etmek", "Park edilmiş araç kapısı açılmadan önce ne yapılmalıdır?", "Ayna ve omuz kontrolü bisikletliyle çarpışmayı önleyebilir."],
        ["Sürüş sırasında uygun ayakkabı kullanmak", "Pedal kontrolünü olumsuz etkileyen davranış hangisidir?", "Ayağa iyi oturan ayakkabı pedallara güvenli basmayı kolaylaştırır."],
        ["Kış koşullarında hazırlıklı ekipman bulundurmak", "Yoğun kar beklenen yolculuk öncesi doğru yaklaşım hangisidir?", "Hava ve yol durumu kontrol edilmeli, araç uygun ekipmanla hazırlanmalıdır."],
        ["Geçiş üstünlüğü olan araca güvenli biçimde yol vermek", "Sirenli itfaiye aracı yaklaştığında sürücü ne yapmalıdır?", "Ani ve tehlikeli manevra yapmadan geçiş alanı oluşturulmalıdır."],
        ["Manevradan önce sinyal vermek", "Dönüş veya şerit değişikliğinde diğer yol kullanıcıları nasıl bilgilendirilir?", "Sinyal, manevra niyetini önceden gösterir."],
        ["Park çıkışında çevreyi tamamen kontrol etmek", "Geri manevra sırasında yalnızca kameraya bakmak yeterli midir?", "Ayna, doğrudan görüş ve çevre kontrolü birlikte kullanılmalıdır."],
        ["Trafik işaretçisinin yönlendirmesine uymak", "Polis işareti ile trafik lambası çelişirse hangisi izlenir?", "Trafiği yöneten görevlinin işareti önceliklidir."],
        ["Sürüş hızını yasal sınırın altında olsa bile koşula göre düşürmek", "Yasal hız sınırı her koşulda güvenli hız anlamına gelir mi?", "Yağış, görüş, yoğunluk ve yol yapısı daha düşük hız gerektirebilir."]
    ];
    safetyScenarios.forEach((item, index) => add("traffic", `safe-${index + 1}`, "Trafik ve Güvenlik", item[1], [item[0], "Hızı artırarak bölgeden hızlıca uzaklaşmak", "Çevredeki kişilerin rastgele yönlendirmesini izlemek", "Uyarıları görmezden gelmek"], item[2], 1 + (index % 3)));

    const disasterSets = {
        flood: [
            ["Yüksek ve güvenli bölgeye yönelmek", "Sel uyarısı alan kişinin temel hareketi ne olmalıdır?", "Dere yatağı ve alçak alanlardan uzaklaşılarak resmî tahliye bilgisi izlenir."],
            ["Derinliği bilinmeyen sudan geçmemek", "Su basmış yolda en güvenli yaklaşım hangisidir?", "Akıntı ve yol hasarı görünmeyebilir; alternatif rota kullanılmalıdır."],
            ["Elektrik hattından uzak durup yetkililere bildirmek", "Suya düşmüş elektrik kablosu görülürse ne yapılmalıdır?", "Su elektrik iletebilir; yaklaşmak ciddi tehlike oluşturur."],
            ["Meteoroloji ve yetkili kurum açıklamalarını izlemek", "Şiddetli yağış bilgisinde hangi kaynak önceliklidir?", "Resmî tahmin ve uyarılar güncel risk değerlendirmesi sunar."],
            ["Bodrum ve alt katlardan çıkmak", "Su hızla yükselirken binada hangi alanlardan uzaklaşılmalıdır?", "Alt katlar kısa sürede dolabilir ve çıkışı zorlaştırabilir."],
            ["Köprü altı ve dere kenarında beklememek", "Taşkın sırasında hangi konum risklidir?", "Akıntı seviyesi hızla değişebilir ve sürüklenen cisimler tehlike yaratabilir."],
            ["Kurtarma ekiplerinin güzergâhını açık bırakmak", "Sel bölgesinde çekim yapan muhabir nasıl konumlanmalıdır?", "Müdahale araçları ve ekiplerinin çalışması engellenmemelidir."],
            ["Tahliye çantasına temel ihtiyaçları koymak", "Önceden hazırlanmış acil durum çantasında ne bulunmalıdır?", "Su, temel ilaçlar, fener ve iletişim araçları gibi ihtiyaçlar hazır tutulur."],
            ["Suyun çekilmesinden sonra yapı güvenliği kontrolünü beklemek", "Su basmış binaya hemen girilmeli midir?", "Elektrik, gaz ve yapısal hasar riski değerlendirilmeden girilmemelidir."],
            ["Çocukları akıntı ve su birikintilerinden uzak tutmak", "Sel sonrası sokakta oyun oynamak neden sakıncalıdır?", "Kirli su, açık rögar ve elektrik riski görünmeyebilir."],
            ["Araç suya girerse güvenli çıkış imkânını değerlendirmek", "Yükselen su aracı etkiliyorsa ne yapılmalıdır?", "Yetkililerin talimatı izlenmeli; araçla akıntıyı zorlamak yerine güvenli tahliye düşünülmelidir."],
            ["İçme suyuyla ilgili resmî duyuruyu takip etmek", "Sel sonrası musluk suyu için hangi yaklaşım doğrudur?", "Kirlilik olasılığı nedeniyle yerel kurumların kullanım uyarısı izlenmelidir."],
            ["Kapalı yol ve tahliye levhalarına uymak", "Kısa yol olduğu için kapalı güzergâha girilmeli midir?", "Kapama, görünmeyen yol hasarı veya akıntı riskine karşı yapılmış olabilir."],
            ["Komşulara yardım ederken kendi güvenliğini de korumak", "Afet sırasında yardım için temel ilke hangisidir?", "Kişi kendisini yeni bir mağdura dönüştürmeden güvenli ve organize yardım etmelidir."],
            ["Telefonu gereksiz aramalarla meşgul etmemek", "Acil iletişim ağının çalışmasına nasıl katkı sağlanır?", "Hatlar acil bilgiler için kullanılmalı, kısa mesaj ve resmî kanallar tercih edilmelidir."],
            ["Akıntının hızını küçümsememek", "Diz seviyesinden düşük görünen su her zaman güvenli midir?", "Hızlı akıntı dengeyi bozabilir ve zemindeki boşluklar görünmeyebilir."],
            ["Evcil hayvanları tahliye planına dahil etmek", "Afet hazırlığında hayvanlar için ne yapılmalıdır?", "Taşıma ekipmanı, su ve güvenli tahliye planı önceden düşünülmelidir."],
            ["Su seviyesini güvenli mesafeden belgelemek", "Muhabir ölçüm görüntüsü alırken nasıl davranmalıdır?", "Tehlikeli suya girmeden sabit referans ve güvenli açı kullanılmalıdır."],
            ["Söylenti yerine resmî tahliye mesajını paylaşmak", "Mahallede farklı tahliye bilgileri dolaşıyorsa ne yapılmalıdır?", "Yetkili kurumun güncel duyurusu doğrulanarak aktarılmalıdır."],
            ["Yağış sona erse bile taşkın riskinin sürebileceğini bilmek", "Yağmur durunca risk tamamen biter mi?", "Yukarı havzadan gelen su ve doygun zemin taşkını sürdürebilir."]
        ],
        fire: [
            ["Rüzgâr yönü ve resmî tahliye hattını izlemek", "Orman yangınında güvenli rota nasıl seçilir?", "Duman ve alev yönü hızla değişebileceği için resmî yönlendirme izlenir."],
            ["Dumanlı alandan uzaklaşmak", "Yoğun duman görüldüğünde temel davranış hangisidir?", "Duman solunması ve görüş kaybı ciddi tehlike oluşturur."],
            ["İtfaiye ve tahliye yolunu açık bırakmak", "Yangın bölgesinde araç parkı için doğru yaklaşım nedir?", "Müdahale araçlarının geçişi hiçbir biçimde engellenmemelidir."],
            ["Yangın ihbarını açık konum bilgisiyle yapmak", "Yeni bir alev noktası görüldüğünde ne yapılmalıdır?", "Yetkililere konum, yön ve gözlenen durum sakin biçimde bildirilmelidir."],
            ["Kendiliğinden müdahale yerine güvenli uzaklıkta kalmak", "Eğitimsiz kişi büyüyen yangına yaklaşmalı mıdır?", "Yanlış müdahale kişinin ve ekiplerin güvenliğini tehlikeye atabilir."],
            ["Kuru ot ve yanıcı maddelerden uzak alan seçmek", "Tahliye sırasında bekleme noktası nasıl olmalıdır?", "Yakıt oluşturabilecek bitki ve malzemelerden uzak güvenli alan tercih edilir."],
            ["Duman görüntüsünden kesin yangın alanı tahmini yapmamak", "Muhabir yalnızca uzaktaki dumanı görüyorsa nasıl konuşmalıdır?", "Kesin alan ve büyüklük yetkili verilerle doğrulanmalıdır."],
            ["Maske ve koruyucu ekipmanı doğru kullanmak", "Saha ekibinin dumanlı çevrede çalışması için ne gerekir?", "Yetkili sınırlar içinde uygun kişisel koruyucu ekipman kullanılmalıdır."],
            ["Tahliye edilen kişilerin kimlik bilgilerini korumak", "Geçici barınma alanında röportaj yapılırken neye dikkat edilir?", "Rıza, mahremiyet ve kişilerin hassas durumu gözetilir."],
            ["Kül ve sıcak yüzeylere yaklaşmamak", "Alev görünmese de yangın alanına girilebilir mi?", "Gizli sıcak noktalar ve yeniden tutuşma riski bulunabilir."],
            ["Drone kullanımında hava operasyonlarına engel olmamak", "Yangın bölgesinde izinsiz drone uçurmak neden tehlikelidir?", "Söndürme uçakları ve helikopterlerin çalışmasını aksatabilir."],
            ["Tahliye kararını geciktirmemek", "Yetkililer bölgeyi boşaltma çağrısı yaptığında ne yapılır?", "Eşya toplamak için riskli süre kaybedilmeden planlı çıkış yapılmalıdır."],
            ["Yangın sonrası bölgeye dönüş iznini beklemek", "Evine dönmek isteyen kişi hangi bilgiyi izlemelidir?", "Yol, hava ve yapı güvenliği yetkililerce uygun görülmeden dönülmemelidir."],
            ["Evcil hayvan ve hayvan sürüleri için önceden plan yapmak", "Kırsal bölgede tahliye hazırlığı nasıl güçlendirilir?", "Taşıma, barınma ve güvenli güzergâh önceden belirlenmelidir."],
            ["Yanlış yangın görüntülerini paylaşmamak", "Sosyal medyada farklı bölgeye ait alev videosu görülürse ne yapılmalıdır?", "Yer ve tarih doğrulanmadan güncel olay görüntüsü olarak kullanılmamalıdır."],
            ["Rüzgâr değişimini düzenli takip etmek", "Yangın hattı neden kısa sürede değişebilir?", "Rüzgâr hızı ve yönü alevlerin ilerleme yönünü etkiler."],
            ["Acil durumda 112 ve resmî kanalları kullanmak", "Yangın ihbarı için doğru iletişim yaklaşımı nedir?", "Doğrulanmış konum bilgisiyle acil çağrı yapılmalıdır."],
            ["Yol kenarına yanıcı atık bırakmamak", "Yangın riskini azaltan davranış hangisidir?", "Cam, izmarit ve yanıcı atıklar kuru bitki örtüsünde risk oluşturabilir."],
            ["Haber ekibinin çıkış rotasını önceden belirlemesi", "Yangın sahasına yaklaşmadan önce hangi plan yapılmalıdır?", "Rüzgâr değişirse kullanılacak güvenli geri çekilme rotası bilinmelidir."],
            ["Sıcaklık ve alan verisini yetkili kaynaktan doğrulamak", "Termal görüntü tek başına kesin yangın büyüklüğü verir mi?", "Görüntü, saha ve resmî operasyon bilgileriyle birlikte değerlendirilmelidir."]
        ],
        storm: [
            ["Kıyı ve dalga vurma alanından uzaklaşmak", "Şiddetli fırtınada sahilde doğru davranış hangisidir?", "Yüksek dalga ve sürüklenen cisimler kıyıda ciddi risk oluşturur."],
            ["Gevşek eşyaları güvenli biçimde sabitlemek", "Fırtına öncesi balkon ve bahçe için ne yapılmalıdır?", "Rüzgârın savurabileceği eşyalar içeri alınmalı veya sabitlenmelidir."],
            ["Ağaç ve tabela altından uzak durmak", "Kuvvetli rüzgâr sırasında nerede beklemek sakıncalıdır?", "Dal ve tabela düşmesi riski bulunur."],
            ["Denize açılmamak ve resmî uyarıları izlemek", "Fırtına uyarısında küçük tekneyle çıkış yapılmalı mıdır?", "Deniz ve hava koşulları uygun ilan edilene kadar çıkılmamalıdır."],
            ["Elektrik kesintisine karşı fener hazırlamak", "Fırtına öncesi evde hangi hazırlık yararlıdır?", "Şarjlı aydınlatma, iletişim ve temel ihtiyaçlar hazır tutulmalıdır."],
            ["Su basabilecek alt geçitlerden kaçınmak", "Yoğun yağışla birlikte fırtınada rota seçimi nasıl olmalıdır?", "Alçak ve kapalı alanlar kısa sürede suyla dolabilir."],
            ["Kopmuş kablolardan uzak durmak", "Fırtına sonrası yerde elektrik hattı görülürse ne yapılır?", "Yaklaşmadan alan terk edilir ve yetkililere bildirilir."],
            ["Araç hızını düşürüp direksiyonu kontrollü tutmak", "Yan rüzgârda sürüş için doğru yöntem nedir?", "Ani manevralardan kaçınılmalı ve özellikle açık alanlarda hız azaltılmalıdır."],
            ["Pencere ve camlardan güvenli mesafede durmak", "Çok kuvvetli rüzgârda ev içinde neresi daha güvenlidir?", "İç bölüm ve sağlam alanlar, kırılabilecek camlardan daha güvenlidir."],
            ["Fırtına sırasında ağaçlık alanda kamp yapmamak", "Açık havada hangi konumdan uzaklaşılmalıdır?", "Düşen dal ve yıldırım riski nedeniyle kapalı güvenli yapı aranmalıdır."],
            ["Yıldırım sırasında açık alandaki yüksek noktalardan uzaklaşmak", "Gök gürültülü havada tepede beklemek doğru mudur?", "Yüksek ve açık noktalar yıldırım riskini artırır."],
            ["Hava durumu uyarısının zamanını ve bölgesini kontrol etmek", "Paylaşılan fırtına uyarısının güncel olduğu nasıl anlaşılır?", "Tarih, saat, bölge ve yayımlayan kurum doğrulanır."],
            ["Sahil yolunda dalga aşması varsa kapalı rotaya girmemek", "Yol kısa olduğu için uyarı şeridi aşılmalı mıdır?", "Dalga, su ve zemin hasarı görünenden daha tehlikeli olabilir."],
            ["Cep telefonunu ve yedek güç kaynağını şarj etmek", "Fırtına öncesi iletişim hazırlığı hangisidir?", "Kesinti sırasında resmî bilgiye erişim için enerji hazırlığı yapılır."],
            ["Çatı hasarına fırtına sürerken çıkmamak", "Uçan kiremit görüldüğünde hemen çatıya çıkılır mı?", "Rüzgâr devam ederken yüksek alana çıkmak düşme ve çarpma riski yaratır."],
            ["Kıyı tahliye planını önceden öğrenmek", "Fırtına riski olan bölgede hazırlık nasıl yapılır?", "Toplanma alanı ve güvenli güzergâh önceden bilinmelidir."],
            ["Kalabalığa panik yaratmadan açık yönlendirme vermek", "Fırtına haberi nasıl aktarılmalıdır?", "Doğrulanmış, uygulanabilir ve sakin uyarı dili kullanılmalıdır."],
            ["Rüzgâr altında drone uçuşunu güvenlik sınırlarına göre iptal etmek", "Kuvvetli rüzgârda hava çekimi her zaman yapılabilir mi?", "Kontrol kaybı ve çevreye çarpma riski nedeniyle uçuş ertelenmelidir."],
            ["Fırtına geçtikten sonra da deniz uyarısını takip etmek", "Rüzgâr azalınca dalga riski hemen sona erer mi?", "Deniz koşulları bir süre daha tehlikeli kalabilir."],
            ["Hasarlı yapıya yetkili kontrolünden önce girmemek", "Fırtına sonrası çatlak görülen binaya ne zaman girilir?", "Yapısal güvenlik değerlendirilmeden giriş yapılmamalıdır."]
        ]
    };
    Object.entries(disasterSets).forEach(([category, entries]) => entries.forEach((item, index) => add(category, `event-${index + 1}`, category === "fire" ? "Yangın Güvenliği" : category === "storm" ? "Fırtına Güvenliği" : "Sel Güvenliği", item[1], [item[0], "Uyarıları beklemeden riskli alana yaklaşmak", "Sosyal medyadaki ilk yorumu izlemek", "Güvenlik sınırlarını aşmak"], item[2], 1 + (index % 3))));

    const technologyTerms = [
        ["Tarayıcı", "Web sayfalarını açıp görüntüleyen yazılım", "Tarayıcı, internet üzerindeki web içeriklerini işler ve kullanıcıya sunar."],
        ["İşletim sistemi", "Donanım kaynaklarını yöneten ve uygulamaların çalışmasını sağlayan temel yazılım", "İşletim sistemi işlemci, bellek, depolama ve aygıtları yönetir."],
        ["RAM", "Çalışan programların geçici verilerini hızlı biçimde tutan bellek", "RAM uçucudur; güç kesildiğinde içeriği kaybolur."],
        ["SSD", "Veriyi hareketli parça kullanmadan saklayan depolama birimi", "SSD, flash bellek temelli kalıcı depolamadır."],
        ["CPU", "Komutları işleyen ve hesaplamaları gerçekleştiren ana işlem birimi", "CPU program komutlarını yürütür."],
        ["GPU", "Grafik ve paralel hesaplama işlemlerinde uzmanlaşmış işlemci", "GPU çok sayıda benzer işlemi paralel yürütmeye uygundur."],
        ["IP adresi", "Bir ağdaki cihazı mantıksal olarak tanımlayan adres", "IP adresi cihazların ağ üzerinden iletişim kurmasına yardımcı olur."],
        ["DNS", "Alan adlarını IP adresleriyle eşleştiren sistem", "DNS, okunabilir site adlarını ağ adreslerine dönüştürür."],
        ["HTTPS", "Web iletişimini şifreli bağlantı üzerinden taşıyan protokol", "HTTPS aktarım sırasında gizlilik ve bütünlüğü artırır."],
        ["Güvenlik duvarı", "Ağ trafiğini kurallara göre denetleyen koruma sistemi", "Güvenlik duvarı izin verilen ve engellenen bağlantıları filtreler."],
        ["Yedekleme", "Verinin kayıp durumuna karşı ayrı bir kopyasını oluşturma işlemi", "Düzenli ve test edilmiş yedekler veri kaybı riskini azaltır."],
        ["İki faktörlü doğrulama", "Parolaya ek ikinci bir doğrulama adımı kullanan güvenlik yöntemi", "İkinci faktör ele geçirilmiş parolanın tek başına kullanılmasını zorlaştırır."],
        ["Kimlik avı", "Sahte mesaj veya sayfayla kullanıcı bilgisi çalmaya çalışan saldırı", "Gönderen, bağlantı ve alan adı kontrolü kimlik avını fark etmeye yardımcı olur."],
        ["Zararlı yazılım", "Cihaza veya veriye zarar vermek için tasarlanmış yazılım", "Virüs, truva atı ve fidye yazılımı zararlı yazılım örnekleridir."],
        ["Bulut depolama", "Dosyaları internet üzerinden erişilen uzak sunucularda saklama hizmeti", "Bulut depolama farklı cihazlardan erişim ve eşitleme sağlayabilir."],
        ["Veritabanı", "Yapılandırılmış bilgiyi düzenli biçimde saklayan ve sorgulayan sistem", "Veritabanları veriye tutarlı ve kontrollü erişim sağlar."],
        ["Algoritma", "Bir problemi çözmek için tanımlanmış sonlu adımlar dizisi", "Algoritma, girdiyi belirli işlemlerle çıktıya dönüştürür."],
        ["Kaynak kod", "Programcının bir programlama diliyle yazdığı talimatlar", "Kaynak kod derlenebilir veya yorumlanarak çalıştırılabilir."],
        ["Açık kaynak", "Kaynak kodu incelenebilen ve lisans koşullarıyla geliştirilebilen yazılım yaklaşımı", "Açık kaynak, kullanım haklarını ilgili lisans belirlediği için kamu malı anlamına gelmez."],
        ["API", "Yazılımların tanımlanmış kurallarla birbiriyle iletişim kurmasını sağlayan arayüz", "API istek ve yanıt biçimlerini standartlaştırır."],
        ["Önbellek", "Sık kullanılan veriyi daha hızlı erişim için geçici tutan alan", "Önbellek tekrar eden erişimlerin süresini azaltabilir."],
        ["Çerez", "Bir web sitesinin tarayıcıda saklayabildiği küçük veri parçası", "Çerezler oturum, tercih veya ölçüm bilgileri için kullanılabilir."],
        ["VPN", "Ağ trafiğini şifreli bir tünelden geçirebilen bağlantı yöntemi", "VPN bağlantıyı farklı ağ üzerinden yönlendirebilir; tek başına tüm güvenlik sorunlarını çözmez."],
        ["QR kod", "Kamera ile okunabilen iki boyutlu veri kodu", "QR kod bağlantı veya kısa veri taşıyabilir; açmadan önce hedef kontrol edilmelidir."],
        ["Sürüm kontrolü", "Dosyalardaki değişiklik geçmişini kaydeden çalışma sistemi", "Sürüm kontrolü ekip çalışması ve geri dönüş olanağı sağlar."],
        ["Git", "Dağıtık sürüm kontrol sistemi", "Git, kod değişikliklerini commit adı verilen kayıtlarla izler."],
        ["Sunucu", "Ağ üzerinden diğer cihazlara hizmet veya veri sunan sistem", "Web, dosya ve veritabanı hizmetleri sunucularda çalışabilir."],
        ["İstemci", "Bir sunucudan hizmet veya veri isteyen uygulama ya da cihaz", "Tarayıcı bir web sunucusuna istek gönderen istemci olabilir."],
        ["Yerel ağ", "Sınırlı bir alan içindeki cihazları bağlayan ağ", "Ev ve ofis ağları yerel ağ örnekleridir."],
        ["Yönlendirici", "Farklı ağlar arasında paketlerin yolunu belirleyen cihaz", "Yönlendirici yerel ağı internete bağlayabilir."],
        ["Anahtar", "Aynı yerel ağdaki cihazlar arasında çerçeve ileten ağ cihazı", "Anahtar, trafiği hedef bağlantı noktasına yönlendirir."],
        ["Bant genişliği", "Bir bağlantının belirli sürede taşıyabileceği veri kapasitesi", "Yüksek bant genişliği daha fazla verinin aynı sürede aktarılmasına imkân verir."],
        ["Gecikme", "Verinin kaynaktan hedefe ulaşması için geçen süre", "Canlı yayın ve oyunlarda düşük gecikme önemlidir."],
        ["Piksel", "Dijital görüntünün en küçük renk birimi", "Bir ekran veya görsel çok sayıda pikselden oluşur."],
        ["Çözünürlük", "Görüntünün yatay ve dikey piksel boyutunu ifade eden değer", "Çözünürlük ayrıntı düzeyini etkiler ancak tek başına kaliteyi belirlemez."],
        ["Kare hızı", "Bir saniyede gösterilen görüntü karesi sayısı", "Daha yüksek ve kararlı kare hızı hareketin daha akıcı görünmesini sağlayabilir."],
        ["Sıkıştırma", "Verinin kapladığı alanı azaltma işlemi", "Kayıplı ve kayıpsız sıkıştırma yöntemleri vardır."],
        ["Dosya uzantısı", "Dosya türünü belirtmeye yardımcı olan ad son eki", "Uzantı program seçimine yardımcı olur ancak tek başına dosyanın güvenli olduğunu kanıtlamaz."],
        ["Şifreleme", "Veriyi anahtar olmadan okunmasını zorlaştıracak biçime dönüştürme", "Şifreleme aktarımda ve depolamada gizlilik sağlar."],
        ["Parola yöneticisi", "Güçlü ve benzersiz parolaları saklamaya yardımcı olan araç", "Her hesapta farklı parola kullanmayı kolaylaştırır."],
        ["Güncelleme", "Yazılıma hata düzeltmesi, güvenlik yaması veya özellik ekleyen yeni sürüm", "Güvenlik güncellemelerini zamanında kurmak bilinen açıkları azaltır."],
        ["Yama", "Belirli bir yazılım hatasını veya güvenlik açığını düzelten küçük güncelleme", "Yamalar mevcut sürümü düzeltmek için yayımlanır."],
        ["Oturum", "Kullanıcının bir hizmetteki geçici etkileşim ve giriş durumunu tutan süreç", "Oturum belirteçleri korunmalı ve ortak cihazda çıkış yapılmalıdır."],
        ["Çoklu ortam", "Metin, ses, görüntü ve video gibi birden fazla içerik türünün birlikte kullanımı", "Dijital haber sayfaları çoklu ortam içerikleri barındırabilir."],
        ["Meta veri", "Bir dosya veya içerik hakkında açıklayıcı veri", "Tarih, konum ve cihaz bilgisi meta veri örnekleridir."],
        ["Coğrafi etiket", "Bir içerikle ilişkilendirilmiş konum bilgisi", "Fotoğrafın nerede çekildiğini gösterebilir ancak doğrulanması gerekir."],
        ["Deepfake", "Yapay yöntemlerle bir kişinin görüntü veya sesini gerçekçi biçimde taklit eden içerik", "Kaynak, tutarsızlık ve bağımsız doğrulama deepfake şüphesinde önemlidir."],
        ["Makine öğrenmesi", "Sistemlerin örnek verilerden örüntü öğrenmesine dayanan yöntem", "Modelin sonucu eğitim verisi ve tasarıma bağlıdır."],
        ["Yapay zekâ modeli", "Belirli girdilerden tahmin veya içerik üreten hesaplama sistemi", "Model çıktısı hatalı olabileceği için kritik bilgiler ayrıca doğrulanmalıdır."],
        ["Erişilebilirlik", "Ürün ve içeriğin farklı ihtiyaçlara sahip kişilerce kullanılabilir olması", "Altyazı, klavye kontrolü ve yeterli kontrast erişilebilirliği artırır."]
    ];
    addDefinitionSet("technology", "term", "Teknoloji", technologyTerms, (index) => 1 + (index % 3));

    const scienceFacts = [
        ["Merkür", "Güneş'e en yakın gezegen", "Merkür, Güneş Sistemi'nde Güneş'e en yakın gezegendir."],
        ["Venüs", "Yüzey sıcaklığı en yüksek gezegen", "Yoğun karbondioksit atmosferi nedeniyle Venüs çok güçlü sera etkisine sahiptir."],
        ["Dünya", "Yüzeyinde büyük miktarda sıvı su bulunan ve yaşamın bilindiği gezegen", "Dünya, Güneş Sistemi'nde yaşamın doğrulandığı tek gezegendir."],
        ["Mars", "Demir oksitli yüzeyi nedeniyle Kızıl Gezegen olarak anılan gezegen", "Mars'ın kırmızı görünümü yüzeydeki demir oksitlerden gelir."],
        ["Jüpiter", "Güneş Sistemi'nin en büyük gezegeni", "Jüpiter, kütle ve çap bakımından en büyük gezegendir."],
        ["Satürn", "Belirgin halka sistemiyle tanınan gaz devi", "Diğer devlerin de halkaları olsa da Satürn'ün halkaları en belirgin olanlardır."],
        ["Uranüs", "Dönme ekseni neredeyse yörünge düzlemine yatık gezegen", "Uranüs yana yatmış gibi döner."],
        ["Neptün", "Güneş'e en uzak ana gezegen", "Sekiz gezegenli sınıflamada Neptün en uzaktadır."],
        ["Fotosentez", "Bitkilerin ışık enerjisini kimyasal enerjiye dönüştürdüğü süreç", "Fotosentezde karbondioksit ve su kullanılarak organik madde ve oksijen üretilebilir."],
        ["Solunum", "Canlı hücrelerin besinlerden kullanılabilir enerji elde ettiği süreç", "Hücresel solunum ATP üretiminde temel yoldur."],
        ["Buharlaşma", "Sıvının yüzeyinden gaz hâline geçmesi", "Buharlaşma kaynama olmadan da gerçekleşebilir."],
        ["Yoğuşma", "Gazın sıvı hâle geçmesi", "Su buharının damlacıklara dönüşmesi yoğuşmadır."],
        ["Donma", "Sıvının katı hâle geçmesi", "Su uygun koşulda ısı kaybederek buza dönüşür."],
        ["Erime", "Katının sıvı hâle geçmesi", "Buzun suya dönüşmesi erime örneğidir."],
        ["Süblimleşme", "Katının sıvı olmadan doğrudan gaz hâline geçmesi", "Kuru buzun gazlaşması süblimleşme örneğidir."],
        ["Atom", "Bir elementin kimyasal özelliklerini taşıyan en küçük birim", "Atom proton, nötron ve elektron gibi parçacıklardan oluşur."],
        ["Molekül", "Kimyasal bağlarla birleşmiş iki veya daha fazla atomdan oluşan yapı", "Su molekülü iki hidrojen ve bir oksijen atomu içerir."],
        ["Element", "Tek tür atomdan oluşan saf madde", "Periyodik tablo elementleri atom numaralarına göre düzenler."],
        ["Bileşik", "Farklı elementlerin belirli oranlarda kimyasal bağla birleştiği saf madde", "Su hidrojen ve oksijenden oluşan bir bileşiktir."],
        ["Asit", "Sulu çözeltide hidrojen iyonu davranışı gösteren madde sınıfı", "Asit ve baz kavramlarının farklı bilimsel tanımları vardır."],
        ["Baz", "Asitlerle tepkimeye girebilen ve sulu ortamda bazik özellik gösteren madde sınıfı", "Bazlar pH ölçeğinde genellikle 7'nin üzerindedir."],
        ["Yer çekimi", "Kütlelerin birbirini çekmesine neden olan temel etkileşim", "Dünya'nın çekimi cisimleri yüzeye doğru ivmelendirir."],
        ["Sürtünme", "Temas eden yüzeylerin göreli hareketine karşı koyan kuvvet", "Sürtünme yürümeyi sağlarken enerji kaybına da yol açabilir."],
        ["Basınç", "Birim yüzeye etki eden dik kuvvet", "Aynı kuvvet daha küçük yüzeye uygulanırsa basınç artar."],
        ["Yoğunluk", "Bir maddenin birim hacimdeki kütlesi", "Yoğunluk kütlenin hacme oranıdır."],
        ["Hız", "Birim zamanda alınan yolun büyüklüğü", "Ortalama sürat toplam yolun toplam zamana oranıyla bulunabilir."],
        ["İvme", "Hızın zamana göre değişim oranı", "Hızın büyüklüğü veya yönü değişirse ivme vardır."],
        ["Enerji", "İş yapabilme kapasitesi", "Enerji farklı biçimlere dönüşebilir."],
        ["Kinetik enerji", "Hareket eden cismin sahip olduğu enerji", "Kinetik enerji kütle ve hızla ilişkilidir."],
        ["Potansiyel enerji", "Cismin konumu veya yapısından kaynaklanan depolanmış enerji", "Yüksekteki cismin kütleçekim potansiyel enerjisi vardır."],
        ["Ses", "Bir ortamda titreşimlerin dalga olarak yayılması", "Ses boşlukta yayılamaz; maddesel ortama ihtiyaç duyar."],
        ["Işık", "Elektromanyetik dalga olarak yayılabilen enerji", "Işık boşlukta yayılabilir."],
        ["Yansıma", "Dalgaların bir yüzeyden geri dönmesi", "Aynadaki görüntü ışığın yansımasıyla oluşur."],
        ["Kırılma", "Dalganın farklı ortama geçerken yön ve hız değiştirmesi", "Su içindeki kalemin kırık görünmesi ışığın kırılmasıyla ilgilidir."],
        ["Elektrik akımı", "Elektrik yükünün düzenli hareketi", "Akım birimi amperdir."],
        ["Gerilim", "Elektrik yüklerini hareket ettiren potansiyel fark", "Gerilim birimi volttur."],
        ["Direnç", "Bir iletkenin elektrik akımına karşı gösterdiği zorluk", "Direnç birimi ohmdur."],
        ["İletken", "Elektrik yüklerinin kolay hareket edebildiği madde", "Bakır iyi bir elektrik iletkenidir."],
        ["Yalıtkan", "Elektrik yüklerinin hareketini büyük ölçüde sınırlayan madde", "Plastik birçok kullanımda yalıtkan görevi görür."],
        ["Omurga", "İnsan vücudunda gövdeyi destekleyen ve omuriliği koruyan kemik dizisi", "Omurga omur adı verilen kemiklerden oluşur."],
        ["Kalp", "Kanı dolaşım sistemine pompalayan kaslı organ", "Kalp oksijen ve besin taşıyan kanın dolaşımını sağlar."],
        ["Akciğer", "Gaz alışverişinin gerçekleştiği temel solunum organı", "Oksijen kana geçerken karbondioksit dışarı atılır."],
        ["Beyin", "Sinir sisteminin bilgi işleme ve kontrol merkezi", "Beyin duyular, hareket, öğrenme ve birçok yaşamsal işlevde rol alır."],
        ["DNA", "Canlılarda kalıtsal bilgiyi taşıyan molekül", "DNA'nın dizilimi genetik bilgiyi kodlar."],
        ["Hücre", "Canlıların yapı ve işlev bakımından temel birimi", "Tek hücreli ve çok hücreli canlılar vardır."],
        ["Doku", "Benzer görev yapan hücrelerin oluşturduğu yapı", "Kas ve sinir dokusu farklı işlevlere sahiptir."],
        ["Organ", "Belirli görevi yerine getiren birden fazla doku türünden oluşan yapı", "Kalp ve akciğer organ örnekleridir."],
        ["Ekosistem", "Canlılar ile cansız çevrelerinin etkileşimli bütünü", "Ekosistemde enerji akışı ve madde döngüleri gerçekleşir."],
        ["Besin zinciri", "Enerjinin üreticiden tüketicilere aktarımını gösteren ilişki", "Besin ağları birden fazla zincirin bağlantısını içerir."],
        ["Biyoçeşitlilik", "Bir bölgedeki gen, tür ve ekosistem çeşitliliği", "Yüksek biyoçeşitlilik ekosistem dayanıklılığına katkı sağlayabilir."],
        ["Erozyon", "Toprağın su, rüzgâr veya diğer etkilerle taşınması", "Bitki örtüsü kaybı erozyon riskini artırabilir."],
        ["Deprem", "Yer kabuğundaki ani enerji boşalmasıyla oluşan sarsıntı", "Deprem dalgaları yer içinde yayılır."],
        ["Fay", "Yer kabuğu bloklarının hareket ettiği kırık zonu", "Depremlerin önemli bölümü fay hareketleriyle ilişkilidir."],
        ["Atmosfer", "Bir gök cismini çevreleyen gaz tabakası", "Dünya atmosferi yaşam ve iklim için önemlidir."],
        ["Troposfer", "Hava olaylarının büyük bölümünün gerçekleştiği en alt atmosfer katmanı", "Troposfer yeryüzüne en yakın katmandır."],
        ["Ozon tabakası", "Güneş'ten gelen morötesi ışınımın bir bölümünü soğuran atmosfer bölgesi", "Stratosferdeki ozon canlıları zararlı UV ışınımından korumaya katkı sağlar."],
        ["İklim", "Bir bölgede uzun dönem boyunca gözlenen hava koşullarının genel düzeni", "İklim, tek günlük hava durumundan farklıdır."],
        ["Hava durumu", "Belirli yer ve zamanda atmosferin kısa süreli durumu", "Sıcaklık, rüzgâr ve yağış hava durumunun bileşenleridir."],
        ["Karbon döngüsü", "Karbonun atmosfer, canlılar, su ve yer kabuğu arasında dolaşımı", "Fotosentez ve solunum karbon döngüsünün süreçlerindendir."],
        ["Su döngüsü", "Suyun buharlaşma, yoğuşma ve yağış gibi süreçlerle dolaşımı", "Su farklı rezervuarlar arasında sürekli hareket eder."]
    ];
    addDefinitionSet("science", "fact", "Bilim ve Doğa", scienceFacts, (index) => 1 + (index % 3));

    const geographyFacts = [
        ["Ankara", "Türkiye'nin başkenti", "Ankara, Türkiye Cumhuriyeti'nin başkentidir."],
        ["İstanbul", "İstanbul Boğazı'nın iki yakasında yer alan büyükşehir", "İstanbul'un toprakları Avrupa ve Asya kıtalarında bulunur."],
        ["İzmir", "Ege Denizi kıyısındaki Türkiye şehri", "İzmir, Ege Bölgesi'nin önemli kıyı şehirlerindendir."],
        ["Trabzon", "Doğu Karadeniz kıyısında yer alan şehir", "Trabzon, Karadeniz Bölgesi'ndedir."],
        ["Antalya", "Akdeniz kıyısında turizm ve tarımla öne çıkan şehir", "Antalya, Türkiye'nin Akdeniz kıyısındadır."],
        ["Kızılırmak", "Türkiye sınırları içinde doğup denize ulaşan en uzun akarsu", "Kızılırmak Karadeniz'e dökülür."],
        ["Van Gölü", "Türkiye'nin yüzölçümü en büyük gölü", "Van Gölü sodalı su özelliğiyle bilinir."],
        ["Ağrı Dağı", "Türkiye'nin en yüksek dağı", "Ağrı Dağı'nın zirvesi Türkiye'nin en yüksek noktasıdır."],
        ["Karadeniz", "Türkiye'nin kuzeyindeki deniz", "Karadeniz Türkiye'nin kuzey kıyılarını çevreler."],
        ["Akdeniz", "Türkiye'nin güneyindeki deniz", "Akdeniz kıyıları Türkiye'nin güneyinde uzanır."],
        ["Ege Denizi", "Türkiye'nin batısındaki deniz", "Ege Denizi Türkiye ile Yunanistan arasında yer alır."],
        ["Marmara Denizi", "Tamamı Türkiye sınırları içinde kalan iç deniz", "Marmara Denizi boğazlarla Karadeniz ve Ege'ye bağlanır."],
        ["İstanbul Boğazı", "Karadeniz'i Marmara Denizi'ne bağlayan boğaz", "İstanbul Boğazı iki deniz arasında doğal su yoludur."],
        ["Çanakkale Boğazı", "Marmara Denizi'ni Ege Denizi'ne bağlayan boğaz", "Çanakkale Boğazı Türkiye'nin önemli su yollarındandır."],
        ["Avrupa", "Türkiye'nin Trakya bölümünün bulunduğu kıta", "Türkiye'nin küçük bir bölümü Avrupa kıtasındadır."],
        ["Asya", "Türkiye'nin Anadolu bölümünün bulunduğu kıta", "Türkiye'nin büyük bölümü Asya kıtasındaki Anadolu'dadır."],
        ["Ekvator", "Dünya'yı Kuzey ve Güney yarımkürelere ayıran varsayımsal çizgi", "Ekvator sıfır derece enlemidir."],
        ["Başlangıç meridyeni", "Sıfır derece boylam olarak kabul edilen meridyen", "Greenwich'ten geçen meridyen boylamların başlangıcıdır."],
        ["Enlem", "Bir noktanın Ekvator'a göre kuzey veya güney konumunu ifade eden açısal değer", "Enlem paralellerle gösterilir."],
        ["Boylam", "Bir noktanın başlangıç meridyenine göre doğu veya batı konumunu ifade eden açısal değer", "Boylam meridyenlerle gösterilir."],
        ["Kıta", "Okyanuslarla ayrılan büyük kara parçası", "Asya, Afrika ve Avrupa kıta örnekleridir."],
        ["Yarımada", "Üç tarafı suyla çevrili kara parçası", "Anadolu büyük ölçüde yarımada özelliği gösterir."],
        ["Ada", "Her tarafı suyla çevrili kara parçası", "Ada, kıtadan daha küçük kara parçasıdır."],
        ["Delta", "Akarsuyun taşıdığı malzemeyi ağız kesiminde biriktirmesiyle oluşan ova", "Delta oluşumu akıntı, dalga ve sediment koşullarına bağlıdır."],
        ["Vadi", "Akarsu aşındırmasıyla veya tektonik süreçlerle oluşabilen uzun çukur alan", "Vadiler genellikle iki yamaç arasında uzanır."],
        ["Plato", "Akarsularla yarılmış yüksek ve geniş düzlük", "Platolar çevresine göre yüksek düz alanlardır."],
        ["Ova", "Çevresine göre alçakta kalan geniş düz veya az eğimli alan", "Ovalar tarım ve yerleşim için elverişli olabilir."],
        ["Havza", "Suların aynı çıkış noktasına toplandığı alan", "Akarsu havzalarının sınırlarını su bölümü çizgileri belirler."],
        ["Okyanus", "Kıtaları ayıran çok büyük tuzlu su kütlesi", "Pasifik, Atlas ve Hint okyanusları başlıca okyanuslardandır."],
        ["Pasifik Okyanusu", "Dünya'nın en büyük okyanusu", "Pasifik Okyanusu yüzölçümü bakımından en büyüktür."],
        ["Sahra", "Kuzey Afrika'daki geniş sıcak çöl", "Sahra dünyanın en büyük sıcak çöllerindendir."],
        ["Nil", "Kuzeydoğu Afrika'da Akdeniz'e ulaşan büyük nehir", "Nil, Afrika'nın önemli su kaynaklarından biridir."],
        ["Amazon", "Güney Amerika'da çok büyük debiye sahip nehir sistemi", "Amazon havzası geniş yağmur ormanlarını içerir."],
        ["Himalayalar", "Dünyanın en yüksek zirvelerini içeren dağ sistemi", "Everest Himalayalar'da yer alır."],
        ["Everest", "Deniz seviyesine göre Dünya'nın en yüksek zirvesi", "Everest Himalayalar'dadır."],
        ["Japonya", "Doğu Asya'da bir ada ülkesi", "Japonya Pasifik Okyanusu'ndaki adalardan oluşur."],
        ["Avustralya", "Hem ülke adı hem de kıtasal kara kütlesi olarak kullanılan ad", "Avustralya Güney Yarımküre'dedir."],
        ["Afrika", "Ekvator'un geçtiği ve her iki yarımkürede toprağı bulunan kıta", "Afrika'nın büyük bölümü tropikal kuşaktadır."],
        ["Antarktika", "Güney Kutbu çevresindeki buzla kaplı kıta", "Antarktika kalıcı yerli nüfusa sahip değildir."],
        ["Arktik", "Kuzey Kutbu çevresindeki okyanus ve kara alanları", "Arktik bir kıtadan ziyade büyük ölçüde okyanus çevresidir."]
    ];
    addDefinitionSet("geography", "geo", "Coğrafya", geographyFacts, (index) => 1 + (index % 3));

    const capitals = [
        ["Fransa", "Paris"], ["Almanya", "Berlin"], ["İtalya", "Roma"], ["İspanya", "Madrid"],
        ["Portekiz", "Lizbon"], ["Yunanistan", "Atina"], ["Bulgaristan", "Sofya"], ["Romanya", "Bükreş"],
        ["Macaristan", "Budapeşte"], ["Avusturya", "Viyana"], ["Belçika", "Brüksel"], ["Hollanda", "Amsterdam"],
        ["İsviçre", "Bern"], ["Polonya", "Varşova"], ["Çekya", "Prag"], ["Slovakya", "Bratislava"],
        ["Norveç", "Oslo"], ["İsveç", "Stockholm"], ["Finlandiya", "Helsinki"], ["Danimarka", "Kopenhag"],
        ["İrlanda", "Dublin"], ["Birleşik Krallık", "Londra"], ["Kanada", "Ottawa"], ["Amerika Birleşik Devletleri", "Washington, DC"],
        ["Meksika", "Meksiko"], ["Brezilya", "Brasília"], ["Arjantin", "Buenos Aires"], ["Şili", "Santiago"],
        ["Peru", "Lima"], ["Kolombiya", "Bogotá"], ["Japonya", "Tokyo"], ["Güney Kore", "Seul"],
        ["Çin", "Pekin"], ["Hindistan", "Yeni Delhi"], ["Pakistan", "İslamabad"], ["Endonezya", "Cakarta"],
        ["Tayland", "Bangkok"], ["Vietnam", "Hanoi"], ["Avustralya", "Canberra"], ["Yeni Zelanda", "Wellington"],
        ["Mısır", "Kahire"], ["Fas", "Rabat"], ["Cezayir", "Cezayir"], ["Tunus", "Tunus"],
        ["Kenya", "Nairobi"], ["Etiyopya", "Addis Ababa"], ["Nijerya", "Abuja"], ["Suudi Arabistan", "Riyad"]
    ];
    const capitalAnswers = capitals.map((entry) => entry[1]);
    capitals.forEach(([country, capital], index) => add("geography", `capital-${index + 1}`, "Dünya Başkentleri", `${country} ülkesinin başkenti hangisidir?`, [capital, ...rotateDistractors(capitalAnswers, index)], `${country} ülkesinin başkenti ${capital}'dir.`, 1 + (index % 3)));

    const historyFacts = [
        ["Yazının icadı", "Tarih çağlarının başlamasında kullanılan temel dönüm noktası", "Yazılı kayıtlar tarihsel olayların doğrudan belgelenmesini sağlamıştır."],
        ["Matbaa", "Metin ve görsellerin çok sayıda kopyalanmasını hızlandıran buluş", "Matbaa bilginin daha geniş kitlelere yayılmasını kolaylaştırmıştır."],
        ["Sanayi Devrimi", "Makineleşme ve fabrika üretiminin hızla yayıldığı dönüşüm", "Sanayi Devrimi üretim, kentleşme ve ulaşımı köklü biçimde değiştirmiştir."],
        ["Rönesans", "Avrupa'da sanat, bilim ve klasik kültüre ilginin canlandığı dönem", "Rönesans özellikle 14-16. yüzyıllar arasında etkili olmuştur."],
        ["Reform", "Batı Hristiyanlığında dinî ve kurumsal değişim hareketleri", "Reform Avrupa'nın dinî ve siyasi yapısını etkilemiştir."],
        ["Fransız Devrimi", "1789'da başlayarak yurttaşlık ve egemenlik fikirlerini etkileyen devrim", "Fransız Devrimi modern siyasal düşünce üzerinde kalıcı etki bırakmıştır."],
        ["İpek Yolu", "Asya ile Avrupa arasında ticaret ve kültür aktarımını sağlayan tarihî güzergâhlar ağı", "İpek Yolu tek bir yol değil, bağlantılı kara ve deniz rotalarıydı."],
        ["Roma İmparatorluğu", "Akdeniz çevresinde uzun süre etkili olan antik devlet", "Roma hukuku, mimarisi ve yönetimi sonraki toplumları etkilemiştir."],
        ["Bizans İmparatorluğu", "Doğu Roma İmparatorluğu için yaygın kullanılan ad", "Başkenti Konstantinopolis olan devlet 1453'e kadar sürmüştür."],
        ["Selçuklular", "Orta Çağ'da İran, Anadolu ve çevresinde etkili Türk hanedanları", "Büyük Selçuklu ve Anadolu Selçuklu devletleri farklı dönemlerde hüküm sürmüştür."],
        ["Osmanlı Devleti", "Anadolu'da kurulup üç kıtada uzun süre hüküm süren devlet", "Osmanlı Devleti 14. yüzyıldan 20. yüzyıl başına kadar etkili olmuştur."],
        ["İstanbul'un Fethi", "1453'te İstanbul'un Osmanlı yönetimine geçmesi", "Fetih II. Mehmed döneminde gerçekleşmiştir."],
        ["Tanzimat Fermanı", "1839'da Osmanlı yönetiminde reform hedeflerini açıklayan belge", "Tanzimat dönemi idari ve hukuki değişimlerle anılır."],
        ["I. Dünya Savaşı", "1914 ile 1918 arasında süren küresel savaş", "Savaş birçok imparatorluğun dağılmasına ve sınırların değişmesine yol açtı."],
        ["Mondros Ateşkes Antlaşması", "Osmanlı Devleti için I. Dünya Savaşı'ndaki çatışmaları sona erdiren 1918 ateşkesi", "Ateşkes sonrasında Anadolu'da işgaller başladı."],
        ["19 Mayıs 1919", "Mustafa Kemal Paşa'nın Samsun'a çıkışıyla ilişkilendirilen tarih", "Bu tarih Millî Mücadele'nin önemli başlangıç sembollerindendir."],
        ["23 Nisan 1920", "Türkiye Büyük Millet Meclisinin açıldığı tarih", "TBMM Ankara'da açılmıştır."],
        ["Sakarya Meydan Muharebesi", "1921'de Millî Mücadele'nin önemli savunma savaşı", "Sakarya zaferi savaşın gidişini etkileyen dönüm noktalarındandır."],
        ["Büyük Taarruz", "1922'de işgal kuvvetlerine karşı başlatılan geniş çaplı askerî harekât", "Büyük Taarruz, Başkomutanlık Meydan Muharebesi ile sonuçlandı."],
        ["Lozan Barış Antlaşması", "1923'te Türkiye'nin uluslararası statüsünü belirleyen barış antlaşması", "Lozan, Millî Mücadele sonrası barış düzeninin temel belgelerindendir."],
        ["29 Ekim 1923", "Türkiye Cumhuriyeti'nin ilan edildiği tarih", "Cumhuriyetin ilanıyla devlet yönetiminin biçimi resmen belirlendi."],
        ["Harf Devrimi", "1928'de Türk alfabesinin Latin esaslı harflere geçirilmesi", "Yeni Türk harfleri eğitim ve yazışmalarda kullanılmaya başlandı."],
        ["Kadınlara milletvekili seçme ve seçilme hakkı", "Türkiye'de 1934'te tanınan siyasal hak", "1934 düzenlemesi kadınların milletvekili seçimlerine katılımını sağladı."],
        ["Birleşmiş Milletler", "1945'te uluslararası barış ve iş birliği amacıyla kurulan örgüt", "Birleşmiş Milletler II. Dünya Savaşı sonrasında kuruldu."],
        ["İnsan Hakları Evrensel Bildirgesi", "1948'de Birleşmiş Milletler Genel Kurulunda kabul edilen temel haklar belgesi", "Bildirge insan hakları için küresel bir referans metnidir."],
        ["Soğuk Savaş", "II. Dünya Savaşı sonrası iki büyük blok arasındaki uzun siyasi ve stratejik rekabet", "Dönem doğrudan küresel savaştan çok vekâlet savaşları ve rekabetle geçti."],
        ["Ay'a ilk insanlı iniş", "Apollo 11 görevinin 1969'da gerçekleştirdiği olay", "Neil Armstrong ve Buzz Aldrin Ay yüzeyine indi."],
        ["Berlin Duvarı'nın yıkılması", "1989'da Soğuk Savaş'ın sona yaklaşmasının sembollerinden biri", "Duvarın açılması Almanya'nın birleşme sürecini hızlandırdı."],
        ["Antik Olimpiyatlar", "Eski Yunan dünyasında düzenlenen spor ve dinî etkinlikler", "Modern Olimpiyatlar antik geleneğe atıfla yeniden başlatıldı."],
        ["Kâğıt", "Bilginin taşınmasını ve arşivlenmesini kolaylaştıran yazı malzemesi", "Kâğıdın yaygınlaşması eğitim, yönetim ve kültürü etkiledi."],
        ["Pusula", "Yön bulmayı kolaylaştırarak uzun deniz yolculuklarını geliştiren araç", "Pusula denizcilik ve keşif tarihinde önemli rol oynadı."],
        ["Buhar makinesi", "Sanayi Devrimi'nde üretim ve ulaşımı hızlandıran güç kaynağı", "Buhar makineleri fabrikalar, gemiler ve trenlerde kullanıldı."],
        ["Telgraf", "Elektrik sinyalleriyle uzak mesafeye hızlı mesaj ileten sistem", "Telgraf haberleşme süresini günlerden dakikalara düşürdü."],
        ["Fotoğraf", "Işığa duyarlı yöntemlerle kalıcı görüntü oluşturma teknolojisi", "Fotoğraf habercilik ve tarihsel belgelemede önemli araç oldu."],
        ["Radyo", "Ses yayınını elektromanyetik dalgalarla geniş kitlelere ulaştıran iletişim aracı", "Radyo 20. yüzyılda haber ve eğlencenin başlıca araçlarından biri oldu."],
        ["Televizyon", "Hareketli görüntü ve sesi uzaktan yayınlayan kitle iletişim aracı", "Televizyon canlı olayların geniş kitlelerce aynı anda izlenmesini sağladı."],
        ["İnternet", "Birçok bilgisayar ağını ortak protokollerle birbirine bağlayan küresel ağ", "İnternet bilgi paylaşımı ve iletişim biçimlerini değiştirdi."],
        ["Anadolu uygarlıkları", "Hitit, Frig, Urartu ve Lidya gibi toplumların ortak coğrafyası", "Anadolu tarih boyunca birçok uygarlığa ev sahipliği yaptı."],
        ["Göbeklitepe", "Şanlıurfa yakınlarında tarih öncesi anıtsal yapılarıyla bilinen arkeolojik alan", "Göbeklitepe avcı-toplayıcı toplulukların karmaşık yapılar kurabildiğini göstermiştir."],
        ["Çatalhöyük", "Konya yakınlarında Neolitik yerleşim kalıntıları bulunan arkeolojik alan", "Çatalhöyük erken yerleşik yaşamın önemli örneklerindendir."]
    ];
    addDefinitionSet("history", "history", "Tarih", historyFacts, (index) => 1 + (index % 3));

    const sportsFacts = [
        ["Ofsayt", "Futbolda hücum oyuncusunun pas anında belirli konum şartlarında rakip kale çizgisine top ve sondan ikinci rakipten daha yakın olmasıyla ilgili kural", "Ofsayt yalnızca konumla değil, aktif oyuna katılımla değerlendirilir."],
        ["Penaltı", "Futbolda ceza alanı içinde savunma takımının doğrudan serbest vuruş gerektiren ihlali sonrası kullanılan vuruş", "Penaltı vuruşu penaltı noktasından yapılır."],
        ["Korner", "Topun savunma oyuncusuna son temas edip kale çizgisinden çıkmasıyla hücum takımına verilen köşe vuruşu", "Korner sahanın köşe yayından kullanılır."],
        ["Taç", "Topun tamamının yan çizgiyi geçmesiyle oyunun elle başlatılması", "Taç atışı topa son dokunan takımın rakibine verilir."],
        ["Hat-trick", "Bir oyuncunun aynı maçta üç gol atması", "Hat-trick futbol başta olmak üzere bazı sporlarda kullanılan bir terimdir."],
        ["Set", "Voleybol ve teniste maçın bölümlerinden biri", "Maç sonucu kazanılan set sayısına göre belirlenebilir."],
        ["Servis", "Voleybol ve teniste oyunu başlatan vuruş", "Servis kuralları spora göre farklıdır."],
        ["Smaç", "Voleybolda topu güçlü biçimde rakip sahaya gönderen hücum vuruşu", "Smaç genellikle file yakınında sıçrayarak yapılır."],
        ["Blok", "Voleybolda rakip hücumunu file üzerinde durdurmaya yönelik hareket", "Blok oyuncuları topun rakip sahadan geçişini engellemeye çalışır."],
        ["Ace", "Teniste rakibin raketle dokunamadığı geçerli servis", "Ace doğrudan sayı kazandırır."],
        ["Tie-break", "Sette eşitliği çözmek için oynanan özel puanlama bölümü", "Tenis ve voleybolda farklı tie-break kuralları bulunur."],
        ["Ribaund", "Basketbolda kaçan şut sonrası topun yeniden kontrol edilmesi", "Hücum ve savunma ribaundu olarak ayrılır."],
        ["Asist", "Basketbolda sayı ile sonuçlanan doğrudan pas", "Asist takım arkadaşının skor üretmesini kolaylaştırır."],
        ["Turnike", "Basketbolda potaya yaklaşarak adımlarla yapılan yakın mesafe atış", "Turnike sağ veya sol taraftan uygulanabilir."],
        ["Üçlük", "Basketbolda üç sayı çizgisinin gerisinden atılan başarılı şut", "Ayak çizgiye basarsa atış iki sayı sayılabilir."],
        ["Serbest atış", "Basketbolda faul sonrası belirlenen çizgiden savunmasız kullanılan atış", "Başarılı serbest atış bir sayı değerindedir."],
        ["Maraton", "Yaklaşık 42,195 kilometrelik uzun mesafe koşusu", "Modern maratonun standart mesafesi 42 kilometre 195 metredir."],
        ["Bayrak yarışı", "Takım üyelerinin sırayla koşup bayrak devrettiği atletizm yarışı", "Devir belirlenen alan içinde yapılmalıdır."],
        ["Dekatlon", "Erkekler atletizminde geleneksel olarak on farklı branştan oluşan çoklu yarış", "Sporcular her branştaki performanslarına göre puan alır."],
        ["Triatlon", "Yüzme, bisiklet ve koşuyu art arda içeren dayanıklılık sporu", "Geçişler yarış süresine dahildir."],
        ["Minder", "Güreş ve judoda müsabakanın yapıldığı koruyucu yüzey", "Minder düşmelerde güvenlik ve tutuş sağlar."],
        ["İppon", "Judoda karşılaşmayı doğrudan kazandırabilen tam puan", "Teknik belirlenen ölçütleri tam karşılamalıdır."],
        ["Nakavt", "Dövüş sporlarında sporcunun sayım süresi içinde devam edememesi", "Nakavt karşılaşmayı sona erdirebilir."],
        ["Pole position", "Motor sporlarında yarışa ilk sıradan başlama hakkı", "Genellikle sıralama turlarındaki en hızlı dereceyle kazanılır."],
        ["Pit stop", "Motor sporlarında lastik, ayar veya onarım için pit alanında yapılan kısa duruş", "Pit stratejisi yarış sonucunu etkileyebilir."],
        ["Sarı bayrak", "Motor sporlarında pistte tehlike olduğunu ve dikkat gerektiğini bildiren işaret", "Sarı bayrak bölgesinde hız ve geçiş kuralları uygulanır."],
        ["Foto finiş", "Bitiş çizgisindeki çok yakın sonuçları görüntüyle belirleme yöntemi", "Özellikle atletizm ve at yarışlarında kullanılır."],
        ["Olimpiyat halkaları", "Olimpiyat hareketinin beş iç içe halkadan oluşan sembolü", "Sembol dünya sporcularının buluşmasını temsil eder."],
        ["Fair play", "Sporda kurallara, rakibe ve dürüst rekabete saygı anlayışı", "Fair play yalnızca kural ihlal etmemek değil etik davranışı da kapsar."],
        ["Hakem", "Müsabakada kuralları uygulayan ve karar veren görevli", "Hakem tarafsızlık ve oyun güvenliğinden sorumludur."],
        ["VAR", "Futbolda belirli kritik kararların video yardımcı hakem sistemiyle incelenmesi", "VAR yalnızca protokolde tanımlanmış olaylarda devreye girer."],
        ["Kaptan", "Takımı sahada temsil eden oyuncu", "Kaptan takım iletişimi ve liderliğinde rol alır."],
        ["Kaleci", "Futbolda kendi ceza alanında topu elle oynama ayrıcalığı olan oyuncu", "Kalecinin de kurallarla belirlenen sınırları vardır."],
        ["Libero", "Voleybolda savunma ve karşılama konusunda uzmanlaşmış farklı formalı oyuncu", "Liberonun hücum ve servis yetkileri kurallarla sınırlandırılır."],
        ["Grand Slam", "Teniste Avustralya Açık, Roland Garros, Wimbledon ve Amerika Açık turnuvalarının genel adı", "Bu dört turnuva tenis takviminin en prestijli etkinliklerindendir."],
        ["Wimbledon", "Çim kortta oynanan Grand Slam tenis turnuvası", "Wimbledon Londra'da düzenlenir."],
        ["Tour de France", "Fransa merkezli çok etaplı profesyonel yol bisikleti yarışı", "Yarış farklı etap ve klasmanlardan oluşur."],
        ["Formula 1", "Tek koltuklu açık tekerlekli otomobillerle düzenlenen üst düzey motor sporları serisi", "Takımlar ve sürücüler sezon boyunca puan toplar."],
        ["Paralimpik Oyunlar", "Engelli elit sporcuların katıldığı uluslararası çok sporlu organizasyon", "Paralimpik hareket sınıflandırma ve yüksek performans sporuna dayanır."],
        ["Doping", "Spor performansını haksız veya sağlığa zararlı biçimde etkileyen yasaklı madde ya da yöntem kullanımı", "Doping kontrolleri adil rekabeti ve sporcu sağlığını korumayı amaçlar."]
    ];
    addDefinitionSet("sports", "sport", "Spor Bilgisi", sportsFacts, (index) => 1 + (index % 3));

    const cityFacts = [
        ["İstanbul", "Boğaziçi Köprüsü'nün resmî adı 15 Temmuz Şehitler Köprüsü olan şehir", "Köprü İstanbul Boğazı'nın iki yakasını bağlar."],
        ["İstanbul", "Ayasofya, Topkapı Sarayı ve Kapalıçarşı'nın bulunduğu şehir", "Bu tarihî yapılar İstanbul'dadır."],
        ["İstanbul", "Marmaray ile iki kıtayı denizin altından demiryoluyla bağlayan şehir", "Marmaray İstanbul Boğazı'nın altından geçer."],
        ["İstanbul", "Haliç adı verilen doğal limanın bulunduğu şehir", "Haliç İstanbul'un tarihî coğrafyasının önemli parçasıdır."],
        ["İstanbul", "Türkiye'nin nüfus bakımından en büyük şehri", "İstanbul uzun süredir Türkiye'nin en kalabalık şehridir."],
        ["İstanbul", "Galata Kulesi'nin bulunduğu şehir", "Galata Kulesi Beyoğlu ilçesindedir."],
        ["İstanbul", "Dolmabahçe Sarayı'nın Boğaz kıyısında yer aldığı şehir", "Dolmabahçe Sarayı Beşiktaş'tadır."],
        ["İstanbul", "Adalar ilçesinin Marmara Denizi'nde bulunduğu şehir", "Büyükada ve Heybeliada İstanbul Adaları arasındadır."],
        ["Ankara", "Anıtkabir'in bulunduğu şehir", "Anıtkabir Mustafa Kemal Atatürk'ün anıt mezarıdır."],
        ["Ankara", "Türkiye Büyük Millet Meclisinin bulunduğu şehir", "TBMM Ankara'dadır."],
        ["Ankara", "Anadolu Medeniyetleri Müzesi'nin bulunduğu şehir", "Müze Anadolu arkeolojisine ilişkin koleksiyonlarıyla tanınır."],
        ["Ankara", "Tuz Gölü'ne yakın İç Anadolu büyükşehri", "Ankara'nın güneyinde Türkiye'nin büyük tuz göllerinden biri bulunur."],
        ["Ankara", "Türkiye Cumhuriyeti'nin başkenti", "Ankara 13 Ekim 1923'te başkent ilan edildi."],
        ["Ankara", "Ankara Kalesi'nin bulunduğu şehir", "Kale kentin tarihî merkezindedir."],
        ["Ankara", "Atatürk Orman Çiftliği'nin bulunduğu şehir", "Çiftlik Ankara'da kurulmuştur."],
        ["Ankara", "Kızılcahamam ve Beypazarı ilçeleriyle bilinen il", "Her iki ilçe de Ankara sınırlarındadır."],
        ["İzmir", "Saat Kulesi'nin Konak Meydanı'nda bulunduğu şehir", "İzmir Saat Kulesi şehrin simgelerindendir."],
        ["İzmir", "Efes Antik Kenti'ne yakın büyükşehir", "Efes, İzmir'in Selçuk ilçesi yakınındadır."],
        ["İzmir", "Kordon adı verilen kıyı şeridiyle tanınan şehir", "Kordon Alsancak boyunca uzanan sahil alanıdır."],
        ["İzmir", "Çeşme ve Foça ilçelerinin bağlı olduğu il", "Çeşme ve Foça İzmir ilçeleridir."],
        ["İzmir", "Ege Denizi kıyısındaki büyük liman şehri", "İzmir Körfezi şehrin coğrafyasını şekillendirir."],
        ["İzmir", "Kadifekale'nin bulunduğu şehir", "Kadifekale İzmir'e hâkim tarihî bir tepededir."],
        ["İzmir", "Bergama antik yerleşiminin bağlı olduğu il", "Bergama İzmir'in kuzeyindeki ilçedir."],
        ["İzmir", "Tarihî Asansör'ün bulunduğu şehir", "İzmir Tarihî Asansör Karataş bölgesindedir."],
        ["Trabzon", "Sümela Manastırı'nın yakınında bulunduğu şehir", "Sümela Manastırı Trabzon'un Maçka ilçesindedir."],
        ["Trabzon", "Uzungöl'ün bağlı olduğu il", "Uzungöl Trabzon'un Çaykara ilçesindedir."],
        ["Trabzon", "Karadeniz kıyısındaki tarihî liman şehri", "Trabzon Doğu Karadeniz kıyısındadır."],
        ["Trabzon", "Ayasofya Müzesi ve Atatürk Köşkü'nün bulunduğu şehir", "Her iki yapı da Trabzon'dadır."],
        ["Trabzon", "Boztepe'den şehir ve deniz manzarasının izlendiği kent", "Boztepe Trabzon merkezine hâkim bir noktadır."],
        ["Trabzon", "Hamsiköy sütlacıyla bilinen il", "Hamsiköy Trabzon'un Maçka ilçesindedir."],
        ["Trabzon", "Çay ve fındık üretimi yapılan Doğu Karadeniz çevresindeki şehir", "Nemli iklim bölgenin tarım ürünlerini etkiler."],
        ["Trabzon", "Trabzonspor'un merkezinin bulunduğu şehir", "Trabzonspor şehrin tanınmış spor kulübüdür."],
        ["Antalya", "Kaleiçi tarihî bölgesinin bulunduğu şehir", "Kaleiçi Antalya'nın tarihî kent merkezidir."],
        ["Antalya", "Düden Şelalesi'nin bulunduğu il", "Düden şelaleleri Antalya'dadır."],
        ["Antalya", "Aspendos Antik Tiyatrosu'nun bağlı olduğu il", "Aspendos Antalya'nın Serik ilçesi yakınındadır."],
        ["Antalya", "Türkiye'nin Akdeniz kıyısındaki büyük turizm şehirlerinden biri", "Antalya uzun kıyı şeridi ve antik kentleriyle tanınır."],
        ["Antalya", "Konyaaltı ve Lara plajlarının bulunduğu şehir", "Her iki kıyı alanı Antalya'dadır."],
        ["Antalya", "Olympos ve Phaselis antik kentlerine yakın il", "Bu antik yerleşimler Antalya sınırlarındadır."],
        ["Antalya", "Toros Dağları'nın denize yaklaştığı bölgede bulunan şehir", "Antalya çevresinde dağ ve kıyı coğrafyası iç içedir."],
        ["Antalya", "Alanya Kalesi'nin bağlı olduğu il", "Alanya Antalya'nın doğusundaki ilçedir."]
    ];
    const cityAnswers = ["İstanbul", "Ankara", "İzmir", "Trabzon", "Antalya"];
    cityFacts.forEach(([answer, clue, explanation], index) => add("cities", `city-${index + 1}`, "Şehir Bilgisi", `Bu bilgi hangi şehri anlatır: ${clue}?`, [answer, ...rotateDistractors(cityAnswers, cityAnswers.indexOf(answer))], explanation, 1 + (index % 3)));

    // Hesaplama soruları: her soru çalışma zamanında hazırlandığı için dosya boyutunu büyütmeden büyük ve benzersiz bir havuz sağlar.
    for (let i = 1; i <= 60; i += 1) {
        const a = 12 + i * 3;
        const b = 4 + (i % 11);
        const correct = a + b;
        add("math", `add-${i}`, "Hızlı Hesap", `${a} + ${b} işleminin sonucu kaçtır?`, [String(correct), String(correct + 2), String(correct - 3), String(correct + 5)], `${a} ile ${b} toplandığında ${correct} elde edilir.`, 1);
    }
    for (let i = 1; i <= 55; i += 1) {
        const b = 5 + (i % 9);
        const correct = 8 + i;
        const a = correct * b;
        add("math", `division-${i}`, "Hızlı Hesap", `${a} ÷ ${b} işleminin sonucu kaçtır?`, [String(correct), String(correct + 1), String(correct - 2), String(correct + 3)], `${a}, ${b}'ye bölündüğünde ${correct} olur.`, 1 + (i % 2));
    }
    for (let i = 1; i <= 45; i += 1) {
        const base = (10 + i) * 10;
        const percent = [10, 20, 25, 50][i % 4];
        const correct = (base * percent) / 100;
        add("math", `percent-${i}`, "Yüzde Hesabı", `${base} sayısının %${percent}'i kaçtır?`, [String(correct), String(correct + 7), String(correct + 13), String(Math.max(1, correct - 11))], `${base} × ${percent}/100 = ${correct}.`, 2);
    }
    const formatMinutes = (total) => `${Math.floor(total / 60)} saat ${total % 60} dakika`;
    for (let i = 1; i <= 40; i += 1) {
        const minutes = 30 + i * 5;
        const correct = formatMinutes(minutes);
        add("math", `time-${i}`, "Zaman Hesabı", `${minutes} dakika kaç saat ve dakikadır?`, [correct, formatMinutes(minutes + 60), formatMinutes(minutes + 15), formatMinutes(Math.max(0, minutes - 20))], `Her 60 dakika 1 saattir; ${minutes} dakika ${correct} eder.`, 2);
    }

    const generalFacts = [
        ["Kütüphane", "Kitap ve diğer bilgi kaynaklarının düzenlenip kullanıma sunulduğu kurum"],
        ["Müze", "Kültürel, bilimsel veya tarihî eserlerin korunduğu ve sergilendiği kurum"],
        ["Arşiv", "Belge ve kayıtların düzenli biçimde saklandığı koleksiyon"],
        ["Takvim", "Gün, ay ve yılların düzenini gösteren sistem"],
        ["Pusula", "Manyetik kuzey yönünü bulmaya yardım eden araç"],
        ["Termometre", "Sıcaklığı ölçen araç"],
        ["Barometre", "Atmosfer basıncını ölçen araç"],
        ["Higrometre", "Havadaki nemi ölçen araç"],
        ["Anemometre", "Rüzgâr hızını ölçen araç"],
        ["Kronometre", "Zaman aralığını hassas biçimde ölçen araç"],
        ["Mikroskop", "Çok küçük nesneleri büyüterek incelemeye yarayan araç"],
        ["Teleskop", "Uzak gök cisimlerini gözlemlemeye yarayan araç"],
        ["Stetoskop", "Vücut içindeki sesleri dinlemeye yarayan tıbbi araç"],
        ["Harita", "Yeryüzünün tamamının veya bir bölümünün ölçekli gösterimi"],
        ["Lejant", "Haritadaki işaret ve renklerin anlamını açıklayan bölüm"],
        ["Ölçek", "Haritadaki uzunluğun gerçek uzunluğa oranı"],
        ["Demokrasi", "Halkın yönetime doğrudan veya temsilcileri aracılığıyla katıldığı yönetim anlayışı"],
        ["Anayasa", "Devletin temel yapısını ve temel hakları düzenleyen en üst hukuk metni"],
        ["Belediye", "Yerel ortak hizmetleri yürüten kamu yönetimi birimi"],
        ["Gönüllülük", "Bir işe zorunluluk olmadan toplumsal katkı amacıyla katılma"],
        ["Eleştirel düşünme", "Bir iddiayı kanıt, tutarlılık ve farklı görüşler açısından değerlendirme"],
        ["Empati", "Başka bir kişinin duygu ve bakış açısını anlamaya çalışma"],
        ["İş birliği", "Ortak hedef için görev ve bilgilerin paylaşılması"],
        ["Planlama", "Amaç, kaynak ve adımları önceden düzenleme"],
        ["Geri dönüşüm", "Atık malzemenin yeniden işlenerek kullanılabilir ürüne dönüştürülmesi"],
        ["Yeniden kullanım", "Bir ürünü atmak yerine aynı veya farklı amaçla tekrar kullanma"],
        ["Enerji verimliliği", "Aynı hizmeti daha az enerji tüketerek sağlama"],
        ["Su tasarrufu", "Gereksiz su tüketimini azaltan davranışlar bütünü"],
        ["İlk yardım", "Profesyonel ekip gelene kadar olay yerindeki imkânlarla yapılan ilaçsız acil uygulama"],
        ["Acil durum planı", "Risk anında görev, iletişim ve tahliye adımlarını önceden belirleyen plan"],
        ["Toplanma alanı", "Afet sonrası güvenli biçimde bir araya gelmek için belirlenen yer"],
        ["Hijyen", "Sağlığı korumaya yönelik temizlik uygulamaları"],
        ["Dengeli beslenme", "Farklı besin gruplarını ihtiyaçlara uygun miktarlarda tüketme"],
        ["Uyku", "Vücudun ve beynin dinlenme ve düzenleme süreçlerini yürüttüğü doğal durum"],
        ["İletişim", "Bilgi, düşünce veya duygunun kişiler arasında aktarılması"],
        ["Beden dili", "Duruş, yüz ifadesi ve hareketlerle verilen sözsüz mesajlar"],
        ["Aktif dinleme", "Konuşanı dikkatle izleyip anladığını geri bildirimle gösterme"],
        ["Özet", "Bir metnin temel düşüncelerini daha kısa biçimde aktaran anlatım"],
        ["Ana fikir", "Bir metnin okuyucuya vermek istediği temel düşünce"],
        ["Kanıt", "Bir iddiayı destekleyen doğrulanabilir bilgi veya bulgu"]
    ];
    addDefinitionSet("general", "general", "Genel Kültür", generalFacts.map(([term, def]) => [term, def, `${term}, ${def.toLocaleLowerCase("tr-TR")}.`]), (index) => 1 + (index % 3));

    const all = Object.values(banks).flat();
    window.HABER_AVCISI_QUESTIONS = Object.freeze({
        banks,
        count: all.length,
        categories: Object.keys(banks)
    });
})();
