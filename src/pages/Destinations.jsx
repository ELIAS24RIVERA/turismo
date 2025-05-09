import { useState } from "react";
import DestinationCard from "../components/Card/DestinationCard";

export default function Destinations() {
  const [filter, setFilter] = useState("all");
  const destinations = useFetchDestinations();  // Custom Hook para API

  const filteredDestinations = destinations.filter((item) => 
    filter === "all" || item.category === filter
  );

  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Todos</option>
        <option value="beach">Playas</option>
        <option value="mountain">Montañas</option>
      </select>
      <div className="grid">
        {filteredDestinations.map((dest) => (
          <DestinationCard key={dest.id} {...dest} />
        ))}
      </div>
    </div>
  );
}