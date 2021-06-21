import { constants } from '../constants';
import Axios from '../helper/axios.helper';
export default class CommonService {

    async setToken(data) {
        let store = await localStorage.setItem('userData', data);
        return store;
      }
      async getToken() {
        let token = await localStorage.getItem('userData');
        return token;
      }
      async logout(){
        // let result = await localStorage.clear()
        let result = await localStorage.removeItem("userData")
        return result
      }

      async getenum () {
        let response = await Axios.get(`${constants.apiEndPoint}general/enumMaps`)
        return response
      }
}