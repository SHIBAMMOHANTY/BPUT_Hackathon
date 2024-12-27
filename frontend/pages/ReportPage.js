import React from "react";
import { View } from "react-native";
import ReportForm from "../component/Entryinfo/ReportForm";

const ReportPage = () => {
  const handleReportSubmit = (formData) => {
    console.log("Report Submitted:", formData);
    // Implement backend API call or local storage here
  };

  return (
    <View>
      <ReportForm onSubmit={handleReportSubmit} />
    </View>
  );
};

export default ReportPage;
