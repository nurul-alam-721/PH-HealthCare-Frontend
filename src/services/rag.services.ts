import { httpClient } from "@/lib/axios/httpClient";

export interface IRagQueryPayload {
  query: string;
  limit?: number;
  sourceType?: string;
}

export interface IRagQuerySource {
  title: string;
  content: string;
  similarity: string;
}

export interface IRagQuerySource {
  id: string;
  content: string;
  similarity: string;
  metadata?: {
    name?: string;
    [key: string]: unknown;
  };
  sourceType?: string;
}

export interface IRagQueryData {
  answer: any;
  sources: IRagQuerySource[];
  contexedUsed: string;
}

export const queryRagService = async (payload: IRagQueryPayload) => {
  const response = await httpClient.post<IRagQueryData>("/rag/query", payload);
  return response;
};

export interface IIngestDoctorsData {
  success: boolean;
  message: string;
  indexedCount: number;
}

export const ingestDoctorService = async () => {
  const response = await httpClient.post<IIngestDoctorsData>("/rag/ingest-doctors", {});
  return response;
};
