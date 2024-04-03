import * as React from "react"
import { useForm } from "react-hook-form"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import InputWithLabel from "./InputWithLabel";


type FormResponses = {
  dpe: string;
  surface: string;
};

export default function DpeAndSurfaceForm() {
  const {
    register,
    handleSubmit,
    watch
  } = useForm<FormResponses>();

  const dpeLabel = "Renseignez le DPE de votre logement";
  const dpePlaceholder = "D";
  const surfaceLabel = "Renseignez la surface de votre logement";
  const surfacePlaceholder = "38";

  return (
    <Form>
      <Stack gap={4}>
        <InputWithLabel
          id="dpe"
          label={dpeLabel}
          placeholder={dpePlaceholder}
          register={register("dpe", { required: true })}
          type="text"
        />
        <InputWithLabel
          id="surface"
          label={surfaceLabel}
          placeholder={surfacePlaceholder}
          register={register("surface", { required: true })}
          type="text"
        />
        <Button
          onClick={handleSubmit(async (data) => console.log(data))}
          variant="primary">
            Submit
        </Button>
      </Stack>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </Form>
  );
}