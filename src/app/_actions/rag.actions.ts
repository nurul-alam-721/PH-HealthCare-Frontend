"use server";

import { ingestDoctorService, queryRagService } from "@/services/rag.services";

const queryRagAction = async (query: string) => {
  try {
    const response = await queryRagService({ query });
    if (!response?.data?.answer) {
      return {
        success: false,
        message: "No answer received from AI. Please, try another query.",
      };
    }
    let answer = response?.data?.answer;
    if (typeof answer === "object" && answer !== null) {
      if ("doctors" in answer && Array.isArray(answer.doctors)) {
        const doctors = answer.doctors.slice(0, 5);
        if (doctors.length > 0) {
          answer = `You have ${doctors.length} doctors available for your query. Here are the top 5:
                            ${doctors
                              .map((d: any, i: number) => {
                                let text = "";
                                if (d.name)
                                  text += `- ${i + 1}. **Name**: ${d.name} \n`;
                                if (d.specialty)
                                  text += ` , **Speciality**: ${d.specialty}\n`;
                                if (d.reason)
                                  text += ` , **Why this doctor?**: ${d.reason}\n`;
                                return text;
                              })
                              .join("\n")}`;
        } else {
          answer =
            "No doctors found for your query. Please, try another query.";
        }
      }
    }

    const sources = 100 - Number(response?.data?.sources[0]?.similarity) * 100;

    return {
      success: true,
      answer: answer as string,
      sources: `${sources.toFixed(2)}% matched.`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to fetch data from AI. Please, try again later.",
    };
  }
};

const ingestDoctorsAction = async () => {
  try {
    const response = await ingestDoctorService();
    return {
      success: true,
      message:
        response?.data?.message ??
        response?.message ??
        "Doctors data synced successfully",
      indexedCount: response?.data?.indexedCount ?? 0,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to ingest doctors. Please, try again later.",
    };
  }
};

const getUserRoleAction = async () => {
  try {
    const { getUserInfo } = await import("@/services/auth.services");
    const userInfo = await getUserInfo();
    return userInfo?.role ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { queryRagAction, ingestDoctorsAction, getUserRoleAction };
