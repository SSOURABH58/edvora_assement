import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "https://assessment.api.vweb.app" });

export interface AppContextInterface {
  user?: any;
  shops?: any;
  company?: any;
  login?: any;
  getShopData?: any;
  authState: boolean;
  [key: string]: any;
}

export const AuthCxt = React.createContext<AppContextInterface | null>(null);

export const AuthCxtProvider = ({ children }: any) => {
  const rout = useRouter();
  const [filters, setfilters] = useState({
    Products: "All",
    Location: "All",
    City: "All",
    Date: "Ascending",
    Time: "Ascending",
  });
  const [Store, setStore] = useState({
    authState: false,
    user: {},
    company: {},
    shops: {},
    errLogin: "",
  });
  const [isDark, setisDark] = useState(true);

  const switchDark = () => {
    setisDark(!isDark);
  };

  const login = async (creds: any) => {
    const res = await api.post("/login", creds).catch((err) => err);
    const data = res.data.data;
    console.log(data);
    if (!data) {
      setStore({
        ...Store,
        authState: false,
        errLogin: "Something went wrong",
      });
      rout.push("/login");
    } else {
      setStore({
        ...Store,
        authState: true,
        errLogin: "",
        user: data.user,
        company: data.company,
        shops: data.shop,
      });
      rout.push(`/${data.shop[0].shop_name}`);
    }
  };

  const addfilter = (selections: any) => {
    setfilters({ ...filters, ...selections });
  };

  const cxt = { ...Store, login, filters, addfilter, isDark, switchDark };
  return <AuthCxt.Provider value={cxt}>{children}</AuthCxt.Provider>;
};
