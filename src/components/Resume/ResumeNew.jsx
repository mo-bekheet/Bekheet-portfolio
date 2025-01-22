import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import Particle from "../Particle";
import pdf from "../../assets/Mohamed-Bekheet.pdf";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { AiOutlineDownload } from "react-icons/ai";
// import { Document, Page, pdfjs } from "react-pdf";
import { Viewer } from '@react-pdf-viewer/core'
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = GlobalWorkerOptions.workerSrc;
const defaultLayoutPluginInstance = defaultLayoutPlugin();

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        {/* <Particle /> */}
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume">
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Viewer
          fileUrl='/assets/pdf-open-parameters.pdf'
          plugins={[
              // Register plugins
              defaultLayoutPluginInstance
          ]}
      />

        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>

        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
