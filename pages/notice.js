import Layout from "../components/layout";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import { query } from "../lib/db";
import Sheet from "../components/sheet";
import { Notice } from "../lib/columns.js";
import styled from "styled-components"

const Wrap=styled.div`
width:100vw;
display:flex;
justify-content:center;
`;

export default function Page({ data }) {
  return (
    <Layout>
      <Wrap>
      <Sheet notice={Notice} data={data} /></Wrap>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let res = await query(`SELECT * FROM notices;`).catch((e) => {
    console.log(e);
  });
  console.log(res);
  const data = JSON.stringify(res);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
