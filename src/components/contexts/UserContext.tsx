import React, { createContext, useEffect, useState } from "react";
import { DATABASE_ID, USER_COLLECTION_ID, account, database } from "../../appwrite/client";
import { toast } from "react-hot-toast";
import { Models } from "appwrite";
// Here we get the type of response we get from the account.get promise

export interface User extends Models.Document {
  name:string 
  accountId:string
  recipes:string 
  saved:string 
}

export interface IUserContext {
  user:User | null 
  loading: boolean
  getCurrentUser: () => void
  logout: () => void
}

export const UserContext = createContext<IUserContext>({
  user : null,
  loading: true,
  getCurrentUser: () => { return },
  logout: () => { return }
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    setLoading(true);
    try{
      const user = await account?.get()
      if(user){
        const userDetails = await database.getDocument(DATABASE_ID,USER_COLLECTION_ID,user?.$id)
        setUser(userDetails as User)
      }
    }catch(err:any){
      console.log(err)
    }finally{
      setLoading(false)
    }
  };

  const logout = () => {
    account
      .deleteSessions()
      .then(() => {
        setUser(null)
        toast("You have been logged out!")
        window.location.reload()
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <UserContext.Provider value={{ user, loading, getCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
