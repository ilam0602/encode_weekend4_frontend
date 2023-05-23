import {useState} from 'react';
import {useSigner} from 'wagmi';

export default function RequestTokens(){
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