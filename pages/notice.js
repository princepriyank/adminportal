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
// import { query } from "../lib/db";

export default function Page(props) {
  return (
    <Layout>
      <h1>Enter</h1>
      <p>
        {props.res}
        This is an example site to demonstrate how to use{" "}
        <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // let res = await query(
  //   `SELECT * FROM users where email="divyap.ug1.cs@nitp.ac.in";`
  // );

  // console.log(res.length);
  // if (!res) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {}, // will be passed to the page component as props
  };
}
