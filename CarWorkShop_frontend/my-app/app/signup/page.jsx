"use client";
import { useState, useContext } from "react";
import { Button, Input, Card, Spacer } from "@nextui-org/react";
import { EyeFilledIcon } from "../EyeFilledIcon";
import { EyeSlashFilledIcon } from "../EyeSlashFilledIcon";
import AuthContext from "../context/AuthContext";
import Link from "next/link";
import "../css/signandlog.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

function SignupPage() {
  const { signupUser } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await signupUser(formData);
    setIsSubmitting(false);
  };

  return (
    <div
      className="signup-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          borderRadius: "15px",
          padding: "2px",
          background: "linear-gradient(135deg, #42a5f5, #ff7eb3, #ff758c)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card
          style={{
            borderRadius: "13px",
            padding: "30px",
            backgroundColor: "white",
          }}
        >
          <h1
            className={`${roboto.className} signup-title`}
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div>
              <Input
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                fullWidth
              />
            </div>
            <div style={{ marginTop: "12px" }}>
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                errorMessage={
                  !formData.email.includes("@") && formData.email
                    ? "Invalid email address"
                    : undefined
                }
              />
            </div>
            <div style={{ marginTop: "12px" }}>
              <Input
                label="Password"
                name="password"
                type={isVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="Toggle password visibility"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                    }}
                  >
                    {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                  </button>
                }
                fullWidth
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  backgroundColor: "#42a5f5",
                  color: "white",
                  borderRadius: "8px",
                  padding: "12px 0",
                  marginTop: "12px",
                }}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </Button>
            </div>
          </form>
          <Spacer y={1} />
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Link
              href="/login"
              style={{
                color: "#42a5f5",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              Already have an account? Log In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SignupPage;
