import Link from "next/link";
import React from "react";


const first_post = () => {
    return (
        <div>
            <div>Frist Post</div>
            <Link href="/first">go back</Link>
        </div>
    )
}

export default first_post;