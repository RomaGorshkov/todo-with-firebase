import React from "react";
import { Box, Button, Grid, TextareaAutosize, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { addTodo } from "../../../store/slices/todosSlice";

import styles from "./CreateTodo.module.scss";

const CreateTodo: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const dispatch = useAppDispatch();
  const { isLoading, error: todoError } = useAppSelector(
    (state) => state.todos
  );

  const { user } = useAppSelector((state) => state.auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(
        addTodo({
          text: title,
          userId: user?.id || "",
          description: description,
          userDisplayName: user?.displayName || "",
        })
      ).unwrap();
      setTitle("");
      setDescription("");
    } catch (rejectedValueOrSerializedError) {
      console.error(
        "Failed to add todo from form:",
        rejectedValueOrSerializedError
      );
    }
  };

  return (
    <Grid className={styles.createTodo}>
      <Typography
        variant="h5"
        component="h2"
        className={styles.createTodo__title}
      >
        Create a New Todo
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={styles.createTodo__form}
      >
        <TextareaAutosize
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.createTodo__textarea}
          disabled={isLoading}
        />
        <TextareaAutosize
          minRows={3}
          placeholder="Enter todo description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.createTodo__textarea}
          disabled={isLoading || !user}
        />
        {todoError && (
          <Typography
            color="error"
            variant="body2"
            className={styles.createTodo__error}
          >
            Error: {todoError}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          className={styles.createTodo__button}
          sx={{ mt: 1 }}
          fullWidth
          disabled={isLoading || !title || !description}
        >
          {isLoading ? "Adding..." : "Add Todo"}
        </Button>
      </Box>
    </Grid>
  );
};

export default CreateTodo;
