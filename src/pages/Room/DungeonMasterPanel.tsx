import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Sword, Shield, Eye, Brain, BookOpen, Smile, Crown, Dice6, Zap, Heart,
    ScrollText, Castle, Star, Wand2, Axe, Skull, Target, UserPlus, Dices
} from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

// ========== TIPOS E INTERFACES ==========
interface Attributes {
    fuerza: number;
    destreza: number;
    constitucion: number;
    inteligencia: number;
    sabiduria: number;
    carisma: number;
}

interface Player {
    id: string;
    name: string;
    attributes: Attributes;
    currentHP: number;
    maxHP: number;
    initiative: number;
    isActive: boolean;
    class: string;
}


// ========== CONSTANTES ==========
const FONT_STYLE = { fontFamily: "'MedievalSharp', cursive" };

const CLASS_THEMES = {
    'Guerrero': { color: 'bg-red-700', icon: <Sword /> },
    'Mago': { color: 'bg-blue-700', icon: <Wand2 /> },
    'Pícaro': { color: 'bg-gray-700', icon: <Eye /> },
    'Clérigo': { color: 'bg-yellow-500', icon: <Star /> },
    'Paladín': { color: 'bg-amber-500', icon: <Shield /> },
    'Bárbaro': { color: 'bg-orange-700', icon: <Axe /> },
    'Explorador': { color: 'bg-green-700', icon: <Target /> },
    'Bardo': { color: 'bg-purple-700', icon: <Smile /> },
} as const;

const EVENT_ICONS = {
    combat: <Sword className="text-red-400" />,
    narrative: <BookOpen className="text-blue-300" />,
    loot: <Star className="text-yellow-300" />,
    system: <Zap className="text-purple-300" />,
} as const;

const ATTRIBUTE_CONFIG = [
    { key: 'fuerza', label: 'Fuerza', icon: <Sword className="w-5 h-5" /> },
    { key: 'destreza', label: 'Destreza', icon: <Eye className="w-5 h-5" /> },
    { key: 'constitucion', label: 'Constitución', icon: <Shield className="w-5 h-5" /> },
    { key: 'inteligencia', label: 'Inteligencia', icon: <Brain className="w-5 h-5" /> },
    { key: 'sabiduria', label: 'Sabiduría', icon: <BookOpen className="w-5 h-5" /> },
    { key: 'carisma', label: 'Carisma', icon: <Smile className="w-5 h-5" /> },
] as const;

// ========== UTILIDADES ==========
const getClassTheme = (playerClass: string) =>
    CLASS_THEMES[playerClass as keyof typeof CLASS_THEMES] ||
    { color: 'bg-stone-700', icon: <Sword /> };


const getHPColor = (percentage: number) => {
    if (percentage > 60) return 'bg-green-500';
    if (percentage > 30) return 'bg-yellow-500';
    return 'bg-red-600';
};

// ========== COMPONENTES ==========
const AttributeDisplay: React.FC<{
    label: string;
    value: number;
    icon: React.ReactNode;
}> = ({ label, value, icon }) => (
    <div className="flex items-center gap-2 p-2 bg-amber-50/50 border-l-4 border-amber-800 rounded-r-lg">
        <div className="text-amber-900">{icon}</div>
        <div className="flex-grow">
            <div className="text-xs font-bold text-amber-900 uppercase" style={FONT_STYLE}>
                {label}
            </div>
            <div className="text-2xl font-black text-amber-800" style={FONT_STYLE}>
                {value}
            </div>
        </div>
    </div>
);

