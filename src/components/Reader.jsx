import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";

import "./reader.scss";

function Reader() {
	const reader = useRef(null);
	const [code, setCode] = useState("");

	const handleScan = (data) => {
		setCode(data);
	};

	const handleError = (err) => {
		console.error(err);
	};

	const openImageDialog = () => {
		reader.current.openImageDialog();
	};

	return (
		<div className="readerC">
			<QrReader
				ref={reader}
				onError={handleError}
				onScan={handleScan}
				legacyMode
				className="readerImg"
			/>
			<button onClick={openImageDialog}>Sumbit a QR Code</button>
			<p>{code}</p>
		</div>
	);
}

export default Reader;
