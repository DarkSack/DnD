import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, BookOpen, Shield, Dice1, Sparkles } from "lucide-react";
import type { MenuItem, MenuCardProps } from "@/Interfaces/Home";
import { useAuthStore } from "@/store/authStore";

const menuItems: MenuItem[] = [
  {
    id: "characters",
    title: "Personajes",
    description: "Administra tus personajes de D&D",
    icon: User,
    path: "/characters",
    buttonText: "Ver Personajes",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "campaigns",
    title: "Campañas",
    description: "Gestiona tus campañas de juego",
    icon: BookOpen,
    path: "/campaigns",
    buttonText: "Ver Campañas",
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: "dices",
    title: "Dados",
    description: "Simulador de dados de D&D",
    icon: Dice1,
    path: "/dices",
    buttonText: "Tirar Dados",
    gradient: "from-red-500 to-pink-600",
  },
  {
    id: "inventory",
    title: "Inventario",
    description: "Gestiona tu equipo y objetos",
    icon: Shield,
    path: "/inventory",
    buttonText: "Ver Inventario",
    gradient: "from-yellow-500 to-orange-600",
  },
];
const MenuCard = ({ item }: MenuCardProps) => {
  const navigate = useNavigate();
  const IconComponent = item.icon;

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl">
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative p-8">
        {/* Icon with animated background */}
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Text content */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {item.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Button */}
        <Button
          className={`w-full bg-gradient-to-r ${item.gradient} hover:shadow-lg hover:shadow-current/25 border-0 text-white font-medium py-3 h-auto transition-all duration-300 group-hover:scale-105`}
          onClick={() => {
            navigate(item.path);
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <span>{item.buttonText}</span>
            <Sparkles className="w-4 h-4 opacity-80" />
          </span>
        </Button>
      </div>
    </Card>
  );
};

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && window.location.pathname !== "/auth") navigate("/auth");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 pt-16 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg mb-8">
              <Dice1 className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-slate-100 dark:via-purple-300 dark:to-slate-100 bg-clip-text text-transparent mb-6">
              Tablero de Aventuras
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed">
              Tu centro de comando para todas las aventuras de D&D
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-500">
              <Sparkles className="w-4 h-4" />
              <span>Gestiona personajes, campañas y más</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {menuItems.map((item) => (
            <MenuCard item={item} key={item.id} />
          ))}
        </div>
      </div>

      {/* Footer decoration */}
      <div className="text-center pb-8">
        <div className="inline-flex items-center gap-2 text-sm text-slate-400 dark:text-slate-600">
          <span>¡Que comience la aventura!</span>
          <Dice1 className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Home;
