import * as React from "react"
import { useForm } from "react-hook-form"
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { searchDPE } from "../lib/";
import InputWithLabel from "./InputWithLabel";
import type { EstimatedResults } from "../lib/";
import { ListGroup } from "react-bootstrap";

type Props = {
  handleNewEstimation: (results: EstimatedResults) => void;
}

export default function AddressForm({ handleNewEstimation }: Props) {
  const {
    register,
    handleSubmit
  } = useForm<{ address: string }>()
  const [showNotFoundError, setShowNotFoundError] = React.useState<Boolean>(false);
  const [results, setResults] = React.useState<EstimatedResults[]>([]);
  const [selected, setSelected] = React.useState<EstimatedResults>();

  React.useEffect(() => {
    if (! results.length) { return; }

    setSelected(results[0])
  }, [results])

  React.useEffect(() => {
    if (! selected) { return; }

    handleNewEstimation(selected)
  }, [selected])

  const label = "Entrez votre adresse postale";
  const placeholder = "14 Allee Sainte Therese 38700 Corenc";

  return (
    <Form>
      <Stack gap={4}>
        <InputWithLabel
          id="address"
          label={label}
          placeholder={placeholder}
          register={register("address", { required: true })}
          type="address"
        />
        <Button
          onClick={handleSubmit(async (data) => searchDPEAndHandleRes(data.address))}
          variant="primary">
            Chercher le logement
        </Button>
        <ListGroup defaultActiveKey="#link1">
          {results && results.length > 1 && results.map(result =>
            <ListGroup.Item as="li" action active={selected && result.id === selected.id} onClick={() => setSelected(result)} style={{ cursor: 'pointer' }}>
              {result.num_address} {result.nom_rue} {result.surface}m² {result.complement_address}
            </ListGroup.Item>
          )}
        </ListGroup>
        { showNotFoundError && (
          <Alert variant="warning" onClose={() => setShowNotFoundError(false)} dismissible>
            Nous n'avons pas trouvé les informations pour votre adresse, essayez une autre méthode de calcul.
          </Alert>
        )}

      </Stack>
    </Form>
  )

  async function searchDPEAndHandleRes(address: string) {
    setShowNotFoundError(false);
    const results = await searchDPE(address);
    if (! results.length) {
      setShowNotFoundError(true);
    }

    setResults(results);
  }
}