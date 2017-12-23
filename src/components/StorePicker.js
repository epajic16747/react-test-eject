import React from 'react'
import {Component} from 'react'
import {Fragment} from 'react'
import {getFunName} from '../helpers';


import { Redirect } from 'react-router';
class StorePicker extends Component {

    //Konstruktor se izvrsava kada se kreira komponentu
    constructor(){
        //Super kreira react komponentu koja se zatim prosiruje(extends) sa nekim custom svarima
        super();
        this.state = {
            redirect: false,
            storeId: ''
        }

        /*
        // I nacin vezivanja funkcije za komponetu
        this.goToStore = this.goToStore.bind(this); //(1) i (2) sada radi !! i this vise nije null
        */
    }

    goToStore(event){
        event.preventDefault(); //Inace se obavi re-render tako se ovaj event desi na kratko
        this.setState({ 
            redirect: true, 
            storeId : this.storeInput.value 
        });
        console.log("URL CHANGED");
       // console.log(this.storeInput); //Ovo ne radi (1)
       // console.log(this) // Ni ovo ne radi(2)
       //Razlog zbog koje (1) i (2) ne rade je taj sto je vrijednost this-a null ,tj. nije veza na nasu komponentu
       //U ES6 vezivanje(bind) se mora eksplicitno naglasiti

        
        

    }
    //Sve metode osim render nisu "prikacene" za komponentu, tako da se unutar render moze koristiti this
    //Ref unutar inputa koristimo da bi referenciramo objekat unutar nase klase
    //U konzoli sa $r.storeInput mozemo da pristupimo ovom elementu 
    render(){
        // II nacin vezivanja je unutar submita, tj. umjesto this.goToStore pisemo this.goToStore.bind(this)
        //III nacin (event) => this.goToStore(e)

        if(this.state.redirect) {
            const link = "/store/" + this.state.storeId;
            return <Redirect to={link}/>
        }
        return (
            
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                {/*Hello i ne moze biti prvi elemet, tj. moze ali se racuna kao element(moze preko fragmenta) */}
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name"
                        defaultValue={getFunName()}
                        ref={(input) =>{this.storeInput = input}}/>
                <button>Visit Store</button>
            </form>

          
            
        )
    }
    
}

export default StorePicker;