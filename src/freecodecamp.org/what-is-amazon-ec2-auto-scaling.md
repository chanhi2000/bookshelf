---
lang: en-US
title: "What is Amazon EC2 Auto Scaling?"
description: "Article(s) > What is Amazon EC2 Auto Scaling?"
icon: fa-brands fa-aws
category: 
  - AWS
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - aws
  - amazon-web-services
  - aws-ec2
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is Amazon EC2 Auto Scaling?"
    - property: og:description
      content: "What is Amazon EC2 Auto Scaling?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-amazon-ec2-auto-scaling.html
prev: /devops/aws/articles/README.md
date: 2024-05-07
isOriginal: false
cover: https://freecodecamp.org/news/content/images/size/w1000/2024/05/christophe-hautier-902vnYeoWS4-unsplash.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is Amazon EC2 Auto Scaling?"
  desc="Auto scaling is like having a smart system that keeps an eye on how many people are visiting your website. When you have a lot of people, it quickly adds more servers to handle the extra traffic. And when things quiet down, it scales back to save you..."
  url="https://freecodecamp.org/news/what-is-amazon-ec2-auto-scaling/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w1000/2024/05/christophe-hautier-902vnYeoWS4-unsplash.jpg"/>

Auto scaling is like having a smart system that keeps an eye on how many people are visiting your website. When you have a lot of people, it quickly adds more servers to handle the extra traffic. And when things quiet down, it scales back to save you money.

In AWS, there are two important services that help with this: Amazon EC2 Auto Scaling and AWS Auto Scaling. Amazon EC2 Auto Scaling is specifically for managing your EC2 servers, while AWS Auto Scaling can also handle other things like DynamoDB tables and Amazon Aurora databases.

In this article, we'll dive deeper into how Amazon EC2 Auto Scaling works and how you can use it to keep your website running smoothly without overspending on servers.

::: note Prerequisites

- Have an AWS account
- Basic understanding of EC2 instance

:::

---

## Example Use Case

### Scenario

Imagine running a website that sells trendy clothes. Sometimes, lots of people visit your site at once, especially during lunch breaks or evenings. Other times, it's pretty quiet.

### Problem

You need enough servers to handle busy times, but you don't want to waste money on too many servers when it's quiet.

### Solution with Amazon EC2 Auto Scaling

#### Traffic Analysis

ok at when people visit your site the most. This helps you understand when you need more servers.

#### Set Rules

 Decide when to add or remove servers automatically. For example, you might say, "If more than 70% of our servers are busy for more than 5 minutes, add one more server."

#### Adjust Server Numbers

 Tell Amazon the smallest and biggest number of servers you need. You can also say how many you'd like on average. For instance, you might say, "Keep at least 2 servers running all the time. But if it's busy, go up to 10 servers. And usually, we need around 4."

#### Load Balancing

 Make sure all servers get some work. Use a load balancer to send visitors to the least busy server. This keeps everything running smoothly even if you have many servers.

#### Test and Watch

 Before trusting everything, test to see if it works as planned. Keep an eye on it afterward to make sure it's doing its job right.

#### Save Money

 With auto scaling, you don't pay for servers you're not using. When traffic is low, it reduces the number of servers, saving you money. When traffic picks up, it adds more servers, so your site stays fast.

---

## Advantages of Using Amazon EC2 Auto Scaling

### Cost Optimization

EC2 Auto Scaling helps optimize costs by automatically adjusting the number of EC2 instances based on demand. During periods of low traffic, it reduces the number of instances, saving on operational costs. Conversely, during high traffic, it scales up to ensure optimal performance without over-provisioning resources.

### Improved Availability

By automatically distributing incoming traffic across multiple instances and fault tolerance of your application. If any instance fails/is unhealthy, the Auto Scaling group replaces it with a new one, ensuring minimal disruption to your services.

### Scalability

EC2 Auto Scaling allows your application to handle sudden spikes in traffic or increased workload without manual intervention.

### Enhanced Performance

With EC2 Auto Scaling, you can maintain consistent performance levels even during peak usage periods. By automatically adding more instances when traffic increases, it prevents performance degradation and ensures a smooth user experience.

### Ease of Management

EC2 Auto Scaling simplifies the management of your EC2 fleet by automating instance provisioning, scaling, and monitoring.

### Integration with AWS Services

EC2 Auto Scaling integrates seamlessly with other AWS services such as Elastic Load Balancing (ELB) and Amazon CloudWatch.

### Highly Customizable

EC2 Auto Scaling offers flexibility and customization options to meet the specific needs of your application.

---

## Components of EC2 Auto Scaling

Let's get a better understanding on how the Auto Scaling works through its different components.

There are two distinct steps to configuration. The first step is the creation of a launch configuration or launch template. The second is the creation of an Auto Scaling group.

---

## Launch Configurations and Launch Templates

