import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import {Redirect} from 'react-router-dom'
import style from './pending.module.css'


export class Home extends Component {
    
    constructor(props) {
        super(props)   
        let user= JSON.parse(localStorage.getItem('user'))
        this.state = {
            users:[],
            createdBy:user.name,
            department:'',
            assignedPersonId:'',
            message:'',
            assignedPersonName:'',
            submit:false,
            departmentList:[]
        }
        this.onChange=this.onChange.bind(this)
        this.getDepartment=this.getDepartment.bind(this)
        this.submitForm=this.submitForm.bind(this)
        
        if(user.department!="Marketing"){
            this.state.departmentList.push("Marketing")
        }

        if(user.department!="Finance"){
            this.state.departmentList.push("Finance")
        }

        if(user.department!="Operations management"){
            this.state.departmentList.push("Operations management")
        }

        if(user.department!="Human Resource"){
            this.state.departmentList.push("Human Resource")
        }

        if(user.department!="IT"){
            this.state.departmentList.push("IT")
        }

        console.log(this.state.departmentList)


    }


    getDepartment = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
        console.log(event.target.value)
        this.state.users=[]
        axios.get(`https://switchon-backend-app.herokuapp.com/user/department/${event.target.value}`)
        .then(res => {          
          res.data.forEach(element => {
              this.state.users.push(element)
          });
          console.log(res.data)
          if(res.data.length==0){
              this.state.users=[]
          }
          console.log(this.state.users)
          this.forceUpdate() 
        })
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitForm(e){
        e.preventDefault();
        console.log("Form submitting")
        this.state.users.map(user => {
            if(user._id==this.state.assignedPersonId){
                this.state.assignedPersonName=user.name
                console.log("Name:"+this.state.assignedPersonName)
            }
        })
        console.log(this.state)
        axios({
            method: 'post',
            url: `https://switchon-backend-app.herokuapp.com/request/add`,
            headers: {},
            data : {
                status: "pending",
                created_by: this.state.createdBy ,
                created_by_id:  JSON.parse(localStorage.getItem('user'))._id,
                assigned_person: this.state.assignedPersonId ,
                assigned_department: this.state.department,
                message: this.state.message ,
                assigned_person_name: this.state.assignedPersonName,
                date :  `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                time: `${new Date().getHours()}:${new Date().getMinutes()}`
            } 
        }).then(res => {          
        //    res.json()
           this.state.submit=true
           this.forceUpdate()
        }).catch(err => {
            console.log(err)
        })
        
        axios({
            method: 'post',
            url: `https://switchon-backend-app.herokuapp.com/notification/add`,
            headers: {},
            data : {
                user_id: this.state.assignedPersonId,
                notification:`You  have a new Request from ${JSON.parse(localStorage.getItem('user')).name}`,
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

    render() {
        if(localStorage.getItem("user")==null){
            return <Redirect  to="/" />
        }

        if(this.state.submit){
            this.state.submit=false
            return <Redirect  to="/submit" />
        }

        return (
            
            <div>   <Navbar/>
                    <form onSubmit={this.submitForm} >
                        <div class="form-group">
                            <label className={style.text}>Created By</label>
                            <input type="text" class="form-control" required  name="createdBy" value={this.state.createdBy}  onChange={this.onChange} />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1" className={style.text} >Department</label>
                            <select value={this.state.department} required name="department" class="form-control" id="exampleFormControlSelect1" onChange={this.getDepartment} >
                                <option selected >Choose one department</option>
                                {this.state.departmentList.map(element => (
                                     <option value={element} key={element} >{element}</option> 
                                ))}
                            </select>
                        </div>
                         
                        <div class="form-group">
                            <label for="exampleFormControlSelect1" className={style.text}>User</label>
                            <select value={this.state.assignedPersonId} required class="form-control" name="assignedPersonId" id="exampleFormControlSelect1"   onChange={this.onChange}  >
                               <option selected >Choose one user</option>
                                {this.state.users.map(element => (
                                     <option value={element._id} key={element._id} >{element.name}</option> 
                                ))}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label className={style.text}>Message</label>
                            <textarea value={this.state.message} id="w3review" required name="message" rows="7" cols="50" class="form-control" formControlName="name" onChange={this.onChange} />
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
            </div>
        )
    }
}

export default Home
