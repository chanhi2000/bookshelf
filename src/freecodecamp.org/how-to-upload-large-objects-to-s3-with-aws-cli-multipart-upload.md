---
lang: en-US
title: "How to Upload Large Objects to S3 with AWS CLI Multipart Upload"
description: "Article(s) > How to Upload Large Objects to S3 with AWS CLI Multipart Upload"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Upload Large Objects to S3 with AWS CLI Multipart Upload"
    - property: og:description
      content: "How to Upload Large Objects to S3 with AWS CLI Multipart Upload"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-upload-large-objects-to-s3-with-aws-cli-multipart-upload.html
prev: /devops/aws/articles/README.md
date: 2025-07-31
isOriginal: false
author:
  - name: Chisom Uma
    url : https://freecodecamp.org/news/author/ChisomUma123/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753940874032/9dae199c-ff29-44c1-aff9-4dad02fdc26d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Upload Large Objects to S3 with AWS CLI Multipart Upload"
  desc="Uploading large files to S3 using traditional single-request methods can be quite challenging. If your’e transferring a 5GB database backup, and a network interruption happens, it forces you to restart the entire upload process. This wastes bandwidth..."
  url="https://freecodecamp.org/news/how-to-upload-large-objects-to-s3-with-aws-cli-multipart-upload"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753940874032/9dae199c-ff29-44c1-aff9-4dad02fdc26d.png"/>

Uploading large files to S3 using traditional single-request methods can be quite challenging. If your’e transferring a 5GB database backup, and a network interruption happens, it forces you to restart the entire upload process. This wastes bandwidth and time. And this approach becomes increasingly unreliable as file sizes grow.

With a single PUT operation, you can actually upload an object of up to 5 GB. But, when it comes to uploading larger objects (above 5GB), using Amazon S3’s [<FontIcon icon="fa-brands fa-aws"/>Multipart Upload](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html) feature is a better approach.

Multipart upload makes it easier for you to upload larger files and objects by segmenting them into smaller, independent chunks that upload separately and reassemble on S3. In this guide, you’ll learn how to implement multipart uploads using AWS CLI.

::: Prerequisites

To follow this guide, you should have:

- An AWS account.
- Knowledge of AWS and the S3 service.
- AWS CLI is installed on your local machine.

:::

---

## How Multipart Uploads Work

In a multipart upload, large file transfers are segmented into smaller chunks that get uploaded separately to Amazon S3. After all segments complete their upload process, S3 reassembles them into the complete object.

For example, a 160GB file broken into 1GB segments generates 160 individual upload operations to S3. Each segment receives a distinct identifier while preserving sequence information to guarantee proper file reconstruction.

The system supports configurable retry logic for failed segments and allows upload suspension/resumption functionality. Here’s a diagram that shows what the multipart upload process looks like:

