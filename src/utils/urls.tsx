//PREPROD
// const baseURL = "https://api.preprod.odesco.l-wa.com";
//DEV
const baseURL = "https://dev-saas-api.odesco.education"

export const urls = {
    //DEV
    baseURL,
    apiURL: baseURL,

    root: baseURL,
    login: "/api/users/login",
    users: "/api/users",
    posts: "/api/posts",
    comments: "/api/comments",
    mesInstitutions: "api/config/institutions/me",
    likes: "api/likes",
    configInst: "/api/config/institutions",
    events: "/api/events",
    invitations: "/api/invitations",
    schoolingPrivateTeachers: "/api/schooling/teachers/private",
    schoolingTeachers: "/api/schooling/teachers",
    schoolingPartners: "/api/schooling/partners",
    schoolingNetwork: "/api/schooling/network",
    chat :"/api/chat",
};