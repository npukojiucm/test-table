"use server"

import {Pool, QueryResult} from 'pg';
import {CandidateInterface, FormDataInterface} from "@/interfaces/interfaces";
import {revalidatePath} from "next/cache";
import {ListTables, Query} from "@/interfaces/types";

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
});

export const getOptionValue = async (list: ListTables):
    Promise<QueryResult<Query>> => {
    return await pool.query(`
    SELECT
        *
    FROM
        ${list}
  `);
};

// @ts-ignore
export const createCandidate = async (prevState, formData: FormData) => {
    const candidate = {
        ...Object.fromEntries(formData),
    } as unknown as FormDataInterface;

    if (!candidate.name) {
        return {
            message: "Имя обязательно для заполнения",
            success: false,
        }
    }

    candidate.phone = candidate.phone.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/g,
        "+$1 ($2) $3-$4-$5");
    const checkPhone = await checkDuplicatePhone(candidate.phone);
    if (checkPhone.rows.length > 0) {
        return {
            phone: "Данный номер уже зарегистрирован",
            success: false,
        }
    }

    candidate.date = new Date(candidate.date).toLocaleString("ru", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    await pool.query(
        `
        INSERT INTO candidates
          (name, manager_id, phone, date, age, region, trailer_length, experience, source, refer, security, convoy_id,
              medical, comment)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `,
        [
            candidate.name,
            Number(candidate.manager_id),
            candidate.phone,
            candidate.date,
            Number(candidate.age),
            candidate.region,
            candidate.trailer_length,
            candidate.experience,
            candidate.source,
            candidate.refer,
            candidate.security,
            Number(candidate.convoy_id),
            candidate.medical,
            candidate.comment

        ],
    );

    revalidatePath('/');

    return {
        success: true
    }

}

export const getCandidates = async (): Promise<QueryResult<CandidateInterface>> => {
    return await pool.query(`
        SELECT c.name, c.phone, c.date, c.age, c.region, c.trailer_length,
            c.experience, c.source, c.refer, c.security, c.medical, c.comment,
            m.name as manager_name, mc.name as convoy_name
        FROM candidates c
        LEFT OUTER JOIN managers m ON c.manager_id = m.id
        LEFT OUTER JOIN managers_convoy mc ON c.convoy_id = mc.id
  `);
}

const checkDuplicatePhone = async (phone: string): Promise<QueryResult<CandidateInterface>> => {
    return await pool.query(`
    SELECT
        *
    FROM
        candidates
    WHERE
        phone = ($1)
  `,
        [
            phone
        ]);
}