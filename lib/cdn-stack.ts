import "dotenv/config";
import * as cdk from "@aws-cdk/core";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";

export class CdnStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const assetsBucket = new s3.Bucket(this, "demo-cdk-assets-bucket", {
      bucketName: "demo-cdk-assets-bucket",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      "Certificate",
      // found using aws acm list-certificates --region us-east-1
      process.env.ACM_ARN!
    );
    const cf = new cloudfront.Distribution(this, "cdnDistribution", {
      defaultBehavior: { origin: new origins.S3Origin(assetsBucket) },
      domainNames: [process.env.ZONE_NAME!],
      certificate,
    });

    const zone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      "dennisokeeffe-zone",
      {
        zoneName: process.env.ZONE_NAME!,
        hostedZoneId: process.env.HOSTED_ZONE_ID!,
      }
    );

    new route53.ARecord(this, "CDNARecord", {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cf)),
    });

    new route53.AaaaRecord(this, "AliasRecord", {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cf)),
    });
  }
}
