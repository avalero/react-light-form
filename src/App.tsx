import React from "react";
import "./App.css";
import { Locations, UserDetails } from "./types";
import { FormExample } from "./components/FromExample";

function App() {
  const userData: UserDetails = {
    user: "Alberto",
    age: 30,
    location: {
      city: Locations.Madrid,
      address: "Av 7",
    },
  };

  return (
    <div className="App">
      <FormExample data={userData} />;
    </div>
  );
}

export default App;
