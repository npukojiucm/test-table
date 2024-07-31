import {
    Manager,
    ManagersConvoy,
    MedicalInspections,
    Region,
    Sources,
    TrailersLength,
    WorkExperience
} from "@/interfaces/interfaces";

export type Query = Manager | Region | TrailersLength | WorkExperience | Sources |
    ManagersConvoy | MedicalInspections;

export type ListTables = 'managers' | 'regions' | 'trailers_length' | 'work_experience' |
    'sources' | 'managers_convoy' | 'medical_inspections';