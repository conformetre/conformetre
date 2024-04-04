import * as React from "react"
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import type { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  id: string;
  label: string;
  value: string;
}

type Props = {
  question: string;
  questionId: string;
  options: Option[];
  register: UseFormRegisterReturn
}


export default function ClosedQuestion({ question, questionId, options, register }: Props) {
  return (
    <Form.Group>
      <Stack gap={2}>
        <Form.Label>{question}</Form.Label>
        <Stack gap={1}>
          {options.map(option =>
            <Form.Check
              id={`${questionId}-${option.id}`}
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

