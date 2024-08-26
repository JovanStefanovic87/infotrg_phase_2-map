import axios from 'axios';

type SubmitDataConfig = {
	apiUrl: string;
	data: any;
	feedback: {
		successMessage: string;
		errorMessage: string;
	};
	onSuccess?: () => void;
	onError?: (error: any) => void;
};

export const submitData = async ({
	apiUrl,
	data,
	feedback,
	onSuccess,
	onError,
}: SubmitDataConfig) => {
	try {
		const response = await axios.post(apiUrl, data);
		if (response.data) {
			if (onSuccess) onSuccess();
			return feedback.successMessage;
		}
		throw new Error('Failed to submit data');
	} catch (error) {
		if (onError) onError(error);
		return feedback.errorMessage;
	}
};
