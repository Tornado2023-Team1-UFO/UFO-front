"use client"

import styles from './header.module.css'
import Link from 'next/link'
import { FiLogIn } from 'react-icons/fi'
export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <p>ロゴ</p>
                </div>
                <div className={styles.login}>
                    <FiLogIn className={styles.icon} /> 
                    <p> ログイン / 新規会員登録</p>
                </div>
            </header>
        </>
    )
}