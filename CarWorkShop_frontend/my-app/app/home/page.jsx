"use client";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion"; // For animations
import "../css/home.css";
import istock from "../../public/istock.jpg";
import NavbarComp from "../components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";
import { cn } from "@nextui-org/theme";

function Page() {
  const [Cars, setCars] = useState([]); // Initialize as an empty array
  const [isMobile, setIsMobile] = useState(true);
  const { authTokens } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!authTokens) {
      router.push("/login");
    }
  }, [authTokens]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          "http://192.168.1.3:8000/api/vehicles/owned/",

          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        setCars(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || "";
      setIsMobile(/android.+mobile|ip(hone|[oa]d)/i.test(userAgent));
    }
  }, []);

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavbarComp />
      <hr className="separator" />
      <motion.div
        className="body-content"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: 21, fontWeight: "bold" }}>Your Cars</h1>

        <div className="create-post" style={{ width: "30%" }}>
          {Cars?.map((car) => (
            <div
              onClick={() => router.push(`/car/details/${car.slug}`)}
              key={car.pk}
            >
              <Image
                src={istock}
                width={275}
                height={75}
                alt="Car Image"
                className="avatar-image"
                style={{ borderRadius: "10px", justifySelf: "center" }}
              />
              <h1
                className="create-post-text"
                style={{
                  alignItems: "center",

                  fontSize: 20,
                  justifySelf: "center",
                  marginTop: "10px",
                }}
              >
                {car.model}
              </h1>
            </div>
          ))}
        </div>

        {isMobile ? (
          <>
            {isMobile}

            <motion.div
              className="mobile-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="new-posts-title-phone">New Posts</h1>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="desktop-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <hr className="separator" />
            <h1 className="new-posts-title">New Posts</h1>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Page;
