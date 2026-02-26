import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import adminApi from "../utils/adminAxiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
} from "@mui/material";

const formatLabel = (label) =>
  label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await adminApi.get(
          "/admin/getstudents"
        );
        console.log("Students fetched:", response.data);
        setStudents(response.data);
      } catch (error) {
        const errMsg = error?.response?.data?.message || error.message || "Error fetching students";
        console.error("Error fetching students:", error);
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const exportToExcel = () => {
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;
    };

    const cleanedData = students.map(
      ({ _id, __v, createdAt, updatedAt, ...rest }) => ({
        ...rest,
        createdAt: formatDate(createdAt),
        updatedAt: formatDate(updatedAt),
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "StudentData.xlsx");
  };

  return (
    <Card sx={{ m: 3, p: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" fontWeight="bold">
            Manage Students
          </Typography>
          <Button variant="contained" color="success" onClick={exportToExcel} disabled={students.length === 0}>
            Download Excel
          </Button>
        </Grid>

        {error && (
          <div style={{ backgroundColor: "#ffebee", color: "#c62828", padding: "12px", borderRadius: "4px", marginBottom: "16px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <Typography sx={{ textAlign: "center", py: 3 }}>
            Loading students...
          </Typography>
        )}

        {!loading && students.length === 0 && !error && (
          <Typography sx={{ textAlign: "center", py: 3, color: "text.secondary" }}>
            No students found
          </Typography>
        )}

        {!loading && students.length > 0 && (
          <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                {[
                  "Sr No",
                  "Name",
                  "Enrollment No",
                  "College",
                  "Branch",
                  "City",
                  "Actions",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={student._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.enrollmentNo}</TableCell>
                  <TableCell>{student.college}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.city}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(student)}
                    >
                      More Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </CardContent>

      {/* Student Details Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Student Details
          <IconButton onClick={handleClose} sx={{ color: "grey.700" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedStudent && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {Object.entries(selectedStudent)
                    .filter(
                      ([key]) =>
                        !["_id", "createdAt", "updatedAt", "__v"].includes(key)
                    )
                    .map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                          {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                        </TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ManageStudents;