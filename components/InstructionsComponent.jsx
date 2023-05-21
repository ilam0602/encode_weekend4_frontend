import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import {useSigner, useNetwork, useBalance,useContract,useContractWrite,usePrepareContractWrite} from 'wagmi';
import {useState,useEffect} from 'react'
import * as tokenJson from '../assets/MyERC20Votes.json'
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
	const [isLoading,setLoading] = useState(false);
	// console.log(tokenJson.abi);
	const {config} = usePrepareContractWrite({
		address: '0xBd8D607d146aC196051280d4Cb7952D95dA6F3bd',
		abi: tokenJson.abi,
		functionName: 'delegate',
		inputs: [],
		args: '0xBB923B99A0067e8ae37533898B849d67B8f3268e'

	});
	if(signer){
		console.log(signer.address);
	}
	
	const { delegate } = useContractWrite(config);



	if(txData) return (
		<div>
			<p>Transaction Completed!</p>
			<a href ={"https://goerli.etherscan.io/tx/"+txData.hash} target = "_blank"> {txData.hash}</a>
		</div>
	)
	if(isLoading) return <p> delegating...</p>;
	return(
		<div>
			<button disabled = {!delegate} onClick = {() => delegate?.()}> Self Delegate Tokens</button>
			{/* <button onClick = {() => delegate?.()}> Self Delegate Tokens</button> */}
		</div>
	)
}
function delegate(contract,signer,setLoading,setTxData){
	setLoading(true);
	// const {data:contract} = useContractWrite({
	// 	addressOrName: '0xBd8D607d146aC196051280d4Cb7952D95dA6F3bd',
	// 	contractInterface: tokenJson.abi,
	// },'delegate',
	// {
	// 	args:[signer.address]
	// }
	// )
	// contract.delegate(signer.address)
	setLoading(false);
	setTxData(data);
}

