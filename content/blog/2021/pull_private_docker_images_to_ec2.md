---
date: "2021-12-08T22:20:50-03:00"
draft: false
title: "Pull private docker images from Docker Hub to EC2 instances"
---

If you’re running Docker containers, probably you want to run this container in the cloud, but sometimes you need to deploy a image from a private repository on Docker Hub in many EC2 machines so, typing `docker login` in all is not exactly a good solution. You could use Ansible for something like that, but it involves private keys, access to all machines through `ssh`, and it might be not possible depending on your company or application.

## Authentication File

First, you need to login to Docker Hub using `docker login`, this will create a file in the docker folder `~/.docker/config.json` with the auth hashed and your email.

> Note: Be careful when copying and manipulating this file, since anyone with access to this file could access your container registry!

Upload this file to a private S3 bucket on AWS (your bucket must be in the same region of your EC2 machines).

## Resource Creation

I will create an example using Terraform, this way we can automate creation and configuration of the instances. For your machine get access to your bucket, you must allow your instances to access the bucket you created and copy the docker configuration file. In order to do this, we need to attach an **IAM Profile** to the instance.

To copy files from S3 to EC2, we will use the `user_data` to input a script that run on startup of the instances. For the example file, I will use [this](https://sammeechward.com/s3-and-iam-with-terraform/) tutorial from Sam with little changes for our use case. Here’s the example code:

```tf
resource "aws_iam_policy" "bucket_policy" {
  name        = "my-bucket-policy"
  path        = "/"
  description = "Allow"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "VisualEditor0",
        "Effect" : "Allow",
        "Action" : [
          "s3:GetObject",
          "s3:ListBucket",
        ],
        "Resource" : [
          "arn:aws:s3:::*/*",
          "arn:aws:s3:::my-bucket-name"
        ]
      }
    ]
  })
}

resource "aws_iam_role" "some_role" {
  name = "my_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "some_bucket_policy" {
  role       = aws_iam_role.some_role.name
  policy_arn = aws_iam_policy.bucket_policy.arn
}

resource "aws_iam_instance_profile" "some_profile" {
  name = "some-profile"
  role = aws_iam_role.some_role.name
}

resource "aws_instance" "web_instances" {
  ami           = "ami-03ab7423a204da002"
  instance_type = "t2.micro"

  iam_instance_profile = aws_iam_instance_profile.some_profile.id
}

resource "aws_instance" "web_instances" {
  ami           = "ami-03ab7423a204da002"
  instance_type = "t2.micro"
  user_data		= file("scripts/your_script.sh")

  iam_instance_profile = aws_iam_instance_profile.some_profile.id
}
```

This way, the instance have access to the S3 bucket that you’ve created, and will execute your script on instance startup. The last part is to create the script to install the packages and copy the file.

```sh
#!/usr/bin/env bash

DIR="/usr/sbin/docker-compose"
if [[ ! -e $DIR ]]; then
  echo "Installing Docker..."

  sudo amazon-linux-extras install docker
  sudo chkconfig docker on
  sudo service docker start
  sudo service docker enable

  sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  sudo ln -s /usr/local/bin/docker-compose /usr/sbin/docker-compose

  sudo usermod -aG docker ec2-user
fi

echo "Create destination folder "
mkdir /home/ec2-user/.docker

echo "Copying files"
aws s3 cp --recursive s3://your_bucket ./some_folder
```

And that’s it. If you’ve used the examples, is just run `terraform apply` and everything should run perfectly, and you will be able to use your docker private images on your EC2 instances.

Thank you for reading. And thanks to [Mylena Rossato](https://medium.com/u/b4c09758a45?source=post_page---user_mention--e8a1be2c0baf---------------------------------------) for the English review!

## References

- [https://www.youtube.com/watch?v=pLw6MLqwmew](https://www.youtube.com/watch?v=pLw6MLqwmew)
- [https://stackoverflow.com/questions/34013068/where-are-the-docker-registry-login-files](https://stackoverflow.com/questions/34013068/where-are-the-docker-registry-login-files)
- [https://stackoverflow.com/questions/65256613/terraform-how-to-copy-files-from-s3-to-ec2](https://stackoverflow.com/questions/65256613/terraform-how-to-copy-files-from-s3-to-ec2)
- [https://sammeechward.com/s3-and-iam-with-terraform/](https://sammeechward.com/s3-and-iam-with-terraform/)
- [https://github.com/UmInventorQualquer/curso-aws-pratico-producao/blob/main/docker/production-init.sh](https://github.com/UmInventorQualquer/curso-aws-pratico-producao/blob/main/docker/production-init.sh)
