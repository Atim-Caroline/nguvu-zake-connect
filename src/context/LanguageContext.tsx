import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "lg" | "sw";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    home: "Home", safeSpace: "Safe Space", mentorship: "Mentorship",
    events: "Events", opportunities: "Opportunities", community: "Community",
    signIn: "Sign In", joinFree: "Join Free", signOut: "Sign out",
    // Hero
    heroTitle: "Nguvu Zake.", heroCommunity: "Her Community.",
    heroSub: "A safe digital space where African women find mentorship, share experiences anonymously, and access life-changing opportunities — together.",
    joinCommunity: "Join the Community", exploreSafeSpace: "Explore Safe Space",
    womenConnected: "Women Connected", verifiedMentors: "Verified Mentors", languages: "Languages",
    // Features
    whatWeOffer: "What We Offer", everythingToThrive: "Everything You Need to Thrive",
    builtByWomen: "Built by women, for women — a platform that understands your journey.",
    anonSafeSpace: "Anonymous Safe Space", anonDesc: "Share your story and seek advice without revealing your identity.",
    mentorNetwork: "Mentorship Network", mentorDesc: "Connect with verified counselors and professionals for one-on-one guidance.",
    liveEvents: "Live Events", liveDesc: "Join live teachings, Q&A sessions, and workshops by community leaders.",
    opportunitiesHub: "Opportunities Hub", opportunitiesDesc: "Jobs, scholarships, volunteer roles, and skill-building programs.",
    multiLang: "Multi-Language", multiLangDesc: "Navigate in English, Luganda, or Kiswahili.",
    supportGroups: "Support Groups", supportGroupsDesc: "Join groups based on shared challenges. Grow together.",
    // SafeSpacePreview
    anonSafe: "Anonymous & Safe", voiceMatters: "Your Voice Matters.",
    identityProtected: "Your Identity Is Protected.",
    safeSpaceDesc: "Share your questions, stories, and challenges without fear. Our moderated safe space ensures every woman is heard, respected, and supported.",
    enterSafeSpace: "Enter Safe Space", anonymous: "Anonymous",
    // OpportunitiesSection
    opportunitiesLabel: "Opportunities", doorsOpening: "Doors Are Opening",
    forYou: "For You",
    opportunitiesSub: "Jobs, scholarships, volunteer roles, and skill-building programs — all in one place.",
    newFeature: "New Feature", swipeTitle: "Swipe to Find Your Dream Job",
    swipeDesc: "Tinder-style job matching — swipe right to save, left to skip.",
    tryJobSwipe: "Try Job Swipe", viewAllOpportunities: "View All Opportunities",
    // CTA
    joinThousands: "Join Thousands of Women", yourJourney: "Your Journey",
    startsHere: "Starts Here",
    ctaDesc: "Find strength, mentorship, and opportunity in the Nguvu Zake community. You don't have to do it alone.",
    joinNguvuFree: "Join Nguvu Zake Free",
    // Footer
    herStrength: "Her Strength. A safe digital community empowering women across Africa and beyond.",
    platform: "Platform", community: "Community",
    supportGroupsFooter: "Support Groups", guidelines: "Guidelines",
    becomeAMentor: "Become a Mentor", faq: "FAQ",
    copyright: "© 2026 Nguvu Zake. Built with love for women everywhere.", shareOnMind: "Share something on your mind...",
    post: "Post", loadingPosts: "Loading posts...", noReplies: "No replies yet. Be the first to respond.",
    writeReply: "Write an anonymous reply...", all: "All",
    // Events
    upcomingEvents: "Upcoming Events", liveTeachings: "Live teachings, workshops, and Q&A sessions — join from anywhere.",
    registerToAttend: "Register to Attend", joinLiveNow: "Join Live Now",
    attendGetNotified: "Attend & Get Notified", fullName: "Full Name", emailAddress: "Email Address",
    youreRegistered: "You're registered!", reminderSent: "We'll send a reminder to",
    whenGoesLive: "when it goes live.", notificationEmail: "Notification will be sent to your email",
    done: "Done", cancel: "Cancel",
    // Community
    joinConversation: "Join the Conversation", shareThoughts: "Share your thoughts with the community...",
    // Mentorship
    guidedByWomen: "Guided by Women Who Understand",
    guidedDesc: "Book sessions with verified mentors — counselors, pastors, and professionals ready to walk with you.",
    chat: "Chat", bookCall: "Book Call", sessions: "sessions",
    // Profile
    editProfile: "Edit Profile", saveChanges: "Save Changes", saved: "Saved!",
    fullNameLabel: "Full Name", nickname: "Nickname", optional: "optional",
    bio: "Bio", profession: "Profession", field: "Field", age: "Age", gender: "Gender",
    selectField: "Select your field", preferNotToSay: "Prefer not to say",
    tapToChange: "Tap to change photo", verifiedMember: "Verified Member",
    getVerified: "Get Verified", verifiedDesc: "Verified members get a badge on their profile and are trusted by the community.",
    requestVerification: "Request Verification", submitting: "Submitting...",
    requestSubmitted: "Request submitted — we'll review it shortly.",
    // Inbox
    messages: "Messages", searchMentors: "Search mentors...", startConversation: "Start a conversation",
    // Sign in/up
    welcomeBack: "Welcome back", signInToAccount: "Sign in to your account",
    continueWithGoogle: "Continue with Google", continueWithApple: "Continue with Apple",
    orContinueWithEmail: "or continue with email", password: "Password",
    signingIn: "Signing in...", noAccount: "Don't have an account?",
    joinTheCommunity: "Join the community", createFreeAccount: "Create your free account",
    orSignUpWithEmail: "or sign up with email", creatingAccount: "Creating account...",
    createAccount: "Create Account", alreadyHaveAccount: "Already have an account?",
    checkEmail: "Check your email!", sentConfirmation: "We sent a confirmation link to",
    clickToActivate: "Click the link in the email to activate your account and join the community.",
    goToSignIn: "Go to Sign In",
    signInWithGoogle: "Sign in with Google",
    googleRedirectDesc: "You'll be redirected to Google to sign in. Your Google email will be used to create or access your Nguvu Zake account.",
    continue: "Continue",
  },
  lg: {
    // Nav
    home: "Awaka", safeSpace: "Kifo Ekiviiri", mentorship: "Buyigirize",
    events: "Ebikwata", opportunities: "Emikisa", community: "Ekibiina",
    signIn: "Yingira", joinFree: "Waniramu Bwereere", signOut: "Fuluma",
    // Hero
    heroTitle: "Amaanyi Ge.", heroCommunity: "Ekibiina Kye.",
    heroSub: "Ekifo ekiviiri ky'obuwulize gye abakazi b'e Afrika basobola okufuna buyigirize, okwogera mu kyama, n'emikisa.",
    joinCommunity: "Yingira mu Kibiina", exploreSafeSpace: "Noonya Kifo Ekiviiri",
    womenConnected: "Abakazi Abakuŋŋaana", verifiedMentors: "Abayigiriza Abeemirwa", languages: "Ennimi",
    // Features
    whatWeOffer: "Kye Tuwa", everythingToThrive: "Byonna Eby'okukuuma Obulamu",
    builtByWomen: "Yakozesebwa abakazi, eri abakazi — platform eyetegeera olugendo lwo.",
    anonSafeSpace: "Kifo Ekiviiri eky'Obukuumi", anonDesc: "Gamba ebirowoozo byo nga tewali amanyi.",
    mentorNetwork: "Omukutu gw'Abayigiriza", mentorDesc: "Kuŋŋaana n'abayigiriza abeemirwa okusobola okufuna buyigirize.",
    liveEvents: "Ebikwata Ebyakulaakulana", liveDesc: "Yingira mu mafunza, emibuuzo, n'ebikolwa by'abakulu b'ekibiina.",
    opportunitiesHub: "Ekifo ky'Emikisa", opportunitiesDesc: "Emirimu, bursaries, n'ebikolwa by'okuzimba obukugu.",
    multiLang: "Ennimi Nnyingi", multiLangDesc: "Tambula mu Lungereza, Luganda, oba Kiswahili.",
    supportGroups: "Amakuŋŋaana g'Obuyambi", supportGroupsDesc: "Yingira mu makuŋŋaana ag'okubeera awamu. Kulaakulana awamu.",
    // SafeSpacePreview
    anonSafe: "Ekiviiri & Obukuumi", voiceMatters: "Eddoboozi Lyo Lirina Omuwendo.",
    identityProtected: "Erinnya Lyo Liviiriddwa.",
    safeSpaceDesc: "Gamba ebibuuzo, ebirowoozo, n'okuzikirira nga totyanga. Ekifo kyaffe ekiviiri kikuuma buli mukazi okuwulirwa, okukiririzibwa, n'okuyambibwa.",
    enterSafeSpace: "Yingira mu Kifo Ekiviiri", anonymous: "Ekiviiri",
    // OpportunitiesSection
    opportunitiesLabel: "Emikisa", doorsOpening: "Emivumo Gikugulukira",
    forYou: "Gy'oli",
    opportunitiesSub: "Emirimu, bursaries, ebikolwa by'okuyamba, n'ebikolwa by'okuzimba obukugu — byonna mu kifo kimu.",
    newFeature: "Ekintu Ekipya", swipeTitle: "Swiipa Okufuna Omulimu Gwo Ogw'Okusuubira",
    swipeDesc: "Okufanananya n'omulimu — swiipa ddyo okuziga, kkono okusazaamu.",
    tryJobSwipe: "Gezaako Job Swipe", viewAllOpportunities: "Laba Emikisa Gyonna",
    // CTA
    joinThousands: "Yingira n'Abakazi Abangi", yourJourney: "Olugendo Lwo",
    startsHere: "Lutandika Wano",
    ctaDesc: "Funa amaanyi, buyigirize, n'emikisa mu kibiina kya Nguvu Zake. Tosobola okukola wekka.",
    joinNguvuFree: "Yingira mu Nguvu Zake Bwereere",
    // Footer
    herStrength: "Amaanyi Ge. Ekibiina ekiviiri eky'obuwulize ekikulaakulanya abakazi mu Afrika n'ebifo byonna.",
    platform: "Platform", community: "Ekibiina",
    supportGroupsFooter: "Amakuŋŋaana g'Obuyambi", guidelines: "Amateeka",
    becomeAMentor: "Beera Omuyigiriza", faq: "Emibuuzo Egisinga Okubuzibwa",
    copyright: "© 2026 Nguvu Zake. Yakozesebwa n'okwagala eri abakazi bonna.", shareOnMind: "Gamba eky'omwoyo gwo...",
    post: "Tuma", loadingPosts: "Tukutegeka ebigambo...", noReplies: "Tewali zimu. Beera osooka okuddamu.",
    writeReply: "Wandiika okuddamu mu kyama...", all: "Byonna",
    // Events
    upcomingEvents: "Ebikwata Ebijaako", liveTeachings: "Amafunza, ebikolwa, n'emibuuzo — yingira okuva awo oli.",
    registerToAttend: "Wandiika Okujja", joinLiveNow: "Yingira Kaakano",
    attendGetNotified: "Jja & Weetegeeze", fullName: "Erinnya Lyonna", emailAddress: "Endagiriro y'Email",
    youreRegistered: "Owandisiddwa!", reminderSent: "Tukutumira obubuuzi ku",
    whenGoesLive: "bw'eba mu mbeera.", notificationEmail: "Obubuuzi butumirwa ku email yo",
    done: "Waakiri", cancel: "Sazaamu",
    // Community
    joinConversation: "Yingira mu Kubuulira", shareThoughts: "Gamba ebirowoozo byo n'ekibiina...",
    // Mentorship
    guidedByWomen: "Bayigirirwa Abakazi Abategeera",
    guidedDesc: "Teeka eddakiika n'abayigiriza abeemirwa — abajjanjabi, abasumba, n'abantu ab'obusuubuzi.",
    chat: "Buulira", bookCall: "Teeka Okukowoola", sessions: "eddakiika",
    // Profile
    editProfile: "Kyusa Profailo", saveChanges: "Zachya Enkyukakyuka", saved: "Zachiddwa!",
    fullNameLabel: "Erinnya Lyonna", nickname: "Erinnya Ery'okusoma", optional: "si ky'obulazima",
    bio: "Ebikuhuusa", profession: "Omulimu", field: "Ekitundu", age: "Emyaka", gender: "Ekika",
    selectField: "Londa ekitundu kyo", preferNotToSay: "Sirina kugamba",
    tapToChange: "Nyiga okkyusa ekifaananyi", verifiedMember: "Munaekibiina Oweemirwa",
    getVerified: "Weemirwe", verifiedDesc: "Abeemirwa bafuna badge ku profailo yaabwe era ekibiina kibakkiriza.",
    requestVerification: "Saba Oweemirwe", submitting: "Tukituma...",
    requestSubmitted: "Okusaba kwagezibwa — tunaakikyusa mangu.",
    // Inbox
    messages: "Obubaka", searchMentors: "Noonya abayigiriza...", startConversation: "Tandika okubuulira",
    // Sign in/up
    welcomeBack: "Tukuwaayo", signInToAccount: "Yingira mu kkaawunti yo",
    continueWithGoogle: "Endeera ne Google", continueWithApple: "Endeera ne Apple",
    orContinueWithEmail: "oba endeera ne email", password: "Ekigambo ky'okulinda",
    signingIn: "Tukuyingiza...", noAccount: "Tolina kkaawunti?",
    joinTheCommunity: "Yingira mu kibiina", createFreeAccount: "Tondawo kkaawunti bwereere",
    orSignUpWithEmail: "oba wandiika ne email", creatingAccount: "Tukitondawo...",
    createAccount: "Tondawo Kkaawunti", alreadyHaveAccount: "Olina kkaawunti?",
    checkEmail: "Kebera email yo!", sentConfirmation: "Tukutumira link ku",
    clickToActivate: "Nyiga link mu email okuzimba kkaawunti yo n'oyingira mu kibiina.",
    goToSignIn: "Genda ku Kuyingira",
    signInWithGoogle: "Yingira ne Google",
    googleRedirectDesc: "Ojja kutumibwa eri Google okuyingira. Email yo ya Google erinaakozesebwa.",
    continue: "Endeera",
  },
  sw: {
    // Nav
    home: "Nyumbani", safeSpace: "Nafasi Salama", mentorship: "Ushauri",
    events: "Matukio", opportunities: "Fursa", community: "Jamii",
    signIn: "Ingia", joinFree: "Jiunge Bure", signOut: "Toka",
    // Hero
    heroTitle: "Nguvu Yake.", heroCommunity: "Jamii Yake.",
    heroSub: "Nafasi salama ya kidijitali ambapo wanawake wa Afrika hupata ushauri, kushiriki uzoefu kwa siri, na kupata fursa za kubadilisha maisha.",
    joinCommunity: "Jiunge na Jamii", exploreSafeSpace: "Chunguza Nafasi Salama",
    womenConnected: "Wanawake Waliounganishwa", verifiedMentors: "Washauri Walioidhinishwa", languages: "Lugha",
    // Features
    whatWeOffer: "Tunachotoa", everythingToThrive: "Kila Kitu Unachohitaji Kustawi",
    builtByWomen: "Imejengwa na wanawake, kwa wanawake — jukwaa linaloelewa safari yako.",
    anonSafeSpace: "Nafasi Salama ya Siri", anonDesc: "Shiriki hadithi yako na utafute ushauri bila kufunua utambulisho wako.",
    mentorNetwork: "Mtandao wa Washauri", mentorDesc: "Unganika na washauri walioidhinishwa kwa mwongozo wa mtu mmoja mmoja.",
    liveEvents: "Matukio ya Moja kwa Moja", liveDesc: "Jiunge na mafunzo, maswali na majibu, na warsha za viongozi wa jamii.",
    opportunitiesHub: "Kitovu cha Fursa", opportunitiesDesc: "Kazi, masomo, nafasi za kujitolea, na mipango ya kujenga ujuzi.",
    multiLang: "Lugha Nyingi", multiLangDesc: "Tembelea kwa Kiingereza, Luganda, au Kiswahili.",
    supportGroups: "Vikundi vya Msaada", supportGroupsDesc: "Jiunge na vikundi kulingana na changamoto zinazofanana. Kukua pamoja.",
    // SafeSpacePreview
    anonSafe: "Siri & Salama", voiceMatters: "Sauti Yako Ina Maana.",
    identityProtected: "Utambulisho Wako Umelindwa.",
    safeSpaceDesc: "Shiriki maswali, hadithi, na changamoto bila hofu. Nafasi yetu salama inahakikisha kila mwanamke anasikika, anaheshimiwa, na kusaidiwa.",
    enterSafeSpace: "Ingia Nafasi Salama", anonymous: "Bila Jina",
    // OpportunitiesSection
    opportunitiesLabel: "Fursa", doorsOpening: "Milango Inafunguka",
    forYou: "Kwako",
    opportunitiesSub: "Kazi, masomo, nafasi za kujitolea, na mipango ya kujenga ujuzi — yote mahali pamoja.",
    newFeature: "Kipengele Kipya", swipeTitle: "Telezesha Kupata Kazi ya Ndoto Yako",
    swipeDesc: "Kulinganisha kazi kama Tinder — telezesha kulia kuhifadhi, kushoto kuruka.",
    tryJobSwipe: "Jaribu Job Swipe", viewAllOpportunities: "Ona Fursa Zote",
    // CTA
    joinThousands: "Jiunge na Wanawake Wengi", yourJourney: "Safari Yako",
    startsHere: "Inaanza Hapa",
    ctaDesc: "Pata nguvu, ushauri, na fursa katika jamii ya Nguvu Zake. Huhitaji kufanya peke yako.",
    joinNguvuFree: "Jiunge na Nguvu Zake Bure",
    // Footer
    herStrength: "Nguvu Yake. Jamii salama ya kidijitali inayowawezesha wanawake Afrika na zaidi.",
    platform: "Jukwaa", community: "Jamii",
    supportGroupsFooter: "Vikundi vya Msaada", guidelines: "Miongozo",
    becomeAMentor: "Kuwa Mshauri", faq: "Maswali Yanayoulizwa Mara Kwa Mara",
    copyright: "© 2026 Nguvu Zake. Imejengwa kwa upendo kwa wanawake wote.", shareOnMind: "Shiriki kitu kilichoko akilini mwako...",
    post: "Chapisha", loadingPosts: "Inapakia machapisho...", noReplies: "Hakuna majibu bado. Kuwa wa kwanza kujibu.",
    writeReply: "Andika jibu la siri...", all: "Zote",
    // Events
    upcomingEvents: "Matukio Yanayokuja", liveTeachings: "Mafunzo, warsha, na maswali — jiunge kutoka popote.",
    registerToAttend: "Jiandikishe Kuhudhuria", joinLiveNow: "Jiunge Sasa Hivi",
    attendGetNotified: "Hudhuria & Pata Arifa", fullName: "Jina Kamili", emailAddress: "Anwani ya Barua Pepe",
    youreRegistered: "Umejiandikisha!", reminderSent: "Tutatuma ukumbusho kwa",
    whenGoesLive: "wakati inapoanza.", notificationEmail: "Arifa itatumwa kwa barua pepe yako",
    done: "Imekamilika", cancel: "Ghairi",
    // Community
    joinConversation: "Jiunge na Mazungumzo", shareThoughts: "Shiriki mawazo yako na jamii...",
    // Mentorship
    guidedByWomen: "Wanaongozwa na Wanawake Wanaoelewana",
    guidedDesc: "Weka miadi na washauri walioidhinishwa — washauri, wachungaji, na wataalamu.",
    chat: "Zungumza", bookCall: "Weka Simu", sessions: "vikao",
    // Profile
    editProfile: "Hariri Wasifu", saveChanges: "Hifadhi Mabadiliko", saved: "Imehifadhiwa!",
    fullNameLabel: "Jina Kamili", nickname: "Jina la Utani", optional: "si lazima",
    bio: "Maelezo", profession: "Taaluma", field: "Uwanja", age: "Umri", gender: "Jinsia",
    selectField: "Chagua uwanja wako", preferNotToSay: "Ninapendelea kutosema",
    tapToChange: "Gusa kubadilisha picha", verifiedMember: "Mwanachama Aliyeidhinishwa",
    getVerified: "Thibitishwa", verifiedDesc: "Wanachama walioidhinishwa hupata beji kwenye wasifu wao.",
    requestVerification: "Omba Uthibitisho", submitting: "Inatuma...",
    requestSubmitted: "Ombi limewasilishwa — tutaangalia hivi karibuni.",
    // Inbox
    messages: "Ujumbe", searchMentors: "Tafuta washauri...", startConversation: "Anza mazungumzo",
    // Sign in/up
    welcomeBack: "Karibu tena", signInToAccount: "Ingia kwenye akaunti yako",
    continueWithGoogle: "Endelea na Google", continueWithApple: "Endelea na Apple",
    orContinueWithEmail: "au endelea na barua pepe", password: "Nywila",
    signingIn: "Inaingia...", noAccount: "Huna akaunti?",
    joinTheCommunity: "Jiunge na jamii", createFreeAccount: "Unda akaunti yako bure",
    orSignUpWithEmail: "au jiandikishe na barua pepe", creatingAccount: "Inaunda...",
    createAccount: "Unda Akaunti", alreadyHaveAccount: "Una akaunti tayari?",
    checkEmail: "Angalia barua pepe yako!", sentConfirmation: "Tulituma kiungo cha uthibitisho kwa",
    clickToActivate: "Bonyeza kiungo kwenye barua pepe ili kuamilisha akaunti yako.",
    goToSignIn: "Nenda Kuingia",
    signInWithGoogle: "Ingia na Google",
    googleRedirectDesc: "Utaelekezwa kwa Google kuingia. Barua pepe yako ya Google itatumika.",
    continue: "Endelea",
  },
};

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en", setLang: () => {}, t: (k) => k,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[lang][key] ?? translations["en"][key] ?? key;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
