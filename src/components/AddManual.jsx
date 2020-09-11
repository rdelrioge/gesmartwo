import React, { useState, useEffect } from "react";
import { TextField, Drawer } from "@material-ui/core";
function AddManual(props) {
  const [equipo, setEquipo] = useState(props.equipo);
  const [cliente, setCliente] = useState("");
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    setEquipo(props.equipo);
    console.log(props.equipo);
  }, [props]);

  const handleClose = () => {
    props.onClose({ cliente, hospital });
  };

  return (
    <Drawer anchor="bottom" open={props.open} onClose={handleClose}>
      <h3 onClick={handleClose}>Hola soy un drawer</h3>
      <TextField
        label="Cliente"
        required
        color="secondary"
        variant="outlined"
        size="small"
        placeholder="IMSS, ISSSTE"
        inputProps={{
          maxLength: 20,
        }}
        type="text"
        onChange={(ev) => setCliente(ev.target.value)}
        value={cliente}
      />
      <TextField
        label="Hospital"
        required
        color="secondary"
        variant="outlined"
        size="small"
        inputProps={{
          maxLength: 20,
        }}
        type="text"
        onChange={(ev) => setHospital(ev.target.value)}
        value={hospital}
      />
    </Drawer>
  );
}

export default AddManual;
