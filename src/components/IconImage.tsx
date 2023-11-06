import Image from "react-bootstrap/Image";
import Path from "path-browserify";

interface IconImageProps {
	size: number;
	imagePath: string;
}

export const IconImage = ({ size, imagePath }: IconImageProps) => {
	return (
		<Image
			width={size}
			height={size}
			src={Path.join(process.env.PUBLIC_URL, imagePath)}
			draggable={false}
		/>
	);
};
