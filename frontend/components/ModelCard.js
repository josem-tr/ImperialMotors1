import Link from 'next/link';
import styles from './ModelCard.module.css';

export default function ModelCard({ image, alt, heritage, focus, name, description, slug, buttonText, buttonHref }) {
    return (
        <article className={styles.modelCard}>
            <div className={styles.modelImageContainer}>
                {/* Using regular img for external URLs and local files */}
                <img src={image} alt={alt} className={styles.modelImg} />
                <div className={styles.modelOverlay}>
                    <span className={styles.modelSpec}>Heritage: {heritage}</span>
                    <span className={styles.modelSpec}>Focus: {focus}</span>
                </div>
            </div>
            <div className={styles.modelInfo}>
                <h2 className={styles.modelName}>{name}</h2>
                <p className={styles.modelDesc}>{description}</p>
           <Link href={buttonHref || `/models/Cars/${slug}`}>
        {buttonText || "View collection"}
      </Link>
            </div>
        </article>
    );
}
