import React, { useState } from 'react'
import Login from "./Login";
import Register from "./Register";


export default function Model(props) {

    const [addLogin, setLogin] = useState(true)

    const showModel = () => {
       if (props.showModel) {
           return "block"
       } else {
           return "none"
       }
    }
    let showModelCss = showModel()

    const addSetLogin = (props) => {
        props.setShowModel(false)
        setLogin(true)
     }


    return (
        <div style={{ display: showModelCss }} className="model" >
            <div className="model-content">
                <div className="closeBtn" onClick={() => addSetLogin(props) }>
                    X
                </div>
                { addLogin ? ( <Login setLogin={ setLogin } readStore={props.readStore} setShowModel={props.setShowModel} /> ) : ( <Register readStore={props.readStore} setLogin={ setLogin } setShowModel={props.setShowModel} /> ) }
            </div>
        </div>
    )
}
