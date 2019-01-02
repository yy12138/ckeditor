let baseUrl = process.env.NODE_ENV === "production" ? "http://47.**.***.***:8000/api/" : "/box/";
let base = "http://47.**.***.***:8000/";

export default{
    base: base,
    baseUrl: baseUrl,
    // 登陆
    login: baseUrl + 'account/systemadmingettoken/',
    // 上传
    upload: baseUrl + 'uploadfile/uploadfile/',
    // news
    news: baseUrl + 'articlemanage/tenewsarticle/',
    // newsClassify
    newsClassify: baseUrl + 'articlemanage/tenewsarticleclassify/'
}
