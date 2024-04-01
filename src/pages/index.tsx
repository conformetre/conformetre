import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import type { HeadFC } from "gatsby"
import Container from 'react-bootstrap/Container';
import { QualificationForm, QuantiForm } from '../components';
import type { QuantiInfo } from '../components';


type Inputs = {
  address: string
}


export default function DetailedForm() {
  return (
    <Container>
      <h1>Conformètre</h1>
      <h2>Testez votre confort en un éclair !</h2>
      <QualificationForm/>
      <QuantiForm
        handleNewEstimation={(data: QuantiInfo) => console.log(data)}
      />
    </Container>
  )
}

export const Head: HeadFC = () => <title>Conformètre</title>

