import React, { Component } from "react";

import * as clientService from './clientService';

class inquiryreg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title : "",
            content: ""
        }
    } 
    componentDidMount = async() => {
        if(sessionStorage.getItem("id") == "" || sessionStorage.getItem("id") == null) {
            window.location = "/"
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    beforeUrl = async() => {
        window.location = document.referrer;
    }

    saveInquiry = async () => {
        if(this.state.title == "" || typeof this.state.title == "undefined") {
            alert("문의 제목을 입력해주세요.")
            return;
        }

        if(this.state.content == "" || typeof this.state.content == "undefined") {
            alert("문의 내용을 입력해주세요.")
            return;
        }

        var result = await clientService.saveInquiry(sessionStorage.getItem("id"), this.state);

        alert(result.retMsg);

        if(result.retCode == "0") {
            window.location = document.referrer;
        }

    }
    render(){
        return(
            <div style={{paddingLeft:'20px', top:'20px', position:'relative'}}>
                <div style={{width:"400px"}}>
                    <span>문의 제목</span>
                    <input type="text" placeholder="문의제목을 입력해주세요" name="title" style={{width:"300px"}} onChange={this.handleInputChange}></input>
                </div>

                <div style={{width:"400px"}}>
                    <div style={{float:"left"}}>
                        <span>문의 내용</span>
                    </div>
                    <div style={{float:"left"}}>
                        <textarea name="content" cols="40" rows="20" onChange={this.handleInputChange}></textarea>
                    </div>
                </div>

                <div style={{position:'absolute', top:'424px', width:'370px'}}>
                    <button style={{float:'right'}} onClick={this.saveInquiry}>문의등록</button>
                    <button style={{float:'right'}} onClick={this.beforeUrl}>취소</button>
                </div>              
            </div>
        )
    }
}
export default inquiryreg;

