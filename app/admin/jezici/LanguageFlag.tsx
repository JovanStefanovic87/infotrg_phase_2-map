import Flag from 'react-world-flags';

interface LanguageFlagProps {
	code: string;
}

const LanguageFlag: React.FC<LanguageFlagProps> = ({ code }) => {
	return (
		<div className='w-10 h-6 overflow-hidden flex items-center justify-center'>
			<Flag code={code} alt={`Flag of ${code}`} />
		</div>
	);
};

export default LanguageFlag;
