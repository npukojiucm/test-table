import styles from "./table.module.css";
import {getCandidates} from "@/libs/db";
import {CandidateInterface} from "@/interfaces/interfaces";


export const Table = async () => {
    const candidates = await getCandidates();

    const rows = (candidates: CandidateInterface[]) => {
        return candidates.map(candidate => (
            <tr key={candidate.phone}>
                <td>{candidate.name}</td>
                <td>{candidate.manager_name}</td>
                <td>{candidate.date}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.age}</td>
                <td>{candidate.region}</td>
                <td>{candidate.trailer_length}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.source}</td>
                <td>{candidate.refer}</td>
                <td>{candidate.convoy_name}</td>
                <td>{candidate.security}</td>
                <td>{candidate.medical}</td>
                <td>{candidate.comment}</td>
            </tr>
        ))
    }


    return (
        <table className={styles.table}>
            <thead>
            <tr>
                <th>ФИО</th>
                <th>Менеджер</th>
                <th>Дата созвона</th>
                <th>Телефон</th>
                <th>Возраст</th>
                <th>Область/край</th>
                <th>Длина прицепа</th>
                <th>Стаж на фурах</th>
                <th>Источник</th>
                <th>ФИО кто привел</th>
                <th>НАК</th>
                <th>Результат СБ</th>
                <th>Медосмотр</th>
                <th>Комментарий</th>
            </tr>

            </thead>

            <tbody>
                {rows(candidates.rows)}
            </tbody>
        </table>
    )
}