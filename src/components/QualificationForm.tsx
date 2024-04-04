import * as React from "react"
import { useForm } from "react-hook-form"
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ClosedQuestion from './ClosedQuestion';

type FormResponses = {
  temperature: string;
  humidity: string;
  wind: string;
  resources: string;
}

type ClosedQuestionProps = {
  name: keyof FormResponses;
  question: string;
  options: {
    label: string;
    value: string;
  }[]
};

const questions: ClosedQuestionProps[] = [
  {
    name: "temperature",
    question: "En hiver dans mon logement j'ai :",
    options: [
      { value: "0", label: "Très froid" },
      { value: "3", label: "Froid" },
      { value: "6", label: "Une bonne température" }
    ]
  },
  {
    name: "humidity",
    question: "Dans mes pièces de vie (cuisine, salon, chambre) j'ai :",
    options: [
      { value: "0", label: "De l'humidité et des moisissures" },
      { value: "3", label: "De l'humidité" },
      { value: "6", label: "Une atmosphère saine" }
    ]
  },
  {
    name: "wind",
    question: "A l'intérieur je ressens des courants d'air :",
    options: [
      { value: "0", label: "Souvent" },
      { value: "2", label: "Parfois" },
      { value: "4", label: "Jamais" }
    ]
  },
  {
    name: "resources",
    question: "Il m'arrive de me priver (alimentation, loisirs) pour payer ma facture d'énergie :",
    options: [
      { value: "0", label: "Souvent" },
      { value: "2", label: "Parfois" },
      { value: "4", label: "Jamais" }
    ]
  }
];


export default function QualificationForm() {
  const {
    register,
    handleSubmit,
    watch
  } = useForm<FormResponses>()
  
  return (
    <Form>
      <Stack gap={4}>
        {questions.map(({ name, question, options}) =>
          <ClosedQuestion
            key={name}
            question={question}
            register={register(name, { required: true })}
            options={options}
          />
        )}
        <Button onClick={handleSubmit((data) => console.log(data))} variant="primary">Submit</Button>
      </Stack>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </Form>
  )
}