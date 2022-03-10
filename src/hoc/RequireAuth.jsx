import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuthForProfile = ({ children }) => {
   const location = useLocation();
   const { userInfo } = useSelector(state => state.userSlice)

   return userInfo ? (children) : <Navigate to="/login" state={{ from: location }} />
}

export default RequireAuthForProfile;

