const { axiosApiInstance } = require("./axios/interceptors.axios");

const updateDeclaration = async (assessmentId) => {
  const updateResponse = await axiosApiInstance.put(
    `${process.env.ASSESSMENT_BACKEND_URL}/v1/assessments/${assessmentId}/declaration-conformity`
  );

  return updateResponse.data;
};

module.exports = updateDeclaration;
