import { getMovieByPath } from "@/utils/movieClient";
import React from "react";
import styles from "./SimilarMovies.module.scss";
import MediaCard from "../media-card/MediaCard";

const SimilarMovies = async ({ movieId }) => {
  const { results } = await getMovieByPath(`/movie/${movieId}/similar`);
  const { genres } = await getMovieByPath("/genre/movie/list");

  return (
    <div className={styles.similar}>
      <div className={styles.list}>
        {results
          .slice(0, 6)
          .map(
            (movie) => (
              (movie.genre_ids = genres
                .filter((genre) => movie.genre_ids.includes(genre.id))
                .map((genre) => genre.name)),
              (
                <MediaCard
                  media={movie}
                  key={movie.id}
                  genres={movie.genre_ids}
                />
              )
            ),
          )}
      </div>
    </div>
  );
};

export default SimilarMovies;