//
// async function startWorker() {
//     try {
//         // await createDBConnection();
//         // // await createSqlServerConnection();
//         // await createRedisCacheClient();
//         // await initializeConfluentProducer();
//         // LocalCache.InitiateInstance();
//         // if (nodeEnvironment === "production") {
//         //     workerNotificationObj.setQueueToMonitor(bullQueues.monthlyCommissionUpdatorQueue, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0);
//         //     workerNotificationObj.setQueueToMonitor(bullQueues.fetchExpiredReferralLinkQueue, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0);
//         // // }
//         // bullQueues.testQueue.process(testProcessor);
//         //
//         //
//         // // CRON EXPRESSION - ONE DAY
//         // bullQueues.fetchDailyActiveUsersQueue.add(
//         //     {},
//         //     { repeat: { cron: "0 0 * * *" }, removeOnComplete: true }
//         // );
//
//         // bullQueues.updateKycStatusFailedQueue.process("setKycStatusFailedJob", async (job) => {
//         //     return await setKycStatusFailed(job);
//         // })
//         //
//         //
//         // bullQueues.lotteryWinnerGenerationQueue.process(processResult);
//         // bullQueues.newLotteryGenerationQueue.process(createNewLotteryJob);
//         // bullQueues.lotteryWinnerClaimNotification.process(lotteryWinnerClaimNotification);
//         //
//         // bullQueues.monthlyCommissionUpdatorQueue.process(monthlyUserCommissionUpdator)
//         // bullQueues.monthlyCommissionUpdatorQueue.add(
//         //     {},
//         //     { repeat: { cron: "5 0 1 * *" }, removeOnComplete: true, removeOnFail: false }
//         // );
//         //
//         // bullQueues.creditOrExpireCommissionQueue.process(10, creditOrExpireCommission);
//         //
//         // bullQueues.updateUserNetworkInfoQueue.process("updateUserNetworkInfoJob", async (job) => {
//         //     return await updateUserNetworkInfo(job);
//         // })
//         //
//         // bullQueues.fetchExpiredReferralLinkQueue.process(fetchExpiredReferralLinks);
//         // bullQueues.fetchExpiredReferralLinkQueue.add({}, { repeat: { cron: "0 */6 * * *" }, removeOnComplete: true }); //add after every sixth hour
//         // bullQueues.updateReferLinkQueue.process(refreshReferLink);
//         //
//         // bullQueues.calculateUserDeviceRiskQueue.process(calculateUserDeviceRisk);
//         //
//         //
//         // bullQueues.deleteDeactivatedDailyWorkerQueue.add(
//         //     {},
//         //     { repeat: { cron: "0 0 * * *" }, removeOnComplete: true, removeOnFail: 100 }
//         // );
//         // bullQueues.toggleWelcomeScreenFlagSelfRestrainQueue.process("toggleWelcomeScreenFlagSelfRestrain", async(job) => {
//         //     return await toggleWelcomeScreenFlagSelfRestrain(job);
//         // });
//         // bullQueues.selfRestraintActivationQueue.process("selfRestraintUserActivation", async(job) => {
//         //     return await selfRestrainUserActivation(job);
//         // });
//         // bullQueues.updatePremiumUserAndSendNotification.process("updatePremiumUserAndSendNotification", async (job) => {
//         //     return await premiumUserUploadUsingS3AndSendNotification(job);
//         // })
//         // bullQueues.deleteDeactivatedDailyWorkerQueue.process(deleteDeactivatedAccounts);
//         //
//         // bullQueues.checkWorkflowKycStatusQueue.process(checkKycWorkflowStatusWorker);
//         //
//         // //script
//         // bullQueues.precisionChangesBackFillingQueue.process("precisionChangesBackFillingJob", async(job) => {
//         //     return await BackFillScriptForHandlingPrecisionChanges.backfill(job);
//         // })
//         // bullQueues.createUpdateExpiryJobsQueue.process(createUpdateExpiryJobs);
//         // bullQueues.updateExpiryOfReferralLinksQueue.process(updateReferralLinkExpiry);
//         //
//         // bullQueues.updateType1AddressToDelhi.process(userAddressCheckAndUpdateToDelhi);
//         // bullQueues.updateUserSelectedAddress.process(updateUserSelectedAddress);
//         //
//         // bullQueues.addReferDataRetryQueue.process(retryFailedAddReferData);
//         // bullQueues.createNameAndProfileUpdateJob.process(createNameAndProfileUpdate);
//         // bullQueues.updateNameAndProfileJob.process(updateNameAndProfileUpdate);
//         // bullQueues.expireUserLoginOtpJob.process(expireUserLoginOtp);
//         // bullQueues.retryFailedRewardableActions.process(processFailedRewardableActions);
//         // bullQueues.delayedKycWorker.process("delayedKycAsyncJob", async(job) => {
//         //     return await delayedKycWorkerJob(job)
//         // });
//         // bullQueues.userUploadedProfileImageVerificationQueue.process(userUploadedProfileImageVerificationWorker);
//         // bullQueues.markUserUploadedProfileImageFailedQueue.process(markUserUploadedProfileImageFailedWorker)
//     } catch (err) {
//         logger.error("startWorker: " + err);
//     }
// }
//
// process.on('SIGTERM', async (err) => {
//     logger.info("Initiating gracefull exit SIGTERM: " + err);
//     const gracePeriodMillis = 25000; // 30 sec
//     setTimeout(() => {
//         logger.info(`exiting worker after grace period of ${gracePeriodMillis} millis`);
//         process.exit(1);
//     }, gracePeriodMillis);
//     try{
//         await pauseAllQueues();
//     }catch(err){
//         logger.error("pausing all queues error: " + err);
//     }
// });
//
// async function pauseAllQueues() {
//     logger.info('pausing all queues');
//     for (const q of Object.keys(bullQueues)) {
//         const queue : Queue = bullQueues[q as keyof typeof bullQueues];
//         await queue.pause(true, false);
//         logger.info('paused queue', queue.name)
//     }
// }
//
// startWorker();
