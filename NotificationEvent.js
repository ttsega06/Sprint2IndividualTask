console.log("Loading function");

const aws = require("aws-sdk");

const s3 = new aws.S3({ apiVersion: "2006-03-01" });
// new added

const docClient = new aws.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));

  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const params = {
    Bucket: bucket,
    Key: key,
  };
  // try {
  //     const { ContentType } = await s3.getObject(params).promise();
  //     console.log('CONTENT TYPE:', ContentType);
  //     return ContentType;
  // } catch (err) {
  //     console.log(err);
  //     const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
  //     console.log(message);
  //     throw new Error(message);
  // }
  var dbparams = {
    TableName: "dynamo89ef77d7-dev",
    Item: {
      // dummy value
      UserId: aws.util.uuid.v4(),

      userId: "123",
      message: "Plant Growth 10% ",
    },
  };
  console.log(dbparams);
  try {
    await docClient.put(dbparams).promise();
  } catch (err) {
    console.log(err);
  }
  return "success";
};
