import { useRouter } from "next/router";
import Nav from "../components/Nav";

const Slug = ()=>{
    const {asPath}=useRouter();
    return(
        <div>
            <Nav/>
            <p>Hello,I'm the {asPath} page</p>
        </div>
    )
}

export default Slug;
