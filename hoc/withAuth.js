import React from "react";
import { useRouter } from "next/router";
import { useUser } from "@thirdweb-dev/react";

const withAuth = (Component) => {
  return (props) => {
    const router = useRouter();
    const user = localStorage.getItem("token") == null ? false : true;

    if (!user) {
      router.push("/login");
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
