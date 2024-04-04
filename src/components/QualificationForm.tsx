import * as React from "react"
import { useForm } from "react-hook-form"
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ClosedQuestion from './ClosedQuestion';

type Props = {
  onNewResponses: (result: number) => void;
};

type FormResponses = {
  temperature: string;
  humidity: string;
  wind: string;
  resources: string;
}

type ClosedQuestionProps = {
  questionId: keyof FormResponses;
  question: string;
  options: {
    id: string;
    label: string;
    value: string;
  }[]
};

const questions: ClosedQuestionProps[] = [
  {
    questionId: "temperature",
    question: "En hiver dans mon logement j'ai :",
    options: [
      { id: "0", value: "0", label: "Très froid" },
      { id: "3", value: "3", label: "Froid" },
      { id: "6", value: "6", label: "Une bonne température" }
    ]
  },
  {
    questionId: "humidity",
    question: "Dans mes pièces de vie (cuisine, salon, chambre) j'ai :",
    options: [
      { id: "0", value: "0", label: "De l'humidité et des moisissures" },
      { id: "3", value: "3", label: "De l'humidité" },
      { id: "6", value: "6", label: "Une atmosphère saine" }
    ]
  },
  {
    questionId: "wind",
    question: "A l'intérieur je ressens des courants d'air :",
    options: [
      { id: "0", value: "0", label: "Souvent" },
      { id: "2", value: "2", label: "Parfois" },
      { id: "4", value: "4", label: "Jamais" }
    ]
  },
  {
    questionId: "resources",
    question: "Il m'arrive de me priver (alimentation, loisirs) pour payer ma facture d'énergie :",
    options: [
      { id: "0", value: "0", label: "Souvent" },
      { id: "2", value: "2", label: "Parfois" },
      { id: "4", value: "4", label: "Jamais" }
    ]
  }
];


export default function QualificationForm({ onNewResponses }: Props) {
  const {
    register,
    handleSubmit
  } = useForm<FormResponses>()
  
  return (
    <Form>
      <Stack gap={4}>
        {questions.map(({ questionId, question, options}) =>
          <ClosedQuestion
            key={questionId}
            question={question}
            questionId={questionId}
            register={register(questionId, { required: true })}
            options={options}
          />
        )}
        <Button onClick={handleSubmit((data) => computeResult(data))} variant="primary">Submit</Button>
      </Stack>
    </Form>
  )

  function computeResult(formResponses: FormResponses) {
    const result = Object.values(formResponses).reduce((partialSum, valueAsString) => {
      return partialSum + parseInt(valueAsString);
    }, 3); // Start with 3 as we're missing the question on the revenue
    onNewResponses(result);
  }
}