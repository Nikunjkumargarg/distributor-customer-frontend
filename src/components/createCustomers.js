// src/components/CreateCustomer.js
import React, { useState } from "react";

export default function CreateCustomer() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const sendOtp = async () => {
    const res = await fetch("http://localhost:3000/customer/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ mobile_number: mobile }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("OTP sent to " + mobile);
      setOtpSent(true);
    } else {
      alert(data.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:3000/customer/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ mobile_number: mobile, otp }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("OTP verified successfully");
      setOtpVerified(true);
    } else {
      alert(data.message || "Invalid OTP");
    }
  };

  const createCustomer = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      return alert("Please verify OTP before creating customer.");
    }

    const res = await fetch("http://localhost:3000/customer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, mobile_number: mobile }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Customer created successfully");
      setName("");
      setMobile("");
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
    } else {
      alert(data.message || "Failed to create customer");
    }
  };

  return (
    <div className="container">
      <h2>Create Recipients</h2>
      <form onSubmit={createCustomer}>
        <input
          placeholder="Recipient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
            setOtpSent(false);
            setOtpVerified(false);
            setOtp("");
          }}
          required
        />
        {!otpSent && (
          <button type="button" onClick={sendOtp}>
            Send OTP
          </button>
        )}

        {otpSent && !otpVerified && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="button" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        <button type="submit" disabled={!otpVerified}>
          Create Customer
        </button>
      </form>
    </div>
  );
}
