import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import type { HeadFC } from "gatsby"
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { QualificationForm, QualifResults } from '../components';
import { computeSalary } from "../lib";
import type { EconmicResults, EstimatedResults } from "../lib";


export default function HomePage() {
  const [formResult, setFormResult] = React.useState<(Pick<EstimatedResults, "dpe" | "surface"> & EconmicResults) | null>(null);

  return (
    <Container>
      <h1>Conformètre</h1>
      <h2>Testez votre confort en un éclair !</h2>
      <QualificationForm/>
      <QualifResults result={12}/>
      <Alert variant="primary">
        <b>Obtenez plus d'informations grace au <a href="/quantitatif">questionnaire quantitatif</a>.</b>
      </Alert>
    </Container>
  )
}

export const Head: HeadFC = () => <title>Conformètre</title>

