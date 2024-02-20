import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import Spinner from "react-bootstrap/Spinner";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth;

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{ minHeight: "100vh", color: "#297AC5" }}
        >
          <Spinner animation='border' />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
