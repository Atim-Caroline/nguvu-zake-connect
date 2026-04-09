import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "lg" | "sw";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    home: "Home",
    safeSpace: "Safe Space",
    mentorship: "Mentorship",
    events: "Events",
    opportunities: "Opportunities",
    community: "Community",
    signIn: "Sign In",
    joinFree: "Join Free",
    heroTitle: "Nguvu Zake.",
    heroCommunity: "Her Community.",
    heroSub: "A safe digital space where African women find mentorship, share experiences anonymously, and access life-changing opportunities — together.",
    joinCommunity: "Join the Community",
    exploreSafeSpace: "Explore Safe Space",
    womenConnected: "Women Connected",
    verifiedMentors: "Verified Mentors",
    languages: "Languages",
  },
  lg: {
    home: "Awaka",
    safeSpace: "Kifo Ekiviiri",
    mentorship: "Buyigirize",
    events: "Ebikwata",
    opportunities: "Emikisa",
    community: "Ekibiina",
    signIn: "Yingira",
    joinFree: "Waniramu Bwereere",
    heroTitle: "Amaanyi Ge.",
    heroCommunity: "Ekibiina Kye.",
    heroSub: "Ekifo ekiviiri ky'obuwulize gye abakazi b'e Afrika basobola okufuna buyigirize, okwogera mu kyama, n'emikisa.",
    joinCommunity: "Yingira mu Kibiina",
    exploreSafeSpace: "Noonya Kifo Ekiviiri",
    womenConnected: "Abakazi Abakuŋŋaana",
    verifiedMentors: "Abayigiriza Abeemirwa",
    languages: "Ennimi",
  },
  sw: {
    home: "Nyumbani",
    safeSpace: "Nafasi Salama",
    mentorship: "Ushauri",
    events: "Matukio",
    opportunities: "Fursa",
    community: "Jamii",
    signIn: "Ingia",
    joinFree: "Jiunge Bure",
    heroTitle: "Nguvu Yake.",
    heroCommunity: "Jamii Yake.",
    heroSub: "Nafasi salama ya kidijitali ambapo wanawake wa Afrika hupata ushauri, kushiriki uzoefu kwa siri, na kupata fursa za kubadilisha maisha.",
    joinCommunity: "Jiunge na Jamii",
    exploreSafeSpace: "Chunguza Nafasi Salama",
    womenConnected: "Wanawake Waliounganishwa",
    verifiedMentors: "Washauri Walioidhinishwa",
    languages: "Lugha",
  },
};

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[lang][key] ?? translations["en"][key] ?? key;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
