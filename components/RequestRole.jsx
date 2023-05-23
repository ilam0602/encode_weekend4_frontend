import { useState } from "react";
import { useSigner } from "wagmi";
import styles from "../styles/InstructionsComponent.module.css";

export default function RequestRole() {
  const { data: signer } = useSigner();
  const [txData, setTxData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  if (txData)
    return (
      <div>
        <p>Transaction Completed!</p>
        <a
          href={"https://goerli.etherscan.io/tx/" + txData.hash}
          target="_blank"
        >
          {" "}
          {txData.hash}
        </a>
      </div>
    );
  if (isLoading) return <p> Requesting role...</p>;
  return (
    <div>
      <button
        onClick={() => requestRole(signer, "signature", setLoading, setTxData)}
        className={styles.button}
      >
        Request Role
      </button>
    </div>
  );
}

function requestRole(signer, signature, setLoading, setTxData) {
  setLoading(true);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: signer._address, signature: signature }),
  };
  fetch("http://localhost:3001/request-role", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setTxData(data);
      setLoading(true);
    });
}
