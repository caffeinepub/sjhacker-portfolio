import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SubmissionInput {
    subject: string;
    name: string;
    email: string;
    message: string;
}
export interface SubmissionView {
    id: SubmissionId;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export type SubmissionId = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<SubmissionView>>;
    initializeAdmin(): Promise<void>;
    submit(input: SubmissionInput): Promise<void>;
}
