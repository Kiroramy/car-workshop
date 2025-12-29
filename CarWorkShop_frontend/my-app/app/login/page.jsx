"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { Button, Input, Card, Spacer } from "@nextui-org/react";
import { EyeFilledIcon } from "../EyeFilledIcon";
import { EyeSlashFilledIcon } from "../EyeSlashFilledIcon";
import AuthContext from "../context/AuthContext";
import "../css/signandlog.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
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
    await loginUser(formData);
    setIsSubmitting(false);
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f0f2f5", // Soft background color
      }}
    >
      <div
        style={{
          borderRadius: "15px",
          padding: "2px", // Outer container for gradient border
          background: "linear-gradient(135deg, #ff7eb3, #ff758c, #42a5f5)", // Gradient border
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional soft shadow
        }}
      >
        <Card
          style={{
            borderRadius: "13px",
            padding: "20px",
            backgroundColor: "white", // Inner container
          }}
        >
          <h1
            className={`${roboto.className} login-title`}
            style={{ textAlign: "center", fontSize: "24px", fontWeight: "700" }}
          >
            Log In
          </h1>
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              errorMessage={
                !formData.email.includes("@") && formData.email
                  ? "Invalid email address"
                  : undefined
              }
              fullWidth
            />
            <Spacer y={1.5} />
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
                  className="toggle-visibility"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              }
              fullWidth
            />
            <Spacer y={1.5} />
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                fontWeight: "bold",
                backgroundColor: "#42a5f5",
              }}
            >
              {isSubmitting ? "Submitting..." : "Log In"}
            </Button>
          </form>
          <Spacer y={1} />
          <div style={{ textAlign: "center" }}>
            <Link
              href="/signup"
              style={{
                color: "#42a5f5",
                textDecoration: "underline",
              }}
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
