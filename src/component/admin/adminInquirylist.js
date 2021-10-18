import React, { Component } from "react";

import * as adminService from './adminService';

class adminInquirylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inquiry : [],
            choiceInquiry : {}
        }

        this.assingInquiry = this.assingInquiry.bind()
        this.pollingData = this.pollingData.bind()
    }
    componentDidMount = async() => {
        if(sessionStorage.getItem("toyToken") == null) {
            window.location = "/admin";
        } else {

            var result = await adminService.getInquirys();

            this.setState({
                inquiry: result.data
            })
        }

        this.interval = setInterval(this.pollingData, 3000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    pollingData = async() => {
        var result = await adminService.getInquirys();

        this.setState({
            inquiry: result.data
        })
    }

    selectInquiry(data) {
        this.setState({
            choiceInquiry : data
        })
    }

    assingInquiry = async() => {
        if(typeof this.state.choiceInquiry.seq == "undefined") {
            alert("답변할 문의를 선택해주세요.")
            return false
        }

        if(this.state.choiceInquiry.answer_status == "R") {
            var isConfirm = window.confirm("담당자 지정이 되지 않은 문의입니다. 먼저 담당자로 지정하시겠습니까?");

            if(isConfirm) {
                var result = await adminService.assing(this.state.choiceInquiry.seq);

                alert(result.retMsg)

                if(result.retCode == 0) {
                    window.location = "/admin/inquiry/answer?seq=" + this.state.choiceInquiry.seq
                }
            }
        } else {
            window.location = "/admin/inquiry/answer?seq=" + this.state.choiceInquiry.seq
        }
    }


    render(){
        return(
            <div style={{paddingLeft:'20px', top:'20px', position:'relative'}}>
                <div style={{position:'absolute', height:'24px', width:'750px'}}>
                    <div style={{float:'left',width:'100px'}}>No</div>
                    <div style={{float:'left',width:'200px'}}>제목</div>
                    <div style={{float:'left',width:'200px'}}>작성일자</div>
                    <div style={{float:'left',width:'250px'}}>답변여부</div>
                </div>
                <div style={{position:'absolute', top:'24px', height:'400px', overflow:'auto', overflowX:'hidden', width:'750px'}}>
                    {
                        this.state.inquiry.map((item,idx) => {
                            return(
                                <div key={idx} onClick={(event) => this.selectInquiry(item)}>
                                    <div style={{float:'left',width:'100px'}}>{item.seq}</div>
                                    <div style={{float:'left',width:'200px'}}>{item.title}</div>
                                    <div style={{float:'left',width:'200px'}}>{item.register_date}</div>
                                    <div style={{float:'left',width:'250px'}}>{item.answer_status === "R"?"답변대기중":"답변대기중 (담당자 지정완료)"}</div>
                                </div>
                            )
                        })
                    }
                </div>


                <div style={{position:'absolute', top:'424px', height:'400px', overflow:'auto', overflowX:'hidden', width:'750px'}}>
                    <span>문의제목 : </span>
                    <input type="text" defaultValue={this.state.choiceInquiry.title} style={{width:"300px"}} disabled></input>
                </div>
                <div style={{position:'absolute', top:'450px', height:'400px', overflow:'auto', overflowX:'hidden', width:'750px'}}>
                    <div style={{float:"left"}}>
                        <span>문의 내용 : </span>
                    </div>
                    <div style={{float:"left"}}>
                        <textarea cols="40" rows="20" disabled defaultValue={this.state.choiceInquiry.content}></textarea>
                        <br/>
                        <button style={{float:"right"}} onClick={this.assingInquiry}>답변달기</button>
                    </div>
                </div>

            </div>
        )
    }
}
export default adminInquirylist;

