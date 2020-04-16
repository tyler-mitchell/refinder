import { makeStyles } from "@material-ui/core";
import styled from "styled-components";
export const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  padding-bottom: 10px;
`;

export default makeStyles(() => ({
  header: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .10)",
    backgroundColor: "#ffffff",
  },
  insetBody: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto",
  },
  insetDrawerPaper: {
    width: "100%",
    // maxWidth: 300
  },
  contentContainer: {
    // flex: 1,
    minHeight: 0,
    height: "500px",
    width: "100%",
    borderRadius: "10px",
  },
  content: {
    maxHeight: "100%",
    overflowY: "auto",
  },
  footer: {
    height: 52,
    display: "flex",

    alignItems: "center",
    border: "none",
    padding: "0 8px",
  },
  edit: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
}));
