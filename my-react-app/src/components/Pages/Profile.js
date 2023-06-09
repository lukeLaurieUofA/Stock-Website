/**
 * This is a reusable component which puts together all 
 * of the componets that makes up the profile page so the user 
 * can see login information about themselves.
 */
import "../../styles/commonStyle.css";
import Header from "../Header/Header";
import { useEffect, useState } from "react";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  useEffect(() => {
    loginInfo();
  }, []);
  const loginInfo = () => {
    fetch("http://stocksimulator.me:8080/user/summary", {
      method: "GET",
      credentials: "include"
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // sets the correct values
        setUsername(data.username);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        let totalBalnce = (Math.round(data.cashBalance * 100) / 100).toFixed(2);
        setAccountBalance(totalBalnce);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="topnav">
        <Header activePage={"profile"} />
      </div>
      <div className="accountInfo">
        <ul className="accountTable">
          <li><p>Username: {username}</p></li>
          <li><p>Email: {email}</p></li>
          <li><p>Phone Number: {phoneNumber}</p></li>
          <li><p>Current Balance: ${accountBalance}</p></li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
