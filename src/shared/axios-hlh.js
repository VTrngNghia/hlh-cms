import axios from "axios";

const instance = axios.create({
  baseURL: "https://hanoilindyhop.firebaseio.com/",
});

instance.interceptors.request.use(req => {
  // console.log("Request Success:", req);
  return req;
}, err => {
  console.log("Request Error:", err);
  return err;
});

instance.interceptors.response.use(
  res => {
    // console.log("Response Success:", res);
    return res;
  }, err => {
    console.log("Response Error:", err);
    return err;
  });


export default instance;
