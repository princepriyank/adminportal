import Layout from "@/components/layout";
import { useEntries } from "@/lib/swr-hook";
import LoadAnimation from "@/components/loading";
import styled from "styled-components";
import DataDisplay from "@/components/display-news";

const Wrap = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 60px;
`;

export default function Page() {
	const { entries, isLoading } = useEntries("/api/news/all");

	console.log(entries);
	return (
		<Layout>
			<Wrap>
				{isLoading ? <LoadAnimation /> : <DataDisplay data={entries} />}
			</Wrap>
		</Layout>
	);
}
