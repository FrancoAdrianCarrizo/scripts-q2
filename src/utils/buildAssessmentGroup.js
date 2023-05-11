const { faker } = require("@faker-js/faker");

const buildAssessmentGroup = () => {
  const startDate = new Date();
  startDate.setHours(startDate.getHours() + 1);

  const endDate = faker.date.future(undefined, startDate);

  const assessmentGroup = {
    id: faker.datatype.uuid(),
    externalId: faker.random.numeric(5),
    username: faker.internet.userName(),
    startDate,
    endDate,
    groupTypeID: 1,
    lastModifiedByIntegration: new Date().toISOString(),
  };
  return assessmentGroup;
};

module.exports = buildAssessmentGroup;
