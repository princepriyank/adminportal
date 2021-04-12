import Layout from "../components/layout";
import styled from "styled-components";
import Image from "next/image";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { signIn, signout, useSession } from "next-auth/client";
import CardActions from "@material-ui/core/CardActions";
import { useRouter } from "next/router";

const Home = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .image {
    z-index: -1;
    position: absolute;
  }
  .card {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .title {
    font-size: 24px;
  }
`;

export default function Page({ props }) {
  const [session, loading] = useSession();

  return (
    <>
      {!session ? (
        <Home>
          <Image
            className="image"
            src="/nitp.png"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <Card className="card">
            <CardContent>
              <Image src="/logo512.png" width="100" height="100" />
              <Typography className="title" color="textPrimary">
                Welcome to Admin Portal
              </Typography>

              <CardActions className="card">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => signIn("google")}
                >
                  Login with Google
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Home>
      ) : (
        <Layout>
          <h1>NextAuth.js Example</h1>
          <p>
            This is an example site to demonstrate how to use{" "}
            <a href={`https://next-auth.js.org`}>NextAuth.js</a> for
            authentication.
          </p>
        </Layout>
      )}
    </>
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