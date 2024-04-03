import * as React from "react"
import Form from 'react-bootstrap/Form';
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    defaultValue?: string;
    id: string;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    type: string;
}

export default function InputWithLabel({ defaultValue, id, label, placeholder, register, type }: Props) {
  return (
    <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...register}
        />
    </Form.Group>
  )
}