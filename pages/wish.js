import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const wish = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let dataC = localStorage.getItem("wish");
    setData(JSON.parse(dataC));
  }, []);

  const handleDelte = (id) => {
    var object_product = JSON.parse(localStorage.getItem("wish"));
    for (let i = 0; i < object_product.length; i++) {
      if (object_product[i].id == id) {
        object_product.splice(i, 1);
        localStorage.setItem("wish", JSON.stringify(object_product));
        alert("Delete Successfull !");
        break;
      }
    }
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Img</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <>
                <tr>
                  <td>
                    <img src={item.url} width="100px" height="100px"></img>
                  </td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <IconButton onClick={() => handleDelte(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default wish;
