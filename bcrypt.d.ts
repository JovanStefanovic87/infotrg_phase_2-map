declare module 'bcrypt' {
	export function hashSync(data: string, saltOrRounds: number): string;
	export function compareSync(data: string, encrypted: string): boolean;
	export function hash(data: string, saltOrRounds: number): Promise<string>;
	export function compare(data: string, encrypted: string): Promise<boolean>;
}
