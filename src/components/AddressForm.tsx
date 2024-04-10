import * as React from "react"
import { useForm } from "react-hook-form"
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";
import { searchDPE } from "../lib/";
import InputWithLabel from "./InputWithLabel";
import type { EstimatedResults } from "../lib/";

type Props = {
  handleNewEstimation: (results: EstimatedResults | null) => void;
}

export default function AddressForm({ handleNewEstimation }: Props) {
  const {
    register,
    handleSubmit
  } = useForm<{ address: string }>()
  const [showNotFoundError, setShowNotFoundError] = React.useState<Boolean>(false);
  const [results, setResults] = React.useState<EstimatedResults[]>([]);
  const [selected, setSelected] = React.useState<EstimatedResults | null>(null);

  React.useEffect(() => {
    if (! results.length) { return setSelected(null); }

    setSelected(results[0])
  }, [results])

  React.useEffect(() => {
    handleNewEstimation(selected)
  }, [selected])

  const label = "Entrez votre adresse postale";
  const placeholder = "5 Esplanade Andry Farcy, 38000 Grenoble";

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
            <ListGroup.Item as="li" action active={!! selected && result.id === selected.id} onClick={() => setSelected(result)} style={{ cursor: 'pointer' }}>
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