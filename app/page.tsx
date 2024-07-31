import styles from "./page.module.css";

import {Table} from "@/components/Table/table";

import {Page} from "@/components/Page/page";
import {getOptionValue} from "@/libs/db";

export default async function Home() {
    const managers =  await getOptionValue('managers');
    const managers_convoy = await getOptionValue('managers_convoy');
    const medical =  await getOptionValue('medical_inspections');
    const experience =  await getOptionValue('work_experience');
    const sources =  await getOptionValue('sources');
    const regions =  await getOptionValue('regions');
    const trailers_length = await getOptionValue('trailers_length');

    const optionValue = {
        managers: managers.rows,
        managers_convoy: managers_convoy.rows,
        medical_inspections: medical.rows,
        work_experience: experience.rows,
        sources: sources.rows,
        regions: regions.rows,
        trailers_length: trailers_length.rows,
    }
    return (
        <div className={styles.wrapper}>
            <Page optionValue={optionValue}>
                <Table/>
            </Page>
        </div>
    );
}
