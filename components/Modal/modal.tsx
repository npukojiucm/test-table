// @ts-nocheck
import styles from "./modal.module.css"
import React, {JSX, useEffect, useState} from "react";

import {createCandidate} from "@/libs/db";
import {useFormState} from "react-dom";
import {IModalProps} from "@/components/Modal/modal.props";
import {ListTables} from "@/interfaces/types";


export const Modal = ({optionValue, show, setShow}: IModalProps): JSX.Element | null => {
    const [state, formAction] = useFormState(createCandidate, {})
    const [phone, setPhone] = useState('')


    const options = (value: IModalProps["optionValue"], table: ListTables) => {
        if (table == 'managers' || table == 'managers_convoy') {
            return value[table].map(row => <option key={row.id} value={row.id}>{row.name}</option>)
        }

        if (table == 'work_experience') {
            return value[table].map(row => <option key={row.experience}
                                                   value={row.experience}>{row.experience}</option>)
        }

        if (table == 'medical_inspections') {
            return value[table].map(row => <option key={row.medical} value={row.medical}>{row.medical}</option>)
        }

        if (table == 'sources') {

            return value[table].map(row => <option key={row.source} value={row.source}>{row.source}</option>)
        }

        if (table == 'regions') {
            return value[table].map(row => <option key={row.region} value={row.region}>{row.region}</option>)
        }

        if (table == 'trailers_length') {
            return value[table].map(row => <option key={row.length} value={row.length}>{row.length}</option>)
        }
    }

    const clickCloseHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (target.children.length == 1 && target.children[0].tagName === 'FORM') {
            setShow(false)
        }
    }

    const onChangePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value;

        value = e.target.value;
        value = value.replace(/[^\d]/g, '');

        setPhone(value);
    }

    useEffect(() => {
        if (state?.success) setShow(false);
    }, [state]);

    if (!show) return null;


    return (
        <div className={styles.container} id="container" onClick={clickCloseHandler}>
            <form className={styles.form} action={formAction} name={'newCandidate'}>
                <h1>Кандидат</h1>

                <div className={styles.wrapper}>
                    <div>
                        <label htmlFor="manager_id">Менеджер</label>
                        <select id="manager_id" name="manager_id">
                            {options(optionValue, 'managers')}
                        </select>

                    </div>

                    <div>
                        <label htmlFor="date">Дата созвона</label>
                        <input id="date" name="date" type="date"/>
                    </div>

                    <div className={styles.stripe}></div>

                    <div className={styles.candidate}>
                        <label htmlFor="name">Кандидат, ФИО </label>
                        <input id="name" name="name" type="text" placeholder="Николаев Николай Николаевич"/>
                        {state?.message && <p>{state.message}</p>}
                    </div>


                    <div>
                        <label htmlFor="phone">Телефон</label>
                        <input id="phone" name="phone" type="tel" onChange={onChangePhoneHandler}
                               value={phone} placeholder='79002344545'/>
                        {state?.phone && <p className={styles.message}>{state.phone}</p>}
                    </div>


                    <div>
                        <label htmlFor="age">Возраст</label>

                        <input id="age" name="age" type="number"/>
                    </div>

                    <div>
                        <label htmlFor="region">Область/край</label>
                        <select id="region" name="region">
                            {options(optionValue, 'regions')}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="trailer_length">Длина прицепа</label>
                        <select id="trailer_length" name="trailer_length">
                            {options(optionValue, 'trailers_length')}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="experience">Стаж на фурах</label>
                        <select id="experience" name="experience">
                            {options(optionValue, 'work_experience')}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="medical">Медосмотр</label>
                        <select id="medical" name="medical">
                            {options(optionValue, 'medical_inspections')}
                        </select>
                    </div>

                    <div className={styles.stripe}></div>

                    <div>
                        <label htmlFor="source">Источник</label>
                        <select id="source" name="source">
                            {options(optionValue, 'sources')}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="refer">ФИО кто привел</label>
                        <input id="refer" name="refer" type="text" placeholder="Николаев Петр Валерьянович"/>
                    </div>

                    <div>
                        <label htmlFor="security">Результат СБ</label>
                        <input id="security" name="security" type="text" placeholder={'Одобрено / Отказ'}/>
                    </div>

                    <div>
                        <label htmlFor="convoy_id">Начальник Автоколонны</label>
                        <select id="convoy_id" name="convoy_id">
                            {options(optionValue, 'managers_convoy')}
                        </select>
                    </div>


                    <div className={styles.comment}>
                        <label htmlFor="comment">Комментарий</label>
                        <textarea id="comment" name="comment" className={styles.textarea}
                                  placeholder={'Ведите дополнительную информацию о кандидате'}/>
                    </div>

                    <button className={styles.btn_save} type={'submit'}>Сохранить</button>
                    <button
                        className={styles.btn_cancel}
                        type={'button'}
                        onClick={() => setShow(false)}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>

    )
}
