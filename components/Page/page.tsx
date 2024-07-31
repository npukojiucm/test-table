"use client"

import styles from "./page.module.css";
import React, {JSX} from "react";
import {Modal} from "@/components/Modal/modal";
import {IPageProps} from "@/components/Page/page.props";

export const Page = ({optionValue, children}: IPageProps) => {
    const [isShow, setIsShow] = React.useState(false);

    return (
        <>
            <Modal show={isShow} setShow={setIsShow} optionValue={optionValue} />

            <header className={styles.header}>
                <h1>Журнал регистрации</h1>
            </header>

            <nav className={styles.nav}>
                <button
                    type={"button"}
                    className={styles.btn}
                    onClick={() => setIsShow(true)}>
                    Добавить
                </button>
            </nav>

            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}