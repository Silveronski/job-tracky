export type JobType = {
    readonly _id: string,
    readonly __v: number,
    readonly createdBy: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    status: keyof typeof JobStatus,
    company: string,
    position: string,
};

export const enum JobStatus {
    interview = 'interview',
    declined = 'declined',
    pending = 'pending'
};