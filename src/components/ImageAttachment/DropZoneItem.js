import React from "react";

import styled from "styled-components";

export const StyledZoneItem = styled.div`
  text-align: center;
  background-color: #efebeb;
  height: 100%;
  width: 100%;
  border-radius: 5px;
`;
const DropZoneItem = () => {
  return (
    <StyledZoneItem>
      {" "}
      <div
        className="clear-dropzone"
        // onClick={() => dispatch(clearDropzone())}
      >
        ✕
      </div>
      <ul className="list-unstyled d-flex flex-row flex-wrap align-items-center">
        {/* {images.map(it => (
    <li key={it.name} className="card image-preview">
      <img src={it.preview} alt="preview" height="120" />
      <div className="size text-center">{it.size}</div>
    </li>
  ))} */}
      </ul>
    </StyledZoneItem>
  );
};

export default DropZoneItem;
