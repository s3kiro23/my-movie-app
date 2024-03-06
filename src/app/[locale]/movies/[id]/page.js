import MovieDetails from "@/components/movie-details/MovieDetails";
import SimilarMedia from "@/components/similar-media/SimilarMedia";
import { getMediaByPath } from "@/utils/mediaClient";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

const MovieIdPage = async ({ params: { id, locale } }) => {
  const movie = await getMediaByPath(`/movie/${id}`, [], locale);

  if (!movie.original_title) {
    return notFound();
  }

  return (
    <div>
      <MovieDetails movie={movie} />
      <Suspense fallback={<p>Chargement...</p>}>
        <SimilarMedia movieId={movie.id} locale={locale} type="movie" />
      </Suspense>
    </div>
  );
};

export default MovieIdPage;
