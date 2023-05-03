require("dotenv").config();

const createSubscriptions = require("./createSubscriptions");
const getToken = require("./getToken");

async function main() {
  try {
    const { headers } = await getToken();
    const subscriptions = createSubscriptions({
      settingSubjectId: "5586a832-3a60-5a16-8fec-c1f0de190a5b",
      username: "FSIEH",
      assessmentGroupId: "010203",
      quantity: 3000,
    });

    const subscriptionsPromises = subscriptions.map((subscription) => {
      return fetch(
        `${process.env.ASSESSMENT_BACKEND_URL}/v1/assessments-groups/${subscription.assessmentGroupId}/subscriptions/${subscription.subscriptionId}`,
        { headers, method: "POST", body: JSON.stringify(subscription) }
      );
    });

    Promise.all(subscriptionsPromises).then((responses) => {
      responses.forEach((response) => {
        console.log(response.status);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

main();
