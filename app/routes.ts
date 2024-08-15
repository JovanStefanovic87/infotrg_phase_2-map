import { Route } from '@/utils/helpers/types';

export const routes: Route[] = [
	{
		label: 'Početna',
		href: '/',
		icon: '/icons/home.svg',
		subRoutes: [],
	},
	{
		label: 'O nama',
		href: '/o-nama',
		icon: '/icons/about.svg',
		subRoutes: [
			{
				label: 'Uslužne delatnosti',
				href: '/o-nama/usluzne-delatnosti',
				icon: '/icons/services.svg',
			},
			{
				label: 'Platforma',
				href: '/o-nama/platforma',
				icon: '/icons/platform.svg',
				subRoutes: [],
			},
			{
				label: 'Plan i program poslovanja',
				href: '/o-nama/plan-i-program-poslovanja',
				icon: '/icons/BusinessPlan.svg',
			},
			{
				label: 'Tim',
				href: '/o-nama/tim',
				icon: '/icons/team.svg',
				subRoutes: [],
			},
			{
				label: 'Poslovna saradnja',
				href: '/o-nama/poslovna-saradnja',
				icon: '/icons/businessCooperation.svg',
			},
		],
	},
	{
		label: 'Ulaganje',
		href: '/ulaganje',
		icon: '/icons/invest.svg',
		subRoutes: [
			{
				label: 'Investicioni fond',
				href: '/ulaganje/investicioni-fond',
				icon: '/icons/investFund.svg',
				subRoutes: [],
			},
			{
				label: 'Investicioni plan i program',
				href: '/ulaganje/investicioni-plan-i-program',
				icon: '/icons/investPlan.svg',
				subRoutes: [],
			},
			{
				label: 'Prihodi od investicija',
				href: '/ulaganje/prihodi-od-investicija',
				icon: '/icons/investmentIncome.svg',
				subRoutes: [],
			},
			{
				label: 'Investitori',
				href: '/ulaganje/investitori',
				icon: '/icons/investors.svg',
				subRoutes: [],
			},
		],
	},
	{
		label: 'Posao',
		href: '/posao',
		icon: '/icons/job.svg',
		subRoutes: [],
	},
	/* {
    label: 'Kontakt',
    href: '/kontakt',
    icon: '/icons/phoneMail.svg',
    subRoutes: [],
  }, */
];
