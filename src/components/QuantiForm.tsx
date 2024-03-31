import * as React from "react"
import { useForm } from "react-hook-form"
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { searchDPE } from "../lib/";



export default function QuantiForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch
  } = useForm<{ address: string }>()

  const label = "Entrez votre adresse postale";
  const placeholder = "1 Allee Sainte Therese 38700 Corenc";

  return (
    <Form>
      <Stack gap={4}>
        <Form.Group controlId="address">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type="address"
            placeholder={placeholder}
            defaultValue={placeholder}
            {...register("address", { required: true })}
          />
        </Form.Group>
        <Button
          onClick={handleSubmit((data) => searchDPE(data.address))}
          variant="primary">
            Submit
        </Button>
      </Stack>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>

    </Form>
  )
}