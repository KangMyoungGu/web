import React, { Component } from "react";

import * as clientService from './clientService';

class inquirylist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inquiry : [],
            answer: []
        }
    } 

    componentDidMount = async() => {
        if(sessionStorage.getItem("id") == "" || sessionStorage.getItem("id") == null) {
            window.location = "/"
        }

        var inquiryData = await clientService.getMyInquiry(sessionStorage.getItem("id"))

        if(inquiryData.data != null) {
            this.setState({
                inquiry : inquiryData.data
            })
        }
    }

    inquiryregpage = () => {
        window.location = "/inquiry/reg";
    }

    showAnswer(data) {
        this.setState({
            answer : data.answer
        })
    }

    render(){
        return(
            <div style={{paddingLeft:'20px', top:'20px', position:'relative'}}>
                <div style={{position:'absolute', height:'24px', width:'800px'}}>
                    <div style={{float:'left',width:'100px'}}>No</div>
                    <div style={{float:'left',width:'200px'}}>제목</div>
                    <div style={{float:'left',width:'200px'}}>작성일자</div>
                    <div style={{float:'left',width:'100px'}}>답변여부</div>
                </div>
                <div style={{position:'absolute', top:'24px', height:'200px', width:'800px'}}>
                    <div style={{height:'200px', overflow:'auto', overflowX:'hidden'}}>
                    {
                        this.state.inquiry.map((item,idx) => {
                            if(item.answer_status === "S") {
                                return(
                                    <div key={idx} onClick={(event) => this.showAnswer(item)} style={{float:"left", width:"800px"}}>
                                        <div style={{float:'left',width:'100px'}}>{item.seq}</div>
                                        <div style={{float:'left',width:'200px'}}>{item.title}</div>
                                        <div style={{float:'left',width:'200px'}}>{item.register_date}</div>
                                        <div style={{float:'left',width:'100px'}}>답변완료</div>
                                    </div>
                                )
                            } else {
                                return(
                                    <div key={idx} style={{float:"left", width:"800px"}}>
                                        <div style={{float:'left',width:'100px'}}>{item.seq}</div>
                                        <div style={{float:'left',width:'200px'}}>{item.title}</div>
                                        <div style={{float:'left',width:'200px'}}>{item.register_date}</div>
                                        <div style={{float:'left',width:'100px'}}>답변대기중</div>
                                    </div>
                            )
                            }
                        })
                    }
                    </div>
                    <div style={{position:'absolute', top:'220px', height:'200px', overflow:'auto', overflowX:'hidden', width:'800px'}}>
                        {
                            this.state.answer.map((item,idx) => {
                                return(
                                    <div key={idx} style={{float:"left", width:"800px", paddingBottom:"5px"}}>
                                        <div>
                                            <span>답변제목</span>
                                            <input type="text" style={{width:"300px"}} disabled defaultValue={item.answer_title}></input>
                                        </div>
                                        <div>
                                            <div style={{float:"left"}}>
                                                <span>답변내용</span>
                                            </div>
                                            <div style={{float:"left"}}>
                                                <textarea rows="3" cols="41" defaultValue={item.answer_content} disabled></textarea>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
    
                </div>

                <div style={{position:'absolute', top:'460px', width:'800px'}}>
                    <button style={{float:'right'}} onClick={this.inquiryregpage}>문의하기</button>
                </div>              
            </div>
        )
    }
}
export default inquirylist;

