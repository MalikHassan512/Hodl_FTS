import { create } from "apisauce";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";
import vars from "../config/vars";
const baseURL = vars.API_URL
const apiClient = create({
  baseURL:baseURL ,
});

apiClient.addRequestTransform(request => {
  const authToken = store?.getState()?.auth?.token
 
  if (!authToken) return;
  request.headers.authorization = "Token " + authToken;
  // console.log('Request URL:', request.url);
  // console.log('Request Headers:', request.headers);
  // console.log('Request Data:', request.data);
});

apiClient?.addResponseTransform((response) => {
  // console.log('Response Status:', response.status);
  // console.log('Response Data:', response.data);
  // Handle response errors
  if (response.status === 401) {
    if(store?.getState()?.auth?.token){

      store.dispatch(logout())
    }

  } else if (response.status === 403) {
    // toast.error('Restricted Route!!');
  }
});

function setAuthToken(token) {
  apiClient.setHeader("authorization", `Bearer ${token}`);
}
// store.dispatch(logout())
export { setAuthToken };
export default apiClient;