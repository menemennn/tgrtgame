(() => {
    "use strict";

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    function loadSprite(src) {
        const image = new Image();
        image.src = src;
        return image;
    }

    const characterSprites = {
        run: loadSprite("assets/character/reporter-run.png"),
        idle: loadSprite("assets/character/reporter-idle.png"),
        jump: loadSprite("assets/character/reporter-jump.png")
    };

    const SPRITE_FRAME_SIZE = 128;

    const ui = {
        scoreText: document.getElementById("scoreText"),
        bestText: document.getElementById("bestText"),
        levelBadge: document.getElementById("levelBadge"),
        missionTitle: document.getElementById("missionTitle"),
        missionText: document.getElementById("missionText"),
        progressText: document.getElementById("progressText"),
        progressBar: document.getElementById("progressBar"),
        tipText: document.getElementById("tipText"),
        heartList: document.getElementById("heartList"),
        evidenceText: document.getElementById("evidenceText"),
        evidenceGoalText: document.getElementById("evidenceGoalText"),
        cameraCount: document.getElementById("cameraCount"),
        micCount: document.getElementById("micCount"),
        fileCount: document.getElementById("fileCount"),
        checkpointList: document.getElementById("checkpointList"),
        objectiveText: document.getElementById("objectiveText"),
        totalStarsText: document.getElementById("totalStarsText"),
        profileRankText: document.getElementById("profileRankText"),
        profileLevelText: document.getElementById("profileLevelText"),
        routeStateText: document.getElementById("routeStateText"),
        dailyTaskList: document.getElementById("dailyTaskList"),

        menuOverlay: document.getElementById("menuOverlay"),
        briefingOverlay: document.getElementById("briefingOverlay"),
        miniGameOverlay: document.getElementById("miniGameOverlay"),
        levelCompleteOverlay: document.getElementById("levelCompleteOverlay"),
        mapOverlay: document.getElementById("mapOverlay"),
        profileOverlay: document.getElementById("profileOverlay"),
        questionOverlay: document.getElementById("questionOverlay"),
        broadcastOverlay: document.getElementById("broadcastOverlay"),
        pauseOverlay: document.getElementById("pauseOverlay"),
        gameOverOverlay: document.getElementById("gameOverOverlay"),
        completeOverlay: document.getElementById("completeOverlay"),

        questionTitle: document.getElementById("questionTitle"),
        questionMeta: document.getElementById("questionMeta"),
        questionText: document.getElementById("questionText"),
        answerList: document.getElementById("answerList"),
        questionFeedback: document.getElementById("questionFeedback"),

        meterNeedle: document.getElementById("meterNeedle"),
        broadcastButton: document.getElementById("broadcastButton"),
        broadcastResult: document.getElementById("broadcastResult"),
        starsText: document.getElementById("starsText"),
        resultTitle: document.getElementById("resultTitle"),
        resultText: document.getElementById("resultText"),
        nextLevelButton: document.getElementById("nextLevelButton"),

        gameOverText: document.getElementById("gameOverText"),
        completeText: document.getElementById("completeText"),

        briefingEyebrow: document.getElementById("briefingEyebrow"),
        briefingWeather: document.getElementById("briefingWeather"),
        briefingTitle: document.getElementById("briefingTitle"),
        briefingText: document.getElementById("briefingText"),
        briefingGoals: document.getElementById("briefingGoals"),
        briefingRouteText: document.getElementById("briefingRouteText"),

        miniGameLabel: document.getElementById("miniGameLabel"),
        miniGameTitle: document.getElementById("miniGameTitle"),
        miniGameText: document.getElementById("miniGameText"),
        miniGameArea: document.getElementById("miniGameArea"),
        miniGameFeedback: document.getElementById("miniGameFeedback"),
        miniGameAction: document.getElementById("miniGameAction"),

        levelCompleteTitle: document.getElementById("levelCompleteTitle"),
        levelStarsText: document.getElementById("levelStarsText"),
        levelCompleteText: document.getElementById("levelCompleteText"),
        levelScoreText: document.getElementById("levelScoreText"),
        levelEvidenceResult: document.getElementById("levelEvidenceResult"),
        levelDamageResult: document.getElementById("levelDamageResult"),
        levelMissionResult: document.getElementById("levelMissionResult"),
        unlockNotice: document.getElementById("unlockNotice"),

        chapterCards: document.getElementById("chapterCards"),
        mapRoute: document.getElementById("mapRoute"),
        mapSummaryText: document.getElementById("mapSummaryText"),
        profileModalRank: document.getElementById("profileModalRank"),
        profileModalLevel: document.getElementById("profileModalLevel"),
        profileXpText: document.getElementById("profileXpText"),
        profileXpBar: document.getElementById("profileXpBar"),
        cameraLevelText: document.getElementById("cameraLevelText"),
        microphoneLevelText: document.getElementById("microphoneLevelText"),
        bagLevelText: document.getElementById("bagLevelText"),
        achievementGrid: document.getElementById("achievementGrid"),

        eventBanner: document.getElementById("eventBanner"),
        eventIcon: document.getElementById("eventIcon"),
        eventTitle: document.getElementById("eventTitle"),
        eventText: document.getElementById("eventText"),
        toastStack: document.getElementById("toastStack"),
        screenFlash: document.getElementById("screenFlash"),
        decisionOverlay: document.getElementById("decisionOverlay"),
        decisionTitle: document.getElementById("decisionTitle"),
        decisionText: document.getElementById("decisionText"),
        decisionTimer: document.getElementById("decisionTimer"),
        decisionOptions: document.getElementById("decisionOptions"),
        interviewOverlay: document.getElementById("interviewOverlay"),
        interviewTitle: document.getElementById("interviewTitle"),
        interviewText: document.getElementById("interviewText"),
        interviewOptions: document.getElementById("interviewOptions"),
        interviewFeedback: document.getElementById("interviewFeedback"),
        fieldPhotoOverlay: document.getElementById("fieldPhotoOverlay"),
        fieldPhotoTitle: document.getElementById("fieldPhotoTitle"),
        fieldPhotoText: document.getElementById("fieldPhotoText"),
        photoNeedle: document.getElementById("photoNeedle"),
        fieldPhotoFeedback: document.getElementById("fieldPhotoFeedback"),
        reportBossOverlay: document.getElementById("reportBossOverlay"),
        reportBossText: document.getElementById("reportBossText"),
        reportBossSteps: document.getElementById("reportBossSteps"),
        reportBossChallenge: document.getElementById("reportBossChallenge"),
        reportBossFeedback: document.getElementById("reportBossFeedback"),
        droneHud: document.getElementById("droneHud"),
        droneTimerText: document.getElementById("droneTimerText"),
        droneObjectiveText: document.getElementById("droneObjectiveText"),
        droneTargetList: document.getElementById("droneTargetList"),
        deadlineWidget: document.getElementById("deadlineWidget"),
        deadlineText: document.getElementById("deadlineText"),
        deadlineObjective: document.getElementById("deadlineObjective"),
        deadlineBar: document.getElementById("deadlineBar"),
        radioPanel: document.getElementById("radioPanel"),
        radioSpeaker: document.getElementById("radioSpeaker"),
        radioText: document.getElementById("radioText"),
        interactionHint: document.getElementById("interactionHint"),
        interactionHintText: document.getElementById("interactionHintText"),
        bagQualityText: document.getElementById("bagQualityText"),
        bagQualityBar: document.getElementById("bagQualityBar"),
        branchStatusText: document.getElementById("branchStatusText"),
        droneStatusText: document.getElementById("droneStatusText"),
        secretStatusText: document.getElementById("secretStatusText"),
        helperStatusText: document.getElementById("helperStatusText"),
        todayEventsOverlay: document.getElementById("todayEventsOverlay"), todayEventCards: document.getElementById("todayEventCards"),
        collectionOverlay: document.getElementById("collectionOverlay"), collectionGrid: document.getElementById("collectionGrid"),
        rankingOverlay: document.getElementById("rankingOverlay"), rankingList: document.getElementById("rankingList"),
        settingsOverlay: document.getElementById("settingsOverlay"), compactHudToggle: document.getElementById("compactHudToggle"), dynamicWeatherToggle: document.getElementById("dynamicWeatherToggle"), cameraShakeToggle: document.getElementById("cameraShakeToggle"),
        liveTvOverlay: document.getElementById("liveTvOverlay"), tvCityText: document.getElementById("tvCityText"), tvClockText: document.getElementById("tvClockText"), tvQualityText: document.getElementById("tvQualityText"), tvBreakingText: document.getElementById("tvBreakingText"), tvHeadlineText: document.getElementById("tvHeadlineText"), tvTickerText: document.getElementById("tvTickerText"), tvReportText: document.getElementById("tvReportText"),
        missionHudCard: document.getElementById("missionHudCard"), missionHudIcon: document.getElementById("missionHudIcon"), missionHudTitle: document.getElementById("missionHudTitle"), missionHudTimer: document.getElementById("missionHudTimer"), missionHudText: document.getElementById("missionHudText"), missionHudActions: document.getElementById("missionHudActions"),
        vehicleHud: document.getElementById("vehicleHud"), vehicleIcon: document.getElementById("vehicleIcon"), vehicleTitle: document.getElementById("vehicleTitle"), vehicleObjective: document.getElementById("vehicleObjective"), vehicleProgressBar: document.getElementById("vehicleProgressBar"),
        weatherIcon: document.getElementById("weatherIcon"), weatherPeriodText: document.getElementById("weatherPeriodText"), weatherConditionText: document.getElementById("weatherConditionText"),
        qualityText: document.getElementById("qualityText"), qualityBar: document.getElementById("qualityBar"), reputationText: document.getElementById("reputationText"), reputationRankText: document.getElementById("reputationRankText"), topReputationText: document.getElementById("topReputationText"),
        menuReputationText: document.getElementById("menuReputationText"), menuBroadcastCount: document.getElementById("menuBroadcastCount"), menuCollectionCount: document.getElementById("menuCollectionCount"), menuQuestionCount: document.getElementById("menuQuestionCount"), menuContinueMission: document.getElementById("menuContinueMission"), menuContinueCity: document.getElementById("menuContinueCity"), menuProgressText: document.getElementById("menuProgressText"), menuProgressBar: document.getElementById("menuProgressBar"), deskHeadline: document.getElementById("deskHeadline"), newsTickerText: document.getElementById("newsTickerText"),
        profileReputationText: document.getElementById("profileReputationText"), profileReputationRank: document.getElementById("profileReputationRank"), radioAvatar: document.getElementById("radioAvatar"),
        levelQualityResult: document.getElementById("levelQualityResult"), levelReputationResult: document.getElementById("levelReputationResult"), levelViewerResult: document.getElementById("levelViewerResult"), levelSecretResult: document.getElementById("levelSecretResult")
    };

    const buttons = {
        start: document.getElementById("startButton"),
        pause: document.getElementById("pauseButton"),
        resume: document.getElementById("resumeButton"),
        restartLevel: document.getElementById("restartLevelButton"),
        retry: document.getElementById("retryButton"),
        menu: document.getElementById("menuButton"),
        playAgain: document.getElementById("playAgainButton"),
        mobileLeft: document.getElementById("mobileLeft"),
        mobileJump: document.getElementById("mobileJump"),
        mobileRight: document.getElementById("mobileRight"),
        chapterMap: document.getElementById("chapterMapButton"),
        profile: document.getElementById("profileButton"),
        beginLevel: document.getElementById("beginLevelButton"),
        levelNext: document.getElementById("levelNextButton"),
        levelMenu: document.getElementById("levelMenuButton"),
        closeMap: document.getElementById("closeMapButton"),
        closeProfile: document.getElementById("closeProfileButton"),
        mobileAction: document.getElementById("mobileAction"),
        photoCapture: document.getElementById("photoCaptureButton"),
        todayEvents: document.getElementById("todayEventsButton"), closeTodayEvents: document.getElementById("closeTodayEventsButton"), collection: document.getElementById("collectionButton"), closeCollection: document.getElementById("closeCollectionButton"), ranking: document.getElementById("rankingButton"), closeRanking: document.getElementById("closeRankingButton"), settings: document.getElementById("settingsButton"), closeSettings: document.getElementById("closeSettingsButton"), closeLiveTv: document.getElementById("closeLiveTvButton")
    };

    const W = canvas.width;
    const H = canvas.height;
    const GROUND_Y = 610;
    const GRAVITY = 2150;
    const MOVE_SPEED = 330;
    const JUMP_SPEED = 815;
    const MAX_HEARTS = 3;
    const MAX_SAFE_PLATFORM_RISE = 135;
    const MIN_PLATFORM_LANDING_GAP = 105;
    const MIN_GROUND_SEQUENCE_GAP = 85;
    const PROFILE_STORAGE_KEY = "haberAvcisiProfileV5";
    const LEGACY_PROFILE_STORAGE_KEY = "haberAvcisiProfileV3";
    const DAILY_STORAGE_KEY = "haberAvcisiDailyV5";
    const SETTINGS_STORAGE_KEY = "haberAvcisiSettingsV5";
    const QUESTION_HISTORY_STORAGE_KEY = "haberAvcisiQuestionHistoryV52";
    const QUESTION_HISTORY_LIMIT = 90;
    const QUESTION_CATEGORY_LABELS = {
        general: "Genel kültür", media: "Medya", traffic: "Trafik", flood: "Sel güvenliği",
        fire: "Yangın", storm: "Fırtına", technology: "Teknoloji", science: "Bilim",
        geography: "Coğrafya", history: "Tarih", sports: "Spor", cities: "Şehirler", math: "Hızlı hesap"
    };
    const QUESTION_DIFFICULTY_LABELS = ["", "Kolay", "Orta", "Zor"];

    const RANKS = [
        "Stajyer Muhabir",
        "Saha Muhabiri",
        "Kıdemli Muhabir",
        "Canlı Yayın Uzmanı",
        "Haber Şefi",
        "Baş Muhabir"
    ];

    const ACHIEVEMENTS = [
        { id: "first-report", icon: "🎙", name: "İlk Canlı", text: "İlk bölümü tamamla." },
        { id: "collector", icon: "📁", name: "Arşivci", text: "Toplam 25 delil topla." },
        { id: "perfect-live", icon: "📡", name: "Tam Zamanında", text: "Canlı yayında mükemmel zamanlama yap." },
        { id: "clean-run", icon: "🛡", name: "Kazasız Görev", text: "Bir bölümü hasar almadan bitir." },
        { id: "route-master", icon: "↗", name: "Kestirme Ustası", text: "3 ödüllü rota tamamla." },
        { id: "all-reports", icon: "🏆", name: "Türkiye Muhabiri", text: "Beş şehir görevini de tamamla." },
        { id: "nine-stars", icon: "⭐", name: "Kusursuz Dosya", text: "Toplam 12 bölüm yıldızı kazan." },
        { id: "trusted", icon: "🛡", name: "Güvenilir Muhabir", text: "TGRT Güven puanını 80 üzerine çıkar." },
        { id: "museum", icon: "🏛", name: "Basın Tarihçisi", text: "10 koleksiyon parçası bul." },
        { id: "daily-pro", icon: "☀", name: "Günlük Editör", text: "Üç günlük görevi aynı gün tamamla." }
    ];

    function safeParse(value, fallback) {
        try {
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.warn("Kayıt okunamadı, varsayılan ayarlar kullanılacak.", error);
            return fallback;
        }
    }

    function loadQuestionHistory() {
        const saved = safeParse(localStorage.getItem(QUESTION_HISTORY_STORAGE_KEY), []);
        return Array.isArray(saved) ? saved.filter((id) => typeof id === "string").slice(-QUESTION_HISTORY_LIMIT) : [];
    }

    function saveQuestionHistory(ids) {
        localStorage.setItem(QUESTION_HISTORY_STORAGE_KEY, JSON.stringify(ids.slice(-QUESTION_HISTORY_LIMIT)));
    }

    function defaultProfile() {
        return { xp:0, reputation:50, unlockedLevel:1, levelRecords:Array.from({length:5},()=>({stars:0,bestScore:0})), achievements:{}, collections:{}, storyFlags:{}, totals:{evidence:0,routes:0,levels:0,correct:0,broadcasts:0,viewers:0} };
    }

    function loadProfile() {
        const saved = safeParse(localStorage.getItem(PROFILE_STORAGE_KEY), null) || safeParse(localStorage.getItem(LEGACY_PROFILE_STORAGE_KEY), defaultProfile());
        const base = defaultProfile();
        return {
            ...base,
            ...saved,
            levelRecords: base.levelRecords.map((record, index) => ({ ...record, ...(saved.levelRecords?.[index] || {}) })),
            achievements: { ...base.achievements, ...(saved.achievements || {}) }, collections:{...base.collections,...(saved.collections||{})}, storyFlags:{...base.storyFlags,...(saved.storyFlags||{})},
            totals: { ...base.totals, ...(saved.totals || {}) }
        };
    }

    const state = {
        mode: "menu",
        levelIndex: 0,
        score: 0,
        best: Number(localStorage.getItem("haberAvcisiBest") || 0),
        hearts: MAX_HEARTS,
        cameraX: 0,
        lastTime: 0,
        elapsed: 0,
        levelElapsed: 0,
        currentQuestionGate: null,
        broadcastValue: 0,
        broadcastDirection: 1,
        broadcastResolved: false,
        level: null,
        usedQuestionIds: new Set(),
        recentQuestionIds: loadQuestionHistory(),
        questionCategoryHistory: [],
        usedMiniMissionIds: new Set(),
        profile: loadProfile(),
        daily: null,
        miniGame: null,
        activeEvent: null,
        activeBonus: null,
        cameraShake: 0,
        flashTimer: 0,
        currentRoute: null,
        levelStartScore: 0,
        levelResult: null,
        selectedLevelIndex: 0,
        decision: null,
        deadline: null,
        droneMission: null,
        fieldPhoto: null,
        interview: null,
        secretRun: null,
        helper: null,
        radioQueue: [],
        activeRadio: null,
        cameraZoom: 1,
        cameraTargetZoom: 1,
        cameraYOffset: 0,
        cameraTargetYOffset: 0,
        cinematicTimer: 0,
        interactionZone: null,
        eventBannerTimer: 0,
        lastToastAt: 0,
        reportBoss: null,
        branchChoice: null,
        secretsFound: 0, atmosphere:null, broadcastQuality:50, reputationAtLevelStart:50, vehicleSequence:null, environmentalPuzzle:null, hiddenMission:null, tickerQueue:[], tickerIndex:0, settings:null,
        metrics: {
            damage: 0,
            correct: 0,
            wrong: 0,
            miniMissions: 0,
            rewardRoutes: 0,
            evidence: 0,
            broadcastDistance: 100,
            droneTargets: 0,
            interviews: 0,
            photos: 0,
            secrets: 0,
            deadlineSuccess: 0,
            bossQuality: 0,
            helperSaves: 0, puzzleSuccess:0, vehicleSuccess:0, hiddenMissionSuccess:0, reputationDelta:0, viewers:0
        },
        inventory: {
            camera: 0,
            microphone: 0,
            file: 0
        }
    };

    const input = {
        left: false,
        right: false,
        up: false,
        down: false,
        jumpPressed: false,
        actionPressed: false
    };

    const player = {
        x: 150,
        y: GROUND_Y - 86,
        prevX: 150,
        prevY: GROUND_Y - 86,
        width: 46,
        height: 86,
        vx: 0,
        vy: 0,
        facing: 1,
        grounded: false,
        coyote: 0,
        invincible: 0,
        checkpointX: 150,
        runCycle: 0
    };

    const QUESTION_BANKS = {
        general: [
            {
                id: "g-source",
                title: "Kaynak Kontrolü",
                text: "Bir bilgiyi son dakika olarak vermeden önce en doğru adım hangisidir?",
                answers: ["En az iki güvenilir kaynaktan doğrulamak", "İlk paylaşanı doğrudan kaynak kabul etmek", "Yorum sayısı fazlaysa yayınlamak"],
                correct: 0
            },
            {
                id: "g-image",
                title: "Görüntü Doğrulama",
                text: "Sosyal medyadaki bir görüntünün güncel olup olmadığını anlamak için ne yapılmalıdır?",
                answers: ["Kaynağı, tarihini ve olayla bağlantısını kontrol etmek", "Yüksek çözünürlüklüyse doğru kabul etmek", "Üzerindeki yazıya güvenmek"],
                correct: 0
            },
            {
                id: "g-private",
                title: "Mahremiyet",
                text: "Bir olay yerinde yaralıların görüntülerini kullanırken hangisi doğrudur?",
                answers: ["Mahremiyeti koruyup gerekli bulanıklaştırmayı yapmak", "Yüzleri yakın planda göstermek", "İsimleri teyitsiz paylaşmak"],
                correct: 0
            },
            {
                id: "g-correction",
                title: "Düzeltme",
                text: "Yayında yanlış bilgi verildiği fark edilirse ne yapılmalıdır?",
                answers: ["Hızla ve açık biçimde düzeltme yayınlamak", "Konuyu sessizce kaldırmak", "Yanlış bilgiyi tekrar etmek"],
                correct: 0
            },
            {
                id: "g-headline",
                title: "Başlık Seçimi",
                text: "Haber başlığı nasıl olmalıdır?",
                answers: ["Doğrulanmış içeriği doğru ve açık biçimde yansıtmalı", "Mümkün olduğunca korkutucu olmalı", "Haberde olmayan ayrıntılar eklemeli"],
                correct: 0
            },
            {
                id: "g-witness",
                title: "Tanık Bilgisi",
                text: "Bir görgü tanığının anlattıkları nasıl kullanılmalıdır?",
                answers: ["Diğer kaynaklarla karşılaştırılarak ve tanık olduğu belirtilerek", "Tek başına kesin gerçek gibi", "Kimliği izinsiz açıklanarak"],
                correct: 0
            },
            {
                id: "g-live",
                title: "Canlı Yayın",
                text: "Canlı yayında doğrulanmamış yeni bir iddia gelirse ne yapılmalıdır?",
                answers: ["Doğrulanmadığı açıkça belirtilmeli veya yayına alınmamalı", "Kesin bilgi gibi söylenmeli", "Daha dikkat çekici hale getirilmeli"],
                correct: 0
            },
            {
                id: "g-child",
                title: "Çocukların Korunması",
                text: "Çocukların yer aldığı hassas bir haberde temel yaklaşım nedir?",
                answers: ["Kimlik ve güvenliği korumak", "Tam isim ve okul bilgisi vermek", "Yakın plan görüntü kullanmak"],
                correct: 0
            },
            {
                id: "g-official",
                title: "Resmî Açıklama",
                text: "Yetkili kurum açıklamasıyla sosyal medya iddiası çelişiyorsa ne yapılmalıdır?",
                answers: ["Her iki bilginin kaynağını araştırıp doğrulama tamamlanana kadar temkinli davranmak", "En çok beğeni alanı seçmek", "İkisini birleştirip yeni bir bilgi üretmek"],
                correct: 0
            },
            {
                id: "g-safety",
                title: "Saha Güvenliği",
                text: "Muhabirin olay yerindeki ilk önceliği nedir?",
                answers: ["Kendisinin ve çevresindekilerin güvenliği", "En yakın görüntüyü almak", "Güvenlik şeridini aşmak"],
                correct: 0
            }
        ],
        traffic: [
            {
                id: "t-location",
                title: "Kaza Konumu",
                text: "Trafik kazası haberinde önce hangi bilgi doğrulanmalıdır?",
                answers: ["Olayın yeri, zamanı ve yetkili ekiplerden alınan temel bilgiler", "Araçların sosyal medyadaki tahmini fiyatı", "Yoldan geçenlerin yorum sayısı"],
                correct: 0
            },
            {
                id: "t-lane",
                title: "Güvenli Konum",
                text: "Kaza yerinde çekim için en güvenli konum hangisidir?",
                answers: ["Güvenlik şeridinin dışında ve ekiplerin gösterdiği alan", "Araçların arasındaki boşluk", "Trafiğin aktığı şerit"],
                correct: 0
            },
            {
                id: "t-license",
                title: "Kişisel Bilgi",
                text: "Kaza görüntülerinde araç plakaları için ne yapılmalıdır?",
                answers: ["Gerektiğinde mahremiyet amacıyla bulanıklaştırılmalıdır", "Her zaman büyük biçimde gösterilmelidir", "Teyitsiz olarak araç sahibinin adı yazılmalıdır"],
                correct: 0
            },
            {
                id: "t-route",
                title: "Trafik Bilgisi",
                text: "Yol kapanışı bilgisi hangi kaynaktan teyit edilmelidir?",
                answers: ["Trafik birimleri ve resmî duyurulardan", "Kaynağı belirsiz mesajlardan", "Eski bir navigasyon ekranından"],
                correct: 0
            },
            {
                id: "t-ambulance",
                title: "Acil Ekipler",
                text: "Ambulans ve itfaiye çalışırken muhabir nasıl davranmalıdır?",
                answers: ["Geçiş ve çalışma alanını açık bırakmalıdır", "Aracın önünde çekim yapmalıdır", "Ekiplere yaklaşarak yolu kapatmalıdır"],
                correct: 0
            },
            {
                id: "t-cause",
                title: "Kaza Nedeni",
                text: "Kazanın nedeni henüz açıklanmadıysa nasıl aktarılmalıdır?",
                answers: ["Nedenin araştırıldığı belirtilmelidir", "Tahmin edilen neden kesinmiş gibi söylenmelidir", "En ilginç söylenti seçilmelidir"],
                correct: 0
            },
            {
                id: "t-number",
                title: "Sayıların Doğruluğu",
                text: "Yaralı sayısı farklı kaynaklarda değişiyorsa ne yapılmalıdır?",
                answers: ["Yetkili açıklama beklenmeli ve belirsizlik açıkça belirtilmelidir", "En yüksek sayı kullanılmalıdır", "Sayılar toplanmalıdır"],
                correct: 0
            },
            {
                id: "t-detour",
                title: "Alternatif Yol",
                text: "Sürücülere alternatif güzergâh önerirken hangi bilgi kullanılmalıdır?",
                answers: ["Güncel ve resmî trafik yönlendirmesi", "Muhabirin kişisel tahmini", "Geçen haftanın yol durumu"],
                correct: 0
            }
        ],
        flood: [
            {
                id: "f-route",
                title: "Güvenli Rota",
                text: "Sel bölgesinde en güvenli ilerleme yöntemi hangisidir?",
                answers: ["Resmî uyarıları takip ederek yüksek ve güvenli güzergâhı kullanmak", "Derinliği bilinmeyen sudan geçmek", "Kapalı yola girmek"],
                correct: 0
            },
            {
                id: "f-water",
                title: "Su Derinliği",
                text: "Derinliği bilinmeyen su birikintisine yaklaşırken ne yapılmalıdır?",
                answers: ["Uzak durulmalı ve güvenli alternatif yol seçilmelidir", "Hızla içinden geçilmelidir", "Sadece kamerayı yukarı kaldırmak yeterlidir"],
                correct: 0
            },
            {
                id: "f-evacuation",
                title: "Tahliye",
                text: "Tahliye bilgisi hangi kaynaktan doğrulanmalıdır?",
                answers: ["Yetkili kurumların güncel açıklamalarından", "Kaynağı bilinmeyen ses kaydından", "Yorum bölümünden"],
                correct: 0
            },
            {
                id: "f-electric",
                title: "Elektrik Tehlikesi",
                text: "Sel suyuna temas eden elektrik hattı görülürse ne yapılmalıdır?",
                answers: ["Bölgeden uzaklaşıp yetkililere haber verilmelidir", "Yakından görüntü alınmalıdır", "Kablo elle kaldırılmalıdır"],
                correct: 0
            },
            {
                id: "f-rain",
                title: "Yağış Verisi",
                text: "Yağış miktarı bilgisi nereden alınmalıdır?",
                answers: ["Meteoroloji ve yetkili kurum verilerinden", "Sadece kişisel gözlemden", "Eski bir hava durumu ekranından"],
                correct: 0
            },
            {
                id: "f-rescue",
                title: "Kurtarma Alanı",
                text: "Kurtarma ekipleri çalışırken çekim nasıl yapılmalıdır?",
                answers: ["Ekiplerin alanını engellemeden güvenli mesafeden", "Kurtarma aracının önünden", "Yasak bölgeye girerek"],
                correct: 0
            },
            {
                id: "f-map",
                title: "Bölge Bilgisi",
                text: "Selden etkilenen alanı anlatırken ne kullanılmalıdır?",
                answers: ["Doğrulanmış harita ve yer bilgileri", "Tahmini çizilmiş rastgele sınırlar", "Eski bir sel haritası"],
                correct: 0
            },
            {
                id: "f-warning",
                title: "Uyarı Dili",
                text: "Halka yönelik sel uyarısı nasıl verilmelidir?",
                answers: ["Açık, sakin ve uygulanabilir yönlendirmelerle", "Panik oluşturacak ifadelerle", "Kaynağı olmayan tahminlerle"],
                correct: 0
            }
        ],
        sports: [
            {
                id: "s-consent",
                title: "Röportaj Onayı",
                text: "Bir taraftar röportajını yayınlamadan önce ne yapılmalıdır?",
                answers: ["Yayın için onayı alınmalıdır", "Gizlice kayıt yapılmalıdır", "Kimliği izinsiz paylaşılmalıdır"],
                correct: 0
            },
            {
                id: "s-result",
                title: "Maç Sonucu",
                text: "Maç sonucuyla ilgili en güvenilir kaynak hangisidir?",
                answers: ["Resmî müsabaka verisi ve yetkili açıklama", "Tribündeki bir tahmin", "Eski tarihli paylaşım"],
                correct: 0
            },
            {
                id: "s-lineup",
                title: "Kadro Bilgisi",
                text: "İlk 11 bilgisi ne zaman kesin olarak verilmelidir?",
                answers: ["Resmî kadro açıklandıktan sonra", "Taraftar tahmini geldiğinde", "Bir önceki maçın kadrosuna bakarak"],
                correct: 0
            },
            {
                id: "s-injury",
                title: "Sakatlık Haberi",
                text: "Bir oyuncunun sağlık durumu nasıl aktarılmalıdır?",
                answers: ["Kulüp veya yetkili sağlık açıklamasına dayanarak", "Tribün söylentisine göre", "Görüntüden teşhis koyarak"],
                correct: 0
            },
            {
                id: "s-crowd",
                title: "Kalabalık Güvenliği",
                text: "Yoğun taraftar kalabalığında muhabir nasıl hareket etmelidir?",
                answers: ["Belirlenen basın ve güvenlik güzergâhlarını kullanmalıdır", "Kalabalığı yararak ilerlemelidir", "Çıkış kapısını kapatmalıdır"],
                correct: 0
            },
            {
                id: "s-quote",
                title: "Açıklama Kullanımı",
                text: "Teknik direktörün sözleri haberde nasıl kullanılmalıdır?",
                answers: ["Bağlamı korunarak ve doğru alıntıyla", "Anlamı değiştirilerek", "Söylemediği cümleler eklenerek"],
                correct: 0
            },
            {
                id: "s-scoreboard",
                title: "Skor Kontrolü",
                text: "Stadyum ekranıyla yayın grafiği farklıysa ne yapılmalıdır?",
                answers: ["Resmî maç verisi kontrol edilmelidir", "Rastgele biri seçilmelidir", "İki skor toplanmalıdır"],
                correct: 0
            },
            {
                id: "s-fan",
                title: "Taraftar Görüntüsü",
                text: "Taraftar görüntüsü kullanılırken hangi yaklaşım doğrudur?",
                answers: ["Aşağılayıcı veya yanıltıcı bağlam oluşturmamak", "Tek kişiyi tüm taraftarlar gibi göstermek", "İzinsiz kişisel bilgi eklemek"],
                correct: 0
            }
        ]
    };

    const externalQuestionBanks = window.HABER_AVCISI_QUESTIONS?.banks || {};
    Object.entries(externalQuestionBanks).forEach(([name, questions]) => {
        QUESTION_BANKS[name] = [...(QUESTION_BANKS[name] || []), ...questions];
    });

    const MINI_MISSION_POOLS = {
        traffic: [
            {
                id: "traffic-source",
                type: "source",
                label: "KAYNAK DOĞRULAMA",
                title: "Güvenilir Bilgiyi Seç",
                text: "Kaza noktasına ilişkin ilk teyidi hangi kaynaktan almalısın?",
                options: [
                    { title: "Trafik ekipleri ve resmî açıklama", detail: "Konum, yol durumu ve güvenlik bilgisi", correct: true },
                    { title: "Kaynağı belirsiz mesaj", detail: "İletildi ibaresi dışında bilgi yok", correct: false },
                    { title: "Eski tarihli sosyal medya videosu", detail: "Görüntünün yeri ve zamanı uyuşmuyor", correct: false }
                ]
            },
            {
                id: "traffic-photo",
                type: "photo",
                label: "KAMERA GÖREVİ",
                title: "Güvenli Kadrajı Yakala",
                text: "Kamerayı güvenlik şeridinin dışından olay alanına hizala."
            },
            {
                id: "traffic-sequence",
                type: "sequence",
                label: "YAYIN HAZIRLIĞI",
                title: "Adımları Sırala",
                text: "Canlı yayın öncesi işlemleri doğru sırayla seç.",
                steps: ["Güvenli konumu belirle", "Bilgiyi teyit et", "Canlı yayına bağlan"]
            }
        ],
        flood: [
            {
                id: "flood-source",
                type: "source",
                label: "TAHLİYE BİLGİSİ",
                title: "Doğru Kaynağı Bul",
                text: "Tahliye güzergâhı için hangi bilgi kullanılmalıdır?",
                options: [
                    { title: "Yetkili kurumun güncel duyurusu", detail: "Saat ve bölge bilgisi doğrulanmış", correct: true },
                    { title: "Komşu grubu mesajı", detail: "Kaynağı ve zamanı belirsiz", correct: false },
                    { title: "Geçen yıla ait sel haritası", detail: "Güncel durumu göstermiyor", correct: false }
                ]
            },
            {
                id: "flood-headline",
                type: "headline",
                label: "EDİTÖR GÖREVİ",
                title: "Doğru Başlığı Seç",
                text: "Panik yaratmadan doğrulanmış bilgiyi yansıtan başlığı seç.",
                options: [
                    { text: "Yetkililer üç mahallede tedbir amaçlı tahliye başlattı", correct: true },
                    { text: "Şehrin tamamı sular altında kaldı!", correct: false },
                    { text: "Bilinmeyen felaket herkesi kaçırdı", correct: false }
                ]
            },
            {
                id: "flood-photo",
                type: "photo",
                label: "KAMERA GÖREVİ",
                title: "Su Seviyesini Belgele",
                text: "Tehlikeli alana girmeden ölçüm levhasını kadraja al."
            }
        ],
        sports: [
            {
                id: "sports-interview",
                type: "interview",
                label: "RÖPORTAJ GÖREVİ",
                title: "Doğru Kişiye Ulaş",
                text: "Maç sonucu ve resmî değerlendirme için kimi seçmelisin?",
                options: [
                    { title: "Yetkili kulüp sözcüsü", detail: "Kimliği ve görevi doğrulanmış", correct: true },
                    { title: "Tribündeki anonim hesap sahibi", detail: "İddiaları doğrulanmamış", correct: false },
                    { title: "Maçla ilgisi olmayan ziyaretçi", detail: "Resmî bilgiye erişimi yok", correct: false }
                ]
            },
            {
                id: "sports-headline",
                type: "headline",
                label: "SPOR MASASI",
                title: "Manşeti Hazırla",
                text: "Resmî skora uygun, abartısız başlığı seç.",
                options: [
                    { text: "Ev sahibi ekip 2-1 kazanarak üç puanı aldı", correct: true },
                    { text: "Tarihin en büyük skandalı yaşandı", correct: false },
                    { text: "Taraftarlar sonucu değiştirdi", correct: false }
                ]
            },
            {
                id: "sports-sequence",
                type: "sequence",
                label: "CANLI YAYIN AKIŞI",
                title: "Yayın Sırasını Kur",
                text: "Maç sonu canlı yayın akışını doğru sırayla seç.",
                steps: ["Resmî skoru doğrula", "Kısa maç özetini hazırla", "Röportaja geç"]
            }
        ]
    };

    const LEVEL_V3_DATA = [
        {
            weather: "Açık · Yoğun trafik",
            routeText: "Alt rota güvenli ve geniştir. Üst platformlar daha fazla delil ve rota bonusu verir.",
            goals: ["Görevi tamamla", "En az 8 delil topla", "Hasar almadan mükemmel canlı yayın yap"],
            miniPool: "traffic",
            routes: [
                { start: 650, end: 1010, name: "Üst Geçit", rewardY: 535, bonus: 260 },
                { start: 3470, end: 3840, name: "Kamera Platformu", rewardY: 530, bonus: 300 },
                { start: 5860, end: 6210, name: "Basın Kestirmesi", rewardY: 525, bonus: 340 }
            ],
            events: [
                { x: 1180, type: "ambulance", icon: "+", title: "Ambulans Geçişi", text: "Acil ekip geçiyor. Yolun sağını boş bırak.", duration: 6 },
                { x: 3620, type: "bonus", icon: "▣", title: "Görüntü Talebi", text: "10 saniye boyunca kamera kayıtları iki kat puan.", duration: 10, bonusType: "camera" },
                { x: 5750, type: "breaking", icon: "!", title: "Son Dakika", text: "Yayın noktası değişti; üst rota daha hızlı.", duration: 7 }
            ]
        },
        {
            weather: "Kuvvetli yağış",
            routeText: "Kuru alt geçişler daha güvenlidir. Yükseltilmiş platformlar riskli ama dosya bonusu sağlar.",
            goals: ["Görevi tamamla", "En az 9 delil topla", "Tüm saha görevlerini ilk denemede bitir"],
            miniPool: "flood",
            routes: [
                { start: 590, end: 940, name: "Yüksek Kaldırım", rewardY: 530, bonus: 280 },
                { start: 2940, end: 3310, name: "Kuru Hat", rewardY: 530, bonus: 320 },
                { start: 5540, end: 5920, name: "Tahliye Köprüsü", rewardY: 535, bonus: 360 }
            ],
            events: [
                { x: 980, type: "rain", icon: "☂", title: "Yağış Şiddetlendi", text: "Görüş mesafesi azaldı; tabela ve platformları takip et.", duration: 10 },
                { x: 3300, type: "bonus", icon: "▤", title: "Yeni Tahliye Listesi", text: "Haber dosyaları 10 saniye boyunca iki kat puan.", duration: 10, bonusType: "file" },
                { x: 6100, type: "rescue", icon: "+", title: "Kurtarma Ekibi", text: "Ekipler güvenli geçiş koridoru oluşturdu.", duration: 7 }
            ]
        },
        {
            weather: "Akşam · Kalabalık",
            routeText: "Alt rota daha kısa; üst basın platformları röportaj notu ve yüksek puan sunar.",
            goals: ["Görevi tamamla", "En az 10 delil topla", "Hasar almadan 3 ödüllü rota kullan"],
            miniPool: "sports",
            routes: [
                { start: 700, end: 1030, name: "Basın Girişi", rewardY: 540, bonus: 300 },
                { start: 2240, end: 2630, name: "Tribün Geçidi", rewardY: 520, bonus: 340 },
                { start: 4980, end: 5350, name: "Röportaj Koridoru", rewardY: 520, bonus: 380 }
            ],
            events: [
                { x: 1250, type: "crowd", icon: "●", title: "Taraftar Yoğunluğu", text: "Kalabalık arttı; üst basın yolunu kullanabilirsin.", duration: 8 },
                { x: 3900, type: "bonus", icon: "●", title: "Röportaj Fırsatı", text: "Mikrofon notları 10 saniye boyunca iki kat puan.", duration: 10, bonusType: "microphone" },
                { x: 6500, type: "signal", icon: "⌁", title: "Yayın Sinyali Güçlü", text: "Tüm deliller kısa süreliğine bonus puan kazandırıyor.", duration: 9, bonusType: "all" }
            ]
        }
    ];

    const LEVEL_V4_DATA = [
        {
            decision: {
                x: 1580,
                title: "Kaza Noktasına Hangi Yoldan?",
                text: "Trafik tamamen durdu. Haber merkezi iki alternatif rota gönderdi.",
                duration: 9,
                options: [
                    { id: "underpass", icon: "↘", title: "Alt Geçit", detail: "Daha güvenli; yerdeki dubalar kaldırılır.", tag: "Güvenli", bonus: 160, route: "lower" },
                    { id: "overpass", icon: "↗", title: "Üst Köprü", detail: "Platformlar açılır; daha fazla kamera kaydı bulunur.", tag: "Risk + ödül", bonus: 360, route: "upper" }
                ]
            },
            drone: { x: 2860, duration: 13, title: "Kaza Alanını Havadan Tara", targets: ["Ambulans koridoru", "Hasarlı araç", "Trafik akışı"] },
            photo: { x: 4080, title: "Güvenli Kadraj", text: "Güvenlik şeridini aşmadan olay noktasını ortala." },
            interview: {
                x: 4870,
                title: "Kaza Bilgisini Kimden Almalısın?",
                text: "Canlı yayına saniyeler kaldı. Resmî ve teyitli bilgiyi verecek kişiyi seç.",
                people: [
                    { avatar: "👮", name: "Trafik Polisi", detail: "Olay yeri ve yol kapanışı bilgisi", correct: true },
                    { avatar: "🧑", name: "Meraklı Vatandaş", detail: "Sosyal medyada duyduklarını anlatıyor", correct: false },
                    { avatar: "🚕", name: "Taksi Şoförü", detail: "Kazayı görmedi, yalnızca trafikte bekliyor", correct: false }
                ]
            },
            deadline: { x: 5320, targetX: 6500, duration: 24, title: "24 saniye içinde yayın aracına ulaş", bonus: 900 },
            helper: { x: 1120, duration: 24, name: "Kameraman Mert" },
            secret: { x: 3380, exitX: 3810, duration: 7.5, title: "Servis Tüneli", bonus: 520 },
            radio: [
                { x: 420, speaker: "Haber Şefi", text: "Emre, kaza noktasına yaklaşıyorsun. Güvenlik şeridinin dışından ilerle." },
                { x: 2260, speaker: "Haber Şefi", text: "Görüntü masası havadan bir genel plan istiyor. Drone çantasını hazırla." },
                { x: 5200, speaker: "Reji", text: "Canlı bağlantıya az kaldı. Yayın aracına zamanında ulaşman gerekiyor." }
            ],
            npcs: [
                { x: 840, type: "cyclist", range: 170, speed: .7 },
                { x: 1760, type: "bus-stop", range: 0, speed: 0 },
                { x: 4460, type: "press", range: 90, speed: .45 }
            ]
        },
        {
            decision: {
                x: 1660,
                title: "Sel Bölgesinde Rota Kararı",
                text: "Su seviyesi yükseliyor. Kuru hat mı, tahliye köprüsü mü?",
                duration: 9,
                options: [
                    { id: "dryline", icon: "↘", title: "Kuru Sokak", detail: "Daha uzun ama su tehlikesi azaltılır.", tag: "Güvenli", bonus: 180, route: "lower" },
                    { id: "bridge", icon: "↗", title: "Tahliye Köprüsü", detail: "Yüksek platformlar ve haber dosyası bonusu.", tag: "Hızlı", bonus: 390, route: "upper" }
                ]
            },
            drone: { x: 3060, duration: 14, title: "Su Seviyesini Haritala", targets: ["Tahliye noktası", "Su ölçüm levhası", "Kurtarma botu"] },
            photo: { x: 4380, title: "Su Seviyesini Belgele", text: "Ölçüm levhasını tehlikeli suya yaklaşmadan kadraja al." },
            interview: {
                x: 5160,
                title: "Tahliye Bilgisini Doğrula",
                text: "Bölgedeki güncel tahliye yönlendirmesini kimden almalısın?",
                people: [
                    { avatar: "🦺", name: "AFAD Görevlisi", detail: "Güncel tahliye planını yönetiyor", correct: true },
                    { avatar: "📱", name: "Sosyal Medya Yayıncısı", detail: "Kaynağı belirsiz mesajlar gösteriyor", correct: false },
                    { avatar: "🏪", name: "Esnaf", detail: "Geçen yılki seli anlatıyor", correct: false }
                ]
            },
            deadline: { x: 5750, targetX: 7000, duration: 26, title: "Kurtarma ekibine 26 saniyede ulaş", bonus: 950 },
            helper: { x: 1180, duration: 25, name: "Kameraman Ece" },
            secret: { x: 3650, exitX: 4110, duration: 8, title: "Kuru Altyapı Koridoru", bonus: 560 },
            radio: [
                { x: 420, speaker: "Haber Şefi", text: "Suya girmeden ilerle. Yüksek ve kuru alanları takip et." },
                { x: 2440, speaker: "Meteoroloji Masası", text: "Yağış şiddetleniyor. Drone ile tahliye güzergâhını kontrol et." },
                { x: 5650, speaker: "Reji", text: "Kurtarma ekibi yeni noktaya geçti. Süreli bağlantı başlıyor." }
            ],
            npcs: [
                { x: 900, type: "rescue", range: 120, speed: .5 },
                { x: 2140, type: "umbrella", range: 100, speed: .35 },
                { x: 4920, type: "press", range: 80, speed: .42 }
            ]
        },
        {
            decision: {
                x: 1740,
                title: "Stadyuma Hangi Girişten?",
                text: "Ana kapıda yoğunluk var. Basın koridoru veya taraftar yolu açık.",
                duration: 8,
                options: [
                    { id: "fanroute", icon: "↘", title: "Taraftar Yolu", detail: "Daha geniş; kalabalık yavaşlatır.", tag: "Güvenli", bonus: 180, route: "lower" },
                    { id: "pressroute", icon: "↗", title: "Basın Koridoru", detail: "Platformlu kısa yol; röportaj notları fazla.", tag: "Basın rotası", bonus: 420, route: "upper" }
                ]
            },
            drone: { x: 3220, duration: 13, title: "Stadyum Çevresini Tara", targets: ["Takım otobüsü", "Basın kapısı", "Taraftar yoğunluğu"] },
            photo: { x: 4620, title: "Maç Sonu Kadrajı", text: "Skor tabelası ile röportaj alanını aynı kadraja getir." },
            interview: {
                x: 5480,
                title: "Maç Sonu Açıklaması",
                text: "Resmî skor ve takım değerlendirmesi için doğru kişiyi seç.",
                people: [
                    { avatar: "🎙", name: "Kulüp Sözcüsü", detail: "Kimliği ve görevi doğrulanmış", correct: true },
                    { avatar: "🥁", name: "Taraftar Lideri", detail: "Duygusal yorum yapıyor", correct: false },
                    { avatar: "🍿", name: "Büfe Çalışanı", detail: "Maçın resmî bilgisine sahip değil", correct: false }
                ]
            },
            deadline: { x: 6100, targetX: 7480, duration: 25, title: "Maç sonu yayınına 25 saniyede yetiş", bonus: 1000 },
            helper: { x: 1260, duration: 26, name: "Kameraman Selin" },
            secret: { x: 3970, exitX: 4460, duration: 8, title: "Oyuncu Tüneli", bonus: 600 },
            radio: [
                { x: 440, speaker: "Spor Müdürü", text: "Ana kapı yoğun. Basın kartını görünür tut ve alternatif girişleri izle." },
                { x: 2620, speaker: "Spor Müdürü", text: "Takım otobüsü geldi. Drone ile çevre yoğunluğunu görüntüle." },
                { x: 6000, speaker: "Reji", text: "Maç bitti. Canlı yayın aracına geri sayım başladı." }
            ],
            npcs: [
                { x: 980, type: "fan", range: 140, speed: .55 },
                { x: 2500, type: "cyclist", range: 160, speed: .8 },
                { x: 5200, type: "press", range: 100, speed: .5 }
            ]
        }
    ];

    const LEVELS = [
        {
            city:"İstanbul", cityIcon:"🌉",
            name: "Kaza İhbarı",
            subtitle: "Trafiği aş, güvenli rotayı kullan ve olay yerindeki bilgileri doğrula.",
            objective: "En az 6 delil topla ve iki farklı bilgi kapısını geç.",
            tip: "Engeller arasında güvenli mesafe bırakıldı; hareketli araçları gözlemleyip doğru anda geç.",
            length: 7100,
            evidenceGoal:6, atmospheres:["morning-clear","evening-rain","night-fog"], vehicleType:"motorcycle", collectionIds:["press-card","old-mic","istanbul-coupon"],
            questionPools: ["general", "traffic", "media", "cities", "technology", "math"],
            theme: {
                skyTop: "#74b7df",
                skyBottom: "#d8eef4",
                cityFar: "#69849a",
                cityNear: "#455f75",
                road: "#5a6470",
                accent: "#ef3340",
                sun: "#ffe28a"
            }
        },
        {
            city:"Trabzon", cityIcon:"🌧",
            name: "Sel Bölgesi",
            subtitle: "Yükselen sudan uzak dur, platformları kullan ve güvenli noktaya ulaş.",
            objective: "En az 7 delil topla, güvenli rotayı seç ve iki bilgi kapısını aç.",
            tip: "Geniş su alanlarının üzerinde her zaman erişilebilir bir platform veya kuru geçiş bulunur.",
            length: 7500,
            evidenceGoal:7, atmospheres:["morning-rain","evening-storm","night-rain"], vehicleType:"rescue-boat", collectionIds:["rain-cover","field-notebook","trabzon-coupon"],
            questionPools: ["general", "flood", "science", "geography", "cities", "math"],
            theme: {
                skyTop: "#506f8a",
                skyBottom: "#b9cbd6",
                cityFar: "#526a7a",
                cityNear: "#344d5e",
                road: "#495861",
                accent: "#4ba3ff",
                sun: "#d7e4ea"
            }
        },
        {
            city:"Ankara", cityIcon:"🏟",
            name: "Stadyum Yayını",
            subtitle: "Kalabalığı ve saha ekipmanlarını aş, röportaj notlarını tamamla.",
            objective: "En az 8 delil topla ve yayın platformuna zamanında ulaş.",
            tip: "Kalabalık bölgelerin öncesinde yükseltilmiş geçişler bulunur; acele etmek yerine rotayı oku.",
            length: 7900,
            evidenceGoal:8, atmospheres:["afternoon-clear","evening-windy","night-clear"], vehicleType:"live-van", collectionIds:["stadium-pass","vintage-camera","ankara-coupon"],
            questionPools: ["general", "sports", "history", "cities", "media", "math"],
            theme: {
                skyTop: "#6f63b7",
                skyBottom: "#f0b4a5",
                cityFar: "#6e6381",
                cityNear: "#453d5d",
                road: "#56515f",
                accent: "#ffd166",
                sun: "#ffdb8c"
            }
        }
        ,{
            city:"İzmir", cityIcon:"🔥", name:"Orman Yangını", subtitle:"Tahliye hattını takip et, duman yönünü doğrula ve güvenli görüntü aktar.", objective:"En az 8 delil topla, çevresel bulmacayı çöz ve canlı yayın aracına ulaş.", tip:"Duman yoğunlaştığında üst rotaları ve tahliye tabelalarını takip et.", length:7800, evidenceGoal:8, atmospheres:["afternoon-smoke","evening-windy","night-smoke"], vehicleType:"helicopter", collectionIds:["fire-helmet","thermal-lens","izmir-coupon"], questionPools:["general","traffic","fire","science","geography","media"],
            theme:{skyTop:"#9d765d",skyBottom:"#ead0a8",cityFar:"#806c61",cityNear:"#55463f",road:"#5f5853",accent:"#ff713d",sun:"#ffd08a"}
        },{
            city:"Antalya", cityIcon:"🌊", name:"Fırtına Hattı", subtitle:"Kıyı şeridindeki fırtına ihbarını takip et ve tahliye bilgisini doğrula.", objective:"En az 9 delil topla, gizli görevi tamamla ve yayın kalitesini yüzde 75 üzerinde tut.", tip:"Rüzgâr sertleştiğinde araç sekansında hızını ayarla; ıslak zemine dikkat et.", length:8000, evidenceGoal:9, atmospheres:["morning-windy","evening-storm","night-rain"], vehicleType:"bicycle", collectionIds:["storm-map","waterproof-mic","antalya-coupon"], questionPools:["general","flood","storm","science","geography","media"],
            theme:{skyTop:"#3f7895",skyBottom:"#bad9df",cityFar:"#4b7586",cityNear:"#315466",road:"#4b5b63",accent:"#30b9d8",sun:"#d8f0f1"}
        }
    ];

    const LEVEL_BLUEPRINTS = [
        {
            gates: [2350, 4550],
            platforms: [
                [700, 490, 220], [1480, 475, 220], [2670, 490, 230],
                [3560, 480, 220], [4950, 485, 240], [5920, 475, 230]
            ],
            obstacles: [
                [430, "barrier", 66, 64], [1120, "crate", 60, 55],
                [1980, "barrier", 70, 66], [3080, "crate", 62, 56],
                [4260, "barrier", 70, 66], [5480, "crate", 62, 56],
                [6420, "barrier", 70, 66]
            ],
            hazards: [
                [930, 100, "puddle"], [1770, 95, "cone-zone"],
                [2820, 105, "puddle"], [3930, 80, "cone-zone"],
                [5200, 110, "puddle"], [6200, 95, "cone-zone"]
            ],
            vehicles: [
                [3280, 45, 0.85, 0, 116, 58],
                [5710, 70, 1.05, 2.1, 112, 56]
            ]
        },
        {
            gates: [2600, 5000],
            platforms: [
                [650, 485, 250], [1320, 475, 245], [2070, 490, 230],
                [3000, 480, 260], [3890, 490, 230], [4500, 480, 220],
                [5600, 485, 265], [6500, 475, 250]
            ],
            obstacles: [
                [1050, "crate", 60, 55], [1800, "barrier", 70, 64],
                [3420, "barrier", 70, 64], [4250, "crate", 62, 56],
                [5320, "barrier", 70, 64], [6250, "crate", 62, 56],
                [7040, "barrier", 68, 64]
            ],
            hazards: [
                [710, 175, "water"], [1400, 165, "water"],
                [2140, 150, "water"], [3080, 175, "water"],
                [3970, 150, "water"], [4560, 145, "water"],
                [5680, 175, "water"], [6580, 165, "water"]
            ],
            vehicles: [
                [3650, 60, 0.72, 1.2, 122, 60]
            ]
        },
        {
            gates: [2850, 5450],
            platforms: [
                [750, 495, 220], [1550, 480, 250], [2300, 470, 250],
                [3300, 490, 230], [4200, 480, 260], [5050, 470, 250],
                [6000, 485, 240], [6900, 475, 250]
            ],
            obstacles: [
                [500, "barrier", 68, 64], [1150, "crate", 62, 56],
                [2000, "barrier", 70, 66], [3100, "crate", 62, 56],
                [3750, "barrier", 70, 66], [4750, "crate", 62, 56],
                [5750, "barrier", 70, 66], [6550, "crate", 62, 56],
                [7420, "barrier", 70, 66]
            ],
            hazards: [
                [960, 105, "cone-zone"], [1760, 130, "crowd"],
                [2520, 100, "cone-zone"], [3470, 130, "crowd"],
                [4480, 105, "cone-zone"], [6200, 135, "crowd"],
                [7200, 100, "cone-zone"]
            ],
            vehicles: [
                [3500, 70, 0.9, 0.4, 130, 62],
                [6320, 65, 0.82, 2.3, 126, 60]
            ]
        }
    ];

    const COLLECTION_ITEMS=[
        {id:"press-card",icon:"🪪",name:"İlk Basın Kartı",text:"İstanbul saha görevinin hatırası."},{id:"old-mic",icon:"🎙",name:"Analog Mikrofon",text:"Arşivdeki ilk canlı yayın mikrofonu."},{id:"istanbul-coupon",icon:"📰",name:"İstanbul Kupürü",text:"Kaza ihbarının doğrulanmış ilk baskısı."},
        {id:"rain-cover",icon:"☔",name:"Kamera Yağmurluğu",text:"Trabzon sel görevinde kullanılan koruma."},{id:"field-notebook",icon:"📓",name:"Saha Defteri",text:"Tahliye notlarıyla dolu eski defter."},{id:"trabzon-coupon",icon:"📰",name:"Trabzon Kupürü",text:"Sel bölgesi özel yayını."},
        {id:"stadium-pass",icon:"🎫",name:"Basın Tribünü Kartı",text:"Ankara görevinin geçiş kartı."},{id:"vintage-camera",icon:"📷",name:"Arşiv Kamerası",text:"Spor servisinden kalma klasik kamera."},{id:"ankara-coupon",icon:"📰",name:"Ankara Kupürü",text:"Maç sonu özel yayını."},
        {id:"fire-helmet",icon:"⛑",name:"Yangın Kaskı",text:"İzmir tahliye hattında kullanılan kask."},{id:"thermal-lens",icon:"🔭",name:"Termal Lens",text:"Duman içindeki sıcak noktaları gösterir."},{id:"izmir-coupon",icon:"📰",name:"İzmir Kupürü",text:"Orman yangını özel dosyası."},
        {id:"storm-map",icon:"🗺",name:"Fırtına Haritası",text:"Antalya kıyı tahliye planı."},{id:"waterproof-mic",icon:"🎤",name:"Su Geçirmez Mikrofon",text:"Fırtına yayınlarının ekipmanı."},{id:"antalya-coupon",icon:"📰",name:"Antalya Kupürü",text:"Kıyı fırtınası canlı yayın kupürü."}
    ];
    const ATMOSPHERES={
        "morning-clear":{period:"Sabah",condition:"Açık",icon:"🌤",tint:"rgba(255,222,165,.08)",weather:"clear"},"afternoon-clear":{period:"Öğleden sonra",condition:"Açık",icon:"☀",tint:"rgba(255,196,117,.06)",weather:"clear"},"evening-rain":{period:"Akşam",condition:"Yağmurlu",icon:"🌧",tint:"rgba(30,55,91,.18)",weather:"rain"},"morning-rain":{period:"Sabah",condition:"Sağanak",icon:"🌧",tint:"rgba(48,77,96,.14)",weather:"rain"},"evening-storm":{period:"Akşam",condition:"Fırtına",icon:"⛈",tint:"rgba(24,38,68,.25)",weather:"storm"},"night-rain":{period:"Gece",condition:"Yağmurlu",icon:"🌧",tint:"rgba(7,18,45,.42)",weather:"rain"},"night-fog":{period:"Gece",condition:"Sisli",icon:"🌫",tint:"rgba(18,28,51,.38)",weather:"fog"},"evening-windy":{period:"Akşam",condition:"Rüzgârlı",icon:"💨",tint:"rgba(89,58,76,.16)",weather:"wind"},"night-clear":{period:"Gece",condition:"Açık",icon:"🌙",tint:"rgba(7,17,48,.42)",weather:"clear"},"afternoon-smoke":{period:"Öğleden sonra",condition:"Dumanlı",icon:"🔥",tint:"rgba(119,77,49,.22)",weather:"smoke"},"night-smoke":{period:"Gece",condition:"Dumanlı",icon:"🌫",tint:"rgba(39,24,28,.42)",weather:"smoke"},"morning-windy":{period:"Sabah",condition:"Rüzgârlı",icon:"💨",tint:"rgba(63,109,128,.09)",weather:"wind"}
    };
    const CITY_EVENT_CHAINS=[{city:"İstanbul",stage:"Trafik yoğunluğu büyüyor",consequence:"Rota kararı sonraki görevin temposunu etkiler."},{city:"Trabzon",stage:"Yağış şiddetleniyor",consequence:"Güvenli seçim ekip desteğini artırır."},{city:"Ankara",stage:"Stadyum çıkışı başladı",consequence:"Basın koridoru röportaj kalitesini etkiler."},{city:"İzmir",stage:"Rüzgâr yangını kuzeye taşıyor",consequence:"Termal tarama tahliye rotasını değiştirir."},{city:"Antalya",stage:"Kıyı fırtınası güçleniyor",consequence:"Kurulum süresi sinyal kalitesini etkiler."}];
    const VEHICLE_CONFIGS={motorcycle:{badge:"M",title:"Motosiklet Takibi",objective:"Trafik boşluklarını kullan ve olay yerine yetiş",speed:1.2},"rescue-boat":{badge:"B",title:"Kurtarma Botu",objective:"Yüzen engellerden kaç ve tahliye noktasına ulaş",speed:1},"live-van":{badge:"TV",title:"Canlı Yayın Aracı",objective:"Kalabalığı aş ve yayın parkuruna gir",speed:.95},helicopter:{badge:"H",title:"Havadan Takip",objective:"Duman kolonlarından kaç ve sıcak noktaları işaretle",speed:1.05},bicycle:{badge:"BS",title:"Kıyı Bisikleti",objective:"Islak zeminde dengenı koru ve sahile ulaş",speed:1.1}};
    const DEFAULT_SETTINGS={compactHud:true,dynamicWeather:true,cameraShake:true};

    function shuffle(list) {
        const result = [...list];

        for (let i = result.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    function prepareQuestion(question) {
        const shuffledAnswers = shuffle(
            question.answers.map((text, index) => ({
                text,
                correct: index === question.correct
            }))
        );

        return {
            ...question,
            answers: shuffledAnswers.map((answer) => answer.text),
            correct: shuffledAnswers.findIndex((answer) => answer.correct)
        };
    }

    function pickQuestions(poolNames, count) {
        const uniquePool = [...new Map(
            poolNames.flatMap((name) => QUESTION_BANKS[name] || []).map((question) => [question.id, question])
        ).values()];
        if (!uniquePool.length) return [];

        const recentSet = new Set(state.recentQuestionIds);
        const targetDifficulty = Math.min(3, 1 + Math.floor(state.levelIndex / 2));
        const repeatedCategory = state.questionCategoryHistory.length >= 2
            && state.questionCategoryHistory.at(-1) === state.questionCategoryHistory.at(-2)
            ? state.questionCategoryHistory.at(-1)
            : null;

        let available = uniquePool.filter((question) => !state.usedQuestionIds.has(question.id) && !recentSet.has(question.id));
        if (repeatedCategory && available.some((question) => question.category !== repeatedCategory)) {
            available = available.filter((question) => question.category !== repeatedCategory);
        }
        if (available.length < count) available = uniquePool.filter((question) => !state.usedQuestionIds.has(question.id));
        if (available.length < count) {
            uniquePool.forEach((question) => state.usedQuestionIds.delete(question.id));
            available = [...uniquePool];
        }

        const ranked = shuffle(available).sort((a, b) => {
            const aDistance = Math.abs((a.difficulty || 1) - targetDifficulty);
            const bDistance = Math.abs((b.difficulty || 1) - targetDifficulty);
            return aDistance - bDistance;
        });
        const selected = ranked.slice(0, count);

        selected.forEach((question) => {
            state.usedQuestionIds.add(question.id);
            state.recentQuestionIds.push(question.id);
            state.questionCategoryHistory.push(question.category || "general");
        });
        state.recentQuestionIds = state.recentQuestionIds.slice(-QUESTION_HISTORY_LIMIT);
        state.questionCategoryHistory = state.questionCategoryHistory.slice(-4);
        saveQuestionHistory(state.recentQuestionIds);
        return selected.map(prepareQuestion);
    }

    function pickMiniMission(poolName) {
        const pool = MINI_MISSION_POOLS[poolName] || [];
        let available = pool.filter((mission) => !state.usedMiniMissionIds.has(mission.id));

        if (!available.length) {
            pool.forEach((mission) => state.usedMiniMissionIds.delete(mission.id));
            available = [...pool];
        }

        const selected = shuffle(available)[0];
        if (selected) state.usedMiniMissionIds.add(selected.id);
        return selected ? JSON.parse(JSON.stringify(selected)) : null;
    }

    function createSceneObjects(index, length) {
        const trees = [];
        const people = [];
        const signs = [];
        const flags = [];
        const ambientVehicles = [];
        const clouds = [];

        for (let x = 380; x < length; x += 520) {
            trees.push({ x: x + (x % 3) * 27, scale: 0.8 + ((x / 520) % 3) * 0.09 });
        }

        for (let x = 750; x < length; x += 760) {
            people.push({ x, variant: Math.floor(x / 760) % 4, phase: x * 0.01 });
        }

        for (let x = 1100; x < length; x += 1450) {
            const city=LEVELS[index]?.city||"HABER";
            signs.push({x,text:index===0?"OLAY YERİ":index===1?"GÜVENLİ BÖLGE":`${city.toLocaleUpperCase("tr-TR")} BASIN`});
        }

        if (index === 2) {
            for (let x = 600; x < length; x += 330) flags.push({ x, phase: x * 0.02 });
        }

        for (let i = 0; i < 7; i += 1) {
            clouds.push({ x: i * 390 + 80, y: 65 + (i % 3) * 55, scale: 0.7 + (i % 2) * 0.25, speed: 4 + i * 0.55 });
        }

        for (let i = 0; i < 8; i += 1) {
            ambientVehicles.push({ x: i * 920 + 240, speed: 18 + (i % 3) * 8, color: ["#cf3f49", "#2f83bf", "#d9a52c"][i % 3] });
        }

        return { trees, people, signs, flags, ambientVehicles, clouds };
    }

    function overlapsProtectedZone(x, width, zones, padding = 0) {
        return zones.some((zone) => x < zone.end + padding && x + width > zone.start - padding);
    }

    function repairLevelGeometry(level) {
        const minimumPlatformY = GROUND_Y - MAX_SAFE_PLATFORM_RISE;

        level.solids.forEach((solid) => {
            if (solid.type === "platform" && solid.y < minimumPlatformY) {
                solid.y = minimumPlatformY;
            }
        });

        const fixedObstacles = level.solids
            .filter((solid) => solid.type !== "platform")
            .sort((a, b) => a.x - b.x);

        level.hazards.sort((a, b) => a.x - b.x);

        for (let pass = 0; pass < 4; pass += 1) {
            level.hazards.forEach((hazard) => {
                level.solids
                    .filter((solid) => solid.type === "platform")
                    .forEach((platform) => {
                        const platformEnd = platform.x + platform.w;
                        const hazardEnd = hazard.x + hazard.w;
                        const fullyUnderPlatform = hazard.x >= platform.x + 20 && hazardEnd <= platformEnd - 20;

                        if (fullyUnderPlatform) return;

                        const tooCloseAfter = hazard.x >= platformEnd && hazard.x - platformEnd < MIN_PLATFORM_LANDING_GAP;
                        const tooCloseBefore = platform.x >= hazardEnd && platform.x - hazardEnd < MIN_PLATFORM_LANDING_GAP;
                        const partialOverlap = hazard.x < platformEnd && hazardEnd > platform.x;

                        if (partialOverlap || tooCloseAfter) {
                            hazard.x = platformEnd + MIN_PLATFORM_LANDING_GAP;
                        } else if (tooCloseBefore) {
                            hazard.x = Math.max(340, platform.x - MIN_PLATFORM_LANDING_GAP - hazard.w);
                        }
                    });

                fixedObstacles.forEach((obstacle) => {
                    const obstacleEnd = obstacle.x + obstacle.w;
                    const hazardEnd = hazard.x + hazard.w;
                    const gapAfterObstacle = hazard.x - obstacleEnd;
                    const gapAfterHazard = obstacle.x - hazardEnd;

                    if (gapAfterObstacle >= 0 && gapAfterObstacle < MIN_GROUND_SEQUENCE_GAP) {
                        hazard.x = obstacleEnd + MIN_GROUND_SEQUENCE_GAP;
                    } else if (gapAfterHazard >= 0 && gapAfterHazard < MIN_GROUND_SEQUENCE_GAP) {
                        hazard.x = Math.max(340, obstacle.x - MIN_GROUND_SEQUENCE_GAP - hazard.w);
                    }
                });

                hazard.x = Math.min(hazard.x, level.finishX - 360 - hazard.w);
            });
        }

        level.vehicles.forEach((vehicle) => {
            const corridorStart = vehicle.baseX - vehicle.range;
            const corridorEnd = vehicle.baseX + vehicle.range + vehicle.w;

            level.solids
                .filter((solid) => solid.type === "platform")
                .forEach((platform) => {
                    const platformEnd = platform.x + platform.w;
                    const gapBefore = platform.x - corridorEnd;
                    const gapAfter = corridorStart - platformEnd;

                    if (gapBefore >= 0 && gapBefore < MIN_PLATFORM_LANDING_GAP) {
                        vehicle.baseX -= MIN_PLATFORM_LANDING_GAP - gapBefore;
                    } else if (gapAfter >= 0 && gapAfter < MIN_PLATFORM_LANDING_GAP) {
                        vehicle.baseX += MIN_PLATFORM_LANDING_GAP - gapAfter;
                    }
                });
        });
    }

    function auditLevelGeometry(level) {
        const warnings = [];
        const theoreticalJumpRise = (JUMP_SPEED * JUMP_SPEED) / (2 * GRAVITY);

        level.solids
            .filter((solid) => solid.type === "platform")
            .forEach((platform) => {
                const rise = GROUND_Y - platform.y;
                if (rise > theoreticalJumpRise - 10) {
                    warnings.push(`Erişilmesi zor platform: x=${platform.x}, yükseklik=${Math.round(rise)}px`);
                }
            });

        if (warnings.length) {
            console.warn(`[Haber Avcısı] ${level.name} geometri uyarıları`, warnings);
        }
    }

    function adaptV5LevelData(index, source, data) {
        const result=JSON.parse(JSON.stringify(data)); const city=source.city;
        if(result.decision){result.decision.title=`${city} Saha Kararı`;result.decision.text=`${source.name} gelişiyor. Güvenli rota ile hızlı haber rotasından birini seç.`;}
        if(result.drone) result.drone.title=`${city} Hava Taraması`; if(result.photo) result.photo.title=`${city} Ana Kadrajı`; if(result.deadline) result.deadline.title=`${city} canlı bağlantısına zamanında ulaş`; if(result.secret) result.secret.title=`${city} Gizli Basın Geçidi`;
        if(result.radio?.length) result.radio[0].text=`${city} masasından yeni bilgi geldi. Güvenliğini koruyarak ilerle.`;
        return result;
    }

    function createLevel(index) {
        const source = LEVELS[index];
        const blueprint=LEVEL_BLUEPRINTS[index%LEVEL_BLUEPRINTS.length];
        const v3Data=JSON.parse(JSON.stringify(LEVEL_V3_DATA[index%LEVEL_V3_DATA.length]));
        const v4Data=adaptV5LevelData(index,source,LEVEL_V4_DATA[index%LEVEL_V4_DATA.length]);
        const questions = pickQuestions(source.questionPools, 1);
        const miniMission = pickMiniMission(v3Data.miniPool);
        const level = {
            ...source,
            v3: v3Data,
            v4: JSON.parse(JSON.stringify(v4Data)),
            v5:{vehicle:{x:Math.round(source.length*.34),type:source.vehicleType,triggered:false,duration:11.5},puzzle:{x:Math.round(source.length*.58),triggered:false,solved:false},hiddenMission:{x:Math.round(source.length*.72),triggered:false,completed:false,type:index%3,total:18}},
            solids: [],
            hazards: [],
            collectibles: [],
            gates: [],
            routes: v3Data.routes.map((route) => ({ ...route, resolved: false, choice: null })),
            events: v3Data.events.map((event) => ({ ...event, triggered: false })),
            scene: createSceneObjects(index, source.length),
            finishX: source.length - 260,
            particles: [],
            vehicles: [],
            activeNpcs: [],
            branchObjects: []
        };

        blueprint.platforms.forEach(([x, y, width]) => {
            level.solids.push({ x, y, w: width, h: 26, type: "platform" });
        });

        const protectedZones = [
            { start: 0, end: 320 },
            ...blueprint.gates.map((x) => ({ start: x - 210, end: x + 150 })),
            { start: level.finishX - 220, end: level.finishX + 120 }
        ];

        blueprint.obstacles.forEach(([x, type, width, height]) => {
            if (!overlapsProtectedZone(x, width, protectedZones, 10)) {
                level.solids.push({
                    x,
                    y: GROUND_Y - height,
                    w: width,
                    h: height,
                    type
                });
            }
        });

        blueprint.hazards.forEach(([x, width, type]) => {
            if (!overlapsProtectedZone(x, width, protectedZones, 15)) {
                level.hazards.push({
                    x,
                    y: GROUND_Y - 18,
                    w: width,
                    h: 18,
                    type
                });
            }
        });

        blueprint.gates.forEach((x, gateIndex) => {
            level.gates.push({
                x,
                y: GROUND_Y - 155,
                w: 35,
                h: 155,
                solved: false,
                triggered: false,
                attempts: 0,
                kind: gateIndex === 0 ? "question" : "mini",
                question: gateIndex === 0 ? questions[0] : null,
                mission: gateIndex === 1 ? miniMission : null
            });
        });

        blueprint.vehicles.forEach(([baseX, range, speed, phase, width, height]) => {
            if (!overlapsProtectedZone(baseX - range, width + range * 2, protectedZones, 40)) {
                level.vehicles.push({
                    x: baseX,
                    baseX,
                    y: GROUND_Y - height,
                    w: width,
                    h: height,
                    range,
                    speed,
                    phase
                });
            }
        });

        repairLevelGeometry(level);
        auditLevelGeometry(level);
        placeSafeCollectibles(level);
        initializeV4Level(level);
        return level;
    }

    function placeSafeCollectibles(level) {
        const itemTypes = ["camera", "microphone", "file"];
        let x = 430;
        let index = 0;

        while (x < level.finishX - 260) {
            let candidateX = x;
            let attempts = 0;

            while (attempts < 5) {
                const blockedBySolid = level.solids.some(
                    (solid) => solid.type !== "platform" && candidateX > solid.x - 55 && candidateX < solid.x + solid.w + 55
                );
                const blockedByHazard = level.hazards.some(
                    (hazard) => candidateX > hazard.x - 55 && candidateX < hazard.x + hazard.w + 55
                );
                const blockedByGate = level.gates.some(
                    (gate) => candidateX > gate.x - 130 && candidateX < gate.x + 120
                );

                if (!blockedBySolid && !blockedByHazard && !blockedByGate) break;
                candidateX += 85;
                attempts += 1;
            }

            const platform = level.solids.find(
                (solid) => solid.type === "platform" &&
                    candidateX > solid.x + 18 &&
                    candidateX < solid.x + solid.w - 18
            );

            const itemY = platform
                ? platform.y - 42
                : GROUND_Y - 72 - (index % 4 === 0 ? 55 : 0);

            level.collectibles.push({
                x: candidateX,
                y: itemY,
                r: 18,
                type: itemTypes[index % itemTypes.length],
                collected: false,
                phase: index * 0.63
            });

            x += 315 + (index % 3) * 24;
            index += 1;
        }
    }

    function initializeV4Level(level) {
        const v4 = level.v4;
        v4.decision.triggered = false;
        v4.drone.triggered = false;
        v4.photo.triggered = false;
        v4.interview.triggered = false;
        v4.deadline.triggered = false;
        v4.deadline.completed = false;
        v4.helper.triggered = false;
        v4.secret.used = false;
        v4.secret.discovered = false;
        v4.radio = v4.radio.map((message) => ({ ...message, triggered: false }));
        level.activeNpcs = v4.npcs.map((npc, index) => ({
            ...npc,
            baseX: npc.x,
            x: npc.x,
            phase: index * 1.71,
            direction: index % 2 ? -1 : 1
        }));
    }

    function getBagQuality() {
        const evidence = getEvidenceCount();
        const goalRatio = Math.min(1, evidence / Math.max(1, state.level?.evidenceGoal || 1));
        const variety = [state.inventory.camera, state.inventory.microphone, state.inventory.file].filter((count) => count > 0).length;
        const missionBonus = Math.min(20, state.metrics.correct * 6 + state.metrics.photos * 4 + state.metrics.interviews * 4);
        return Math.min(100, Math.round(goalRatio * 62 + variety * 6 + missionBonus));
    }

    function setInteractionHint(active, text = "Etkileşim") {
        ui.interactionHint.classList.toggle("active", Boolean(active));
        ui.interactionHintText.textContent = text;
    }

    function queueRadio(speaker, text, duration = 3.1) {
        const cleanText = String(text || "").trim();
        if (!cleanText) return;
        if (state.activeRadio?.text === cleanText || state.radioQueue.some((item) => item.text === cleanText)) return;
        state.radioQueue.push({ speaker, text: cleanText, duration: Math.min(duration, 3.4) });
        if (state.radioQueue.length > 2) state.radioQueue.splice(0, state.radioQueue.length - 2);
        if (!state.activeRadio) startNextRadio();
    }

    function startNextRadio() {
        const message = state.radioQueue.shift();
        if (!message) {
            state.activeRadio = null;
            ui.radioPanel.classList.remove("active");
            return;
        }

        state.activeRadio = { ...message, remaining: message.duration };
        ui.radioSpeaker.textContent = message.speaker;
        ui.radioText.textContent = message.text;
        const role = message.speaker.toLocaleUpperCase("tr-TR");
        ui.radioAvatar.textContent = role.includes("REJİ") ? "REJİ" : role.includes("KAMER") ? "KAM" : role.includes("DRONE") ? "DRN" : role.includes("PİLOT") ? "PİL" : role.includes("EDİT") ? "EDT" : role.includes("GÖRÜNTÜ") ? "GÖR" : "ŞEF";
        ui.radioPanel.classList.add("active");
    }

    function updateRadio(dt) {
        if (!state.activeRadio) return;
        state.activeRadio.remaining -= dt;
        if (state.activeRadio.remaining <= 0) startNextRadio();
    }

    function triggerCinematic(zoom = 1.08, yOffset = 0, duration = 1.4) {
        state.cameraTargetZoom = zoom;
        state.cameraTargetYOffset = yOffset;
        state.cinematicTimer = duration;
    }

    function updateCinematicCamera(dt) {
        if (state.cinematicTimer > 0) {
            state.cinematicTimer -= dt;
            if (state.cinematicTimer <= 0) {
                state.cameraTargetZoom = 1;
                state.cameraTargetYOffset = 0;
            }
        }

        state.cameraZoom += (state.cameraTargetZoom - state.cameraZoom) * Math.min(1, dt * 4.6);
        state.cameraYOffset += (state.cameraTargetYOffset - state.cameraYOffset) * Math.min(1, dt * 4.6);
    }

    function startDecision(data) {
        if (data.triggered) return;
        data.triggered = true;
        state.decision = { data, remaining: data.duration, resolved: false };
        setMode("decision");
        player.vx = 0;
        ui.decisionTitle.textContent = data.title;
        ui.decisionText.textContent = data.text;
        ui.decisionTimer.textContent = String(Math.ceil(data.duration));
        ui.decisionOptions.innerHTML = "";

        data.options.forEach((option) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "decision-option";
            button.innerHTML = `<strong>${option.icon} ${option.title}</strong><span>${option.detail}</span><em>${option.tag}</em>`;
            button.addEventListener("click", () => resolveDecision(option));
            ui.decisionOptions.appendChild(button);
        });

        ui.decisionOverlay.classList.add("active");
        queueRadio("Haber Şefi", "Rotayı hızlı seç. Kararın önündeki saha düzenini değiştirecek.", 4.2);
        triggerCinematic(1.1, 8, 2.2);
    }

    function updateDecision(dt) {
        if (!state.decision || state.decision.resolved) return;
        state.decision.remaining -= dt;
        ui.decisionTimer.textContent = String(Math.max(0, Math.ceil(state.decision.remaining)));
        if (state.decision.remaining <= 0) resolveDecision(state.decision.data.options[0], true);
    }

    function addBranchCollectible(x, y, type, phase) {
        state.level.collectibles.push({ x, y, r: 18, type, collected: false, phase, v4Branch: true });
    }

    function applyBranchChoice(option) {
        const start = state.decision.data.x + 120;
        const end = start + 760;
        state.level.hazards.forEach((hazard) => {
            if (hazard.x >= start && hazard.x <= end) hazard.disabled = option.route === "lower";
        });

        if (option.route === "upper") {
            const platformData = [
                [start + 70, 535, 170],
                [start + 275, 500, 180],
                [start + 500, 520, 185]
            ];
            platformData.forEach(([x, y, w]) => state.level.solids.push({ x, y, w, h: 26, type: "platform", v4Branch: true }));
            addBranchCollectible(start + 155, 488, "camera", 1.1);
            addBranchCollectible(start + 360, 452, "camera", 2.1);
            addBranchCollectible(start + 585, 472, "file", 3.1);
        } else {
            state.level.solids.push({ x: start + 235, y: GROUND_Y - 40, w: 95, h: 40, type: "crate", v4Branch: true });
            addBranchCollectible(start + 120, GROUND_Y - 72, "microphone", 1.4);
            addBranchCollectible(start + 450, GROUND_Y - 72, "file", 2.7);
        }

        state.level.branchObjects.push({ start, end, route: option.route, title: option.title });
    }

    function resolveDecision(option, automatic = false) {
        if (!state.decision || state.decision.resolved) return;
        state.decision.resolved = true;
        applyBranchChoice(option);
        state.branchChoice = option;
        state.score += option.bonus;
        state.metrics.correct += 1;
        state.profile.storyFlags[`route-${state.levelIndex}`] = option.route;
        adjustReputation(option.route === "upper" ? 2 : 1, "saha rota kararı");
        queueTicker(`${state.level.city}: ${option.title} seçildi; karar sonraki şehir akışını etkileyecek.`);
        ui.branchStatusText.textContent = option.title;
        ui.decisionOverlay.classList.remove("active");
        showToast(automatic ? "Güvenli rota seçildi" : "Rota güncellendi", `${option.title}: +${option.bonus} puan`);
        showFloatingMessage(`${option.title} +${option.bonus}`);
        queueRadio("Haber Şefi", option.route === "upper" ? "Üst rota açıldı. Platformlarda ekstra görüntü var." : "Güvenli rota açıldı. Dubalar saha ekibi tarafından kaldırılıyor.", 4.4);
        state.decision = null;
        state.lastTime = performance.now();
        setMode("playing");
        triggerScreenFlash();
    }

    function startDeadline(data) {
        if (data.triggered) return;
        data.triggered = true;
        state.deadline = {
            data,
            remaining: data.duration,
            total: data.duration,
            resolved: false
        };
        ui.deadlineObjective.textContent = data.title;
        ui.deadlineWidget.classList.add("active");
        queueRadio("Reji", data.title, 4.8);
        triggerCinematic(1.055, 0, 1.2);
    }

    function finishDeadline(success) {
        if (!state.deadline || state.deadline.resolved) return;
        const deadline = state.deadline;
        deadline.resolved = true;
        deadline.data.completed = success;
        ui.deadlineWidget.classList.remove("active");

        if (success) {
            state.score += deadline.data.bonus;
            state.metrics.deadlineSuccess += 1;
            adjustReputation(3, "zamanında bağlantı");
            showToast("Zamanında bağlantı", `+${deadline.data.bonus} puan`);
            showFloatingMessage(`Süre bonusu +${deadline.data.bonus}`);
            queueRadio("Reji", "Harika, bağlantı penceresini yakaladın.", 3.8);
        } else {
            state.score = Math.max(state.levelStartScore, state.score - 250);
            adjustReputation(-3, "geciken bağlantı");
            showToast("Bağlantı penceresi kaçtı", "Yayın devam edecek ancak süre bonusu kaybedildi.");
            queueRadio("Reji", "Süre doldu. Yayın aracına devam et, bağlantıyı yeniden kuracağız.", 4.2);
        }

        state.deadline = null;
    }

    function updateDeadline(dt) {
        if (!state.deadline || state.deadline.resolved) return;
        state.deadline.remaining -= dt;
        const ratio = Math.max(0, state.deadline.remaining / state.deadline.total);
        ui.deadlineText.textContent = state.deadline.remaining.toFixed(1);
        ui.deadlineBar.style.width = `${ratio * 100}%`;

        if (player.x >= state.deadline.data.targetX) finishDeadline(true);
        else if (state.deadline.remaining <= 0) finishDeadline(false);
    }

    function startDroneMission(data) {
        if (data.triggered) return;
        data.triggered = true;
        state.droneMission = {
            data,
            remaining: data.duration,
            total: data.duration,
            x: W * 0.5,
            y: H * 0.48,
            vx: 0,
            vy: 0,
            targets: data.targets.map((name, index) => ({
                name,
                x: 250 + index * 390 + (index % 2) * 45,
                y: 180 + (index % 2) * 250,
                scanned: false,
                pulse: index * 1.8
            }))
        };
        input.left = false;
        input.right = false;
        input.up = false;
        input.down = false;
        ui.droneHud.classList.add("active");
        ui.droneStatusText.textContent = "Tarama aktif";
        ui.droneObjectiveText.textContent = data.title + " · Hedeflere yaklaş ve Space / E ile tara.";
        renderDroneTargetList();
        setMode("drone");
        queueRadio("Drone Operatörü", "Kontrol sende. Üç hedefi tarayıp saha haritasını oluştur.", 4.5);
    }

    function renderDroneTargetList() {
        if (!state.droneMission) return;
        ui.droneTargetList.innerHTML = state.droneMission.targets
            .map((target) => `<span class="${target.scanned ? "done" : ""}">${target.scanned ? "✓" : "○"} ${target.name}</span>`)
            .join("");
    }

    function scanDroneTarget() {
        const drone = state.droneMission;
        if (!drone) return;
        const target = drone.targets.find((item) => !item.scanned && Math.hypot(item.x - drone.x, item.y - drone.y) <= 100);
        if (!target) {
            showToast("Tarama menzili dışında", "İşaretli hedefe biraz daha yaklaş.");
            return;
        }

        target.scanned = true;
        state.score += 280;
        state.metrics.droneTargets += 1;
        state.inventory.camera += 1;
        state.cameraShake = Math.max(state.cameraShake, 4);
        renderDroneTargetList();
        showToast("Drone hedefi tarandı", `${target.name}: +280 puan`);
        if (drone.targets.every((item) => item.scanned)) finishDroneMission(true);
    }

    function updateDroneMission(dt) {
        const drone = state.droneMission;
        if (!drone) return;
        drone.remaining -= dt;
        ui.droneTimerText.textContent = `${Math.max(0, drone.remaining).toFixed(1)} sn`;

        let dx = 0;
        let dy = 0;
        if (input.left) dx -= 1;
        if (input.right) dx += 1;
        if (input.up) dy -= 1;
        if (input.down) dy += 1;
        const length = Math.hypot(dx, dy) || 1;
        drone.vx += ((dx / length) * 330 - drone.vx) * Math.min(1, dt * 6);
        drone.vy += ((dy / length) * 290 - drone.vy) * Math.min(1, dt * 6);
        if (!dx) drone.vx *= Math.max(0, 1 - dt * 5);
        if (!dy) drone.vy *= Math.max(0, 1 - dt * 5);
        drone.x = Math.max(70, Math.min(W - 70, drone.x + drone.vx * dt));
        drone.y = Math.max(105, Math.min(H - 70, drone.y + drone.vy * dt));

        if (input.actionPressed || input.jumpPressed) {
            input.actionPressed = false;
            input.jumpPressed = false;
            scanDroneTarget();
        }

        if (drone.remaining <= 0) finishDroneMission(false);
    }

    function finishDroneMission(allScanned) {
        const drone = state.droneMission;
        if (!drone) return;
        const count = drone.targets.filter((target) => target.scanned).length;
        const bonus = allScanned ? 650 : count * 120;
        state.score += bonus;
        adjustReputation(allScanned ? 4 : count >= 2 ? 2 : -1, allScanned ? "eksiksiz drone taraması" : "drone taraması");
        ui.droneHud.classList.remove("active");
        ui.droneStatusText.textContent = `${count}/3 tarandı`;
        showToast(allScanned ? "Hava taraması tamamlandı" : "Drone geri çağrıldı", `${count}/3 hedef · +${bonus} puan`);
        queueRadio("Haber Şefi", allScanned ? "Harita eksiksiz geldi. Saha ekibi yeni rotayı işaretliyor." : "Eldeki görüntüler yeterli. Göreve yerden devam et.", 4.3);
        state.droneMission = null;
        state.lastTime = performance.now();
        setMode("playing");
        triggerCinematic(1.08, -8, 1.1);
        updateUi();
    }

    function startFieldPhoto(data) {
        if (data.triggered) return;
        data.triggered = true;
        state.fieldPhoto = {
            data,
            value: 4,
            direction: 1,
            speed: 58 + state.levelIndex * 5,
            resolved: false
        };
        ui.fieldPhotoTitle.textContent = data.title;
        ui.fieldPhotoText.textContent = data.text;
        ui.fieldPhotoFeedback.textContent = "";
        buttons.photoCapture.disabled = false;
        ui.photoNeedle.style.left = "4%";
        ui.fieldPhotoOverlay.classList.add("active");
        setMode("fieldPhoto");
        queueRadio("Görüntü Masası", "Kadrajın merkezini yeşil alana getir ve fotoğrafı çek.", 4.1);
    }

    function updateFieldPhoto(dt) {
        const photo = state.fieldPhoto;
        if (!photo || photo.resolved) return;
        photo.value += photo.direction * photo.speed * dt;
        if (photo.value >= 96) { photo.value = 96; photo.direction = -1; }
        if (photo.value <= 4) { photo.value = 4; photo.direction = 1; }
        ui.photoNeedle.style.left = `${photo.value}%`;
    }

    function resolveFieldPhoto() {
        const photo = state.fieldPhoto;
        if (!photo || photo.resolved) return;
        photo.resolved = true;
        buttons.photoCapture.disabled = true;
        const distance = Math.abs(photo.value - 50);
        let bonus = 160;
        let message = "Kadraj kullanılabilir; görüntü masası küçük bir kırpma yapacak.";
        if (distance <= 7) {
            bonus = 720;
            message = "Mükemmel kadraj! Ana görüntü olarak yayına alındı.";
            state.inventory.camera += 2;
        } else if (distance <= 16) {
            bonus = 430;
            message = "Başarılı kadraj. Görüntü yayına hazır.";
            state.inventory.camera += 1;
        }
        state.score += bonus;
        state.metrics.photos += 1;
        adjustReputation(distance <= 7 ? 4 : distance <= 16 ? 2 : 0, "saha görüntüsü");
        if (distance <= 7) unlockCollection(state.level.collectionIds[1]);
        ui.fieldPhotoFeedback.textContent = `${message} +${bonus} puan`;
        ui.fieldPhotoFeedback.style.color = distance <= 16 ? "#7bf0ae" : "#ffd166";
        triggerScreenFlash();
        setTimeout(() => {
            ui.fieldPhotoOverlay.classList.remove("active");
            state.fieldPhoto = null;
            state.lastTime = performance.now();
            setMode("playing");
            updateUi();
        }, 1050);
    }

    function startInterview(data) {
        if (data.triggered) return;
        data.triggered = true;
        state.interview = { data, resolved: false, attempts: 0 };
        ui.interviewTitle.textContent = data.title;
        ui.interviewText.textContent = data.text;
        ui.interviewFeedback.textContent = "";
        ui.interviewOptions.innerHTML = "";

        shuffle(data.people).forEach((person) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "interview-option";
            button.innerHTML = `<div class="interview-avatar">${person.avatar}</div><strong>${person.name}</strong><span>${person.detail}</span>`;
            button.addEventListener("click", () => resolveInterview(person, button));
            ui.interviewOptions.appendChild(button);
        });

        ui.interviewOverlay.classList.add("active");
        setMode("interview");
        queueRadio("Haber Şefi", "Söylenti değil, yetkili ve doğrulanabilir kaynak arıyoruz.", 4.2);
    }

    function resolveInterview(person, button) {
        if (!state.interview || state.interview.resolved) return;
        state.interview.attempts += 1;
        if (!person.correct) {
            button.disabled = true;
            button.classList.add("wrong");
            state.score = Math.max(state.levelStartScore, state.score - 80);
            adjustReputation(-3, "yanlış röportaj kaynağı");
            ui.interviewFeedback.textContent = "Bu kişi resmî ve doğrulanabilir bilgi veremez. Başka bir kaynak seç.";
            ui.interviewFeedback.style.color = "#ff8c96";
            return;
        }

        state.interview.resolved = true;
        button.classList.add("correct");
        [...ui.interviewOptions.querySelectorAll("button")].forEach((item) => item.disabled = true);
        const firstTry = state.interview.attempts === 1;
        const bonus = firstTry ? 650 : 420;
        state.score += bonus;
        state.inventory.microphone += firstTry ? 2 : 1;
        state.metrics.interviews += 1;
        state.metrics.correct += 1;
        adjustReputation(firstTry ? 5 : 3, "doğru röportaj kaynağı");
        ui.interviewFeedback.textContent = `Doğru kaynak! Röportaj kaydı tamamlandı. +${bonus} puan`;
        ui.interviewFeedback.style.color = "#7bf0ae";
        setTimeout(() => {
            ui.interviewOverlay.classList.remove("active");
            state.interview = null;
            state.lastTime = performance.now();
            setMode("playing");
            updateUi();
        }, 1050);
    }

    function startSecretRun(zone) {
        if (zone.used) return;
        zone.used = true;
        zone.discovered = true;
        state.secretsFound += 1;
        state.metrics.secrets += 1;
        state.secretRun = {
            zone,
            remaining: zone.duration,
            total: zone.duration,
            distance: 0,
            speed: 390,
            y: 500,
            vy: 0,
            grounded: true,
            invincible: 0,
            collected: 0,
            obstacles: [620, 1320, 2060].map((x, i) => ({ x, w: 56 + i * 4, h: 55 + (i % 2) * 18, hit: false })),
            items: [360, 920, 1580, 2290].map((x, i) => ({ x, y: i % 2 ? 420 : 500, collected: false, type: ["file", "camera", "microphone"][i % 3] }))
        };
        input.jumpPressed = false;
        setInteractionHint(false);
        setMode("secret");
        queueRadio("Kameraman", `${zone.title} açık. Bu kestirme seni ilerideki güvenli noktaya çıkaracak.`, 4.4);
        showToast("Gizli yol keşfedildi", zone.title);
    }

    function updateSecretRun(dt) {
        const run = state.secretRun;
        if (!run) return;
        run.remaining -= dt;
        run.distance += run.speed * dt;
        run.invincible = Math.max(0, run.invincible - dt);

        if (input.jumpPressed && run.grounded) {
            run.vy = -760;
            run.grounded = false;
        }
        input.jumpPressed = false;
        run.vy += GRAVITY * dt;
        run.y += run.vy * dt;
        if (run.y >= 500) {
            run.y = 500;
            run.vy = 0;
            run.grounded = true;
        }

        run.obstacles.forEach((obstacle) => {
            const sx = obstacle.x - run.distance + 300;
            if (!obstacle.hit && run.invincible <= 0 && sx < 350 && sx + obstacle.w > 300 && run.y + 70 > 550 - obstacle.h) {
                obstacle.hit = true;
                run.invincible = 1.1;
                state.score = Math.max(state.levelStartScore, state.score - 90);
                state.cameraShake = Math.max(state.cameraShake, 10);
            }
        });

        run.items.forEach((item) => {
            const sx = item.x - run.distance + 300;
            if (!item.collected && Math.abs(sx - 330) < 48 && Math.abs(item.y - run.y) < 95) {
                item.collected = true;
                run.collected += 1;
                state.inventory[item.type] += 1;
                state.score += 160;
            }
        });

        if (run.remaining <= 0 || run.distance >= 2700) finishSecretRun();
    }

    function finishSecretRun() {
        const run = state.secretRun;
        if (!run) return;
        const bonus = run.zone.bonus + run.collected * 110;
        state.score += bonus;
        player.x = run.zone.exitX;
        player.y = GROUND_Y - player.height;
        player.vx = 0;
        player.vy = 0;
        player.checkpointX = Math.max(player.checkpointX, run.zone.exitX - 80);
        ui.secretStatusText.textContent = String(state.secretsFound);
        adjustReputation(3, "gizli geçit keşfi");
        showToast("Kestirme tamamlandı", `+${bonus} puan · ${run.collected} ekipman`);
        state.secretRun = null;
        state.lastTime = performance.now();
        setMode("playing");
        triggerCinematic(1.09, 0, 1.2);
        updateUi();
    }

    function spawnHelper(data) {
        if (data.triggered) return;
        data.triggered = true;
        state.helper = {
            name: data.name,
            x: player.x - 92,
            y: player.y + 12,
            remaining: data.duration,
            shield: 1,
            collected: 0,
            phase: 0
        };
        ui.helperStatusText.textContent = data.name;
        showToast("Saha yardımcısı katıldı", `${data.name}: bir darbeyi engeller ve yakın delilleri toplar.`);
        queueRadio(data.name, "Ben arkandayım. Kamerayı ve yakın delilleri ben takip edeceğim.", 4.4);
    }

    function collectItemByHelper(item) {
        if (item.collected) return;
        item.collected = true;
        state.inventory[item.type] += 1;
        state.metrics.evidence += 1;
        state.profile.totals.evidence += 1;
        state.helper.collected += 1;
        progressHiddenMission(item.type);
        const scoreGain = item.type === "file" ? 150 : 120;
        state.score += scoreGain;
        spawnCollectParticles(item);
        spawnScoreParticle(item, scoreGain);
        updateDailyProgress("evidence", 1);
        if (item.type === "camera") updateDailyProgress("camera", 1);
    }

    function updateHelper(dt) {
        const helper = state.helper;
        if (!helper) return;
        helper.remaining -= dt;
        helper.phase += dt * 8;
        const targetX = player.x - player.facing * 84;
        helper.x += (targetX - helper.x) * Math.min(1, dt * 4.2);
        helper.y += ((player.y + 12) - helper.y) * Math.min(1, dt * 5.2);

        const nearby = state.level.collectibles.find((item) => !item.collected && Math.abs(item.x - helper.x) < 76 && Math.abs(item.y - helper.y) < 105);
        if (nearby) collectItemByHelper(nearby);

        if (helper.remaining <= 0) {
            showToast("Saha yardımcısı ayrıldı", `${helper.name}, ${helper.collected} delil topladı.`);
            ui.helperStatusText.textContent = "Yok";
            state.helper = null;
        } else {
            ui.helperStatusText.textContent = `${helper.name} · ${Math.ceil(helper.remaining)} sn`;
        }
    }

    function useHelperShield() {
        if (!state.helper || state.helper.shield <= 0) return false;
        state.helper.shield -= 1;
        state.metrics.helperSaves += 1;
        state.cameraShake = Math.max(state.cameraShake, 8);
        player.invincible = 1.3;
        showToast("Kameraman korudu", "Bir darbe saha yardımcısı tarafından engellendi.");
        queueRadio(state.helper.name, "Dikkat! Bu darbeyi atlattık ama kalkanımız kalmadı.", 3.8);
        return true;
    }

    function updateV4Npcs(dt) {
        state.level.activeNpcs.forEach((npc) => {
            if (!npc.range) return;
            npc.x = npc.baseX + Math.sin(state.levelElapsed * npc.speed + npc.phase) * npc.range;
        });
    }

    function updateSecretInteraction() {
        const zone = state.level.v4.secret;
        const close = !zone.used && Math.abs((player.x + player.width * 0.5) - zone.x) < 70 && player.grounded;
        state.interactionZone = close ? zone : null;
        setInteractionHint(close, `Gizli geçide gir · ${zone.title}`);
        if (close && (input.actionPressed || input.down)) {
            input.actionPressed = false;
            startSecretRun(zone);
        }
    }

    function updateV4Triggers(dt) {
        const v4 = state.level.v4;
        v4.radio.forEach((message) => {
            if (!message.triggered && player.x >= message.x) {
                message.triggered = true;
                queueRadio(message.speaker, message.text);
            }
        });

        if (!v4.helper.triggered && player.x >= v4.helper.x) spawnHelper(v4.helper);
        if (!v4.decision.triggered && player.x >= v4.decision.x) { startDecision(v4.decision); return; }
        if (!v4.drone.triggered && player.x >= v4.drone.x) { startDroneMission(v4.drone); return; }
        if (!v4.photo.triggered && player.x >= v4.photo.x) { startFieldPhoto(v4.photo); return; }
        if (!v4.interview.triggered && player.x >= v4.interview.x) { startInterview(v4.interview); return; }
        if (!v4.deadline.triggered && player.x >= v4.deadline.x) startDeadline(v4.deadline);

        updateDeadline(dt);
        updateHelper(dt);
        updateV4Npcs(dt);
        updateSecretInteraction();
    }

    function renderReportBossSteps() {
        const boss = state.reportBoss;
        const labels = [
            ["⚡", "Güç"],
            ["▣", "Kamera"],
            ["●", "Mikrofon"],
            ["⌁", "Sinyal"]
        ];
        ui.reportBossSteps.innerHTML = labels.map(([icon, label], index) => {
            const className = index < boss.stage ? "done" : index === boss.stage ? "active" : "";
            return `<div class="report-boss-step ${className}"><span>${index < boss.stage ? "✓" : icon}</span>${label}</div>`;
        }).join("");
    }

    function startReportBoss() {
        state.reportBoss = {
            completed: false,
            stage: 0,
            quality: 0,
            meter: 5,
            direction: 1,
            sequence: [2, 4, 1, 3],
            sequenceIndex: 0
        };
        setMode("reportBoss");
        ui.reportBossOverlay.classList.add("active");
        ui.reportBossFeedback.textContent = "";
        queueRadio("Reji", "Yayın aracındasın. Dört sistemi devreye al ve sonra canlı bağlantıyı başlat.", 4.7);
        renderReportBossStage();
    }

    function renderReportBossStage() {
        const boss = state.reportBoss;
        if (!boss) return;
        renderReportBossSteps();
        ui.reportBossFeedback.textContent = "";
        ui.reportBossChallenge.innerHTML = "";

        if (boss.stage === 0) {
            ui.reportBossText.textContent = "Jeneratörü güvenli biçimde devreye almak için doğru güç hattını seç.";
            ui.reportBossChallenge.innerHTML = `<div class="boss-choice-grid">
                <button type="button" data-power="wrong">Kırmızı · Servis dışı</button>
                <button type="button" data-power="correct">Yeşil · Ana güç</button>
                <button type="button" data-power="wrong">Sarı · Yedek çıkış</button>
            </div>`;
            ui.reportBossChallenge.querySelectorAll("button").forEach((button) => {
                button.addEventListener("click", () => {
                    if (button.dataset.power === "correct") completeReportBossStage(25, "Güç sistemi aktif.");
                    else {
                        button.disabled = true;
                        boss.quality = Math.max(0, boss.quality - 4);
                        ui.reportBossFeedback.textContent = "Bu hat aktif değil. Ana güç hattını seç.";
                        ui.reportBossFeedback.style.color = "#ff8c96";
                    }
                });
            });
        } else if (boss.stage === 1 || boss.stage === 2) {
            const cameraStage = boss.stage === 1;
            boss.meter = 5;
            boss.direction = 1;
            ui.reportBossText.textContent = cameraStage ? "Kamera seviyesini yeşil alanda kilitle." : "Mikrofon seviyesini yeşil alanda kilitle.";
            ui.reportBossChallenge.innerHTML = `<div class="boss-meter-wrap">
                <div class="boss-meter"><div class="boss-meter-target"></div><div id="bossMeterNeedle" class="boss-meter-needle"></div></div>
                <button id="bossMeterButton" class="primary-button" type="button">${cameraStage ? "Kadrajı Kilitle" : "Sesi Kilitle"}</button>
            </div>`;
            document.getElementById("bossMeterButton").addEventListener("click", resolveReportBossMeter);
        } else if (boss.stage === 3) {
            ui.reportBossText.textContent = "Sinyal kodlarını 2 → 4 → 1 → 3 sırasıyla etkinleştir.";
            ui.reportBossChallenge.innerHTML = `<div class="signal-sequence">${[1,2,3,4].map((number) => `<button type="button" class="signal-key" data-signal="${number}">${number}</button>`).join("")}</div>`;
            ui.reportBossChallenge.querySelectorAll("button").forEach((button) => {
                button.addEventListener("click", () => resolveSignalKey(Number(button.dataset.signal), button));
            });
        }
    }

    function updateReportBoss(dt) {
        const boss = state.reportBoss;
        if (!boss || ![1, 2].includes(boss.stage)) return;
        boss.meter += boss.direction * dt * (boss.stage === 1 ? 74 : 82);
        if (boss.meter >= 98) { boss.meter = 98; boss.direction = -1; }
        if (boss.meter <= 2) { boss.meter = 2; boss.direction = 1; }
        const needle = document.getElementById("bossMeterNeedle");
        if (needle) needle.style.left = `${boss.meter}%`;
    }

    function resolveReportBossMeter() {
        const boss = state.reportBoss;
        if (!boss || ![1, 2].includes(boss.stage)) return;
        const distance = Math.abs(boss.meter - 52);
        const quality = distance <= 8 ? 25 : distance <= 18 ? 18 : 10;
        completeReportBossStage(quality, distance <= 8 ? "Mükemmel ayar." : distance <= 18 ? "Yayın için yeterli ayar." : "Ayar kabul edildi ancak kalite bonusu düşük.");
    }

    function resolveSignalKey(number, button) {
        const boss = state.reportBoss;
        if (!boss || boss.stage !== 3) return;
        const expected = boss.sequence[boss.sequenceIndex];
        if (number !== expected) {
            button.classList.add("wrong");
            boss.sequenceIndex = 0;
            boss.quality = Math.max(0, boss.quality - 5);
            ui.reportBossFeedback.textContent = "Sıra bozuldu. 2 numaradan yeniden başla.";
            ui.reportBossFeedback.style.color = "#ff8c96";
            setTimeout(() => button.classList.remove("wrong"), 350);
            ui.reportBossChallenge.querySelectorAll("button").forEach((item) => item.classList.remove("hit"));
            return;
        }

        button.classList.add("hit");
        boss.sequenceIndex += 1;
        if (boss.sequenceIndex >= boss.sequence.length) completeReportBossStage(25, "Yayın sinyali kilitlendi.");
    }

    function completeReportBossStage(quality, message) {
        const boss = state.reportBoss;
        if (!boss) return;
        boss.quality += quality;
        ui.reportBossFeedback.textContent = message;
        ui.reportBossFeedback.style.color = "#7bf0ae";
        setTimeout(() => {
            boss.stage += 1;
            if (boss.stage >= 4) finishReportBoss();
            else renderReportBossStage();
        }, 520);
    }

    function finishReportBoss() {
        const boss = state.reportBoss;
        if (!boss) return;
        const bagBoost = Math.round(getBagQuality() * 0.2);
        boss.quality = Math.min(100, boss.quality + bagBoost);
        boss.completed = true;
        state.metrics.bossQuality = boss.quality;
        const bonus = 300 + boss.quality * 7;
        state.score += bonus;
        ui.reportBossOverlay.classList.remove("active");
        showToast("Yayın aracı hazır", `Kurulum kalitesi %${boss.quality} · +${bonus} puan`);
        queueRadio("Reji", "Tüm sistemler hazır. Son adım: doğru anda canlı yayına gir.", 4.0);
        openBroadcastTiming();
    }



    function loadSettings() {
        return { ...DEFAULT_SETTINGS, ...safeParse(localStorage.getItem(SETTINGS_STORAGE_KEY), {}) };
    }

    function saveSettings() {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(state.settings));
    }

    function applySettings() {
        const settings = state.settings || DEFAULT_SETTINGS;
        document.body.classList.toggle("compact-hud", settings.compactHud !== false);
        if (ui.compactHudToggle) ui.compactHudToggle.checked = settings.compactHud !== false;
        if (ui.dynamicWeatherToggle) ui.dynamicWeatherToggle.checked = settings.dynamicWeather !== false;
        if (ui.cameraShakeToggle) ui.cameraShakeToggle.checked = settings.cameraShake !== false;
    }

    function chooseAtmosphere(level = state.level) {
        const keys = level?.atmospheres?.length ? level.atmospheres : ["morning-clear"];
        const selectedKey = state.settings?.dynamicWeather === false
            ? keys[0]
            : keys[Math.floor(Math.random() * keys.length)];
        state.atmosphere = { key: selectedKey, ...(ATMOSPHERES[selectedKey] || ATMOSPHERES["morning-clear"]) };
        return state.atmosphere;
    }

    function getReputationRank(value = state.profile.reputation) {
        if (value >= 85) return "Baş Muhabir";
        if (value >= 70) return "Güvenilir Muhabir";
        if (value >= 55) return "Kıdemli Saha Muhabiri";
        if (value >= 40) return "Gelişen Muhabir";
        return "Güveni Onaran Muhabir";
    }

    function adjustReputation(amount, reason = "") {
        const previous = Number(state.profile.reputation || 50);
        const next = Math.max(0, Math.min(100, previous + amount));
        const actual = next - previous;
        if (!actual) return;
        state.profile.reputation = next;
        state.metrics.reputationDelta += actual;
        saveProfile();
        updateV5Hud();
        if (reason) showFloatingMessage(`${actual > 0 ? "+" : ""}${actual} güven · ${reason}`);
    }

    function calculateBroadcastQuality() {
        const bag = getBagQuality();
        const boss = state.metrics.bossQuality || 0;
        const field = Math.min(18,
            state.metrics.droneTargets * 2 +
            state.metrics.photos * 3 +
            state.metrics.interviews * 3 +
            state.metrics.puzzleSuccess * 4 +
            state.metrics.vehicleSuccess * 3 +
            state.metrics.hiddenMissionSuccess * 4
        );
        const penalties = state.metrics.wrong * 4 + state.metrics.damage * 6;
        return Math.max(0, Math.min(100, Math.round(bag * 0.45 + boss * 0.35 + field - penalties + 10)));
    }

    function updateV5Hud() {
        const atmosphere = state.atmosphere || ATMOSPHERES["morning-clear"];
        const quality = calculateBroadcastQuality();
        state.broadcastQuality = quality;
        if (ui.weatherIcon) ui.weatherIcon.textContent = atmosphere.icon;
        if (ui.weatherPeriodText) ui.weatherPeriodText.textContent = atmosphere.period;
        if (ui.weatherConditionText) ui.weatherConditionText.textContent = atmosphere.condition;
        if (ui.qualityText) ui.qualityText.textContent = `${quality}%`;
        if (ui.qualityBar) ui.qualityBar.style.width = `${quality}%`;
        if (ui.reputationText) ui.reputationText.textContent = state.profile.reputation;
        if (ui.topReputationText) ui.topReputationText.textContent = state.profile.reputation;
        if (ui.reputationRankText) ui.reputationRankText.textContent = getReputationRank();
        if (ui.menuReputationText) ui.menuReputationText.textContent = state.profile.reputation;
        if (ui.menuBroadcastCount) ui.menuBroadcastCount.textContent = state.profile.totals.broadcasts || 0;
        if (ui.menuCollectionCount) ui.menuCollectionCount.textContent = `${Object.keys(state.profile.collections || {}).filter((id) => state.profile.collections[id]).length}/${COLLECTION_ITEMS.length}`;
    }

    function queueTicker(text) {
        if (!text) return;
        if (!state.tickerQueue.includes(text)) state.tickerQueue.push(text);
        if (!ui.newsTickerText.textContent || state.tickerIndex <= 0) {
            ui.newsTickerText.textContent = state.tickerQueue.shift() || text;
            state.tickerIndex = 6.5;
        }
    }

    function updateTicker(dt) {
        state.tickerIndex -= dt;
        if (state.tickerIndex > 0 || !state.tickerQueue.length) return;
        ui.newsTickerText.textContent = state.tickerQueue.shift();
        state.tickerIndex = 6.5;
    }

    function unlockCollection(id, announce = true) {
        const item = COLLECTION_ITEMS.find((entry) => entry.id === id);
        if (!item || state.profile.collections[id]) return false;
        state.profile.collections[id] = true;
        saveProfile();
        checkGlobalAchievements();
        if (announce) showToast("Basın müzesine eklendi", `${item.icon} ${item.name}`);
        return true;
    }

    function renderCollection() {
        ui.collectionGrid.innerHTML = "";
        COLLECTION_ITEMS.forEach((item) => {
            const unlocked = Boolean(state.profile.collections[item.id]);
            const card = document.createElement("div");
            card.className = `collection-item ${unlocked ? "unlocked" : "locked"}`;
            card.innerHTML = `<span>${unlocked ? item.icon : "?"}</span><strong>${unlocked ? item.name : "Kilitli Parça"}</strong><small>${unlocked ? item.text : "Şehir görevlerinde gizli hedefleri tamamla."}</small>`;
            ui.collectionGrid.appendChild(card);
        });
    }

    function openCollection() {
        renderCollection();
        ui.collectionOverlay.classList.add("active");
    }

    function renderTodayEvents() {
        ui.todayEventCards.innerHTML = "";
        CITY_EVENT_CHAINS.forEach((event, index) => {
            const level = LEVELS[index];
            const unlocked = index < state.profile.unlockedLevel;
            const card = document.createElement("article");
            card.className = `today-event-card${unlocked ? "" : " locked"}`;
            card.innerHTML = `<span>${level.cityIcon} ${level.city.toLocaleUpperCase("tr-TR")}</span><h3>${event.stage}</h3><p>${event.consequence}</p><small>${unlocked ? "Saha ekibi göreve hazır" : "Önceki şehir görevini tamamlayınca açılır"}</small>`;
            ui.todayEventCards.appendChild(card);
        });
    }

    function openTodayEvents() {
        renderTodayEvents();
        ui.todayEventsOverlay.classList.add("active");
    }

    function showMissionHud(icon, title, text, seconds = null, actions = []) {
        ui.eventBanner.classList.remove("active");
        state.eventBannerTimer = 0;
        ui.toastStack.innerHTML = "";
        ui.missionHudIcon.textContent = icon;
        ui.missionHudTitle.textContent = title;
        ui.missionHudText.textContent = text;
        ui.missionHudTimer.textContent = seconds == null ? "" : `${Math.ceil(seconds)} sn`;
        ui.missionHudActions.innerHTML = "";
        actions.forEach((action) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = action.label;
            if (action.primary) button.classList.add("primary");
            button.addEventListener("click", action.onClick);
            ui.missionHudActions.appendChild(button);
        });
        ui.missionHudCard.classList.add("active");
    }

    function hideMissionHud() {
        ui.missionHudCard.classList.remove("active");
        ui.missionHudActions.innerHTML = "";
    }

    function startVehicleSequence(data) {
        if (data.triggered || state.vehicleSequence) return;
        data.triggered = true;
        const config = VEHICLE_CONFIGS[data.type] || VEHICLE_CONFIGS.motorcycle;
        state.vehicleSequence = {
            data,
            config,
            remaining: data.duration,
            total: data.duration,
            hits: 0,
            boost: 0,
            completed: false
        };
        ui.eventBanner.classList.remove("active");
        state.eventBannerTimer = 0;
        ui.toastStack.innerHTML = "";
        ui.vehicleIcon.textContent = config.badge;
        ui.vehicleHud.dataset.vehicle = data.type;
        ui.vehicleTitle.textContent = config.title;
        ui.vehicleObjective.textContent = `${config.objective} · ← fren, → hızlan`;
        ui.vehicleProgressBar.style.width = "0%";
        ui.vehicleHud.classList.add("active");
        queueRadio(state.levelIndex === 3 ? "Helikopter Pilotu" : "Ulaşım Ekibi", `${config.title} başladı. Hızını ayarla ve çarpışmadan ilerle.`, 4.2);
        queueTicker(`${state.level.city}: saha ekibi ${config.title.toLocaleLowerCase("tr-TR")} ile olay yerine ilerliyor.`);
        triggerCinematic(1.06, 0, 1.1);
    }

    function updateVehicleSequence(dt) {
        const run = state.vehicleSequence;
        if (!run || run.completed) return;
        run.remaining -= dt;
        run.boost += ((input.right ? 1 : input.left ? -0.7 : 0) - run.boost) * Math.min(1, dt * 4);
        const ratio = Math.max(0, 1 - run.remaining / run.total);
        ui.vehicleProgressBar.style.width = `${ratio * 100}%`;
        if (run.remaining > 0) return;
        run.completed = true;
        const bonus = Math.max(250, 850 - run.hits * 180);
        state.score += bonus;
        state.metrics.vehicleSuccess += run.hits <= 1 ? 1 : 0;
        adjustReputation(run.hits === 0 ? 3 : run.hits === 1 ? 1 : -1, run.hits === 0 ? "temiz araç sekansı" : "araç görevi");
        ui.vehicleHud.classList.remove("active");
        ui.vehicleHud.removeAttribute("data-vehicle");
        showFloatingMessage(run.hits === 0 ? `Temiz sürüş +${bonus}` : `Araç görevi +${bonus}`);
        queueTicker(`${state.level.city}: saha ekibi olay bölgesine ulaştı.`);
        state.vehicleSequence = null;
    }

    function registerVehicleHit() {
        const run = state.vehicleSequence;
        if (!run || player.invincible > 0) return false;
        run.hits += 1;
        state.score = Math.max(state.levelStartScore, state.score - 100);
        state.metrics.damage += 1;
        player.invincible = 1.15;
        state.cameraShake = Math.max(state.cameraShake, 8);
        showFloatingMessage("Araç teması · -100");
        return true;
    }

    function startEnvironmentalPuzzle(data) {
        if (data.triggered || data.solved) return;
        data.triggered = true;
        const puzzles = [
            { icon:"⚡", title:"Trafik Sinyalini Aç", text:"Yayın aracının geçişi için güvenli enerji hattını seç.", choices:["Ana güç hattı","Hasarlı servis hattı","Yalıtımsız kablo"], correct:0 },
            { icon:"🌊", title:"Tahliye Köprüsünü İndir", text:"Su yükselmeden hidrolik sistemi doğru sırada çalıştır.", choices:["Pompa → Kilit → Köprü","Köprü → Kilit → Pompa","Kilidi kır"], correct:0 },
            { icon:"🏟", title:"Basın Asansörünü Çağır", text:"Kalabalığı aksatmadan basın katına çıkış seç.", choices:["Basın kartını okut","Acil çıkışı zorla","Saha kapısını aç"], correct:0 },
            { icon:"🔥", title:"Duman Tahliye Fanını Aç", text:"Rüzgâr yönüne uygun fan kanalını etkinleştir.", choices:["Kuzey tahliye kanalı","Dumana karşı kapalı kanal","Yakıt deposu hattı"], correct:0 },
            { icon:"🌪", title:"Fırtına Bariyerini Sabitle", text:"Canlı yayın alanını korumak için doğru bağlantıyı seç.", choices:["Çapraz güvenlik halatı","Tek gevşek ip","Elektrik kablosu"], correct:0 }
        ];
        const puzzle = puzzles[state.levelIndex] || puzzles[0];
        state.environmentalPuzzle = { data, puzzle, attempts:0, solved:false };
        setMode("puzzle");
        showMissionHud(puzzle.icon, puzzle.title, puzzle.text, null, puzzle.choices.map((label, index) => ({ label, primary:index===0, onClick:() => resolveEnvironmentalPuzzle(index) })));
        queueRadio("Saha Koordinatörü", "Çevresel düzenek yolu kapatıyor. Küçük görev kartındaki doğru işlemi seç.", 4.1);
    }

    function resolveEnvironmentalPuzzle(index) {
        const active = state.environmentalPuzzle;
        if (!active || active.solved) return;
        active.attempts += 1;
        if (index !== active.puzzle.correct) {
            state.metrics.wrong += 1;
            state.score = Math.max(state.levelStartScore, state.score - 80);
            adjustReputation(-2, "hatalı saha işlemi");
            showMissionHud(active.puzzle.icon, active.puzzle.title, "Bu işlem güvenli değil. Doğru saha prosedürünü yeniden seç.", null, active.puzzle.choices.map((label, choiceIndex) => ({ label, primary:choiceIndex===0, onClick:() => resolveEnvironmentalPuzzle(choiceIndex) })));
            return;
        }
        active.solved = true;
        active.data.solved = true;
        state.metrics.puzzleSuccess += 1;
        state.metrics.correct += 1;
        const bonus = active.attempts === 1 ? 650 : 400;
        state.score += bonus;
        adjustReputation(active.attempts === 1 ? 4 : 2, "doğru saha prosedürü");
        hideMissionHud();
        queueTicker(`${state.level.city}: çevresel engel güvenli biçimde kaldırıldı.`);
        showToast("Çevresel bulmaca çözüldü", `+${bonus} puan`);
        state.environmentalPuzzle = null;
        state.lastTime = performance.now();
        setMode("playing");
    }

    function startHiddenMission(data) {
        if (data.triggered || data.completed) return;
        data.triggered = true;
        const missions = [
            { icon:"🐈", title:"Gizli Görev: Mahsur Kalan Kediyi Bul", text:"Süre bitmeden 2 haber dosyası toplayarak konumu doğrula.", item:"file" },
            { icon:"🧒", title:"Gizli Görev: Kayıp Çocuğun İzini Bul", text:"Süre bitmeden herhangi 2 delili güvenlik ekibine ulaştır.", item:"any" },
            { icon:"📷", title:"Gizli Görev: Arşiv Görüntüsünü Kurtar", text:"Süre bitmeden 2 kamera kaydı topla.", item:"camera" }
        ];
        const mission = missions[data.type % missions.length];
        state.hiddenMission = { data, mission, remaining:data.total || 18, total:data.total || 18, progress:0, target:2, completed:false };
        showMissionHud(mission.icon, mission.title, `${mission.text} · 0/2`, state.hiddenMission.remaining);
        queueRadio("Yerel Editör", "Ana görevin yanında gizli bir saha ihtiyacı belirdi. İstersen ilerlerken tamamlayabilirsin.", 4.3);
    }

    function updateHiddenMission(dt) {
        const mission = state.hiddenMission;
        if (!mission || mission.completed) return;
        mission.remaining -= dt;
        ui.missionHudTimer.textContent = `${Math.max(0, Math.ceil(mission.remaining))} sn`;
        ui.missionHudText.textContent = `${mission.mission.text} · ${mission.progress}/${mission.target}`;
        if (mission.remaining <= 0) {
            hideMissionHud();
            queueTicker(`${state.level.city}: yan görev süresi doldu; ana habere devam ediliyor.`);
            state.hiddenMission = null;
        }
    }

    function progressHiddenMission(itemType) {
        const mission = state.hiddenMission;
        if (!mission || mission.completed) return;
        if (mission.mission.item !== "any" && mission.mission.item !== itemType) return;
        mission.progress += 1;
        if (mission.progress >= mission.target) finishHiddenMission();
    }

    function finishHiddenMission() {
        const mission = state.hiddenMission;
        if (!mission || mission.completed) return;
        mission.completed = true;
        mission.data.completed = true;
        state.metrics.hiddenMissionSuccess += 1;
        state.score += 750;
        adjustReputation(5, "gizli yardım görevi");
        unlockCollection(state.level.collectionIds[0]);
        hideMissionHud();
        showToast("Gizli görev tamamlandı", "+750 puan ve müze parçası");
        queueTicker(`${state.level.city}: saha ekibi gizli yardım görevini de tamamladı.`);
        state.hiddenMission = null;
    }

    function updateV5Triggers(dt) {
        const v5 = state.level?.v5;
        if (!v5) return;
        if (!v5.vehicle.triggered && player.x >= v5.vehicle.x) startVehicleSequence(v5.vehicle);
        if (!v5.puzzle.triggered && player.x >= v5.puzzle.x) { startEnvironmentalPuzzle(v5.puzzle); return; }
        if (!v5.hiddenMission.triggered && player.x >= v5.hiddenMission.x) startHiddenMission(v5.hiddenMission);
        updateVehicleSequence(dt);
        updateHiddenMission(dt);
    }

    function drawVehicleSequence() {
        const run = state.vehicleSequence;
        if (!run) return;

        const x = player.x - state.cameraX + player.width * 0.5;
        const baseline = player.y + player.height + 4;
        const wheelSpin = state.elapsed * (8 + run.config.speed * 5);

        ctx.save();
        ctx.globalAlpha = player.invincible > 0 && Math.floor(player.invincible * 10) % 2 === 0 ? .35 : 1;

        if (run.data.type === "motorcycle") drawSequenceMotorcycle(x, baseline, wheelSpin);
        else if (run.data.type === "rescue-boat") drawSequenceBoat(x, baseline);
        else if (run.data.type === "live-van") drawSequenceLiveVan(x, baseline, wheelSpin);
        else if (run.data.type === "helicopter") drawSequenceHelicopter(x, player.y + 35);
        else drawSequenceBicycle(x, baseline, wheelSpin);

        ctx.restore();
    }

    function drawVehicleShadow(x, y, width, alpha = .22) {
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.beginPath();
        ctx.ellipse(x, y, width * .5, 7, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawWheel(x, y, radius, spin = 0) {
        ctx.fillStyle = "#111923";
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#738394"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(x, y, radius - 4, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = "rgba(220,232,241,.75)"; ctx.lineWidth = 1.5;
        for (let i = 0; i < 6; i += 1) {
            const a = spin + i * Math.PI / 3;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * (radius - 5), y + Math.sin(a) * (radius - 5)); ctx.stroke();
        }
        ctx.fillStyle = "#d7e1e9";
        ctx.beginPath(); ctx.arc(x, y, 3.2, 0, Math.PI * 2); ctx.fill();
    }

    function drawRider(x, y, leaning = 0) {
        ctx.save();
        ctx.translate(x, y); ctx.rotate(leaning);
        ctx.strokeStyle = "#172b42"; ctx.lineWidth = 8; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(-8, 47); ctx.moveTo(0, 24); ctx.lineTo(19, 38); ctx.stroke();
        ctx.fillStyle = "#1b3857"; roundRect(ctx, -15, 0, 30, 31, 8); ctx.fill();
        ctx.fillStyle = "#ef3340"; ctx.fillRect(-12, 12, 24, 6);
        ctx.fillStyle = "#d5a17d"; ctx.beginPath(); ctx.arc(0, -10, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#d7dde1"; ctx.beginPath(); ctx.arc(-2, -14, 11, Math.PI, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    function drawSequenceMotorcycle(x, baseline, spin) {
        drawVehicleShadow(x, baseline + 5, 104);
        const rearX = x - 42, frontX = x + 43, wheelY = baseline - 17;
        drawWheel(rearX, wheelY, 18, spin); drawWheel(frontX, wheelY, 18, spin);
        ctx.strokeStyle = "#d7e2ea"; ctx.lineWidth = 5; ctx.lineJoin = "round";
        ctx.beginPath(); ctx.moveTo(rearX, wheelY); ctx.lineTo(x - 9, wheelY - 24); ctx.lineTo(x + 25, wheelY - 5); ctx.lineTo(frontX, wheelY); ctx.stroke();
        ctx.fillStyle = "#ef3340"; roundRect(ctx, x - 25, wheelY - 37, 48, 22, 8); ctx.fill();
        ctx.fillStyle = "#f4f7f9"; roundRect(ctx, x - 3, wheelY - 43, 30, 12, 5); ctx.fill();
        ctx.strokeStyle = "#1b2732"; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(x + 25, wheelY - 28); ctx.lineTo(frontX - 3, wheelY - 2); ctx.moveTo(x + 20, wheelY - 31); ctx.lineTo(x + 35, wheelY - 39); ctx.stroke();
        ctx.fillStyle = "#ffd166"; ctx.beginPath(); ctx.arc(frontX + 2, wheelY - 18, 5, 0, Math.PI * 2); ctx.fill();
        drawRider(x - 9, wheelY - 76, .12);
    }

    function drawSequenceBicycle(x, baseline, spin) {
        drawVehicleShadow(x, baseline + 5, 100);
        const rearX = x - 40, frontX = x + 40, wheelY = baseline - 17;
        drawWheel(rearX, wheelY, 20, spin); drawWheel(frontX, wheelY, 20, spin);
        ctx.strokeStyle = "#53b9db"; ctx.lineWidth = 4; ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(rearX, wheelY); ctx.lineTo(x - 9, wheelY - 27); ctx.lineTo(x + 8, wheelY); ctx.lineTo(rearX, wheelY);
        ctx.moveTo(x - 9, wheelY - 27); ctx.lineTo(x + 25, wheelY - 28); ctx.lineTo(frontX, wheelY);
        ctx.moveTo(x + 8, wheelY); ctx.lineTo(x + 25, wheelY - 28); ctx.stroke();
        ctx.strokeStyle = "#d9e4ec"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(x + 25, wheelY - 28); ctx.lineTo(x + 31, wheelY - 43); ctx.lineTo(x + 43, wheelY - 43); ctx.stroke();
        drawRider(x - 5, wheelY - 75, -.08);
    }

    function drawSequenceLiveVan(x, baseline, spin) {
        drawVehicleShadow(x, baseline + 5, 142);
        const y = baseline - 66;
        ctx.fillStyle = "#edf2f5"; roundRect(ctx, x - 72, y, 145, 58, 11); ctx.fill();
        ctx.fillStyle = "#d92536"; roundRect(ctx, x - 72, y + 32, 145, 26, 8); ctx.fill();
        ctx.fillStyle = "#1c344d"; roundRect(ctx, x - 48, y + 8, 42, 22, 4); ctx.fill(); roundRect(ctx, x + 4, y + 8, 37, 22, 4); ctx.fill();
        ctx.fillStyle = "white"; ctx.font = "900 13px Arial"; ctx.textAlign = "center"; ctx.fillText("TGRT HABER", x + 28, y + 50);
        ctx.strokeStyle = "#dce6ed"; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(x - 48, y); ctx.lineTo(x - 38, y - 22); ctx.lineTo(x + 7, y - 22); ctx.stroke();
        ctx.fillStyle = "#253544"; roundRect(ctx, x - 44, y - 28, 56, 8, 3); ctx.fill();
        drawWheel(x - 45, baseline - 8, 16, spin); drawWheel(x + 45, baseline - 8, 16, spin);
        ctx.fillStyle = "#ffd166"; ctx.fillRect(x + 66, y + 38, 5, 8);
    }

    function drawSequenceBoat(x, baseline) {
        const bob = Math.sin(state.elapsed * 5) * 3;
        const y = baseline - 49 + bob;
        ctx.strokeStyle = "rgba(216,244,255,.75)"; ctx.lineWidth = 4;
        for (let i = 0; i < 3; i += 1) { ctx.beginPath(); ctx.arc(x - 48 + i * 42, baseline + 1 + bob, 28, .15, Math.PI - .15); ctx.stroke(); }
        ctx.fillStyle = "#e7edf1"; ctx.beginPath(); ctx.moveTo(x - 72, y + 29); ctx.lineTo(x + 72, y + 29); ctx.lineTo(x + 47, y + 55); ctx.lineTo(x - 51, y + 55); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#ef3340"; ctx.fillRect(x - 59, y + 35, 111, 10);
        ctx.fillStyle = "#1f3e5a"; roundRect(ctx, x - 29, y, 57, 32, 7); ctx.fill();
        ctx.fillStyle = "#9fd8ef"; ctx.fillRect(x - 21, y + 6, 17, 13); ctx.fillRect(x + 3, y + 6, 17, 13);
        ctx.fillStyle = "white"; ctx.font = "900 10px Arial"; ctx.textAlign = "center"; ctx.fillText("KURTARMA", x, y + 51);
        drawRider(x - 38, y - 34, 0);
    }

    function drawSequenceHelicopter(x, y) {
        const bob = Math.sin(state.elapsed * 4) * 4;
        y += bob;
        ctx.strokeStyle = "rgba(0,0,0,.2)"; ctx.lineWidth = 7;
        ctx.beginPath(); ctx.ellipse(x, GROUND_Y + 4, 76, 9, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.save(); ctx.translate(x, y);
        ctx.fillStyle = "#dfe7ec"; ctx.beginPath(); ctx.ellipse(0, 4, 58, 30, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#d92536"; ctx.fillRect(-44, 16, 83, 12);
        ctx.fillStyle = "#17324a"; ctx.beginPath(); ctx.ellipse(-18, -2, 26, 18, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#90cce4"; ctx.beginPath(); ctx.ellipse(-19, -3, 19, 12, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#dfe7ec"; ctx.beginPath(); ctx.moveTo(45, 0); ctx.lineTo(100, -9); ctx.lineTo(103, 8); ctx.lineTo(42, 16); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#ef3340"; ctx.fillRect(96, -20, 7, 39);
        ctx.strokeStyle = "#243544"; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(-34, 31); ctx.lineTo(-23, 43); ctx.lineTo(30, 43); ctx.lineTo(40, 31); ctx.stroke();
        ctx.strokeStyle = "#e8f0f5"; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(0, -27); ctx.lineTo(0, -42); ctx.stroke();
        ctx.strokeStyle = "#172536"; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(-78, -42); ctx.lineTo(78, -42); ctx.stroke();
        ctx.strokeStyle = "rgba(200,220,232,.7)"; ctx.lineWidth = 2;
        const rotor = state.elapsed * 18;
        ctx.beginPath(); ctx.moveTo(Math.cos(rotor) * 82, -42 + Math.sin(rotor) * 4); ctx.lineTo(-Math.cos(rotor) * 82, -42 - Math.sin(rotor) * 4); ctx.stroke();
        ctx.fillStyle = "white"; ctx.font = "900 11px Arial"; ctx.textAlign = "center"; ctx.fillText("HABER", 10, 24);
        ctx.restore();
    }

    function drawAtmosphereOverlay() {
        const atmosphere = state.atmosphere;
        if (!atmosphere) return;
        ctx.save();
        ctx.fillStyle = atmosphere.tint;
        ctx.fillRect(0, 0, W, H);
        if (atmosphere.weather === "fog" || atmosphere.weather === "smoke") {
            for (let i = 0; i < 8; i += 1) {
                const x = ((i * 210 + state.elapsed * 20) % (W + 300)) - 150;
                const y = 115 + (i % 4) * 100;
                ctx.fillStyle = atmosphere.weather === "smoke" ? "rgba(87,68,61,.12)" : "rgba(225,238,242,.13)";
                ctx.beginPath(); ctx.ellipse(x, y, 190, 42, 0, 0, Math.PI * 2); ctx.fill();
            }
        }
        if (atmosphere.weather === "wind" || atmosphere.weather === "storm") {
            ctx.strokeStyle = "rgba(235,246,255,.22)"; ctx.lineWidth = 2;
            for (let i = 0; i < 18; i += 1) {
                const x = ((i * 91 + state.elapsed * 420) % (W + 180)) - 90;
                const y = 80 + (i * 47) % 520;
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 42, y - 8); ctx.stroke();
            }
        }
        ctx.restore();
    }

    function createLiveReportText() {
        const evidence = getEvidenceCount();
        const choice = state.branchChoice?.title || "güvenli saha rotası";
        const hidden = state.metrics.hiddenMissionSuccess ? "Yan yardım görevi de tamamlandı." : "Ekip ana haber akışına odaklandı.";
        return `${state.level.city}'daki ${state.level.name.toLocaleLowerCase("tr-TR")} gelişmesini olay yerinden aktarıyoruz. ${evidence} doğrulanmış delil toplandı, ${choice} kullanıldı ve yayın kalitesi yüzde ${state.broadcastQuality} olarak ölçüldü. ${hidden}`;
    }

    function openLiveTv() {
        ui.broadcastOverlay.classList.remove("active");
        setMode("liveTv");
        const now = new Date();
        ui.tvCityText.textContent = state.level.city.toLocaleUpperCase("tr-TR");
        ui.tvClockText.textContent = now.toLocaleTimeString("tr-TR", { hour:"2-digit", minute:"2-digit" });
        ui.tvQualityText.textContent = `${state.broadcastQuality}%`;
        ui.tvBreakingText.textContent = state.broadcastQuality >= 75 ? "DOĞRULANMIŞ SON DAKİKA" : "SAHADAN İLK BİLGİLER";
        ui.tvHeadlineText.textContent = `${state.level.city}: ${state.level.name}`;
        ui.tvTickerText.textContent = `${getEvidenceCount()} doğrulanmış delil · TGRT Güven ${state.profile.reputation} · ${state.metrics.viewers.toLocaleString("tr-TR")} izleyici`;
        ui.tvReportText.textContent = createLiveReportText();
        ui.liveTvOverlay.classList.add("active");
    }

    function closeLiveTvAndReport() {
        ui.liveTvOverlay.classList.remove("active");
        showLevelReport();
    }

    function renderRanking() {
        const playerScore = state.profile.levelRecords.reduce((sum, record) => sum + (record.bestScore || 0), 0) + state.profile.reputation * 120 + getTotalStars() * 450;
        const reporters = [
            { name:"Selin Kaya", rank:"Baş Muhabir", score:28600 },
            { name:"Mert Demir", rank:"Canlı Yayın Uzmanı", score:24150 },
            { name:"Ayşe Yıldız", rank:"Kıdemli Muhabir", score:21800 },
            { name:"Can Arslan", rank:"Saha Muhabiri", score:17650 },
            { name:"Sen", rank:getReputationRank(), score:playerScore, me:true }
        ].sort((a,b) => b.score - a.score);
        ui.rankingList.innerHTML = "";
        reporters.forEach((person, index) => {
            const row = document.createElement("div");
            row.className = `ranking-row${person.me ? " me" : ""}`;
            row.innerHTML = `<div class="ranking-position">${index + 1}</div><div class="ranking-person"><strong>${person.name}</strong><small>${person.rank}</small></div><div class="ranking-score"><strong>${person.score.toLocaleString("tr-TR")}</strong><small>performans</small></div>`;
            ui.rankingList.appendChild(row);
        });
    }

    function openRanking() {
        renderRanking();
        ui.rankingOverlay.classList.add("active");
    }

    function applyStoryChainAtLevelStart(index) {
        if (index <= 0) return;
        const previousRoute = state.profile.storyFlags[`route-${index - 1}`];
        if (!previousRoute) return;
        if (previousRoute === "upper") {
            state.score += 180;
            state.level.collectibles.push({ x:520, y:GROUND_Y - 125, r:18, type:"camera", collected:false, phase:4.2, storyBonus:true });
            state.level.v5.vehicle.duration = Math.max(8.5, state.level.v5.vehicle.duration - 1.5);
            queueRadio("Haber Şefi", "Önceki görevdeki hızlı rota yeni ihbarı erken almamızı sağladı. Ek görüntü fırsatı açıldı.", 4.5);
            queueTicker(`${state.level.city}: önceki saha kararının sağladığı erken bilgi avantajı kullanılıyor.`);
        } else {
            if (state.level.v4?.helper) state.level.v4.helper.duration += 5;
            state.level.v5.hiddenMission.total += 5;
            queueRadio("Haber Şefi", "Önceki güvenli rota ekip desteğini güçlendirdi. Kameraman daha uzun süre yanında.", 4.5);
            queueTicker(`${state.level.city}: güvenli rota tercihi sayesinde destek ekibi güçlendirildi.`);
        }
    }

    function todayKey() {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    function createDailyTasks() {
        const day = new Date().getDate();
        const variants = [
            [
                { id: "evidence", text: "12 delil topla", target: 12, progress: 0 },
                { id: "gates", text: "3 saha görevini tamamla", target: 3, progress: 0 },
                { id: "level", text: "1 bölümü tamamla", target: 1, progress: 0 }
            ],
            [
                { id: "evidence", text: "15 delil topla", target: 15, progress: 0 },
                { id: "routes", text: "2 ödüllü rota kullan", target: 2, progress: 0 },
                { id: "correct", text: "2 doğru bilgi seçimi yap", target: 2, progress: 0 }
            ],
            [
                { id: "camera", text: "5 kamera kaydı topla", target: 5, progress: 0 },
                { id: "mini", text: "2 saha mini görevini bitir", target: 2, progress: 0 },
                { id: "level", text: "1 bölümü tamamla", target: 1, progress: 0 }
            ]
        ];

        return {
            date: todayKey(),
            tasks: variants[day % variants.length],
            rewarded: false
        };
    }

    function loadDaily() {
        const saved = safeParse(localStorage.getItem(DAILY_STORAGE_KEY), null);
        if (!saved || saved.date !== todayKey()) return createDailyTasks();
        return saved;
    }

    function saveProfile() {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state.profile));
    }

    function saveDaily() {
        localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(state.daily));
    }

    function getProfileLevel() {
        return Math.max(1, Math.floor(state.profile.xp / 1000) + 1);
    }

    function getProfileRank() {
        return RANKS[Math.min(RANKS.length - 1, Math.floor((getProfileLevel() - 1) / 2))];
    }

    function getEquipmentLevel(offset = 0) {
        return Math.min(5, 1 + Math.floor((state.profile.xp + offset) / 1800));
    }

    function getTotalStars() {
        return state.profile.levelRecords.reduce((sum, record) => sum + (record.stars || 0), 0);
    }

    function updateProfileUi() {
        const level = getProfileLevel();
        const rank = getProfileRank();
        const levelBase = (level - 1) * 1000;
        const levelProgress = state.profile.xp - levelBase;

        ui.totalStarsText.textContent = `${getTotalStars()}/${LEVELS.length * 3}`;
        ui.profileRankText.textContent = rank;
        ui.profileLevelText.textContent = `Seviye ${level}`;
        ui.profileModalRank.textContent = rank;
        ui.profileModalLevel.textContent = level;
        ui.profileXpText.textContent = `${levelProgress} / 1000 XP`;
        ui.profileXpBar.style.width = `${Math.min(100, levelProgress / 10)}%`;
        ui.cameraLevelText.textContent = `Seviye ${getEquipmentLevel(0)}`;
        ui.microphoneLevelText.textContent = `Seviye ${getEquipmentLevel(450)}`;
        ui.bagLevelText.textContent = `Seviye ${getEquipmentLevel(900)}`;
        ui.profileReputationText.textContent = state.profile.reputation;
        ui.profileReputationRank.textContent = getReputationRank();
        const completedCities = state.profile.levelRecords.filter((record) => (record.stars || 0) > 0).length;
        if (ui.menuQuestionCount) ui.menuQuestionCount.textContent = Object.values(QUESTION_BANKS).reduce((sum, questions) => sum + questions.length, 0).toLocaleString("tr-TR");
        if (ui.menuProgressText) ui.menuProgressText.textContent = `${completedCities}/${LEVELS.length} şehir`;
        if (ui.menuProgressBar) ui.menuProgressBar.style.width = `${Math.round(completedCities / LEVELS.length * 100)}%`;
        updateV5Hud();
    }

    function renderDailyTasks() {
        ui.dailyTaskList.innerHTML = "";

        state.daily.tasks.forEach((task) => {
            const done = task.progress >= task.target;
            const element = document.createElement("div");
            element.className = `daily-task${done ? " done" : ""}`;
            const percent = Math.min(100, (task.progress / task.target) * 100);
            element.innerHTML = `
                <div class="daily-task-top"><span>${done ? "✓ " : ""}${task.text}</span><strong>${Math.min(task.progress, task.target)}/${task.target}</strong></div>
                <div class="daily-mini-track"><div class="daily-mini-fill" style="width:${percent}%"></div></div>
            `;
            ui.dailyTaskList.appendChild(element);
        });
    }

    function updateDailyProgress(id, amount = 1) {
        const task = state.daily.tasks.find((item) => item.id === id);
        if (!task || task.progress >= task.target) return;

        task.progress = Math.min(task.target, task.progress + amount);
        renderDailyTasks();
        saveDaily();

        if (task.progress >= task.target) {
            showToast("Günlük görev tamamlandı", task.text);
        }

        if (!state.daily.rewarded && state.daily.tasks.every((item) => item.progress >= item.target)) {
            state.daily.rewarded = true;
            state.profile.xp += 500;
            unlockAchievement("daily-pro");
            showToast("Günlük seri tamamlandı", "+500 XP kazandın.");
            saveDaily();
            saveProfile();
            updateProfileUi();
        }
    }

    function unlockAchievement(id) {
        if (state.profile.achievements[id]) return false;
        const achievement = ACHIEVEMENTS.find((item) => item.id === id);
        if (!achievement) return false;

        state.profile.achievements[id] = true;
        state.profile.xp += 150;
        saveProfile();
        showToast(`Başarım açıldı: ${achievement.name}`, achievement.text);
        return true;
    }

    function checkGlobalAchievements() {
        if (state.profile.totals.evidence >= 25) unlockAchievement("collector");
        if (state.profile.totals.routes >= 3) unlockAchievement("route-master");
        if (state.profile.levelRecords.every((record) => record.stars > 0)) unlockAchievement("all-reports");
        if (getTotalStars() >= 12) unlockAchievement("nine-stars");
        if (state.profile.reputation >= 80) unlockAchievement("trusted");
        if (Object.values(state.profile.collections || {}).filter(Boolean).length >= 10) unlockAchievement("museum");
        updateProfileUi();
    }

    function showToast(title, text = "") {
        const quietTitles = new Set([
            "Görev başladı",
            "Kontrol noktası tamamlandı",
            "Ulaşım sekansı tamamlandı",
            "Ödüllü rota tamamlandı",
            "Çevresel bulmaca çözüldü",
            "Yayın aracı hazır"
        ]);
        if (quietTitles.has(title)) return;

        const now = performance.now();
        const important = /Başarım|Günlük|müze|hasar|Gizli görev/i.test(title);
        if (!important && now - state.lastToastAt < 2200) return;
        state.lastToastAt = now;

        ui.toastStack.innerHTML = "";
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<strong>${title}</strong>${text ? `<span>${text}</span>` : ""}`;
        ui.toastStack.appendChild(toast);
        setTimeout(() => toast.remove(), important ? 2100 : 1550);
    }

    function triggerScreenFlash() {
        ui.screenFlash.classList.remove("active");
        void ui.screenFlash.offsetWidth;
        ui.screenFlash.classList.add("active");
    }

    function renderAchievements() {
        ui.achievementGrid.innerHTML = "";
        ACHIEVEMENTS.forEach((achievement) => {
            const unlocked = Boolean(state.profile.achievements[achievement.id]);
            const item = document.createElement("div");
            item.className = `achievement${unlocked ? "" : " locked"}`;
            item.innerHTML = `<span>${achievement.icon}</span><strong>${achievement.name}</strong><small>${achievement.text}</small>`;
            ui.achievementGrid.appendChild(item);
        });
    }

    function openProfile() {
        updateProfileUi();
        renderAchievements();
        ui.profileOverlay.classList.add("active");
    }

    function renderChapterMap() {
        ui.chapterCards.innerHTML = "";
        if (ui.mapRoute) ui.mapRoute.innerHTML = "";
        const completed = state.profile.levelRecords.filter((record) => (record.stars || 0) > 0).length;
        if (ui.mapSummaryText) ui.mapSummaryText.textContent = `${completed}/${LEVELS.length} şehir tamamlandı · Açık bir noktaya tıklayarak göreve çık.`;

        LEVELS.forEach((level, index) => {
            const unlocked = index < state.profile.unlockedLevel;
            const record = state.profile.levelRecords[index] || { stars:0, bestScore:0 };
            const atmosphereKey = level.atmospheres?.[0] || "morning-clear";
            const atmosphere = ATMOSPHERES[atmosphereKey];

            if (ui.mapRoute) {
                const node = document.createElement("button");
                node.type = "button";
                node.className = `map-city-node${unlocked ? "" : " locked"}${record.stars ? " completed" : ""}`;
                node.style.setProperty("--node-index", index);
                node.style.setProperty("--node-left", `${5 + index * 22.5}%`);
                node.style.setProperty("--node-top-mobile", `${13 + index * 57}px`);
                node.innerHTML = `<span>${index + 1}</span><strong>${level.city}</strong><small>${record.stars ? "★".repeat(record.stars) : unlocked ? "Görev açık" : "Kilitli"}</small>`;
                if (unlocked) node.addEventListener("click", () => {
                    ui.mapOverlay.classList.remove("active"); state.score = 0; state.selectedLevelIndex = index; loadLevel(index);
                });
                ui.mapRoute.appendChild(node);
            }

            const button = document.createElement("button");
            button.type = "button";
            button.className = `chapter-card chapter-card-v52${unlocked ? "" : " locked"}`;
            button.innerHTML = `
                <div class="chapter-card-top"><span class="chapter-number">DOSYA ${String(index + 1).padStart(2, "0")}</span><span class="chapter-status">${record.stars ? "TAMAMLANDI" : unlocked ? "HAZIR" : "KİLİTLİ"}</span></div>
                <span class="city-label">${level.city}</span>
                <h3>${level.name}</h3>
                <p>${level.subtitle}</p>
                <div class="chapter-info-line"><span>${atmosphere.period} · ${atmosphere.condition}</span><span>${level.evidenceGoal} delil</span></div>
                <div class="chapter-card-bottom"><div class="chapter-stars">${"★".repeat(record.stars)}${"☆".repeat(3 - record.stars)}</div><div class="chapter-best">${Math.floor(record.bestScore).toLocaleString("tr-TR")} puan</div></div>`;
            if (unlocked) button.addEventListener("click", () => {
                ui.mapOverlay.classList.remove("active"); state.score = 0; state.selectedLevelIndex = index; loadLevel(index);
            });
            ui.chapterCards.appendChild(button);
        });
    }

    function openMap() {
        renderChapterMap();
        ui.mapOverlay.classList.add("active");
    }

    function resetLevelMetrics() {
        state.metrics = {
            damage:0, correct:0, wrong:0, miniMissions:0, rewardRoutes:0, evidence:0,
            broadcastDistance:100, droneTargets:0, interviews:0, photos:0, secrets:0,
            deadlineSuccess:0, bossQuality:0, helperSaves:0, puzzleSuccess:0,
            vehicleSuccess:0, hiddenMissionSuccess:0, reputationDelta:0, viewers:0
        };
        state.levelStartScore = state.score;
        state.reputationAtLevelStart = state.profile.reputation;
        state.activeEvent = null; state.activeBonus = null; state.currentRoute = null;
        state.decision = null; state.deadline = null; state.droneMission = null;
        state.fieldPhoto = null; state.interview = null; state.secretRun = null;
        state.helper = null; state.radioQueue = []; state.activeRadio = null;
        state.cameraZoom = 1; state.cameraTargetZoom = 1; state.cameraYOffset = 0;
        state.cameraTargetYOffset = 0; state.cinematicTimer = 0; state.interactionZone = null;
        state.reportBoss = null; state.branchChoice = null; state.secretsFound = 0;
        state.vehicleSequence = null; state.environmentalPuzzle = null; state.hiddenMission = null;
        state.eventBannerTimer = 0; state.lastToastAt = 0;
        state.broadcastQuality = 50; state.tickerQueue = []; state.tickerIndex = 0;
        ui.eventBanner.classList.remove("active"); ui.deadlineWidget.classList.remove("active");
        ui.droneHud.classList.remove("active"); ui.radioPanel.classList.remove("active");
        ui.vehicleHud.classList.remove("active"); ui.vehicleHud.removeAttribute("data-vehicle"); hideMissionHud(); setInteractionHint(false);
    }

    function showBriefing() {
        const data = state.level.v3;
        ui.briefingEyebrow.textContent = `BÖLÜM ${state.levelIndex + 1} · ${state.level.city.toLocaleUpperCase("tr-TR")} MASASI`;
        ui.briefingWeather.textContent = weatherLabelForLevel();
        ui.briefingTitle.textContent = `${state.level.cityIcon} ${state.level.name}`;
        ui.briefingText.textContent = state.level.subtitle;
        ui.briefingGoals.innerHTML = data.goals.map((goal) => `<li>${goal}</li>`).join("");
        ui.briefingRouteText.textContent = `${data.routeText} · Araç: ${(VEHICLE_CONFIGS[state.level.vehicleType] || VEHICLE_CONFIGS.motorcycle).title}`;
        ui.briefingOverlay.classList.add("active");
        setMode("briefing");
    }

    function beginLevel() {
        ui.briefingOverlay.classList.remove("active");
        state.lastTime = performance.now();
        setMode("playing");
        showToast("Görev başladı", state.level.name);
    }

    function addXp(amount) {
        state.profile.xp += Math.max(0, Math.floor(amount));
        saveProfile();
        updateProfileUi();
    }

    function weatherLabelForLevel() {
        const atmosphere = state.atmosphere || ATMOSPHERES["morning-clear"];
        return `${atmosphere.icon} ${atmosphere.period} · ${atmosphere.condition}`;
    }

    function resetPlayer() {
        player.x = 150;
        player.y = GROUND_Y - player.height;
        player.prevX = player.x;
        player.prevY = player.y;
        player.vx = 0;
        player.vy = 0;
        player.facing = 1;
        player.grounded = false;
        player.coyote = 0;
        player.invincible = 0;
        player.checkpointX = 150;
        player.runCycle = 0;
        state.cameraX = 0;
    }

    function resetInventory() {
        state.inventory.camera = 0;
        state.inventory.microphone = 0;
        state.inventory.file = 0;
    }

    function startNewGame() {
        const unfinished = state.profile.levelRecords.findIndex((record, index) => index < state.profile.unlockedLevel && (record.stars || 0) === 0);
        const startIndex = unfinished >= 0 ? unfinished : Math.max(0, Math.min(LEVELS.length - 1, state.profile.unlockedLevel - 1));
        state.levelIndex = startIndex;
        state.selectedLevelIndex = startIndex;
        state.score = 0;
        state.hearts = MAX_HEARTS;
        state.elapsed = 0;
        loadLevel(startIndex);
    }

    function loadLevel(index) {
        state.levelIndex = index;
        state.selectedLevelIndex = index;
        state.level = createLevel(index);
        chooseAtmosphere(state.level);
        state.levelElapsed = 0;
        state.currentQuestionGate = null;
        state.miniGame = null;
        state.broadcastResolved = false;
        state.broadcastValue = 0;
        state.broadcastDirection = 1;
        state.hearts = MAX_HEARTS;
        input.left = false; input.right = false; input.up = false; input.down = false;
        input.jumpPressed = false; input.actionPressed = false;
        resetInventory(); resetPlayer(); resetLevelMetrics(); closeAllOverlays();
        applyStoryChainAtLevelStart(index);
        updateStaticUi(); updateUi(); updateV5Hud();
        const chain = CITY_EVENT_CHAINS[index];
        queueTicker(`${state.level.city}: ${chain.stage}. ${chain.consequence}`);
        showBriefing();
    }

    function closeAllOverlays() {
        [ui.menuOverlay,ui.briefingOverlay,ui.questionOverlay,ui.miniGameOverlay,ui.broadcastOverlay,
         ui.pauseOverlay,ui.gameOverOverlay,ui.levelCompleteOverlay,ui.mapOverlay,ui.profileOverlay,
         ui.completeOverlay,ui.decisionOverlay,ui.interviewOverlay,ui.fieldPhotoOverlay,ui.reportBossOverlay,
         ui.todayEventsOverlay,ui.collectionOverlay,ui.rankingOverlay,ui.settingsOverlay,ui.liveTvOverlay]
            .forEach((overlay) => overlay?.classList.remove("active"));
        ui.droneHud.classList.remove("active"); ui.deadlineWidget.classList.remove("active");
        ui.radioPanel.classList.remove("active"); ui.vehicleHud.classList.remove("active");
        hideMissionHud(); setInteractionHint(false);
    }

    function showMenu() {
        state.mode = "menu";
        closeAllOverlays();
        updateProfileUi(); renderDailyTasks(); renderTodayEvents(); updateV5Hud();
        const nextIndex = Math.max(0, Math.min(LEVELS.length - 1, state.profile.unlockedLevel - 1));
        ui.deskHeadline.textContent = `${LEVELS[nextIndex].city} ekibi · ${CITY_EVENT_CHAINS[nextIndex].stage}`;
        if (ui.menuContinueMission) ui.menuContinueMission.textContent = LEVELS[nextIndex].name;
        if (ui.menuContinueCity) ui.menuContinueCity.textContent = `${LEVELS[nextIndex].city} · Bölüm ${nextIndex + 1}`;
        ui.menuOverlay.classList.add("active");
    }

    function updateStaticUi() {
        const level = state.level;
        ui.levelBadge.textContent = `${level.cityIcon} Bölüm ${state.levelIndex + 1} · ${level.city}`;
        ui.missionTitle.textContent = level.name;
        ui.missionText.textContent = level.subtitle;
        ui.tipText.textContent = level.tip;
        ui.evidenceGoalText.textContent = level.evidenceGoal;
        ui.objectiveText.textContent = level.objective;
        ui.routeStateText.textContent = level.v3.routeText;
        ui.branchStatusText.textContent = "Bekleniyor"; ui.droneStatusText.textContent = "Hazır";
        ui.secretStatusText.textContent = "0"; ui.helperStatusText.textContent = "Yok";
        renderCheckpointList(); updateProfileUi(); renderDailyTasks(); updateV5Hud();
    }

    function getEvidenceCount() {
        return state.inventory.camera + state.inventory.microphone + state.inventory.file;
    }

    function renderCheckpointList() {
        ui.checkpointList.innerHTML = "";

        state.level.gates.forEach((gate, index) => {
            const element = document.createElement("div");
            const label = gate.kind === "question" ? "Bilgi doğrulama" : "Saha mini görevi";
            element.className = `checkpoint${gate.solved ? " done" : ""}`;
            element.innerHTML = `<span>${gate.solved ? "✓" : index + 1}</span> ${label}`;
            ui.checkpointList.appendChild(element);
        });

        const finish = document.createElement("div");
        const allSolved = state.level.gates.every((gate) => gate.solved);
        finish.className = `checkpoint${allSolved ? " done" : ""}`;
        finish.innerHTML = `<span>${allSolved ? "✓" : "3"}</span> Canlı yayın noktası`;
        ui.checkpointList.appendChild(finish);
    }

    function updateUi() {
        const level = state.level;
        if (!level) return;

        const progress = Math.max(0, Math.min(100, (player.x / level.finishX) * 100));
        ui.scoreText.textContent = Math.floor(state.score).toLocaleString("tr-TR");
        ui.bestText.textContent = Math.floor(state.best).toLocaleString("tr-TR");
        ui.progressText.textContent = `${Math.floor(progress)}%`;
        ui.progressBar.style.width = `${progress}%`;
        ui.heartList.textContent = "♥ ".repeat(Math.max(0, state.hearts)).trim() || "—";
        ui.evidenceText.textContent = getEvidenceCount();
        ui.cameraCount.textContent = state.inventory.camera;
        ui.micCount.textContent = state.inventory.microphone;
        ui.fileCount.textContent = state.inventory.file;
        const bagQuality = getBagQuality();
        ui.bagQualityText.textContent = `${bagQuality}%`;
        ui.bagQualityBar.style.width = `${bagQuality}%`;
        if (state.branchChoice) ui.branchStatusText.textContent = state.branchChoice.title;
        ui.secretStatusText.textContent = String(state.secretsFound);
        updateProfileUi();
    }

    function setMode(mode) {
        state.mode = mode;
    }

    function pauseGame() {
        if (state.mode !== "playing") return;
        setMode("paused");
        ui.pauseOverlay.classList.add("active");
    }

    function resumeGame() {
        if (state.mode !== "paused") return;
        ui.pauseOverlay.classList.remove("active");
        state.lastTime = performance.now();
        setMode("playing");
    }

    function retryLevel() {
        const preservedScore = Math.max(0, state.levelStartScore);
        loadLevel(state.levelIndex);
        state.score = preservedScore;
        state.levelStartScore = preservedScore;
        updateUi();
    }

    function completeGate(gate, bonus, message, isMini = false) {
        gate.solved = true;
        player.checkpointX = gate.x + 90;
        state.score += bonus;
        state.metrics.correct += 1;
        state.profile.totals.correct += 1;
        updateDailyProgress("correct", 1);

        if (isMini) {
            state.metrics.miniMissions += 1;
            adjustReputation(2, "saha mini görevi");
            updateDailyProgress("mini", 1);
        } else {
            updateDailyProgress("gates", 1);
        }

        renderCheckpointList();
        showToast("Kontrol noktası tamamlandı", message);
        state.cameraShake = Math.max(state.cameraShake, 4);
        triggerScreenFlash();
        saveProfile();
    }

    function openQuestion(gate) {
        state.currentQuestionGate = gate;
        gate.attempts += 1;
        setMode("question");
        ui.questionFeedback.textContent = "";
        const category = QUESTION_CATEGORY_LABELS[gate.question.category] || "Genel kültür";
        const difficulty = QUESTION_DIFFICULTY_LABELS[gate.question.difficulty || 1];
        if (ui.questionMeta) ui.questionMeta.textContent = `${category.toLocaleUpperCase("tr-TR")} · ${difficulty.toLocaleUpperCase("tr-TR")}`;
        ui.questionTitle.textContent = gate.question.title;
        ui.questionText.textContent = gate.question.text;
        ui.answerList.innerHTML = "";

        gate.question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.className = "answer-button";
            button.type = "button";
            button.textContent = answer;
            button.addEventListener("click", () => answerQuestion(index, button));
            ui.answerList.appendChild(button);
        });

        ui.questionOverlay.classList.add("active");
    }

    function answerQuestion(index, selectedButton) {
        if (state.mode !== "question" || !state.currentQuestionGate) return;

        const gate = state.currentQuestionGate;
        const buttonsList = [...ui.answerList.querySelectorAll("button")];

        if (index === gate.question.correct) {
            selectedButton.classList.add("correct");
            buttonsList.forEach((button) => button.disabled = true);
            ui.questionFeedback.textContent = gate.question.explanation
                ? `Doğru · ${gate.question.explanation}`
                : "Doğru cevap! Yol açıldı ve 500 puan kazandın.";
            ui.questionFeedback.style.color = "#7bf0ae";
            adjustReputation(3, "doğru bilgi doğrulama");
            completeGate(gate, 500, "Bilgi doğrulama başarıyla tamamlandı.", false);

            setTimeout(() => {
                ui.questionOverlay.classList.remove("active");
                state.currentQuestionGate = null;
                state.lastTime = performance.now();
                setMode("playing");
            }, gate.question.explanation ? 1450 : 950);
        } else {
            selectedButton.classList.add("wrong");
            selectedButton.disabled = true;
            gate.attempts += 1;
            state.metrics.wrong += 1;
            adjustReputation(-3, "yanlış bilgi seçimi");
            ui.questionFeedback.textContent = `Yanlış seçim · ${gate.question.difficulty >= 3 ? "Sorunun anahtar ifadesini tekrar kontrol et." : "Diğer seçeneklerdeki kaynak ve güvenlik ölçütünü karşılaştır."}`;
            ui.questionFeedback.style.color = "#ff8c96";
            loseHeart(false);

            if (state.hearts <= 0) {
                ui.questionOverlay.classList.remove("active");
                return;
            }
        }

        updateUi();
    }

    function openMiniGame(gate) {
        const mission = gate.mission;
        state.currentQuestionGate = gate;
        gate.attempts += 1;
        state.miniGame = {
            gate,
            mission,
            resolved: false,
            sequenceProgress: 0,
            focusPosition: 4,
            focusDirection: 1,
            focusTarget: 52
        };

        ui.miniGameLabel.textContent = mission.label || "SAHA GÖREVİ";
        ui.miniGameTitle.textContent = mission.title;
        ui.miniGameText.textContent = mission.text;
        ui.miniGameFeedback.textContent = "";
        ui.miniGameArea.innerHTML = "";
        ui.miniGameAction.classList.add("hidden");
        ui.miniGameAction.disabled = false;

        if (["source", "headline", "interview"].includes(mission.type)) {
            renderChoiceMiniGame(mission);
        } else if (mission.type === "sequence") {
            renderSequenceMiniGame(mission);
        } else if (mission.type === "photo") {
            renderPhotoMiniGame();
        }

        setMode("miniGame");
        ui.miniGameOverlay.classList.add("active");
    }

    function renderChoiceMiniGame(mission) {
        const className = mission.type === "headline" ? "headline-grid" : mission.type === "interview" ? "interview-grid" : "source-grid";
        const cardClass = mission.type === "headline" ? "headline-card" : mission.type === "interview" ? "interview-card" : "source-card";
        const grid = document.createElement("div");
        grid.className = className;

        shuffle(mission.options).forEach((option) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = cardClass;
            button.innerHTML = mission.type === "headline"
                ? `<small>MANŞET ÖNERİSİ</small><strong>${option.text}</strong>`
                : `<strong>${option.title}</strong><small>${option.detail}</small>`;
            button.addEventListener("click", () => resolveChoiceMiniGame(option.correct, button));
            grid.appendChild(button);
        });

        ui.miniGameArea.appendChild(grid);
    }

    function resolveChoiceMiniGame(correct, button) {
        if (!state.miniGame || state.miniGame.resolved) return;

        if (correct) {
            button.classList.add("selected");
            state.miniGame.resolved = true;
            ui.miniGameFeedback.textContent = "Doğru seçim. Saha görevi tamamlandı.";
            ui.miniGameFeedback.style.color = "#7bf0ae";
            completeGate(state.miniGame.gate, 650, "Saha mini görevi başarıyla tamamlandı.", true);
            setTimeout(closeMiniGame, 900);
        } else {
            button.classList.add("wrong");
            button.disabled = true;
            state.miniGame.gate.attempts += 1;
            state.metrics.wrong += 1;
            state.score = Math.max(state.levelStartScore, state.score - 75);
            adjustReputation(-2, "uygunsuz yayın seçimi");
            ui.miniGameFeedback.textContent = "Bu seçim yayın standartlarına uygun değil. Başka bir seçenek dene.";
            ui.miniGameFeedback.style.color = "#ff8c96";
        }

        updateUi();
    }

    function renderSequenceMiniGame(mission) {
        const grid = document.createElement("div");
        grid.className = "sequence-grid";
        const shuffled = shuffle(mission.steps.map((text, expectedIndex) => ({ text, expectedIndex })));

        shuffled.forEach((step) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "sequence-card";
            button.innerHTML = `<span>?</span>${step.text}`;
            button.addEventListener("click", () => resolveSequenceStep(step, button));
            grid.appendChild(button);
        });

        ui.miniGameArea.appendChild(grid);
    }

    function resolveSequenceStep(step, button) {
        const mini = state.miniGame;
        if (!mini || mini.resolved || button.disabled) return;

        if (step.expectedIndex === mini.sequenceProgress) {
            mini.sequenceProgress += 1;
            button.classList.add("selected");
            button.disabled = true;
            button.querySelector("span").textContent = mini.sequenceProgress;
            ui.miniGameFeedback.textContent = `${mini.sequenceProgress}/3 adım doğru.`;
            ui.miniGameFeedback.style.color = "#7bf0ae";

            if (mini.sequenceProgress >= mini.mission.steps.length) {
                mini.resolved = true;
                completeGate(mini.gate, 750, "Yayın akışı doğru sırayla hazırlandı.", true);
                setTimeout(closeMiniGame, 900);
            }
        } else {
            button.classList.add("wrong");
            mini.gate.attempts += 1;
            state.metrics.wrong += 1;
            state.score = Math.max(state.levelStartScore, state.score - 80);
            ui.miniGameFeedback.textContent = "Sıra doğru değil. İlk adımdan tekrar başla.";
            ui.miniGameFeedback.style.color = "#ff8c96";
            mini.sequenceProgress = 0;
            [...ui.miniGameArea.querySelectorAll("button")].forEach((item) => {
                item.disabled = false;
                item.classList.remove("selected", "wrong");
                item.querySelector("span").textContent = "?";
            });
        }

        updateUi();
    }

    function renderPhotoMiniGame() {
        ui.miniGameArea.innerHTML = `
            <div class="focus-game">
                <div class="focus-scene"><div class="focus-building"></div><div class="focus-subject"></div></div>
                <div class="focus-target" style="left:46%;top:35%"></div>
                <div id="focusReticle" class="focus-reticle" style="left:4%;top:35%"></div>
                <div class="focus-hint">Beyaz çerçeveyi yeşil alana getir</div>
            </div>
        `;
        ui.miniGameAction.textContent = "Fotoğrafı Çek";
        ui.miniGameAction.classList.remove("hidden");
    }

    function updateMiniGame(dt) {
        if (state.mode !== "miniGame" || !state.miniGame || state.miniGame.mission.type !== "photo" || state.miniGame.resolved) return;
        const mini = state.miniGame;
        mini.focusPosition += mini.focusDirection * dt * 54;
        if (mini.focusPosition >= 82) {
            mini.focusPosition = 82;
            mini.focusDirection = -1;
        } else if (mini.focusPosition <= 2) {
            mini.focusPosition = 2;
            mini.focusDirection = 1;
        }
        const reticle = document.getElementById("focusReticle");
        if (reticle) reticle.style.left = `${mini.focusPosition}%`;
    }

    function resolvePhotoMiniGame() {
        const mini = state.miniGame;
        if (!mini || mini.mission.type !== "photo" || mini.resolved) return;
        const distance = Math.abs(mini.focusPosition - mini.focusTarget);

        if (distance <= 9) {
            mini.resolved = true;
            ui.miniGameAction.disabled = true;
            ui.miniGameFeedback.textContent = distance <= 4 ? "Mükemmel kadraj!" : "Kadraj başarılı.";
            ui.miniGameFeedback.style.color = "#7bf0ae";
            completeGate(mini.gate, distance <= 4 ? 900 : 700, "Kamera görevi tamamlandı.", true);
            triggerScreenFlash();
            setTimeout(closeMiniGame, 900);
        } else {
            mini.gate.attempts += 1;
            state.metrics.wrong += 1;
            state.score = Math.max(state.levelStartScore, state.score - 60);
            ui.miniGameFeedback.textContent = "Konu kadrajın dışında kaldı. Tekrar dene.";
            ui.miniGameFeedback.style.color = "#ff8c96";
        }

        updateUi();
    }

    function closeMiniGame() {
        ui.miniGameOverlay.classList.remove("active");
        state.miniGame = null;
        state.currentQuestionGate = null;
        state.lastTime = performance.now();
        setMode("playing");
    }

    function startBroadcast() {
        if (getEvidenceCount() < state.level.evidenceGoal) {
            showFloatingMessage(`Canlı yayın için ${state.level.evidenceGoal - getEvidenceCount()} delil daha gerekiyor.`);
            player.x = state.level.finishX - 160;
            return;
        }

        if (!state.level.gates.every((gate) => gate.solved)) {
            showFloatingMessage("Tüm bilgi kapılarını açmadan yayına geçemezsin.");
            player.x = state.level.finishX - 160;
            return;
        }

        if (!state.reportBoss?.completed) {
            startReportBoss();
            return;
        }

        openBroadcastTiming();
    }

    function openBroadcastTiming() {
        setMode("broadcast");
        state.broadcastResolved = false;
        state.broadcastValue = 0;
        state.broadcastDirection = 1;
        ui.broadcastResult.classList.add("hidden");
        ui.broadcastButton.disabled = false;
        ui.broadcastButton.textContent = "Yayına Gir";
        ui.nextLevelButton.textContent = state.levelIndex === LEVELS.length - 1 ? "Finali Gör" : "Sonraki Bölüm";
        ui.broadcastOverlay.classList.add("active");
    }

    function resolveBroadcast() {
        if (state.mode !== "broadcast" || state.broadcastResolved) return;
        state.broadcastResolved = true;
        ui.broadcastButton.disabled = true;
        const distance = Math.abs(state.broadcastValue - 50);
        state.metrics.broadcastDistance = distance;
        let timingStars = 1, bonus = 300, title = "Yayın Tamamlandı";
        if (distance <= 8) { timingStars = 3; bonus = 1200; title = "Mükemmel Yayın!"; unlockAchievement("perfect-live"); }
        else if (distance <= 18) { timingStars = 2; bonus = 700; title = "Başarılı Yayın!"; }
        state.broadcastQuality = Math.max(0, Math.min(100, calculateBroadcastQuality() + (timingStars - 1) * 7));
        const viewers = Math.max(1200, Math.round(4000 + state.broadcastQuality * 210 + state.profile.reputation * 95 + Math.random() * 2500));
        state.metrics.viewers = viewers;
        state.score += bonus + Math.round(state.broadcastQuality * 4);
        adjustReputation(timingStars === 3 ? 5 : timingStars === 2 ? 2 : -2, timingStars >= 2 ? "canlı yayın başarısı" : "zayıf yayın zamanlaması");
        ui.starsText.textContent = "★".repeat(timingStars) + "☆".repeat(3 - timingStars);
        ui.resultTitle.textContent = title;
        ui.resultText.textContent = `${state.level.name} görevi tamamlandı. Zamanlama bonusu ${bonus} puan · yayın kalitesi %${state.broadcastQuality} · tahmini ${viewers.toLocaleString("tr-TR")} izleyici.`;
        ui.nextLevelButton.textContent = "Canlı Yayını İzle";
        ui.broadcastResult.classList.remove("hidden");
        queueTicker(`${state.level.city}: canlı bağlantı kuruldu, yayın kalitesi yüzde ${state.broadcastQuality}.`);
        saveBest(); updateUi();
    }

    function calculateLevelStars() {
        let stars = 1;
        const evidenceTarget = state.level.evidenceGoal + 2;
        const activityCount = [
            state.metrics.droneTargets >= 2, state.metrics.photos >= 1, state.metrics.interviews >= 1,
            state.metrics.deadlineSuccess >= 1, state.metrics.secrets >= 1, state.metrics.puzzleSuccess >= 1,
            state.metrics.vehicleSuccess >= 1, state.metrics.hiddenMissionSuccess >= 1
        ].filter(Boolean).length;
        if (getEvidenceCount() >= evidenceTarget && state.level.gates.every((gate) => gate.solved) && activityCount >= 5) stars += 1;
        const professionalRun = state.metrics.damage === 0 && state.metrics.broadcastDistance <= 10
            && state.metrics.bossQuality >= 70 && state.broadcastQuality >= 75
            && state.metrics.deadlineSuccess >= 1 && state.metrics.reputationDelta >= 0;
        const routeCondition = state.levelIndex !== 2 || state.metrics.rewardRoutes >= 1;
        if (professionalRun && routeCondition) stars += 1;
        return Math.min(3, stars);
    }

    function saveLevelResult(stars, levelScore) {
        const record = state.profile.levelRecords[state.levelIndex];
        const previousStars = record.stars || 0;
        const previousBest = record.bestScore || 0;
        record.stars = Math.max(previousStars, stars);
        record.bestScore = Math.max(previousBest, Math.floor(levelScore));
        state.profile.unlockedLevel = Math.max(state.profile.unlockedLevel, Math.min(LEVELS.length, state.levelIndex + 2));
        state.profile.totals.levels += 1;
        state.profile.totals.broadcasts += 1;
        state.profile.totals.viewers += state.metrics.viewers || 0;
        if (state.metrics.damage === 0) unlockAchievement("clean-run");
        unlockAchievement("first-report");
        if (stars >= 2) unlockCollection(state.level.collectionIds[2]);
        const v5Xp = state.metrics.droneTargets * 25 + state.metrics.photos * 60 + state.metrics.interviews * 60
            + state.metrics.secrets * 90 + state.metrics.deadlineSuccess * 80 + state.metrics.puzzleSuccess * 100
            + state.metrics.vehicleSuccess * 90 + state.metrics.hiddenMissionSuccess * 130 + Math.round(state.broadcastQuality * 2);
        const xpEarned = Math.floor(levelScore * .12) + stars * 180 + state.metrics.rewardRoutes * 60 + v5Xp;
        addXp(xpEarned); updateDailyProgress("level", 1); checkGlobalAchievements(); saveProfile();
        return { newStar:stars > previousStars, newBest:levelScore > previousBest, xpEarned };
    }

    function showLevelReport() {
        ui.broadcastOverlay.classList.remove("active"); ui.liveTvOverlay.classList.remove("active");
        const stars = calculateLevelStars();
        const levelScore = Math.max(0, Math.floor(state.score - state.levelStartScore));
        const saveInfo = saveLevelResult(stars, levelScore);
        state.levelResult = { stars, levelScore, saveInfo };
        setMode("levelComplete");
        ui.levelCompleteTitle.textContent = `${state.level.city} · ${state.level.name} Tamamlandı`;
        ui.levelStarsText.textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
        ui.levelCompleteText.textContent = `${weatherLabelForLevel()} koşullarında haberi tamamladın. ${state.metrics.viewers.toLocaleString("tr-TR")} izleyiciye ulaştın ve +${saveInfo.xpEarned} XP kazandın.`;
        ui.levelScoreText.textContent = levelScore.toLocaleString("tr-TR");
        ui.levelEvidenceResult.textContent = `${getEvidenceCount()}/${state.level.evidenceGoal}`;
        ui.levelDamageResult.textContent = state.metrics.damage === 0 ? "Yok" : String(state.metrics.damage);
        const fieldTasks = [state.metrics.droneTargets >= 2,state.metrics.photos >= 1,state.metrics.interviews >= 1,state.metrics.bossQuality >= 50,state.metrics.puzzleSuccess,state.metrics.vehicleSuccess,state.metrics.hiddenMissionSuccess].filter(Boolean).length;
        ui.levelMissionResult.textContent = `${fieldTasks + state.level.gates.filter((gate) => gate.solved).length}/${7 + state.level.gates.length}`;
        ui.levelQualityResult.textContent = `${state.broadcastQuality}%`;
        ui.levelReputationResult.textContent = `${state.metrics.reputationDelta >= 0 ? "+" : ""}${state.metrics.reputationDelta}`;
        ui.levelViewerResult.textContent = state.metrics.viewers.toLocaleString("tr-TR");
        ui.levelSecretResult.textContent = state.metrics.hiddenMissionSuccess ? "Tamamlandı" : "Kaçırıldı";
        const notices = [];
        if (saveInfo.newStar) notices.push("Yeni yıldız derecesi");
        if (saveInfo.newBest) notices.push("Yeni bölüm rekoru");
        if (state.levelIndex < LEVELS.length - 1 && state.profile.unlockedLevel >= state.levelIndex + 2) notices.push(`${LEVELS[state.levelIndex + 1].city} açıldı`);
        if (notices.length) { ui.unlockNotice.textContent = `Açılanlar: ${notices.join(" · ")}`; ui.unlockNotice.classList.remove("hidden"); }
        else ui.unlockNotice.classList.add("hidden");
        buttons.levelNext.textContent = state.levelIndex === LEVELS.length - 1 ? "Finali Gör" : "Sonraki Şehre Geç";
        ui.levelCompleteOverlay.classList.add("active"); updateProfileUi(); renderDailyTasks();
    }

    function proceedFromLevelReport() {
        ui.levelCompleteOverlay.classList.remove("active");

        if (state.levelIndex < LEVELS.length - 1) {
            loadLevel(state.levelIndex + 1);
            return;
        }

        finishGame();
    }

    function nextLevel() {
        openLiveTv();
    }

    function finishGame() {
        setMode("complete"); saveBest(); checkGlobalAchievements(); closeAllOverlays();
        ui.completeText.textContent = `Beş şehirdeki saha görevlerini ${Math.floor(state.score).toLocaleString("tr-TR")} puan, ${getTotalStars()}/${LEVELS.length * 3} yıldız ve ${state.profile.reputation} TGRT Güven puanıyla tamamladın.`;
        ui.completeOverlay.classList.add("active");
    }

    function gameOver() {
        setMode("gameover");
        saveBest();
        ui.gameOverText.textContent = `${state.level.name} görevinde ${Math.floor(state.score).toLocaleString("tr-TR")} puan topladın.`;
        ui.gameOverOverlay.classList.add("active");
    }

    function saveBest() {
        if (state.score > state.best) {
            state.best = Math.floor(state.score);
            localStorage.setItem("haberAvcisiBest", String(state.best));
        }
    }

    function loseHeart(resetPosition = true) {
        if (player.invincible > 0) return;
        if (resetPosition && useHelperShield()) return;

        state.hearts -= 1;
        state.metrics.damage += 1;
        adjustReputation(-2, "saha güvenliği ihlali");
        player.invincible = 1.8;
        state.cameraShake = Math.max(state.cameraShake, 13);
        triggerScreenFlash();
        showToast("Saha ekipmanı hasar gördü", "Kontrol noktasından devam ediyorsun.");

        if (state.hearts <= 0) {
            gameOver();
            return;
        }

        if (resetPosition) {
            player.x = player.checkpointX;
            player.y = GROUND_Y - player.height;
            player.vx = 0;
            player.vy = 0;
        }

        updateUi();
    }

    function showFloatingMessage(text) {
        state.level.particles.push({
            type: "message",
            text,
            x: player.x,
            y: player.y - 45,
            life: 2.2,
            maxLife: 2.2
        });
    }

    function spawnCollectParticles(item) {
        for (let i = 0; i < 10; i += 1) {
            state.level.particles.push({
                type: "spark",
                x: item.x,
                y: item.y,
                vx: (Math.random() - 0.5) * 190,
                vy: -40 - Math.random() * 180,
                life: 0.7 + Math.random() * 0.35,
                maxLife: 1
            });
        }
    }

    function spawnScoreParticle(item, amount) {
        state.level.particles.push({
            type: "score",
            text: `+${amount}`,
            x: item.x,
            y: item.y - 15,
            life: 1.2,
            maxLife: 1.2
        });
    }

    function activateWorldEvent(event) {
        event.triggered = true;
        state.activeEvent = { ...event, remaining:event.duration, actorX:W + 180 };
        if (event.bonusType) state.activeBonus = { type:event.bonusType, remaining:event.duration };

        const hudBusy = Boolean(state.vehicleSequence)
            || ui.missionHudCard.classList.contains("active")
            || ["decision", "fieldPhoto", "reportBoss", "miniGame", "broadcast"].includes(state.mode);

        if (!hudBusy) {
            ui.eventIcon.textContent = event.icon;
            ui.eventTitle.textContent = event.title;
            ui.eventText.textContent = event.text;
            ui.eventBanner.classList.add("active");
            state.eventBannerTimer = 1.85;
        } else {
            showFloatingMessage(event.title);
        }

        queueTicker(`${state.level.city}: ${event.title} — ${event.text}`);
        state.profile.storyFlags[`event-${state.levelIndex}-${event.type}`] = true;
    }

    function updateWorldEvents(dt) {
        state.level.events.forEach((event) => {
            if (!event.triggered && player.x >= event.x) activateWorldEvent(event);
        });

        if (state.eventBannerTimer > 0) {
            state.eventBannerTimer -= dt;
            if (state.eventBannerTimer <= 0) ui.eventBanner.classList.remove("active");
        }

        if (state.activeBonus) {
            state.activeBonus.remaining -= dt;
            if (state.activeBonus.remaining <= 0) state.activeBonus = null;
        }

        if (state.activeEvent) {
            state.activeEvent.remaining -= dt;
            if (["ambulance", "rescue"].includes(state.activeEvent.type)) {
                state.activeEvent.actorX -= dt * 250;
            }

            if (state.activeEvent.remaining <= 0) {
                state.activeEvent = null;
            }
        }
    }

    function checkRouteChoices() {
        state.level.routes.forEach((route) => {
            if (route.resolved) return;

            if (player.x >= route.start && player.x <= route.end) {
                state.currentRoute = route;
                const upper = player.y + player.height < route.rewardY;
                if (upper) route.enteredReward = true;
                ui.routeStateText.textContent = upper
                    ? `${route.name}: ödüllü üst rotadasın.`
                    : `${route.name}: güvenli alt rotadasın.`;
            }

            if (player.x > route.end) {
                route.resolved = true;
                const upperChoice = Boolean(route.enteredReward || player.y + player.height < route.rewardY);
                route.choice = upperChoice ? "reward" : "safe";

                if (upperChoice) {
                    state.score += route.bonus;
                    state.metrics.rewardRoutes += 1;
                    state.profile.totals.routes += 1;
                    updateDailyProgress("routes", 1);
                    showToast("Ödüllü rota tamamlandı", `${route.name}: +${route.bonus} puan`);
                    showFloatingMessage(`Ödüllü rota +${route.bonus}`);
                    state.cameraShake = Math.max(state.cameraShake, 5);
                } else {
                    showFloatingMessage("Güvenli rota");
                }

                state.currentRoute = null;
                ui.routeStateText.textContent = "Yeni rota tabelasını takip et.";
                checkGlobalAchievements();
            }
        });
    }

    function update(dt) {
        state.cameraShake = Math.max(0, state.cameraShake - dt * 22);
        updateCinematicCamera(dt); updateRadio(dt); updateTicker(dt);
        if (state.mode === "decision") { updateDecision(dt); return; }
        if (state.mode === "drone") { updateDroneMission(dt); updateUi(); return; }
        if (state.mode === "fieldPhoto") { updateFieldPhoto(dt); return; }
        if (state.mode === "reportBoss") { updateReportBoss(dt); return; }
        if (state.mode === "secret") { updateSecretRun(dt); updateUi(); return; }
        if (state.mode === "miniGame") { updateMiniGame(dt); return; }
        if (state.mode === "puzzle" || state.mode === "liveTv") return;
        if (state.mode === "broadcast" && !state.broadcastResolved) {
            const bossBoost = Math.min(18, (state.metrics.bossQuality || 0) * .12);
            state.broadcastValue += state.broadcastDirection * dt * Math.max(54, 76 - bossBoost);
            if (state.broadcastValue >= 100) { state.broadcastValue = 100; state.broadcastDirection = -1; }
            if (state.broadcastValue <= 0) { state.broadcastValue = 0; state.broadcastDirection = 1; }
            ui.meterNeedle.style.left = `calc(${state.broadcastValue}% - 2px)`; return;
        }
        if (state.mode !== "playing") return;
        state.elapsed += dt; state.levelElapsed += dt; player.prevX = player.x; player.prevY = player.y;
        player.invincible = Math.max(0, player.invincible - dt);
        player.coyote = player.grounded ? .12 : Math.max(0, player.coyote - dt);
        let move = 0; if (input.left) move -= 1; if (input.right) move += 1;
        if (state.vehicleSequence) {
            const run = state.vehicleSequence;
            player.vx = MOVE_SPEED * (.78 + run.config.speed * .18) + move * 85;
            player.facing = 1; player.runCycle += dt * 14;
        } else {
            player.vx = move * MOVE_SPEED;
            if (move !== 0) { player.facing = move > 0 ? 1 : -1; player.runCycle += dt * 11; }
        }
        if (input.jumpPressed) {
            if (player.grounded || player.coyote > 0) { player.vy = -JUMP_SPEED; player.grounded = false; player.coyote = 0; }
            input.jumpPressed = false;
        }
        player.vy += GRAVITY * dt; player.x += player.vx * dt; resolveHorizontalCollisions();
        player.y += player.vy * dt; player.grounded = false; resolveVerticalCollisions();
        if (player.y + player.height >= GROUND_Y) { player.y = GROUND_Y - player.height; player.vy = 0; player.grounded = true; }
        player.x = Math.max(20, Math.min(state.level.length - player.width, player.x));
        updateVehicles(); updateWorldEvents(dt); updateV4Triggers(dt);
        if (state.mode !== "playing") { updateUi(); return; }
        updateV5Triggers(dt);
        if (state.mode !== "playing") { updateUi(); return; }
        collectItems(); checkHazards(); checkRouteChoices(); checkGates(); checkFinish(); updateParticles(dt);
        state.score += dt * 6;
        const lookAhead = player.facing * Math.min(105, Math.abs(player.vx) * .24);
        const targetCamera = Math.max(0, Math.min(state.level.length - W, player.x - W * .36 + lookAhead));
        state.cameraX += (targetCamera - state.cameraX) * Math.min(1, dt * 5.5);
        if (!state.interactionZone) input.actionPressed = false;
        updateV5Hud(); updateUi();
    }

    function getSolidObjects() {
        const gateSolids = state.level.gates
            .filter((gate) => !gate.solved)
            .map((gate) => ({ ...gate, type: "gate" }));

        return [...state.level.solids, ...gateSolids];
    }

    function resolveHorizontalCollisions() {
        const solids = getSolidObjects();

        for (const solid of solids) {
            if (!rectsOverlap(player.x, player.y, player.width, player.height, solid.x, solid.y, solid.w, solid.h)) continue;

            const previousBottom = player.prevY + player.height;
            if (previousBottom <= solid.y + 8 && player.vy >= 0) continue;

            if (player.vx > 0) {
                player.x = solid.x - player.width;
            } else if (player.vx < 0) {
                player.x = solid.x + solid.w;
            }
        }
    }

    function resolveVerticalCollisions() {
        const solids = getSolidObjects();

        for (const solid of solids) {
            if (!rectsOverlap(player.x, player.y, player.width, player.height, solid.x, solid.y, solid.w, solid.h)) continue;

            const previousBottom = player.prevY + player.height;
            const previousTop = player.prevY;

            if (player.vy >= 0 && previousBottom <= solid.y + 10) {
                player.y = solid.y - player.height;
                player.vy = 0;
                player.grounded = true;
            } else if (player.vy < 0 && previousTop >= solid.y + solid.h - 8) {
                player.y = solid.y + solid.h;
                player.vy = 40;
            }
        }
    }

    function updateVehicles() {
        state.level.vehicles.forEach((vehicle) => {
            vehicle.x = vehicle.baseX + Math.sin(state.levelElapsed * vehicle.speed + vehicle.phase) * vehicle.range;
        });
    }

    function collectItems() {
        state.level.collectibles.forEach((item) => {
            if (item.collected) return;

            if (circleRectOverlap(item.x, item.y, item.r + 5, player.x, player.y, player.width, player.height)) {
                item.collected = true;
                state.inventory[item.type] += 1;
                state.metrics.evidence += 1;
                state.profile.totals.evidence += 1;
                progressHiddenMission(item.type);

                const baseScore = item.type === "file" ? 180 : item.type === "camera" ? 140 : 120;
                const bonusActive = state.activeBonus && (state.activeBonus.type === "all" || state.activeBonus.type === item.type);
                const equipmentOffset = item.type === "camera" ? 0 : item.type === "microphone" ? 450 : 900;
                const equipmentMultiplier = 1 + (getEquipmentLevel(equipmentOffset) - 1) * 0.04;
                const scoreGain = Math.floor(baseScore * equipmentMultiplier * (bonusActive ? 2 : 1));

                state.score += scoreGain;
                spawnCollectParticles(item);
                spawnScoreParticle(item, scoreGain);
                state.cameraShake = Math.max(state.cameraShake, 2.5);

                updateDailyProgress("evidence", 1);
                if (item.type === "camera") updateDailyProgress("camera", 1);
                checkGlobalAchievements();
            }
        });
    }

    function checkHazards() {
        if (player.invincible > 0) return;
        for (const hazard of state.level.hazards) {
            if (hazard.disabled) continue;
            if (rectsOverlap(player.x + 8, player.y + 8, player.width - 16, player.height - 8, hazard.x, hazard.y, hazard.w, hazard.h)) {
                if (!registerVehicleHit()) loseHeart(true);
                return;
            }
        }
        for (const vehicle of state.level.vehicles) {
            if (rectsOverlap(player.x + 5, player.y + 5, player.width - 10, player.height - 5, vehicle.x, vehicle.y, vehicle.w, vehicle.h)) {
                if (!registerVehicleHit()) loseHeart(true);
                return;
            }
        }
    }

    function checkGates() {
        for (const gate of state.level.gates) {
            if (gate.solved || gate.triggered) continue;

            if (player.x + player.width >= gate.x - 18 && player.x < gate.x + gate.w + 5) {
                gate.triggered = true;
                player.x = gate.x - player.width - 4;
                player.vx = 0;

                if (gate.kind === "mini" && gate.mission) {
                    openMiniGame(gate);
                } else {
                    openQuestion(gate);
                }
                return;
            }
        }
    }

    function checkFinish() {
        if (player.x + player.width >= state.level.finishX) {
            player.x = state.level.finishX - player.width;
            startBroadcast();
        }
    }

    function updateParticles(dt) {
        state.level.particles = state.level.particles.filter((particle) => {
            particle.life -= dt;

            if (particle.type === "spark") {
                particle.x += particle.vx * dt;
                particle.y += particle.vy * dt;
                particle.vy += 470 * dt;
            } else if (particle.type === "message" || particle.type === "score") {
                particle.y -= particle.type === "score" ? 34 * dt : 22 * dt;
            }

            return particle.life > 0;
        });
    }

    function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    function circleRectOverlap(cx, cy, radius, rx, ry, rw, rh) {
        const closestX = Math.max(rx, Math.min(cx, rx + rw));
        const closestY = Math.max(ry, Math.min(cy, ry + rh));
        const dx = cx - closestX;
        const dy = cy - closestY;
        return dx * dx + dy * dy < radius * radius;
    }

    function drawDroneMission() {
        const drone = state.droneMission;
        const gradient = ctx.createLinearGradient(0, 0, 0, H);
        gradient.addColorStop(0, "#17334b");
        gradient.addColorStop(1, "#071521");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.globalAlpha = .88;
        for (let row = 0; row < 5; row += 1) {
            for (let col = 0; col < 9; col += 1) {
                const x = col * 155 - 30 + (row % 2) * 45;
                const y = row * 145 + 55;
                ctx.fillStyle = (row + col) % 3 === 0 ? "#24445b" : "#1c394e";
                roundRect(ctx, x, y, 105, 86, 9);
                ctx.fill();
                ctx.fillStyle = "rgba(255,209,102,.18)";
                for (let wx = 12; wx < 92; wx += 24) {
                    for (let wy = 13; wy < 70; wy += 21) ctx.fillRect(x + wx, y + wy, 9, 7);
                }
            }
        }
        ctx.restore();

        ctx.fillStyle = "#52606a";
        ctx.fillRect(0, H * .48, W, 100);
        ctx.fillRect(W * .43, 0, 120, H);
        ctx.strokeStyle = "rgba(255,255,255,.72)";
        ctx.lineWidth = 4;
        ctx.setLineDash([35, 28]);
        ctx.beginPath();
        ctx.moveTo(0, H * .55);
        ctx.lineTo(W, H * .55);
        ctx.moveTo(W * .477, 0);
        ctx.lineTo(W * .477, H);
        ctx.stroke();
        ctx.setLineDash([]);

        drone.targets.forEach((target) => {
            const pulse = 1 + Math.sin(state.elapsed * 4 + target.pulse) * .12;
            ctx.save();
            ctx.translate(target.x, target.y);
            ctx.scale(pulse, pulse);
            ctx.strokeStyle = target.scanned ? "#7bf0ae" : "#ffd166";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, 34, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = .2;
            ctx.fillStyle = target.scanned ? "#7bf0ae" : "#ffd166";
            ctx.beginPath();
            ctx.arc(0, 0, 48, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";
            ctx.font = "900 13px Arial";
            ctx.textAlign = "center";
            ctx.fillText(target.scanned ? "✓" : "+", 0, 5);
            ctx.font = "700 11px Arial";
            ctx.fillText(target.name, 0, 64);
            ctx.restore();
        });

        ctx.save();
        ctx.translate(drone.x, drone.y);
        ctx.strokeStyle = "#63d6ff";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(-35, -20); ctx.lineTo(35, 20);
        ctx.moveTo(35, -20); ctx.lineTo(-35, 20);
        ctx.stroke();
        ctx.fillStyle = "#d9f5ff";
        roundRect(ctx, -25, -14, 50, 28, 10);
        ctx.fill();
        ctx.fillStyle = "#10324a";
        ctx.beginPath(); ctx.arc(0, 5, 7, 0, Math.PI * 2); ctx.fill();
        [[-38,-23],[38,-23],[-38,23],[38,23]].forEach(([x,y]) => {
            ctx.strokeStyle = "rgba(99,214,255,.8)";
            ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(x,y,15,0,Math.PI*2); ctx.stroke();
        });
        ctx.restore();

        ctx.strokeStyle = "rgba(99,214,255,.32)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(drone.x, drone.y, 100, 0, Math.PI * 2);
        ctx.stroke();
    }

    function drawSecretRun() {
        const run = state.secretRun;
        const gradient = ctx.createLinearGradient(0, 0, 0, H);
        gradient.addColorStop(0, "#17222b");
        gradient.addColorStop(1, "#070c10");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "#27323a";
        ctx.fillRect(0, 100, W, 38);
        ctx.fillRect(0, 570, W, 150);
        ctx.strokeStyle = "rgba(255,255,255,.08)";
        ctx.lineWidth = 3;
        const offset = -((run.distance * .6) % 140);
        for (let x = offset; x < W + 140; x += 140) {
            ctx.beginPath(); ctx.moveTo(x, 138); ctx.lineTo(x - 90, 570); ctx.stroke();
        }

        for (let x = -((run.distance * .35) % 240); x < W + 240; x += 240) {
            ctx.fillStyle = "#ffd166";
            ctx.beginPath(); ctx.arc(x + 90, 124, 13, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = .18;
            ctx.beginPath(); ctx.arc(x + 90, 124, 48, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 1;
        }

        run.obstacles.forEach((obstacle) => {
            const x = obstacle.x - run.distance + 300;
            if (x < -100 || x > W + 100) return;
            ctx.fillStyle = obstacle.hit ? "#67454b" : "#8d4d45";
            roundRect(ctx, x, 570 - obstacle.h, obstacle.w, obstacle.h, 8);
            ctx.fill();
            ctx.fillStyle = "#f5d26f";
            ctx.fillRect(x + 8, 570 - obstacle.h + 12, obstacle.w - 16, 9);
        });

        run.items.forEach((item) => {
            if (item.collected) return;
            const x = item.x - run.distance + 300;
            if (x < -80 || x > W + 80) return;
            ctx.fillStyle = item.type === "camera" ? "#63d6ff" : item.type === "microphone" ? "#ff7582" : "#ffd166";
            ctx.beginPath(); ctx.arc(x, item.y, 17, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "#0d1720";
            ctx.font = "900 13px Arial";
            ctx.textAlign = "center";
            ctx.fillText(item.type === "camera" ? "▣" : item.type === "microphone" ? "●" : "▤", x, item.y + 5);
        });

        const blink = run.invincible > 0 && Math.floor(run.invincible * 12) % 2 === 0;
        if (!blink) {
            ctx.save();
            ctx.translate(330, run.y);
            ctx.fillStyle = "rgba(0,0,0,.3)";
            ctx.beginPath(); ctx.ellipse(0, 77, 28, 7, 0, 0, Math.PI * 2); ctx.fill();
            const sprite = characterSprites.run;
            if (sprite.complete && sprite.naturalWidth > 0) {
                const frame = Math.floor(state.elapsed * 9) % 6;
                ctx.drawImage(sprite, frame * SPRITE_FRAME_SIZE, 0, SPRITE_FRAME_SIZE, SPRITE_FRAME_SIZE, -45, -28, 90, 114);
            } else drawFallbackReporter(-23, 0, 46, 86);
            ctx.restore();
        }

        ctx.fillStyle = "rgba(5,15,28,.82)";
        roundRect(ctx, 28, 24, 315, 64, 15); ctx.fill();
        ctx.fillStyle = "#ffd166";
        ctx.font = "900 13px Arial"; ctx.textAlign = "left";
        ctx.fillText(`GİZLİ GEÇİT · ${run.zone.title}`, 48, 49);
        ctx.fillStyle = "white"; ctx.font = "800 12px Arial";
        ctx.fillText(`${run.remaining.toFixed(1)} sn · ${run.collected} ekipman`, 48, 70);
    }

    function drawV4Npcs() {
        state.level.activeNpcs.forEach((npc) => {
            const x = npc.x - state.cameraX;
            if (x < -100 || x > W + 100) return;
            const ground = GROUND_Y;
            ctx.save();
            if (npc.type === "cyclist") {
                ctx.strokeStyle = "#172a3b"; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.arc(x - 20, ground - 15, 14, 0, Math.PI * 2); ctx.arc(x + 22, ground - 15, 14, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x - 20, ground - 15); ctx.lineTo(x, ground - 42); ctx.lineTo(x + 22, ground - 15); ctx.lineTo(x - 4, ground - 15); ctx.closePath(); ctx.stroke();
                ctx.fillStyle = "#ef3340"; ctx.beginPath(); ctx.arc(x, ground - 70, 10, 0, Math.PI * 2); ctx.fill();
            } else if (npc.type === "bus-stop") {
                ctx.fillStyle = "rgba(35,64,84,.88)"; roundRect(ctx, x - 54, ground - 125, 108, 125, 10); ctx.fill();
                ctx.fillStyle = "#63d6ff"; ctx.fillRect(x - 44, ground - 112, 88, 46);
                ctx.fillStyle = "white"; ctx.font = "900 9px Arial"; ctx.textAlign = "center"; ctx.fillText("OTOBÜS", x, ground - 83);
            } else {
                const body = npc.type === "press" ? "#163553" : npc.type === "rescue" ? "#e59d28" : npc.type === "umbrella" ? "#365d76" : "#6a4b82";
                ctx.fillStyle = body; roundRect(ctx, x - 14, ground - 62, 28, 62, 8); ctx.fill();
                ctx.fillStyle = "#d7a37d"; ctx.beginPath(); ctx.arc(x, ground - 78, 12, 0, Math.PI * 2); ctx.fill();
                if (npc.type === "press") { ctx.fillStyle = "white"; ctx.font = "900 7px Arial"; ctx.textAlign = "center"; ctx.fillText("BASIN", x, ground - 35); }
                if (npc.type === "umbrella") { ctx.strokeStyle = "#172a3b"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, ground - 94, 34, Math.PI, Math.PI * 2); ctx.stroke(); }
                if (npc.type === "fan") { ctx.fillStyle = "#ffd166"; ctx.fillRect(x + 14, ground - 74, 30, 8); }
            }
            ctx.restore();
        });
    }

    function drawHelper() {
        const helper = state.helper;
        if (!helper) return;
        const x = helper.x - state.cameraX;
        const y = helper.y;
        ctx.save();
        ctx.globalAlpha = .92;
        ctx.fillStyle = "rgba(0,0,0,.22)";
        ctx.beginPath(); ctx.ellipse(x, y + 80, 24, 6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#203d5a"; roundRect(ctx, x - 18, y + 24, 36, 56, 8); ctx.fill();
        ctx.fillStyle = "#d3a27e"; ctx.beginPath(); ctx.arc(x, y + 15, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#111c25"; ctx.fillRect(x + 13, y + 34, 29, 19);
        ctx.fillStyle = "#63d6ff"; ctx.beginPath(); ctx.arc(x + 28, y + 43, 6, 0, Math.PI * 2); ctx.fill();
        if (helper.shield > 0) {
            ctx.strokeStyle = "rgba(123,240,174,.72)"; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(x, y + 42, 34 + Math.sin(helper.phase) * 3, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
    }

    function drawSecretEntrance() {
        const zone = state.level.v4.secret;
        if (zone.used) return;
        const x = zone.x - state.cameraX;
        if (x < -120 || x > W + 120) return;
        ctx.save();
        ctx.fillStyle = "#1b2730";
        roundRect(ctx, x - 42, GROUND_Y - 62, 84, 62, 12); ctx.fill();
        ctx.strokeStyle = "#ffd166"; ctx.lineWidth = 3; ctx.setLineDash([6,5]);
        roundRect(ctx, x - 36, GROUND_Y - 56, 72, 54, 9); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "#ffd166"; ctx.font = "900 22px Arial"; ctx.textAlign = "center"; ctx.fillText("↓", x, GROUND_Y - 25);
        ctx.restore();
    }


    function draw() {
        if (!state.level) { drawMenuBackground(); return; }
        if (state.mode === "drone" && state.droneMission) { drawDroneMission(); return; }
        if (state.mode === "secret" && state.secretRun) { drawSecretRun(); return; }
        const theme = state.level.theme;
        const shakeEnabled = state.settings?.cameraShake !== false;
        const shakeX = shakeEnabled && state.cameraShake > 0 ? (Math.random() - .5) * state.cameraShake : 0;
        const shakeY = shakeEnabled && state.cameraShake > 0 ? (Math.random() - .5) * state.cameraShake * .55 : 0;
        ctx.save();
        ctx.translate(W / 2 + shakeX, H / 2 + shakeY); ctx.scale(state.cameraZoom, state.cameraZoom); ctx.translate(-W / 2, -H / 2 + state.cameraYOffset);
        drawSky(theme); drawParallaxCity(theme); drawAmbientScene(); drawGround(theme); drawWorldObjects();
        drawSecretEntrance(); drawV4Npcs(); drawFinishArea(); drawActiveEventActor(); drawHelper();
        if (state.vehicleSequence) drawVehicleSequence(); else drawPlayer();
        drawParticles(); drawAtmosphereOverlay();
        ctx.restore(); drawCanvasHud();
    }

    function drawMenuBackground() {
        const gradient = ctx.createLinearGradient(0, 0, 0, H);
        gradient.addColorStop(0, "#65a9d0");
        gradient.addColorStop(1, "#dceaf0");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);
        drawSimpleCity(0, "#617c8f", 0.15, 420);
        drawSimpleCity(0, "#3e586b", 0.32, 510);
        ctx.fillStyle = "#59636e";
        ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
    }

    function drawSky(theme) {
        const atmosphere = state.atmosphere || ATMOSPHERES["morning-clear"];
        const gradient = ctx.createLinearGradient(0, 0, 0, H);
        gradient.addColorStop(0, theme.skyTop); gradient.addColorStop(1, theme.skyBottom);
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, W, H);
        const night = atmosphere.period === "Gece";
        ctx.globalAlpha = night ? .72 : atmosphere.weather === "rain" || atmosphere.weather === "storm" ? .32 : .8;
        ctx.fillStyle = night ? "#e9f0ff" : theme.sun;
        ctx.beginPath(); ctx.arc(W - 170, 110, night ? 34 : 50, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
        if (night) {
            ctx.fillStyle = "rgba(255,255,255,.72)";
            for (let i = 0; i < 24; i += 1) ctx.fillRect((i * 83) % W, 30 + (i * 47) % 230, 2, 2);
        }
        drawClouds();
        if (["rain","storm"].includes(atmosphere.weather) || state.activeEvent?.type === "rain") drawRain(atmosphere.weather === "storm" ? 1.75 : 1.15);
    }

    function drawRain(intensity = 1) {
        ctx.save();
        ctx.strokeStyle = `rgba(220, 241, 255, ${Math.min(0.62, 0.38 * intensity)})`;
        ctx.lineWidth = 2;

        for (let i = 0; i < Math.floor(80 * intensity); i += 1) {
            const x = ((i * 97 + state.elapsed * 350) % (W + 120)) - 60;
            const y = (i * 53 + state.elapsed * 510) % H;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 11, y + 25);
            ctx.stroke();
        }

        ctx.restore();
    }

    function drawClouds() {
        const clouds = state.level.scene?.clouds || [];
        ctx.save();
        ctx.fillStyle = "rgba(255,255,255,.44)";

        clouds.forEach((cloud) => {
            const worldX = cloud.x + state.elapsed * cloud.speed;
            const x = ((worldX - state.cameraX * 0.08) % (W + 420)) - 210;
            const y = cloud.y;
            const scale = cloud.scale;

            ctx.beginPath();
            ctx.arc(x, y, 28 * scale, 0, Math.PI * 2);
            ctx.arc(x + 33 * scale, y - 12 * scale, 35 * scale, 0, Math.PI * 2);
            ctx.arc(x + 72 * scale, y, 27 * scale, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }

    function drawAmbientScene() {
        const scene = state.level.scene;
        if (!scene) return;
        const cam = state.cameraX;

        scene.ambientVehicles.forEach((vehicle) => {
            const loopLength = state.level.length + 900;
            const worldX = (vehicle.x + state.elapsed * vehicle.speed) % loopLength;
            const x = worldX - cam * 0.72;
            if (x < -100 || x > W + 100) return;
            drawDistantVehicle(x, 553, vehicle.color);
        });

        scene.trees.forEach((tree) => {
            const x = tree.x - cam * 0.88;
            if (x < -80 || x > W + 80) return;
            drawTree(x, 608, tree.scale);
        });

        scene.people.forEach((person) => {
            const x = person.x - cam;
            if (x < -50 || x > W + 50) return;
            drawPedestrian(x, 605, person.variant, person.phase);
        });

        scene.signs.forEach((sign) => {
            const x = sign.x - cam;
            if (x < -130 || x > W + 130) return;
            drawStreetSign(x, 455, sign.text);
        });

        scene.flags.forEach((flag) => {
            const x = flag.x - cam * 0.95;
            if (x < -50 || x > W + 50) return;
            drawFlag(x, 410, flag.phase);
        });
    }

    function drawDistantVehicle(x, y, color) {
        ctx.save();
        ctx.globalAlpha = 0.72;
        ctx.fillStyle = color;
        roundRect(ctx, x, y - 24, 65, 25, 7);
        ctx.fill();
        ctx.fillStyle = "#c6e4f0";
        ctx.fillRect(x + 15, y - 31, 31, 11);
        ctx.fillStyle = "#17212c";
        ctx.beginPath();
        ctx.arc(x + 14, y, 7, 0, Math.PI * 2);
        ctx.arc(x + 52, y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawTree(x, ground, scale) {
        ctx.save();
        ctx.translate(x, ground);
        ctx.scale(scale, scale);
        ctx.fillStyle = "#5c4030";
        ctx.fillRect(-5, -58, 10, 58);
        ctx.fillStyle = state.levelIndex === 2 ? "#385f3b" : "#2f7653";
        ctx.beginPath();
        ctx.arc(-18, -67, 24, 0, Math.PI * 2);
        ctx.arc(13, -76, 29, 0, Math.PI * 2);
        ctx.arc(30, -58, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawPedestrian(x, ground, variant, phase) {
        const wave = Math.sin(state.elapsed * 2.4 + phase) * 3;
        const shirts = ["#d84b56", "#2f7eb6", "#d9a52c", "#4c8e63"];
        ctx.save();
        ctx.globalAlpha = 0.78;
        ctx.fillStyle = "#c98e69";
        ctx.beginPath();
        ctx.arc(x, ground - 50, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = shirts[variant % shirts.length];
        roundRect(ctx, x - 8, ground - 42, 16, 28, 5);
        ctx.fill();
        ctx.strokeStyle = "#27313f";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x - 4, ground - 14);
        ctx.lineTo(x - 7 + wave, ground);
        ctx.moveTo(x + 4, ground - 14);
        ctx.lineTo(x + 7 - wave, ground);
        ctx.stroke();
        ctx.restore();
    }

    function drawStreetSign(x, y, text) {
        ctx.fillStyle = "#263747";
        ctx.fillRect(x + 52, y, 7, 155);
        ctx.fillStyle = "#f3f5f7";
        roundRect(ctx, x, y, 112, 43, 7);
        ctx.fill();
        ctx.fillStyle = "#15283d";
        ctx.font = "900 10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(text, x + 56, y + 26);
    }

    function drawFlag(x, y, phase) {
        ctx.strokeStyle = "#202d3a";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, GROUND_Y);
        ctx.stroke();
        const wave = Math.sin(state.elapsed * 4 + phase) * 5;
        ctx.fillStyle = phase % 2 > 1 ? "#ef3340" : "#ffd166";
        ctx.beginPath();
        ctx.moveTo(x + 2, y + 5);
        ctx.quadraticCurveTo(x + 29, y + wave, x + 55, y + 8);
        ctx.lineTo(x + 55, y + 33);
        ctx.quadraticCurveTo(x + 29, y + 24 + wave, x + 2, y + 30);
        ctx.closePath();
        ctx.fill();
    }

    function drawActiveEventActor() {
        if (!state.activeEvent || !["ambulance", "rescue"].includes(state.activeEvent.type)) return;
        const x = state.activeEvent.actorX;
        const y = GROUND_Y - 60;

        ctx.save();
        ctx.globalAlpha = Math.min(1, state.activeEvent.remaining / 1.2);
        ctx.fillStyle = "white";
        roundRect(ctx, x, y, 145, 58, 10);
        ctx.fill();
        ctx.fillStyle = "#ef3340";
        ctx.fillRect(x + 15, y + 17, 32, 10);
        ctx.fillRect(x + 26, y + 6, 10, 32);
        ctx.fillStyle = "#2f83bf";
        ctx.fillRect(x + 83, y + 8, 44, 20);
        ctx.fillStyle = "#15212d";
        ctx.beginPath();
        ctx.arc(x + 28, y + 58, 13, 0, Math.PI * 2);
        ctx.arc(x + 115, y + 58, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = Math.floor(state.elapsed * 8) % 2 ? "#ef3340" : "#4ba3ff";
        ctx.fillRect(x + 58, y - 5, 25, 7);
        ctx.restore();
    }

    function drawParallaxCity(theme) {
        ctx.save();
        ctx.globalAlpha = 0.42;
        drawSimpleCity(state.cameraX, theme.cityFar, 0.16, 395);
        ctx.globalAlpha = 0.58;
        drawSimpleCity(state.cameraX, theme.cityNear, 0.34, 495);
        ctx.globalAlpha = 0.46;
        drawStreetDetails();
        ctx.restore();

        const haze = ctx.createLinearGradient(0, 250, 0, GROUND_Y);
        haze.addColorStop(0, "rgba(232,241,246,.03)");
        haze.addColorStop(1, "rgba(224,235,240,.17)");
        ctx.fillStyle = haze;
        ctx.fillRect(0, 235, W, GROUND_Y - 235);
    }

    function drawSimpleCity(camera, color, factor, baseY) {
        ctx.save();
        ctx.translate(-(camera * factor) % 310, 0);
        ctx.fillStyle = color;

        for (let i = -2; i < 9; i += 1) {
            const x = i * 215;
            const h = 120 + ((i * 47 + 270) % 165);
            const w = 150 + ((i * 31 + 180) % 65);
            ctx.fillRect(x, baseY - h, w, h);

            ctx.fillStyle = "rgba(255, 233, 160, 0.24)";
            for (let row = 0; row < 5; row += 1) {
                for (let col = 0; col < 4; col += 1) {
                    ctx.fillRect(x + 20 + col * 29, baseY - h + 25 + row * 31, 12, 16);
                }
            }
            ctx.fillStyle = color;
        }

        ctx.restore();
    }

    function drawStreetDetails() {
        const offset = -(state.cameraX * 0.65) % 280;

        ctx.save();
        ctx.translate(offset, 0);

        for (let i = -2; i < 8; i += 1) {
            const x = i * 280;
            ctx.fillStyle = "#233446";
            ctx.fillRect(x + 34, 383, 8, 227);
            ctx.fillStyle = "#f7d479";
            ctx.beginPath();
            ctx.arc(x + 38, 382, 14, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#31465a";
            ctx.fillRect(x + 150, 523, 52, 87);
            ctx.fillStyle = "#2c8b58";
            ctx.beginPath();
            ctx.arc(x + 176, 514, 45, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    function drawGround(theme) {
        ctx.fillStyle = "rgba(5,15,27,.28)";
        ctx.fillRect(0, GROUND_Y - 22, W, 24);

        ctx.fillStyle = "#e6edf0";
        ctx.fillRect(0, GROUND_Y - 18, W, 8);
        ctx.fillStyle = "#89a0ac";
        ctx.fillRect(0, GROUND_Y - 10, W, 10);
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(0, GROUND_Y - 5, W, 5);

        ctx.fillStyle = theme.road;
        ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
        ctx.fillStyle = "rgba(5,13,23,.23)";
        ctx.fillRect(0, GROUND_Y, W, 18);

        const lineOffset = -((state.cameraX * 0.9) % 150);
        ctx.fillStyle = "rgba(255,255,255,.78)";
        for (let x = lineOffset - 150; x < W + 150; x += 150) {
            roundRect(ctx, x, GROUND_Y + 57, 86, 8, 4);
            ctx.fill();
        }
    }

    function drawWorldObjects() {
        const cam = state.cameraX;

        drawRouteLaneHints(cam);
        drawApproachWarnings(cam);
        state.level.routes.forEach((route) => drawRouteGuide(route, cam));

        state.level.hazards.forEach((hazard) => {
            if (hazard.disabled) return;
            const sx = hazard.x - cam;
            if (sx + hazard.w < -80 || sx > W + 80) return;
            drawHazard(sx, hazard);
        });

        state.level.solids.forEach((solid) => {
            const sx = solid.x - cam;
            if (sx + solid.w < -80 || sx > W + 80) return;
            if (solid.type === "platform") drawPlatform(sx, solid);
            if (solid.type === "barrier") drawBarrier(sx, solid);
            if (solid.type === "crate") drawCrate(sx, solid);
        });

        state.level.gates.forEach((gate, index) => {
            const sx = gate.x - cam;
            if (sx + gate.w < -80 || sx > W + 80) return;
            drawGate(sx, gate, index);
        });

        state.level.collectibles.forEach((item) => {
            if (item.collected) return;
            const sx = item.x - cam;
            if (sx < -50 || sx > W + 50) return;
            drawCollectible(sx, item);
        });

        state.level.vehicles.forEach((vehicle, index) => {
            const sx = vehicle.x - cam;
            if (sx + vehicle.w < -100 || sx > W + 100) return;
            drawVehicle(sx, vehicle, index);
        });
    }

    function drawRouteLaneHints(cam) {
        state.level.routes.forEach((route) => {
            const start = route.start - cam;
            const end = (Number.isFinite(route.end) ? route.end : route.start + 900) - cam;
            if (end < -100 || start > W + 100) return;
            const visibleStart = Math.max(-50, start);
            const visibleEnd = Math.min(W + 50, end);
            ctx.save();
            ctx.lineCap = "round";
            ctx.setLineDash([18, 16]);
            ctx.lineWidth = 5;
            ctx.strokeStyle = route.resolved ? "rgba(93,225,156,.20)" : "rgba(93,225,156,.55)";
            ctx.beginPath();
            ctx.moveTo(visibleStart, GROUND_Y - 27);
            ctx.lineTo(visibleEnd, GROUND_Y - 27);
            ctx.stroke();
            ctx.setLineDash([]);
            for (let x = visibleStart + 75; x < visibleEnd; x += 170) {
                ctx.fillStyle = "rgba(255,209,102,.82)";
                ctx.beginPath();
                ctx.moveTo(x, GROUND_Y - 42);
                ctx.lineTo(x + 18, GROUND_Y - 51);
                ctx.lineTo(x + 18, GROUND_Y - 44);
                ctx.lineTo(x + 37, GROUND_Y - 44);
                ctx.lineTo(x + 37, GROUND_Y - 35);
                ctx.lineTo(x + 18, GROUND_Y - 35);
                ctx.lineTo(x + 18, GROUND_Y - 28);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        });
    }

    function drawApproachWarnings(cam) {
        const warnings = [];
        state.level.hazards.forEach((hazard) => !hazard.disabled && warnings.push({ x: hazard.x, type: hazard.type }));
        state.level.solids.forEach((solid) => solid.type !== "platform" && warnings.push({ x: solid.x, type: solid.type }));
        warnings.forEach((warning) => {
            const x = warning.x - cam - 92;
            if (x < -50 || x > W + 50) return;
            const pulse = 0.7 + Math.sin(state.elapsed * 5 + warning.x * .01) * .18;
            ctx.save();
            ctx.globalAlpha = pulse;
            ctx.fillStyle = "#ffd166";
            ctx.beginPath();
            ctx.moveTo(x, GROUND_Y - 10);
            ctx.lineTo(x + 18, GROUND_Y - 30);
            ctx.lineTo(x + 36, GROUND_Y - 10);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#101b28";
            ctx.font = "900 14px Arial";
            ctx.textAlign = "center";
            ctx.fillText("!", x + 18, GROUND_Y - 13);
            ctx.restore();
        });
    }

    function drawRouteGuide(route, cam) {
        const x = route.start - cam;
        if (x < -180 || x > W + 180) return;
        ctx.save();
        ctx.globalAlpha = route.resolved ? 0.52 : 1;

        ctx.fillStyle = "#172537";
        ctx.fillRect(x + 56, 434, 7, GROUND_Y - 434);
        ctx.fillStyle = "rgba(0,0,0,.25)";
        ctx.beginPath(); ctx.ellipse(x + 60, GROUND_Y + 3, 26, 7, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#f3f7f8";
        roundRect(ctx, x - 18, 375, 157, 72, 10); ctx.fill();
        ctx.strokeStyle = "#172537"; ctx.lineWidth = 4;
        roundRect(ctx, x - 18, 375, 157, 72, 10); ctx.stroke();
        ctx.fillStyle = "#42c98a";
        roundRect(ctx, x - 10, 383, 141, 25, 6); ctx.fill();
        ctx.fillStyle = "#172537"; ctx.font = "900 11px Arial"; ctx.textAlign = "left";
        ctx.fillText("↓  GÜVENLİ ROTA", x, 400);
        ctx.fillStyle = "#ffd166";
        roundRect(ctx, x - 10, 414, 141, 25, 6); ctx.fill();
        ctx.fillStyle = "#172537"; ctx.fillText("↗  ÖDÜLLÜ ROTA", x, 431);
        ctx.restore();
    }

    function drawPlatform(x, solid) {
        const rewardDeck = solid.v4Branch || solid.y <= 480;
        const topColor = rewardDeck ? "#ffd166" : "#63e0c1";
        const bodyGradient = ctx.createLinearGradient(x, solid.y, x, solid.y + solid.h + 40);
        bodyGradient.addColorStop(0, "#2d5572");
        bodyGradient.addColorStop(1, "#172f45");

        ctx.save();
        ctx.fillStyle = "rgba(3,10,18,.30)";
        roundRect(ctx, x + 8, solid.y + 11, solid.w, solid.h + 7, 8); ctx.fill();

        ctx.fillStyle = bodyGradient;
        roundRect(ctx, x, solid.y, solid.w, solid.h, 8); ctx.fill();
        ctx.strokeStyle = "#07111f"; ctx.lineWidth = 4;
        roundRect(ctx, x, solid.y, solid.w, solid.h, 8); ctx.stroke();

        ctx.fillStyle = topColor;
        roundRect(ctx, x - 2, solid.y - 4, solid.w + 4, 11, 5); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.72)";
        ctx.fillRect(x + 9, solid.y - 1, Math.max(22, solid.w - 18), 3);

        ctx.fillStyle = "#0f2639";
        for (let px = x + 18; px < x + solid.w - 10; px += 48) {
            ctx.fillRect(px, solid.y + solid.h, 10, GROUND_Y - (solid.y + solid.h));
            ctx.fillStyle = "#35596f";
            ctx.fillRect(px + 10, solid.y + solid.h + 26, Math.min(38, x + solid.w - px - 12), 5);
            ctx.fillStyle = "#0f2639";
        }

        ctx.fillStyle = topColor;
        ctx.font = "900 12px Arial"; ctx.textAlign = "left";
        ctx.fillText(rewardDeck ? "↗" : "→", x + 12, solid.y + 20);
        ctx.restore();
    }

    function drawBarrier(x, solid) {
        ctx.save();
        ctx.fillStyle = "rgba(3,10,18,.32)";
        roundRect(ctx, x + 7, solid.y + 9, solid.w, solid.h + 8, 8); ctx.fill();

        ctx.fillStyle = "#ef3f46";
        roundRect(ctx, x, solid.y, solid.w, solid.h, 7); ctx.fill();
        ctx.strokeStyle = "#07111f"; ctx.lineWidth = 4;
        roundRect(ctx, x, solid.y, solid.w, solid.h, 7); ctx.stroke();

        ctx.save(); ctx.beginPath(); roundRect(ctx, x + 3, solid.y + 3, solid.w - 6, solid.h - 6, 5); ctx.clip();
        ctx.strokeStyle = "#fff4dc"; ctx.lineWidth = 14;
        for (let stripe = -solid.h; stripe < solid.w + solid.h; stripe += 32) {
            ctx.beginPath(); ctx.moveTo(x + stripe, solid.y + solid.h); ctx.lineTo(x + stripe + solid.h, solid.y); ctx.stroke();
        }
        ctx.restore();

        const blink = Math.floor(state.elapsed * 4) % 2 === 0;
        ctx.fillStyle = blink ? "#ffd166" : "#fff2b5";
        ctx.beginPath(); ctx.arc(x + 10, solid.y - 5, 6, 0, Math.PI * 2); ctx.arc(x + solid.w - 10, solid.y - 5, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#101b28";
        ctx.fillRect(x + 8, solid.y + solid.h, 10, 21); ctx.fillRect(x + solid.w - 18, solid.y + solid.h, 10, 21);
        ctx.restore();
    }

    function drawCrate(x, solid) {
        ctx.save();
        ctx.fillStyle = "rgba(3,10,18,.30)";
        roundRect(ctx, x + 7, solid.y + 9, solid.w, solid.h, 6); ctx.fill();
        const gradient = ctx.createLinearGradient(x, solid.y, x + solid.w, solid.y + solid.h);
        gradient.addColorStop(0, "#c98a4c"); gradient.addColorStop(1, "#87502f");
        ctx.fillStyle = gradient; roundRect(ctx, x, solid.y, solid.w, solid.h, 5); ctx.fill();
        ctx.strokeStyle = "#2b1b13"; ctx.lineWidth = 4;
        roundRect(ctx, x, solid.y, solid.w, solid.h, 5); ctx.stroke();
        ctx.strokeStyle = "#f2bd71"; ctx.lineWidth = 5;
        ctx.strokeRect(x + 7, solid.y + 7, solid.w - 14, solid.h - 14);
        ctx.beginPath(); ctx.moveTo(x + 9, solid.y + 9); ctx.lineTo(x + solid.w - 9, solid.y + solid.h - 9); ctx.moveTo(x + solid.w - 9, solid.y + 9); ctx.lineTo(x + 9, solid.y + solid.h - 9); ctx.stroke();
        ctx.restore();
    }

    function drawHazard(x, hazard) {
        const wave = Math.sin(state.elapsed * 4 + hazard.x * .01);
        ctx.save();
        if (hazard.type === "crowd") {
            ctx.fillStyle = "rgba(239,63,70,.16)"; roundRect(ctx, x - 5, hazard.y - 42, hazard.w + 10, hazard.h + 45, 10); ctx.fill();
            ctx.strokeStyle = "rgba(255,209,102,.9)"; ctx.lineWidth = 4; ctx.setLineDash([10,7]);
            ctx.beginPath(); ctx.moveTo(x, hazard.y + hazard.h + 2); ctx.lineTo(x + hazard.w, hazard.y + hazard.h + 2); ctx.stroke(); ctx.setLineDash([]);
            for (let px = x + 14; px < x + hazard.w; px += 25) {
                const lift = Math.sin(state.elapsed * 2.4 + px * .04) * 4;
                ctx.fillStyle = "#182c41"; ctx.beginPath(); ctx.arc(px, hazard.y - 28 - lift, 9, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = px % 2 ? "#ef535a" : "#376f9c"; roundRect(ctx, px - 7, hazard.y - 20 - lift, 14, 25 + lift, 4); ctx.fill();
            }
            ctx.restore(); return;
        }

        if (hazard.type === "water" || hazard.type === "puddle") {
            const deep = hazard.type === "water";
            ctx.fillStyle = deep ? "rgba(19,116,174,.88)" : "rgba(46,107,137,.82)";
            ctx.beginPath(); ctx.ellipse(x + hazard.w / 2, hazard.y + hazard.h / 2, hazard.w / 2, hazard.h / 2, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = "#78e3ff"; ctx.lineWidth = deep ? 5 : 3;
            for (let row = 0; row < (deep ? 3 : 2); row += 1) {
                const yy = hazard.y + 6 + row * 9 + wave * 2;
                ctx.beginPath(); ctx.moveTo(x + 10, yy); ctx.quadraticCurveTo(x + hazard.w * .35, yy - 6, x + hazard.w * .55, yy); ctx.quadraticCurveTo(x + hazard.w * .75, yy + 6, x + hazard.w - 10, yy); ctx.stroke();
            }
            ctx.strokeStyle = "#ffd166"; ctx.lineWidth = 4; ctx.setLineDash([9,6]);
            ctx.beginPath(); ctx.moveTo(x, hazard.y - 6); ctx.lineTo(x + hazard.w, hazard.y - 6); ctx.stroke(); ctx.setLineDash([]);
            ctx.restore(); return;
        }

        ctx.fillStyle = "rgba(239,128,36,.18)"; roundRect(ctx, x - 4, hazard.y - 42, hazard.w + 8, hazard.h + 44, 8); ctx.fill();
        ctx.fillStyle = "rgba(255,209,102,.82)"; ctx.fillRect(x, hazard.y + hazard.h - 4, hazard.w, 6);
        for (let cx = x + 18; cx < x + hazard.w; cx += 42) {
            ctx.fillStyle = "#ff8a27"; ctx.beginPath(); ctx.moveTo(cx, hazard.y - 39); ctx.lineTo(cx - 16, hazard.y + hazard.h); ctx.lineTo(cx + 16, hazard.y + hazard.h); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#4b260d"; ctx.lineWidth = 3; ctx.stroke();
            ctx.fillStyle = "white"; ctx.fillRect(cx - 11, hazard.y - 9, 22, 7);
        }
        ctx.restore();
    }

    function drawGate(x, gate, index) {
        const color = gate.solved ? "#55d999" : "#ef3f46";
        ctx.save();
        const pulse = gate.solved ? .12 : .18 + Math.sin(state.elapsed * 4 + index) * .05;
        ctx.fillStyle = gate.solved ? "rgba(85,217,153,.14)" : `rgba(239,63,70,${pulse})`;
        roundRect(ctx, x - 12, gate.y - 5, gate.w + 24, gate.h + 10, 10); ctx.fill();
        ctx.fillStyle = color; roundRect(ctx, x, gate.y, gate.w, gate.h, 5); ctx.fill();
        ctx.strokeStyle = "#07111f"; ctx.lineWidth = 4; roundRect(ctx, x, gate.y, gate.w, gate.h, 5); ctx.stroke();
        ctx.fillStyle = "#07111f"; ctx.beginPath(); ctx.arc(x + gate.w / 2, gate.y + 36, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "white"; ctx.font = "900 15px Arial"; ctx.textAlign = "center"; ctx.fillText(gate.solved ? "✓" : "?", x + gate.w / 2, gate.y + 41);
        ctx.fillStyle = "#f4f7f8"; roundRect(ctx, x - 50, gate.y - 38, 135, 28, 7); ctx.fill();
        ctx.strokeStyle = color; ctx.lineWidth = 3; roundRect(ctx, x - 50, gate.y - 38, 135, 28, 7); ctx.stroke();
        ctx.fillStyle = "#132538"; ctx.font = "900 10px Arial";
        const gateLabel = gate.kind === "mini" ? "SAHA GÖREVİ" : "BİLGİ KAPISI";
        ctx.fillText(gate.solved ? "YOL AÇILDI" : gateLabel, x + gate.w / 2, gate.y - 20);
        ctx.restore();
    }

    function drawCollectible(x, item) {
        const bob = Math.sin(state.elapsed * 4 + item.phase) * 7;
        const y = item.y + bob;
        const color = item.type === "camera" ? "#ffd166" : item.type === "microphone" ? "#ff5260" : "#75dfff";
        ctx.save(); ctx.translate(x, y);
        ctx.shadowColor = color; ctx.shadowBlur = 18;
        ctx.fillStyle = "rgba(7,17,31,.88)"; ctx.beginPath(); ctx.arc(0, 0, 27, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 23, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = color;
        if (item.type === "camera") {
            roundRect(ctx, -12, -8, 24, 17, 3); ctx.fill(); ctx.fillStyle = "#07111f"; ctx.beginPath(); ctx.arc(0, 1, 6, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = color; ctx.fillRect(-8, -13, 10, 5);
        } else if (item.type === "microphone") {
            ctx.beginPath(); ctx.arc(0, -6, 8, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(-3, 0, 6, 15); ctx.fillRect(-9, 13, 18, 4);
        } else {
            roundRect(ctx, -11, -14, 22, 28, 2); ctx.fill(); ctx.fillStyle = "#07111f"; ctx.fillRect(-6, -8, 12, 3); ctx.fillRect(-6, -2, 12, 3); ctx.fillRect(-6, 4, 9, 3);
        }
        ctx.restore();
    }

    function drawVehicle(x, vehicle, index) {
        const color = state.levelIndex === 2 ? "#d39a26" : index % 2 ? "#2c83c7" : "#cc3c45";

        ctx.fillStyle = "rgba(0,0,0,.22)";
        ctx.beginPath();
        ctx.ellipse(x + vehicle.w / 2, vehicle.y + vehicle.h + 7, vehicle.w * 0.47, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        roundRect(ctx, x, vehicle.y + 13, vehicle.w, vehicle.h - 13, 13);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + 24, vehicle.y + 16);
        ctx.lineTo(x + 43, vehicle.y);
        ctx.lineTo(x + vehicle.w - 33, vehicle.y);
        ctx.lineTo(x + vehicle.w - 13, vehicle.y + 18);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#b9dced";
        ctx.fillRect(x + 42, vehicle.y + 5, 29, 16);
        ctx.fillRect(x + 76, vehicle.y + 5, 25, 16);

        ctx.fillStyle = "#18222e";
        ctx.beginPath();
        ctx.arc(x + 28, vehicle.y + vehicle.h, 14, 0, Math.PI * 2);
        ctx.arc(x + vehicle.w - 28, vehicle.y + vehicle.h, 14, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawFinishArea() {
        const x = state.level.finishX - state.cameraX;
        if (x < -180 || x > W + 180) return;
        const beam = ctx.createLinearGradient(x + 70, 145, x + 70, GROUND_Y);
        beam.addColorStop(0, "rgba(255,209,102,0)"); beam.addColorStop(.55, "rgba(255,209,102,.16)"); beam.addColorStop(1, "rgba(239,63,70,.12)");
        ctx.fillStyle = beam; ctx.fillRect(x - 25, 145, 195, GROUND_Y - 145);
        ctx.strokeStyle = "rgba(255,209,102,.72)"; ctx.lineWidth = 3; ctx.setLineDash([12,10]);
        ctx.strokeRect(x - 12, 180, 165, GROUND_Y - 180); ctx.setLineDash([]);
        ctx.fillStyle = "#112a43"; roundRect(ctx, x + 25, 280, 88, 330, 8); ctx.fill();
        ctx.strokeStyle = "#07111f"; ctx.lineWidth = 4; roundRect(ctx, x + 25, 280, 88, 330, 8); ctx.stroke();
        ctx.fillStyle = "#ef3340"; roundRect(ctx, x - 4, 205, 146, 83, 9); ctx.fill();
        ctx.fillStyle = "white"; ctx.textAlign = "center"; ctx.font = "900 18px Arial"; ctx.fillText("CANLI", x + 69, 241); ctx.font = "800 12px Arial"; ctx.fillText("YAYIN NOKTASI", x + 69, 266);
        ctx.fillStyle = "#232d38"; ctx.fillRect(x + 114, 325, 12, 285); ctx.beginPath(); ctx.arc(x + 120, 315, 31, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#f5f8fb"; ctx.lineWidth = 3;
        [45,61].forEach((radius) => { ctx.beginPath(); ctx.arc(x + 120, 315, radius, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); });
    }

    function drawPlayer() {
        const sx = player.x - state.cameraX;
        const sy = player.y;
        const blink = player.invincible > 0 && Math.floor(player.invincible * 10) % 2 === 0;
        if (blink) return;

        const moving = Math.abs(player.vx) > 10 && player.grounded;
        let sprite = characterSprites.idle;
        let frameCount = 4;
        let frame = Math.floor(state.elapsed * 3) % frameCount;

        if (!player.grounded) {
            sprite = characterSprites.jump;
            frameCount = 4;

            if (player.vy < -260) frame = 1;
            else if (player.vy < 120) frame = 2;
            else frame = 3;
        } else if (moving) {
            sprite = characterSprites.run;
            frameCount = 6;
            frame = Math.floor(player.runCycle * 1.45) % frameCount;
        }

        const spriteReady = sprite.complete && sprite.naturalWidth > 0;
        const visualWidth = 88;
        const visualHeight = 112;
        const drawX = sx + player.width / 2;
        const drawY = sy + player.height - visualHeight + 9;

        ctx.save();

        ctx.fillStyle = "rgba(0,0,0,.23)";
        ctx.beginPath();
        ctx.ellipse(
            sx + player.width / 2,
            sy + player.height + 7,
            27,
            7,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.translate(drawX, 0);
        ctx.scale(player.facing, 1);

        if (spriteReady) {
            ctx.drawImage(
                sprite,
                frame * SPRITE_FRAME_SIZE,
                0,
                SPRITE_FRAME_SIZE,
                SPRITE_FRAME_SIZE,
                -visualWidth / 2,
                drawY,
                visualWidth,
                visualHeight
            );
        } else {
            drawFallbackReporter(-player.width / 2, sy, player.width, player.height);
        }

        ctx.restore();
    }

    function drawFallbackReporter(x, y, width, height) {
        ctx.fillStyle = "#152f50";
        roundRect(ctx, x + 5, y + 28, width - 10, height - 30, 8);
        ctx.fill();

        ctx.fillStyle = "#ef3340";
        roundRect(ctx, x + 10, y + 42, width - 20, 13, 4);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "900 7px Arial";
        ctx.textAlign = "center";
        ctx.fillText("BASIN", 0, y + 52);

        ctx.fillStyle = "#d6a17a";
        ctx.beginPath();
        ctx.arc(0, y + 18, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#e5e8e8";
        ctx.beginPath();
        ctx.arc(0, y + 13, 18, Math.PI, Math.PI * 2);
        ctx.fill();
    }

    function drawParticles() {
        state.level.particles.forEach((particle) => {
            const x = particle.x - state.cameraX;
            const alpha = Math.max(0, particle.life / particle.maxLife);

            ctx.save();
            ctx.globalAlpha = alpha;

            if (particle.type === "spark") {
                ctx.fillStyle = "#ffd166";
                ctx.beginPath();
                ctx.arc(x, particle.y, 4, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = particle.type === "score" ? "#ffd166" : "rgba(5, 15, 28, .9)";
                ctx.font = particle.type === "score" ? "900 18px Arial" : "800 16px Arial";
                ctx.textAlign = "center";
                if (particle.type === "message") {
                    ctx.strokeStyle = "rgba(255,255,255,.62)";
                    ctx.lineWidth = 3;
                    ctx.strokeText(particle.text, x, particle.y);
                }
                ctx.fillText(particle.text, x, particle.y);
            }

            ctx.restore();
        });
    }

    function drawCanvasHud() {
        ctx.save();

        ctx.fillStyle = "rgba(5, 15, 28, .72)";
        roundRect(ctx, 22, 20, 245, 56, 14);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "900 18px Arial";
        ctx.textAlign = "left";
        ctx.fillText(state.level.name, 42, 45);

        ctx.fillStyle = "#aec1d4";
        ctx.font = "600 11px Arial";
        ctx.fillText(`Delil: ${getEvidenceCount()}/${state.level.evidenceGoal}`, 42, 64);

        const distance = Math.max(0, Math.floor((state.level.finishX - player.x) / 10));
        ctx.fillStyle = "rgba(5, 15, 28, .72)";
        roundRect(ctx, W - 180, 20, 158, 56, 14);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "900 15px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${distance} m`, W - 101, 46);
        ctx.fillStyle = "#aec1d4";
        ctx.font = "600 10px Arial";
        ctx.fillText("Yayın noktasına", W - 101, 63);

        if (state.activeBonus) {
            const label = state.activeBonus.type === "all" ? "TÜM DELİLLER x2" : `${state.activeBonus.type === "camera" ? "KAMERA" : state.activeBonus.type === "microphone" ? "MİKROFON" : "DOSYA"} x2`;
            ctx.fillStyle = "rgba(255, 209, 102, .92)";
            roundRect(ctx, W / 2 - 92, 22, 184, 39, 12);
            ctx.fill();
            ctx.fillStyle = "#101926";
            ctx.font = "900 11px Arial";
            ctx.textAlign = "center";
            ctx.fillText(`${label} · ${Math.ceil(state.activeBonus.remaining)} sn`, W / 2, 46);
        }

        ctx.restore();
    }

    function roundRect(context, x, y, width, height, radius) {
        const r = Math.min(radius, width / 2, height / 2);
        context.beginPath();
        context.moveTo(x + r, y);
        context.arcTo(x + width, y, x + width, y + height, r);
        context.arcTo(x + width, y + height, x, y + height, r);
        context.arcTo(x, y + height, x, y, r);
        context.arcTo(x, y, x + width, y, r);
        context.closePath();
    }

    function gameLoop(timestamp) {
        if (!state.lastTime) state.lastTime = timestamp;
        const dt = Math.min(0.033, (timestamp - state.lastTime) / 1000);
        state.lastTime = timestamp;

        update(dt);
        draw();
        requestAnimationFrame(gameLoop);
    }

    function setKey(code, pressed) {
        if (code === "ArrowLeft" || code === "KeyA") input.left = pressed;
        if (code === "ArrowRight" || code === "KeyD") input.right = pressed;
        if (code === "ArrowUp" || code === "KeyW") input.up = pressed;
        if (code === "ArrowDown" || code === "KeyS") input.down = pressed;

        if (!pressed) return;

        if (code === "KeyE") {
            input.actionPressed = true;
            if (state.mode === "fieldPhoto") resolveFieldPhoto();
            return;
        }

        const jumpCode = code === "ArrowUp" || code === "KeyW" || code === "Space";
        if (!jumpCode) return;

        if (state.mode === "drone") {
            if (code === "Space") input.actionPressed = true;
            return;
        }

        if (state.mode === "fieldPhoto") {
            if (code === "Space") resolveFieldPhoto();
            return;
        }

        input.jumpPressed = true;
        if (state.mode === "broadcast") {
            resolveBroadcast();
        } else if (state.mode === "miniGame" && state.miniGame?.mission?.type === "photo") {
            resolvePhotoMiniGame();
        }
    }

    document.addEventListener("keydown", (event) => {
        const controlled = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space", "KeyA", "KeyD", "KeyW", "KeyS", "KeyE"];
        if (controlled.includes(event.code)) event.preventDefault();

        if (event.code === "KeyP" || event.code === "Escape") {
            if (ui.liveTvOverlay.classList.contains("active")) closeLiveTvAndReport();
            else if (ui.todayEventsOverlay.classList.contains("active")) ui.todayEventsOverlay.classList.remove("active");
            else if (ui.collectionOverlay.classList.contains("active")) ui.collectionOverlay.classList.remove("active");
            else if (ui.rankingOverlay.classList.contains("active")) ui.rankingOverlay.classList.remove("active");
            else if (ui.settingsOverlay.classList.contains("active")) ui.settingsOverlay.classList.remove("active");
            else if (ui.mapOverlay.classList.contains("active")) ui.mapOverlay.classList.remove("active");
            else if (ui.profileOverlay.classList.contains("active")) ui.profileOverlay.classList.remove("active");
            else if (state.mode === "playing") pauseGame();
            else if (state.mode === "paused") resumeGame();
            return;
        }

        setKey(event.code, true);
    });

    document.addEventListener("keyup", (event) => {
        setKey(event.code, false);
    });

    window.addEventListener("blur", () => {
        input.left = false;
        input.right = false;
        input.up = false;
        input.down = false;
        input.actionPressed = false;

        if (state.mode === "playing") pauseGame();
    });

    function bindHoldButton(button, key) {
        const start = (event) => {
            event.preventDefault();
            if (key === "left") input.left = true;
            if (key === "right") input.right = true;
            if (key === "jump") input.jumpPressed = true;
            if (key === "action") {
                input.actionPressed = true;
                if (state.mode === "drone") scanDroneTarget();
                else if (state.mode === "fieldPhoto") resolveFieldPhoto();
            }
        };

        const end = (event) => {
            event.preventDefault();
            if (key === "left") input.left = false;
            if (key === "right") input.right = false;
            if (key === "action") input.actionPressed = false;
        };

        button.addEventListener("pointerdown", start);
        button.addEventListener("pointerup", end);
        button.addEventListener("pointercancel", end);
        button.addEventListener("pointerleave", end);
    }

    bindHoldButton(buttons.mobileLeft, "left");
    bindHoldButton(buttons.mobileRight, "right");
    bindHoldButton(buttons.mobileJump, "jump");
    bindHoldButton(buttons.mobileAction, "action");

    buttons.start.addEventListener("click", startNewGame);
    buttons.pause.addEventListener("click", pauseGame);
    buttons.resume.addEventListener("click", resumeGame);
    buttons.restartLevel.addEventListener("click", retryLevel);
    buttons.retry.addEventListener("click", retryLevel);
    buttons.menu.addEventListener("click", showMenu);
    buttons.playAgain.addEventListener("click", startNewGame);
    buttons.chapterMap.addEventListener("click", openMap);
    buttons.profile.addEventListener("click", openProfile);
    buttons.beginLevel.addEventListener("click", beginLevel);
    buttons.levelNext.addEventListener("click", proceedFromLevelReport);
    buttons.levelMenu.addEventListener("click", showMenu);
    buttons.closeMap.addEventListener("click", () => ui.mapOverlay.classList.remove("active"));
    buttons.closeProfile.addEventListener("click", () => ui.profileOverlay.classList.remove("active"));
    ui.broadcastButton.addEventListener("click", resolveBroadcast);
    ui.nextLevelButton.addEventListener("click", nextLevel);
    ui.miniGameAction.addEventListener("click", resolvePhotoMiniGame);
    buttons.photoCapture.addEventListener("click", resolveFieldPhoto);
    buttons.todayEvents.addEventListener("click", openTodayEvents);
    buttons.closeTodayEvents.addEventListener("click", () => ui.todayEventsOverlay.classList.remove("active"));
    buttons.collection.addEventListener("click", openCollection);
    buttons.closeCollection.addEventListener("click", () => ui.collectionOverlay.classList.remove("active"));
    buttons.ranking.addEventListener("click", openRanking);
    buttons.closeRanking.addEventListener("click", () => ui.rankingOverlay.classList.remove("active"));
    buttons.settings.addEventListener("click", () => ui.settingsOverlay.classList.add("active"));
    buttons.closeSettings.addEventListener("click", () => ui.settingsOverlay.classList.remove("active"));
    buttons.closeLiveTv.addEventListener("click", closeLiveTvAndReport);
    ui.compactHudToggle.addEventListener("change", () => { state.settings.compactHud = ui.compactHudToggle.checked; saveSettings(); applySettings(); });
    ui.dynamicWeatherToggle.addEventListener("change", () => { state.settings.dynamicWeather = ui.dynamicWeatherToggle.checked; saveSettings(); chooseAtmosphere(); updateV5Hud(); });
    ui.cameraShakeToggle.addEventListener("change", () => { state.settings.cameraShake = ui.cameraShakeToggle.checked; saveSettings(); applySettings(); });

    state.settings = loadSettings(); applySettings();
    state.daily = loadDaily();
    ui.bestText.textContent = state.best.toLocaleString("tr-TR");
    state.level = createLevel(0); chooseAtmosphere(state.level);
    updateStaticUi(); updateUi(); updateProfileUi(); renderDailyTasks(); renderTodayEvents(); updateV5Hud();
    showMenu(); requestAnimationFrame(gameLoop);
})();
