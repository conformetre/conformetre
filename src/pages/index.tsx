import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import type { HeadFC } from "gatsby"
import Container from 'react-bootstrap/Container';
import { QualificationForm, QualifResults } from '../components';


export default function HomePage() {
  const [formResult, setFormResult] = React.useState<number | null>(null);

  return (
    <Container>
      <h1>Conformètre</h1>
      <h2>Testez votre confort en un éclair !</h2>
      <QualificationForm onNewResponses={setFormResult}/>
      { formResult && (<QualifResults result={formResult}/>) }
    </Container>
  )
}

export const Head: HeadFC = () => <title>Conformètre</title>

