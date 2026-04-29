import ModelCard from '../../components/ModelCard';
import styles from './models.module.css';

export const metadata = {
    title: 'Imperial Motors - Collections',
    description:
        'Explore our world-renowned collections: Lamborghini, Pagani, Koenigsegg, Bugatti, Porsche, and Dodge.',
};

const carsData = [
    {
        image: '/ImperialMotors1/images/lamborghini_cat.png',
        alt: 'Lamborghini Collection',
        heritage: 'Italy',
        focus: 'Raw Emotion',
        name: 'Lamborghini',
        description:
            "Pure adrenaline. Engineering excellence from Sant'Agata Bolognese, redefining the limits of visual and auditory drama.",
    },
    {
        image: '/ImperialMotors1/images/foto_pagani_final.jpg',
        alt: 'Pagani Collection',
        heritage: 'Modena',
        focus: 'Automotive Art',
        name: 'Pagani',
        description:
            "Automobile art. Horacio Pagani's vision of technical perfection where every bolt is a masterpiece of design.",
    },
    {
        image: '/ImperialMotors1/images/koenigsegg_cat.png',
        alt: 'Koenigsegg Collection',
        heritage: 'Sweden',
        focus: 'Innovation',
        name: 'Koenigsegg',
        description:
            'The ghost in the machine. Breaking the laws of physics with revolutionary engineering and unmatched top speeds.',
    },
    {
        image: '/ImperialMotors1/images/bugatti_cat.png',
        alt: 'Bugatti Collection',
        heritage: 'France',
        focus: 'Ultimate Grandeur',
        name: 'Bugatti',
        description:
            "Beyond speed. The pinnacle of automotive luxury and dominance, crafting the world's most sophisticated hyper-tourers.",
    },
    {
        image: '/ImperialMotors1/images/porsche_cat.png',
        alt: 'Porsche Collection',
        heritage: 'Germany',
        focus: 'Precision Engineering',
        name: 'Porsche',
        description:
            'Precision heritage. The gold standard for track-worthy street machines, where form follows function without compromise.',
    },
    {
        image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=1000&auto=format&fit=crop',
        alt: 'Dodge Collection',
        heritage: 'USA',
        focus: 'Raw Muscle',
        name: 'Dodge',
        description:
            'Raw power. American muscle engineered for the ultimate thrill, dominating the road with unapologetic mechanical force.',
    },
];

export default function ModelsPage() {
    return (
        <main className={styles.modelsPage}>
            {/* Page Header */}
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>The Collections</h1>
                <p className={styles.pageSubtitle}>World-Renowned Engineering Excellence</p>
            </header>

            {/* Models Grid */}
            <section className={styles.modelsGrid}>
                {carsData.map((car) => (
                    <ModelCard key={car.name} {...car} />
                ))}
            </section>
        </main>
    );
}
