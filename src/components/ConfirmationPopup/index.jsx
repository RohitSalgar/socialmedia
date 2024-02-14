import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from "@mui/material";
import "./styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../../redux/slices/popupSlice";
import { CircularProgress } from '@mui/material';

function Popup({
	handleAgree,
	contentText,
	titleText,
    mutateLoading = false
}) {
	const popupStatus = useSelector((state) => state.popup.popupStatus);
    const dispatch = useDispatch()
	
	return (
		<Dialog
			open={popupStatus}
			onClose={() => {
				dispatch(closePopup())
			}}
			fullWidth
			maxWidth="xs"
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title" className="titletext">
				<p>{titleText}</p>
				<Button
					onClick={() => {
						dispatch(closePopup());
					}}
					className="closebtns">
					<AiOutlineClose />
				</Button>
			</DialogTitle>
				<DialogContent>
					<div
						className="contenttxt"
						style={{
							padding: "0 10px",
						}}>
						{contentText}
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						type={"button"}
						onClick={() => {
								handleAgree();
						}}
						autoFocus
						className="yesbtn">
						{mutateLoading ? <CircularProgress style={{'color': 'white'}} size={20} /> : "Yes"}
					</Button>
					<Button
						onClick={() => {
							dispatch(closePopup());
						}}
						className="nobtn">
						No
					</Button>
				</DialogActions>
		</Dialog>
	);
}
export default Popup;
