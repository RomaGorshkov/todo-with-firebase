import React from "react";
import { Grid } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

import styles from "./Home.module.scss";
import CreateTodo from "../CreateTodo/CreateTodo";
import { useAppSelector } from "../../../store/storeHooks";
import Preloader from "../../shared/Preloader/Preloader";

const Home: React.FC = () => {
  const { items, isLoading } = useAppSelector((state) => state.todos);

  if (isLoading) return <Preloader />;

  return (
    <Grid className={styles.home}>
      <Grid className={styles.home__container}>
        <Grid className={styles.home__content}>
          <CreateTodo />
        </Grid>
      </Grid>
      <Grid className={styles.home__todos}>
        {items.map(
          ({
            id,
            text,
            completed,
            userDisplayName,
            createdAt,
            description,
          }) => (
            <Grid key={id} className={styles.home__todo}>
              <Grid className={styles.home__todoActions}>
                <button>
                  <FaEdit />
                </button>
                <button className="delete">
                  <FaTrash />
                </button>
              </Grid>
              <Grid className={styles.home__todoInfo}>
                <Grid className={styles.home__todoInfoName}>{text}</Grid>
                <Grid className={styles.home__todoInfoMeta}>
                  {new Date(createdAt).toLocaleString()} by {userDisplayName}
                </Grid>
              </Grid>
              <Grid className={styles.home__todoDescription}>
                {description}
              </Grid>
              <Grid
                className={`${styles.home__todoStatus} ${
                  completed
                    ? styles.home__todoStatusCompleted
                    : styles.home__todoStatusNotCompleted
                }`}
              >
                {completed ? "Completed" : "Not Completed"}
              </Grid>
            </Grid>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
