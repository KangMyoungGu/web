import axios from 'axios';

let defaultUrl = "http://localhost:8080/client/"

export async function getMyInquiry(userId) {
    const result = await axios({
        url : defaultUrl + userId + "/consult",
        method: 'get'
    })

    return result.data;
}

export async function saveInquiry(userId, param) {
    const result = await axios({
        url : defaultUrl + userId + "/consult",
        method: 'post',
        data : param
    })

    return result.data;

}