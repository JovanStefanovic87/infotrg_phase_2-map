import Flag from 'react-world-flags';

interface LanguageFlagProps {
	code: string;
}

const LanguageFlag: React.FC<LanguageFlagProps> = ({ code }) => {
	return (
		<div className='fle gap-2 w-10 h-6 text-black'>
			<Flag code={code} alt={`Flag of ${code}`} />
		</div>
	);
};

export default LanguageFlag;
