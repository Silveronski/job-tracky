export type JobType = {
    readonly _id: string,
    readonly __v: number,
    company: string,
    position: string,
    status: keyof typeof JobStatus,
    createdBy: string,
    createdAt: Date,
    updatedAt: Date,
};

export const enum JobStatus {
    interview = 'interview',
    declined = 'declined',
    pending = 'pending'
};