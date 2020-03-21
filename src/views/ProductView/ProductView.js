import React from 'react'
import { Toolbar, CssBaseline } from '@material-ui/core'
import MaterialMap from 'components/Map';



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
            
            <MaterialMap />
        </div>
        </>
    )
}

export default ProductView