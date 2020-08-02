import React, { Component } from 'react'
import {Redirect,Link} from 'react-router-dom'
import './login.css'
import axios from 'axios';

export class Signup extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token==null){
            loggedIn = false
        }

        this.state = {
             username :'',
             password : '',
             department : '',
             loggedIn:false
        }

        this.onChange=this.onChange.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    submitForm(e){
        e.preventDefault();
        const {username,password,department} = this.state
        axios({
            method: 'post',
            url: `https://switchon-backend-app.herokuapp.com/user/add`,
            headers: {}, 
            data: {
              name: username, // This is the body part
              password: password,
              department: department
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })

        this.setState({
            loggedIn : true
        })
       
    }

    render() {

        if(localStorage.getItem("user")){
            return <Redirect to="/home" />
        }

        
        if(this.state.loggedIn){
            return <Redirect to="/" />
        }


        return (
           
            <div className="bakground">
                <img className="wave" src={require('./img/wave.png')} alt="wave.png" />
                <div className="container">
                    <div className="img">
                        <img src={require('./img/bg.svg')} alt="bg.svg" />
                    </div>
                    <div className="login-content">
                        <form onSubmit={this.submitForm}>
                            <img src={require('./img/avatar.svg')} alt="avatar.svg" />
                            <h2 className="title">Let's Start</h2>
                            <div className="input-div one">
                                 <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <input type="text" placeholder="Username" required className="input" name="username" value={this.state.username}  onChange={this.onChange} />
                                 </div>
                           </div>
                           <div className="input-div one">
                                 <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <select value={this.state.department}  id="exampleFormControlSelect1" className="form-control"   onChange={this.onChange}  placeholder="department" required  name="department">
                                        <option defaultValue >Choose Department</option>
                                        <option value="Marketing" >Marketing</option>
                                        <option value="Finance" >Finance</option>
                                        <option value="Operations management" >Operations management</option>
                                        <option value="Human Resource" >Human Resource</option>
                                        <option value="IT" >IT</option>
                                    </select>
                                 </div>
                           </div>
                            <div className="input-div pass">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        {/* <h5>Password</h5> */}
                                        <input type="password" placeholder="Password" required className="input" name="password" value={this.state.password}  onChange={this.onChange} />
                                </div>
                            </div>
                            <Link to="/" >Already Have Account?</Link>
                            <input type="submit" className="btn" value="Signup" />
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Signup
