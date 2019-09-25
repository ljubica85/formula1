import React from 'react';
import logo from '../img/praviLogo.jpg';
import '../css/main.css';
import '../css/sidebar.css';
import helmet from '../img/helmet.png';
import timovi from '../img/timovi.png';
import flag from '../img/flag.png';
import Pocetna from '../pocetna/pocetna.js';
import Timovi from '../timovi/timovi.js';
import Vozaci from '../vozaci/vozaci.js';
import Trke from '../trke/trke.js';
import DetaljiVozaca from '../detaljiVozaca/detaljiVozaca.js';
import DetaljiTima from '../detaljiTima/detaljiTima';
import DetaljiTrke from '../detaljiTrke/detaljiTrke';
import NotFound from '../NotFound/NotFound';
import history from '../history';
import { Router, Route, NavLink } from "react-router-dom";
var godina = '';


class Sidebar extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            year:godina?godina:'2019'
        }
        this.getYear=this.getYear.bind(this)
    }
    getYear(godina){
        this.setState({year: godina});
    }
    render() {       
        return (
            <Router history={history}>
                <div className='sidebar'>
                <nav>
                <NavLink exact to='/pocetna'><img src={logo} alt='slika logoa' className='slika_logoa' /></NavLink>
                    <ul>
                        <li>
                            <NavLink className='link' activeClassName='activeRoute' to={'/vozaci/'+this.state.year}>
                            <span className='navigacija'>
                                <img src={helmet} alt='slika logoa' className='ikonice' />
                                <h3>Drivers</h3>
                            </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='link' activeClassName='activeRoute' to={'/teams/'+this.state.year}>
                            <span className='navigacija'>
                                <img src={timovi} alt='slika logoa' className='ikonice' /> 
                            <h3>Teams</h3>
                            </span>
                            </NavLink>         
                        </li>
                          <li>
                              <NavLink className='link' activeClassName='activeRoute' to={'/trke/'+this.state.year}>
                            <span className='navigacija'>
                                <img src={flag} alt='slika logoa' className='ikonice' />
                            <h3>Races</h3>
                            </span>
                                </NavLink>
                          </li>
                    </ul>
               </nav>
                </div>
                <div className='ram'>
                <Route path='/' exact component={() => <Pocetna getYear={this.getYear} />} />
                <Route path='/vozaci/:year' component={Vozaci} />
                <Route path="/teams/:year" component={Timovi} />
                <Route path='/trke/:year' component={Trke} />
                <Route path="/detaljiVozaca/:id/:year" component={DetaljiVozaca} />
                <Route path="/detaljiTima/:id/:year" component={DetaljiTima} />
                <Route path="/detaljiTrke/:id/:year" component={DetaljiTrke} />
                <Route path="/pocetna" component={() => <Pocetna getYear={this.getYear} />} />
                <Route path="/NotFound" component={NotFound} />
                </div>
           </Router>
        );
    }
}
 
export default Sidebar;

