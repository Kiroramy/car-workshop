"use client";

import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../components/InvoicePDF";

export default function page() {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.3:8000/api/invoice/details/"
        );
        const data = await response.json();
        setInvoiceData(data[0]); // Assuming the API returns an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Invoice Generator</h1>
      {invoiceData && (
        <PDFDownloadLink
          document={<InvoicePDF {...invoiceData} />}
          fileName="invoice.pdf"
        >
          {({ loading }) =>
            loading ? "Generating PDF..." : "Download Invoice"
          }
        </PDFDownloadLink>
      )}
    </div>
  );
}
