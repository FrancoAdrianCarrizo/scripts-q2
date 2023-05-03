const { faker } = require("@faker-js/faker");

const buildSubscriptions = ({
  settingSubjectId,
  username,
  assessmentGroupId,
  quantity,
}) => {
  const subscriptions = [];
  for (let i = 0; i < quantity; i++) {
    const ramdomId = faker.datatype.uuid();
    const subscription = {
      name: faker.internet.userName,
      lastName: faker.internet.userName,
      subscriptionExternalId: ramdomId,
      assessmentExternalId: ramdomId,
      assessmentId: ramdomId,
      subscriptionId: ramdomId,
      username,
      settingSubjectId,
      assessmentGroupId,
      minimumGradeToApprove: 4,
    };
    subscriptions.push(subscription);
  }
  return subscriptions;
};

module.exports = buildSubscriptions;
