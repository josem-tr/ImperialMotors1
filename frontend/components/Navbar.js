'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/models', label: 'Models' },
        { href: '/bespoke', label: 'Bespoke' },
        { href: '/heritage', label: 'Heritage' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLogo}>
                <Link href="/" className={styles.navLogoLink}>
                    <Image
                        src="/ImperialMotors1/images/imperial motors logo negro.png"
                        alt="IM Logo"
                        width={40}
                        height={40}
                        className={styles.navImg}
                    />
                    <span>IMPERIAL MOTORS</span>
                </Link>
            </div>
            <ul className={styles.navLinks}>
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className={styles.navExtra}>
                <Link href="/models" className={styles.btnNav}>
                    Reserve
                </Link>
            </div>
        </nav>
    );
}
