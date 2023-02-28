import {
  Button,
  Paper,
  Grid,
  TextField,
  Icon,
  Dialog,
  DialogContent,
  Link,
} from "@mui/material";
import React from "react";
import { fireAuth, firestore } from "../services/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import stylec from "../styles/card.module.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const adminPage = () => {
  const router = useRouter();
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [cpu, setCpu] = React.useState("");
  const [battery, setBattery] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [display, setDisplay] = React.useState("");
  const [graphics, setGraphics] = React.useState("");
  const [handdisk, setHanddisk] = React.useState("");
  const [imagetitle, setImagetitle] = React.useState("");
  const [memory, setMemory] = React.useState("");
  const [operating, setOperating] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [store, setStore] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [value, setValue] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [id, setID] = React.useState("");
  const [user, setUser] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [openu, setOpenu] = React.useState(false);
  const [idU, setIdu] = React.useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    firestore
      .collection("Product")
      .add({
        name: name,
        url: url,
        cpu: cpu,
        battery: battery,
        description: description,
        display: display,
        graphics: graphics,
        handdisk: handdisk,
        imagetitle: imagetitle,
        memory: memory,
        operating: operating,
        price: price,
        store: store,
        weight: weight,
      })
      .then((res) => {
        alert("Add Successfull !");
        setName("");
        setBattery("");
        setCpu("");
        setDescription("");
        setDisplay("");
        setGraphics("");
        setHanddisk("");
        setImagetitle("");
        setUrl("");
        setPrice("");
        setOperating("");
        setStore("");
        setWeight("");
        setMemory("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  React.useEffect(() => {
    firestore.collection("Product").onSnapshot((snapshot) => {
      let datain = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(datain);
    });
  }, []);

  React.useEffect(() => {
    firestore.collection("User").onSnapshot((snapshot) => {
      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUser(data);
    });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button
          onClick={() => setValue(1)}
          size="small"
          aria-label="show 4 new mails"
          color="inherit"
        >
          Add New Product
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={() => setValue(2)}
        >
          User
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => setValue(3)}
        >
          Product
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => handleLogout()}
        >
          Loyout
        </Button>
      </MenuItem>
    </Menu>
  );

  const handleDelete = (id) => {
    firestore
      .collection("Product")
      .doc(id)
      .delete()
      .then((res) => {
        alert("Delete Item Successfull !");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetDataForm = (item) => {
    setName(item.name);
    setBattery(item.battery);
    setCpu(item.cpu);
    setDescription(item.description);
    setDisplay(item.display);
    setGraphics(item.graphics);
    setHanddisk(item.handdisk);
    setImagetitle(item.imagetitle);
    setUrl(item.url);
    setPrice(item.price);
    setOperating(item.operating);
    setStore(item.store);
    setWeight(item.weight);
    setMemory(item.memory);
    setID(item.id);
  };
  const handleUpdate = () => {
    firestore
      .collection("Product")
      .doc(id)
      .update({
        name: name,
        url: url,
        cpu: cpu,
        battery: battery,
        description: description,
        display: display,
        graphics: graphics,
        handdisk: handdisk,
        imagetitle: imagetitle,
        memory: memory,
        operating: operating,
        price: price,
        store: store,
        weight: weight,
      })
      .then((res) => {
        console.log("Update Successfull !");
        setName("");
        setBattery("");
        setCpu("");
        setDescription("");
        setDisplay("");
        setGraphics("");
        setHanddisk("");
        setImagetitle("");
        setUrl("");
        setPrice("");
        setOperating("");
        setStore("");
        setWeight("");
        setMemory("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleLogout = (e) => {
    fireAuth
      .signOut()
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleEditUser = (item) => {
    setEmail(item.email);
    setFname(item.fristName);
    setLname(item.LastName);
    setPassword(item.password);
    setIdu(item.id);
  };
  const handleOpenU = () => {
    setOpenu(true);
  };
  const handleCloseU = () => {
    setOpenu(false);
  };
  const handleUpdateU = () => {
    firestore
      .collection("User")
      .doc(idU)
      .update({
        email: email,
        password: password,
        LastName: lname,
        fristName: fname,
      })
      .then((res) => {
        console.log("Update User Successfull !");
        setLname("");
        setFname("");
        setEmail("");
        setPassword("");
        setOpenu(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLname("");
        setFname("");
        setEmail("");
        setPassword("");
        setOpenu(false);
      });
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="bg-dark">
          <Toolbar>
            <Button
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setValue(1)}
            >
              Admin
            </Button>
            {/* <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            
                        </Typography> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => setValue(1)}
                size="small"
                aria-label="show 4 new mails"
                color="inherit"
              >
                Add New Product
              </Button>
              <Button
                size="small"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => setValue(2)}
              >
                User
              </Button>
              <Button
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => setValue(3)}
                color="inherit"
              >
                Product
              </Button>
              <Button
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => handleLogout()}
                color="inherit"
              >
                Loyout
              </Button>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
      {value === 1 && (
        <div style={{ marginTop: 10 }}>
          <Paper
            elevation={4}
            style={{
              width: "55%",
              height: "auto",
              margin: "0 auto",
              position: "relative",
              top: 10,
            }}
          >
            <div style={{ width: "90%", height: "auto", margin: "0 auto" }}>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="ImageURl"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Battery"
                    name="battery"
                    value={battery}
                    onChange={(e) => setBattery(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Display"
                    name="display"
                    value={display}
                    onChange={(e) => setDisplay(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Graphics"
                    name="graphics"
                    value={graphics}
                    onChange={(e) => setGraphics(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Hand disk"
                    name="handdisk"
                    value={handdisk}
                    onChange={(e) => setHanddisk(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Image title"
                    name="imagetitle"
                    value={imagetitle}
                    onChange={(e) => setImagetitle(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Memory"
                    name="memory"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Operating"
                    name="operating"
                    value={operating}
                    onChange={(e) => setOperating(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Store"
                    name="store"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="CPU"
                    name="cpu"
                    value={cpu}
                    onChange={(e) => setCpu(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="text"
                    required
                    label="Weight"
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    type="submit"
                    required
                    value="Add Product"
                    onClick={handleUpload}
                    style={{
                      border: "1px solid black",
                      borderRadius: 5,
                      marginBottom: 20,
                    }}
                    fullWidth
                  ></TextField>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </div>
      )}
      {value === 2 && (
        <div style={{ marginTop: 10 }}>
          <Dialog open={openu} handleClose={handleCloseU}>
            <Link
              onClick={handleCloseU}
              style={{
                cursor: "pointer",
                color: "black",
                textAlign: "right",
                marginTop: 5,
                marginRight: 15,
              }}
            >
              <CloseIcon />
            </Link>
            <DialogContent>
              <Paper
                elevation={4}
                style={{
                  width: "99%",
                  height: "auto",
                  margin: "0 auto",
                  position: "relative",
                  top: 10,
                }}
              >
                <div style={{ width: "90%", height: "auto", margin: "0 auto" }}>
                  <Grid container justifyContent="center" spacing={1}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="First Name"
                        name="fname"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Last Name"
                        name="lname"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        type="text"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        type="text"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        type="submit"
                        value="Update"
                        onClick={() => handleUpdateU()}
                        style={{
                          border: "1px solid black",
                          borderRadius: 5,
                          marginBottom: 20,
                        }}
                        fullWidth
                      ></TextField>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </DialogContent>
          </Dialog>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Eamil</StyledTableCell>
                    <StyledTableCell>Password</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                    <StyledTableCell>Edit</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.map((item, index) => (
                    <StyledTableRow key={item.name} className={stylec.paper}>
                      <StyledTableCell component="th" scope="row">
                        {item.LastName} {item.fristName}
                      </StyledTableCell>
                      <StyledTableCell>{item.email}</StyledTableCell>
                      <StyledTableCell>{item.password}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          onClick={() => {
                            handleOpenU(item);
                            handleEditUser(item);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
      {value === 3 && (
        <div style={{ marginTop: 10 }}>
          <Dialog open={open} handleClose={handleClose}>
            <Link
              onClick={handleClose}
              style={{
                cursor: "pointer",
                color: "black",
                textAlign: "right",
                marginTop: 5,
                marginRight: 15,
              }}
            >
              <CloseIcon />
            </Link>
            <DialogContent>
              <Paper
                elevation={4}
                style={{
                  width: "99%",
                  height: "auto",
                  margin: "0 auto",
                  position: "relative",
                  top: 10,
                }}
              >
                <div style={{ width: "90%", height: "auto", margin: "0 auto" }}>
                  <Grid container justifyContent="center" spacing={1}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="ImageURl"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Battery"
                        name="battery"
                        value={battery}
                        onChange={(e) => setBattery(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Display"
                        name="display"
                        value={display}
                        onChange={(e) => setDisplay(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Graphics"
                        name="graphics"
                        value={graphics}
                        onChange={(e) => setGraphics(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Hand disk"
                        name="handdisk"
                        value={handdisk}
                        onChange={(e) => setHanddisk(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Image title"
                        name="imagetitle"
                        value={imagetitle}
                        onChange={(e) => setImagetitle(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Memory"
                        name="memory"
                        value={memory}
                        onChange={(e) => setMemory(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Operating"
                        name="operating"
                        value={operating}
                        onChange={(e) => setOperating(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Store"
                        name="store"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="CPU"
                        name="cpu"
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type="text"
                        label="Weight"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        fullWidth
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        type="submit"
                        value="Update"
                        onClick={() => handleUpdate()}
                        style={{
                          border: "1px solid black",
                          borderRadius: 5,
                          marginBottom: 20,
                        }}
                        fullWidth
                      ></TextField>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </DialogContent>
          </Dialog>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Delete</StyledTableCell>
                  <StyledTableCell>Edit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <StyledTableRow key={item.name} className={stylec.paper}>
                    <StyledTableCell component="th" scope="row">
                      <img src={item.url} width="100px" height="100px"></img>
                    </StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell>{item.price}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        onClick={() => {
                          handleOpen(item);
                          handleGetDataForm(item);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default adminPage;
