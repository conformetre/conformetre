import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import type { HeadFC } from "gatsby"
import Container from 'react-bootstrap/Container';
import { QualificationForm, QuantiForm, QuantiResults } from '../components';
import type { QuantiInfo } from '../components';


type Inputs = {
  address: string
}


export default function DetailedForm() {
  const [quantiInfo, setQuantiInfo] = React.useState<QuantiInfo | null>(null);

  return (
    <Container>
      <h1>Conformètre</h1>
      <h2>Testez votre confort en un éclair !</h2>
      <QualificationForm/>
      <QuantiForm
        handleNewEstimation={setQuantiInfo}
      />
      { quantiInfo && (
        <QuantiResults
          conso_annuelle_m2={quantiInfo.surface}
          dpe={quantiInfo.dpe}
          minRevenue={1800}
          surface={quantiInfo.surface}
          yearlyCost={920}
        />
      )}

    </Container>
  )
}

export const Head: HeadFC = () => <title>Conformètre</title>

