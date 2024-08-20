'use client';
import React, { useState } from 'react';

interface FileUploadButtonProps {
	onFileChange: (file: File | null) => void;
	resetFileName?: () => void; // Optional prop to reset file name
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileChange, resetFileName }) => {
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		setFileName(file ? file.name : null);
		onFileChange(file);
	};

	console.log(fileName);

	// Call the reset function if provided
	React.useEffect(() => {
		if (resetFileName) {
			resetFileName();
		}
	}, [resetFileName]);

	return (
		<div style={{ display: 'inline-block' }}>
			<label
				htmlFor='file-upload'
				style={{
					display: 'inline-block',
					padding: '8px 16px',
					border: '1px solid #ccc',
					backgroundColor: '#007bff',
					color: 'white',
					cursor: 'pointer',
					borderRadius: '4px',
					textAlign: 'center',
					fontSize: '14px',
				}}>
				{fileName || 'Choose file'}
			</label>
			<input type='file' id='file-upload' onChange={handleFileChange} style={{ display: 'none' }} />
		</div>
	);
};

export default FileUploadButton;
