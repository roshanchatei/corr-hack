import {Box} from "@mui/material";
import CustomTextField from "@/src/components/CustomTextField";

const Index = ({field1, field2, field3, setField1, setField2, setField3}) => {


    return (
        <>
            <CustomTextField
                label={"Model Overview"}
                multiline
                maxRows={4}
                value={field1}
                onChange={(event) => {
                    setField1(event.target.value);
                }}
            />
            <Box mt={3} />
            <CustomTextField
                label={"Performance Definition"}
                multiline
                maxRows={4}
                value={field2}
                onChange={(event) => {
                    setField2(event.target.value);
                }}
            />
            <Box mt={3} />
            <CustomTextField
                label={"Data Preparation"}
                multiline
                maxRows={4}
                value={field3}
                onChange={(event) => {
                    setField3(event.target.value);
                }}
            />
        </>
    );
};
export default Index;
// Index.layout = null;
Index.title = "Home";
