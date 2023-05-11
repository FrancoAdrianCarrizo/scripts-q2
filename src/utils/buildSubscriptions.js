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
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      subscriptionExternalId: ramdomId,
      assessmentExternalId: ramdomId,
      assessmentId: ramdomId,
      subscriptionId: ramdomId,
      username: username || faker.internet.userName(),
      settingSubjectId,
      assessmentGroupId,
      minimumGradeToApprove: 4,
    };
    subscriptions.push(subscription);
  }
  return subscriptions;
};

module.exports = buildSubscriptions;
