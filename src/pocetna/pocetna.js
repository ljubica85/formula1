import React from 'react';
import '../css/pocetna.css';
import history from '../history';
var godina = '';

class Pocetna extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        }
    }
    handleSelectChange = (e) => {
        godina = e.target.value;
        this.setState({ result: e.target.value });
        let linkTo = "/vozaci/" + e.target.value;
        this.props.getYear(e.target.value);
        history.push(linkTo);
    }
    render() {
        let n = (new Date()).getFullYear();
        let min = 1950;
        let max = n;
        let allYears = [];
        for (let x = max; x >= min; x--) {
            allYears.push(x)
        }
        const yearList = allYears.map((x) => { return (<option value={x} key={x}>{x}</option>) });
        return (
            <div className="pocetnaStrana">
                <div className='slika'></div>
                <div className='sadrzaj'><h1>Welcome to F1 Statistic</h1></div>
                <div className='izbor'>
                    <h2>Chose season</h2>
                    <select onChange={this.handleSelectChange}>
                        <option key={-1} value="-1">Selecte season</option>
                        {yearList}
                    </select>

                </div>
            </div>

        );
    }
}

export default Pocetna;


