import React, { createContext, useEffect, useState } from "react";
import { account } from "../../libs/appwrite";

// Here we get the type of response we get from the account.get promise
type User = Awaited<ReturnType<typeof account.get>> | null;

export interface IUserContext {
  user:User 
  loading:boolean 
  getCurrentUser: ()=> void
  logout: ()=> void
}
export const UserContext = createContext<IUserContext>({
  user:null,
  loading:true,
  getCurrentUser:()=> {return},
  logout:()=>{return}
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    setLoading(true);
    if(!user){
      account
      .get()
      .then((response) => {
        console.log("user", response);
        setUser(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    }
  };

  const logout = () => {
    account
      .deleteSessions()
      .then(() => console.log("Logged out successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <UserContext.Provider value={{ user, loading, getCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
