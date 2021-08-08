import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as AwsCdkWithTypescriptFoundations from "../lib/aws-cdk-with-typescript-foundations-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack =
    new AwsCdkWithTypescriptFoundations.AwsCdkWithTypescriptFoundationsStack(
      app,
      "MyTestStack"
    );
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {
          MyFirstBucketB8884501: {
            Type: "AWS::S3::Bucket",
            Properties: {
              BucketName: "hello-aws-cdk-my-first-bucket",
            },
            UpdateReplacePolicy: "Delete",
            DeletionPolicy: "Delete",
          },
        },
      },
      MatchStyle.EXACT
    )
  );
});
