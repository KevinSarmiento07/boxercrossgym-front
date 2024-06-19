import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { usePlan } from "../../hooks/usePlan";
import { useState } from "react";

export const PlanForm = () => {
  const { initialPlanForm, handlerAddPlan } = usePlan();
  const [planForm, setPlanForm] = useState(initialPlanForm);

  const handlerChange = (e) => {
    const { value, name } = e.target;
    setPlanForm({
      ...planForm,
      [name]: value,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    handlerAddPlan(planForm);

    setPlanForm(initialPlanForm);
  };

  return (
    <form onSubmit={handlerSubmit}>
      <div className="my-40 md:grid grid-cols-2 gap-4">
        <div className="text-center my-4">
          <TextField id="nombre" label="Plan..." variant="outlined" fullWidth name="nombre" value={planForm.nombre} onChange={handlerChange} required />
        </div>
        <div className="my-4">
          <FormControl fullWidth>
            <InputLabel htmlFor="valor">Valor</InputLabel>
            <OutlinedInput
              required
              id="valor"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Valor"
              name="valor"
              defaultValue={planForm.valor}
              onChange={handlerChange}
              type="number"
              inputProps={{
                maxLength: 13,
                step: "0.01",
              }}
            />
          </FormControl>
        </div>

        <div className="my-4 col-span-2">
          <FormControl fullWidth>
            <InputLabel htmlFor="duracion">Duración (días)</InputLabel>
            <OutlinedInput id="duracion" label="Duración (días)" name="duracion" defaultValue={planForm.duracion} onChange={handlerChange} required />
          </FormControl>
        </div>

        <div className="col-span-2 text-center">
          <Button variant="outlined" color="error" type="submit">
            Agregar
          </Button>
        </div>
      </div>
    </form>
  );
};
