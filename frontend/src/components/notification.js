import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import style from './pending.module.css'


export class notification extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             notifications : []
        }
    }
    

    componentDidMount(){
        axios({
            method: 'get',
            url: `https://switchon-backend-app.herokuapp.com/notification/${JSON.parse(localStorage.getItem('user'))._id}`,
            headers: {},
        }).then(res => {    
            console.log(res)
            if(res.data){
                this.state.notifications = [...res.data];
            }
            this.forceUpdate()
        }).catch(err => {
            console.log(err)
        })

    }

    delete = (notificationId) =>{
        axios({
            method: 'delete',
            url: `https://switchon-backend-app.herokuapp.com/notification/${notificationId}`,
            headers: {},
        }).then(res => {    
            console.log(res)
            this.state.count=0
            this.componentDidMount()
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        let count=1
        return (
            <div>
            <Navbar/>
            {/* <br/> */}
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Notification</th>
                        <th scope="col">Date </th>
                        <th scope="col">Time </th>
                        <th scope="col">Delete </th>
                    </tr>
                </thead>
            
               
                    {
                      this.state.notifications.length>0? this.state.notifications.map(element=>(
                         <tbody key={element._id }>
                            <tr>
                                <th scope="row">{count++}</th>
                                <td>{element.notification}</td>
                                <td>{element.date}</td>
                                <td>{element.time}</td>
                                <td>
                                    <button className={style.reject}  onClick={this.delete.bind(this,element._id)} >Delete</button>
                                </td>
                            </tr>
                         </tbody>

                    )):null}
                   
            </table>
            {this.state.notifications.length==0?<div><h1 className={style.text}>Loadng...</h1></div>:null}
        </div>

        )
    }
}

export default notification
