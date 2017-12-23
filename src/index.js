import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';
import App1 from './components/App1';
import './css/style.css';
import { Switch, Route, BrowserRouter} from 'react-router-dom';


//Dobavlja naziv repozitorija radi samo za github
const repo = "/" + window.location.pathname.split('/')[1];
console.log(repo);
//FAZON ZA GIT AKO NE RADI nakon refresha copirat index.html i saviti naziv 404.html
const Root = () =>{
    //Kako je link od githuba: https://github.com/epajic16747/react-test potrebno je u Browser tagu  dodati atribut basename="repo_path";
    return(
        <BrowserRouter basename={repo}>
            <Switch>
                <Route exact path ="/" component={StorePicker}></Route>
                <Route path="/store/:storeId" component={App1}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
        
    )
}
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
             