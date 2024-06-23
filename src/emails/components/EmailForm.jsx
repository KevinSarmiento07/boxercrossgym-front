/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useAutocomplete } from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { useUsers } from "../../hooks/useUsers";
import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Root = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"};
  font-size: 14px;
`
);
const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;
const InputWrapper = styled("div")(
  ({ theme }) => `
  width: max-width;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"};
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 400px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

const initialEmails = {
  usuarios: [],
  option: 0,
  asunto: "",
  body: "",
};
export const EmailForm = () => {
  const [email, setEmail] = useState(initialEmails);
  const { users = [], getUsers, handlerSendEmails } = useUsers();
  const [option, setOption] = useState("");
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  useEffect(() => {
    getUsers();
  }, []);
  const { getRootProps, getInputLabelProps, getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value, focused, setAnchorEl } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: users,
    getOptionLabel: (option) => option.email,
  });

  useEffect(() => {
    setEmail({
      ...email,
      usuarios: value,
    });
  }, [value]);

  useEffect(() => {
    setEmail({
      ...email,
      option: option,
    });
  }, [option]);

  const handleChangeEmail = ({ target }) => {
    const { name, value } = target;

    setEmail({
      ...email,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    handlerSendEmails(email.usuarios, email.option, email.asunto, email.body);
    setEmail(initialEmails);
    setOption("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="my-5 text-center">
          <Typography variant="h3" fontWeight={"bold"}>
            Enviar Correos
          </Typography>
        </div>

        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Opciones</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={option} label="Opciones" onChange={handleChange}>
              <MenuItem value={1}>ENVIAR A TODOS LOS USUARIOS</MenuItem>
              <MenuItem value={2}>ENVIAR A USUARIOS ACTIVOS</MenuItem>
              <MenuItem value={3}>ENVIAR A USUARIOS INACTIVOS</MenuItem>
              <MenuItem value={4}>SELECCIONARLOS</MenuItem>
            </Select>
          </FormControl>
        </div>
        {option != 4 || (
          <div className="my-3">
            <Root>
              <div {...getRootProps()}>
                <Label {...getInputLabelProps()}>Seleccionar usuarios</Label>
                <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
                  {value.map((option, index) => (
                    <StyledTag label={`${option.nombre} ${option.apellido}`} {...getTagProps({ index })} />
                  ))}
                  <input {...getInputProps()} />
                </InputWrapper>
              </div>
              {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                  {groupedOptions.map((option, index) => (
                    <li key={index} {...getOptionProps({ option, index })}>
                      <span>{`${option.nombre} ${option.apellido}`}</span>
                      <CheckIcon fontSize="small" />
                    </li>
                  ))}
                </Listbox>
              ) : null}
            </Root>
          </div>
        )}

        <div className="mt-3">
          <div className="mb-4">
            <TextField fullWidth id="asunto" name="asunto" label="Asunto" value={email.asunto} variant="outlined" onChange={handleChangeEmail} required />
          </div>

          <div>
            <TextField multiline rows={5} fullWidth id="cuerpo" name="body" value={email.body} onChange={handleChangeEmail} label="Cuerpo" variant="outlined" required />
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button color="error" variant="contained" type="submit">
            ENVIAR
          </Button>
        </div>
      </form>
    </div>
  );
};
