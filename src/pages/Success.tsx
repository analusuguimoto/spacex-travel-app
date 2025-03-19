import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import skyNight from "../img/stars-night.jpeg"; 

interface FlightDetails {
  name: string;
  links: { patch: { small: string | null } };
}

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFlight, name, age, healthIssue } = location.state;
  const [flight, setFlight] = useState<FlightDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v4/launches/${selectedFlight}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setFlight(data)
      })
      .catch((error) => {
        console.error("Error fetching flight data:", error);
        setIsLoading(false);
      });
  }, [selectedFlight]);

  // tela de loading enquanto a requisição é feita
  if (isLoading) {
    return (
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${skyNight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-xl">Carregando sua reserva...</p>
        </div>
      </div>
    );
  }

  // tela de erro caso a requisição falhe
  if (!flight) {
    return (
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${skyNight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white text-center">
          <p className="text-xl">Ocorreu um erro ao carregar os dados da reserva.</p>
          <button
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  // tela de sucesso com os dados da reserva
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${skyNight})`,
        backgroundSize: "cover", 
        backgroundPosition: "center",
      }}
    >
      <button
        className="absolute top-6 left-6 text-white text-3xl hover:text-indigo-300 transition-colors cursor-pointer"
        onClick={() => navigate("/")}
        aria-label="Voltar para Home"
      >
        ←
      </button>
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Reserva Confirmada!</h1>
        <div className="p-6 rounded-lg text-center w-96 w-full max-w-md">
          {flight.links.patch.small && (
            <img
              src={flight.links.patch.small}
              alt={flight.name}
              className="mx-auto mb-4"
            />
          )}
          <h2 className="text-xl font-semibold">{flight.name}</h2>
          <p><span className="font-bold">Passageiro:</span> {name}</p>
          <p><span className="font-bold">Idade:</span> {age}</p>
          <p><span className="font-bold">Problemas de Saúde:</span> {healthIssue === "yes" ? "Sim" : "Não"}</p>
        </div>
        <button
          className="mt-4 p-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default Success;
