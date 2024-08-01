import React, { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { Task } from "../interfaces/Task";
import axios from "axios";

export const TaskForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const addApi = "http://localhost:5118/api/tasks";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!description) {
      setError("Description is required.");
      setOpenSnackbar(true);
      return;
    }

    try {
      await axios.post<Task>(addApi, { description });
      setDescription("");
      onTaskAdded();
    } catch (error) {
      setError("Failed to add task. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const onTaskAdded = () => {
    // Reload screen when Task added
    window.location.reload();
    setShowAlert(true)
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Task Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!error}
        helperText={error}
        inputProps={{ maxLength: 200 }}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit">
        Add Task
      </Button>

      {showAlert && <Box my={2}>
        <Alert variant="outlined" severity="success">
          Task saved successfully
        </Alert>
      </Box>}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </Box>
  );
};