Launch configurations or launch templates define the configuration settings for the EC2 instances that will be launched by the Auto Scaling group.

These settings include the AMI (Amazon Machine Image), instance type, security groups, key pair, and user data.

Launch configurations are older and being phased out in favor of launch templates, which offer more features and flexibility.

### How to Create a Launch Template

First, navigate to EC2 Instance page

![AWS instance page](https://freecodecamp.org/news/content/images/2024/05/launch-template-1.png)

Select the Launch Templates under the instances and click the create button.

![AWS launch templates](https://freecodecamp.org/news/content/images/2024/05/launch-template-2.png)

The following screen should show up, almost similar to launching an `EC2 instance`. You can fill the required information accordingly.

![Create AWS launch templates](https://freecodecamp.org/news/content/images/2024/05/screencapture-us-east-1-console-aws-amazon-ec2-home-2024-05-03-22_52_38-1.png)

After configuration, click the "Create Launch" template button and allow it to create, then view your newly created launch template with default and latest version as 1. You can use this launch template to create another launch template and specify a different version for it.

![View AWS launch templates](https://freecodecamp.org/news/content/images/2024/05/launch-template-3-1.png)

Auto scaling requires either a launch template or launch configuration to identify the instance it's launching and its configurations.

---

## What are Auto Scaling Groups (ASGs)

Auto Scaling groups are the core component of EC2 Auto Scaling. They define the group of EC2 instances that are managed together and share the same scaling policies. ASGs ensure that your application can automatically scale out (add instances) or scale in (remove instances) based on demand.

### How to create an Auto Scaling Group

First, navigate to EC2 Instance page and under the Auto Scaling group, select and click the create button.

![creating an Auto Scaling group](https://freecodecamp.org/news/content/images/2024/05/asg-1.png)

On the create screen, the first step is to give your ASG a `Name` and then select your `launch template` created from the steps above.

![creating a launch template](https://freecodecamp.org/news/content/images/2024/05/asg-2.png)

The next step requires you to select or override an instance launch template. You also select a VPC and subnet.

![selecting instance launch template](https://freecodecamp.org/news/content/images/2024/05/asg-3.png)

The next step is to configure advanced options such as adding a load balancer and monitoring. You can attach or add a new load balancer but for this article we will skip this part.

![configuring advanced options](https://freecodecamp.org/news/content/images/2024/05/asg-4.png)

Next, configure the group size and scaling. Here, we want to configure the scale between minimum of 2 and maximum of 5. Also, set the metrics type to track the CPU utilization (set to 50 - you can increase to 70 or more) for scaling.

![configuring group size and scaling](https://freecodecamp.org/news/content/images/2024/05/screencapture-us-east-1-console-aws-amazon-ec2-home-2024-05-03-23_41_58.png)

Next two steps are for adding notifications (you will need to create an SNS service for this) and tags. In this article, we are going to skip these and create our ASG.

Create and view the ASG created. From its **activity** folder, you can see those two instances launched. Also, from the instances page, you should see two EC2 instances. This is because we set our desired state to 2.

![Auto Scaling groups](https://freecodecamp.org/news/content/images/2024/05/asg-5.png)

![Auto Scaling groups](https://freecodecamp.org/news/content/images/2024/05/asg-6.png)

---

## What are Scaling Policies?

Scaling policies define the rules that govern how the Auto Scaling group scales in or out in response to changing demand. There are four types of scaling policies:

Let's break down each type of scaling with examples:

### Manual Scaling

Manual scaling involves adjusting the number of EC2 instances in your Auto Scaling group manually, without relying on automated triggers or policies. This type of scaling is typically done in response to predictable events or planned changes in demand.

::: tabs

@tab:active Example

Assuming you run an e-commerce website, and you know that there will be a flash sale event that will attract a large number of visitors. To handle the expected surge in traffic, you can manually increase the desired capacity of your Auto Scaling group before the event, adding more EC2 instances in advance of the anticipated demand spike. After the event is over, you can manually reduce the desired capacity back to its normal level.

@tab Pros

- **Control**: Offers direct control over the number of EC2 instances in the Auto Scaling group.
- **Flexibility**: Allows for immediate adjustments based on specific requirements or events.

@tab Cons

- **Manual Intervention**: Relies on human intervention, which can be time-consuming and prone to errors.
- **Lack of Automation**: Not suitable for handling dynamic or unpredictable fluctuations in demand efficiently.

:::

### Schedule Scaling

Schedule scaling involves defining predefined schedules to adjust the number of EC2 instances in your Auto Scaling group automatically. This type of scaling is useful for applications with predictable traffic patterns, such as daily or weekly fluctuations in demand.

::: tabs

@tab:active Example

Consider a video streaming service that experiences peak traffic during evenings and weekends. You can set up a schedule scaling policy to increase the desired capacity of your Auto Scaling group every evening at 6 PM and decrease it every morning at 6 AM. This ensures that you have enough capacity to handle peak demand periods without overspending on resources during off-peak hours.

@tab Pros

- **Predictability**: Well-suited for applications with predictable traffic patterns, such as daily or weekly fluctuations.
- **Cost Optimization**: Helps optimize costs by aligning resources with expected demand patterns.

@tab Cons

- **Limited Adaptability**: May not be responsive to sudden changes in demand or unexpected traffic spikes.
- **Requires Planning**: Requires upfront planning and configuration of schedules based on historical data or business insights.

:::

### Dynamic Scaling

Dynamic scaling adjusts the number of EC2 instances in your Auto Scaling group automatically based on real-time metrics, such as CPU utilization, network traffic, or other application-specific metrics. This type of scaling is responsive to fluctuations in demand and helps ensure optimal performance and cost-effectiveness.

#### Types

- **Step Scaling**: This policy scales the number of instances based on a series of scaling adjustments defined by step adjustments and associated metrics thresholds.
- **Target Tracking**: This policy automatically adjusts the number of instances to maintain a specified target metric, such as average CPU utilization or network traffic.

When adding instances to the ASG, it will take a few minutes for them to come online and handle load. This is why a cooldown policy has to be set.

**Scaling Cooldowns:** Scaling cooldowns help prevent rapid fluctuations in the number of instances by imposing a cooldown period after a scaling activity is triggered. During this cooldown period, EC2 Auto Scaling will not launch or terminate additional instances, allowing time for the newly launched instances to stabilize or for the impact of terminated instances to be observed.

::: tabs

@tab:active Example

Let's say you operate a ride-sharing platform where demand can vary unpredictably throughout the day. With dynamic scaling, you can configure Auto Scaling policies to add more EC2 instances when the number of ride requests exceeds a certain threshold, and remove instances when demand decreases. This allows you to dynamically adapt to changing traffic patterns in real-time, ensuring a seamless experience for both drivers and passengers.

@tab Pros

- **Real-Time Responsiveness**: Adjusts resource allocation dynamically in response to actual demand, ensuring optimal performance.
- **Cost Efficiency**: Automatically scales resources up or down, helping to optimize costs by only using what is needed.

@tab Cons

- **Potential Over-Provisioning**: May lead to over-provisioning during sudden spikes in demand if scaling policies are not properly configured.
- **Complexity**: Requires careful configuration of scaling policies and monitoring of metrics to ensure effective scaling behavior.

:::

### Predictive Scaling

Predictive scaling uses machine learning algorithms and historical data to forecast future demand and proactively adjust the number of EC2 instances in your Auto Scaling group. This type of scaling helps prevent under-provisioning or over-provisioning of resources by anticipating changes in demand before they occur.

::: tabs

@tab:active Example

Suppose you operate a weather forecasting application that experiences increased demand during severe weather events. By analyzing historical data on weather patterns and user behavior, predictive scaling can predict when a surge in traffic is likely to occur and automatically scale up the capacity of your Auto Scaling group ahead of time. This ensures that your application remains responsive and available during peak usage periods without unnecessary resource waste.

@tab Pros

- **Proactive Optimization**: Anticipates future demand based on historical data, ensuring resources are provisioned ahead of time.
- **Improved Cost Management**: Helps prevent under-provisioning and over-provisioning, optimizing resource usage and costs.

@tab Cons

- **Data Dependence**: Relies on accurate historical data and effective machine learning models for accurate predictions.
- **Initial Setup**: Requires initial setup and configuration of predictive scaling models, which can be complex and resource-intensive.

:::

---

## Conclusion

In conclusion, Amazon EC2 Auto Scaling offers a range of strategies to effectively manage and optimize the performance of applications running on EC2 instances.

Whether it's through manual adjustments, scheduled scaling, dynamic responses to real-time metrics, or proactive measures based on predictive analytics, EC2 Auto Scaling provides the flexibility and automation needed to ensure that resources are aligned with demand.

By leveraging these scaling capabilities, businesses can enhance availability, improve cost efficiency, and deliver a seamless user experience, ultimately driving better outcomes for their applications and customers on the AWS platform.

As always, I hope you enjoyed the article and learned something new. If you want, you can also follow me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`destiny-erhabor`)](https://linkedin.com/in/destiny-erhabor) or [Twitter <FontIcon icon="fa-brands fa-x-twitter"/>`caesar_sage`](https://x.com/caesar_sage).

<!-- START: ARTICLE CARD -->
```component VPCard
{
  "title": "What is Amazon EC2 Auto Scaling?",
  "desc": "Auto scaling is like having a smart system that keeps an eye on how many people are visiting your website. When you have a lot of people, it quickly adds more servers to handle the extra traffic. And when things quiet down, it scales back to save you...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-amazon-ec2-auto-scaling.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
<!-- END: ARTICLE CARD -->