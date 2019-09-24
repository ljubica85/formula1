import React from 'react';
import '../css/main.css';
import '../css/tabela.css';
import '../css/ram.css';
import $ from 'jquery';
import home from '../img/home.png';
import history from '../history.js';
import Flag from "react-flagkit";
import {FaExternalLinkAlt} from "react-icons/fa";
import loder from '../img/logo.gif';

var godina="2019";


class Timovi extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            teams:[], 
            flag:[], 
            isLoading:true
        }
        this.getNotFound=this.getNotFound.bind(this);
    }
    componentDidMount(){
        this.getAllData();
    }
    getNotFound(){
        let linkTo = "/NotFound"
        history.push(linkTo);
    }    
    getAllData () {
        godina = this.props.match.params.year;
        var firstCall = $.ajax(`http://ergast.com/api/f1/${godina}/constructorStandings.json`);
        var secondCall = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");
        $.when(firstCall, secondCall).done(function (data1, data2){
            var ispis = JSON.parse(data2[0]);
            if(data1[0].MRData.StandingsTable.StandingsLists[0]!==undefined){
                this.setState({
                    teams:data1[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
                    flag: ispis,
                    isLoading:false
                });
            } else {
                this.getNotFound();
            }   
        }.bind(this));
    }
    onClickDetailsOfRequest = (e) => {
        let linkTo = "/detaljiTima/" + e.target.dataset.itemid+"/"+godina;
        history.push(linkTo);
         }
         onClickDetailsOfRequest1 = (e) => {
            let linkTo = "/pocetna";
            history.push(linkTo);
        }
    render() {
        if(this.state.isLoading){
            return <img src={loder} className='loderIkonica'/>
        }
        return (
            <div className='main'>
            <div className="header1">
                <button className='dugme' onClick={this.onClickDetailsOfRequest1}><img src={home} alt='kucica' className='home' />F-1 Feeder</button>
                <button className='dugme plavo'>Teams</button>
            </div>
            <h2>Constructors Championship</h2>
            <table className='tabela'>
                <thead>
                <tr>
                <th colSpan='4'>Formula 1 {godina} Results</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan='4'>Constructors Championship-{godina}</th>
                    </tr>
                {this.state.teams.map((teamStats, i)=> {
                    let tim = teamStats;
                    return ( 
                        <tr key={i}>
                        <td>{tim.position}</td>
                        <td className="celija">
                        {this.state.flag.map((zastava, i) => {
                            let skracenica=zastava.alpha_2_code;
                            if(tim.Constructor.nationality === "American"){
                                if(zastava.en_short_name==='United States of America'){
                                    return <Flag country = "US" key={i}/>
                                }
                            }
                            if(tim.Constructor.nationality==="American"){
                                return false;
                            }else{
                                 if(tim.Constructor.nationality===zastava.nationality){
                                    return <Flag country={skracenica} key={i}/> 
                            }
                            if(tim.Constructor.nationality==="British"){
                                if(zastava.nationality==="British, UK"){
                                    return <Flag country="GB" key={i} />
                                }
                            }
                            if(tim.Constructor.nationality==="Dutch"){
                                if(zastava.nationality==="Dutch, Netherlandic"){
                                    return <Flag country="NL" key={i} />
                                }
                            }
                            if(tim.Constructor.nationality==="Monegasque"){
                                if(zastava.nationality==="Monégasque, Monacan"){
                                    return <Flag country="MC" key={i} />
                                }
                            }
                            }}
                        )}
                        <button className='tabelaDugme' onClick={this.onClickDetailsOfRequest} data-itemid={tim.Constructor.constructorId}>
                        {tim.Constructor.name}</button></td>
                        <td>Details <a href={tim.Constructor.url} target="_blank"><FaExternalLinkAlt /></a></td>
                        <td>{tim.points}</td>
                        </tr>
                     )}
                )
                }
                </tbody>
                <tfoot>
                    <tr className='blank_row'>
                        <td colSpan='4'>&nbsp;</td>
                    </tr>
                </tfoot>
               </table>
            </div>
        );
    }
}
 
export default Timovi;




