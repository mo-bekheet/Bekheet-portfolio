// Projects content data
export const projects = [
  {
    id: "project-1",
    thumbnail: "./Assets/Projects/coptic.png",
    title: "CopticTrans",
    description: "(graduation project of my master), Sponsor: Microsoft. CopticTrans is a Translation application build base on AI for translating the Coptic language with an OCR feature to extract the Coptic text from images before translation.",
    githubUrl: "https://github.com/mohamedbakhet/CopticTrans",
    tags: ["AI", "Translation", "OCR", "Machine Learning"],
    featured: true
  },
  {
    id: "project-2",
    thumbnail: "./Assets/Projects/ocr.png",
    title: "CardioAI",
    description: "Graduation project, Analysis ECG signal to diagnose severe heart disease. Build a Deep learning model that uses ECG signals to diagnose between 14 heart diseases, then use the second model to detect the location of myocardial infarction if found.",
    githubUrl: "https://github.com/mohamedbakhet/Analysis-ECG-signal-for-diagnosis-severe-heart-diseases.git",
    tags: ["Deep Learning", "Healthcare", "ECG Analysis", "Diagnosis"],
    featured: true
  },
  {
    id: "project-3",
    thumbnail: "./Assets/Projects/emr.png",
    title: "DataLake with AWS EMR",
    description: "A music streaming startup, Sparkify, wants to move their data warehouse to a data lake. Their data, stored in S3 as JSON logs of user activity and song metadata, needs to be processed. As their data engineer, your task is to build an ETL pipeline using Spark to extract, process, and load the data back into S3 as dimensional tables, enabling the analytics team to gain insights into user listening habits.",
    githubUrl: "https://github.com/mohamedbakhet/DataLake-with-AWS-EMR-",
    tags: ["AWS", "EMR", "ETL", "Big Data"],
    featured: true
  },
  {
    id: "project-4",
    thumbnail: "./Assets/Projects/redshift.png",
    title: "Data Warehouse With AWS Redshift",
    description: "Sparkify, a music streaming startup, aims to move their data processes to the cloud. Their data, stored in S3 as JSON logs and song metadata, will be processed using an ETL pipeline. This pipeline will load the data into Redshift, where it will be transformed into analytics tables, enabling deeper insights into user activity.",
    githubUrl: "https://github.com/mohamedbakhet/Data-Warehouse-With-AWS-Redshift/tree/main",
    tags: ["AWS", "Redshift", "ETL", "Cloud"],
    featured: false
  },
  {
    id: "project-5",
    thumbnail: "./Assets/Projects/postg.png",
    title: "Data Modeling with Postgres Sparkify",
    description: "Sparkify, a new music streaming app, seeks to analyze their collected data on songs and user activity. The analytics team is focused on understanding user listening patterns and performing other analyses. To achieve this, the project involves using PostgreSQL, Python, and SQL to create a Postgres database with well-structured tables. An ETL pipeline will be built to efficiently extract, transform, and load data, while a star schema with fact and dimension tables will be designed to optimize queries for song play analysis.",
    githubUrl: "https://github.com/mohamedbakhet/Data-Modeling-with-Postgres-Sparkify-",
    tags: ["PostgreSQL", "Data Modeling", "ETL", "SQL"],
    featured: false
  },
  {
    id: "project-6",
    thumbnail: "./Assets/Projects/cassandra.png",
    title: "Data Modeling with Apache Cassandra",
    description: "Sparkify, a startup, aims to analyze user activity and song listening habits on their new music streaming app. Currently, their data is stored in a directory of CSV files, making it challenging to generate insights. They have enlisted a data engineer to create an Apache Cassandra database to facilitate querying and analysis of song play data. Your role in the project is to design and implement this database, allowing the analysis team to run specific queries and extract valuable insights from the user activity data.",
    githubUrl: "https://github.com/mohamedbakhet/Data-Modeling-with-AWS-EMR-",
    tags: ["Cassandra", "Data Modeling", "Database"],
    featured: false
  },
  {
    id: "project-7",
    thumbnail: "./Assets/Projects/cgen.png",
    title: "CGAN for Fake Task Detection",
    description: "This project repository focuses on utilizing Conditional Generative Adversarial Networks (CGANs) to both generate and detect fake tasks within Mobile Crowdsensing Systems (MCS). The project aims to advance the field by developing sophisticated techniques for synthetic task generation and detection. It combines traditional machine learning models, like Random Forest and AdaBoost, with innovative GAN technology to create and identify fake tasks.",
    githubUrl: "https://github.com/mohamedbakhet/CGAN-for-Fake-Task-Detection-in-Mobile-Crowdsensing-Systems-MCS-",
    tags: ["GAN", "Machine Learning", "Mobile Crowdsensing"],
    featured: false
  },
  {
    id: "project-8",
    thumbnail: "./Assets/Projects/amazon.png",
    title: "Amazon book reviews",
    description: "This project provides a comprehensive project for collecting, analyzing, and visualizing Amazon book reviews. It includes tools and Jupyter notebooks for generating a dataset from Amazon reviews and performing various types of analysis. This project aims to uncover insights into customer sentiments and trends in book reviews on Amazon.",
    githubUrl: "https://github.com/mohamedbakhet/Amazon-book-reviews",
    tags: ["NLP", "Sentiment Analysis", "Data Visualization"],
    featured: false
  },
  {
    id: "project-9",
    thumbnail: "./Assets/Projects/sentiment.png",
    title: "Sentiment Analysis in Arabic tweets",
    description: "This project aims to classify Arabic tweets as positive, negative, or neutral using Natural Language Processing (NLP) and transfer learning. It focuses on handling the unique challenges of Arabic language processing, such as dialects and informal text. By leveraging pre-trained models, the project enhances accuracy in sentiment detection, providing valuable insights into public sentiment in the Arabic-speaking world.",
    githubUrl: "https://github.com/mohamedbakhet/Sentiment-Analysis-in-Arabic-tweets",
    tags: ["NLP", "Arabic NLP", "Sentiment Analysis", "Transfer Learning"],
    featured: false
  }
];