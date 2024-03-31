import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import type { HeadFC } from "gatsby"
import { useForm } from "react-hook-form"
import Container from 'react-bootstrap/Container';
import { QualificationForm, QuantiForm } from '../components';


type Inputs = {
  address: string
}


export default function DetailedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <Container>
      <h1>Conformètre</h1>
      <h2>Testez votre confort en un éclair !</h2>
      <QualificationForm/>
      <QuantiForm/>
    </Container>
  )
}

export const Head: HeadFC = () => <title>Conformètre</title>

