import React from 'react';
import '../css/main.css';
import '../css/ram.css';
import home from '../img/home.png';
import history from '../history.js';


class NotFound extends React.Component {
    onClickDetailsOfRequest1 = (e) => {
        let linkTo = "/pocetna";
        history.push(linkTo);
    }
    render() {
       
        return (
            <div className='main'>
            <div className="header1">
                <button className='dugme' onClick={this.onClickDetailsOfRequest1}><img src={home} alt='kucica' className='home' />F-1 Feeder</button>
                <button className='dugme plavo'>Not Found</button>
            </div>
            <h1>404 Not Found</h1>
            
            </div>
        );
    }
}
 
export default NotFound;




