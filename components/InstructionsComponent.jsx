import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import {useSigner, useNetwork, useBalance,useContract,useContractWrite,usePrepareContractWrite,useContractRead} from 'wagmi';
import {useState,useEffect} from 'react'
import * as tokenJson from '../assets/MyERC20Votes.json'
import * as ballotJson from '../assets/TokenizedBallot.json'
import ReadWinner from "./ReadWinner";

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
			{/* <Query></Query> */}
			{/* <Proposal></Proposal> */}
			<ReadWinner />
		</div>
	);
}

function RequestTokens(){
	const {data:signer} = useSigner();
	const [txData,setTxData] = useState(null);
	const [isLoading,setLoading] = useState(false);
	if(txData) return (
		<div>
			<p>Transaction Completed!</p>
			<a href ={"https://goerli.etherscan.io/tx/"+txData.hash} target = "_blank"> {txData.hash}</a>
		</div>
	)
	if(isLoading) return <p> Requesting tokens to be minted...</p>;
	return(
		<div>
			<button onClick = {() => requestTokens(signer, "signature",setLoading,setTxData)}> Request Tokens</button>
		</div>
	)
}
function requestTokens(signer,signature,setLoading,setTxData){
	setLoading(true);
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({address: signer._address, signature:signature})
	};
	// fetch('http://localhost:3001/request-tokens')
	fetch('http://localhost:3001/request-tokens',requestOptions)
		.then(response=>response.json())
		.then((data) =>{
			setTxData(data);
			setLoading(true);
		});
}

function Delegate(){
	const {data:signer} = useSigner();

	const [txData,setTxData] = useState(null);
	// const [isLoading,setLoading] = useState(false);
	// console.log(tokenJson.abi);
	const {data,isLoading,isSuccess,write} = useContractWrite({
		address: '0xBd8D607d146aC196051280d4Cb7952D95dA6F3bd',
		abi: tokenJson.abi,
		functionName: 'delegate',
		args: ['0xBB923B99A0067e8ae37533898B849d67B8f3268e']
	});

	if(signer){
		console.log(signer.address);
	}
	
	// const { delegate } = useContractWrite(config);

	return(
		<div>
			<button onClick={() => write()}>Feed</button>
			{isLoading && <div>Check Wallet</div>}
			{isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
		</div>
	)
}

function Query(){
	const {data:signer} = useSigner();

	const [txData,setTxData] = useState(null);
	// const [isLoading,setLoading] = useState(false);
	// console.log(tokenJson.abi);
	const {data,isLoading,isSuccess,refetch} = useContractRead({
		address: '0x8581C8307D0F2D79b235c64F87C01C4C7aabb94d',
		abi: ballotJson.abi,
		functionName: 'winningProposal',
		args: []
	});

	if(signer){
		console.log(signer.address);
	}
	console.log(data);
	
	// const { delegate } = useContractWrite(config);

	return(
		<div>
			<button onClick={() => refetch()}>Check Winner</button>
			{isLoading && <div>Checking Winner</div>}
			{isSuccess && <div>Winner: {JSON.stringify(data)}</div>}
		</div>
	)

}

function Proposal(){
	const {data:signer} = useSigner();

	const [txData,setTxData] = useState(null);
	// const [isLoading,setLoading] = useState(false);
	// console.log(tokenJson.abi);
	const {data,isLoading,isSuccess,refetch} = useContractRead({
		address: '0x8581C8307D0F2D79b235c64F87C01C4C7aabb94d',
		abi: ballotJson.abi,
		functionName: 'proposals',
		args: [0]
	});

	if(signer){
		console.log(signer.address);
	}
	console.log(data);
	
	// const { delegate } = useContractWrite(config);

	return(
		<div>
			{isLoading && <div>Checking Proposal 0 </div>}
			{isSuccess && <div>Proposal 0: {JSON.stringify(data)}</div>}
		</div>
	)

}

function Vote(){

}




