import React, { Component } from "react";

import * as adminService from './adminService';

class signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId : "",
            password: "",
            userName: "",
            checkPassword: ""
        }
    }

    componentDidMount = () => {
        if(sessionStorage.getItem("toyToken") != null) {
            window.location = "/admin/inquiry";
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    singup = async() => {
        if(this.state.userId == "" || typeof this.state.userId == "undefined") {
            alert("ID를 입력해주세요.")
            return;
        }

        if(this.state.password == "" || typeof this.state.password == "undefined") {
            alert("password를 입력해주세요.")
            return;
        }

        if(this.state.userName == "" || typeof this.state.userName == "undefined") {
            alert("이름을 입력해주세요.")
            return;
        }

        if(this.state.checkPassword == "" || typeof this.state.checkPassword == "undefined" || this.state.password !== this.state.checkPassword) {
            alert("password를 다시확인해주세요.")
            return;
        }


        var result = await adminService.signUp(this.state);

        alert(result.retMsg);
        if(result.retCode == "0") {
            window.location  = "/admin";
        }
    }

    render(){
        return(
            <div>
                <div style={{width:"300px"}}>
                    <span> ID : </span>
                    <input type="text" name="userId" placeholder="id를 입력해주세요." onChange={this.handleInputChange} style={{float:"right"}}></input>
                </div>              

                <div style={{width:"300px"}}>
                    <span> 이름 : </span>
                    <input type="text" name="userName" placeholder="이름을 입력해주세요." onChange={this.handleInputChange} style={{float:"right"}}></input>
                </div>              

                <div style={{width:"300px"}}>
                    <span> Password : </span>
                    <input type="password" name="password" placeholder="패스워드를 입력해주세요." onChange={this.handleInputChange} style={{float:"right"}}></input>
                </div>              

                <div style={{width:"300px"}}>
                    <span> check Password : </span>
                    <input type="password" name="checkPassword" placeholder="패스워드를 재입력해주세요." onChange={this.handleInputChange} style={{float:"right"}}></input>
                </div>              

                <div style={{width:"300px", paddingTop:"10px"}}>
                    <button onClick={this.singup} style={{float:"right"}}> 확인 </button>
                </div>
            </div>
        )
    }
}
export default signup;

