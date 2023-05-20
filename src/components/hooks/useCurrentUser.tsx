import { useContext } from "react";
import UserContext,{type IUserContext} from "../contexts/UserContext";

const useCurrentUser = () => {
  const currentUser = useContext<IUserContext>(UserContext);
  return currentUser;
};

export default useCurrentUser;
