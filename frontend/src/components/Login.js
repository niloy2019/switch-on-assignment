import React, { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import './login.css'
import axios from 'axios';


export class Login extends Component {

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
             loggedIn,
             name:'',
             imageUrl:'',
             users:[],
             response: {}
        }

        this.onChange=this.onChange.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `https://switchon-backend-app.herokuapp.com/user`,
            headers: {}, 
        }).then(res => {          
        //    res.data.map(element => {
        //       this.state.users.push(element)
        //    });
             this.state.users = [...res.data];
             console.log(res)
        }).catch(err => {
            console.log(err)
        })
        this.state.users.map(element=>{
            console.log(element)
        })
    }
    
    submitForm(e){
        e.preventDefault();
        const {username,password} = this.state

        this.state.users.map(element => {
            if(element.name===username && element.password===password){
                console.log("Logged in")
                localStorage.setItem("user",JSON.stringify(element))
                // localStorage.setItem("name",`${element._id}`)
                this.forceUpdate()
            }
        })
    }


    render() {

        if(localStorage.getItem("user")){
            return <Redirect  to={{
                                    pathname:'/home',
                                    state:{
                                        name:this.state.username,
                                        imageUrl:''
                                    } 
                                }}  
                    />
        }



        return (
            <div >
                <img className="wave" src={require('./img/wave.png')} alt="wave.png" />
                <div className="container">
                    <div className="img">
                        <img src={require('./img/bg.svg')} alt="bg.svg" />
                    </div>
                    <div className="login-content">
                        <form onSubmit={this.submitForm}>
                            <img src={require('./img/avatar.svg')} alt="avatar.svg" />
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                                 <div className="i">
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                    <input type="text" placeholder="Username" required className="input" name="username" value={this.state.username}  onChange={this.onChange} />
                                 </div>
                           </div>
                            <div className="input-div pass">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <input type="password" placeholder="Password"   className="input" name="password" value={this.state.password}  onChange={this.onChange} />
                                </div>
                            </div>
                            <Link to="/signup" >Don't Have an Account?</Link>
                            {/* <a href="#" ></a> */}
                            <input type="submit" className="btn" value="Login" />
                            
    
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Login
