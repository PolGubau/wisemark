import type { JSX } from "react";

export const Card = ({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) => {
	return (
		<div className="flex flex-col gap-6 backdrop-blur-md p-4 md:p-6 rounded-3xl bg-gradient-to-b from-[#000000dd] to-transparent animate-blur">
			{children}
		</div>
	);
};
