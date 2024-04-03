import * as React from "react"
import Form from 'react-bootstrap/Form';
import { DPE_IDS } from "../lib";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    id: string;
    label: string;
    register: UseFormRegisterReturn;
}

export default function DpeSelector({ id, label, register }: Props) {
  return (
    <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Select {...register} aria-label={label}>
          {DPE_IDS.map(dpeId =>
            <option value={dpeId}>{dpeId}</option>
          )}
        </Form.Select>
    </Form.Group>
  )
}