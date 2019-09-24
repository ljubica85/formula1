import React from 'react';
import '../css/main.css';
import '../css/tabela.css';
import '../css/boje.css';
import '../css/ram.css';
import $ from 'jquery';
import home from '../img/home.png';
import Flag from 'react-flagkit';
import {FaExternalLinkAlt} from "react-icons/fa";
import {urlVozaca} from "../komponente/vozaci.js";
import loder from '../img/logo.gif';
import history from '../history.js';

var godina="2018";

class DetaljiVozaca extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: [],
            flags: [],
            isLoading: true, 
            isLoading1: true,
            wikilink:[]   
        }
    }
    componentDidMount() {
        this.getDriver();
        this.getFlags();
        this.getImg()
    }
    getDriver() {
        godina = this.props.match.params.year;
        var url = `http://ergast.com/api/f1/${godina}/drivers/${this.props.match.params.id}/results.json`;
        console.log(url)
        $.get(url, (data) => {
            this.setState({ driver: data.MRData.RaceTable.Races, isLoading: false });
        })
        
    }
    getFlags() {
        var url = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        $.get(url, (data) => {
            var ispis = JSON.parse(data)
            this.setState({ flags: ispis, isLoading1:false });
            })
    }
    getImg(){
        console.log(urlVozaca);
        var slika=urlVozaca; 
        let crtica = slika.lastIndexOf("/")+1;
        var avatar = "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
        var ime="";
        if(slika.slice(crtica)==="Nino_Farina"){
            ime="Giuseppe_Farina";
        } else {
            ime=slika.slice(crtica);
        }
        var link=`https://en.wikipedia.org/w/api.php?action=query&titles=${ime}&prop=pageimages&format=json&origin=*&pithumbsize=150`;
        console.log(link);
        $.get(link, (data) => {
            if(data.query!==undefined&&Object.values(data.query.pages)[0].thumbnail!==undefined){
                this.setState({ wikilink: Object.values(data.query.pages)[0].thumbnail.source, isLoadingImage: false });
            } else {
                this.setState({ wikilink: avatar });
            }    
        })
    }
    onClickDetailsOfRequest = (e) => {
        let linkTo = "/pocetna";
        history.push(linkTo);
    }
    onClickDetailsOfRequest1 = () => {
        let linkTo = "/vozaci/"+godina;
        history.push(linkTo);
    }
    onClickDetailsOfRequest2 = (e) => {
        let linkTo = "/detaljiTrke/"+ e.target.dataset.itemid+"/"+godina;
        history.push(linkTo);
    }
    render() {
        if(this.state.isLoading){
            return <img src={loder} className='loderIkonica'/>
        }
        if(this.state.isLoading1){
            return <img src={loder} className='loderIkonica'/>
        }
        if(this.state.isLoadingImage){
            return <img src={loder} className='loderIkonica'/>
        }
        let name = this.state.driver[0].Results[0].Driver.givenName+" "+this.state.driver[0].Results[0].Driver.familyName;
        return (
            <div className='main'>
                <div className="header1">
                    <button className='dugme' onClick={this.onClickDetailsOfRequest}><img src={home} alt='kucica' className='home' />F-1 Feeder</button>
                    <button className='dugme' onClick={this.onClickDetailsOfRequest1}>Drivers</button>
                    <button className='dugme plavo'>Drivers Details</button>
                </div>
                <div className='omotac'>
                    <div className='Ovozacu'>
                        <div className='vozac'>
                            <div className='vozacGornji'>
                                <div className="img">
                                    <img src={this.state.wikilink} /> 
                                </div>
                                <div className='zasIme'>
                                    <div className='zastava'>
                                    {this.state.flags.map((zastava, i) => {
                                        let skracenica=zastava.alpha_2_code;
                                        if(this.state.driver[0].Results[0].Driver.nationality=== "American"){
                                            if(zastava.en_short_name==='United States of America'){
                                                return <Flag country = "US" key={i}/>
                                            }
                                        }
                                        if(this.state.driver[0].Results[0].Driver.nationality==="American"){
                                            return false;
                                        }else{
                                            if(this.state.driver[0].Results[0].Driver.nationality===zastava.nationality){
                                                return <Flag country={skracenica} key={i}/> 
                                        }
                                        if(this.state.driver[0].Results[0].Driver.nationality==="British"){
                                            if(zastava.nationality==="British, UK"){
                                                return <Flag country="GB" key={i} />
                                            }
                                        }
                                        if(this.state.driver[0].Results[0].Driver.nationality==="Dutch"){
                                            if(zastava.nationality==="Dutch, Netherlandic"){
                                                return <Flag country="NL" key={i} />
                                            }
                                        }
                                        if(this.state.driver[0].Results[0].Driver.nationality==="Monegasque"){
                                            if(zastava.nationality==="Monégasque, Monacan"){
                                                return <Flag country="MC" key={i} />
                                            }
                                        }
                                        }}
                                    )}</div>
                                    <h4>{name}</h4> 
                             </div>   
                            </div>
                            <div className='info'>
                                <div className='hard'><p>Country:</p><p>Team:</p><p>Birth:</p><p>Biography:</p></div>
                                <div className='soft'><p>{this.state.driver[0].Results[0].Driver.nationality}</p>
                                    <p>{this.state.driver[0].Results[0].Constructor.name}</p>
                                    <p>{this.state.driver[0].Results[0].Driver.dateOfBirth}</p>            
                                    <p className="biografija">
                                        <a href={this.state.driver[0].Results[0].Driver.url} target="_blank"><FaExternalLinkAlt /></a>
                                    </p>                              
                                </div>
                            </div>
                        </div>              
                    </div>
                    <div className='tabela detalji'>
                            <table className='tabela'>
                                <thead>
                                    <tr><th colSpan='5'>Formula 1 2013 Results</th></tr>
                                    <tr><th>Round</th><th>Grand Prix</th><th>Team</th><th>Grid</th><th>Race</th></tr>
                                </thead>
                                <tbody>
                                    {this.state.driver.map((raceStats, i)=> {
                                    let info = raceStats;
                                    let position = "_"+info.Results[0].position;
                                    let nac =info.Results[0].Constructor.nationality;
                                    return (
                                    <tr key={i}>
                                    <td>{info.round}</td>
                                    <td>
                                    {this.state.flags.map((zastava, i) => {
                                        let skracenica=zastava.alpha_2_code;
                                        if(info.Circuit.Location.country===zastava.en_short_name){
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
                                        if(info.Circuit.Location.country==="USA"){
                                            if(zastava.en_short_name==="United States of America"){
                                                return <Flag country="US" key={i} />
                                            }
                                        }
                                    }
                                    )} 
                                    <button className='tabelaDugme' onClick={this.onClickDetailsOfRequest2} data-itemid={info.round}>{info.raceName}</button>                         
                                    </td>
                                    <td>{info.Results[0].Constructor.name}</td>
                                    <td>{info.Results[0].grid}</td>
                                    <td className={position}>
                                    {info.Results[0].position}</td>
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
        
       export default DetaljiVozaca;
       
