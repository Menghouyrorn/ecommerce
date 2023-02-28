import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import { fontFamily } from "@mui/system";



const Detail = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        let dataC = localStorage.getItem("data");
        setData(JSON.parse(dataC));
    }, [])

    const handleDelte=(id)=>{
        var object_product=JSON.parse(localStorage.getItem("data"));
        for(let i=0;i<object_product.length;i++){
            if(object_product[i].id==id){
                object_product.splice(i,1);
                localStorage.setItem("data",JSON.stringify(object_product));
                alert("Delete Successfull !");
                break;
            }
        }
    }
    const getTotalPrice=()=>{
        return data.reduce(
            (sum,{price,quantity})=>sum+price*quantity,0
        );
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Img</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <>
                                <tr>
                                    <td><img src={item.url} width="100px" height="100px"></img></td>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td><IconButton onClick={()=>handleDelte(item.id)}><DeleteIcon/></IconButton></td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            <div style={{fontFamily:'Time News Roman',fontSize:30,textAlign:'center',color:'red'}}>Total Price: $ {getTotalPrice()}</div>
        </>
    );
}

export default Detail;