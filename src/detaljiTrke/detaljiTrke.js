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
import history from '../history';

var godina = "";
var id = "";

class DetaljiTrke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qualifications: [],
            result: [],
            flags: [],
            isLoading: true,
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
        var firstCall = $.ajax(`https://ergast.com/api/f1/${godina}/${this.props.match.params.id}/qualifying.json`);
        var secondCall = $.ajax(`https://ergast.com/api/f1/${godina}/${this.props.match.params.id}/results.json`);
        var thirdCall = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");
        $.when(firstCall, secondCall, thirdCall).done(function (data1, data2, data3) {
            var ispis = JSON.parse(data3[0]);
            if (data1[0].MRData.RaceTable.Races[0] !== undefined) {
                this.setState({
                    qualifications: data1[0].MRData.RaceTable.Races[0].QualifyingResults,
                    result: data2[0].MRData.RaceTable.Races,
                    flags: ispis,
                    isLoading: false
                });
            } else {
                this.setState({
                    result: data2[0].MRData.RaceTable.Races,
                    flags: ispis,
                    isLoading: false
                });
                // this.getNotFound();
            }
            // this.setState({
            //     qualifications:data1[0].MRData.RaceTable.Races[0].QualifyingResults,
            //     result:data2[0].MRData.RaceTable.Races,
            //     flags: ispis,
            //     isLoading:false
            // });
        }.bind(this));
        console.log(firstCall);
    }
    onClickDetailsOfRequest = (e) => {
        let linkTo = "/pocetna";
        history.push(linkTo);
    }
    onClickDetailsOfRequest1 = () => {
        let linkTo = "/trke/" + godina;
        history.push(linkTo);
    }
    render() {
        if (this.state.isLoading) {
            return <img src={loder} className='loderIkonica' />
        }

        return (
            <div className='main'>
                <div className="header1">
                    <button className='dugme' onClick={this.onClickDetailsOfRequest}><img src={home} alt='kucica' className='home' />F-1 Feeder</button>
                    <button className='dugme' onClick={this.onClickDetailsOfRequest1}>Races</button>
                    <button className='dugme plavo'>Race Details</button>
                </div>
                <div className='omotac'>
                    <div className='Ovozacu'>
                        <div className='vozac'>
                            <div className='zastava mala'>
                                {this.state.flags.map((zastava, i) => {
                                    let skracenica = zastava.alpha_2_code;
                                    if (this.state.result[0].Circuit.Location.country == zastava.en_short_name) {
                                        return <Flag country={skracenica} key={i} />
                                    }
                                    if (this.state.result[0].Circuit.Location.country === "UK") {
                                        if (zastava.nationality === "British, UK") {
                                            return <Flag country="GB" key={i} />
                                        }
                                    }
                                    if (this.state.result[0].Circuit.Location.country === "Korea") {
                                        if (zastava.nationality === "South Korean") {
                                            return <Flag country="KR" key={i} />
                                        }
                                    }
                                    if (this.state.result[0].Circuit.Location.country === "UAE") {
                                        if (zastava.nationality === "Emirati, Emirian, Emiri") {
                                            return <Flag country="AE" key={i} />
                                        }
                                    }
                                    if (this.state.result[0].Circuit.Location.country === "American") {
                                        if (zastava.en_short_name === "United States of America") {
                                            return <Flag country="US" key={i} />
                                        }
                                    }
                                }
                                )}
                                <h4>{this.state.result.raceName}</h4>

                            </div>
                            <div className='info'>
                                <div className='hard'><p>Country:</p><p>Location:</p><p>Date:</p><p>Full Report:</p></div>
                                <div className='soft'><p>{this.state.result[0].Circuit.Location.country}</p>
                                    <p>{this.state.result[0].Circuit.Location.locality}</p>
                                    <p>{this.state.result[0].date}</p>
                                    <p className="biografija">
                                        <a href={this.state.result[0].url} target="_blank"><FaExternalLinkAlt /></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tabela detalji'>
                        <table className='tabela tabela2'>
                            <thead>
                                <tr><th colSpan='4'>Qualifying Results</th></tr>
                                <tr><th>Pos</th><th>Driver</th><th>Team</th><th>Best Time</th></tr>
                            </thead>
                            <tbody>
                                {this.state.qualifications.map((raceStats, i) => {
                                    let info = raceStats;
                                    let time = [];
                                    time.push(info.Q1);
                                    time.push(info.Q2);
                                    time.push(info.Q3);
                                    let vreme = time.sort();
                                    return (
                                        <tr key={i}>
                                            <td>{info.position}</td>
                                            <td>
                                                {this.state.flags.map((zastava, i) => {
                                                    let skracenica = zastava.alpha_2_code;
                                                    if (info.Driver.nationality === "American") {
                                                        if (zastava.en_short_name === 'United States of America') {
                                                            return <Flag country="US" key={i} />
                                                        }
                                                    }
                                                    if (info.Driver.nationality === "American") {
                                                        return false;
                                                    } else {
                                                        if (info.Driver.nationality === zastava.nationality) {
                                                            return <Flag country={skracenica} key={i} />
                                                        }
                                                        if (info.Driver.nationality === "British") {
                                                            if (zastava.nationality === "British, UK") {
                                                                return <Flag country="GB" key={i} />
                                                            }
                                                        }
                                                        if (info.Driver.nationality === "Dutch") {
                                                            if (zastava.nationality === "Dutch, Netherlandic") {
                                                                return <Flag country="NL" key={i} />
                                                            }
                                                        }
                                                        if (info.Driver.nationality === "Monegasque") {
                                                            if (zastava.nationality === "Monégasque, Monacan") {
                                                                return <Flag country="MC" key={i} />
                                                            }
                                                        }
                                                    }
                                                }
                                                )}
                                                {info.Driver.familyName}</td>
                                            <td>{info.Constructor.name}</td>
                                            <td>{vreme[0]}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                            <tfoot>
                                <tr className='blank_row'>
                                    <td colSpan='4'>&nbsp;</td>
                                </tr>
                            </tfoot>
                        </table>
                        <table className='tabela tabela2'>
                            <thead>
                                <tr><th colSpan='5'>Race Results</th></tr>
                                <tr><th>Pos</th><th>Driver</th><th>Team</th><th>Result</th><th>Points</th></tr>
                            </thead>
                            <tbody>
                                {this.state.result[0].Results.map((raceStats, i) => {
                                    let info = raceStats;
                                    let vreme = "";
                                    let poeni = info.points;
                                    let klasa = "_";
                                    if (poeni > 20) {
                                        klasa += "1";
                                    } else if (poeni > 15) {
                                        klasa += "2";
                                    } else if (poeni > 0) {
                                        klasa += "3";
                                    } else {
                                        klasa += "4";
                                    }

                                    if (info.status == "Finished") {
                                        vreme = info.Time.time;
                                    } else {
                                        if (info.status.charAt(0) === "+") {
                                            vreme = info.status;
                                        } else {
                                            vreme = "Not Finished";
                                        }
                                    }
                                    return (
                                        <tr key={i}>
                                            <td>{info.position}</td>
                                            <td>
                                                {this.state.flags.map((zastava, i) => {
                                                    let skracenica = zastava.alpha_2_code;
                                                    if (info.Driver.nationality === "American") {
                                                        if (zastava.en_short_name === 'United States of America') {
                                                            return <Flag country="US" key={i} />
                                                        }
                                                    }
                                                    if (info.Driver.nationality === "American") {
                                                        return false;
                                                    } else {
                                                        if (info.Driver.nationality === zastava.nationality) {
                                                            return <Flag country={skracenica} key={i} />
                                                        }
                                                        if (info.Driver.nationality === "British") {
                                                            if (zastava.nationality === "British, UK") {
                                                                return <Flag country="GB" key={i} />
                                                            }
                                                        }
                                                        if (info.Driver.nationality === "Dutch") {
                                                            if (zastava.nationality === "Dutch, Netherlandic") {
                                                                return <Flag country="NL" key={i} />
                                                            }
                                                        }
                                                        if (info.Driver.nationality === "Monegasque") {
                                                            if (zastava.nationality === "Monégasque, Monacan") {
                                                                return <Flag country="MC" key={i} />
                                                            }
                                                        }
                                                    }
                                                }
                                                )}
                                                {info.Driver.familyName}</td>
                                            <td>{info.Constructor.name}</td>
                                            <td>{vreme}</td>
                                            <td className={klasa}>{info.points}</td>
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

export default DetaljiTrke;

