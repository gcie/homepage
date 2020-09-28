export class Pupil {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    class: string;
    needs: string;
    isMature?: boolean;
    remoteOrStationary: number;
    mainNeeds?: string;
    tutorId?: string;
    notes: string;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;
    lessonsStatus: string;
    assignedTutorId?: string;
    assignedTutorName?: string;
    createdAt: Date;
    updatedAt: Date;
}
