import axios from 'axios'
const URI = 'http://192.168.20.208:5050/api'

export const upload = (file:File,onUploadProgress:any):Promise<any> => {
    let formData = new FormData()
    formData.append('file',file)

    return axios.post(`${URI}/uploadFile`,formData,{
        headers: {
            'Content-Type':'multipart/form-data'
        },
        onUploadProgress
    })
}   