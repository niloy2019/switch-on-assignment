import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import style from './pending.module.css'
import img from './img/notification.jpg'

export class Navbar extends Component {

    logout = () => {
        localStorage.removeItem("user")
        this.forceUpdate();
    }

    render() {

        if(localStorage.getItem("user")){

        }else{
            return <Redirect to="/" />
        }

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pending" className="nav-link" >Pending</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/approved" className="nav-link" >Approved</Link>
                                
                            </li>
                            <li className="nav-item">
                                <Link to="/rejected" className="nav-link" >Rejected</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/approvalrequests" className="nav-link" >Approval Requests</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/departmentalrequests" className="nav-link" >Departmental Approval Requests</Link>
                            </li>
                        </ul>
                    
                            <Link to="/notification" className="nav-link" >
                                <img src={img} className={style.notification} alt={img} />
                            </Link>

                            <form class="form-inline my-2 my-lg-0">
                                 <button class={style.logout} type="submit" onClick={this.logout.bind(this)} >Log out</button>
                            </form>
                        </div>
                </nav>
                
            </div>
        )
    }
}

export default Navbar
