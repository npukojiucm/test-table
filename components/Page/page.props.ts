import {DetailedHTMLProps, HTMLAttributes, JSX} from "react";
import {Query} from "@/interfaces/types";

export interface IPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    optionValue: {
        managers: Query[],
        managers_convoy: Query[],
        medical_inspections: Query[],
        work_experience: Query[],
        sources: Query[],
        regions: Query[],
        trailers_length: Query[],
    }
    children: JSX.Element
}