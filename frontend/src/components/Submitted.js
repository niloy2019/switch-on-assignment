import React, { Component } from 'react'
import Navbar from './Navbar'
import style from './pending.module.css'
import {Link} from 'react-router-dom'

export class submitted extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <br/><br/><br/><br/><br/>
                <h3 className={style.text}>
                    Request Submitted
                </h3>

                {/* <br/> */}
                <Link to="/home" > <button className={style.request} >Submit Another Request</button></Link>

               
            </div>
        )
    }
}

export default submitted
