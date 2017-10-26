// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const HOST_URL = 'http://localhost:37271';

export const environment = {
  production: false,
  appUrl: HOST_URL,
  accountUrl: `${HOST_URL}/Account`,
  loginUrl: `${HOST_URL}/memo/login`,
  moderationUrl: `${HOST_URL}/Moderator`,
  catalogUrl: `${HOST_URL}/Catalog`,
  quizUrl: `${HOST_URL}/Quiz`,
  subscriptionsUrl: `${HOST_URL}/Subscriptions`,
  statisticsUrl: `${HOST_URL}/Statistics`,
  uploadApiUrl: `${HOST_URL}/memo/images/upload`,
  userProfileUrl: `${HOST_URL}/UserProfile`,
  imageUploadUrl: `${HOST_URL}/Image`
};
