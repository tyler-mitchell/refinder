import * as React from "react";
import { PureComponent } from "react";
import { css } from "styled-components";

export default class Pin extends React.Component {
  render() {
    const { whenClicked } = this.props;
    return (
      <div
        className={css`
          height: 30px;
          width: 30px;
          opacity: 0.8;
          pointer-events: none;
        `}
      >
        <div
          className={css`
            pointer-events: stroke;
            max-width: 100%;
            max-height: 100%;
            position: relative;
            bottom: 100%;
            right: 50%;

            cursor: pointer;
          `}
          style={{
            filter:
              "drop-shadow(0px 0px -3px rgba(255, 255, 255, 1)) drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.5))",
          }}
        >
          <img
            src="https://i.imgur.com/oH2vpZE.png"
            className={css`
              max-width: 30px;
              max-height: 30px;
            `}
            width="30px"
            height="30px"
            alt="marker"
          />
        </div>
      </div>
    );
  }
}
