import axios from "axios";
import API_URL from "../Config"
const URL = API_URL+"/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          return response.data
        }
      })
      .catch(e => {
        if (e.message == "Request failed with status code 401") {
          throw new Error("Niepoprawny login lub hasło");
        }
        else {
          console.log(e)
          console.log(e.message)
          console.log(e.response)
          throw new Error(e.response);
        }
      })
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();