![AWS multipart upload process](https://cdn.hashnode.com/res/hashnode/image/upload/v1753729484012/63a68bcc-8c2d-4110-a007-bd67a3b4b2e4.png)

---

## Getting Started

Before you get started with this guide, make sure that you have the AWS CLI installed on your machine. If you don’t already have that installed, follow the steps below.

### Step 1: Download the AWS CLI

To download the CLI, visit the [<FontIcon icon="fa-brands fa-aws"/>CLI download documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). Then, download the CLI based on your operating system (Windows, Linux, macOS). Once the CLI is installed, the next step is to configure your AWS IAM credentials in your terminal.

### Step 2: Configure AWS IAM credentials

To configure your AWS credentials, navigate to your terminal and run the command below:

```sh
aws configure
```

This command prompts you to paste in certain credentials, such as AWS Access Key ID and secret ID. To obtain these credentials, create a new IAM user in your AWS account. To do this, follow the steps below. (You can skip these steps if you already have an IAM user and security credentials.)

1. [<FontIcon icon="fa-brands fa-aws"/>Sign in](https://eu-north-1.signin.aws.amazon.com/oauth?client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&code_challenge=gHNgZ4aX7afSDOY05TLWJNFrXDRnWRy-Mn3_TqW2p9o&code_challenge_method=SHA-256&response_type=code&redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3FhashArgs%3D%2523%26isauthcode%3Dtrue%26nc2%3Dh_si%26src%3Dheader-signin%26state%3DhashArgsFromTB_eu-north-1_bcd5b75451c14744) to your AWS dashboard.
2. Click on the search bar above your dashboard and search “IAM”.
3. Click on IAM.
4. In the left navigation pane, navigate to **Access management** > **Users**.
5. Click **Create user**.
6. During IAM user creation, attach a policy directly by selecting **Attach policies directly** in step 2: Set permissions.
7. Give the user admin access by searching “admin” in the permission policies search bar and selecting AdministratorAccess.
8. On the next page, click **Create user**.
9. Click on the created user in the **Users** section and navigate to **Security credentials**.
10. Scroll down and click **Create access key**.
11. Select the Command Line Interface (CLI) use case.
12. On the next page, click **Create access key**.

You will now see your access keys. **Please keep these safe** and do not expose them publicly or share them with anyone.

You can now copy these access keys into your terminal after running the `aws configure` command.

You will be prompted to include the following details:

- `AWS Access Key ID`: gotten from the created IAM user credentials. See steps above.
- `AWS Secret Access Key`: gotten from the created IAM user credentials. See steps above.
- `Default region name`: default AWS region name, for example, `us-east-1`.
- `Default output format`: None.

Now we’re done with the CLI configuration.

To confirm that you’ve successfully installed the CLI, run the command below:

```sh
aws --version
```

You should see the CLI version in your terminal as shown below:

![Image of AWS CLI version](https://cdn.hashnode.com/res/hashnode/image/upload/v1753730059205/5164dd17-5f66-40ba-b044-f1bca46a22a0.png)

Now, you are ready for the following main steps for multipart uploads :)

---

## Step 1: Split Object

The first step is to split the object you intend to upload. For this guide, we’ll be splitting a **188MB** video file into smaller chunks.

![Image of object size](https://cdn.hashnode.com/res/hashnode/image/upload/v1753730190692/bd22598d-0267-4507-864d-f3f7397faf19.png)

Note that this process also works for much larger files.

Next, locate the object you intend to upload in your system. You can use the `cd` command to locate the object in its stored folder using your terminal.

Then run the split command below:

```sh
split -b <SIZE>mb <filename>
```

Replace `<SIZE>` with your desired chunk size in megabytes (for example, 150, 100, 200).

For this use case, we’ll be splitting our 188mb video file into bytes. Here’s the command:

```sh

split -b 31457280 videoplayback.mp4
```

Next, run the `ls -lh` command on your terminal. You should get the output below:

![Image of split object](https://cdn.hashnode.com/res/hashnode/image/upload/v1753730408994/33ef3552-9a92-46e9-9c2a-686e73d23c65.png)

Here, you can see that the 188MB file has been split into multiple parts (30MB and 7.9MB). When you go to the folder where the object is saved in your system files, you will see additional files with names that look like this:

- `xaa`
- `xab`
- `xac`

and so on. These files represent the different parts of your object. For example, `xaa` is the first part of your file, which will be uploaded first to S3. More on this later in the guide.

---

## Step 2: Create an Amazon S3 Bucket

If you don’t already have an S3 bucket created, follow the steps in the AWS [<FontIcon icon="fa-brands fa-aws"/>Get Started with Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html) documentation to create one.

---

## Step 3: Initiate Multipart Upload

The next step is to initiate a multipart upload. To do this, execute the command below:

```sh
aws s3api create-multipart-upload --bucket DOC-EXAMPLE-BUCKET --key large_test_file
```

In this command:

- `DOC-EXAMPLE-BUCKET` is your S3 bucket name.
- `large_test_file` is the name of the file, for example, videoplayback.mp4.

You’ll get a JSON response in your terminal, providing you with the `UploadId`. The response looks like this:

```json
{
    "ServerSideEncryption": "AES345",
    "Bucket": "s3-multipart-uploads",
    "Key": "videoplayback.mp4",
    "UploadId": "************************************"
}
```

Keep the `UploadId` somewhere safe in your local machine, as you will need it for later steps.

---

## Step 4: Upload Split Files to S3 Bucket

Remember those extra files saved as xaa, xab, and so on? Well, now it’s time to upload them to your S3 bucket. To do that, execute the command below:

```sh
aws s3api upload-part --bucket DOC-EXAMPLE-BUCKET --key large_test_file --part-number 1 --body large_test_file.001 --upload-id exampleTUVGeKAk3Ob7qMynRKqe3ROcavPRwg92eA6JPD4ybIGRxJx9R0VbgkrnOVphZFK59KCYJAO1PXlrBSW7vcH7ANHZwTTf0ovqe6XPYHwsSp7eTRnXB1qjx40Tk
```

- `DOC-EXAMPLE-BUCKET` is your S3 bucket name.
- `large_test_file` is the name of the file, for example, videoplayback.mp4
- `large_test_file.001` is the name of the file part, for example, xaa.
- `upload-id` replaces the example ID with your saved `UploadId`.

The command returns a response that contains an **ETag** value for the part of the file that you uploaded.

```json
{
    "ServerSideEncryption": "aws:kms",
    "ETag": "\"7f9b8c3e2a1d5f4e8c9b2a6d4e8f1c3a\"",
    "ChecksumCRC64NVME": "mK9xQpD2WnE="
}
```

Copy the **ETag** value and save it somewhere on your local machine, as you’ll need it later as a reference.

Continue uploading the remaining file parts by repeating the command above, incrementing both the part number and file name for each subsequent upload. For example: `xaa` becomes `xab`, and `--part-number 1` becomes `--part-number 2`, and so forth.

Note that upload speed depends on how large the object is and how good your internet speed is.

To confirm that all the file parts have been uploaded successfully, run the command below:

```sh
aws s3api list-parts --bucket s3-multipart-uploads \
--key videoplayback.mp4 \
--upload-id p0NU3agC3C2tOi4oBmT8lHLebUYqYXmWhEYYt8gc8jXlCStEZYe1_kSx1GjON2ExY_0T.4N4E6pjzPlNcji7VDT6UomtNYUhFkyzpQ7IFKrtA5Dov8YdC20c7UE20Qf0
```

Replace the example upload ID with your actual upload ID.

You should get a JSON response like this:

```json :collapsed-lines
{
    "Parts": [
        {
            "PartNumber": 1,
            "LastModified": "2025-07-27T14:22:18+00:00",
            "ETag": "\"f7b9c8e4d3a2f6e8c9b5a4d7e6f8c2b1\"",
            "Size": 26214400
        },
        {
            "PartNumber": 2,
            "LastModified": "2025-07-27T14:25:42+00:00",
            "ETag": "\"a8e5d2c7f9b4e6a3c8d5f2e9b7c4a6d3\"",
            "Size": 26214400
        },
        {
            "PartNumber": 3,
            "LastModified": "2025-07-27T14:28:15+00:00",
            "ETag": "\"c4f8e2b6d9a3c7e5f8b2d6a9c3e7f4b8\"",
            "Size": 26214400
        },
        {
            "PartNumber": 4,
            "LastModified": "2025-07-27T14:31:03+00:00",
            "ETag": "\"e9c3f7a5d8b4e6c9f2a7d4b8c6e3f9a2\"",
            "Size": 26214400
        },
        {
            "PartNumber": 5,
            "LastModified": "2025-07-27T14:33:47+00:00",
            "ETag": "\"b6d4a8c7f5e9b3d6a2c8f4e7b9c5d8a6\"",
            "Size": 26214400
        },
        {
            "PartNumber": 6,
            "LastModified": "2025-07-27T14:36:29+00:00",
            "ETag": "\"d7e3c9f6a4b8d2e5c7f9a3b6d4e8c2f5\"",
            "Size": 26214400
        },
        {
            "PartNumber": 7,
            "LastModified": "2025-07-27T14:38:52+00:00",
            "ETag": "\"f2a6d8c4e7b3f6a9c2d5e8b4c7f3a6d9\"",
            "Size": 15728640
        }
    ]
}
```

This is how you verify that all parts have been uploaded.

---

## Step 5: Create a JSON File to Compile ETag Values

The document we are about to create helps AWS understand which parts the ETags represent. Gather the **ETag** values from each uploaded file part and organize them into a JSON structure.

Sample JSON format:

```json
{
    "Parts": [{
        "ETag": "example8be9a0268ebfb8b115d4c1fd3",
        "PartNumber":1
    },
    ....
    {
        "ETag": "example246e31ab807da6f62802c1ae8",
        "PartNumber":4
    }]
}
```

Save the created JSON file in the same folder as your object and name it <FontIcon icon="iconfont icon-json"/>`multipart.json`. You can use any IDE of your choice to create and save this document.

---

## Step 6: Complete Mulitipart Upload to S3

To complete the multipart upload, run the command below:

```sh
aws s3api complete-multipart-upload \
--multipart-upload file://fileparts.json \
--bucket DOC-EXAMPLE-BUCKET \
--key large_test_file \
--upload-id exampleTUVGeKAk3Ob7qMynRKqe3ROcavPRwg92eA6JPD4ybIGRxJx9R0VbgkrnOVphZFK59KCYJAO1PXlrBSW7vcH7ANHZwTTf0ovqe6XPYHwsSp7eTRnXB1qjx40Tk
```

Replace <FontIcon icon="iconfont icon-json"/>`fileparts.json` with <FontIcon icon="iconfont icon-json"/>`multipart.json`.

You should get an output like this:

```json
{
    "ServerSideEncryption": "AES256",
    "Location": "https://s3-multipart-uploads.s3.eu-west-1.amazonaws.com/videoplayback.mp4",
    "Bucket": "s3-multipart-uploads",
    "Key": "videoplayback.mp4",
    "ETag": "\"78298db673a369adf33dd8054bb6bab7-7\"",
    "ChecksumCRC64NVME": "d1UPkm73mAE=",
    "ChecksumType": "FULL_OBJECT"
}
```

Now, when you go to your S3 bucket and hit refresh, you should see the uploaded object.

![Image of object successfully uploaded to AWS using multipart upload](https://cdn.hashnode.com/res/hashnode/image/upload/v1753731196794/c7e121d4-f3a7-4d23-95c5-26b1b5e3b699.png)

Here, you can see the complete file, file name, type, and size.

---

## Conclusion

Multipart uploads transform large file transfers to Amazon S3 from fragile, all-or-nothing operations into robust, resumable processes. By segmenting files into manageable chunks, you gain retry capabilities, better performance, and the ability to handle objects exceeding S3's 5GB single-upload limit.

This approach is essential for production environments dealing with database backups, video files, or any large assets. With the AWS CLI techniques covered in this guide, you're now equipped to handle S3 transfers confidently, regardless of file size or network conditions.

Check out this [<FontIcon icon="fa-brands fa-aws"/>documentation from the AWS knowledge center](https://repost.aws/knowledge-center/s3-multipart-upload-cli) to learn more about multi-part uploads using AWS CLI.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Upload Large Objects to S3 with AWS CLI Multipart Upload",
  "desc": "Uploading large files to S3 using traditional single-request methods can be quite challenging. If your’e transferring a 5GB database backup, and a network interruption happens, it forces you to restart the entire upload process. This wastes bandwidth...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-upload-large-objects-to-s3-with-aws-cli-multipart-upload.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
