import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      // Redirect user to Docusign login
      const { data } = await axios.get("/login");
      window.location.href = data.redirect_url;
    } catch (error) {
      console.error("Error during login redirect:", error);
    }
  };

  useEffect(() => {
    // Handle callback once redirected back from Docusign
    const fetchAccessToken = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");

      if (code) {
        try {
          const response = await axios.get(`/callback?code=${code}`);
          setAccessToken(response.data.access_token);

          // Redirect to a secure page or notify the user
          navigate("/dashboard"); // Example redirection after successful login
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };

    fetchAccessToken();
  }, [location, navigate]);

  return (
    <div>
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Docusign</button>
      ) : (
        <p>Logged in! Access Token: {accessToken}</p>
      )}
    </div>
  );
};