const HPBar: React.FC<{ current: number; max: number }> = ({ current, max }) => {
    const percentage = max > 0 ? (current / max) * 100 : 0;
    const healthColor = getHPColor(percentage);

    return (
        <div>
            <div className="flex justify-between items-center mb-1 text-amber-900" style={FONT_STYLE}>
                <span className="font-bold text-sm">Vitalidad</span>
                <span className="font-black text-lg">{current} / {max}</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full border-2 border-stone-900 shadow-inner h-6">
                <div
                    className={`h-full rounded-full transition-all duration-500 flex items-center justify-end ${healthColor}`}
                    style={{ width: `${percentage}%` }}
                >
                    <div className="w-2 h-2 rounded-full bg-white/50 mr-2 blur-sm"></div>
                </div>
            </div>
        </div>
    );
};

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
    const { updatePlayerHP } = useGameStore();
    const theme = getClassTheme(player.class);
    const isDead = player.currentHP <= 0;

    const handleHPChange = (delta: number) => {
        updatePlayerHP(player.id, player.currentHP + delta);
    };

    const cardClasses = `
    relative transition-all duration-500 bg-amber-100 border-4 rounded-lg shadow-lg
    ${player.isActive && !isDead
            ? 'border-yellow-400 shadow-yellow-500/40 scale-105'
            : 'border-amber-800'
        }
    ${isDead ? 'grayscale filter saturate-0 opacity-60' : ''}
  `.trim();

    return (
        <Card className={cardClasses}>
            {isDead && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Skull className="w-24 h-24 text-black/50" />
                </div>
            )}

            <CardHeader className={`p-3 ${theme.color} text-white flex flex-row justify-between items-center border-b-4 border-amber-900`}>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/20 rounded-full">{theme.icon}</div>
                    <div>
                        <CardTitle className="text-2xl" style={FONT_STYLE}>
                            {player.name}
                        </CardTitle>
                        <p className="text-sm -mt-1" style={FONT_STYLE}>
                            {player.class}
                        </p>
                    </div>
                </div>
                <Badge
                    className="bg-stone-900 text-amber-200 text-lg border-2 border-amber-400 p-2"
                    style={FONT_STYLE}
                >
                    <Dices className="w-4 h-4 mr-2" />
                    {player.initiative}
                </Badge>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
                <HPBar current={player.currentHP} max={player.maxHP} />

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {ATTRIBUTE_CONFIG.map(({ key, label, icon }) => (
                        <AttributeDisplay
                            key={key}
                            label={label}
                            value={player.attributes[key]}
                            icon={icon}
                        />
                    ))}
                </div>

                <div className="flex gap-2 justify-center pt-2">
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleHPChange(-10)}
                        style={FONT_STYLE}
                    >
                        <Skull className="w-4 h-4 mr-1" /> Herir
                    </Button>
                    <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleHPChange(10)}
                        style={FONT_STYLE}
                    >
                        <Heart className="w-4 h-4 mr-1" /> Sanar
                    </Button>
                </div>
            </CardContent>

            {player.isActive && !isDead && (
                <Crown className="absolute -top-4 -left-4 w-10 h-10 text-yellow-400 rotate-[-30deg] drop-shadow-lg" />
            )}
        </Card>
    );
};

const AddPlayerForm: React.FC = () => {
    const { addPlayer } = useGameStore();
    const [heroes, setHeroes] = useState<string[]>([]);
    const [nameHero, setNameHero] = useState("");

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setHeroes(data.map((user: { name: string }) => user.name));
                }
            } catch (error) {
                console.warn('No se pudo cargar la lista de héroes:', error);
                // Fallback con nombres predeterminados
                setHeroes(['Sir Gideon', 'Lady Elara', 'Thorin Forjacero', 'Aria Vientoluna']);
            }
        };

        fetchHeroes();
    }, []);

    const filteredHeroes = useMemo(() => {
        if (!nameHero) return [];
        return heroes.filter(hero =>
            hero.toLowerCase().includes(nameHero.toLowerCase())
        );
    }, [nameHero, heroes]);

    const handleHeroSelect = (hero: string) => {
        setNameHero(hero);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nameHero.trim()) {
            addPlayer(nameHero.trim());
            setNameHero("");
        }
    };

    return (
        <div className="flex gap-2 w-full relative">
            <Input
                type="text"
                value={nameHero}
                onChange={(e) => setNameHero(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
                placeholder="Nombre del Héroe..."
                className="bg-amber-100 border-amber-800 text-amber-900 placeholder:text-amber-700/70"
                style={FONT_STYLE}
            />

            {filteredHeroes.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-amber-800 max-h-40 overflow-y-auto z-10 rounded shadow">
                    {filteredHeroes.map((hero) => (
                        <li
                            key={hero}
                            onClick={() => handleHeroSelect(hero)}
                            className="px-3 py-1 border-b border-black hover:bg-amber-100 cursor-pointer text-amber-900"
                        >
                            {hero}
                        </li>
                    ))}
                </ul>
            )}

            <Button
                onClick={handleSubmit}
                className="bg-green-800 hover:bg-green-700 border-2 border-green-900"
                style={FONT_STYLE}
            >
                <UserPlus className="w-5 h-5 mr-2" /> Reclutar
            </Button>
        </div>
    );
};

