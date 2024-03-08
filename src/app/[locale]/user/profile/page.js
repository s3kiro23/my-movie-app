import LogoutButton from "@/components/logout-button/LogoutButton";
import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@/utils/prisma";
import { getHydratedMedia } from "@/utils/mediaClient";
import MediaCard from "@/components/media-card/MediaCard";
import styles from "./page.module.scss";
import { getDictionary } from "@/utils/dictionaries";

const ProfilePage = async ({ params: { locale } }) => {
  const i18n = await getDictionary(locale);

  const { user: userSession } = await getServerSession();

  const { mediaLikes } = await prisma.user.findFirst({
    where: {
      email: userSession.email,
    },
    include: {
      mediaLikes: true,
    },
  });


  const movies = await getHydratedMedia(
    mediaLikes.map((media) => media.mediaId),
    "movie",
    locale,
  );

  console.log(movies);

  return (
    <div className={styles.profile}>
      <div className={styles.head}>
        <h1>{i18n.profile.title}</h1>
        <LogoutButton i18n={i18n.profile.logout} />
      </div>
      <div className={styles.list}>
        {movies.map(
          (movie) => (
            (movie.genres = movie.genres.map((genre) => genre.name)),
            (
              <MediaCard
                key={movie.id}
                media={movie}
                locale={locale}
                genres={movie.genres}
                type="movie"
              />
            )
          ),
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
