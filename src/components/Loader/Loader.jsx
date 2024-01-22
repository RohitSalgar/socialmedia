// import logo from "../../assets/Images/Loadergif.gif";

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
				src={""}
				width="200"
				height="200"
				className="attachment-large size-large wp-image-2708"
			/>
		</div>
	);
}
