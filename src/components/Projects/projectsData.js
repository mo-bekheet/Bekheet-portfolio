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
      "Master's graduation project, sponsored by Microsoft. Built an end-to-end AI translation app for the Coptic language: a custom OCR pipeline extracts ancient Coptic text from manuscript photos, then a neural translation model converts it — making a 2,000-year-old language accessible from a phone camera.",
    ghLink: "https://github.com/mohamedbakhet/CopticTrans",
    type: "original",
  },
  {
    imgPath: ocr,
    isBlog: false,
    title: "CardioAI",
    description:
      "BSc graduation project. Deep learning system that reads raw ECG signals and classifies 14 severe heart conditions, with a second-stage model localizing myocardial infarctions. Trained and validated on public ECG datasets; my first end-to-end medical AI pipeline.",
    ghLink:
      "https://github.com/mohamedbakhet/Analysis-ECG-signal-for-diagnosis-severe-heart-diseases.git",
    type: "original",
  },
  {
    imgPath: cgen,
    isBlog: false,
    title: "CGAN for Fake Task Detection",
    description:
      "Research project combining Conditional GANs with classical ML (Random Forest, AdaBoost) for Mobile Crowdsensing systems: the CGAN synthesizes realistic fake tasks used to train detectors that flag fraudulent submissions in crowdsourced platforms.",
    ghLink:
      "https://github.com/mohamedbakhet/CGAN-for-Fake-Task-Detection-in-Mobile-Crowdsensing-Systems-MCS-",
    type: "original",
  },
  {
    imgPath: sentiment,
    isBlog: false,
    title: "Arabic Sentiment Analysis",
    description:
      "NLP pipeline classifying Arabic tweets as positive/negative/neutral using transfer learning. Tackles what makes Arabic hard: dialect variation and informal text. Fine-tuned pre-trained transformers against classical baselines to measure the gap.",
    ghLink:
      "https://github.com/mohamedbakhet/Sentiment-Analysis-in-Arabic-tweets",
    type: "original",
  },
  {
    imgPath: amazon,
    isBlog: false,
    title: "Amazon Book Reviews Analytics",
    description:
      "Data product covering the full lifecycle of Amazon book-review data: dataset construction, sentiment and trend analysis, and interactive visualizations surfacing what drives customer opinion across genres.",
    ghLink: "https://github.com/mohamedbakhet/Amazon-book-reviews",
    type: "original",
  },
  {
    imgPath: emr,
    isBlog: false,
    title: "Data Lake on AWS EMR",
    description:
      "ETL pipeline on AWS EMR + Spark: ingested JSON user-activity and catalog data from S3, processed it into Parquet dimensional tables, and wrote partitioned output back to S3 for analytics. Focus areas: Spark job optimization, schema-on-read, cost-aware cluster sizing.",
    ghLink: "https://github.com/mohamedbakhet/DataLake-with-AWS-EMR-",
    type: "coursework",
    course: "Udacity Data Engineering Nanodegree",
  },
  {
    imgPath: redshift,
    isBlog: false,
    title: "Cloud Data Warehouse on Redshift",
    description:
      "Moved a music-streaming analytics workload to AWS Redshift: built idempotent ETL in Python that stages S3 JSON logs and song metadata into a star schema (fact songplays + dimensions), tuned distribution/distkeys for the heaviest analyst queries.",
    ghLink:
      "https://github.com/mohamedbakhet/Data-Warehouse-With-AWS-Redshift/tree/main",
    type: "coursework",
    course: "Udacity Data Engineering Nanodegree",
  },
  {
    imgPath: postg,
    isBlog: false,
    title: "Data Modeling with Postgres",
    description:
      "Designed a Postgres star schema for song-play analytics and the Python ETL that populates it from JSON logs: fact/dimension modeling, upsert handling, and query optimization for the analytics team's listening-pattern questions.",
    ghLink:
      "https://github.com/mohamedbakhet/Data-Modeling-with-Postgres-Sparkify-",
    type: "coursework",
    course: "Udacity Data Engineering Nanodegree",
  },
  {
    imgPath: cassandra,
    isBlog: false,
    title: "Data Modeling with Apache Cassandra",
    description:
      "Modeled Cassandra tables for high-volume song-play events, applying query-first design: one denormalized table per access pattern (session history, user playlists), with composite partition/clustering keys chosen from actual query shapes.",
    ghLink:
      "https://github.com/mohamedbakhet/Data-Modeling-with-Apache-Cassandra",
    type: "coursework",
    course: "Udacity Data Engineering Nanodegree",
  },
];
