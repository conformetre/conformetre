import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import type { HeadFC } from "gatsby"
import Container from 'react-bootstrap/Container';
import Stack from "react-bootstrap/Stack";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { AddressForm, DpeAndSurfaceForm, QuantiResults } from '../components';
import { computeSalary } from "../lib";
import type { EconmicResults, EstimatedResults } from "../lib";


export default function QuantitativePage() {
  const [formResult, setFormResult] = React.useState<(Pick<EstimatedResults, "dpe" | "surface"> & EconmicResults) | null>(null);

  return (
    <Container style={{ maxWidth: 800 }}>
      <Stack gap={5}>
        <div>
          <h1>EnerDiag</h1>
          <h2>Questionnaire quantitatif</h2>
        </div>
        <Tabs defaultActiveKey="address" >
          <Tab eventKey="address" title="Utiliser mon adresse">
            <AddressForm handleNewEstimation={computeAndShowResults}/>
          </Tab>
          <Tab eventKey="profile" title="Utiliser le DPE et la surface">
            <DpeAndSurfaceForm onNewResponses={computeAndShowResults}/>
          </Tab>
        </Tabs>
        { formResult && (
          <QuantiResults
            conso_annuelle_m2={formResult.surface}
            dpe={formResult.dpe}
            yearlyMinRevenue={formResult.minRevenue}
            surface={formResult.surface}
            yearlyCost={formResult.yearlyCost}
          />
        )}
      </Stack>
    </Container>
  )

  function computeAndShowResults(estimation: Pick<EstimatedResults, "dpe" | "surface">) {
    setFormResult({
      ...estimation,
      ...computeSalary(estimation)
    });
  }
}

export const Head: HeadFC = () => <title>EnerDiag - quantitatif</title>

