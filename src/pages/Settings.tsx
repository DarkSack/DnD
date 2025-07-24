import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
    Settings as SettingsIcon,
    User,
    Palette,
    Bell,
    Shield,
    Globe,
    Download,
    Trash2,
    Sparkles,
    Sun,
    Volume2,
    Database,
    Moon,
    Languages
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Switch } from "@/components/ui/switch";
import { usePreferencesStore } from "@/store/userPreferencesStore";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

type IconType = React.ComponentType<{ color: string }>;

interface SettingItem {
    id: string;
    title: string;
    description: string;
    icon: IconType;
    path?: string;
    action?: () => void;
    gradient: string;
    showChevron?: boolean;
    rightElement?: React.ReactNode;
}

interface SettingSection {
    title: string;
    items: SettingItem[];
}


const SettingRow = ({ item }: { item: SettingItem }) => {
    const navigate = useNavigate();
    const IconComponent = item.icon;

    const handleClick = () => {
        if (item.action) {
            item.action();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div
            className="group flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 cursor-pointer border-b border-slate-100 dark:border-slate-800 last:border-b-0"
            onClick={handleClick}
        >
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                    <IconComponent color="white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        {item.description}
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
                {item.rightElement}
            </div>
        </div>
    );
};

const SettingSection = ({ section }: { section: SettingSection }) => {
    return (
        <Card className="border-0 bg-white dark:bg-slate-900 shadow-sm">
            <div className="p-6 pb-0">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                    {section.title}
                </h2>
            </div>
            <div className="pb-2">
                {section.items.map((item) => (
                    <SettingRow key={item.id} item={item} />
                ))}
            </div>
        </Card>
    );
};
const Settings: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { theme, language, notifications, toggleNotifications, sounds, toggleSounds, setTheme, setLanguage } = usePreferencesStore();
    useEffect(() => {
        if (!user && window.location.pathname !== "/auth") navigate("/auth");
    }, [user, navigate]);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);
    const settingSections: SettingSection[] = [
        {
            title: t("settings.accountSettingsSection"),
            items: [
                {
                    id: "profile",
                    title: t("settings.profileSettings"),
                    description: t("settings.profileSettingsDetails"),
                    icon: User,
                    path: "/settings/profile",
                    gradient: "from-blue-500 to-purple-600",
                },
                {
                    id: "privacy",
                    title: t("settings.profileSettingsPrivacy"),
                    description: t("settings.profileSettingsPrivacyDescription"),
                    icon: Shield,
                    path: "/settings/privacy",
                    gradient: "from-green-500 to-teal-600",
                },
                {
                    id: "backup",
                    title: t("settings.profileSettingsBackup"),
                    description: t("settings.profileSettingsBackupDescription"),
                    icon: Download,
                    path: "/settings/backup",
                    gradient: "from-cyan-500 to-blue-500",
                },
            ],
        },
        {
            title: t("settings.customizationSection"),
            items: [
                {
                    id: "appearance",
                    title: t("settings.customizationAppearance"),
                    description: t("settings.customizationAppearanceDescription"),
                    icon: Palette,
                    gradient: "from-pink-500 to-rose-600",
                    rightElement: (
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Sun className="w-4 h-4" />
                            <span>{t("settings.customizationThemeLight")}</span>
                            <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
                            <span>{t("settings.customizationThemeDark")}</span>
                            <Moon className="w-4 h-4" />
                        </div>
                    ),
                },
                {
                    id: "language",
                    title: t("settings.customizationLanguage"),
                    description: t("settings.customizationLanguageDescription"),
                    icon: Globe,
                    gradient: "from-indigo-500 to-blue-600",
                    rightElement: (
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                            <Languages />
                            <span className="text-xs text-slate-500 dark:text-slate-400">{t("settings.customizationLanguageSpanish")}</span>
                            <Switch checked={language === "en"} onCheckedChange={() => setLanguage(language === "en" ? "es" : "en")} />
                            <span className="text-xs text-slate-500 dark:text-slate-400">{t("settings.customizationLanguageEnglish")}</span>
                        </div>
                    ),
                },
            ],
        },
        {
            title: t("settings.NotificationsSection"),
            items: [
                {
                    id: "notifications",
                    title: t("settings.Notifications"),
                    description: t("settings.NotificationsDescription"),
                    icon: Bell,
                    gradient: "from-yellow-500 to-orange-600",
                    rightElement: (
                        <Switch checked={notifications} onCheckedChange={() => toggleNotifications()} />
                    ),
                },
                {
                    id: "sounds",
                    title: t("settings.NotificationSounds"),
                    description: t("settings.NotificationSoundsDescription"),
                    icon: Volume2,
                    gradient: "from-purple-500 to-indigo-600",
                    rightElement: (
                        <Switch checked={sounds} onCheckedChange={() => toggleSounds()} />
                    ),
                },
            ],
        },
        {
            title: t("settings.dangerZone"),
            items: [
                {
                    id: "delete-data",
                    title: t("settings.dangerZoneDeleteData"),
                    description: t("settings.dangerZoneDeleteDataDescription"),
                    icon: Database,
                    gradient: "from-orange-500 to-red-500",
                },
                {
                    id: "delete-account",
                    title: t("settings.dangerZoneDeleteAccount"),
                    description: t("settings.dangerZoneDeleteAccountDescription"),
                    icon: Trash2,
                    gradient: "from-red-500 to-rose-600",
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

                <div className="container mx-auto px-4 pt-16 pb-12">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg mb-8">
                            <SettingsIcon className="w-10 h-10 text-white" />
                        </div>

                        <h1 className="text-5xl pb-2 md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent mb-6">
                            {t("settings.title")}
                        </h1>

                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                            <Sparkles className="w-4 h-4" />
                            <span>Ajusta cada detalle a tu gusto</span>
                            <Sparkles className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="container mx-auto px-4 pb-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    {settingSections.map((section, index) => (
                        <SettingSection key={index} section={section} />
                    ))}
                </div>
            </div>

            {/* Footer decoration */}
            <div className="text-center pb-8">
                <div className="inline-flex items-center gap-2 text-sm text-slate-400 dark:text-slate-600">
                    <span>¡Personaliza tu aventura!</span>
                    <SettingsIcon className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default Settings;