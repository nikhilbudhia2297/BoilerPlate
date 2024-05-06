// import Axios, {AxiosInstance, AxiosRequestConfig} from "axios";
// import {Service} from "typedi";
// import {getClientSessionToken, getIdToken, getLanguageCode, getTraceId} from "../utils/RequestContextUtil";
//
// @Service()
// export class BaseClient{
//     baseClient : AxiosInstance;
//
//     constructor(config : AxiosRequestConfig) {
//         this.baseClient = Axios.create(config);
//
//         this.baseClient.interceptors.request.use(request =>{
//             request.headers['id-token'] = getIdToken();
//             request.headers['trace-id'] = getTraceId();
//             request.headers['languageid'] = getLanguageCode() || "en";
//             request.headers['session-token'] = getClientSessionToken();
//             return request;
//         });
//     }
//
//     public setHeaders(headers : Map<string, string>){
//         this.baseClient.interceptors.request.use(request=>{
//             headers.forEach( (value, header)=>{
//                 request.headers[header] = value;
//             })
//             return request;
//         });
//     }
// }