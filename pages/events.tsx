import Layout from "../components/layout";
import styled from "styled-components";
import DataDisplay from "../components/display-events";
import { useEntries } from '@/lib/swr-hook'
import LoadAnimation from "@/components/loading";

const Wrap = styled.div`
	width: 90%;
	margin: auto;
	margin-top: 60px;
`;

export default function Page() {
	const { entries, isLoading } = useEntries('/api/events/all');

	return (
		<Layout>
			<Wrap>
				{isLoading ?
					(<LoadAnimation />) :
					(<DataDisplay data={entries} />)}
			</Wrap>
		</Layout>
	);
}
