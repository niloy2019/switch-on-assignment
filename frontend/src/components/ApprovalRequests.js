import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import style from './pending.module.css'


export class ApprovalRequests extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             requests:[],
             created_by_id:''
        }
    }
    
    componentDidMount(){
        console.log("component did mount called")
        this.state.requests=[]
        let userId=JSON.parse(localStorage.getItem('user'))._id
        axios({
            method: 'get',
            url: `https://switchon-backend-app.herokuapp.com/request/user/waitingforapproval/${userId}`,

        }).then(res => {          
            console.log("Fetched all Approval Tickets from Database")
            console.log(res.data)
           res.data.forEach(element => {
                this.state.requests.push(element)
           });
          this.forceUpdate()        
        }).catch(err => {
            console.log(err)
        })
    }

    approve = (reqId) => {
        console.log("Approve method called")
        axios({
            method: 'post',
            url: `https://switchon-backend-app.herokuapp.com/request/update/${reqId}/approved`,
        }).then(res => { 
         this.componentDidMount()                 
        }).catch(err => {
            console.log(err)
        })
    
        this.state.requests.map(req => {
            if(req._id==reqId){
               this.state.created_by_id=req.created_by_id
            }
        })
        console.log(this.state.created_by_id)

        axios({
            method: 'post',
            url: `https://switchon-backend-app.herokuapp.com/notification/add`,
            headers: {},
            data : {
                user_id: this.state.created_by_id,
                notification:`Your ticket is approved by ${JSON.parse(localStorage.getItem('user')).name}`,
                date :  `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                time: `${new Date().getHours()}:${new Date().getMinutes()}`
            } 
        }).then(res => {    
            console.log(res)
        //    this.forceUpdate()
        }).catch(err => {
            console.log(err)
        })

    }

    reject = (reqId) => {
        console.log("Approve method called")
        axios({
            method: 'post',
            url: `https://switchon-backend-app.herokuapp.com/request/update/${reqId}/rejected`,
        }).then(res => { 
         this.componentDidMount()                
        }).catch(err => {
            console.log(err)
        })

        this.state.requests.map(req => {
            if(req._id==reqId){
               this.state.created_by_id=req.created_by_id
            }
        })
        console.log(this.state.created_by_id)

        axios({
            method: 'post',
            url: `https://switchon-backend-app.herokuapp.com/notification/add`,
            headers: {},
            data : {
                user_id: this.state.created_by_id,
                notification:`Your ticket is rejected by ${JSON.parse(localStorage.getItem('user')).name}`,
                date :  `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                time: `${new Date().getHours()}:${new Date().getMinutes()}`
            } 
        }).then(res => {    
            console.log(res)
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
                            <th scope="col">Created by</th>
                            <th scope="col">Date Created</th>
                            <th scope="col">Time Created</th>
                            <th scope="col">Status</th>
                            <th scope="col">Assigned department</th>
                            <th scope="col">Assigned person</th>
                            <th scope="col">Message</th>
                            <th scope="col">Approve/Reject</th>
                        </tr>
                    </thead>
                
                   
                        {
                          this.state.requests.length>0? this.state.requests.map(element=>(
                             <tbody key={element._id }>
                                <tr>
                                    <th scope="row">{count++}</th>
                                    <td>{element.created_by}</td>
                                    <td>{element.date}</td>
                                    <td>{element.time}</td>
                                    <td>{element.status}</td>
                                    <td>{element.assigned_department}</td>
                                    <td>{JSON.parse(localStorage.getItem('user')).name}</td>
                                    <td>{element.message}</td>
                                    <td>
                                        <button className={style.approve} onClick={this.approve.bind(this,element._id)} >Approve</button>
                                        <button className={style.reject}  onClick={this.reject.bind(this,element._id)} >Reject</button>
                                    </td>
                                </tr>
                             </tbody>

                        )):null}
                       
                </table>
                {this.state.requests.length==0?<div><h1 className={style.text}>Loadng...</h1></div>:null}
            </div>
        )
    }
}

export default ApprovalRequests
