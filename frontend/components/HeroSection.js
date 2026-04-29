import Link from 'next/link';
import ParticleCanvas from './ParticleCanvas';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.heroSection}>

            {/* Deep Black Overlay */}
            <div className={styles.videoOverlay}></div>

            {/* Floor Reflection */}
            <div className={styles.floorReflection}></div>

            {/* Interactive Particles Canvas */}
            <ParticleCanvas />

            {/* Main Content Overlay */}
            <div className={styles.heroContent}>
                <div className={styles.brandContainer}>
                    <img 
                        src="/ImperialMotors1/images/imperial motors logo negro.png" 
                        alt="Imperial Motors Logo" 
                        className={styles.heroLogo} 
                    />
                    <h1 className={styles.heroTitle}>IMPERIAL MOTORS</h1>
                    <p className={styles.heroSubtitle}>LUXURY BEYOND MOTION</p>
                </div>

                <div className={styles.ctaContainer}>
                    <Link href="/models" className={styles.btnPrimary}>
                        Discover the Fleet
                    </Link>
                    <Link href="/contact" className={styles.btnSecondary}>
                        Request Consultation
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <span>Explore</span>
                <div className={styles.scrollLine}></div>
            </div>
        </section>
    );
}
