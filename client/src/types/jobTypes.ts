export type PartialJobType = {
    company: string,
    position: string,
};

export type EditJobType = PartialJobType & {
    status: keyof typeof JobStatus
};

export type JobType = PartialJobType & EditJobType &{
    readonly _id: string,
    readonly __v: number,
    createdBy: string,
    createdAt: Date,
    updatedAt: Date,
};

export const enum JobStatus {
    interview = 'interview',
    declined = 'declined',
    pending = 'pending'
};

export type JobApiResponse = JobType | JobType[] | object | undefined;