import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import style from './pending.module.css'

export class Rejected extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             requests:[]
        }
    }
    
    componentDidMount(){
        console.log("component did mount called")
        this.state.requests=[]
        this.state.count=0
        let userId=JSON.parse(localStorage.getItem('user'))._id
        axios({
            method: 'get',
            url: `https://switchon-backend-app.herokuapp.com/request/user/status/${userId}/rejected`,

        }).then(res => {          
           res.data.forEach(element => {
                this.state.requests.push(element)
           });
          this.forceUpdate()        
        }).catch(err => {
            console.log(err)
        })
    }

    render() {

        console.log("Render method called")

        let count=1

        return (
            <div>
                <Navbar/>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created by</th>
                            <th scope="col">Date Created</th>
                            <th scope="col">Time Created</th>
                            <th scope="col">Assigned department</th>
                            <th scope="col">Assigned person</th>
                            <th scope="col">Message</th>
                        </tr>
                    </thead>
                
                   
                        {
                          this.state.requests.length>0? this.state.requests.map(element=>(
                             <tbody key={element._id }>
                                <tr>
                                    <th scope="row">{count++}</th>
                                    <td>{element.status}</td>
                                    <td>{element.created_by}</td>
                                    <td>{element.date}</td>
                                    <td>{element.time}</td>
                                    <td>{element.assigned_department}</td>
                                    <td>{element.assigned_person_name}</td>
                                    <td>{element.message}</td>
                                </tr>
                             </tbody>

                        )):null}
                       
                </table>
                {this.state.requests.length==0?<div><h1 className={style.text}>Loadng...</h1></div>:null}
            </div>
        )
    }
}

export default Rejected
