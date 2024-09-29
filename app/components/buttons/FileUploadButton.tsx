'use client';
import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface FileUploadButtonProps {
	onFileChange: (file: File | null) => void;
	resetFileName?: () => void; // Optional prop to reset file name
}

const FileUploadButton = forwardRef<{ resetFileName?: () => void }, FileUploadButtonProps>(
	({ onFileChange, resetFileName }, ref) => {
		const [fileName, setFileName] = useState<string | null>(null);

		const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files ? event.target.files[0] : null;
			setFileName(file ? file.name : 'No file chosen');
			onFileChange(file);
		};

		useImperativeHandle(ref, () => ({
			resetFileName: () => {
				setFileName(null);
			},
		}));

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
					{fileName || 'Choose an icon'}
				</label>
				<input
					type='file'
					id='file-upload'
					accept='image/*'
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>
			</div>
		);
	}
);

FileUploadButton.displayName = 'FileUploadButton';

export default FileUploadButton;
