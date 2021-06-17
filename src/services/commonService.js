export default class CommonService {

    async setToken(token) {
        let store = await localStorage.setItem('userToken', token);
        return store;
      }
      async getToken() {
        let token = await localStorage.getItem('userToken');
        return token;
      }
      async logout(){
        // let result = await localStorage.clear()
        let result = await localStorage.removeItem("userToken")
        return result
      }
}