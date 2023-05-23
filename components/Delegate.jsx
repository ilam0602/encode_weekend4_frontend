import {useState} from 'react';
import {useSigner,useContractWrite} from 'wagmi'
import * as tokenJson from '../assets/MyERC20Votes.json'

export default function Delegate(){
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
