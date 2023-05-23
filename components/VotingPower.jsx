import {useState,useEffect} from 'react';
import {useSigner,useContractRead} from 'wagmi'
import * as ballotJson from '../assets/TokenizedBallot.json'
import {ethers} from 'ethers'

export default function VotingPower(){
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