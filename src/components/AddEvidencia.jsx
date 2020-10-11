import React, { useState } from "react";

import { IconButton } from "@material-ui/core";

function AddEvidencia(props) {
  const cliente = props.cliente;
  const [fotoAntes1, setFotoAntes1] = useState(props.fotoAntes1);
  const [fotoAntes2, setFotoAntes2] = useState(props.fotoAntes2);
  const [fotoDurante1, setFotoDurante1] = useState(props.fotoDurante1);
  const [fotoDurante2, setFotoDurante2] = useState(props.fotoDurante2);
  const [fotoDespues1, setFotoDespues1] = useState(props.fotoDespues1);
  const [fotoDespues2, setFotoDespues2] = useState(props.fotoDespues2);

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
  const subirFotoDespues1 = (e) => {
    if (e !== null) {
      let photo = new Image();
      photo.src = URL.createObjectURL(e.target.files[0]);
      setFotoDespues1(photo.src);
      props.changeFotoDespues1(photo.src);
      // URL.revokeObjectURL(photo.src);
    } else {
      setFotoDespues1(e);
      props.changeFotoDespues1(e);
    }
  };
  const subirFotoDespues2 = (e) => {
    if (e !== null) {
      let photo = new Image();
      photo.src = URL.createObjectURL(e.target.files[0]);
      setFotoDespues2(photo.src);
      props.changeFotoDespues2(photo.src);
      // URL.revokeObjectURL(photo.src);
    } else {
      setFotoDespues2(e);
      props.changeFotoDespues2(e);
    }
  };

  return (
    <div className="views IMSS">
      {cliente === "IMSS" ? <h3>Evidencia IMSS</h3> : <b></b>}
      <div className="row antes">
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
              onChange={(e) => subirFotoAntes1(e)}
              type="file"
            />
            <label htmlFor="antes1">
              Antes
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
              onChange={(e) => subirFotoAntes2(e)}
              type="file"
            />
            <label htmlFor="antes2">
              Antes
              <IconButton color="primary" component="span">
                <span className="material-icons">add_a_photo</span>
              </IconButton>
            </label>
          </div>
        )}
      </div>
      <div className="row durante">
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
              onChange={(e) => subirFotoDurante1(e)}
              type="file"
            />
            <label htmlFor="durante1">
              Durante
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
              onChange={(e) => subirFotoDurante2(e)}
              type="file"
            />
            <label htmlFor="durante2">
              Durante
              <IconButton color="primary" component="span">
                <span className="material-icons">add_a_photo</span>
              </IconButton>
            </label>
          </div>
        )}
      </div>
      <div className="row despues">
        {fotoDespues1 ? (
          <div className="cell">
            <b className="btnDelete" onClick={() => subirFotoDespues1(null)}>
              X
            </b>
            <img width="150" height="100" src={fotoDespues1} alt="despues1" />
          </div>
        ) : (
          <div className="cell">
            <input
              accept="image/*"
              className="inputPhoto"
              id="despues1"
              onChange={(e) => subirFotoDespues1(e)}
              type="file"
            />
            <label htmlFor="despues1">
              Despues
              <IconButton color="primary" component="span">
                <span className="material-icons">add_a_photo</span>
              </IconButton>
            </label>
          </div>
        )}
        {fotoDespues2 ? (
          <div className="cell">
            <b className="btnDelete" onClick={() => subirFotoDespues2(null)}>
              X
            </b>
            <img width="150" height="100" src={fotoDespues2} alt="despues2" />
          </div>
        ) : (
          <div className="cell">
            <input
              accept="image/*"
              className="inputPhoto"
              id="despues2"
              onChange={(e) => subirFotoDespues2(e)}
              type="file"
            />
            <label htmlFor="despues2">
              Despues
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

export default AddEvidencia;
