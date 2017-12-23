import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';

//Kako ovaj Header ima samo render funkciju i ne trebaju na ostale tj. ne treba nam prava snaga react komponente 
//Mozemo je napiseti kao stateless komponentu(funkciju)
//Ne treba na this kada pristupamo parametrima


const Header = (props) =>{

        return(
            <header className="top">
               <h1>
                   Catch
                   <span className="ofThe">
                       <span className="of">of</span>
                       <span className="the">the</span>
                    </span> 
                   Day
                </h1>
               {/*"tagline je props, tj. parametar za komponentu"*/}
               <h3 className="tagline"><span>{props.tagline}</span></h3>
            </header>
        )
    
}

Header.propTypes = {
    //specificiramo tip koji treba da ima(kod nas string), a sa isRequired kazemo da prop mora biti prosljedjen komponenti
    tagline: PropTypes.string.isRequired
}

export default Header;
