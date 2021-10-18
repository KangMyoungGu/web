import React, { Component } from "react";

import * as adminService from './adminService';

class admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId : "",
            password: ""
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

    login = async() => {
        if(this.state.userId == "" || typeof this.state.userId == "undefined") {
            alert("ID를 입력해주세요.")
            return;
        }

        if(this.state.password == "" || typeof this.state.password == "undefined") {
            alert("password를 입력해주세요.")
            return;
        }


        var result = await adminService.login(this.state);

        if(result.retCode == "0") {
            sessionStorage.setItem("toyToken", result.token);
            window.location  = "/admin/inquiry";
        } else {
            alert(result.retMsg);
        }
    }

    signup() {
        window.location = "/admin/signup"
    }

    render(){
        return(
            <div>
                <div>
                <span> ID : </span>
                    <input type="text" name="userId" placeholder="id를 입력해주세요." onChange={this.handleInputChange}></input>
                </div>              

                <div>
                    <span> Password : </span>
                    <input type="password" name="password" placeholder="패스워드를 입력해주세요." onChange={this.handleInputChange}></input>
                </div>              

                <button onClick={this.login}> 확인 </button>
                <button onClick={this.signup}> 계정등록 </button>
            </div>
        )
    }
}
export default admin;

