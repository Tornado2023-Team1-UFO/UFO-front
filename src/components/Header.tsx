"use client"

import styles from './header.module.css'
import Link from 'next/link'
import { FiLogIn } from 'react-icons/fi'
export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <p>
                        <Link className={styles.link} href="/">ロゴ</Link>
                    </p>
                </div>
                <div className={styles.login}>
                    <FiLogIn className={styles.icon} /> 
                    <p> 
                        <Link className={styles.link} href="/register">ログイン / 新規会員登録</Link>
                    </p>
                </div>
            </header>
        </>
    )
}