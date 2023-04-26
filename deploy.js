// const AWS = require('aws-sdk');
// const path = require('path');
// const fs = require('fs');


// const applicationName = 'twitter-clone';
// const environmentName = 'Twitterclone-env-1';

// const zipFilename = 'nodejs.zip';
// const localPath = path.join(process.cwd(), '.next');

// // Create a ZIP archive of your app's code and dependencies
// const zip = new require('node-zip')();
// zip.file('nodejs.zip', fs.readFileSync(zipFilename));

// // Upload the ZIP archive to AWS Elastic Beanstalk
// const eb = new AWS.ElasticBeanstalk({ region: 'us-east-1' });
// eb.createApplicationVersion({
//     ApplicationName: applicationName,
//     VersionLabel: Date.now().toString(),
//     SourceBundle: {
//         S3Bucket: 'elasticbeanstalk-us-east-1-236603142055',
//         S3Key: '20231156gb-nodejs.zip'
//     }
// }, (err, data) => {
//     if (err) {
//         console.error(err);
//         process.exit(1);
//     }

//     // Deploy the new version to your Elastic Beanstalk environment
//     eb.updateEnvironment({
//         EnvironmentName: environmentName,
//         VersionLabel: data.VersionLabel
//     }, (err, data) => {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }

//         console.log(`Deployed version ${data.VersionLabel} to environment ${environmentName}`);
//     });
// });
