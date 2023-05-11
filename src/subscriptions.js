const { axiosApiInstance } = require("./axios/interceptors.axios");
const buildSubscriptions = require("./utils/buildSubscriptions");
const getToken = require("./utils/getToken");

async function main({
  settingSubjectId,
  username,
  assessmentGroupId,
  quantity,
}) {
  try {
    const { headers } = await getToken();

    const subscriptionsList = buildSubscriptions({
      settingSubjectId,
      username,
      assessmentGroupId,
      quantity,
    });

    const subscriptionsPromises = subscriptionsList.map((subscription) => {
      return axiosApiInstance.post(
        `${process.env.ASSESSMENT_BACKEND_URL}/v1/assessments-groups/${subscription.assessmentGroupId}/subscriptions/${subscription.subscriptionId}`,
        subscription,
        { headers }
      );
    });

    const subscriptionResposnes = [];

    await Promise.all(subscriptionsPromises).then((responses) => {
      responses.forEach((response) => {
        if (response.status === 200) {
          subscriptionResposnes.push(response.data.subscription);
        }
      });
    });

    return subscriptionResposnes;
  } catch (error) {
    console.log(error);
  }
}

module.exports = main;
