import React, { Component } from "react";

import * as adminService from './adminService';

class adminInquiryanswer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inquiry : []
        }
    }
    componentDidMount = async() => {
        if(sessionStorage.getItem("toyToken") == null) {
            window.location = "/admin";
        } else {
            var seq = new URLSearchParams(this.props.location.search).get('seq');
        
            var result = await adminService.getInquiryInfo(seq)
            
            if(result.retCode != "0") {
                alert(result.retMsg);
                window.location = "/admin/inquiry/";
            } else {
                this.setState({
                    inquiry : result.data[0]
                })
            }
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    beforUrl() {
        window.location = "/admin/inquiry/"
    }

    saveAnswer = async() => {
        if(typeof this.state.answer_title == "undefined" || this.state.answer_title == null) {
            alert("답변 제목을 입력해주세요")
            return
        }

        if(typeof this.state.answer_content == "undefined" || this.state.answer_content == null) {
            alert("답변 내용을 입력해주세요")
            return
        }

        var param = {
            "answer_title" : this.state.answer_title,
            "answer_content" : this.state.answer_content,
        }

        var result = await adminService.saveAnswer(param, this.state.inquiry.seq);

        alert(result.retMsg)
        if(result.retCode == "0") {
            window.location = "/admin/inquiry/"
        }
    }

    render(){
        return(
            <div style={{paddingLeft:'20px', top:'20px', position:'relative'}}>
                <div style={{position:'absolute', height:'400px', overflow:'auto', overflowX:'hidden', width:'750px'}}>
                    <span>문의제목 : </span>
                    <input type="text" defaultValue={this.state.inquiry.title} style={{width:"300px"}} disabled></input>
                </div>
                <div style={{position:'absolute', top:'30px', height:'400px', overflow:'auto', overflowX:'hidden', width:'750px'}}>
                    <div style={{float:"left"}}>
                        <span>문의 내용 : </span>
                    </div>
                    <div style={{float:"left"}}>
                        <textarea cols="40" rows="20" disabled defaultValue={this.state.inquiry.content}></textarea>
                    </div>
                </div>

                <div style={{position:'absolute', top:'400px', height:'400px', overflow:'auto', overflowX:'hidden', width:'750px'}}>
                    <span>답변제목 : </span>
                    <input type="text" name="answer_title" style={{width:"300px"}} onChange={this.handleInputChange}></input>
                </div>
                <div style={{position:'absolute', top:'430px', height:'400px', overflow:'auto', overflowX:'hidden', width:'750px'}}>
                <div style={{float:"left"}}>
                        <span>답변 내용 : </span>
                    </div>
                    <div style={{float:"left"}}>
                        <textarea cols="40" rows="20" name="answer_content" onChange={this.handleInputChange}></textarea>
                    </div>
                    <button style={{float:"right"}} onClick={this.beforUrl}>취소</button>
                    <button style={{float:"right"}} onClick={this.saveAnswer}>저장</button>
                </div>
            </div>
        )
    }
}
export default adminInquiryanswer;

