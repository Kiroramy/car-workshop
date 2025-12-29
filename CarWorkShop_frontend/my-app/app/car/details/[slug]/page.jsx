"use client";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import "../../../css/comments.css";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import AuthContext from "../../../context/AuthContext";
import NavbarComp from "@/app/components/navbar";
import istock from "../../../../public/istock.jpg";
import Timeline from "@/app/components/timeline";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../../components/InvoicePDF";

function Page() {
  const { slug } = useParams();
  const router = useRouter();
  const [allcarData, setAllCarData] = useState(null);
  const [carDataOnly, setCarDataOnly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { authTokens } = useContext(AuthContext);
  const [mainCarData, setMainCarData] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);

  // Fetch invoice data
  async function fetchInvoiceData(invoiceSlug) {
    try {
      const response = await axios.get(
        `http://192.168.1.3:8000/api/invoice/details/${invoiceSlug}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      setInvoiceData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      return null;
    }
  }

  // Set main car data
  useEffect(() => {
    if (allcarData) {
      setMainCarData(allcarData[0].vehicle);
      // Fetch invoice data as soon as car data is available
      fetchInvoiceData(allcarData[0].slug);
    }
  }, [allcarData]);

  // Redirect to login if no auth tokens
  useEffect(() => {
    if (!authTokens?.access) {
      router.push("/login");
    }
  }, [authTokens, router]);

  // Fetch car data
  useEffect(() => {
    if (!slug) {
      setError(true);
      return;
    }

    async function fetchCarData() {
      try {
        setLoading(true);

        // Try fetching data from the first API
        const response = await axios.get(
          `http://192.168.1.3:8000/api/service-requests/details/${slug}/`,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          setAllCarData(response.data);
        } else {
          // If no data is found, try the fallback API
          const fallbackResponse = await axios.get(
            `http://192.168.1.3:8000/api/vehicles/details/${slug}/`,
            {
              headers: {
                Authorization: `Bearer ${authTokens?.access}`,
              },
            }
          );

          if (fallbackResponse.data) {
            setCarDataOnly(fallbackResponse.data);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch car data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCarData();
  }, [slug, authTokens]);

  if (loading) return <p>جاري التحميل...</p>;
  if (error)
    return <p>فشل في تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.</p>;
  if (!carDataOnly && !allcarData) return <p>لا توجد معلومات بعد.</p>;

  return (
    <div className="page-container">
      <NavbarComp />
      <hr className="separator" />

      <div className="body-content">
        <h1 style={{ fontSize: 21, fontWeight: "bold" }}>تفاصيل السيارة</h1>

        {allcarData && mainCarData ? (
          <div>
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
              style={{ fontSize: 20, marginTop: "10px" }}
            >
              {mainCarData.model}
            </h1>
            <p
              className="create-post-text"
              style={{ fontSize: 15, marginTop: "10px" }}
            >
              {mainCarData.year}
            </p>
          </div>
        ) : null}

        {allcarData
          ? allcarData.map((car) => (
              <div key={car.id}>
                {invoiceData ? (
                  <PDFDownloadLink
                    document={<InvoicePDF invoiceData={invoiceData} />}
                    fileName="invoice.pdf"
                  >
                    {({ loading }) =>
                      loading ? "Generating PDF..." : "Download Invoice"
                    }
                  </PDFDownloadLink>
                ) : (
                  <p>Loading invoice data...</p>
                )}
                <Timeline status={car.status} />
              </div>
            ))
          : carDataOnly && (
              <div
                onClick={() => router.push(`/car/details/${carDataOnly.slug}`)}
                key={carDataOnly.id}
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
                  style={{ fontSize: 20, marginTop: "10px" }}
                >
                  {carDataOnly.model}
                </h1>
                <p
                  className="create-post-text"
                  style={{ fontSize: 15, marginTop: "10px" }}
                >
                  {carDataOnly.year}
                </p>
              </div>
            )}
      </div>
    </div>
  );
}

export default Page;
