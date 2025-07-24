import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Sword,
    Shield, Eye, Brain, BookOpen, Smile, Crown, Zap, Heart,
    ScrollText, Star, Wand2, Axe, Skull, Sparkles, Dices, Target, ShieldCheck, Hand,
    BadgeDollarSign, Clock, Crosshair
} from 'lucide-react';
import { DiceRoller } from '../Dices/DiceRoller';
import type { Attributes, GameEvent, Player } from '@/Interfaces/Rooms';
import { useGameStore } from '@/store/useGameStore';

const FONT_STYLE = { fontFamily: "'MedievalSharp', cursive" };

const HPBar: React.FC<{ current: number; max: number }> = ({ current, max }) => {
    const percentage = max > 0 ? (current / max) * 100 : 0;
    const healthColor = percentage > 60 ? 'bg-green-500' : percentage > 30 ? 'bg-yellow-500' : 'bg-red-600';
    return (
        <div>
            <div className="flex justify-between items-center mb-1 text-amber-900" style={FONT_STYLE}>
                <span className="font-bold text-sm flex items-center gap-2"><Heart /> Vitalidad</span>
                <span className="font-black text-lg">{current} / {max}</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full border-2 border-stone-900 shadow-inner h-6">
                <div className={`h-full rounded-full transition-all duration-500 flex items-center justify-end ${healthColor}`} style={{ width: `${percentage}%` }}>
                    <div className="w-2 h-2 rounded-full bg-white/50 mr-2 blur-sm"></div>
                </div>
            </div>
        </div>
    );
};

const getClassTheme = (playerClass: string) => {
    const themes: Record<string, { color: string, icon: React.ReactNode }> = {
        'Guerrero': { color: 'bg-red-700', icon: <Sword /> }, 'Mago': { color: 'bg-blue-700', icon: <Wand2 /> }, 'Pícaro': { color: 'bg-gray-700', icon: <Eye /> }, 'Clérigo': { color: 'bg-yellow-500', icon: <Star /> }, 'Paladín': { color: 'bg-amber-500', icon: <Shield /> }, 'Bárbaro': { color: 'bg-orange-700', icon: <Axe /> }, 'Explorador': { color: 'bg-green-700', icon: <Crosshair /> }, 'Bardo': { color: 'bg-purple-700', icon: <Smile /> },
    };
    return themes[playerClass] || { color: 'bg-stone-700', icon: <Sword /> };
};

const EventLog: React.FC = () => {
    const events = useGameStore(state => state.events);
    const logRef = useRef<HTMLDivElement>(null);
    useEffect(() => { logRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }, [events]);
    const getEventIcon = (type: GameEvent['type']) => {
        switch (type) {
            case 'combat': return <Sword className="text-red-400" />; case 'narrative': return <BookOpen className="text-blue-300" />; case 'loot': return <Star className="text-yellow-300" />; case 'system': return <Zap className="text-purple-300" />; default: return null;
        }
    }
    return (
        <Card className="bg-stone-900/80 border-4 border-amber-800 text-amber-100 flex flex-col h-full">
            <CardHeader className="border-b-4 border-amber-800 p-3">
                <CardTitle className="flex items-center gap-3 text-2xl" style={FONT_STYLE}><ScrollText /> Códice del Cronista</CardTitle>
            </CardHeader>
            <CardContent ref={logRef} className="p-4 space-y-3 overflow-y-auto flex-grow">
                {events.map(event => (
                    <div key={event.id} className="flex gap-3 text-lg border-b border-amber-900/50 pb-2 animate-fadeIn">
                        <div className="pt-1">{getEventIcon(event.type as GameEvent['type'])}</div>
                        <p style={FONT_STYLE}>{event.message}</p>
                    </div>
                ))}
                {events.length === 0 && <p className="text-center text-amber-300/60" style={FONT_STYLE}>La historia aún no ha sido escrita...</p>}
            </CardContent>
        </Card>
    );
}

