"use client";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import "../css/home.css";
import { motion } from "framer-motion"; // For animations
import { usePathname, useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";

function NavbarComp() {
  const router = useRouter();
  const pathname = usePathname();
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authTokens) {
      router.push("/login");
    }
  }, [authTokens]);

  // Detect mobile devices
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || "";
      setIsMobile(/android.+mobile|ip(hone|[oa]d)/i.test(userAgent));
    }
  }, []);

  // Render auth actions
  const renderAuthActions = () => {
    if (authTokens) {
      return (
        <NavbarItem>
          <div style={{ display: "flex" }}>
            <i
              className="fa fa-sign-out navbar-icon"
              style={{ color: "blue", fontSize: "20px", marginRight: "3px" }}
            />
            <h6 className="navbar-link" onClick={() => logoutUser()}>
              Logout
            </h6>
          </div>
        </NavbarItem>
      );
    }
    return (
      <>
        <NavbarItem>
          <i
            className="fa fa-sign-in navbar-icon"
            style={{ color: "blue", fontSize: "20px", marginRight: "2px" }}
          />
          <Link href="/login" className="navbar-link">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <i
            className="fa fa-user-plus navbar-icon"
            style={{
              color: "blue",
              fontSize: "20px",
              marginRight: "2px",
              marginLeft: "15px",
            }}
          />
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  };

  return (
    <Navbar shouldHideOnScroll variant="floating" className="navbar">
      <NavbarBrand>
        <motion.p
          className="font-bold text-inherit"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
        >
          {isMobile ? "Mobile ACME" : "ACME"}
        </motion.p>
      </NavbarBrand>
      <NavbarContent className="navbar-links">
        {!isMobile && (
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <div style={{ display: "flex" }}>
              {pathname === "/friends-posts" ? (
                <NavbarItem style={{ marginRight: "15px" }}>
                  <i className="fa fa-globe navbar-icon" />
                  <Link href="/home" className="navbar-link">
                    Global
                  </Link>
                </NavbarItem>
              ) : (
                <NavbarItem style={{ marginRight: "15px" }}>
                  <i className="fa fa-users navbar-icon" />
                  <Link href="/friends-posts" className="navbar-link">
                    Friends
                  </Link>
                </NavbarItem>
              )}
              <NavbarItem style={{ marginRight: "15px" }}>
                <i className="fa fa-user navbar-icon" />
                <Link href="/profile" className="navbar-link">
                  Profile
                </Link>
              </NavbarItem>
              <NavbarItem>
                <i className="fa fa-video-camera navbar-icon" />
                <Link href="/reals" className="navbar-link">
                  Videos
                </Link>
              </NavbarItem>
              <NavbarItem style={{ marginLeft: "15px" }}>
                <i className="fa fa-shopping-basket navbar-icon" />
                <Link href="/shop" className="navbar-link">
                  Shopping
                </Link>
              </NavbarItem>
            </div>
          </motion.div>
        )}
      </NavbarContent>
      <NavbarContent justify="end">{renderAuthActions()}</NavbarContent>
    </Navbar>
  );
}

export default NavbarComp;
