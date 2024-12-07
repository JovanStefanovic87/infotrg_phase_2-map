import Flag from 'react-world-flags';

interface LanguageFlagProps {
	code: string;
}

const LanguageFlag: React.FC<LanguageFlagProps> = ({ code }) => {
	return (
		<div
			className='w-10 h-6 overflow-hidden flex items-center justify-center'
			style={{ minWidth: '40px', minHeight: '24px', aspectRatio: '5 / 3' }}>
			<Flag code={code} alt={`Flag of ${code}`} />
		</div>
	);
};

export default LanguageFlag;
