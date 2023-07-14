import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const useUserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { address, isConnecting, isDisconnected } = useAccount()

  const addUser = async ({wallet }) => {
    setLoading(true);
    setError(null);

    try {

      

 
             // Check if wallet already exists
      const existingUser = await fetch(`/api/user/getUser?walletAddress=${wallet}`);

      console.log(existingUser)
    
        if (await existingUser.json()) {
          console.log("USER",)
          throw new Error("Wallet already exists.");
        }
   
    
      
      const createUs = await fetch("/api/user/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            wallet
        }),
      });

      console.log(createUs)

    } catch (error) {
      setError("Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (walletAddress) => {
    setLoading(true);
    setError(null);

    try {
      await prisma.user.delete({
        where: {
          wallet: walletAddress,
        },
      });
    } catch (error) {
      setError("Failed to remove user.");
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    setLoading(true);
    setError(null);

    if(address)
{
    try {
      const userResponse = await fetch(
        `/api/user/getUser?walletAddress=${address}`
      );

      if (userResponse.ok) {
        const user = await userResponse.json();
        return user;
      } else {
        throw new Error("Failed to get user.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
}
  
  };

  return { loading, error, addUser, removeUser,  getUser };
};

export default useUserManagement;