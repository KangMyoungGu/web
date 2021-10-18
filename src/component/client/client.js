import React, { Component } from "react";

class client extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id : ""
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    executeClient = () => {
        if(this.state.id === "") {
            alert("ID를 입력해주세요.");
        } else {
            sessionStorage.setItem("id", this.state.id);
            window.location = "/inquiry/list"
        }
    }
    render(){
        return(
            <div>
                <div>
                    <span>작성자 ID : </span>
                    <input type="text" name="id" placeholder="id를 입력해주세요." onChange={this.handleInputChange}></input>
                    <button onClick={this.executeClient}> 확인 </button>
                </div>              
            </div>
        )
    }
}
export default client;

