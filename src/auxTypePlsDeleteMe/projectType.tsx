export type projectType = {
    id?: string,
    projectId?: number,
    name: string,
    startDate: string,
    endDate?: string,
    developerEmails: string[],
    leaderEmails: string[],
    description: string
}