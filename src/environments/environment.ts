// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mmiotadmin: 'http://10.0.2.12:8091/',
  metadataApiUrl: 'http://10.0.2.12:8081',
  mmUrl: 'http://10.0.2.12:8080/v1',
  dockerEngineApiUrl: 'http://10.0.2.12:4243',
  dockerRepo: '10.0.2.12:5000'
};