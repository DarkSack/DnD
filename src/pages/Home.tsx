import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a DnD App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/characters" className="p-6 bg-card rounded-lg hover:bg-card/90 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Personajes</h2>
          <p>Administra tus personajes de D&D</p>
        </Link>
        <Link to="/campaigns" className="p-6 bg-card rounded-lg hover:bg-card/90 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Campañas</h2>
          <p>Gestiona tus campañas de juego</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
