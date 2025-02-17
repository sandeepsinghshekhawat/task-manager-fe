import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const baseUrl = "http://localhost:5118";
  const getApi = `${baseUrl}/api/tasks`;
  const deleteApi = `${baseUrl}/api/tasks`;

  // Calls get api and fetches Tasks from BE
  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(getApi);
      setTasks(response.data);
    } catch (error) {
      setError("Failed to fetch tasks. Please try again.");
      setOpenSnackbar(true);
    }
  };

  // Handler for delete button, it deletes the task item
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${deleteApi}/${id}`);
      // after deletion again call get api to get the updated tasks list
      fetchTasks();
    } catch (error) {
      setError("Failed to delete task. Please try again.");
      setOpenSnackbar(true);
    }
  };

  // empty useEffect to fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  // close handler for snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.description} />
            <Button
              variant="text"
              color="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Delete
            </Button>
            <Dialog
              open={isModalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure, you want to delete the task?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Description of Task: {task.description}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsModalOpen(false)}>No</Button>
                <Button
                  onClick={() => {
                    handleDelete(task.id!);
                    setIsModalOpen(false);
                  }}
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </>
  );
};
