import React from 'react';
import '../css/main.css';
import '../css/tabela.css';
import '../css/ram.css';
import $ from 'jquery';
import history from '../history.js';
import Flag from "react-flagkit";
import home from '../img/home.png';
import loder from '../img/logo.gif';

var godina="2019";


class Trke extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            races:[],
            flag:[], 
            isLoading:true 
        }
    }
    componentDidMount(){
        this.getAllData();
    }
    getAllData () {
        godina = this.props.match.params.year;
        var firstCall = $.ajax(`https://ergast.com/api/f1/${godina}/results/1.json`);
        var secondCall = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");
        $.when(firstCall, secondCall).done(function (data1, data2){
            var ispis = JSON.parse(data2[0]);

            this.setState({
                races:data1[0].MRData.RaceTable.Races,
                flag: ispis,
                isLoading:false
            });
        }.bind(this));
    }
    onClickDetailsOfRequest = (e) => {
        let linkTo = "/detaljiTrke/" + e.target.dataset.itemid+"/"+godina;
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
                <button className='dugme plavo'>Races</button>
            </div>
            <h2>Race Calendar</h2>
            <table className='tabela'>
                <thead>
                    <tr>
                        <th colSpan='5'>Race Calendar-{godina}</th>
                    </tr>
                    <tr>
                        <th>Round</th><th>Grand Prix</th><th>Circut</th><th>Date</th><th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.races.map((raceStats, i)=> {
                    let info = raceStats;
                    return (
                        <tr key={i}>
                        <td>{info.round}</td>
                        <td>
                        {this.state.flag.map((zastava, i) => {
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
                                    if(info.Circuit.Location.country==="Russia"){
                                        if(zastava.en_short_name==="Russian Federation"){
                                            return <Flag country="RU" key={i} />
                                        }
                                    }
                                }
                            )}
                            <button className='tabelaDugme' onClick={this.onClickDetailsOfRequest} data-itemid={info.round}>{info.raceName}</button>
                        </td>
                        <td>{info.Circuit.circuitName}</td>
                        <td>{info.date}</td>
                        <td>
                        {this.state.flag.map((zastava, i) => {
                            let skracenica=zastava.alpha_2_code;
                            if(info.Results[0].Driver.nationality === "American"){
                                if(zastava.en_short_name==='United States of America'){
                                    return <Flag country = "US" key={i}/>
                                }
                            }
                            if(info.Results[0].Driver.nationality==="American"){
                                return false;
                            }else{
                                 if(info.Results[0].Driver.nationality===zastava.nationality){
                                    return <Flag country={skracenica} key={i}/> 
                            }
                            if(info.Results[0].Driver.nationality==="British"){
                                if(zastava.nationality==="British, UK"){
                                    return <Flag country="GB" key={i} />
                                }
                            }
                            if(info.Results[0].Driver.nationality==="Dutch"){
                                if(zastava.nationality==="Dutch, Netherlandic"){
                                    return <Flag country="NL" key={i} />
                                }
                            }
                            if(info.Results[0].Driver.nationality==="Monegasque"){
                                if(zastava.nationality==="Monégasque, Monacan"){
                                    return <Flag country="MC" key={i} />
                                }
                            }
                            }}
                        )}
                        {info.Results[0].Driver.familyName}</td>

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
        );
    }
}
 
export default Trke;

