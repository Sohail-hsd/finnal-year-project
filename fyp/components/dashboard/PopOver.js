import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function ResponsiveDialog({ message, title, deleteProduct, id, index }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAgree = (event) => {
    setOpen(false);
    deleteProduct(id,index)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <span onClick={handleClickOpen}>
        <DeleteForeverRoundedIcon
          sx={{ color: "error.main", cursor: "pointer" }}
        />
      </span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{fontWeight:'bold', color:"error.main"}} >{title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color:"black"}} >{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{fontWeight:'bold',color:"success.main"}}>
            Cancle
          </Button>
          <Button onClick={handleAgree} autoFocus sx={{fontWeight:'bold',color:"error.main"}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
