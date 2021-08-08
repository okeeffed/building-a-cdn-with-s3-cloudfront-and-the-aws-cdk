# AWS CDK With TypeScript Foundations

This the companion repo to my blog post [Using the AWS CDK With LocalStack and aws-cdk-local](https://blog.dennisokeeffe.com/blog/2021-08-07-using-the-aws-cdk-with-localstack-and-aws-cdk-local.)

It follows from the original post [AWS CDK With Typescript Foundations](https://blog.dennisokeeffe.com/blog/2021-08-06-aws-cdk-with-typescript-foundations).

It will create a simple S3 bucket and tear that bucket down when destroyed.

## Useful commands

| Command         | Description                                          |
| --------------- | ---------------------------------------------------- |
| `npm run build` | Compile TypeScript to JavaScript                     |
| `npm run watch` | Watch for changes and compile                        |
| `npm run test`  | Perform the Jest unit tests                          |
| `cdk deploy`    | Deploy this stack to your default AWS account/region |
| `cdk diff`      | Compare deployed stack with current state            |
| `cdk synth`     | Emits the synthesized CloudFormation template        |
| `cdk destroy`   | Tear down your deployed stack                        |
