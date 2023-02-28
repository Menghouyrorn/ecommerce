// import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import InputBase from "@mui/material/InputBase";
// import { firestore } from "../services/firebase";
// import styles from "../styles/search.module.css";
// import Link from "next/link";
// import { Dialog } from "@mui/material";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));
// const search = ({ children }) => {
//   const [data, setData] = React.useState("");
//   const [value, setValue] = React.useState("");
//   const [search, setSearch] = React.useState([]);
//   React.useEffect(() => {
//     firestore.collection("Product").onSnapshot((snapshot) => {
//       let data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setData(data);
//     });
//   }, []);
//   const handleSeacher = (e) => {
//     const valueSearch = e.target.value;
//     setValue(valueSearch);
//     const newFilter = data.filter((value) => {
//       return value.name.toLowerCase().includes(valueSearch.toLowerCase());
//     });
//     if (valueSearch === "") {
//       setSearch([]);
//     } else {
//       setSearch(newFilter);
//     }
//   };
//   return (
//     <div>
//       <div>
//         <Search>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase
//             className="dropbtn"
//             placeholder="Search…"
//             inputProps={{ "aria-label": "search" }}
//             onChange={handleSeacher}
//           />
//         </Search>
//       </div>
//       <div>
//         {search.length != 0 && (
//           <div>
//             {search.map((item, index) => (
//               <p>{item.name}</p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default search;