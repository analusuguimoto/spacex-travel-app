import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import skyNight from "../img/stars-night.jpeg"; 

interface Launch {
  id: string;
  name: string;
}

const Home = () => {
  const [flights, setFlights] = useState<Launch[]>([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [healthIssue, setHealthIssue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/upcoming")
      .then((res) => res.json())
      .then((data) => {
        const upcomingFlights = data.map((flight: { id: string; name: string }) => ({
          id: flight.id,
          name: flight.name,
        }));
        setFlights(upcomingFlights);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!healthIssue) {
      setError("Por favor, selecione uma opção.");
      return;
     }
    navigate("/success", {
      state: { selectedFlight, name, age, healthIssue },
    });
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${skyNight})`,
        backgroundSize: "cover", 
        backgroundPosition: "center",
      }}
    >
      {/* Tela inicial */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center relative">
        <div className="absolute inset-0" />
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">A aventura está para começar</h1>
          <p className="text-lg md:text-2xl mt-4">
            O céu nunca esteve tão próximo. Embarque nessa jornada com a gente.
          </p>
          <button
            className="cursor-pointer mt-6 px-6 py-3 bg-indigo-500 text-white rounded-lg text-lg transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 hover:text-white"
            onClick={() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Reserve seu ticket
          </button>
        </div>
      </div>

     {/* Início do Formulário */}
      <div id="booking-form" className="min-h-screen flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20 w-full max-w-md">
          <h2 className="text-3xl font-bold text-white">Reserve sua Viagem Espacial 🌍</h2>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4">
            <label className="block text-white mt-4 mb-1">Selecione um voo:</label>
            <select
              className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={selectedFlight}
              onChange={(e) => setSelectedFlight(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {flights.map((flight) => (
                <option key={flight.id} value={flight.id}>
                  {flight.name}
                </option>
              ))}
            </select>

            <label className="block text-white mt-6 mb-1">Nome completo:</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="block text-white mt-6 mb-1">Idade:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <label className="block text-white mt-6">Possui algum problema de saúde?</label>
            <div className="flex gap-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  value="yes"
                  checked={healthIssue === "yes"}
                  onChange={() => {
                    setError("");
                    setHealthIssue("yes");
                  }}
                  className="mr-2"
                />{" "}
                Sim
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  value="no"
                  checked={healthIssue === "no"}
                  onChange={() => {
                    setError("");
                    setHealthIssue("no");
                  }}
                  className="mr-2"
                />{" "}
                Não
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-1 mb-6">{error}</p>}

            <button
              type="submit"
              className="mt-6 cursor-pointer w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Comprar Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;