import React, { createContext, useState, ReactNode } from "react";
import { UserProfileTypes } from "../types/types.tsx";
import { toast } from "react-hot-toast";

export interface UserProfileContextProps {
  profile: UserProfileTypes | null;
  profileList: UserProfileTypes[];
  isLoading: boolean;
  hasError: boolean;
  getRandomUser: () => void;
  addToList: (id: string) => void;
  removeFromList: (id: string) => void;
}

const UserProfileContext = createContext<UserProfileContextProps>({
  profile: null,
  profileList: [],
  isLoading: false,
  hasError: false,
  getRandomUser: () => {},
  addToList: () => {},
  removeFromList: () => {},
});

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<UserProfileTypes | null>(null);
  const [profileList, setProfileList] = useState<UserProfileTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const getRandomUser = async () => {
    setIsLoading(true);
    try {
      const api = await fetch("https://randomuser.me/api");
      const data = await api.json();
      setProfile(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addToList = (id: string) => {
    if (profileList.some((profile) => profile.results[0].id.value === id)) {
      toast.error("User is already in the list");
    } else if (!profile) {
      return;
    } else {
      setProfileList((profileList) => [...profileList, profile]);
    }
  };

  const removeFromList = (id: string) => {
    setProfileList((prevList) =>
      prevList.filter((profile) => profile.results[0].id.value !== id)
    );
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        getRandomUser,
        addToList,
        removeFromList,
        profileList,
        isLoading,
        hasError,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContext;
