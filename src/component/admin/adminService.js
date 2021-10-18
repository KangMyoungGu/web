import axios from 'axios';

let defaultUrl = "http://localhost:8080/inquiry"
let defaultLoginUrl = "http://localhost:8080/account"

export async function login(param) {
    const result = await axios({
        url : defaultLoginUrl + "/login",
        params : param,
        method: 'get'
    })

    return result.data;
}

export async function signUp(param) {
    const result = await axios({
        url : defaultLoginUrl + "/signup",
        method: 'post',
        data : param
    })

    return result.data;

}

export async function getInquirys() {
    const result = await axios({
        url : defaultUrl + "/",
        method: 'get',
        headers: {
            "token" : sessionStorage.getItem("toyToken")
        }
    })

    return result.data;

}

export async function assing(seq) {
    const result = await axios({
        url : defaultUrl + "/" + seq + "/assign",
        method: 'put',
        headers: {
            "token" : sessionStorage.getItem("toyToken")
        }
    })

    return result.data;
}

export async function getInquiryInfo(seq) {
    const result = await axios({
        url : defaultUrl + "/" + seq ,
        method: 'get',
        headers: {
            "token" : sessionStorage.getItem("toyToken")
        }
    })

    return result.data;
}

export async function saveAnswer(param, seq) {
    const result = await axios({
        url : defaultUrl + "/" + seq + "/answer",
        method: 'post',
        data : param,
        headers: {
            "token" : sessionStorage.getItem("toyToken")
        }
    })

    return result.data;

}