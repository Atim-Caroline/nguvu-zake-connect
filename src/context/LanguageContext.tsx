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
    // Safe Space
    yourPostAnon: "Your post will be anonymous", shareOnMind: "Share something on your mind...",
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
    // Safe Space
    yourPostAnon: "Ebigambo byo binaabaawo nga tewali amanyi", shareOnMind: "Gamba eky'omwoyo gwo...",
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
    // Safe Space
    yourPostAnon: "Chapisho lako litakuwa la siri", shareOnMind: "Shiriki kitu kilichoko akilini mwako...",
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
