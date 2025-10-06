---
lang: en-US
title: "How to Create a ML Model with Azure Machine Learning Designer"
description: "Article(s) > How to Create a ML Model with Azure Machine Learning Designer"
icon: iconfont icon-microsoftazure
category: 
  - DevOps
  - Azure
  - AI
  - Machine Learning
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - azure
  - microsoft
  - ai
  - machine-learning
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a ML Model with Azure Machine Learning Designer"
    - property: og:description
      content: "How to Create a ML Model with Azure Machine Learning Designer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/create-an-ml-model-with-azure-machine-learning-designer.html
prev: /devops/azure/articles/README.md
date: 2024-06-25
isOriginal: false
author:
  - name: Eniola Ajala
    url : https://freecodecamp.org/news/author/eniola-ajala/
cover: https://freecodecamp.org/news/content/images/2024/06/F8825B00-8A4C-41D9-AE75-02A8631DE983.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Azure > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/azure/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a ML Model with Azure Machine Learning Designer"
  desc="Did you know that you can create machine learning models without writing any code? If you’re here, you’re probably curious about how to achieve this. In this article, I will guide you through building a regression model that predicts automobile price..."
  url="https://freecodecamp.org/news/create-an-ml-model-with-azure-machine-learning-designer"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/F8825B00-8A4C-41D9-AE75-02A8631DE983.jpeg"/>

Did you know that you can create machine learning models without writing any code? If you’re here, you’re probably curious about how to achieve this.

In this article, I will guide you through building a regression model that predicts automobile prices using Azure Machine Learning’s Low-Code/No-Code tools.

