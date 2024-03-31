import * as React from "react"
import type { HeadFC } from "gatsby"
import { useForm } from "react-hook-form"
import { searchDPE } from "../lib/";


type Inputs = {
  address: string
}


export default function DetailedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <form onSubmit={handleSubmit((data) => searchDPE(data.address))}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="1 Allee Sainte Therese 38700 Corenc" {...register("address", { required: true })} />
      {errors.address && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}

export const Head: HeadFC = () => <title>Conformètre</title>
