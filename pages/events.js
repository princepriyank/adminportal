import Layout from "../components/layout";

import { query } from "../lib/db";
// import Sheet from "../components/sheet";
// import { Notice } from "../lib/columns.js";
import styled from "styled-components";
import DataDisplay from "../components/display-events";

const Wrap = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 60px;
`;

export default function Page({ data }) {
	console.log(data);
	return (
		<Layout>
			<Wrap>
				<DataDisplay data={data} />
				{/* <Sheet notice={Notice} data={data} /> */}
			</Wrap>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	let res = await query(`SELECT * FROM events;`).catch((e) => {
		console.log(e);
	});
	// console.log(res);
	const data = JSON.stringify(res);
	return {
		props: { data }, // will be passed to the page component as props
	};
}
