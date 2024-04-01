import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import type { HeadFC } from "gatsby"
import Container from 'react-bootstrap/Container';
import { QualificationForm, QuantiForm, QuantiResults } from '../components';
import { computeSalary } from "../lib";
import type { EconmicResults, EstimatedResults } from "../lib";


type Inputs = {
  address: string
}

export default function DetailedForm() {
  const [formResult, setFormResult] = React.useState<(EstimatedResults & EconmicResults) | null>(null);

  return (
    <Container>
      <h1>Conformètre</h1>
      <h2>Testez votre confort en un éclair !</h2>
      <QualificationForm/>
      <QuantiForm
        handleNewEstimation={handleNewEstimation}
      />
      { formResult && (
        <QuantiResults
          conso_annuelle_m2={formResult.surface}
          dpe={formResult.dpe}
          minRevenue={formResult.minRevenue}
          surface={formResult.surface}
          yearlyCost={formResult.yearlyCost}
        />
      )}

    </Container>
  )

  function handleNewEstimation(estimation: EstimatedResults) {
    setFormResult({
      ...estimation,
      ...computeSalary(estimation)
    });
  }
}

export const Head: HeadFC = () => <title>Conformètre</title>

