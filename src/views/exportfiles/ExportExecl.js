import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useState } from "react";
import api from "api";

import { Button } from "reactstrap";

// Component
const ExportExecl = ({ Users, myHeader }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    let res = await api("get", `/admin/users/getalluserswithresult`);
    if (res) {
      let filterUserResults = res.users.filter((user) => user);
      let updatedUsers;

      if (filterUserResults.length > 0) {
        updatedUsers = filterUserResults.map((user) => {
          console.log("users for export ", user);
          return {
            Prénom: user.first_name,
            Nom: user.last_name,
            "Date de naissance": new Date(user.date_of_birth).toLocaleString(),
            addresse: user.address?.label,
            email: user.email,
            phone: user.phone,
            Classe: user.education_level,
            "Établissement actuel": user.institute,
            domain: user?.userResult?.domain,
            Last_answer: user?.userResult?.last_answer,
            Type_of_job: user?.userResult?.type_of_job,
            discriminateQ1: user?.userResult?.desc_answers[0]?.question
              ? user?.userResult?.desc_answers[0]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[0]?.answer
              : "",
            discriminateQ2: user?.userResult?.desc_answers[1]?.question
              ? user?.userResult?.desc_answers[1]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[1]?.answer
              : "",
            discriminateQ3: user?.userResult?.desc_answers[2]?.question
              ? user?.userResult?.desc_answers[2]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[2]?.answer
              : "",
            discriminateQ4: user?.userResult?.desc_answers[3]?.question
              ? user?.userResult?.desc_answers[3]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[3]?.answer
              : "",
            discriminateQ5: user?.userResult?.desc_answers[4]?.question
              ? user?.userResult?.desc_answers[4]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[4]?.answer
              : "",
            discriminateQ6: user?.userResult?.desc_answers[5]?.question
              ? user?.userResult?.desc_answers[5]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[5]?.answer
              : "",
            discriminateQ7: user?.userResult?.desc_answers[6]?.question
              ? user?.userResult?.desc_answers[6]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[6]?.answer
              : "",
            discriminateQ8: user?.userResult?.desc_answers[7]?.question
              ? user?.userResult?.desc_answers[7]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[7]?.answer
              : "",
            discriminateQ9: user?.userResult?.desc_answers[8]?.question
              ? user?.userResult?.desc_answers[8]?.question?.question +
                " - " +
                user?.userResult?.desc_answers[8]?.answer
              : "",
          };
        });
      }
      setLoading(false);
      // console.log("users for export ", updatedUsers);
      exportToCSV(updatedUsers, " données des utilisateurs");
    }
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
        disabled={loading}
      >
        {loading ? "Chargement en cours" : "Exporter excel"}
      </Button>
    </div>
  );
};

export default ExportExecl;
