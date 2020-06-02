import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import "./workorder.scss";

function SkeletorWO() {
  return (
    <div className="workorder">
      <div className="rows skeletorRows">
        <div className="row1">
          <Skeleton variant="circle" />
          <Skeleton />

          <Skeleton />
        </div>
        <div className="row2">
          <Skeleton variant="rect" />
          <Skeleton variant="rect" />
        </div>
        <div className="row3">
          <Skeleton variant="rect" />
          <Skeleton variant="rect" />
        </div>
        <Skeleton />
        <Skeleton variant="rect" />
        <Skeleton variant="rect" />
        <Skeleton variant="rect" />
      </div>
    </div>
  );
}

export default SkeletorWO;
