import styles from "./CastList.module.css";

type CastMember = {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

interface Props {
  cast: CastMember[];
}

const CastList: React.FC<Props> = ({ cast }) => {
  if (!cast.length) return null;

  return (
    <section className={styles.castSection}>
      <h2>Top Cast</h2>
      <div className={styles.castList}>
        {cast.map((actor) => (
          <div key={actor.cast_id} className={styles.castCard}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://via.placeholder.com/185x278?text=No+Image"
              }
              alt={actor.name}
            />
            <p>
              <strong>{actor.name}</strong>
            </p>
            <p>as {actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastList;
