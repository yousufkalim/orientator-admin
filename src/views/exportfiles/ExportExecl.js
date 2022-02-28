import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useState } from "react";

import { Button } from "reactstrap";

// Component
const ExportExecl = ({ Users, myHeader }) => {
  // Exporting

  // File Type
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // Extension
  const fileExtension = ".xlsx";
  const exportToCSV = (csvData, fileName) => {
    // Sorting

    const ws = XLSX.utils.json_to_sheet(csvData, { header: myHeader });

    const wb = { Sheets: { users: ws }, SheetNames: ["users"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const e_data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(e_data, fileName + fileExtension);
  };

  // exporting excel
  const handleSubmitExcel = async (Users) => {
    let updatedUsers;
    if (Users.length > 0) {
      updatedUsers = Users.map((user) => {
        return {
          Prénom: user.first_name,
          Nom: user.last_name,
          "Date de naissance": new Date(user.date_of_birth).toLocaleString(),
          addresse: user.address.label,
          email: user.email,
          phone: user.phone,
          Classe: user.education_level,
          "Établissement actuel": user.institute,
        };
      });
    }
    console.log("users for export ", updatedUsers);
    exportToCSV(updatedUsers, " données des utilisateurs");
  };

  // Render
  return (
    <div className="d-flex justify-content-between ">
      <h3 className="mb-0">Utilisateurs</h3>
      <Button
        color="primary"
        href="#pablo"
        onClick={(e) => {
          handleSubmitExcel(Users);
        }}
        size="md"
      >
        Exporter excel
      </Button>
    </div>
  );
};

export default ExportExecl;
