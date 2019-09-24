import React from 'react';
import '../css/main.css';
import home from '../img/home.png';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driver: [],
        }
    }
    render() {
        return (
                <div className="header1">
                    <button className='dugme' onClick={this.onClickDetailsOfRequest}><img src={home} alt='kucica' className='home' />F-1 Feeder</button>
                    <button className='dugme' onClick={this.onClickDetailsOfRequest1}>Drivers</button>
                    <button className='dugme plavo'>Drivers Details</button>
                </div>
        );
    }
}
export default Header;
       
