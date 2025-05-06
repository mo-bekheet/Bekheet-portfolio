// projectsData.js
import redshift from "../../assets/Projects/redshift.png";
import cgen from "../../assets/Projects/cgen.png";
import sentiment from "../../assets/Projects/sentiment.png";
import emr from "../../assets/Projects/emr.png";
import amazon from "../../assets/Projects/amazon.png";
import coptic from "../../assets/Projects/coptic.png";
import ocr from "../../assets/Projects/ocr.png";
import postg from "../../assets/Projects/postg.png";
import cassandra from "../../assets/Projects/cassandra.png";

export const projectData = [
  {
    imgPath: coptic,
    isBlog: false,
    title: "CopticTrans",
    description:
      "(graduation project of my master), Sponsor: Microsoft. CopticTrans is a Translation application build base on AI for translating the Coptic language with an OCR feature to extract the Coptic text from images before translation.",
    ghLink: "https://github.com/mohamedbakhet/CopticTrans",
  },
  {
    imgPath: ocr,
    isBlog: false,
    title: "CardioAI",
    description:
      "Graduation project, Analysis ECG signal to diagnose severe heart disease. Build a Deep learning model that uses ECG signals to diagnose between 14 heart diseases, then use the second model to detect the location of myocardial infarction if found.",
    ghLink:
      "https://github.com/mohamedbakhet/Analysis-ECG-signal-for-diagnosis-severe-heart-diseases.git",
  },
  {
    imgPath: emr,
    isBlog: false,
    title: "DataLake with AWS EMR",
    description:
      "A music streaming startup, Sparkify, wants to move their data warehouse to a data lake. Their data, stored in S3 as JSON logs of user activity and song metadata, needs to be processed. As their data engineer, your task is to build an ETL pipeline using Spark to extract, process, and load the data back into S3 as dimensional tables, enabling the analytics team to gain insights into user listening habits.",
    ghLink: "https://github.com/mohamedbakhet/DataLake-with-AWS-EMR-",
  },
  {
    imgPath: redshift,
    isBlog: false,
    title: "Data Warehouse With AWS Redshift",
    description:
      "Sparkify, a music streaming startup, aims to move their data processes to the cloud. Their data, stored in S3 as JSON logs and song metadata, will be processed using an ETL pipeline. This pipeline will load the data into Redshift, where it will be transformed into analytics tables, enabling deeper insights into user activity.",
    ghLink:
      "https://github.com/mohamedbakhet/Data-Warehouse-With-AWS-Redshift/tree/main",
  },
  {
    imgPath: postg,
    isBlog: false,
    title: "Data Modeling with Postgres Sparkify",
    description:
      "Sparkify, a new music streaming app, seeks to analyze their collected data on songs and user activity. The analytics team is focused on understanding user listening patterns and performing other analyses. To achieve this, the project involves using PostgreSQL, Python, and SQL to create a Postgres database with well-structured tables. An ETL pipeline will be built to efficiently extract, transform, and load data, while a star schema with fact and dimension tables will be designed to optimize queries for song play analysis.",
    ghLink:
      "https://github.com/mohamedbakhet/Data-Modeling-with-Postgres-Sparkify-",
  },
  {
    imgPath: cassandra,
    isBlog: false,
    title: "Data Modeling with Apache Cassandra",
    description:
      "Sparkify, a startup, aims to analyze user activity and song listening habits on their new music streaming app. Currently, their data is stored in a directory of CSV files, making it challenging to generate insights. They have enlisted a data engineer to create an Apache Cassandra database to facilitate querying and analysis of song play data. Your role in the project is to design and implement this database, allowing the analysis team to run specific queries and extract valuable insights from the user activity data.",
    ghLink:
      "https://github.com/mohamedbakhet/Data-Modeling-with-Apache-Cassandra",
  },
  {
    imgPath: cgen,
    isBlog: false,
    title: "CGAN for Fake Task Detection",
    description:
      "This project repository focuses on utilizing Conditional Generative Adversarial Networks (CGANs) to both generate and detect fake tasks within Mobile Crowdsensing Systems (MCS). The project aims to advance the field by developing sophisticated techniques for synthetic task generation and detection. It combines traditional machine learning models, like Random Forest and AdaBoost, with innovative GAN technology to create and identify fake tasks.",
    ghLink:
      "https://github.com/mohamedbakhet/CGAN-for-Fake-Task-Detection-in-Mobile-Crowdsensing-Systems-MCS-",
  },
  {
    imgPath: amazon,
    isBlog: false,
    title: "Amazon book reviews",
    description:
      "This project provides a comprehensive project for collecting, analyzing, and visualizing Amazon book reviews. It includes tools and Jupyter notebooks for generating a dataset from Amazon reviews and performing various types of analysis. This project aims to uncover insights into customer sentiments and trends in book reviews on Amazon.",
    ghLink: "https://github.com/mohamedbakhet/Amazon-book-reviews",
  },
  {
    imgPath: sentiment,
    isBlog: false,
    title: "Sentiment Analysis in Arabic tweets",
    description:
      "This project aims to classify Arabic tweets as positive, negative, or neutral using Natural Language Processing (NLP) and transfer learning. It focuses on handling the unique challenges of Arabic language processing, such as dialects and informal text. By leveraging pre-trained models, the project enhances accuracy in sentiment detection, providing valuable insights into public sentiment in the Arabic-speaking world.",
    ghLink:
      "https://github.com/mohamedbakhet/Sentiment-Analysis-in-Arabic-tweets",
  },
];
