import axios from "axios";

window.axios = axios;

axios.defaults.baseURL = `${DalifaBooks.baseUrl}/admin`;
axios.defaults.headers.common["X-CSRF-TOKEN"] = DalifaBooks.csrfToken;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
