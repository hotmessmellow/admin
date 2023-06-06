import httpCommon from "./http-common";

class AuthService {
  login(data) {
    return httpCommon.post("auth/signin", data);
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  register(data) {
    return httpCommon.post("auth/signup", data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getUsers() {
    return httpCommon.get("/users");
  }
}

export default new AuthService();
