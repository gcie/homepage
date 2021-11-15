export interface Pupil {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    needs: string;
    class: string;
    tutorId?: string;
    notes: string;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;
    lessonsStatus?: string;
    assignedTutorId?: string;
    assignedTutorName?: string;
}
