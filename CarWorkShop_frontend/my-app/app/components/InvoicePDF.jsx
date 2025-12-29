"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { fontSize: 20, marginBottom: 20 },
  section: { marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

const InvoicePDF = ({ invoiceData = {} }) => {
      const [totalPrice, setTotalPrice] = useState(0);

  const [serviceRequest, setServiceRequest] = useState({
    id: "N/A",
    created_at: "N/A",
    vehicle: {
      user: { username: "N/A", email: "N/A" },
      model: "N/A",
      color: "N/A",
    },
    maintenance_type: "N/A",
    status: "N/A",
    cost: 0,
  });
  console.log(invoiceData[0].service_request);
  useEffect(() => {
    if (invoiceData) {
      setServiceRequest(invoiceData[0].service_request);
            setTotalPrice(invoiceData[0].total_price);

    }
  }, [invoiceData]);

  const { id, created_at, vehicle, maintenance_type, status, cost } =
    serviceRequest;

  const { user, model, color } = vehicle;

  // Calculate total price (assuming no taxes or discounts for simplicity)
  const total_price = cost;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Invoice #{id}</Text>
        <Text style={styles.section}>Date: {created_at}</Text>
        <Text style={styles.section}>Customer: {user?.username}</Text>
        <Text style={styles.section}>Email: {user?.email}</Text>
        <Text style={styles.section}>
          Vehicle: {model} ({color})
        </Text>
        <Text style={styles.section}>Maintenance Type: {maintenance_type}</Text>
        <Text style={styles.section}>Status: {status}</Text>
        <Text style={styles.section}>Service Cost: ${cost}</Text>
        <Text style={styles.section}>Total Price: ${totalPrice}</Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
