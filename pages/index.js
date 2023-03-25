import {Box, Button, CircularProgress, Dialog} from "@mui/material";
import {useRef, useState} from "react";
import {useSnackbar} from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Form from "@/src/page-components/home/Form";
import {useUser} from "@/src/store/UserContext";

const Index = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useUser();

    const inputRef = useRef(null);
    const [pop, setPop] = useState(false);
    const [loading, setLoading] = useState(false);

    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [uploadFile, setUploadFile] = useState(null)

    const handleClick = (event) => {
        setPop(true);
    };
    const handleClose = () => {
        setPop(false);
    };

    // function generateUniqueFileName(fileExtension) {
    //     const timestamp = Date.now();
    //     const randomNum = Math.floor(Math.random() * 10000);
    //     return `${timestamp}-${randomNum}${fileExtension}`;
    // }

    function sendFileToApi() {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', uploadFile);

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
        setLoading(false)
    }


    function handleFileInputChange(event) {
        const file = event.target.files[0];
        setUploadFile(file)
    }

    function handleTextData() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "modeler_id": "123",
            "strings": [
                {
                    "title": "Model Overview",
                    "value": `${field1}`
                },
                {
                    "title": "Performance Definition",
                    "value": `${field2}`
                },
                {
                    "title": "Derived Variables",
                    "value": `${field3}`
                }
            ]
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/static-data", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


  return (
      <>
        <Box width={'100%'}>

            <Button
                onClick={handleClick}
            >
                Open
            </Button>
            <Dialog
                open={pop}
                onClose={handleClose}
            >
                <Box
                    width={"100%"}
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Box
                        py={3}
                        px={3}
                        zIndex={1}
                        width={"450px"}
                        bgcolor={"#F6F2E6"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Box
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Box fontSize={"22px"} fontWeight={600} color={'#181935'}>
                                Form
                            </Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <IconButton  sx={{ml: 4}} onClick={handleClose}>
                                    <CloseIcon sx={{ color: "#000" }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box mt={1} color={"#ACACAC"} fontSize={"15px"}>
                            Please fill the given fields.
                        </Box>
                        <Box mb={3} />

                        <Form
                            field1={field1} setField1={setField1}
                            field2={field2} setField2={setField2}
                            field3={field3} setField3={setField3}
                        />
                        <Box mt={3} />
                        <Button
                            size={'small'}
                            onClick={() => inputRef?.current?.click()}
                            color={'primary'}
                            variant={"outlined"}
                            sx={{
                                borderRadius: "15px",
                                py: 1,
                                px: 2,
                            }}
                        >
                            {
                                loading ? <CircularProgress size={'20px'} /> : (
                                    <>
                                        <AttachFileIcon />
                                        Upload file
                                    </>
                                )
                            }
                        </Button>

                        <Box mb={4} />
                        <Button
                            disabled={uploadFile === null}
                            onClick={() => {
                                sendFileToApi();
                                handleTextData();
                                setPop(false);
                            }}
                            variant={"contained"}
                            disableElevation
                            fullWidth
                            sx={{
                                borderRadius: "15px",
                                py: 1.5,
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Dialog>
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
