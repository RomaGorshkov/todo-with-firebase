import React from "react";
import { Grid } from "@mui/material";

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
              <Grid
                className={styles.home__todoInfo}
                style={{ padding: "10px" }}
              >
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {text}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#555",
                    textAlign: "right",
                  }}
                >
                  {new Date(createdAt).toLocaleString()}
                  <br />
                  <span style={{ fontStyle: "italic" }}>
                    by {userDisplayName}
                  </span>
                </div>
              </Grid>

              <Grid
                className={styles.home__todoDescription}
                style={{ padding: "0 10px 5px" }}
              >
                {description}
              </Grid>

              <Grid
                className={`${styles.home__todoStatus} ${
                  completed ? styles.home__todoStatusCompleted : ""
                }`}
                style={{
                  padding: "0 10px 10px",
                  fontWeight: "bold",
                  color: completed ? "green" : "red",
                }}
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