const PlayerCharacterSheet: React.FC<{ player: Player }> = ({ player }) => {
    const [show, setShow] = useState(true);
    const theme = getClassTheme(player.class);
    const isDead = player.currentHP <= 0;

    setTimeout(() => {
        setShow(false);
    }, 5000);

    return (
        <Card className={`relative transition-all duration-500 bg-amber-100 border-8 border-amber-900 rounded-lg shadow-2xl ${isDead ? 'grayscale filter saturate-0' : ''}`}>
            {isDead && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
                    <div className="text-center">
                        <Skull className="w-24 h-24 text-white/80" />
                        <p className="text-4xl text-white font-black" style={FONT_STYLE}>HAS CAÍDO</p>
                    </div>
                </div>
            )}
            <CardHeader className={`p-4 ${theme.color} text-white flex flex-row justify-between items-center border-b-8 border-amber-900`}>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-black/20 rounded-full text-4xl">{theme.icon}</div>
                    <div>
                        <CardTitle className="text-5xl" style={FONT_STYLE}>{player.name}</CardTitle>
                        <p className="text-2xl -mt-2" style={FONT_STYLE}>{player.class}</p>
                    </div>
                </div>
                <Badge className="bg-stone-900 text-amber-200 text-2xl border-4 border-amber-400 p-3" style={FONT_STYLE}>
                    <Dices className="w-6 h-6 mr-2" /> Iniciativa: {player.initiative}
                </Badge>
            </CardHeader>

            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna Izquierda: Estadísticas y Salud */}
                <div className="space-y-6">
                    <div className="p-4 bg-amber-50/50 border-4 border-amber-800 rounded-lg">
                        <HPBar current={player.currentHP} max={player.maxHP} />
                    </div>
                    <div>
                        <h3 className="text-center text-xl mb-2 text-amber-900" style={FONT_STYLE}>Atributos del Héroe</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {(Object.keys(player.attributes) as Array<keyof Attributes>).map(key => {
                                const icons = { fuerza: <Sword />, destreza: <Eye />, constitucion: <Shield />, inteligencia: <Brain />, sabiduria: <BookOpen />, carisma: <Smile /> };
                                return (
                                    <div key={key} className="flex items-center gap-3 p-2 bg-amber-50/50 border-l-4 border-amber-800 rounded-r-lg">
                                        <div className="text-amber-900 text-2xl">{icons[key]}</div>
                                        <div>
                                            <div className="text-sm font-bold text-amber-900 uppercase" style={FONT_STYLE}>{key}</div>
                                            <div className="text-3xl font-black text-amber-800" style={FONT_STYLE}>{player.attributes[key]}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Equipo y Habilidades */}
                <div className="space-y-6">
                    <div className="p-4 bg-amber-50/50 border-4 border-amber-800 rounded-lg h-full">
                        <h3 className="text-center text-xl mb-4 text-amber-900" style={FONT_STYLE}>Equipo y Habilidades</h3>
                        <div className="space-y-3 text-lg text-amber-900" style={FONT_STYLE}>
                            <p className="flex items-center gap-2"><Sword /> Espada Larga +1</p>
                            <p className="flex items-center gap-2"><Shield /> Escudo de Roble</p>
                            <p className="flex items-center gap-2"><BadgeDollarSign /> Mochila de Aventurero</p>
                            <p className="flex items-center gap-2 pt-4 border-t-2 border-amber-800/50 mt-4"><Sparkles /> Habilidad: Ataque Poderoso</p>
                            <p className="flex items-center gap-2"><ShieldCheck /> Habilidad: Segundo Aliento</p>
                        </div>
                    </div>
                </div>
            </CardContent>
            {show && player.isActive && !isDead && (
                <div className="absolute top-0 right-0 p-4 animate-pulse">
                    <Crown className="w-16 h-16 text-yellow-400 drop-shadow-lg" />
                    <p className="text-center text-yellow-500 font-black" style={FONT_STYLE}>¡ES TU TURNO!</p>
                </div>
            )}
        </Card>
    );
};

const PlayerActions: React.FC<{ player: Player }> = ({ player }) => {
    const { addEvent } = useGameStore();
    const isDisabled = !player.isActive || player.currentHP <= 0;

    // Estados para controlar el DiceRoller
    const [showDiceRoller, setShowDiceRoller] = useState(false);
    const [diceConfig, setDiceConfig] = useState({ sides: 20 });
    const [pendingAction, setPendingAction] = useState<string>('');

    // Estados para el contador de tiempo
    const [timeLeft, setTimeLeft] = useState(30); // 30 segundos por turno
    const [isTimerActive, setIsTimerActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Efecto para inicializar el timer cuando sea el turno del jugador
    useEffect(() => {
        if (player.isActive && player.currentHP > 0 && !showDiceRoller) {
            setTimeLeft(30);
            setIsTimerActive(true);
        } else {
            setIsTimerActive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [player.isActive, player.currentHP, showDiceRoller]);

    // Efecto para manejar el countdown del timer
    useEffect(() => {
        if (isTimerActive) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        // Tiempo agotado - tomar acción automática
                        addEvent(`${player.name} se queda sin tiempo y pierde su turno.`, 'system');
                        setIsTimerActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isTimerActive, player.name, addEvent]);

    const handleAction = (eventText: string, sides: number) => {
        // Detener el timer cuando se realiza una acción
        setIsTimerActive(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        setPendingAction(eventText);
        setDiceConfig({ sides });
        setShowDiceRoller(true);
    };

    // Efecto para agregar el evento después de que se muestre el dado
    useEffect(() => {
        if (showDiceRoller) {
            // Agregar el evento cuando se lance el dado
            addEvent(`${player.name} ${pendingAction}`, 'combat');

            // Ocultar el DiceRoller después de un tiempo (ajusta según la duración de tu animación)
            const timer = setTimeout(() => {
                setShowDiceRoller(false);
                setPendingAction('');
            }, 4500); // 2000ms del primer alert + 2000ms del segundo + 500ms buffer

            return () => clearTimeout(timer);
        }
    }, [showDiceRoller, pendingAction, player.name, addEvent]);

    // Determinar el color del timer basado en el tiempo restante
    const getTimerColor = () => {
        if (timeLeft > 20) return 'text-green-400';
        if (timeLeft > 10) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getTimerBgColor = () => {
        if (timeLeft > 20) return 'bg-green-800/20 border-green-600';
        if (timeLeft > 10) return 'bg-yellow-800/20 border-yellow-600';
        return 'bg-red-800/20 border-red-600';
    };

    return (
        <>
            <Card className="bg-stone-900/80 border-4 border-amber-800 text-amber-100 shadow-2xl">
                <CardHeader className="text-center p-3 border-b-4 border-amber-800">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-3xl" style={FONT_STYLE}>Acciones del Héroe</CardTitle>
                        
                        {/* Contador de tiempo - solo aparece si es tu turno */}
                        {isTimerActive && player.isActive && !showDiceRoller && (
                            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border-2 ${getTimerBgColor()}`}>
                                <Clock className={`w-6 h-6 ${getTimerColor()} ${timeLeft <= 5 ? 'animate-pulse' : ''}`} />
                                <div className="text-center">
                                    <div className={`text-2xl font-black ${getTimerColor()}`} style={FONT_STYLE}>
                                        {timeLeft}s
                                    </div>
                                    <div className="text-xs text-gray-300" style={FONT_STYLE}>
                                        Tiempo restante
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                        disabled={isDisabled || showDiceRoller}
                        onClick={() => handleAction("ataca con furia a su enemigo!", 20)}
                        className="cursor-pointer h-24 text-lg bg-red-800 hover:bg-red-700 border-2 border-red-900 flex-col"
                        style={FONT_STYLE}
                    >
                        <Target className="w-8 h-8 mb-1" /> Atacar
                    </Button>
                    <Button
                        disabled={isDisabled || showDiceRoller}
                        onClick={() => handleAction("alza su escudo, preparándose para el impacto.", 20)}
                        className="cursor-pointer h-24 text-lg bg-blue-800 hover:bg-blue-700 border-2 border-blue-900 flex-col"
                        style={FONT_STYLE}
                    >
                        <ShieldCheck className="w-8 h-8 mb-1" /> Defender
                    </Button>
                    <Button
                        disabled={isDisabled || showDiceRoller}
                        onClick={() => handleAction("canaliza su poder interior para una habilidad especial.", 20)}
                        className="cursor-pointer h-24 text-lg bg-purple-800 hover:bg-purple-700 border-2 border-purple-900 flex-col"
                        style={FONT_STYLE}
                    >
                        <Sparkles className="w-8 h-8 mb-1" /> Habilidad
                    </Button>
                    <Button
                        disabled={isDisabled || showDiceRoller}
                        onClick={() => handleAction("busca en su mochila un objeto que le ayude.", 20)}
                        className="cursor-pointer h-24 text-lg bg-green-800 hover:bg-green-700 border-2 border-green-900 flex-col"
                        style={FONT_STYLE}
                    >
                        <Hand className="w-8 h-8 mb-1" /> Usar Objeto
                    </Button>
                </CardContent>
            </Card>

            {/* Renderizar DiceRoller como componente cuando sea necesario */}
            {showDiceRoller && <DiceRoller sides={diceConfig.sides} />}
        </>
    );
};

export default function PlayerUI() {
    const { players, activePlayerId, setActivePlayer } = useGameStore();
    const [hasSelectedCharacter, setHasSelectedCharacter] = useState(false);
    const [showCharacterSelect, setShowCharacterSelect] = useState(false);


    useEffect(() => {
        if (players.length === 0) {
            useGameStore.getState().addPlayer("Sir Gideon");
            useGameStore.getState().addPlayer("Lyra la Hechicera");
        }
        if (players.length > 0 && !hasSelectedCharacter && !activePlayerId) {
            setShowCharacterSelect(true);
        }
    }, [players.length, hasSelectedCharacter, activePlayerId]);

    const activePlayer = players.find(p => p.id === activePlayerId);

    if (players.length === 0) {
        return <div className="p-8 text-white text-center" style={FONT_STYLE}>Esperando que los héroes se unan a la leyenda...</div>
    }
    const handleCharacterSelected = (playerId: string) => {
        setActivePlayer(playerId);
        setHasSelectedCharacter(true);
        setShowCharacterSelect(false);
    };

    return (
        <div className="p-4 md:p-8 min-h-screen bg-stone-800" style={{ '--font-medieval': "'MedievalSharp', cursive" } as React.CSSProperties}>

            {/* Modal de selección de personaje para primera vez */}
            {showCharacterSelect && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <Card className="bg-amber-100 border-8 border-amber-900 p-6 max-w-md w-full mx-4">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl text-amber-900" style={FONT_STYLE}>
                                ¡Elige tu Héroe!
                            </CardTitle>
                            <p className="text-amber-700" style={FONT_STYLE}>
                                Selecciona el personaje que encarnarás en esta aventura
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {players.map(p => (
                                <Button
                                    key={p.id}
                                    onClick={() => handleCharacterSelected(p.id)}
                                    className="w-full h-16 text-lg bg-amber-800 hover:bg-amber-700 text-amber-100 border-2 border-amber-900"
                                    style={FONT_STYLE}
                                >
                                    <div className="flex items-center gap-3">
                                        {getClassTheme(p.class).icon}
                                        <div className="text-left">
                                            <div className="font-bold">{p.name}</div>
                                            <div className="text-sm opacity-80">{p.class}</div>
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            )}
            {/* Resto del contenido igual */}
            {activePlayer ? (
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <PlayerCharacterSheet player={activePlayer} />
                        <PlayerActions player={activePlayer} />
                    </div>
                    <div className="lg:col-span-1">
                        <EventLog />
                    </div>
                </main>
            ) : hasSelectedCharacter ? (
                <div className="p-8 text-white text-center text-2xl" style={FONT_STYLE}>Selecciona un héroe para comenzar tu aventura.</div>
            ) : null}
        </div>
    );

}