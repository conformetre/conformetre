import * as React from "react"
import Alert from 'react-bootstrap/Alert';
import Stack from "react-bootstrap/Stack";

type Props = {
  result: number;
}

export default function QualifResults({ result }: Props) {
  const textResult = getTextResult(result);

  return (
    <Stack gap={2}>
      <div>
        Vous avez obtenu un résultat de <b>{result}/30</b>.
      </div>
      <Alert variant={textResult.variant}>
        {textResult.text}
      </Alert>
    </Stack>
  )

  function getTextResult(result: number) {
    if (result > 20) {
      return {
        text: "Votre confort et votre situation énergétique sont bons, vous pouvez trouver des conseils pour aller plus loin.",
        variant: "success"
      }
    } else if (result > 13) {
      return {
        text: "Il y a certainement des difficultés qui vous empêchent de vous sentir bien chez vous, vous pouvez trouver des conseils pour y remédier.",
        variant: "warning"
      }
    } else {
      return {
        text: "Vous êtes dans une situation anormale, vous pouvez être accompagné·e sur ce sujet.",
        variant: "danger"
      }
    }
  }
}

