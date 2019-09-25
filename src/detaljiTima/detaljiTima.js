import React from 'react';
import '../css/main.css';
import '../css/tabela.css';
import '../css/boje.css';
import '../css/ram.css';
import $ from 'jquery';
import home from '../img/home.png';
import Flag from 'react-flagkit';
import { FaExternalLinkAlt } from "react-icons/fa";
import loder from '../img/logo.gif';
import history from '../history.js';

var godina = "2018";
var id = '';
var driver1 = "";
var driver2 = "";


class DetaljiTima extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: [],
            flags: [],
            constructor: [],
            isLoading: true
        }
        this.getNotFound = this.getNotFound.bind(this);
    }
    componentDidMount() {
        this.getAllData();
    }
    getNotFound() {
        let linkTo = "/NotFound"
        history.push(linkTo);
    }
    getAllData() {
        godina = this.props.match.params.year;
        id = this.props.match.params.id;
        var firstCall = $.ajax(`https://ergast.com/api/f1/${godina}/constructors/${id}/constructorStandings.json`);
        var secondCall = $.ajax(`https://ergast.com/api/f1/${godina}/constructors/${id}/results.json`);
        var thirdCall = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");
        $.when(firstCall, secondCall, thirdCall).done(function (data1, data2, data3) {
            var ispis = JSON.parse(data3[0]);
            this.setState({
                constructor: data1[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0],
                team: data2[0].MRData.RaceTable.Races,
                flags: ispis,
                isLoading: false
            });
        }.bind(this));
    }

    onClickDetailsOfRequest = (e) => {
        let linkTo = "/pocetna";
        history.push(linkTo);
    }
    onClickDetailsOfRequest1 = () => {
        let linkTo = "/teams/" + godina;
        history.push(linkTo);
    }
    onClickDetailsOfRequest2 = (e) => {
        let linkTo = "/detaljiTrke/" + e.target.dataset.itemid + "/" + godina;;
        history.push(linkTo);
    }
    render() {
        if (this.state.isLoading) {
            return <img src={loder} className='loderIkonica' />
        }
        driver1 = this.state.team[0].Results[0].Driver.familyName;
        driver2 = this.state.team[0].Results[1] !== undefined ? this.state.team[0].Results[1].Driver.familyName : "";
        return (
            <div className='main'>
                <div className="header1">
                    <button className='dugme' onClick={this.onClickDetailsOfRequest}><img src={home} alt='kucica' className='home' />F-1 Feeder</button>
                    <button className='dugme' onClick={this.onClickDetailsOfRequest1}>Teams</button>
                    <button className='dugme plavo'>Team Details</button>
                </div>
                <div className='omotac'>
                    <div className='Ovozacu detaljiTim'>
                        <div className='tim'>
                            <div className='mala'>
                                {this.state.flags.map((zastava, i) => {
                                    let skracenica = zastava.alpha_2_code;
                                    if (this.state.team[0].Results[0].Constructor.nationality === "American") {
                                        if (zastava.en_short_name === 'United States of America') {
                                            return <Flag country="US" key={i} />
                                        }
                                    }
                                    if (this.state.team[0].Results[0].Constructor.nationality === "American") {
                                        return false;
                                    } else {
                                        if (this.state.team[0].Results[0].Constructor.nationality === zastava.nationality) {
                                            return <Flag country={skracenica} key={i} />
                                        }
                                        if (this.state.team[0].Results[0].Constructor.nationality === "British") {
                                            if (zastava.nationality === "British, UK") {
                                                return <Flag country="GB" key={i} />
                                            }
                                        }
                                        if (this.state.team[0].Results[0].Constructor.nationality === "Dutch") {
                                            if (zastava.nationality === "Dutch, Netherlandic") {
                                                return <Flag country="NL" key={i} />
                                            }
                                        }
                                        if (this.state.team[0].Results[0].Constructor.nationality === "Monegasque") {
                                            if (zastava.nationality === "Monégasque, Monacan") {
                                                return <Flag country="MC" key={i} />
                                            }
                                        }
                                    }
                                }
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
                                <tr><th>Round</th><th>Grand Prix</th><th>{driver1}</th><th>{driver2 ? driver2 : "No data"}</th><th>Points</th></tr>
                            </thead>
                            <tbody>
                                {this.state.team.map((info, i) => {
                                    // let info = teamStats;
                                    var filterResult1 = (info.Results && info.Results.filter(result => result.Driver.familyName === driver1)) || "";
                                    var filterResult2 = (info.Results && info.Results.filter(result => result.Driver.familyName === driver2)) || "";
                                    var position = filterResult1.length ? filterResult1[0].position : "no-data";
                                    var position1 = filterResult2.length ? filterResult2[0].position : "no-data";
                                    var points = (filterResult1.length && filterResult2.length) ? +filterResult1[0].points + +filterResult2[0].points : "";
                                    // if (info.Results[0] !== undefined && info.Results[1] !== undefined) {
                                    //     points = +filterResult1.points + +filterResult2.points;
                                    // }
                                    return (
                                        <tr key={i}>
                                            <td>{info.round}</td>
                                            <td>
                                                {this.state.flags.map((zastava, i) => {
                                                    let skracenica = zastava.alpha_2_code;
                                                    if (info.Circuit.Location.country === "USA") {
                                                        if (zastava.en_short_name === "United States of America") {
                                                            return <Flag country="US" key={i} />
                                                        }
                                                    }
                                                    if (info.Circuit.Location.country == zastava.en_short_name) {
                                                        return <Flag country={skracenica} key={i} />
                                                    }
                                                    if (info.Circuit.Location.country === "UK") {
                                                        if (zastava.nationality === "British, UK") {
                                                            return <Flag country="GB" key={i} />
                                                        }
                                                    }
                                                    if (info.Circuit.Location.country === "Korea") {
                                                        if (zastava.nationality === "South Korean") {
                                                            return <Flag country="KR" key={i} />
                                                        }
                                                    }
                                                    if (info.Circuit.Location.country === "UAE") {
                                                        if (zastava.nationality === "Emirati, Emirian, Emiri") {
                                                            return <Flag country="AE" key={i} />
                                                        }
                                                    }

                                                }
                                                )}
                                                <button className='tabelaDugme' onClick={this.onClickDetailsOfRequest2} data-itemid={info.round}>{info.raceName}</button></td>
                                            <td className={"_" + position}>{position}</td>
                                            <td className={"_" + position1}>{position1}</td>
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

