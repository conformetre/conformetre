import * as React from "react"
import { useForm } from "react-hook-form"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import DpeSelector from "./DpeSelector";
import InputWithLabel from "./InputWithLabel";
import type { DpeId } from "../lib";


type Props = {
  onNewResponses: (responses: FormResponses) => void;
}

type FormResponses = {
  dpe: DpeId;
  surface: number;
};

export default function DpeAndSurfaceForm({ onNewResponses }: Props) {
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
        <DpeSelector
          id="dpe"
          label={dpeLabel}
          register={register("dpe", { required: true })}
        />
        <InputWithLabel
          id="surface"
          label={surfaceLabel}
          placeholder={surfacePlaceholder}
          register={register("surface", { required: true, valueAsNumber: true })}
          type="number"
        />
        <Button
          onClick={handleSubmit(onNewResponses)}
          variant="primary">
            Submit
        </Button>
      </Stack>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </Form>
  );
}