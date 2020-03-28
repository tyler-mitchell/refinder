import React from "react";
import { Toolbar, CssBaseline } from "@material-ui/core";
import MaterialMap from "components/Map";
import ChatWindow from "components/Chat";

const ProductView = () => {
  return (
    <>
      <div>
        {/* <img 
                src={require(`./wood1.jpg`)}
                alt="woodSomething"
                width="40"
                height="40"
                align="left"
            /> */}
      </div>

      <div>
        <ChatWindow />
        {/* <MaterialMap /> */}
      </div>
    </>
  );
};

export default ProductView;
