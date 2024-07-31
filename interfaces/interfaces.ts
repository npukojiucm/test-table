export interface CandidateInterface {
    name: string,
    // manager_id:number,
    phone: string,
    date: string,
    age: number,
    region: string,
    trailer_length: string,
    experience: string,
    source: string,
    refer: string,
    security: string,
    // convoy_id: number,
    medical: string,
    comment: string,
    manager_name: string,
    convoy_name: string,
}

export interface Manager {
    id: number,
    name: string
}

export interface Region {
    region: string
}

export interface TrailersLength {
    length: string
}

export interface WorkExperience {
    experience: string
}

export interface Sources {
    source: string
}

export interface ManagersConvoy {
    id: number,
    name: string
}

export interface MedicalInspections {
    medical: string
}

export interface FormDataInterface {
    name: string,
    manager_id: string,
    phone: string,
    date: string,
    age: string,
    region: string,
    trailer_length: string,
    experience: string,
    source: string,
    refer: string,
    security: string,
    convoy_id: string,
    medical: string,
    comment: string
}