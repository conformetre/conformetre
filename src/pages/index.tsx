import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import type { HeadFC } from "gatsby"
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { QualificationForm, QualifResults } from '../components';


export default function HomePage() {
  const [formResult, setFormResult] = React.useState<number | null>(null);

  return (
    <Container style={{ maxWidth: 800 }}>
      <Stack gap={5}>
        <div>
          <h1>EnerDiag</h1>
          <h2>Testez votre confort en un éclair !</h2>
        </div>
        <QualificationForm onNewResponses={setFormResult}/>
        { formResult && (<QualifResults result={formResult}/>) }
      </Stack>
    </Container>
  )
}

export const Head: HeadFC = () => <title>EnerDiag</title>

