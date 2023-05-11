const { axiosApiInstance } = require("./axios/interceptors.axios");

const updateAssessmentStatus = async (assessmentId, status) => {
  const updateResponse = await axiosApiInstance.put(
    `${process.env.ASSESSMENT_BACKEND_URL}/v1/assessments/${assessmentId}/statuses`,
    {
      ...status,
    }
  );

  return updateResponse.data;
};

module.exports = updateAssessmentStatus;