`Regression` is a supervised machine learning technique used for predicting numerical values. To understand regression better, you can read my previous article [here](https://medium.com/@ajalaeniola454/supervised-and-unsupervised-learning-in-machine-learning-06c7151a0c2a).

::: note Prerequisites

To fully understand and follow the steps in this tutorial, you need the following:

1. An Azure account: You must have an active Azure account.
2. An Azure subscription: An active Azure subscription is required.

:::

If you don’t have an Azure account yet, you can sign up for [<FontIcon icon="iconfont icon-microsoftazure"/>Azure for Students](https://azure.microsoft.com/en-us/free/students), the [GitHub Student Developer Pack (<FontIcon icon="iconfont icon-github"/>`edu/students`)](https://github.com/edu/students), or an [<FontIcon icon="iconfont icon-microsoftazure"/>Azure Free Trial](https://azure.microsoft.com/en-us/free). These options provide various benefits and free credits to get you started.

Now let's get into building our model. Follow the steps below to begin! Make sure you read till the end to learn the entire process.

---

## How to Set Up Your Azure Machine Learning Workspace

To start working with `Azure Machine Learning`, you first need to create a `workspace`. A `workspace` is a centralized place to manage all the resources and experiments in your machine learning projects.

### Step 1: Create a Resource Group

Start by signing in to the [<FontIcon icon="iconfont icon-microsoftazure"/>Azure Portal](https://azure.microsoft.com/en-us/get-started/azure-portal). Click the `Create a resource` button (the plus icon) on the left-hand navigation bar.

In the search bar, type “Machine Learning” and select `Azure Machine Learning` from the list.

![Navigating to the Azure Home page and clicking the plus icon to create a new resource for the machine learning project](https://freecodecamp.org/news/content/images/2024/06/1-1.png)

### Step 2: Create a New Azure Machine Learning Resource

Now click `Create` to begin setting up your workspace. You will need to fill in the necessary details:

- **Subscription:** Select your Azure subscription.
- **Resource Group:** Either select an existing resource group or create a new one by clicking `Create new` and providing a name.
- **Workspace Name:** Provide a unique name for your workspace.
- **Region**: Choose a region that is closest to your location to reduce latency.
- **Container Registry:** Choose `Create new` unless you have an existing container registry you want to use.

![Browsing the Azure Marketplace for machine learning services to find the appropriate tool for building and deploying models.](https://freecodecamp.org/news/content/images/2024/06/3-1.png)

### Step 3: Review and Create

Fill in the form with all the required info. Make sure you provide a unique `Name` and select a region. Then create your new container registry.

Review your settings to ensure everything is correct. Then click `Review + create` to validate your configuration. Once the validation is complete, click `Create` to deploy your workspace. This process may take a few minutes.

![Setting up a new machine learning workspace in Azure with essential configuration details.](https://freecodecamp.org/news/content/images/2024/06/5-1.png)

### Step 4: Deployment

After the deployment is complete, click the `Go to resource` button to navigate to your new workspace.

In the workspace overview, click `Launch studio` to open the `Azure Machine Learning Studio`, where you will perform all your machine learning tasks.

![Resource deployment complete in Microsoft Azure Machine Learning Services.](https://freecodecamp.org/news/content/images/2024/06/7.png)

---

## How to Set Up Compute Resources in Azure Machine Learning Studio

Once your workspace deployment is complete, you need to set up the compute resources required to run your machine learning experiments. Follow the steps below to do this.

### Step 1: Access the Workspace

After the deployment is complete, click the `Go to resource button`. In the workspace overview, click `Launch studio` to open the Azure Machine Learning Studio.

### Step 2: Create a Compute Instance

In the Azure Machine Learning Studio, navigate to the left-hand menu and click on Compute. Select the `Compute instances` tab, then click `+ New` to create a new compute instance.

Fill in the required details:

- **Virtual machine size:** Select `Standard_DS11_v2` for a balance of performance at minimal cost.
- **Compute name:** Enter a unique name for your compute instance.

Then click `Create` set up the compute instance. This process might take a few minutes.

![Configuring compute instances in Azure Machine Learning to ensure the required computational power for training machine learning models.](https://freecodecamp.org/news/content/images/2024/06/conp-running.png)

### Step 3: Create a Compute Cluster

In addition to a compute instance, you will need a compute cluster for scalable training. Still under the `Compute` section, select the `Compute clusters` tab and click `+ New`.

Fill in the details:

- **Cluster name:** Enter a unique name for your compute cluster.
- **Virtual machine size:** Choose `Standard_DS11_v2`.
- **Minimum number of nodes:** Set to `0` to save costs when not in use.
- **Maximum number of nodes:** Set to `2` for this tutorial.

Then click `Create` to set up the compute cluster. Wait for the cluster to be in a running state before proceeding.

![Overview of compute clusters in Azure Machine Learning](https://freecodecamp.org/news/content/images/2024/06/11.png)

---

## How to Create Your Machine Learning Pipeline

In this section, we will create a `machine learning pipeline` using `Azure Machine Learning Designer`. Pipelines help streamline the process of preparing data, training models, and deploying them.

### Step 1: Navigate to the Designer

In the Azure Machine Learning Studio, go to the left navigation bar and click on `Designer`. Then click `+ New pipeline` to start creating a new pipeline.

![Interface showing the creation of a new pipeline.](https://freecodecamp.org/news/content/images/2024/06/p1.png)

### Step 2: Add Your Data

You have the option to use external data or prebuilt sample datasets. For this tutorial, we’ll use a prebuilt sample dataset.

To use prebuilt sample data, click on the `Components` tab. Use the search bar or manually scroll to find the `Automobile price data` dataset. Drag and drop the dataset onto the canvas in the Designer.

![Interface showing the addition of Automobile price data set.](https://freecodecamp.org/news/content/images/2024/06/p2.png)

### Step 3: Explore the Data

Once the dataset is on the canvas, click on it to view its details. Navigate to the `Visualizations` tab to explore data distribution and statistical summaries. Click the `Output+logs` tab and then `Preview data` to inspect the first few rows of the dataset. This will help you understand the data's structure and identify any potential issues.

![Visualization of dataset](https://freecodecamp.org/news/content/images/2024/06/p3.png)

### Step 4: Prepare the Data

To specify the variables we want to work with, we need to filter out unnecessary columns.

From the `Data Transformation` section, drag and drop the `Select Columns in Dataset` module onto the canvas below the dataset. Connect the output node of the dataset to the input node of the `Select Columns in Dataset` module.

Open the module’s settings, select the columns you want to include in your model, and exclude irrelevant columns such as `normalized-losses.` (*We are removing this column because it has high percentage of missing data*). Click `Save and close` to apply the changes.

![Interface for selecting columns in the dataset.](https://freecodecamp.org/news/content/images/2024/06/n1-1.png)

Next, you will need to clean any missing data. This helps us handle missing values to improve the model's accuracy.

To do this, drag and drop the `Clean Missing Data` module onto the canvas, below the `Select Columns in Dataset` module. Connect the nodes and configure the settings to remove rows with missing values. Save and close the settings.

![Interface for cleaning columns in the dataset.](https://freecodecamp.org/news/content/images/2024/06/n2.png)

### Step 5: Normalize the Data

To ensure the model performs well, we need to normalize the data. To do this, from the `Data Transformation` section, drag and drop the `Normalize Data` module onto the canvas. Connect the output of the `Clean Missing Data` module to the input of the `Normalize Data` module.

You'll want to configure the module to use the `MinMax` scaling method and select the columns to normalize, you can type them out manually by separating each column with a comma. Then save and close the settings.

![Interface for normalizing columns in the dataset.](https://freecodecamp.org/news/content/images/2024/06/n3.png)

### Step 6: Finalize the Pipeline Setup

Once all transformations are in place, review the pipeline to ensure all steps are correctly configured. Click `Submit` to run the pipeline. You can monitor the pipeline’s progress in the `Jobs` section.

::: note

Each time you set up a module and you click submit, `view the details` of the `pipeline job` to keep track of your flows.

:::

![Monitoring pipeline through the link](https://freecodecamp.org/news/content/images/2024/06/n4.png)

---

## How to Build the Model

This is the fun step where we start building our machine learning model by preparing the dataset for training and applying the appropriate algorithms.

### Step 1: Split the Dataset

Drag and drop the Split Data module onto the canvas. Then connect the output of the Normalize Data module to the input of the `Split Data` module.

In the settings panel of the Split Data module:

- Set the `Fraction of rows` in the first output dataset to 0.7. This means 70% of the data will be used for training the model.
- Set the `Randomized seed` to any number to ensure reproducibility. For this tutorial, use 123.    

### Step 2: Train the Model

Now it's time to add the `Train Model` block. Drag and drop the `Train Model` module onto the canvas. Connect the first output of the `Split Data` module (the 70% training data) to the input of the `Train Model` module.

Click on the `Train Model` module to configure its settings. In the `Edit column` section, select the target variable, which in this case is `price.` Save and close the settings.

Next, you'll add the Training Algorithm. From the `Machine Learning Algorithms` section, drag and drop the `Linear Regression` module onto the canvas. Connect the output of the `Linear Regression` module to the right input of the `Train Model` module.

![Interface showing connection of modules in pipeline](https://freecodecamp.org/news/content/images/2024/06/n7.png)

### Step 3: Evaluate the Model:

Drag and drop the `Score Model` module onto the canvas. Connect the second output of the `Split Data` module (the 30% testing data) to the left input of the `Score Model` module. Connect the output of the `Train Model` module to the right input of the `Score Model` module.  This will apply the trained model to the testing data to evaluate its performance.

Next, drag and drop the `Evaluate Model` module onto the canvas. Connect the output of the `Score Model` module to the input of the `Evaluate Model` module. This will provide various evaluation metrics to assess the model’s accuracy.

![Interface showing connection of modules in pipeline](https://freecodecamp.org/news/content/images/2024/06/model-1.png)

### Step 4: Review and Submit

Double-check all connections and settings in your pipeline. Then click `Submit` to run the model training and evaluation pipeline. You can monitor the job’s progress in the `Jobs` section, where you can view logs and outputs.

---

## How to Evaluate the Model

After training our model, it’s important to evaluate its performance to ensure it’s making accurate predictions. We will use the `Score Model` and `Evaluate Model` modules for this purpose.

### Step 1: Evaluate the Model’s Performance

Drag and drop the `Evaluate Model` module onto the canvas. Connect the output of the `Score Model` module to the input of the `Evaluate Model` module.

The `Evaluate Model` module will generate various evaluation metrics, such as Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and R-squared (R²), which are critical for assessing the accuracy and performance of the regression model.

### Explore the Evaluation Metrics:

Once the pipeline execution is complete, click on the `Evaluate Model` module to explore the detailed metrics.

Here are some key metrics to focus on:

- **Mean Absolute Error (MAE):** Measures the average magnitude of errors in predictions, without considering their direction. Lower values indicate better accuracy.
- **Root Mean Squared Error (RMSE):** Similar to MAE but gives more weight to larger errors. Lower values are better.
- **R-squared (R²):** Indicates how well the model’s predictions match the actual data. Values closer to 1 signify a better fit.

![Visualization of data output from the regression model.](https://freecodecamp.org/news/content/images/2024/06/n9.png)

We just built and evaluated our model. Yayy!

---

## How to Deploy the Model

Now that we have trained and evaluated our regression model, it’s time to deploy it for real-time inference using Azure Machine Learning. Follow these steps to deploy the model and create an inference pipeline.

### Step 1: Create the Inference Pipeline

Navigate to the `Designer` section in Azure Machine Learning Studio and create a new pipeline for deployment. Select `Real-time inference` to set up the deployment pipeline automatically.

### Step 2: Configure the Pipeline

After selecting Real-time inference, the pipeline will be initialized with default components. You can modify the pipeline by adding necessary components.

We have to make some changes like adding `Enter data manually`, `Execute python script` modules. Also, in the `select column in dataset` block, edit and remove the price column. Remove connection between `Score model` and `web service`.

#### `Enter Data Manually`

Drag and drop this block onto the canvas. This component allows manual input of data for prediction. Copy and paste the data below into the `data` field.

```plaintext
symboling,fuel-type,aspiration,num-of-doors,body-style,drive-wheels,engine-location,wheel-base,length,width,height,curb-weight,engine-type,num-of-cylinders,engine-size,fuel-system,bore,stroke,compression-ratio,horsepower,peak-rpm,city-mpg,highway-mpg,make 3,gas,std,two,convertible,rwd,front,88.6,168.8,64.1,48.8,2548,dohc,four,130,mpfi,3.47,2.68,9,111,5000,21,27,alfa-romero giulia 3,gas,std,two,convertible,rwd,front,88.6,168.8,64.1,48.8,2548,dohc,four,130,mpfi,3.47,2.68,9,111,5000,21,27,alfa-romero stelvio 1,gas,std,two,hatchback,rwd,front,94.5,171.2,65.5,52.4,2823,ohcv,six,152,mpfi,2.68,3.47,9,154,5000,19,26,alfa-romero Quadrifoglio 2,gas,std,four,sedan,fwd,front,99.8,176.6,66.2,54.3,2337,ohc,four,109,mpfi,3.19,3.4,10,102,5500,24,30,audi 100 ls 2,gas,std,four,sedan,4wd,front,99.4,176.6,66.4,54.3,2824,ohc,five,136,mpfi,3.19,3.4,8,115,5500,18,22,audi 100ls 2,gas,std,two,sedan,fwd,front,99.8,177.3,66.3,53.1,2507,ohc,five,136,mpfi,3.19,3.4,8.5,110,5500,19,25,audi fox 1,gas,std,four,sedan,fwd,front,105.8,192.7,71.4,55.7,2844,ohc,five,136,mpfi,3.19,3.4,8.5,110,5500,19,25,audi 100ls 1,gas,std,four,wagon,fwd,front,105.8,192.7,71.4,55.7,2954,ohc,five,136,mpfi,3.19,3.4,8.5,110,5500,19,25,audi 5000 1,gas,turbo,four,sedan,fwd,front,105.8,192.7,71.4,55.9,3086,ohc,five,131,mpfi,3.13,3.4,8.3,140,5500,17,20,audi 4000
```

#### `Execute Python Script`

Replace the code in this block with:

```py
import pandas as pd 

def azureml_main(dataframe1=None, dataframe2=None): 
    scored_results = dataframe1[["Scored Labels"]]
    scored_results.rename(columns={"Scored Labels": "predicted price"}, inplace=True)  
    return scored_results
```

#### `Select Columns in Dataset`

Edit and remove the `price` column to ensure it’s not included in the input data for predictions.

#### `Remove Connection`

Disconnect the `Score Model` module from the web service output to ensure only the `Execute Python Script` block connects to it.

See the images below for a visual representation of how the connections are configured.

![Interface of modules connection in pipeline](https://freecodecamp.org/news/content/images/2024/08/3E905EDF-3F19-4451-8F31-6F80F7212957.png)

### Step 3: Submit and Deploy the Model

Submit the flow and wait for all processes to complete successfully (green check mark). Once your deployment is successful, you can explore the output to verify everything is functioning as expected.

You can now deploy the model as a real-time web service for predictions.

![Configuration settings for setting up new pipeline](https://freecodecamp.org/news/content/images/2024/06/n13.png)

Once all the processes are successfully completed in Azure Machine Learning Studio, you are ready to explore the output and deploy your trained model as a real-time web service.

Here’s how you can proceed:

1. **Review Pipeline Execution:** Ensure that all the steps in your pipeline have completed with a green check mark indicating success.
2. **View Outputs and Visualizations:** Navigate through the different components of your pipeline to inspect outputs and visualizations generated during data transformation, model training, and evaluation stages. This helps in understanding how each step has contributed to the overall model performance.
3. **Check Evaluation Metrics:** Examine the evaluation scores generated by the `Score Model` block to assess the performance of your trained regression model. Common evaluation metrics include Mean Squared Error (MSE), R-squared (R2), and Root Mean Squared Error (RMSE). These metrics provide insights into how well your model predicts automobile prices based on the input features.

![Visualization of data output from model evaluation.](https://freecodecamp.org/news/content/images/2024/06/n10-1.png)

Put the following checks in place before starting the deployment:

#### Prepare for Deployment

First, ensure that the `Execute Python Script` block is correctly configured to transform input data and produce predicted prices.

You'll also want to verify that the pipeline is set up to handle real-time inference for deploying the model.

#### Submit the Pipeline

Click on the submit button to initiate the deployment process. Wait for Azure Machine Learning to complete the deployment and verify that all components have been successfully deployed.

#### Deploy as Web Service

Once deployment is confirmed successful, you can deploy the model as a real-time web service. This web service will be hosted on Azure and can be accessed via API endpoints, allowing applications to send data and receive predictions in real-time.

#### Testing the Web Service:

Use the `Enter Data Manually` block to manually input test data or use external systems to send requests to the deployed web service endpoint. You can verify that the web service responds with predicted prices based on the input features.

#### Monitor and Manage:

Monitor the performance of your deployed web service using Azure Machine Learning monitoring tools. You can manage the deployment by scaling resources as needed or updating the model with new data or improved versions.

Deploying your regression model as a real-time web service enables you to use its predictive capabilities in various applications without the need for direct human intervention. It ensures that your model can continuously provide accurate predictions based on real-time data inputs.

![Interface showing predicted price](https://freecodecamp.org/news/content/images/2024/06/n17.png)

---

## Clean Up

The web service you created is hosted in an `Azure Container Instance`. If you don’t intend to experiment with it further, you should delete the endpoint to avoid accruing unnecessary Azure usage.

Deleting your compute ensures your subscription won’t be charged for compute resources. You will, however, be charged a small amount for data storage as long as the Azure Machine Learning workspace exists in your subscription.

If you have finished exploring Azure Machine Learning, you can delete the Azure Machine Learning workspace and associated resources.

To delete your workspace:

1. In the [<FontIcon icon="iconfont icon-microsoftazure"/>Azure portal](https://portal.azure.com/?azure-portal=true), in the **Resource groups** page, open the resource group you specified when creating your Azure Machine Learning workspace.
2. Click **Delete resource group**, type the resource group name to confirm you want to delete it, and select **Delete**.

---

## Conclusion

Congratulations! You have successfully created and deployed a regression model using Azure Machine Learning Designer without writing a single line of code.

In this tutorial, you have learned how to clean and preprocess data, build and train a machine learning model, evaluate its performance, and deploy it as a web service. This low-code/no-code approach in Azure Machine Learning Designer makes it accessible for everyone to use the power of machine learning.

Remember to clean up your resources to avoid unnecessary charges. With these skills, you can now experiment with other datasets and machine learning problems. Azure's possibilities are endless, and Azure Machine Learning provides a robust platform for your data science projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a ML Model with Azure Machine Learning Designer",
  "desc": "Did you know that you can create machine learning models without writing any code? If you’re here, you’re probably curious about how to achieve this. In this article, I will guide you through building a regression model that predicts automobile price...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/create-an-ml-model-with-azure-machine-learning-designer.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
