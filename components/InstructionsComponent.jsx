import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import ReadWinner from "./ReadWinner";
import RequestTokens from "./RequestTokens";
import Delegate from "./Delegate";
import Vote from "./Vote";
import Proposal from "./Proposal";
import VotingPower from "./VotingPower";
import WinningProposal from "./WinningProposal";
import RequestRole from "./RequestRole";

export default function InstructionsComponent() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>My dApp</h1>
      </header>
      <div className={styles.grid_container}>
        <div>
          <RequestRole />
          <RequestTokens></RequestTokens>
          <Delegate></Delegate>
        </div>
        <div className={styles.vote_container}>
          <VotingPower />
          <div className={styles.request_button}>
            <Proposal propnum={0} />
            <Vote propnum={0} />
          </div>
          <div className={styles.request_button}>
            <Proposal propnum={1} />
            <Vote propnum={1} />
          </div>
          <div className={styles.request_button}>
            <Proposal propnum={2} />
            <Vote propnum={2} />
          </div>
        </div>
        <WinningProposal />
        {/* <ReadWinner /> */}
      </div>
    </div>
  );
}
