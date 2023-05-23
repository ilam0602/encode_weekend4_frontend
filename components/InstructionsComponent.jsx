import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import ReadWinner from "./ReadWinner";
import RequestTokens from "./RequestTokens";
import Delegate from "./Delegate";
import Vote from "./Vote";
import Proposal from "./Proposal";
import VotingPower from "./VotingPower";
import WinningProposal from "./WinningProposal";

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					My dApp
				</h1>
			</header>
			<RequestTokens></RequestTokens>
			<Delegate></Delegate>
			<Proposal propnum = {0}/>
			<Vote propnum = {0}/>
			<Proposal propnum = {1}/>
			<Vote propnum = {1}/>
			<Proposal propnum = {2}/>
			<Vote propnum = {2}/>
			<VotingPower/>
			<WinningProposal/>
			{/* <ReadWinner /> */}
		</div>
	);
}











