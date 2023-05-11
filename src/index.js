require("dotenv").config();
const createAssessmentGroup = require("./assessmentGroup");
const createSubscriptions = require("./subscriptions");
const updateAssessmentStatus = require("./updateAssessmentStatus");
const updateDeclaration = require("./updateDeclarationOfComformity");
const logger = require("./utils/logger");

async function main() {
  logger.info("Creating assessment group");
  const assessmentGroupResponse = await createAssessmentGroup();
  logger.info(`Assessment group created %O`, assessmentGroupResponse);

  logger.info("Creating subscriptions");
  const subscriptionsResponse = await createSubscriptions({
    settingSubjectId: "df511063-8e3b-56f7-b890-11d74b4f4a92",
    username: "FSIEH",
    assessmentGroupId: assessmentGroupResponse.id,
    quantity: 1,
  });

  subscriptionsResponse.forEach(async (subscription) => {
    logger.info(`Subscriptions created %O`, subscriptionsResponse);

    logger.info("Updating assessment status");
    const updateAssessmentENABLED = await updateAssessmentStatus(
      subscription.assessment.id,
      {
        assessmentStatusId: 2,
        username: subscription.username,
        reason: "script test",
      }
    );

    logger.info(`Assessment status updated %O`, updateAssessmentENABLED);

    logger.info("Updating declaration of conformity");
    const updateDeclarationResponse = await updateDeclaration(
      subscription.assessment.id
    );
    logger.info(
      `Declaration of conformity updated %O`,
      updateDeclarationResponse
    );

    logger.info("Updating assessment status");
    const updateAssessmentStarted = await updateAssessmentStatus(
      subscription.assessment.id,
      {
        assessmentStatusId: 3,
        username: subscription.username,
        reason: "script test",
      }
    );
    logger.info(`Assessment status updated %O`, updateAssessmentStarted);

    logger.info("Updating assessment status");
    const updateAssessmentToReview = await updateAssessmentStatus(
      subscription.assessment.id,
      {
        assessmentStatusId: 6,
        username: subscription.username,
        reason: "script test",
      }
    );
    logger.info(`Assessment status updated %O`, updateAssessmentToReview);

    logger.info("Updating assessment status");
    const updateAssessmentFinished = await updateAssessmentStatus(
      subscription.assessment.id,
      {
        assessmentStatusId: 4,
        username: subscription.username,
        reason: "script test",
      }
    );
    logger.info(`Assessment status updated %O`, updateAssessmentFinished);
  });
}

return main();
