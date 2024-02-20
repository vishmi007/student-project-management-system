import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const GreetingMessage = () => {
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {

    axiosPrivate
      .get("/get-user-info") 
      .then((response) => {
        const userInfo = response.data;

        setLoggedInUserName(userInfo.firstName);
      })
      .catch((error) => {
        console.error("Error fetching user's information:", error);
      });
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="font-weight-bold fs-4">
        Hi! {loggedInUserName}
      </p>
      <p className="font-weight-bold fs-2">
        Welcome Home
      </p>
    </div>
  );
  
};

export default GreetingMessage;
