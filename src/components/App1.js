import React from 'react'
import {Component} from 'react'
import {Fragment} from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import {base} from '../base';
import PropTypes from 'prop-types';
import sample_fishes from '../sample-fishes.js'

class App1 extends Component {

    //Inicijalizacija
    //{} empty object
    //[] empty array
    constructor(){
        super();

        //Povezujemo metodu addFish sa objektom

        this.addFish = this.addFish.bind(this);
       // this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);

        this.removeFromOrder = this.removeFromOrder.bind(this);
        //getinitialState ES5
        this.state = {
            fishes: {},
            order: {} 
        }
        
    }

    //Moze i ovako za inicijalno stanje :
    /*
    state = {
        fishes: {},
        order: {} 
    };
    */
    //Kada se ova kompoenta prvi put renderuje 
    //Poziva se componentWillMount i vrsi se sinhronizacija za firabase bazom, tj. uzima se odredjena prodavnca i pohranjuju stanja
    
    componentWillMount(){
        const url = this.props.match.params.storeId + "/fishes";
        
        this.ref = base.syncState(url,
        {
            context : this,
            state : 'fishes'
        });


        //Ovdje trebamo da povucemo podatke za order sa localstorage-a
        const keyVal = "order-" + this.props.match.params.storeId;
        const localstorageRef = localStorage.getItem(keyVal);


        //Moze se desiti da nema nista u localstorage-u
        if(localstorageRef){
            this.setState({
                order : JSON.parse(localstorageRef)
            });
        }
        //Medjutim ovo je bolje raditi sa shouldComponentUpdate!! zato sto imamo 2 rendera 
    }   
    //Ako odemo u drugu radnju potrebno je prekinuti sync sa prethodnom 
    //Da ne bi pravili opterecenje
    componentWillUnmount(){
        base.removeBinding(this.ref);
    } 
      //Narudzbu cemo rijesiti preko local storage-a uz pomoc life cycle metoda componentWillUpdate
    //Ona okidana se komponenti prosljede novi parametri ili novo stanje
    //Prima 2 parametra novi atributi(params, parametri, nextProps) i novo stanje(nextState)  
    componentWillUpdate(nextProps, nextState){
        /*
        console.log("state of props changed");
        console.log({nextProps, nextState});*/
        const keyVal = "order-" + this.props.match.params.storeId;

        //Ovo ovako ne radi jer localStorage ne prima objekat, ali moze string tako da cemo objekat pretvoriti u JSON
        //localStorage.setItem(keyVal,nextState.order);
        localStorage.setItem(keyVal,JSON.stringify(nextState.order));
    }

    addFish(fish){
        //1) Update state
        const fishes = {...this.state.fishes};  //Spread operator uzima sve ribe iz objekta fishes

        //1.1) Add new fish
        const timestamp = Date.now();
        var naziv= "fish-" + timestamp;
        fishes[naziv] = fish;

        //2) Set state

        this.setState({
            fishes: fishes   //Alternativno samo fishes
        })
    }
    updateFish(key, updatedFish){
        //Uzimamo staru kopiju
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({
            fishes
        })
        
    }

    removeFish(key, fish) {
        const fishes = {...this.state.fishes};

        //Ne moze zbog firebase-a
        //delete fishes[key]

        fishes[key] =null;
        this.setState({fishes});
    }

    //1) Nacin pisanja funkcije(potrebno je pri pozivu napravi poziv kao this.loadSample.bind(this) ili u konstruktoru this.loadSample = this.loadSamples.bind(this)
    /*
    loadSamples(){
        this.setState({fishes : sample_fishes});
    }*/
    //2)Nacin property initializer
    //Arrow function veze sa roditeljem, tj. ovom slucaju komponentom
    loadSamples =(/*Parametri*/) => {
        this.setState({fishes : sample_fishes});
        };  //tacka zarez treba 
    addToOrder(key){
        //Uzeti kopiju stanja
        const order = {...this.state.order};

        //Update order
        order[key] = order[key] + 1 || 1;

        //Update state
        this.setState({order})
    }

    removeFromOrder(key){
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});

    }
    render(){
        return (
         
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                     {
                         Object
                         .keys(this.state.fishes)
                         .map(key => <Fish key={key} index = {key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                     }
             
                    </ul>
                </div>

                <Order fishes={this.state.fishes} order ={this.state.order} params = {this.props.match.params} removeFromOrder={this.removeFromOrder}/>
                {/*Poziv metode unutar child komponente */}
                {/*U principu child komponenti prosljedjujemo funkciju parent komponente*/}
                <Inventory 
                    addFish = {this.addFish} 
                    loadSamples = {this.loadSamples} 
                    fishes = {this.state.fishes} 
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    storeId = {this.props.match.params.storeId}/>

            </div>
          
            
        )
    }
    
}
App1.propType = {
    params: PropTypes.object.isRequrired
}
export default App1;

