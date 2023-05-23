import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import {useSigner,useContractWrite,useContractRead} from 'wagmi';
import {useState,useEffect} from 'react'
import * as tokenJson from '../assets/MyERC20Votes.json'
import * as ballotJson from '../assets/TokenizedBallot.json'
import {ethers} from 'ethers'
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

	const [address,setAddress] = useState(null);

	const {data,isLoading,isSuccess,write} = useContractWrite({
		address: '0xBd8D607d146aC196051280d4Cb7952D95dA6F3bd',
		abi: tokenJson.abi,
		functionName: 'delegate',
		args: [address]
	});

	return(
		<div>
			<input type = "text" value = {address} onChange = {e => setAddress(e.target.value)}></input>
			<button onClick={() => write()}>Delegate</button>
			{isLoading && <div>Check Wallet</div>}
			{isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
		</div>
	)
}


function Proposal({propnum}){
	const {data:signer} = useSigner();

	const [isMounted,setIsMounted] = useState(false);


	const {data,isLoading,isSuccess} = useContractRead({
		address: '0x8581C8307D0F2D79b235c64F87C01C4C7aabb94d',
		abi: ballotJson.abi,
		functionName: 'proposals',
		args: [propnum],
		watch:true,
		onError(error) {
			console.log('Error', error)
		  },
	});

	useEffect(()=>{
		setIsMounted(true);
	},[]);

	
	

	return(
		<div>
			{!isMounted || isLoading && <div>Loading Proposal {propnum} </div>}
			{isMounted&&isSuccess && <div>Proposal {propnum}: {ethers.utils.parseBytes32String(data.name)}</div>}
		</div>
	)

}
function VotingPower(){
	const {data:signer} = useSigner();

	const [isMounted,setIsMounted] = useState(false);


	const {data,isLoading,isSuccess} = useContractRead({
		address: '0x8581C8307D0F2D79b235c64F87C01C4C7aabb94d',
		abi: ballotJson.abi,
		functionName: 'votingPower',
		args: [signer?._address],
		watch:true,
		onError(error) {
			console.log('Error', error)
		  },
	});

	useEffect(()=>{
		setIsMounted(true);
	},[]);

	
	

	return(
		<div>
			{!isMounted || isLoading && signer&&<div>Loading Voting Power {signer._address} </div>}
			{isMounted&&isSuccess && <div> Voting Power: { ethers.utils.formatUnits(parseInt(data._hex).toString())}</div>}
		</div>
	)

}
function Vote({propnum}){
	const {data:signer} = useSigner();

	const {data,isLoading,isSuccess,write} = useContractWrite({
		address: '0x8581C8307D0F2D79b235c64F87C01C4C7aabb94d',
		abi: ballotJson.abi,
		functionName: 'vote',
		args: [propnum,ethers.utils.parseUnits('1')]
	});

	

	return(
		<div>
			<button onClick={() => write()}>Vote</button>
			{isLoading && <div>Check Wallet</div>}
			{isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
		</div>
	)

}
function WinningProposal(){
	const {data:signer} = useSigner();

	const [isMounted,setIsMounted] = useState(false);


	const {data,isLoading,isSuccess} = useContractRead({
		address: '0x8581C8307D0F2D79b235c64F87C01C4C7aabb94d',
		abi: ballotJson.abi,
		functionName: 'winnerName',
		watch:true,
		onError(error) {
			console.log('Error', error)
		  },
	});

	useEffect(()=>{
		setIsMounted(true);
	},[]);

	
	// console.log(data._hex);
	

	return(
		<div>
			{!isMounted || isLoading && signer &&<div>Loading Voting Power {signer._address} </div>}
			{isMounted&&isSuccess && <div> Current Winning Proposal: { ethers.utils.parseBytes32String(data)}</div>}
		</div>
	)

}




