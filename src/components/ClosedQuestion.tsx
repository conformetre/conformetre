import * as React from "react"
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import type { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  label: string;
  value: string;
}

type Props = {
  question: string;
  options: Option[];
  register: UseFormRegisterReturn
}


export default function ClosedQuestion({ question, options, register }: Props) {
  return (
    <Form.Group>
      <Stack gap={2}>
        <Form.Label>{question}</Form.Label>
        <Stack gap={1}>
          {options.map(option =>
            <Form.Check
              key={option.value}
              {...register}
              type="radio"
              value={option.value}
              label={option.label}
            />
          )}
        </Stack>          
      </Stack>
    </Form.Group>
  )
}

