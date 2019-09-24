import React from 'react';
import '../css/main.css';
import '../css/tabela.css';
import '../css/boje.css';
import '../css/ram.css';
import $ from 'jquery';
import home from '../img/home.png';
import Flag from 'react-flagkit';
import {FaExternalLinkAlt} from "react-icons/fa";
import loder from '../img/logo.gif';
import history from '../history.js';

var godina = "2018";
var id = '';

class DetaljiTima extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: [],
            flags: [],
            constructor:[],
            isLoading: true 
        } 
        this.getNotFound=this.getNotFound.bind(this);
    }
    componentDidMount() {
        this.getAllData();
    }
    getNotFound(){
        let linkTo = "/NotFound"
        history.push(linkTo);
    }
    getAllData () {
        godina = this.props.match.params.year;
        id = this.props.match.params.id;
        var firstCall = $.ajax(`http://ergast.com/api/f1/${godina}/constructors/${id}/constructorStandings.json`);
        var secondCall = $.ajax(`http://ergast.com/api/f1/${godina}/constructors/${id}/results.json`);
        var thirdCall = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");
        $.when(firstCall, secondCall, thirdCall).done(function (data1, data2, data3){
            var ispis = JSON.parse(data3[0]);
            console.log(secondCall);
            if(data2[0].MRData.RaceTable.Races[0].Results.Driver!==undefined){
                this.setState({
                    constructor:data1[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0],
                    team:data2[0].MRData.RaceTable.Races,
                    flags: ispis,
                    isLoading:false
                }); 
            } else {
                this.getNotFound();
            } 
        }.bind(this));
        console.log(firstCall);
    }
    
    onClickDetailsOfRequest = (e) => {
        let linkTo = "/pocetna";
        history.push(linkTo);
    }
    onClickDetailsOfRequest1 = () => {
        let linkTo = "/teams/"+godina;
        history.push(linkTo);
    }
    render() {
        if(this.state.isLoading){
            return <img src={loder} className='loderIkonica'/>
        }
        
            return (
                <div className='main'>
                    <div className="header1">
                        <button className='dugme' onClick={this.onClickDetailsOfRequest}><img src={home} alt='kucica' className='home' />F-1 Feeder</button>
                        <button className='dugme' onClick={this.onClickDetailsOfRequest1}>Teams</button>
                        <button className='dugme plavo'>Team Details</button>
                    </div>
                    <div className='omotac'>
                        <div className='Ovozacu detaljiTim'>
                            <div className='vozac tim'>
                                    <div className='zastavaTima'></div>
                                    <div>
                                    {this.state.flags.map((zastava, i) => {
                                        let skracenica=zastava.alpha_2_code;
                                        if(this.state.team[0].Results[0].Constructor.nationality === "American"){
                                            if(zastava.en_short_name==='United States of America'){
                                                return <Flag country = "US" key={i}/>
                                            }
                                        }
                                        if(this.state.team[0].Results[0].Constructor.nationality==="American"){
                                            return false;
                                        }else{
                                            if(this.state.team[0].Results[0].Constructor.nationality===zastava.nationality){
                                                return <Flag country={skracenica} key={i}/> 
                                        }
                                        if(this.state.team[0].Results[0].Constructor.nationality==="British"){
                                            if(zastava.nationality==="British, UK"){
                                                return <Flag country="GB" key={i} />
                                            }
                                        }
                                        if(this.state.team[0].Results[0].Constructor.nationality==="Dutch"){
                                            if(zastava.nationality==="Dutch, Netherlandic"){
                                                return <Flag country="NL" key={i} />
                                            }
                                        }
                                        if(this.state.team[0].Results[0].Constructor.nationality==="Monegasque"){
                                            if(zastava.nationality==="Monégasque, Monacan"){
                                                return <Flag country="MC" key={i} />
                                            }
                                        }
                                        }}
                                    )}
                                    <h4>{this.state.team[0].Results[0].Constructor.name}</h4> 
                                    </div>
                            </div>
                            <div className='info'>
                            <div className='hard'><p>Country:</p><p>Position:</p><p>Points:</p><p>History:</p></div>
                            <div className='soft'><p>{this.state.team[0].Results[0].Constructor.nationality}</p>
                                <p>{this.state.team[0].Results[0].position}</p>
                                <p>{this.state.constructor.points}</p>            
                                <p className="biografija">
                                    <a href={this.state.team[0].Results[0].Constructor.url} target="_blank"><FaExternalLinkAlt /></a>
                                </p>
                                
                            </div>
                            </div>                
                        </div>
                                <div className='tabela detalji'>
                                    <table className='tabelaDetalji'>
                                        <thead>
                                            <tr><th colSpan='5'>Formula 1 2013 Results</th></tr>
                                            <tr><th>Round</th><th>Grand Prix</th><th>{this.state.team[0].Results[0].Driver.familyName}</th><th>{this.state.team[0].Results[1].Driver.familyName}</th><th>Points</th></tr>
                                        </thead>
                                        <tbody>
                                            {this.state.team.map((teamStats, i)=> {
                                            let info = teamStats;
                                            let position = "_"+info.Results[0].position;
                                            let position1 = "_"+info.Results[1].position;
                                            let points = +info.Results[0].points + +info.Results[1].points;
                                            return (
                                            <tr key={i}>
                                            <td>{info.round}</td>
                                            <td>
                                            {this.state.flags.map((zastava, i) => {
                                                let skracenica=zastava.alpha_2_code;
                                                if(info.Circuit.Location.country==="USA"){
                                                    if(zastava.en_short_name==="United States of America"){
                                                        return <Flag country="US" key={i} />
                                                    }
                                                }
                                                if(info.Circuit.Location.country==zastava.en_short_name){
                                                    return <Flag country={skracenica} key={i} />
                                                }
                                                if(info.Circuit.Location.country==="UK"){
                                                    if(zastava.nationality==="British, UK"){
                                                        return <Flag country="GB" key={i} />
                                                    }
                                                }
                                                if(info.Circuit.Location.country==="Korea"){
                                                    if(zastava.nationality==="South Korean"){
                                                        return <Flag country="KR" key={i} />
                                                    }
                                                }
                                                if(info.Circuit.Location.country==="UAE"){
                                                    if(zastava.nationality==="Emirati, Emirian, Emiri"){
                                                        return <Flag country="AE" key={i} />
                                                    }
                                                }
                                                
                                            }
                                            )}                          
                                            {info.raceName}</td>
                                            <td className={position}>{info.Results[0].position}</td>
                                            <td className={position1}>{info.Results[1].position}</td>
                                            <td>
                                            {points}</td>
                                        </tr>
                                    )
                                })
                                }
                                </tbody>
                                <tfoot>
                                    <tr className='blank_row'>
                                    <td colSpan='5'>&nbsp;</td>
                                    </tr>
                                </tfoot> 
                                </table>    
                                </div>
                            </div>
                        </div>  
                    );
         
        
           }
       }
        
       export default DetaljiTima;
       
