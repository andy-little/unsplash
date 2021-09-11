import React from 'react'
import { WiMoonAltThirdQuarter } from 'react-icons/wi'
import { useGlobalContext } from './context';

const Switch = () => {
    const {toggleTheme} = useGlobalContext();
    return (<>
            <label className="switch">
            <input type="checkbox" onClick={toggleTheme}/>
            <span className="slider"><div className="slide"><WiMoonAltThirdQuarter className="slider-icon"/></div></span>
            </label>
        </>
    );
}

export default Switch
