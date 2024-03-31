import * as React from "react"
import { useForm } from "react-hook-form"
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ClosedQuestion from './ClosedQuestion';

type Answer = "veryBad" | "bad" | "ok";

type Qualification = {
  temperature: Answer;
  humidity: Answer;
  wind: Answer;
  resources: Answer;
}

type ClosedQuestionProps = {
  name: keyof Qualification;
  question: string;
  options: {
    label: string;
    value: Answer;
  }[]
};

const questions: ClosedQuestionProps[] = [
  {
    name: "temperature",
    question: "En hiver dans mon logement j'ai :",
    options: [
      { value: "veryBad", label: "Très froid" },
      { value: "bad", label: "Froid" },
      { value: "ok", label: "Une bonne température" }
    ]
  },
  {
    name: "humidity",
    question: "Dans mes pièces de vie (cuisine, salon, chambre) j'ai :",
    options: [
      { value: "veryBad", label: "De l'humidité et des moisissures" },
      { value: "bad", label: "De l'humidité" },
      { value: "ok", label: "Une atmosphère saine" }
    ]
  },
  {
    name: "wind",
    question: "A l'intérieur je ressens des courants d'air :",
    options: [
      { value: "veryBad", label: "Souvent" },
      { value: "bad", label: "Parfois" },
      { value: "ok", label: "Jamais" }
    ]
  },
  {
    name: "resources",
    question: "Il m'arrive de me priver (alimentation, loisirs) pour payer ma facture d'énergie :",
    options: [
      { value: "veryBad", label: "Souvent" },
      { value: "bad", label: "Parfois" },
      { value: "ok", label: "Jamais" }
    ]
  }
];


export default function QualificationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch
  } = useForm<Qualification>()
  
  return (
    <Form>
      <Stack gap={4}>
        {questions.map(({ name, question, options}) =>
          <ClosedQuestion
            key={name}
            question={question}
            register={register(name)}
            options={options}
          />
        )}
        <Button onClick={handleSubmit((data) => console.log(data))} variant="primary">Submit</Button>
      </Stack>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </Form>
  )
}