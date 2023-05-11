const { axiosApiInstance } = require("./axios/interceptors.axios");
const buildAssessmentGroup = require("./utils/buildAssessmentGroup");
require("dotenv").config();

async function main() {
  const { id, ...rest } = buildAssessmentGroup();

  const response = await axiosApiInstance.post(
    `${process.env.ASSESSMENT_BACKEND_URL}/v1/assessments-groups/${id}`,
    rest
  );

  return response.data;
}

module.exports = main;
