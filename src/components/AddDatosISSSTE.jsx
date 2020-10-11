import React, { useState } from "react";

import { TextField, IconButton } from "@material-ui/core";

function AddDatosISSSTE(props) {
  const [bitacora, setBitacora] = useState(props.bitacora);
  const [hrsReales, setHrsReales] = useState(props.hrsReales);
  const [vidaUtil, setVidaUtil] = useState(props.vidaUtil);
  const [ubicacion, setUbicacion] = useState(props.ubicacion);
  const [recomendaciones, setRecomendaciones] = useState(props.recomendaciones);
  const [conclusiones, setConclusiones] = useState(props.conclusiones);
  const [fotoAntes1, setFotoAntes1] = useState(props.fotoAntes1);
  const [fotoAntes2, setFotoAntes2] = useState(props.fotoAntes2);
  const [fotoDurante1, setFotoDurante1] = useState(props.fotoDurante1);
  const [fotoDurante2, setFotoDurante2] = useState(props.fotoDurante2);

  const subirFotoAntes1 = (e) => {
    if (e !== null) {
      let photo = new Image();
      photo.src = URL.createObjectURL(e.target.files[0]);
      setFotoAntes1(photo.src);
      props.changeFotoAntes1(photo.src);
      // URL.revokeObjectURL(photo.src);
    } else {
      setFotoAntes1(e);
      props.changeFotoAntes1(e);
    }
  };

  const subirFotoAntes2 = (e) => {
    if (e !== null) {
      let photo = new Image();
      photo.src = URL.createObjectURL(e.target.files[0]);
      setFotoAntes2(photo.src);
      props.changeFotoAntes2(photo.src);
      // URL.revokeObjectURL(photo.src);
    } else {
      setFotoAntes2(e);
      props.changeFotoAntes2(e);
    }
  };

  const subirFotoDurante1 = (e) => {
    if (e !== null) {
      let photo = new Image();
      photo.src = URL.createObjectURL(e.target.files[0]);
      setFotoDurante1(photo.src);
      props.changeFotoDurante1(photo.src);
      // URL.revokeObjectURL(photo.src);
    } else {
      setFotoDurante1(e);
      props.changeFotoDurante1(e);
    }
  };
  const subirFotoDurante2 = (e) => {
    if (e !== null) {
      let photo = new Image();
      photo.src = URL.createObjectURL(e.target.files[0]);
      setFotoDurante2(photo.src);
      props.changeFotoDurante2(photo.src);
      // URL.revokeObjectURL(photo.src);
    } else {
      setFotoDurante2(e);
      props.changeFotoDurante2(e);
    }
  };

  return (
    <div className="views ISSSTE">
      <h3>Datos ISSSTE</h3>
      <div className="tresFr">
        <TextField
          label="N° Bitacora"
          fullWidth
          variant="outlined"
          type="tel"
          inputProps={{
            maxLength: 8,
          }}
          size="small"
          value={bitacora}
          onChange={(e) => {
            setBitacora(e.target.value);
            props.changeBitacora(e.target.value);
          }}
        />
        <TextField
          label="Hrs reales"
          fullWidth
          variant="outlined"
          type="tel"
          inputProps={{
            maxLength: 2,
          }}
          size="small"
          value={hrsReales}
          onChange={(e) => {
            setHrsReales(e.target.value);
            props.changeHrsReales(e.target.value);
          }}
        />
        <TextField
          label="Vida útil"
          fullWidth
          variant="outlined"
          type="tel"
          inputProps={{
            maxLength: 2,
          }}
          size="small"
          value={vidaUtil}
          onChange={(e) => {
            setVidaUtil(e.target.value);
            props.changeVidaUtil(e.target.value);
          }}
        />
      </div>
      <TextField
        label="Ubicación"
        fullWidth
        variant="outlined"
        size="small"
        type="text"
        value={ubicacion}
        onChange={(e) => {
          setUbicacion(e.target.value);
          props.changeUbicacion(e.target.value);
        }}
      />
      <TextField
        label="Recomendaciones"
        fullWidth
        multiline
        rows={2}
        value={recomendaciones}
        variant="outlined"
        onChange={(e) => {
          setRecomendaciones(e.target.value);
          props.changeRecomendaciones(e.target.value);
        }}
      />
      <TextField
        label="Conclusiones"
        fullWidth
        multiline
        rows={2}
        value={conclusiones}
        variant="outlined"
        onChange={(e) => {
          setConclusiones(e.target.value);
          props.changeConclusiones(e.target.value);
        }}
      />
      <div className="row">
        {fotoAntes1 ? (
          <div className="cell">
            <b className="btnDelete" onClick={() => subirFotoAntes1(null)}>
              X
            </b>
            <img width="150" height="100" src={fotoAntes1} alt="antes1" />
          </div>
        ) : (
          <div className="cell">
            <input
              accept="image/*"
              className="inputPhoto"
              id="antes1"
              onChange={(e) => {
                subirFotoAntes1(e);
              }}
              type="file"
            />
            <label htmlFor="antes1">
              Foto Normal
              <IconButton color="primary" component="span">
                <span className="material-icons">add_a_photo</span>
              </IconButton>
            </label>
          </div>
        )}
        {fotoAntes2 ? (
          <div className="cell">
            <b className="btnDelete" onClick={() => subirFotoAntes2(null)}>
              X
            </b>
            <img width="150" height="100" src={fotoAntes2} alt="antes2" />
          </div>
        ) : (
          <div className="cell">
            <input
              accept="image/*"
              className="inputPhoto"
              id="antes2"
              onChange={(e) => {
                subirFotoAntes2(e);
              }}
              type="file"
            />
            <label htmlFor="antes2">
              Placa N° de Serie
              <IconButton color="primary" component="span">
                <span className="material-icons">add_a_photo</span>
              </IconButton>
            </label>
          </div>
        )}
      </div>
      <div className="row">
        {fotoDurante1 ? (
          <div className="cell">
            <b className="btnDelete" onClick={() => subirFotoDurante1(null)}>
              X
            </b>
            <img width="150" height="100" src={fotoDurante1} alt="durante1" />
          </div>
        ) : (
          <div className="cell">
            <input
              accept="image/*"
              className="inputPhoto"
              id="durante1"
              onChange={(e) => {
                subirFotoDurante1(e);
              }}
              type="file"
            />
            <label htmlFor="durante1">
              Placa N° de Inventario
              <IconButton color="primary" component="span">
                <span className="material-icons">add_a_photo</span>
              </IconButton>
            </label>
          </div>
        )}
        {fotoDurante2 ? (
          <div className="cell">
            <b className="btnDelete" onClick={() => subirFotoDurante2(null)}>
              X
            </b>
            <img width="150" height="100" src={fotoDurante2} alt="durante2" />
          </div>
        ) : (
          <div className="cell">
            <input
              accept="image/*"
              className="inputPhoto"
              id="durante2"
              onChange={(e) => {
                subirFotoDurante2(e);
              }}
              type="file"
            />
            <label htmlFor="durante2">
              Foto panorámica del bien
              <IconButton color="primary" component="span">
                <span className="material-icons">add_a_photo</span>
              </IconButton>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddDatosISSSTE;
