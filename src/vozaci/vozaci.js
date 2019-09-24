import React from 'react';
import '../css/main.css';
import '../css/tabela.css';
import '../css/ram.css';
import $ from 'jquery';
import home from '../img/home.png';
import history from '../history.js';
import Flag from "react-flagkit";
import loder from '../img/logo.gif';

var urlVozaca = "";
var godina = "2019";

class Vozaci extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drivers: [],
            flag: [],
            isLoading: true,
        }
    }
    componentDidMount() {
        this.getAllData();
    }
    getAllData() {
        godina = this.props.match.params.year;
        var firstCall = $.ajax(`https://ergast.com/api/f1/${godina}/driverStandings.json`);
        var secondCall = $.ajax("https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json");
        $.when(firstCall, secondCall).done(function (data1, data2) {
            var ispis = JSON.parse(data2[0]);

            this.setState({
                drivers: data1[0].MRData.StandingsTable.StandingsLists[0].DriverStandings,
                flag: ispis,
                isLoading: false
            });
        }.bind(this));
        console.log(firstCall);
    }

    onClickDetailsOfRequest = (e) => {
        let linkTo = "/detaljiVozaca/" + e.target.dataset.itemid + "/" + godina;
        urlVozaca = e.target.dataset.itemurl;
        history.push(linkTo);
    }
    onClickDetailsOfRequest1 = () => {
        let linkTo = "/pocetna";
        history.push(linkTo);
    }
    render() {
        if (this.state.isLoading) {
            return <img src={loder} className='loderIkonica' />
        }

        return (
            <div className='main'>
                <div className="header1">
                    <button className='dugme' onClick={this.onClickDetailsOfRequest1}><img src={home} alt='kucica' className='home' />F-1 Feeder</button>
                    <button className='dugme plavo'>Drivers</button>
                </div>
                <h2>Drivers Championsship Standings</h2>
                <table className='tabela'>
                    <thead>
                        <tr>
                            <th colSpan='4'>Drivers Championsship Standings-{godina}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.drivers.map((driverStats, i) => {
                            let info = driverStats;
                            let vozacIme = info.Driver.givenName + " " + info.Driver.familyName;
                            return (
                                <tr key={i}>
                                    <td>{info.position}</td>
                                    <td>
                                        {this.state.flag.map((zastava, i) => {
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
                                                } if (info.Driver.nationality === "Rhodesian") {
                                                    if (zastava.nationality === "Zimbabwean") {
                                                        return <Flag country="ZW" key={i} />
                                                    }
                                                } if (info.Driver.nationality === "New Zealander") {
                                                    if (zastava.nationality === "New Zealand, NZ") {
                                                        return <Flag country="NZ" key={i} />
                                                    }
                                                }
                                            }
                                        }
                                        )}
                                        <button className='tabelaDugme' onClick={this.onClickDetailsOfRequest} data-itemid={info.Driver.driverId} data-itemurl={info.Driver.url}>
                                            {vozacIme}</button></td>
                                    <td>{info.Constructors[0].name}</td>
                                    <td>{info.points}</td>
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
            </div>
        );

    }
}

export default Vozaci;
export { urlVozaca };
export { godina };
