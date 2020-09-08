import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";

import axios from "axios";

function App() {
  // Definir State
  const [busquedaLetra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState("");
  const [artista, setArtista] = useState("");

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([axios(url), axios(url2)]);
      setLetra(letra.data.lyrics);
      setArtista(informacion.data.artists[0].strBiographyES);
      // setLetra(resultado.data.lyrics);
    };
    consultarApiLetra();
  }, [busquedaLetra]);
  return (
    <>
      <Formulario setBusquedaLetra={setBusquedaLetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
