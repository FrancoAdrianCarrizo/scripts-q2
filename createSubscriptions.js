const { faker } = require("@faker-js/faker");

const createSubscriptions = ({
  settingSubjectId,
  username,
  assessmentGroupId,
  quantity,
}) => {
  const subscriptions = [];
  for (let i = 0; i <= quantity; i++) {
    const ramdomId = faker.datatype.uuid();
    const subscription = {
      name: faker.internet.userName,
      lastName: faker.internet.userName,
      username,
      settingSubjectId,
      subscriptionExternalId: ramdomId,
      assessmentExternalId: ramdomId,
      assessmentId: ramdomId,
      minimumGradeToApprove: 4,
      assessmentGroupId: assessmentGroup,
      subscriptionId: ramdomId,
    };
    subscriptions.push(subscription);
  }
  return subscriptions;
};

module.exports = createSubscriptions;
