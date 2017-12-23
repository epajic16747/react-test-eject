import React from 'react';
import {Component} from 'react';
import AddFishForm from './AddFishForm';
import {Fragment} from 'react'
import PropTypes from 'prop-types'
import {app, base, facebookProvider, githubProvider, twitterProvider} from '../base';


class Inventory extends Component{
    constructor(){
        super();
        this.renderInvetory = this.renderInvetory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);

 

        this.state = {
            uid: null,
            owner: null
        }
    }
    //Da nam se ne bi pojavljivao login svaki put kada opalimo F5 koristit cemo componentDidMount metodu

    componentDidMount(){
        app.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              this.setState({
                uid : user.uid
   
            })
              // ...
            } else {
              // User is signed out.
              // ...
            }
          }.bind(this));
        
    }
    handleChange(e,key){
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish,
            [e.target.name] : [e.target.value] 
        }
        this.props.updateFish(key, updatedFish);

    }
    renderInvetory(key){
        const fish = this.props.fishes[key];
        return(
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e,key)}/>
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e,key)}/>
                <select type="text" name="status" value={fish.status[0]}placeholder="Fish status" onChange={(e) => this.handleChange(e,key)} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e,key)}> </textarea>
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e,key)}/>      
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>                                                          
            </div>
        )
    }
    authenticate(provider){
        const log_login = "Trying to connect to " + provider;
        console.log(log_login);

        var auth_provider = null;

        if(provider === "facebook") {
            
            auth_provider = facebookProvider;
        }
        else if(provider === "github"){

            auth_provider = githubProvider;
        }
        else if(provider === "twitter"){

            auth_provider = twitterProvider;       
        }
      
    
        
        //this.props ne radi unutar sljedece funkcije tako cemo korisiti bind funkciju(moguce je i preko stanje)
        app.auth().signInWithPopup(auth_provider).then(function(result) {
            // For accessing the Twitter API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            //Uzimamo iz baze podatke o porodavnici 
            
            var storeRef = app.database().ref(this.props.storeId);
            storeRef.once('value', (snapshot) =>{
                const data = snapshot.val() || {};
                console.log(data);
                
                if(!data.owner){
                    storeRef.set({
                        owner: user.uid
                    })
                }

                this.setState({
                    uid : user.uid,
                    owner : data.owner || user.uid
                })
            })
            console.log(result);
          }.bind(this)).catch(function(error){
                console.log(error);
                return <h1>Jebo li te babo</h1>;
          });
       
    }
    logout(){
        app.auth().signOut();
        this.setState({
            uid : null
        })
    }

    renderLogin(){
        return(
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's invetory</p>
                <button className="github" onClick={(e) =>this.authenticate('github')}>Login with GitHub</button>
                <button className="facebook" onClick={(e) => this.authenticate('facebook')}>Login with Facebook</button>
                <button className="twitter" onClick= {(e)=> this.authenticate('twitter')}>Login with Twitter</button>
              

            </nav>
        )
    }
    render(){
        //Ako ima argumenata sintaksa je (e) => this.logout(e)
        const logout = <button onClick={this.logout}>Log Out!</button>
        //Provjeri da li je iko logovan

                  
        if(!this.state.uid) {

            return <div>{this.renderLogin()}</div>
        }

        //Provjeri da li je vlasnik prodavnice
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry you arent the owner of the store!</p>
                    {logout}
                </div>
                )
        }
        return(
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInvetory)}
                {/*Nastavljemo sa prosljedivanjem, ali sada je funckija unutar objekta props*/}
                <AddFishForm addFish = {this.props.addFish}/>
                <button onClick ={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )         

    
    }
    //Alternativno(static jer se ovo ne mijenja za svaku komponentu)
    static propTypes = {
        fishes : PropTypes.object.isRequired,
        updateFish : PropTypes.func.isRequired,
        removeFish : PropTypes.func.isRequired,
        addFish : PropTypes.func.isRequired,
        loadSamples : PropTypes.func.isRequired,
        storeId : PropTypes.string.isRequired 
    }
}
/*
Inventory.propTypes = {
    fishes : PropTypes.object.isRequired,
    updateFish : PropTypes.func.isRequired,
    removeFish : PropTypes.func.isRequired,
    addFish : PropTypes.func.isRequired,
    loadSamples : PropTypes.func.isRequired,
    storeId : PropTypes.string.isRequired 
}*/

export default Inventory;

