import {Box, Button} from "@mui/material";
import {useRef} from "react";
import {useSnackbar} from "notistack";

const Index = () => {

    const { enqueueSnackbar } = useSnackbar();
    const inputRef = useRef(null);

    // function generateUniqueFileName(fileExtension) {
    //     const timestamp = Date.now();
    //     const randomNum = Math.floor(Math.random() * 10000);
    //     return `${timestamp}-${randomNum}${fileExtension}`;
    // }

    function sendFileToApi(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        }).then(response => {
            enqueueSnackbar("File uploaded successfully", {
                variant: "success",
            });
        }).catch(error => {
            enqueueSnackbar("Something went wrong", {
                variant: "error",
            });
        });
    }


    function handleFileInputChange(event) {
        const file = event.target.files[0];
        sendFileToApi(file);
    }

  return (
      <>
        <Box width={'100%'}>
            <Button
                onClick={() => inputRef?.current?.click()}
            >
                Upload
            </Button>
            <input
                accept=".csv"
                onChange={handleFileInputChange}
                ref={inputRef}
                style={{ display: 'none' }}
                type="file"
            />
        </Box>
      </>
  );
};
export default Index;
// Index.layout = null;
Index.title = "Home";