const EventLog: React.FC = () => {
    const events = useGameStore(state => state.events);
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [events]);

    return (
        <Card className="bg-stone-900/80 border-4 border-amber-800 text-amber-100 flex flex-col h-[600px]">
            <CardHeader className="border-b-4 border-amber-800 p-3">
                <CardTitle className="flex items-center gap-3 text-2xl" style={FONT_STYLE}>
                    <ScrollText /> Códice del Cronista
                </CardTitle>
            </CardHeader>

            <CardContent
                ref={logRef}
                className="p-4 space-y-3 overflow-y-auto flex-grow"
            >
                {events.map(event => (
                    <div
                        key={event.id}
                        className="flex gap-3 text-lg border-b border-amber-900/50 pb-2 animate-fadeIn"
                    >
                        <div className="pt-1">
                            {EVENT_ICONS[event.type as keyof typeof EVENT_ICONS]}
                        </div>
                        <p style={FONT_STYLE}>{event.message}</p>
                    </div>
                ))}

                {events.length === 0 && (
                    <p className="text-center text-amber-300/60" style={FONT_STYLE}>
                        La historia aún no ha sido escrita...
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

const DungeonMasterPanel: React.FC = () => {
    const { nextTurn, rollInitiative, addEvent } = useGameStore();

    const actions = [
        {
            label: 'Lanzar Iniciativa',
            icon: <Dice6 className="mr-2" />,
            onClick: rollInitiative,
            className: 'bg-purple-800 hover:bg-purple-700 border-purple-900'
        },
        {
            label: 'Siguiente Turno',
            icon: <Zap className="mr-2" />,
            onClick: nextTurn,
            className: 'bg-blue-800 hover:bg-blue-700 border-blue-900'
        },
        {
            label: 'Generar Combate',
            icon: <Skull className="mr-2" />,
            onClick: () => addEvent('Las sombras danzan... ¡Criaturas emergen del abismo!', 'combat'),
            className: 'bg-red-800 hover:bg-red-700 border-red-900'
        },
        {
            label: 'Generar Narrativa',
            icon: <ScrollText className="mr-2" />,
            onClick: () => addEvent('Una brisa sobrenatural susurra secretos de héroes caídos.', 'narrative'),
            className: 'bg-green-800 hover:bg-green-700 border-green-900'
        }
    ];

    return (
        <Card className="col-span-full bg-stone-900/80 border-4 border-amber-800 text-amber-100 shadow-2xl">
            <CardHeader className="text-center p-4 border-b-4 border-amber-800">
                <CardTitle className="text-4xl flex items-center justify-center gap-4" style={FONT_STYLE}>
                    <Castle /> Trono del Dungeon Master <Crown />
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            onClick={action.onClick}
                            className={`text-lg p-6 border-2 ${action.className}`}
                            style={FONT_STYLE}
                        >
                            {action.icon} {action.label}
                        </Button>
                    ))}
                </div>

                <div className="pt-4 border-t-2 border-amber-900/50">
                    <h3 className="text-2xl text-center mb-4" style={FONT_STYLE}>
                        Reclutar Compañía
                    </h3>
                    <AddPlayerForm />
                </div>
            </CardContent>
        </Card>
    );
};

export default function DungeonMasterComponent() {
    const players = useGameStore(state => state.players);

    useEffect(() => {
        if (players.length === 0) {
            useGameStore.getState().addPlayer("Sir Gideon");
        }
    }, [players.length]);

    return (
        <div
            className="p-4 md:p-8 min-h-screen bg-stone-800"
            style={{ '--font-medieval': "'MedievalSharp', cursive" } as React.CSSProperties}
        >
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna de Jugadores */}
                <div className="lg:col-span-2 space-y-6">
                    <DungeonMasterPanel />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {players.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                </div>

                {/* Columna del Códice */}
                <div className="lg:col-span-1">
                    <EventLog />
                </div>
            </main>
        </div>
    );
}