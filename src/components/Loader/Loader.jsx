import logo from "../../assets/Images/newLoader.svg";

export default function Loader() {
	return (
		<div
			className="loaderContainer"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
			}}>
			<img
				decoding="async"
				alt="Animated"
				src={logo}
				width="150"
				height="150"
				className="attachment-large size-large wp-image-2708"
			/>
		</div>
	);
}
